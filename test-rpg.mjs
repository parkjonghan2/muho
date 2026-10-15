import assert from 'node:assert/strict';
import {chapters,walkable,move,statsDefault} from './dist/rpg/story.mjs';
assert.equal(chapters.length,9);assert.equal(Object.keys(statsDefault()).length,9);
let total=0;
for(const c of chapters){
 assert.ok(walkable(c.map,...c.start),c.name+' spawn');
 const visited=new Set(),queue=[c.start];
 for(let i=0;i<queue.length;i++){const [x,y]=queue[i],k=x+','+y;if(visited.has(k))continue;visited.add(k);for(const [dx,dy]of [[5,0],[-5,0],[0,5],[0,-5]]){const nx=x+dx,ny=y+dy;if(walkable(c.map,nx,ny)&&!visited.has(nx+','+ny))queue.push([nx,ny])}}
 for(const t of c.tasks){assert.ok(walkable(c.map,t.x,t.y),c.name+' target '+t.type);assert.ok([...visited].some(k=>{const[x,y]=k.split(',').map(Number);return Math.hypot(t.x-x,t.y-y)<24}),c.name+' unreachable '+t.label);total++}
 assert.equal(move(c.map,{x:400,y:300},5000,0).x,400,'wall collision');
}
console.log('PASS: 9 chapters, '+total+' reachable objectives, collision boundaries, 9 growth attributes');
