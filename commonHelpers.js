import"./assets/styles-2a724b48.js";import{f as D,i as l}from"./assets/vendor-77e16229.js";const r=document.querySelector("input#datetime-picker"),s=document.querySelector(".start-btn"),S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){b(e)}};let m=D(r,S);function b(e){e[0]<=new Date?(s.disabled=!0,I("Error")):s.disabled=!1}let a,o=!1;console.log(m.selectedDates[0].getTime());function M(){if(!o){o=!0,r.disabled=!0,s.disabled=!0,clearInterval(a);let e=new Date,t=m.selectedDates[0]-e;u(t),a=setInterval(()=>{u(t),t<=0&&(clearInterval(a),g("Success!"),o=!1,r.disabled=!1),t-=1e3},1e3)}}function g(e){l.success({title:"Success",message:e})}function I(e){l.error({title:"Error",message:e})}function n(e,t){document.querySelector(e).textContent=t>=0?k(t):"00"}function u(e){const{days:t,hours:d,minutes:c,seconds:i}=E(e);n("[data-days]",t),n("[data-hours]",d),n("[data-minutes]",c),n("[data-seconds]",i)}function E(e){const f=Math.floor(e/864e5),h=Math.floor(e%864e5/36e5),y=Math.floor(e%864e5%36e5/6e4),p=Math.floor(e%864e5%36e5%6e4/1e3);return{days:f,hours:h,minutes:y,seconds:p}}function k(e){return e<10?`0${e}`:e}s.addEventListener("click",M);document.addEventListener("DOMContentLoaded",()=>{s.disabled=!0});
//# sourceMappingURL=commonHelpers.js.map