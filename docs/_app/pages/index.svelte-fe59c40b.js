var rt=Object.defineProperty,ot=Object.defineProperties;var ct=Object.getOwnPropertyDescriptors;var Ve=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,ht=Object.prototype.propertyIsEnumerable;var Ne=(n,e,t)=>e in n?rt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Me=(n,e)=>{for(var t in e||(e={}))ft.call(e,t)&&Ne(n,t,e[t]);if(Ve)for(var t of Ve(e))ht.call(e,t)&&Ne(n,t,e[t]);return n},De=(n,e)=>ot(n,ct(e));import{L as ut,S as he,i as ue,s as de,e as R,t as ie,k as re,c as P,a as x,h as le,m as oe,d as H,b as N,g as q,J as V,M as pe,N as dt,j as He,K as _e,D as tt,f as L,O as nt,P as Fe,Q as Ce,v as Xe,R as B,T as ze,U as Te,V as it,E as gt,W as qe,X as G,Y as ke,l as J,Z as We,_ as Se,$ as U,w as K,x as se,y as Q,a0 as Z,q as C,o as Y,B as $,a1 as _t,n as ce,p as fe,a2 as lt,a3 as mt}from"../chunks/vendor-e4fe7460.js";function me(n=16){return ut("abcdefghijklmnopqrztuvwxyz1234567890",n)()}function pt(n){return{name:"Name",id:me(),x:10,y:10,style:{backgroundColor:"#fee9004b",width:120,height:120,left:10,top:10},props:[],children:[]}}function vt(n){let e,t,i,a,l,s,r,o;return{c(){e=R("div"),t=ie("Scale "),i=ie(n[0]),a=re(),l=R("div"),s=ie("+ Drag Me"),this.h()},l(f){e=P(f,"DIV",{class:!0});var c=x(e);t=le(c,"Scale "),i=le(c,n[0]),a=oe(c),l=P(c,"DIV",{class:!0});var w=x(l);s=le(w,"+ Drag Me"),w.forEach(H),c.forEach(H),this.h()},h(){N(l,"class","yellow svelte-1q5qz8t"),N(e,"class","pallette svelte-1q5qz8t")},m(f,c){q(f,e,c),V(e,t),V(e,i),V(e,a),V(e,l),V(l,s),r||(o=pe(dt.call(null,l,{Extras:{newContainer:n[1]},Operations:"copy",DataToOffer:{"item/plain":""}})),r=!0)},p(f,[c]){c&1&&He(i,f[0])},i:_e,o:_e,d(f){f&&H(e),r=!1,o()}}}function yt(n,e,t){let{children:i}=e,{scale:a=1}=e,l=pt();return n.$$set=s=>{"children"in s&&t(2,i=s.children),"scale"in s&&t(0,a=s.scale)},[a,l,i]}class wt extends he{constructor(e){super();ue(this,e,yt,vt,de,{children:2,scale:0})}}class bt{constructor({container:e}){this.container=e,this.vtm=this.createMatrix(),this.x=0,this.y=0,this.captureScale=1,this.stop=!1}clamp(e,t,i,a){let l=(this.container.clientWidth-a.width)/2,s=(this.container.clientHeight-a.height)/2,r=l*e+a.width*e-this.container.clientWidth,o=Math.min(this.vtm.e*1,0),f=Math.min(this.vtm.f*1,0),c=t>0?o:-(l*e),w=t>0?o:-r,E=this.vtm.e;E=Math.max(w,this.vtm.e),E=Math.min(c,E);let _=s*e+a.height*e-this.container.clientHeight,d=i>0?f:-(s*e),y=i>0?f:-_,k=this.vtm.f;k=Math.min(d,k),k=Math.max(k,y),this.vtm=this.createMatrix().translate(E,k).scale(Math.max(this.vtm.a,1))}createMatrix(){return new DOMMatrix}move(e,t,i,a,l){return this.vtm=this.createMatrix().translate(this.x-e,this.y-t).scale(this.vtm.a),this.vtm}scale(e,t,i,a,l,s,r,o,f){return this.vtm=this.createMatrix().translate(i.x,i.y).scale(e,t).translate(-i.x,-i.y).multiply(this.vtm),Math.min(Math.max(1,this.vtm.a),r),this.vtm}}class st{constructor(){this.touchA={clientX:0,clientY:0,t:0,velocity:1},this.touchB={clientX:0,clientY:0,t:0,velocity:1}}down(e,t){this.touchA={clientX:e.clientX,clientY:e.clientY,t:Date.now(),velocity:0},this.touchB={clientX:t.clientX,clientY:t.clientY,t:Date.now(),veloctiy:0}}calc(e,t){var i=e.clientX,a=e.clientY,l=Date.now(),s=i-t.clientX,r=a-t.clientY,o=l-t.t,f=Math.sqrt(s*s+r*r)/o;t.velocity=f,t.clientX=i,t.clientY=a,t.t=l}getVelocity(e,t){return this.calc(e,this.touchA),this.calc(t,this.touchB),this.touchA.velocity+this.touchB.velocity}}function kt(n,e,t,i){var a=Math.min(t/n,i/e);return{width:n*a,height:e*a,ratio:a}}function Ae(n,e){return Math.hypot(n.pageX-e.pageX,n.pageY-e.pageY)}let Ie=!1,te={initX:0,initY:0,newX:0,newY:0},j,I,Be=new st,Ee={time:0,x:0,y:0};const Mt=(n,e={})=>{var M;let t={scaling:!1,x1:0,x2:0,y1:0,y2:0,lastHypo:0,originX:0,originY:0,value:((M=e==null?void 0:e.scale)==null?void 0:M.value)||1,max:20},i=n.parentElement||document.body;i.style["touch-action"]="none",i.style["user-select"]="none",i.style.overflow="hidden",i.style.position="relative",n.style["touch-action"]="none",n.style["user-select"]="none",n.style.position="absolute",n.style.height="100%",n.style.width="100%",I=new bt({container:i}),s(),n.addEventListener("dragstart",l,{passive:!1}),n.addEventListener("drag",l,{passive:!1}),i.addEventListener("mousedown",A,{passive:!1}),i.addEventListener("touchstart",y,{passive:!1}),i.addEventListener("wheel",d,{passive:!1}),i.addEventListener("dragstart",l,{passive:!1}),i.addEventListener("drag",l,{passive:!1}),window.addEventListener("resize",r);const a=new MutationObserver((h,p)=>{for(const v of h)if(v.type==="attributes"){let F;const z=/(\w+)\(([^)]*)\)/g;for(;F=z.exec(n.style.transform);)F[1]=="scale"&&parseFloat(F[2]).toFixed(2)!=t.value.toFixed(2)&&(t.value=F[2])}});a.observe(n,{attributes:!0,childList:!1,subtree:!1});function l(h){return console.log("Removing drag listener"),!1}function s(){const{offsetWidth:h,offsetHeight:p}=n;j=kt(h,p,i.clientWidth,i.clientHeight)}function r(){s(),o(0,0),f(0,0),c()}function o(h,p){te.initX=h,te.initY=p,I.x=I.vtm.e,I.y=I.vtm.f}function f(h,p){if(t.scaling)return;let v=(i.clientWidth-j.width*I.vtm.a)/2,F=(i.clientHeight-j.height*I.vtm.a)/2;te.newX=te.initX-h,te.newY=te.initY-p;const z=I.move(te.newX,te.newY,v,F,j);n.style.transform=`matrix(${z.a},${z.b},${z.c},${z.d},${z.e}, ${z.f})`}function c(){I.x-=te.newX,I.y-=te.newY,t.scaling=!1,t.lastHypo=0}function w(h,p){const v=[Math.min(h.pageX,p.pageX),Math.max(h.pageX,p.pageX)],F=[Math.min(h.pageY,p.pageY),Math.max(h.pageY,p.pageY)],u=(v[1]-v[0])/2+v[0],m=(F[1]-F[0])/2+F[0];t.originX=u,t.originY=m,t.lastHypo=Math.trunc(Ae(h,p))}function E(h,p){let v=I.vtm.a,F=v>1?v-1:t.max/2.5,z=v>1?-1:1;const u=1+F*z,b=u;let m=(i.clientWidth-j.width*Math.max(u*v,1))/2,S=(i.clientHeight-j.height*Math.max(u*v,1))/2;const T={x:h-i.clientWidth/2-i.offsetLeft,y:p-i.clientHeight/2-i.offsetTop},g=I.scale(u,b,T,m,S,j,t.max,t.value*u,z);t.value=g.d,n.style.transform=`translate(${g.e}px, ${g.f}px) scale(${g.a})`}function _(h,p,v){const F=Ae(h,p);let z=F/t.lastHypo;z=z>=1?1:-1;const u=Be.getVelocity(h,p)||1,b=1+.1*u*z,m=b;let S=(i.clientWidth-j.width*I.vtm.a)/2,T=(i.clientHeight-j.height*I.vtm.a)/2;const g={x:t.originX-i.clientWidth/2-i.offsetLeft,y:t.originY-i.clientHeight/2-i.offsetTop},O=I.scale(b,m,g,S,T,j,t.max,t.value*b,z);t.value=O.d,t.lastHypo=F,t.scaling=!0,n.style.transform=`translate(${O.e}px, ${O.f}px) scale(${O.a})`}function d(h){h.preventDefault();const p=h.deltaY<0?1:-1,v=1+.1*p,F=v;let z=(i.clientWidth-j.width*I.vtm.a)/2,u=(i.clientHeight-j.height*I.vtm.a)/2;const b={x:h.pageX-i.clientWidth/2-i.offsetLeft,y:h.pageY-i.clientHeight/2-i.offsetTop},m=I.scale(v,F,b,z,u,j,t.max,t.value*v,p);t.value=m.d,n.style.transform=`translate(${m.e}px,${m.f}px) scale(${m.a})`,n.dispatchEvent(new CustomEvent("zoomed",{detail:{style:n.style,scale:t,matrix:I,origin:b}}))}function y(h){Ie=!0;const p=h.touches.length===2,[v,F]=h.touches;if(t.scaling=p,p)w(v,F),Be.down(v,F);else{const{pageX:u,pageY:b}=v;var z=new Date().getTime();z-Ee.time<250&&Math.hypot(Ee.x-u,Ee.y-b)<=20?E(u,b):o(u,b),Ee={time:z,x:u,y:b}}n.removeEventListener("touchmove",k),n.removeEventListener("touchend",W),n.addEventListener("touchmove",k),n.addEventListener("touchend",W)}function k(h){if(t.scaling){const[p,v]=h.touches;_(p,v)}else f(h.touches[0].pageX,h.touches[0].pageY)}function W(h){c(),n.removeEventListener("touchmove",k),n.removeEventListener("touchend",W),n.removeEventListener("touchcancel",W)}function A(h){if(i!==h.target&&n!==h.target)return;const{clientX:p,clientY:v}=h;Ie||(o(p,v),i.addEventListener("mousemove",X),i.addEventListener("mouseup",D))}function X({clientX:h,clientY:p}){f(h,p)}function D(){i.removeEventListener("mousemove",X),c()}return{update(h){console.log("Directive updated params",{params:h})},destroy(){n.removeEventListener("wheel",d),n.removeEventListener("mousedown",A),n.removeEventListener("touchstart",y),n.removeEventListener("dragstart",l),n.addEventListener("drag",l),window.removeEventListener("resize",r),a.disconnect()}}};new st;const be=tt({value:1}),Oe=tt(null);function Dt(n){let e,t,i,a,l;return{c(){e=R("div"),this.h()},l(s){e=P(s,"DIV",{class:!0,style:!0}),x(e).forEach(H),this.h()},h(){N(e,"class",t="resize-handle "+n[2]+" svelte-ci56im"),L(e,"--size",Et),L(e,"left",n[5]+"px"),L(e,"top",n[4]+"px"),L(e,"cursor",n[6])},m(s,r){q(s,e,r),n[20](e),a||(l=pe(i=nt.call(null,e,{Extras:n[2],onDragStart:{x:n[0],y:n[1]},onDragMove:n[7],onDragEnd:n[8]})),a=!0)},p(s,[r]){r&4&&t!==(t="resize-handle "+s[2]+" svelte-ci56im")&&N(e,"class",t),r&32&&L(e,"left",s[5]+"px"),r&16&&L(e,"top",s[4]+"px"),i&&Fe(i.update)&&r&7&&i.update.call(null,{Extras:s[2],onDragStart:{x:s[0],y:s[1]},onDragMove:s[7],onDragEnd:s[8]})},i:_e,o:_e,d(s){s&&H(e),n[20](null),a=!1,l()}}}let Et="1em";function Ht(n,e,t){let i,a,l;Ce(n,be,m=>t(23,l=m));let{x:s}=e,{y:r}=e,{width:o}=e,{height:f}=e,{name:c}=e;console.log(c,{height:f});let{maxFrameHeight:w=2500}=e,{maxFrameWidth:E=2500}=e,{minFrameHeight:_=40}=e,{minFrameWidth:d=40}=e,{arenaWidth:y}=e,{arenaHeight:k}=e,{direction:W}=e,{isDragging:A=!1}=e,{grid:X}=e,D,M=8,h=8;Xe(()=>{M=D?parseFloat(getComputedStyle(D).width.replace("px","")):8,h=D?parseFloat(getComputedStyle(D).height.replace("px","")):8});let p=W=="nw"||W=="se"?"nwse-resize":W=="n"||W=="s"?"ns-resize":W=="ne"||W=="sw"?"nesw-resize":"ew-resize";function v(m,S,T){switch(m){case"nw":case"w":case"sw":return S-M;case"n":case"s":return S+T/2;case"ne":case"e":case"se":return S+T+M}}function F(m,S,T){switch(m){case"nw":case"n":case"ne":return S-h;case"e":case"w":return S+T/2-h/2;case"sw":case"s":case"se":return S+T+h/2}}function z(m,S,T,g,O){switch(O){case"nw":case"w":case"sw":t(0,s=Math.max(0,s+o-E,Math.min(s+o-d,y,s+T/l.value))),t(9,o=o-T/l.value);break;case"ne":case"e":case"se":t(9,o=Math.max(0,s+d,Math.min(s+E,y,s+o+T/l.value))-s)}switch(O){case"nw":case"n":case"ne":t(1,r=Math.max(0,r+f-w,Math.min(r+f-_,k,r+g/l.value))),t(10,f=f-g/l.value);break;case"sw":case"s":case"se":t(10,f=Math.max(0,r+_,Math.min(r+w,k,r+f+g/l.value))-r)}}function u(m,S,T,g,O){t(11,A=!1),X&&(t(0,s=Math.floor(s/X)*X),t(1,r=Math.floor(r/X)*X),t(9,o=Math.floor(o/X)*X),t(10,f=Math.floor(f/X)*X))}function b(m){B[m?"unshift":"push"](()=>{D=m,t(3,D)})}return n.$$set=m=>{"x"in m&&t(0,s=m.x),"y"in m&&t(1,r=m.y),"width"in m&&t(9,o=m.width),"height"in m&&t(10,f=m.height),"name"in m&&t(12,c=m.name),"maxFrameHeight"in m&&t(13,w=m.maxFrameHeight),"maxFrameWidth"in m&&t(14,E=m.maxFrameWidth),"minFrameHeight"in m&&t(15,_=m.minFrameHeight),"minFrameWidth"in m&&t(16,d=m.minFrameWidth),"arenaWidth"in m&&t(17,y=m.arenaWidth),"arenaHeight"in m&&t(18,k=m.arenaHeight),"direction"in m&&t(2,W=m.direction),"isDragging"in m&&t(11,A=m.isDragging),"grid"in m&&t(19,X=m.grid)},n.$$.update=()=>{n.$$.dirty&517&&t(5,i=v(W,s,o)),n.$$.dirty&1030&&t(4,a=F(W,r,f))},[s,r,W,D,a,i,p,z,u,o,f,A,c,w,E,_,d,y,k,X,b]}class Ct extends he{constructor(e){super();ue(this,e,Ht,Dt,de,{x:0,y:1,width:9,height:10,name:12,maxFrameHeight:13,maxFrameWidth:14,minFrameHeight:15,minFrameWidth:16,arenaWidth:17,arenaHeight:18,direction:2,isDragging:11,grid:19})}}function Ye(n,{enabled:e,handleUnselect:t}){const i=({target:l})=>{n!==l&&t()};function a({enabled:l}){l?window.addEventListener("click",i):window.removeEventListener("click",i)}return a({enabled:e}),{update:a,destroy(){window.removeEventListener("click",i)}}}function Wt(n){let e,t,i,a;return{c(){e=R("div"),this.h()},l(l){e=P(l,"DIV",{class:!0});var s=x(e);s.forEach(H),this.h()},h(){N(e,"class",t=qe(n[0])+" svelte-1708iua")},m(l,s){q(l,e,s),e.innerHTML=n[4],n[14](e),i||(a=[G(e,"input",n[5]),G(e,"dblclick",n[5])],i=!0)},p(l,s){s&16&&(e.innerHTML=l[4]),s&1&&t!==(t=qe(l[0])+" svelte-1708iua")&&N(e,"class",t)},d(l){l&&H(e),n[14](null),i=!1,ke(a)}}}function zt(n){let e,t,i,a;return{c(){e=R("span"),t=ie(n[4]),this.h()},l(l){e=P(l,"SPAN",{contenteditable:!0,class:!0});var s=x(e);t=le(s,n[4]),s.forEach(H),this.h()},h(){N(e,"contenteditable",""),N(e,"class",n[0]),n[4]===void 0&&ze(()=>n[13].call(e))},m(l,s){q(l,e,s),V(e,t),n[12](e),n[4]!==void 0&&(e.innerHTML=n[4]),i||(a=[G(e,"keydown",n[6]),G(e,"blur",n[7]),G(e,"input",n[13])],i=!0)},p(l,s){s&16&&He(t,l[4]),s&1&&N(e,"class",l[0]),s&16&&l[4]!==e.innerHTML&&(e.innerHTML=l[4])},d(l){l&&H(e),n[12](null),i=!1,ke(a)}}}function Lt(n){let e,t;function i(s,r){return s[2]?zt:Wt}let a=i(n),l=a(n);return{c(){e=R("div"),l.c(),this.h()},l(s){e=P(s,"DIV",{class:!0});var r=x(e);l.l(r),r.forEach(H),this.h()},h(){N(e,"class","svelte-1708iua"),ze(()=>n[15].call(e))},m(s,r){q(s,e,r),l.m(e,null),t=Te(e,n[15].bind(e))},p(s,[r]){a===(a=i(s))&&l?l.p(s,r):(l.d(1),l=a(s),l&&(l.c(),l.m(e,null)))},i:_e,o:_e,d(s){s&&H(e),l.d(),t()}}}function Ft(n,e,t){let{value:i=""}=e,{type:a="text"}=e,{placeholder:l=""}=e,{labelClasses:s=""}=e,{inputClasses:r=""}=e,o,f=!1,c,w=i;const E=it();async function _(D){if(t(2,f=!f),f){console.log("toggle editing"),await gt(),c.focus();let h=document.createRange();console.log({inputEl:c}),h.setStart(c.firstChild,0),h.setEnd(c.firstChild,c.firstChild.length);var M=window.getSelection();M.removeAllRanges(),M.addRange(h)}else t(8,i=w),E("doneEditing")}const d=D=>{console.log("checking keyup"),D.keyCode===13&&(D.preventDefault(),c.blur())},y=D=>{i!=""&&i!=null?_():t(8,i="Enter Value")};function k(D){B[D?"unshift":"push"](()=>{c=D,t(3,c)})}function W(){w=this.innerHTML,t(4,w)}function A(D){B[D?"unshift":"push"](()=>{c=D,t(3,c)})}function X(){o=this.offsetWidth,t(1,o)}return n.$$set=D=>{"value"in D&&t(8,i=D.value),"type"in D&&t(9,a=D.type),"placeholder"in D&&t(10,l=D.placeholder),"labelClasses"in D&&t(0,s=D.labelClasses),"inputClasses"in D&&t(11,r=D.inputClasses)},[s,o,f,c,w,_,d,y,i,a,l,r,k,W,A,X]}class Yt extends he{constructor(e){super();ue(this,e,Ft,Lt,de,{value:8,type:9,placeholder:10,labelClasses:0,inputClasses:11})}}const ne=["#63B75A4B","#FEE9004B","#ff003b4b","#69f5dc4B","#FF9D484B","#7a00ff4B","#ff14f84b","#376bff4b"];function Re(n,e,t){const i=n.slice();return i[2]=e[t],i}function Xt(n){let e,t=ne,i=[];for(let a=0;a<t.length;a+=1)i[a]=Pe(Re(n,t,a));return{c(){for(let a=0;a<i.length;a+=1)i[a].c();e=J()},l(a){for(let l=0;l<i.length;l+=1)i[l].l(a);e=J()},m(a,l){for(let s=0;s<i.length;s+=1)i[s].m(a,l);q(a,e,l)},p(a,l){if(l&1){t=ne;let s;for(s=0;s<t.length;s+=1){const r=Re(a,t,s);i[s]?i[s].p(r,l):(i[s]=Pe(r),i[s].c(),i[s].m(e.parentNode,e))}for(;s<i.length;s+=1)i[s].d(1);i.length=t.length}},d(a){Se(i,a),a&&H(e)}}}function Pe(n){let e,t,i;function a(...l){return n[1](n[2],...l)}return{c(){e=R("div"),this.h()},l(l){e=P(l,"DIV",{class:!0,style:!0}),x(e).forEach(H),this.h()},h(){N(e,"class","colorOption svelte-10ineey"),L(e,"background-color",n[2])},m(l,s){q(l,e,s),t||(i=G(e,"click",We(a)),t=!0)},p(l,s){n=l},d(l){l&&H(e),t=!1,i()}}}function Tt(n){let e,t=ne&&Xt(n);return{c(){e=R("main"),t&&t.c(),this.h()},l(i){e=P(i,"MAIN",{class:!0});var a=x(e);t&&t.l(a),a.forEach(H),this.h()},h(){N(e,"class","svelte-10ineey")},m(i,a){q(i,e,a),t&&t.m(e,null)},p(i,[a]){ne&&t.p(i,a)},i:_e,o:_e,d(i){i&&H(e),t&&t.d()}}}function St(n,e,t){let{backgroundColor:i}=e;const a=(l,s)=>t(0,i=l);return n.$$set=l=>{"backgroundColor"in l&&t(0,i=l.backgroundColor)},[i,a]}class Vt extends he{constructor(e){super();ue(this,e,St,Tt,de,{backgroundColor:0})}}function Nt(n){let e,t,i,a,l,s,r,o,f,c,w,E;function _(y){n[2](y)}let d={};return n[1]!==void 0&&(d.backgroundColor=n[1]),t=new Vt({props:d}),B.push(()=>U(t,"backgroundColor",_)),{c(){e=R("div"),K(t.$$.fragment),a=re(),l=R("span"),s=ie("\u21AA"),r=re(),o=R("span"),f=ie("\u{1F5D1}\uFE0F"),this.h()},l(y){e=P(y,"DIV",{style:!0,class:!0});var k=x(e);se(t.$$.fragment,k),a=oe(k),l=P(k,"SPAN",{class:!0});var W=x(l);s=le(W,"\u21AA"),W.forEach(H),r=oe(k),o=P(k,"SPAN",{class:!0});var A=x(o);f=le(A,"\u{1F5D1}\uFE0F"),A.forEach(H),k.forEach(H),this.h()},h(){N(l,"class","connect svelte-sbpf1i"),N(o,"class","svelte-sbpf1i"),L(e,"left",n[0].x+n[0].style.width+"px"),L(e,"top",n[0].y+"px"),N(e,"class","svelte-sbpf1i")},m(y,k){q(y,e,k),Q(t,e,null),V(e,a),V(e,l),V(l,s),V(e,r),V(e,o),V(o,f),c=!0,w||(E=[G(l,"click",We(At)),G(o,"click",We(qt))],w=!0)},p(y,[k]){const W={};!i&&k&2&&(i=!0,W.backgroundColor=y[1],Z(()=>i=!1)),t.$set(W),(!c||k&1)&&L(e,"left",y[0].x+y[0].style.width+"px"),(!c||k&1)&&L(e,"top",y[0].y+"px")},i(y){c||(C(t.$$.fragment,y),c=!0)},o(y){Y(t.$$.fragment,y),c=!1},d(y){y&&H(e),$(t),w=!1,ke(E)}}}function qt(n){}function At(n){}function It(n,e,t){var s;let{node:i}=e,a=((s=i==null?void 0:i.style)==null?void 0:s.backgroundColor)||"#fee9004b";console.log({backgroundColor:a});function l(r){a=r,t(1,a)}return n.$$set=r=>{"node"in r&&t(0,i=r.node)},n.$$.update=()=>{n.$$.dirty&3&&a&&t(0,i=De(Me({},i),{style:De(Me({},i.style),{backgroundColor:a})}))},[i,a,l]}class Bt extends he{constructor(e){super();ue(this,e,It,Nt,de,{node:0})}}function xe(n,e,t){const i=n.slice();return i[30]=e[t],i}function Ue(n,e,t){const i=n.slice();return i[33]=e[t],i[34]=e,i[35]=t,i}function Ze(n){var F,z;let e,t,i,a,l,s,r,o,f,c,w,E,_,d,y,k,W;function A(u){n[15](u)}let X={};n[0].name!==void 0&&(X.value=n[0].name),i=new Yt({props:X}),B.push(()=>U(i,"value",A));function D(u){n[16](u)}var M=n[0].component;function h(u){let b={};return u[0].props!==void 0&&(b.props=u[0].props),{props:b}}M&&(s=new M(h(n)),B.push(()=>U(s,"props",D)));let p=((z=(F=n[0])==null?void 0:F.children)==null?void 0:z.length)>0&&je(n),v=n[4]&&n[7]&&Je(n);return{c(){e=R("div"),t=R("div"),K(i.$$.fragment),l=re(),s&&K(s.$$.fragment),o=re(),p&&p.c(),_=re(),v&&v.c(),d=J(),this.h()},l(u){e=P(u,"DIV",{class:!0,style:!0});var b=x(e);t=P(b,"DIV",{class:!0});var m=x(t);se(i.$$.fragment,m),m.forEach(H),l=oe(b),s&&se(s.$$.fragment,b),o=oe(b),p&&p.l(b),b.forEach(H),_=oe(u),v&&v.l(u),d=J(),this.h()},h(){var u,b,m,S,T,g;N(t,"class","title svelte-1p8i7z4"),N(e,"class","container svelte-1p8i7z4"),L(e,"position","absolute"),L(e,"left",n[0].x+"px"),L(e,"top",n[0].y+"px"),L(e,"width",((b=(u=n[0])==null?void 0:u.style)==null?void 0:b.width)+"px"),L(e,"height",((S=(m=n[0])==null?void 0:m.style)==null?void 0:S.height)+"px"),L(e,"background-color",((g=(T=n[0])==null?void 0:T.style)==null?void 0:g.backgroundColor)||"#fee9004b"),ze(()=>n[20].call(e))},m(u,b){q(u,e,b),V(e,t),Q(i,t,null),V(e,l),s&&Q(s,e,null),V(e,o),p&&p.m(e,null),n[19](e),f=Te(e,n[20].bind(e)),q(u,_,b),v&&v.m(u,b),q(u,d,b),y=!0,k||(W=[pe(c=nt.call(null,e,{onDragStart:{x:n[0].x,y:n[0].y},onDragMove:n[9],onDragEnd:n[10]})),pe(w=_t.call(null,e,{TypesToAccept:{"item/plain":"all"},onDrop:n[11]})),pe(E=Ye.call(null,e,{enabled:n[7],handleUnselect:n[12]})),G(e,"click",We(n[13])),G(e,"focusout",n[12])],k=!0)},p(u,b){var T,g,O,ge,ee,ve,Le,ye;const m={};!a&&b[0]&1&&(a=!0,m.value=u[0].name,Z(()=>a=!1)),i.$set(m);const S={};if(!r&&b[0]&1&&(r=!0,S.props=u[0].props,Z(()=>r=!1)),M!==(M=u[0].component)){if(s){ce();const we=s;Y(we.$$.fragment,1,0,()=>{$(we,1)}),fe()}M?(s=new M(h(u)),B.push(()=>U(s,"props",D)),K(s.$$.fragment),C(s.$$.fragment,1),Q(s,e,o)):s=null}else M&&s.$set(S);((g=(T=u[0])==null?void 0:T.children)==null?void 0:g.length)>0?p?(p.p(u,b),b[0]&1&&C(p,1)):(p=je(u),p.c(),C(p,1),p.m(e,null)):p&&(ce(),Y(p,1,1,()=>{p=null}),fe()),(!y||b[0]&1)&&L(e,"left",u[0].x+"px"),(!y||b[0]&1)&&L(e,"top",u[0].y+"px"),(!y||b[0]&1)&&L(e,"width",((ge=(O=u[0])==null?void 0:O.style)==null?void 0:ge.width)+"px"),(!y||b[0]&1)&&L(e,"height",((ve=(ee=u[0])==null?void 0:ee.style)==null?void 0:ve.height)+"px"),(!y||b[0]&1)&&L(e,"background-color",((ye=(Le=u[0])==null?void 0:Le.style)==null?void 0:ye.backgroundColor)||"#fee9004b"),c&&Fe(c.update)&&b[0]&1&&c.update.call(null,{onDragStart:{x:u[0].x,y:u[0].y},onDragMove:u[9],onDragEnd:u[10]}),E&&Fe(E.update)&&b[0]&128&&E.update.call(null,{enabled:u[7],handleUnselect:u[12]}),u[4]&&u[7]?v?(v.p(u,b),b[0]&144&&C(v,1)):(v=Je(u),v.c(),C(v,1),v.m(d.parentNode,d)):v&&(ce(),Y(v,1,1,()=>{v=null}),fe())},i(u){y||(C(i.$$.fragment,u),s&&C(s.$$.fragment,u),C(p),C(v),y=!0)},o(u){Y(i.$$.fragment,u),s&&Y(s.$$.fragment,u),Y(p),Y(v),y=!1},d(u){u&&H(e),$(i),s&&$(s),p&&p.d(),n[19](null),f(),u&&H(_),v&&v.d(u),u&&H(d),k=!1,ke(W)}}}function je(n){let e,t,i=n[0].children,a=[];for(let s=0;s<i.length;s+=1)a[s]=Ge(Ue(n,i,s));const l=s=>Y(a[s],1,1,()=>{a[s]=null});return{c(){for(let s=0;s<a.length;s+=1)a[s].c();e=J()},l(s){for(let r=0;r<a.length;r+=1)a[r].l(s);e=J()},m(s,r){for(let o=0;o<a.length;o+=1)a[o].m(s,r);q(s,e,r),t=!0},p(s,r){if(r[0]&99){i=s[0].children;let o;for(o=0;o<i.length;o+=1){const f=Ue(s,i,o);a[o]?(a[o].p(f,r),C(a[o],1)):(a[o]=Ge(f),a[o].c(),C(a[o],1),a[o].m(e.parentNode,e))}for(ce(),o=i.length;o<a.length;o+=1)l(o);fe()}},i(s){if(!t){for(let r=0;r<i.length;r+=1)C(a[r]);t=!0}},o(s){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)Y(a[r]);t=!1},d(s){Se(a,s),s&&H(e)}}}function Ge(n){let e,t,i,a;function l(o){n[17](o,n[33],n[34],n[35])}function s(o){n[18](o)}let r={arenaWidth:n[5],arenaHeight:n[6]};return n[33]!==void 0&&(r.node=n[33]),n[1]!==void 0&&(r.isDragging=n[1]),e=new at({props:r}),B.push(()=>U(e,"node",l)),B.push(()=>U(e,"isDragging",s)),{c(){K(e.$$.fragment)},l(o){se(e.$$.fragment,o)},m(o,f){Q(e,o,f),a=!0},p(o,f){n=o;const c={};f[0]&32&&(c.arenaWidth=n[5]),f[0]&64&&(c.arenaHeight=n[6]),!t&&f[0]&1&&(t=!0,c.node=n[33],Z(()=>t=!1)),!i&&f[0]&2&&(i=!0,c.isDragging=n[1],Z(()=>i=!1)),e.$set(c)},i(o){a||(C(e.$$.fragment,o),a=!0)},o(o){Y(e.$$.fragment,o),a=!1},d(o){$(e,o)}}}function Je(n){let e,t,i,a,l=n[8],s=[];for(let c=0;c<l.length;c+=1)s[c]=Ke(xe(n,l,c));const r=c=>Y(s[c],1,1,()=>{s[c]=null});function o(c){n[26](c)}let f={};return n[0]!==void 0&&(f.node=n[0]),t=new Bt({props:f}),B.push(()=>U(t,"node",o)),{c(){for(let c=0;c<s.length;c+=1)s[c].c();e=re(),K(t.$$.fragment)},l(c){for(let w=0;w<s.length;w+=1)s[w].l(c);e=oe(c),se(t.$$.fragment,c)},m(c,w){for(let E=0;E<s.length;E+=1)s[E].m(c,w);q(c,e,w),Q(t,c,w),a=!0},p(c,w){if(w[0]&271){l=c[8];let _;for(_=0;_<l.length;_+=1){const d=xe(c,l,_);s[_]?(s[_].p(d,w),C(s[_],1)):(s[_]=Ke(d),s[_].c(),C(s[_],1),s[_].m(e.parentNode,e))}for(ce(),_=l.length;_<s.length;_+=1)r(_);fe()}const E={};!i&&w[0]&1&&(i=!0,E.node=c[0],Z(()=>i=!1)),t.$set(E)},i(c){if(!a){for(let w=0;w<l.length;w+=1)C(s[w]);C(t.$$.fragment,c),a=!0}},o(c){s=s.filter(Boolean);for(let w=0;w<s.length;w+=1)Y(s[w]);Y(t.$$.fragment,c),a=!1},d(c){Se(s,c),c&&H(e),$(t,c)}}}function Ke(n){let e,t,i,a,l,s,r;function o(d){n[21](d)}function f(d){n[22](d)}function c(d){n[23](d)}function w(d){n[24](d)}function E(d){n[25](d)}let _={name:n[0].name,maxFrameWidth:Pt,minFrameWidth:Rt,arenaWidth:n[3],arenaHeight:n[2],maxFrameHeight:Ut,minFrameHeight:xt,direction:n[30],grid:ae};return n[0].x!==void 0&&(_.x=n[0].x),n[0].y!==void 0&&(_.y=n[0].y),n[0].style.width!==void 0&&(_.width=n[0].style.width),n[0].style.height!==void 0&&(_.height=n[0].style.height),n[1]!==void 0&&(_.isDragging=n[1]),e=new Ct({props:_}),B.push(()=>U(e,"x",o)),B.push(()=>U(e,"y",f)),B.push(()=>U(e,"width",c)),B.push(()=>U(e,"height",w)),B.push(()=>U(e,"isDragging",E)),{c(){K(e.$$.fragment)},l(d){se(e.$$.fragment,d)},m(d,y){Q(e,d,y),r=!0},p(d,y){const k={};y[0]&1&&(k.name=d[0].name),y[0]&8&&(k.arenaWidth=d[3]),y[0]&4&&(k.arenaHeight=d[2]),!t&&y[0]&1&&(t=!0,k.x=d[0].x,Z(()=>t=!1)),!i&&y[0]&1&&(i=!0,k.y=d[0].y,Z(()=>i=!1)),!a&&y[0]&1&&(a=!0,k.width=d[0].style.width,Z(()=>a=!1)),!l&&y[0]&1&&(l=!0,k.height=d[0].style.height,Z(()=>l=!1)),!s&&y[0]&2&&(s=!0,k.isDragging=d[1],Z(()=>s=!1)),e.$set(k)},i(d){r||(C(e.$$.fragment,d),r=!0)},o(d){Y(e.$$.fragment,d),r=!1},d(d){$(e,d)}}}function Ot(n){let e,t,i,a=n[0]&&document&&Ye&&Ze(n);return{c(){e=re(),a&&a.c(),t=J()},l(l){e=oe(l),a&&a.l(l),t=J()},m(l,s){q(l,e,s),a&&a.m(l,s),q(l,t,s),i=!0},p(l,s){l[0]&&document&&Ye?a?(a.p(l,s),s[0]&1&&C(a,1)):(a=Ze(l),a.c(),C(a,1),a.m(t.parentNode,t)):a&&(ce(),Y(a,1,1,()=>{a=null}),fe())},i(l){i||(C(a),i=!0)},o(l){Y(a),i=!1},d(l){l&&H(e),a&&a.d(l),l&&H(t)}}}let ae=20,Rt=40,Pt=2500,xt=20,Ut=2500;function Zt(n,e,t){let i,a;Ce(n,Oe,g=>t(14,i=g)),Ce(n,be,g=>t(27,a=g));let{node:l}=e,{arenaHeight:s}=e,{arenaWidth:r}=e,{isDragging:o=!1}=e;it();let f,c,w,E,_=["nw","w","sw","ne","e","se","n","s"];function d(g,O,ge,ee){t(0,l.x=l.x+ge/a.value,l),t(0,l.y=l.y+ee/a.value,l),W()}function y(g,O,ge,ee,ve){t(1,o=!1),t(0,l.x=Math.round(l.x/ae)*ae,l),t(0,l.y=Math.round(l.y/ae)*ae,l),t(0,l.style.width=Math.round(l.style.width/ae)*ae,l),t(0,l.style.height=Math.round(l.style.height/ae)*ae,l)}function k(g,O,ge,ee,ve,Le){let ye;for(let we in ee)ee.hasOwnProperty(we)&&(ye=we);return t(0,l.children=[...l.children,De(Me({},ve.newContainer),{x:g/a.value,y:O/a.value})],l),ye}function W(){l.x<0&&t(0,l.x=0,l),l.x+l.style.width>=r&&t(0,l.x-=l.x+l.style.width-r,l),l.y<0&&t(0,l.y=0,l),l.y+l.style.height>=s&&t(0,l.y-=l.y+l.style.height-s,l)}function A(){t(7,E=!1)}function X(g){f.focus(),lt(Oe,i=f,i),t(7,E=!0)}function D(g){n.$$.not_equal(l.name,g)&&(l.name=g,t(0,l))}function M(g){n.$$.not_equal(l.props,g)&&(l.props=g,t(0,l))}function h(g,O,ge,ee){ge[ee]=g,t(0,l)}function p(g){o=g,t(1,o)}function v(g){B[g?"unshift":"push"](()=>{f=g,t(4,f)})}function F(){c=this.clientWidth,w=this.clientHeight,t(5,c),t(6,w)}function z(g){n.$$.not_equal(l.x,g)&&(l.x=g,t(0,l))}function u(g){n.$$.not_equal(l.y,g)&&(l.y=g,t(0,l))}function b(g){n.$$.not_equal(l.style.width,g)&&(l.style.width=g,t(0,l))}function m(g){n.$$.not_equal(l.style.height,g)&&(l.style.height=g,t(0,l))}function S(g){o=g,t(1,o)}function T(g){l=g,t(0,l)}return n.$$set=g=>{"node"in g&&t(0,l=g.node),"arenaHeight"in g&&t(2,s=g.arenaHeight),"arenaWidth"in g&&t(3,r=g.arenaWidth),"isDragging"in g&&t(1,o=g.isDragging)},n.$$.update=()=>{n.$$.dirty[0]&12&&(r||s)&&W(),n.$$.dirty[0]&16400&&i!=f&&A()},[l,o,s,r,f,c,w,E,_,d,y,k,A,X,i,D,M,h,p,v,F,z,u,b,m,S,T]}class at extends he{constructor(e){super();ue(this,e,Zt,Ot,de,{node:0,arenaHeight:2,arenaWidth:3,isDragging:1},null,[-1,-1])}}function Qe(n){let e,t,i,a,l,s,r,o,f,c,w,E,_,d,y,k;function W(M){n[7](M)}let A={};n[5].value!==void 0&&(A.scale=n[5].value),t=new wt({props:A}),B.push(()=>U(t,"scale",W));function X(M){n[8](M)}let D={arenaWidth:n[3]*100,arenaHeight:n[4]*100};return n[0]!==void 0&&(D.node=n[0]),c=new at({props:D}),B.push(()=>U(c,"node",X)),{c(){e=R("div"),K(t.$$.fragment),a=re(),l=ie(n[1]),s=ie("px x "),r=ie(n[2]),o=ie(`px\r
\r
		`),f=R("div"),K(c.$$.fragment),this.h()},l(M){e=P(M,"DIV",{class:!0,style:!0});var h=x(e);se(t.$$.fragment,h),a=oe(h),l=le(h,n[1]),s=le(h,"px x "),r=le(h,n[2]),o=le(h,`px\r
\r
		`),f=P(h,"DIV",{class:!0});var p=x(f);se(c.$$.fragment,p),p.forEach(H),h.forEach(H),this.h()},h(){N(f,"class","zoomable flexbox svelte-4dy2ei"),N(e,"class","canvas svelte-4dy2ei"),L(e,"height",n[2]+"px"),L(e,"width",n[1]+"px"),ze(()=>n[9].call(e))},m(M,h){q(M,e,h),Q(t,e,null),V(e,a),V(e,l),V(e,s),V(e,r),V(e,o),V(e,f),Q(c,f,null),_=Te(e,n[9].bind(e)),d=!0,y||(k=[pe(E=Mt.call(null,f)),G(f,"zoomed",n[6])],y=!0)},p(M,h){const p={};!i&&h&32&&(i=!0,p.scale=M[5].value,Z(()=>i=!1)),t.$set(p),(!d||h&2)&&He(l,M[1]),(!d||h&4)&&He(r,M[2]);const v={};h&8&&(v.arenaWidth=M[3]*100),h&16&&(v.arenaHeight=M[4]*100),!w&&h&1&&(w=!0,v.node=M[0],Z(()=>w=!1)),c.$set(v),(!d||h&4)&&L(e,"height",M[2]+"px"),(!d||h&2)&&L(e,"width",M[1]+"px")},i(M){d||(C(t.$$.fragment,M),C(c.$$.fragment,M),d=!0)},o(M){Y(t.$$.fragment,M),Y(c.$$.fragment,M),d=!1},d(M){M&&H(e),$(t),$(c),_(),y=!1,ke(k)}}}function jt(n){let e,t,i=n[5]&&Qe(n);return{c(){i&&i.c(),e=J()},l(a){i&&i.l(a),e=J()},m(a,l){i&&i.m(a,l),q(a,e,l),t=!0},p(a,[l]){a[5]?i?(i.p(a,l),l&32&&C(i,1)):(i=Qe(a),i.c(),C(i,1),i.m(e.parentNode,e)):i&&(ce(),Y(i,1,1,()=>{i=null}),fe())},i(a){t||(C(i),t=!0)},o(a){Y(i),t=!1},d(a){i&&i.d(a),a&&H(e)}}}function Gt(n,e,t){let i;Ce(n,be,_=>t(5,i=_));let{data:a}=e,{width:l=400}=e,{height:s=600}=e,r,o;function f(_){lt(be,i=_.detail.scale,i)}function c(_){n.$$.not_equal(i.value,_)&&(i.value=_,be.set(i))}function w(_){a=_,t(0,a)}function E(){r=this.clientWidth,o=this.clientHeight,t(3,r),t(4,o)}return n.$$set=_=>{"data"in _&&t(0,a=_.data),"width"in _&&t(1,l=_.width),"height"in _&&t(2,s=_.height)},[a,l,s,r,o,i,f,c,w,E]}class Jt extends he{constructor(e){super();ue(this,e,Gt,jt,de,{data:0,width:1,height:2})}}const{window:Kt}=mt;function $e(n){let e,t,i;function a(s){n[5](s)}let l={width:n[0],height:n[1]};return n[2]!==void 0&&(l.data=n[2]),e=new Jt({props:l}),B.push(()=>U(e,"data",a)),{c(){K(e.$$.fragment)},l(s){se(e.$$.fragment,s)},m(s,r){Q(e,s,r),i=!0},p(s,r){const o={};r&1&&(o.width=s[0]),r&2&&(o.height=s[1]),!t&&r&4&&(t=!0,o.data=s[2],Z(()=>t=!1)),e.$set(o)},i(s){i||(C(e.$$.fragment,s),i=!0)},o(s){Y(e.$$.fragment,s),i=!1},d(s){$(e,s)}}}function Qt(n){let e,t,i,a,l=n[3]&&$e(n);return{c(){e=R("div"),l&&l.c(),this.h()},l(s){e=P(s,"DIV",{class:!0,style:!0});var r=x(e);l&&l.l(r),r.forEach(H),this.h()},h(){N(e,"class","app svelte-16vwtwf"),L(e,"--vh",n[3]+"px"),L(e,"height","calc(var(--vh, 1vh) * 100)")},m(s,r){q(s,e,r),l&&l.m(e,null),t=!0,i||(a=G(Kt,"resize",n[4]),i=!0)},p(s,[r]){s[3]?l?(l.p(s,r),r&8&&C(l,1)):(l=$e(s),l.c(),C(l,1),l.m(e,null)):l&&(ce(),Y(l,1,1,()=>{l=null}),fe()),(!t||r&8)&&L(e,"--vh",s[3]+"px")},i(s){t||(C(l),t=!0)},o(s){Y(l),t=!1},d(s){s&&H(e),l&&l.d(),i=!1,a()}}}function $t(n,e,t){let i,a;function l(){return Math.floor(Math.random()*10%ne.length)}let s={name:"My Dashboard of Lists",id:me(),x:20,y:20,style:{backgroundColor:ne[l()],width:600,left:20,top:20,height:800},children:[{name:"Child 1",id:me(),x:60,y:80,style:{backgroundColor:ne[l()],width:220,height:520,left:20,top:20},props:[],children:[{name:"Child A",id:me(),x:20,y:80,style:{backgroundColor:ne[l()],width:120,height:120,left:20,top:20},props:[],children:[]}]},{name:"Child 2",id:me(),x:300,y:80,style:{backgroundColor:ne[l()],width:100,height:140,left:20,top:20},props:[],children:[]},{name:"Child 3",id:me(),x:420,y:80,style:{backgroundColor:ne[l()],width:100,height:160,left:20,top:20},props:[],children:[]}]},r;Xe(()=>{o()});function o(c){t(3,r=window.innerHeight*.01),t(1,a=window.innerHeight),t(0,i=document==null?void 0:document.body.clientWidth)}function f(c){s=c,t(2,s)}return[i,a,s,r,o,f]}class en extends he{constructor(e){super();ue(this,e,$t,Qt,de,{})}}function et(n){let e,t;return e=new en({}),{c(){K(e.$$.fragment)},l(i){se(e.$$.fragment,i)},m(i,a){Q(e,i,a),t=!0},i(i){t||(C(e.$$.fragment,i),t=!0)},o(i){Y(e.$$.fragment,i),t=!1},d(i){$(e,i)}}}function tn(n){let e,t,i=n[0]&&et();return{c(){i&&i.c(),e=J()},l(a){i&&i.l(a),e=J()},m(a,l){i&&i.m(a,l),q(a,e,l),t=!0},p(a,[l]){a[0]?i?l&1&&C(i,1):(i=et(),i.c(),C(i,1),i.m(e.parentNode,e)):i&&(ce(),Y(i,1,1,()=>{i=null}),fe())},i(a){t||(C(i),t=!0)},o(a){Y(i),t=!1},d(a){i&&i.d(a),a&&H(e)}}}function nn(n,e,t){let i;return Xe(()=>{t(0,i=!0)}),[i]}class an extends he{constructor(e){super();ue(this,e,nn,tn,de,{})}}export{an as default};