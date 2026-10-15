// Pointer IDs keep simultaneous movement / running / shooting independent.
export function bindTouch(root,{press,release,clear}){
  const pointers=new Map();
  const end=e=>{const key=pointers.get(e.pointerId);if(!key)return;pointers.delete(e.pointerId);if(![...pointers.values()].includes(key))release(key);e.target.classList?.remove('held')};
  root.addEventListener('pointerdown',e=>{const button=e.target.closest('[data-key]');if(!button)return;e.preventDefault();const key=button.dataset.key;button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,key);button.classList.add('held');press(key)});
  root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);root.addEventListener('lostpointercapture',end);
  const reset=()=>{pointers.clear();root.querySelectorAll('.held').forEach(b=>b.classList.remove('held'));clear()};
  window.addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
  return reset;
}
