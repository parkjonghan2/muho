// Headless state-machine test with DOM/audio stubs; this is NOT a browser visual test.
import assert from 'node:assert/strict';
import {walkable} from './dist/rpg/story.mjs';
const nodes=new Map(),events={},frames=[];let time=0;
const context=new Proxy({getImageData:(x,y,w,h)=>({data:new Uint8ClampedArray(w*h*4).fill(255)})},{get:(o,k)=>o[k]||(()=>{})});
function node(){return {hidden:false,disabled:false,textContent:'',children:[],getContext:()=>context,append(b){this.children.push(b)},replaceChildren(){this.children=[]},click(){this.onclick?.()},focus(){document.activeElement=this}}}
globalThis.document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},createElement:()=>node()};
globalThis.Image=class{constructor(){this.width=1261;this.height=1247}async decode(){if(this.src.includes('cast')){this.width=2172;this.height=724}if(this.src.includes('maps')){this.width=1536;this.height=1024}}};
const param={value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}};const audioNode=()=>({gain:{...param},frequency:{...param},connect(){return this},start(){},stop(){}});
globalThis.window={addEventListener:(k,f)=>events[k]=f,AudioContext:class{constructor(){this.currentTime=0}resume(){}createGain(){return audioNode()}createOscillator(){return audioNode()}}};
globalThis.localStorage={getItem:()=>null,setItem(){}};globalThis.requestAnimationFrame=f=>(frames.push(f),frames.length);globalThis.setInterval=()=>0;globalThis.setTimeout=f=>(f(),0);
const {inspect}=await import('./dist/rpg/main.mjs');
function press(key){events.keydown({key,repeat:false,preventDefault(){}})}function release(key){events.keyup({key})}
async function tick(n=1){for(let i=0;i<n;i++){time+=40;const fs=frames.splice(0);for(const f of fs)f(time);await Promise.resolve();await Promise.resolve()}}
await tick(10);assert.equal(nodes.get('#new').disabled,false);nodes.get('#new').click();let refused=false,workDone=false,sawRebirth=false;
for(let iteration=0;iteration<12000;iteration++){
 await tick();const s=inspect();
 if(s.index===8){sawRebirth=true;if(s.phase==='play')break}
 if(s.phase==='dialog'){press(' ');release(' ');continue}
 if(s.phase==='choice'){const bs=nodes.get('#answers').children;bs[refused?0:1].click();refused=true;continue}
 if(s.phase==='work'){const v=(Math.sin((s.clock-s.workStart)*3)+1)/2;if(v>.4&&v<.7){press(' ');release(' ');workDone=true}continue}
 if(s.phase!=='play'||!s.task)continue;
 const t=s.task,dx=t.x-s.p.x,dy=t.y-s.p.y;
 if(Math.hypot(dx,dy)<20){const key=t.type==='shoot'?'x':t.type==='pass'?'z':' ';press(key);release(key);continue}
 // Hill obstacles are on either side of the central x=400 safe route.
 const key=Math.abs(dx)>8?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp');press(key);await tick();release(key);
}
assert.equal(sawRebirth,true);assert.equal(inspect().index,8);assert.equal(refused,true);assert.equal(workDone,true);
assert.equal(inspect().phase,'play');
for(let i=0;i<4000&&inspect().hubRound<3;i++){
 await tick();const s=inspect();if(s.phase==='dialog'){press(' ');release(' ');continue}if(s.phase!=='play'||!s.task)continue;
 const dx=s.task.x-s.p.x,dy=s.task.y-s.p.y;
 if(Math.hypot(dx,dy)<20){const k=s.task.type==='shoot'?'x':s.task.type==='pass'?'z':' ';press(k);release(k)}else{const k=Math.abs(dx)>8?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp');press(k);await tick();release(k)}
}
assert.equal(inspect().hubRound,3);for(const k of ['슈팅','패스','드리블'])assert.equal(inspect().stats[k],40);
console.log('PASS: all 8 prologue chapters, factory timing, device NO/revisit/YES, rebirth and 3 training rewards. No visual/audio assertions.');
