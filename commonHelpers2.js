import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as s}from"./assets/vendor-651d7991.js";const m=document.querySelector(".form");m.addEventListener("submit",function(n){n.preventDefault();const o=document.querySelector('input[name="delay"]'),t=parseInt(o.value,10),r=document.querySelector('input[name="state"]:checked');new Promise((e,i)=>{setTimeout(()=>{r.value==="fulfilled"?e(t):i(t)},t)}).then(e=>{s.success({message:`Fulfilled promise in ${e}ms`})},e=>{s.error({message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map