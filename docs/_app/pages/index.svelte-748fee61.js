var rt=Object.defineProperty,ot=Object.defineProperties;var ct=Object.getOwnPropertyDescriptors;var Se=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,ut=Object.prototype.propertyIsEnumerable;var Ne=(n,e,t)=>e in n?rt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Me=(n,e)=>{for(var t in e||(e={}))ft.call(e,t)&&Ne(n,t,e[t]);if(Se)for(var t of Se(e))ut.call(e,t)&&Ne(n,t,e[t]);return n},De=(n,e)=>ot(n,ct(e));import{L as ht,S as ce,i as fe,s as ue,e as P,t as _e,k as se,c as j,a as x,h as me,m as ae,d as C,b as I,g as N,J as B,M as pe,N as dt,j as et,K as de,D as tt,f as X,O as nt,P as Le,Q as He,v as Ye,R as A,T as We,U as Xe,V as it,E as gt,W as Ve,X as J,Y as ke,l as Z,Z as Ce,_ as Te,$ as R,w as K,x as ie,y as Q,a0 as U,q as H,o as Y,B as $,a1 as _t,n as re,p as oe,a2 as lt}from"../chunks/vendor-23e7b3e7.js";function ge(n=16){return ht("abcdefghijklmnopqrztuvwxyz1234567890",n)()}function mt(n){return{name:"Name",id:ge(),x:10,y:10,style:{backgroundColor:"#fee9004b",width:120,height:120,left:10,top:10},props:[],children:[]}}function pt(n){let e,t,i,a,l,s,r,o;return{c(){e=P("div"),t=_e("Scale "),i=_e(n[0]),a=se(),l=P("div"),s=_e("+ Drag Me"),this.h()},l(u){e=j(u,"DIV",{class:!0});var c=x(e);t=me(c,"Scale "),i=me(c,n[0]),a=ae(c),l=j(c,"DIV",{class:!0});var m=x(l);s=me(m,"+ Drag Me"),m.forEach(C),c.forEach(C),this.h()},h(){I(l,"class","yellow svelte-1skbl8q"),I(e,"class","pallette svelte-1skbl8q")},m(u,c){N(u,e,c),B(e,t),B(e,i),B(e,a),B(e,l),B(l,s),r||(o=pe(dt.call(null,l,{Extras:{newContainer:n[1]},Operations:"copy",DataToOffer:{"item/plain":""}})),r=!0)},p(u,[c]){c&1&&et(i,u[0])},i:de,o:de,d(u){u&&C(e),r=!1,o()}}}function vt(n,e,t){let{children:i}=e,{scale:a=1}=e,l=mt();return n.$$set=s=>{"children"in s&&t(2,i=s.children),"scale"in s&&t(0,a=s.scale)},[a,l,i]}class yt extends ce{constructor(e){super();fe(this,e,vt,pt,ue,{children:2,scale:0})}}class bt{constructor({container:e}){this.container=e,this.vtm=this.createMatrix(),this.x=0,this.y=0,this.captureScale=1,this.stop=!1}clamp(e,t,i,a){let l=(this.container.clientWidth-a.width)/2,s=(this.container.clientHeight-a.height)/2,r=l*e+a.width*e-this.container.clientWidth,o=Math.min(this.vtm.e*1,0),u=Math.min(this.vtm.f*1,0),c=t>0?o:-(l*e),m=t>0?o:-r,E=this.vtm.e;E=Math.max(m,this.vtm.e),E=Math.min(c,E);let d=s*e+a.height*e-this.container.clientHeight,_=i>0?u:-(s*e),y=i>0?u:-d,M=this.vtm.f;M=Math.min(_,M),M=Math.max(M,y),this.vtm=this.createMatrix().translate(E,M).scale(Math.max(this.vtm.a,1))}createMatrix(){return new DOMMatrix}move(e,t,i,a,l){return this.vtm=this.createMatrix().translate(this.x-e,this.y-t).scale(this.vtm.a),this.vtm}scale(e,t,i,a,l,s,r,o,u){return this.vtm=this.createMatrix().translate(i.x,i.y).scale(e,t).translate(-i.x,-i.y).multiply(this.vtm),Math.min(Math.max(1,this.vtm.a),r),this.vtm}}class st{constructor(){this.touchA={clientX:0,clientY:0,t:0,velocity:1},this.touchB={clientX:0,clientY:0,t:0,velocity:1}}down(e,t){this.touchA={clientX:e.clientX,clientY:e.clientY,t:Date.now(),velocity:0},this.touchB={clientX:t.clientX,clientY:t.clientY,t:Date.now(),veloctiy:0}}calc(e,t){var i=e.clientX,a=e.clientY,l=Date.now(),s=i-t.clientX,r=a-t.clientY,o=l-t.t,u=Math.sqrt(s*s+r*r)/o;t.velocity=u,t.clientX=i,t.clientY=a,t.t=l}getVelocity(e,t){return this.calc(e,this.touchA),this.calc(t,this.touchB),this.touchA.velocity+this.touchB.velocity}}function wt(n,e,t,i){var a=Math.min(t/n,i/e);return{width:n*a,height:e*a,ratio:a}}function qe(n,e){return Math.hypot(n.pageX-e.pageX,n.pageY-e.pageY)}let Ae=!1,te={initX:0,initY:0,newX:0,newY:0},G,q,Ie=new st,Ee={time:0,x:0,y:0};const kt=(n,e={})=>{var V;let t={scaling:!1,x1:0,x2:0,y1:0,y2:0,lastHypo:0,originX:0,originY:0,value:((V=e==null?void 0:e.scale)==null?void 0:V.value)||1,max:20},i=n.parentElement||document.body;i.style["touch-action"]="none",i.style["user-select"]="none",i.style.overflow="hidden",i.style.position="relative",n.style["touch-action"]="none",n.style["user-select"]="none",n.style.position="absolute",n.style.height="100%",n.style.width="100%",q=new bt({container:i}),s(),n.addEventListener("dragstart",l,{passive:!1}),n.addEventListener("drag",l,{passive:!1}),i.addEventListener("mousedown",W,{passive:!1}),i.addEventListener("touchstart",y,{passive:!1}),i.addEventListener("wheel",_,{passive:!1}),i.addEventListener("dragstart",l,{passive:!1}),i.addEventListener("drag",l,{passive:!1}),window.addEventListener("resize",r);const a=new MutationObserver((p,v)=>{for(const w of p)if(w.type==="attributes"){let F;const z=/(\w+)\(([^)]*)\)/g;for(;F=z.exec(n.style.transform);)F[1]=="scale"&&parseFloat(F[2]).toFixed(2)!=t.value.toFixed(2)&&(t.value=F[2])}});a.observe(n,{attributes:!0,childList:!1,subtree:!1});function l(p){return console.log("Removing drag listener"),!1}function s(){const{offsetWidth:p,offsetHeight:v}=n;G=wt(p,v,i.clientWidth,i.clientHeight)}function r(){s(),o(0,0),u(0,0),c()}function o(p,v){te.initX=p,te.initY=v,q.x=q.vtm.e,q.y=q.vtm.f}function u(p,v){if(t.scaling)return;let w=(i.clientWidth-G.width*q.vtm.a)/2,F=(i.clientHeight-G.height*q.vtm.a)/2;te.newX=te.initX-p,te.newY=te.initY-v;const z=q.move(te.newX,te.newY,w,F,G);n.style.transform=`matrix(${z.a},${z.b},${z.c},${z.d},${z.e}, ${z.f})`}function c(){q.x-=te.newX,q.y-=te.newY,t.scaling=!1,t.lastHypo=0}function m(p,v){const w=[Math.min(p.pageX,v.pageX),Math.max(p.pageX,v.pageX)],F=[Math.min(p.pageY,v.pageY),Math.max(p.pageY,v.pageY)],f=(w[1]-w[0])/2+w[0],g=(F[1]-F[0])/2+F[0];t.originX=f,t.originY=g,t.lastHypo=Math.trunc(qe(p,v))}function E(p,v){let w=q.vtm.a,F=w>1?w-1:t.max/2.5,z=w>1?-1:1;const f=1+F*z,k=f;let g=(i.clientWidth-G.width*Math.max(f*w,1))/2,S=(i.clientHeight-G.height*Math.max(f*w,1))/2;const T={x:p-i.clientWidth/2-i.offsetLeft,y:v-i.clientHeight/2-i.offsetTop},h=q.scale(f,k,T,g,S,G,t.max,t.value*f,z);t.value=h.d,n.style.transform=`translate(${h.e}px, ${h.f}px) scale(${h.a})`}function d(p,v,w){const F=qe(p,v);let z=F/t.lastHypo;z=z>=1?1:-1;const f=Ie.getVelocity(p,v)||1,k=1+.1*f*z,g=k;let S=(i.clientWidth-G.width*q.vtm.a)/2,T=(i.clientHeight-G.height*q.vtm.a)/2;const h={x:t.originX-i.clientWidth/2-i.offsetLeft,y:t.originY-i.clientHeight/2-i.offsetTop},O=q.scale(k,g,h,S,T,G,t.max,t.value*k,z);t.value=O.d,t.lastHypo=F,t.scaling=!0,n.style.transform=`translate(${O.e}px, ${O.f}px) scale(${O.a})`}function _(p){p.preventDefault();const v=p.deltaY<0?1:-1,w=1+.1*v,F=w;let z=(i.clientWidth-G.width*q.vtm.a)/2,f=(i.clientHeight-G.height*q.vtm.a)/2;const k={x:p.pageX-i.clientWidth/2-i.offsetLeft,y:p.pageY-i.clientHeight/2-i.offsetTop},g=q.scale(w,F,k,z,f,G,t.max,t.value*w,v);t.value=g.d,n.style.transform=`translate(${g.e}px,${g.f}px) scale(${g.a})`,n.dispatchEvent(new CustomEvent("zoomed",{detail:{style:n.style,scale:t,matrix:q,origin:k}}))}function y(p){Ae=!0;const v=p.touches.length===2,[w,F]=p.touches;if(t.scaling=v,v)m(w,F),Ie.down(w,F);else{const{pageX:f,pageY:k}=w;var z=new Date().getTime();z-Ee.time<250&&Math.hypot(Ee.x-f,Ee.y-k)<=20?E(f,k):o(f,k),Ee={time:z,x:f,y:k}}n.removeEventListener("touchmove",M),n.removeEventListener("touchend",b),n.addEventListener("touchmove",M),n.addEventListener("touchend",b)}function M(p){if(t.scaling){const[v,w]=p.touches;d(v,w)}else u(p.touches[0].pageX,p.touches[0].pageY)}function b(p){c(),n.removeEventListener("touchmove",M),n.removeEventListener("touchend",b),n.removeEventListener("touchcancel",b)}function W(p){if(i!==p.target&&n!==p.target)return;const{clientX:v,clientY:w}=p;Ae||(o(v,w),i.addEventListener("mousemove",L),i.addEventListener("mouseup",D))}function L({clientX:p,clientY:v}){u(p,v)}function D(){i.removeEventListener("mousemove",L),c()}return{update(p){console.log("Directive updated params",{params:p})},destroy(){n.removeEventListener("wheel",_),n.removeEventListener("mousedown",W),n.removeEventListener("touchstart",y),n.removeEventListener("dragstart",l),n.addEventListener("drag",l),window.removeEventListener("resize",r),a.disconnect()}}};new st;const we=tt({value:1}),Be=tt(null);function Mt(n){let e,t,i,a,l;return{c(){e=P("div"),this.h()},l(s){e=j(s,"DIV",{class:!0,style:!0}),x(e).forEach(C),this.h()},h(){I(e,"class",t="resize-handle "+n[2]+" svelte-ci56im"),X(e,"--size",Dt),X(e,"left",n[5]+"px"),X(e,"top",n[4]+"px"),X(e,"cursor",n[6])},m(s,r){N(s,e,r),n[20](e),a||(l=pe(i=nt.call(null,e,{Extras:n[2],onDragStart:{x:n[0],y:n[1]},onDragMove:n[7],onDragEnd:n[8]})),a=!0)},p(s,[r]){r&4&&t!==(t="resize-handle "+s[2]+" svelte-ci56im")&&I(e,"class",t),r&32&&X(e,"left",s[5]+"px"),r&16&&X(e,"top",s[4]+"px"),i&&Le(i.update)&&r&7&&i.update.call(null,{Extras:s[2],onDragStart:{x:s[0],y:s[1]},onDragMove:s[7],onDragEnd:s[8]})},i:de,o:de,d(s){s&&C(e),n[20](null),a=!1,l()}}}let Dt="1em";function Et(n,e,t){let i,a,l;He(n,we,g=>t(23,l=g));let{x:s}=e,{y:r}=e,{width:o}=e,{height:u}=e,{name:c}=e;console.log(c,{height:u});let{maxFrameHeight:m=2500}=e,{maxFrameWidth:E=2500}=e,{minFrameHeight:d=40}=e,{minFrameWidth:_=40}=e,{arenaWidth:y}=e,{arenaHeight:M}=e,{direction:b}=e,{isDragging:W=!1}=e,{grid:L}=e,D,V=8,p=8;Ye(()=>{V=D?parseFloat(getComputedStyle(D).width.replace("px","")):8,p=D?parseFloat(getComputedStyle(D).height.replace("px","")):8});let v=b=="nw"||b=="se"?"nwse-resize":b=="n"||b=="s"?"ns-resize":b=="ne"||b=="sw"?"nesw-resize":"ew-resize";function w(g,S,T){switch(g){case"nw":case"w":case"sw":return S-V;case"n":case"s":return S+T/2;case"ne":case"e":case"se":return S+T+V}}function F(g,S,T){switch(g){case"nw":case"n":case"ne":return S-p;case"e":case"w":return S+T/2-p/2;case"sw":case"s":case"se":return S+T+p/2}}function z(g,S,T,h,O){switch(O){case"nw":case"w":case"sw":t(0,s=Math.max(0,s+o-E,Math.min(s+o-_,y,s+T/l.value))),t(9,o=o-T/l.value);break;case"ne":case"e":case"se":t(9,o=Math.max(0,s+_,Math.min(s+E,y,s+o+T/l.value))-s)}switch(O){case"nw":case"n":case"ne":t(1,r=Math.max(0,r+u-m,Math.min(r+u-d,M,r+h/l.value))),t(10,u=u-h/l.value);break;case"sw":case"s":case"se":t(10,u=Math.max(0,r+d,Math.min(r+m,M,r+u+h/l.value))-r)}}function f(g,S,T,h,O){t(11,W=!1),L&&(t(0,s=Math.floor(s/L)*L),t(1,r=Math.floor(r/L)*L),t(9,o=Math.floor(o/L)*L),t(10,u=Math.floor(u/L)*L))}function k(g){A[g?"unshift":"push"](()=>{D=g,t(3,D)})}return n.$$set=g=>{"x"in g&&t(0,s=g.x),"y"in g&&t(1,r=g.y),"width"in g&&t(9,o=g.width),"height"in g&&t(10,u=g.height),"name"in g&&t(12,c=g.name),"maxFrameHeight"in g&&t(13,m=g.maxFrameHeight),"maxFrameWidth"in g&&t(14,E=g.maxFrameWidth),"minFrameHeight"in g&&t(15,d=g.minFrameHeight),"minFrameWidth"in g&&t(16,_=g.minFrameWidth),"arenaWidth"in g&&t(17,y=g.arenaWidth),"arenaHeight"in g&&t(18,M=g.arenaHeight),"direction"in g&&t(2,b=g.direction),"isDragging"in g&&t(11,W=g.isDragging),"grid"in g&&t(19,L=g.grid)},n.$$.update=()=>{n.$$.dirty&517&&t(5,i=w(b,s,o)),n.$$.dirty&1030&&t(4,a=F(b,r,u))},[s,r,b,D,a,i,v,z,f,o,u,W,c,m,E,d,_,y,M,L,k]}class Ht extends ce{constructor(e){super();fe(this,e,Et,Mt,ue,{x:0,y:1,width:9,height:10,name:12,maxFrameHeight:13,maxFrameWidth:14,minFrameHeight:15,minFrameWidth:16,arenaWidth:17,arenaHeight:18,direction:2,isDragging:11,grid:19})}}function Fe(n,{enabled:e,handleUnselect:t}){const i=({target:l})=>{n!==l&&t()};function a({enabled:l}){l?window.addEventListener("click",i):window.removeEventListener("click",i)}return a({enabled:e}),{update:a,destroy(){window.removeEventListener("click",i)}}}function Ct(n){let e,t,i,a;return{c(){e=P("div"),this.h()},l(l){e=j(l,"DIV",{class:!0});var s=x(e);s.forEach(C),this.h()},h(){I(e,"class",t=Ve(n[0])+" svelte-1708iua")},m(l,s){N(l,e,s),e.innerHTML=n[4],n[14](e),i||(a=[J(e,"input",n[5]),J(e,"dblclick",n[5])],i=!0)},p(l,s){s&16&&(e.innerHTML=l[4]),s&1&&t!==(t=Ve(l[0])+" svelte-1708iua")&&I(e,"class",t)},d(l){l&&C(e),n[14](null),i=!1,ke(a)}}}function Wt(n){let e,t,i,a;return{c(){e=P("span"),t=_e(n[4]),this.h()},l(l){e=j(l,"SPAN",{contenteditable:!0,class:!0});var s=x(e);t=me(s,n[4]),s.forEach(C),this.h()},h(){I(e,"contenteditable",""),I(e,"class",n[0]),n[4]===void 0&&We(()=>n[13].call(e))},m(l,s){N(l,e,s),B(e,t),n[12](e),n[4]!==void 0&&(e.innerHTML=n[4]),i||(a=[J(e,"keydown",n[6]),J(e,"blur",n[7]),J(e,"input",n[13])],i=!0)},p(l,s){s&16&&et(t,l[4]),s&1&&I(e,"class",l[0]),s&16&&l[4]!==e.innerHTML&&(e.innerHTML=l[4])},d(l){l&&C(e),n[12](null),i=!1,ke(a)}}}function zt(n){let e,t;function i(s,r){return s[2]?Wt:Ct}let a=i(n),l=a(n);return{c(){e=P("div"),l.c(),this.h()},l(s){e=j(s,"DIV",{class:!0});var r=x(e);l.l(r),r.forEach(C),this.h()},h(){I(e,"class","svelte-1708iua"),We(()=>n[15].call(e))},m(s,r){N(s,e,r),l.m(e,null),t=Xe(e,n[15].bind(e))},p(s,[r]){a===(a=i(s))&&l?l.p(s,r):(l.d(1),l=a(s),l&&(l.c(),l.m(e,null)))},i:de,o:de,d(s){s&&C(e),l.d(),t()}}}function Lt(n,e,t){let{value:i=""}=e,{type:a="text"}=e,{placeholder:l=""}=e,{labelClasses:s=""}=e,{inputClasses:r=""}=e,o,u=!1,c,m=i;const E=it();async function d(D){if(t(2,u=!u),u){console.log("toggle editing"),await gt(),c.focus();let p=document.createRange();console.log({inputEl:c}),p.setStart(c.firstChild,0),p.setEnd(c.firstChild,c.firstChild.length);var V=window.getSelection();V.removeAllRanges(),V.addRange(p)}else t(8,i=m),E("doneEditing")}const _=D=>{console.log("checking keyup"),D.keyCode===13&&(D.preventDefault(),c.blur())},y=D=>{i!=""&&i!=null?d():t(8,i="Enter Value")};function M(D){A[D?"unshift":"push"](()=>{c=D,t(3,c)})}function b(){m=this.innerHTML,t(4,m)}function W(D){A[D?"unshift":"push"](()=>{c=D,t(3,c)})}function L(){o=this.offsetWidth,t(1,o)}return n.$$set=D=>{"value"in D&&t(8,i=D.value),"type"in D&&t(9,a=D.type),"placeholder"in D&&t(10,l=D.placeholder),"labelClasses"in D&&t(0,s=D.labelClasses),"inputClasses"in D&&t(11,r=D.inputClasses)},[s,o,u,c,m,d,_,y,i,a,l,r,M,b,W,L]}class Ft extends ce{constructor(e){super();fe(this,e,Lt,zt,ue,{value:8,type:9,placeholder:10,labelClasses:0,inputClasses:11})}}const ne=["#63B75A4B","#FEE9004B","#ff003b4b","#69f5dc4B","#FF9D484B","#7a00ff4B","#ff14f84b","#376bff4b"];function Oe(n,e,t){const i=n.slice();return i[2]=e[t],i}function Yt(n){let e,t=ne,i=[];for(let a=0;a<t.length;a+=1)i[a]=Re(Oe(n,t,a));return{c(){for(let a=0;a<i.length;a+=1)i[a].c();e=Z()},l(a){for(let l=0;l<i.length;l+=1)i[l].l(a);e=Z()},m(a,l){for(let s=0;s<i.length;s+=1)i[s].m(a,l);N(a,e,l)},p(a,l){if(l&1){t=ne;let s;for(s=0;s<t.length;s+=1){const r=Oe(a,t,s);i[s]?i[s].p(r,l):(i[s]=Re(r),i[s].c(),i[s].m(e.parentNode,e))}for(;s<i.length;s+=1)i[s].d(1);i.length=t.length}},d(a){Te(i,a),a&&C(e)}}}function Re(n){let e,t,i;function a(...l){return n[1](n[2],...l)}return{c(){e=P("div"),this.h()},l(l){e=j(l,"DIV",{class:!0,style:!0}),x(e).forEach(C),this.h()},h(){I(e,"class","colorOption svelte-10ineey"),X(e,"background-color",n[2])},m(l,s){N(l,e,s),t||(i=J(e,"click",Ce(a)),t=!0)},p(l,s){n=l},d(l){l&&C(e),t=!1,i()}}}function Xt(n){let e,t=ne&&Yt(n);return{c(){e=P("main"),t&&t.c(),this.h()},l(i){e=j(i,"MAIN",{class:!0});var a=x(e);t&&t.l(a),a.forEach(C),this.h()},h(){I(e,"class","svelte-10ineey")},m(i,a){N(i,e,a),t&&t.m(e,null)},p(i,[a]){ne&&t.p(i,a)},i:de,o:de,d(i){i&&C(e),t&&t.d()}}}function Tt(n,e,t){let{backgroundColor:i}=e;const a=(l,s)=>t(0,i=l);return n.$$set=l=>{"backgroundColor"in l&&t(0,i=l.backgroundColor)},[i,a]}class St extends ce{constructor(e){super();fe(this,e,Tt,Xt,ue,{backgroundColor:0})}}function Nt(n){let e,t,i,a,l,s,r,o,u,c,m,E;function d(y){n[2](y)}let _={};return n[1]!==void 0&&(_.backgroundColor=n[1]),t=new St({props:_}),A.push(()=>R(t,"backgroundColor",d)),{c(){e=P("div"),K(t.$$.fragment),a=se(),l=P("span"),s=_e("\u21AA"),r=se(),o=P("span"),u=_e("\u{1F5D1}\uFE0F"),this.h()},l(y){e=j(y,"DIV",{style:!0,class:!0});var M=x(e);ie(t.$$.fragment,M),a=ae(M),l=j(M,"SPAN",{class:!0});var b=x(l);s=me(b,"\u21AA"),b.forEach(C),r=ae(M),o=j(M,"SPAN",{class:!0});var W=x(o);u=me(W,"\u{1F5D1}\uFE0F"),W.forEach(C),M.forEach(C),this.h()},h(){I(l,"class","connect svelte-sbpf1i"),I(o,"class","svelte-sbpf1i"),X(e,"left",n[0].x+n[0].style.width+"px"),X(e,"top",n[0].y+"px"),I(e,"class","svelte-sbpf1i")},m(y,M){N(y,e,M),Q(t,e,null),B(e,a),B(e,l),B(l,s),B(e,r),B(e,o),B(o,u),c=!0,m||(E=[J(l,"click",Ce(qt)),J(o,"click",Ce(Vt))],m=!0)},p(y,[M]){const b={};!i&&M&2&&(i=!0,b.backgroundColor=y[1],U(()=>i=!1)),t.$set(b),(!c||M&1)&&X(e,"left",y[0].x+y[0].style.width+"px"),(!c||M&1)&&X(e,"top",y[0].y+"px")},i(y){c||(H(t.$$.fragment,y),c=!0)},o(y){Y(t.$$.fragment,y),c=!1},d(y){y&&C(e),$(t),m=!1,ke(E)}}}function Vt(n){}function qt(n){}function At(n,e,t){var s;let{node:i}=e,a=((s=i==null?void 0:i.style)==null?void 0:s.backgroundColor)||"#fee9004b";console.log({backgroundColor:a});function l(r){a=r,t(1,a)}return n.$$set=r=>{"node"in r&&t(0,i=r.node)},n.$$.update=()=>{n.$$.dirty&3&&a&&t(0,i=De(Me({},i),{style:De(Me({},i.style),{backgroundColor:a})}))},[i,a,l]}class It extends ce{constructor(e){super();fe(this,e,At,Nt,ue,{node:0})}}function Pe(n,e,t){const i=n.slice();return i[30]=e[t],i}function je(n,e,t){const i=n.slice();return i[33]=e[t],i[34]=e,i[35]=t,i}function xe(n){var F,z;let e,t,i,a,l,s,r,o,u,c,m,E,d,_,y,M,b;function W(f){n[15](f)}let L={};n[0].name!==void 0&&(L.value=n[0].name),i=new Ft({props:L}),A.push(()=>R(i,"value",W));function D(f){n[16](f)}var V=n[0].component;function p(f){let k={};return f[0].props!==void 0&&(k.props=f[0].props),{props:k}}V&&(s=new V(p(n)),A.push(()=>R(s,"props",D)));let v=((z=(F=n[0])==null?void 0:F.children)==null?void 0:z.length)>0&&Ue(n),w=n[4]&&n[7]&&Ge(n);return{c(){e=P("div"),t=P("div"),K(i.$$.fragment),l=se(),s&&K(s.$$.fragment),o=se(),v&&v.c(),d=se(),w&&w.c(),_=Z(),this.h()},l(f){e=j(f,"DIV",{class:!0,style:!0});var k=x(e);t=j(k,"DIV",{class:!0});var g=x(t);ie(i.$$.fragment,g),g.forEach(C),l=ae(k),s&&ie(s.$$.fragment,k),o=ae(k),v&&v.l(k),k.forEach(C),d=ae(f),w&&w.l(f),_=Z(),this.h()},h(){var f,k,g,S,T,h;I(t,"class","title svelte-71jgj4"),I(e,"class","container svelte-71jgj4"),X(e,"position","absolute"),X(e,"left",n[0].x+"px"),X(e,"top",n[0].y+"px"),X(e,"width",((k=(f=n[0])==null?void 0:f.style)==null?void 0:k.width)+"px"),X(e,"height",((S=(g=n[0])==null?void 0:g.style)==null?void 0:S.height)+"px"),X(e,"background-color",((h=(T=n[0])==null?void 0:T.style)==null?void 0:h.backgroundColor)||"#fee9004b"),We(()=>n[20].call(e))},m(f,k){N(f,e,k),B(e,t),Q(i,t,null),B(e,l),s&&Q(s,e,null),B(e,o),v&&v.m(e,null),n[19](e),u=Xe(e,n[20].bind(e)),N(f,d,k),w&&w.m(f,k),N(f,_,k),y=!0,M||(b=[pe(c=nt.call(null,e,{onDragStart:{x:n[0].x,y:n[0].y},onDragMove:n[9],onDragEnd:n[10]})),pe(m=_t.call(null,e,{TypesToAccept:{"item/plain":"all"},onDrop:n[11]})),pe(E=Fe.call(null,e,{enabled:n[7],handleUnselect:n[12]})),J(e,"click",Ce(n[13])),J(e,"focusout",n[12])],M=!0)},p(f,k){var T,h,O,he,ee,ve,ze,ye;const g={};!a&&k[0]&1&&(a=!0,g.value=f[0].name,U(()=>a=!1)),i.$set(g);const S={};if(!r&&k[0]&1&&(r=!0,S.props=f[0].props,U(()=>r=!1)),V!==(V=f[0].component)){if(s){re();const be=s;Y(be.$$.fragment,1,0,()=>{$(be,1)}),oe()}V?(s=new V(p(f)),A.push(()=>R(s,"props",D)),K(s.$$.fragment),H(s.$$.fragment,1),Q(s,e,o)):s=null}else V&&s.$set(S);((h=(T=f[0])==null?void 0:T.children)==null?void 0:h.length)>0?v?(v.p(f,k),k[0]&1&&H(v,1)):(v=Ue(f),v.c(),H(v,1),v.m(e,null)):v&&(re(),Y(v,1,1,()=>{v=null}),oe()),(!y||k[0]&1)&&X(e,"left",f[0].x+"px"),(!y||k[0]&1)&&X(e,"top",f[0].y+"px"),(!y||k[0]&1)&&X(e,"width",((he=(O=f[0])==null?void 0:O.style)==null?void 0:he.width)+"px"),(!y||k[0]&1)&&X(e,"height",((ve=(ee=f[0])==null?void 0:ee.style)==null?void 0:ve.height)+"px"),(!y||k[0]&1)&&X(e,"background-color",((ye=(ze=f[0])==null?void 0:ze.style)==null?void 0:ye.backgroundColor)||"#fee9004b"),c&&Le(c.update)&&k[0]&1&&c.update.call(null,{onDragStart:{x:f[0].x,y:f[0].y},onDragMove:f[9],onDragEnd:f[10]}),E&&Le(E.update)&&k[0]&128&&E.update.call(null,{enabled:f[7],handleUnselect:f[12]}),f[4]&&f[7]?w?(w.p(f,k),k[0]&144&&H(w,1)):(w=Ge(f),w.c(),H(w,1),w.m(_.parentNode,_)):w&&(re(),Y(w,1,1,()=>{w=null}),oe())},i(f){y||(H(i.$$.fragment,f),s&&H(s.$$.fragment,f),H(v),H(w),y=!0)},o(f){Y(i.$$.fragment,f),s&&Y(s.$$.fragment,f),Y(v),Y(w),y=!1},d(f){f&&C(e),$(i),s&&$(s),v&&v.d(),n[19](null),u(),f&&C(d),w&&w.d(f),f&&C(_),M=!1,ke(b)}}}function Ue(n){let e,t,i=n[0].children,a=[];for(let s=0;s<i.length;s+=1)a[s]=Ze(je(n,i,s));const l=s=>Y(a[s],1,1,()=>{a[s]=null});return{c(){for(let s=0;s<a.length;s+=1)a[s].c();e=Z()},l(s){for(let r=0;r<a.length;r+=1)a[r].l(s);e=Z()},m(s,r){for(let o=0;o<a.length;o+=1)a[o].m(s,r);N(s,e,r),t=!0},p(s,r){if(r[0]&99){i=s[0].children;let o;for(o=0;o<i.length;o+=1){const u=je(s,i,o);a[o]?(a[o].p(u,r),H(a[o],1)):(a[o]=Ze(u),a[o].c(),H(a[o],1),a[o].m(e.parentNode,e))}for(re(),o=i.length;o<a.length;o+=1)l(o);oe()}},i(s){if(!t){for(let r=0;r<i.length;r+=1)H(a[r]);t=!0}},o(s){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)Y(a[r]);t=!1},d(s){Te(a,s),s&&C(e)}}}function Ze(n){let e,t,i,a;function l(o){n[17](o,n[33],n[34],n[35])}function s(o){n[18](o)}let r={arenaWidth:n[5],arenaHeight:n[6]};return n[33]!==void 0&&(r.node=n[33]),n[1]!==void 0&&(r.isDragging=n[1]),e=new at({props:r}),A.push(()=>R(e,"node",l)),A.push(()=>R(e,"isDragging",s)),{c(){K(e.$$.fragment)},l(o){ie(e.$$.fragment,o)},m(o,u){Q(e,o,u),a=!0},p(o,u){n=o;const c={};u[0]&32&&(c.arenaWidth=n[5]),u[0]&64&&(c.arenaHeight=n[6]),!t&&u[0]&1&&(t=!0,c.node=n[33],U(()=>t=!1)),!i&&u[0]&2&&(i=!0,c.isDragging=n[1],U(()=>i=!1)),e.$set(c)},i(o){a||(H(e.$$.fragment,o),a=!0)},o(o){Y(e.$$.fragment,o),a=!1},d(o){$(e,o)}}}function Ge(n){let e,t,i,a,l=n[8],s=[];for(let c=0;c<l.length;c+=1)s[c]=Je(Pe(n,l,c));const r=c=>Y(s[c],1,1,()=>{s[c]=null});function o(c){n[26](c)}let u={};return n[0]!==void 0&&(u.node=n[0]),t=new It({props:u}),A.push(()=>R(t,"node",o)),{c(){for(let c=0;c<s.length;c+=1)s[c].c();e=se(),K(t.$$.fragment)},l(c){for(let m=0;m<s.length;m+=1)s[m].l(c);e=ae(c),ie(t.$$.fragment,c)},m(c,m){for(let E=0;E<s.length;E+=1)s[E].m(c,m);N(c,e,m),Q(t,c,m),a=!0},p(c,m){if(m[0]&271){l=c[8];let d;for(d=0;d<l.length;d+=1){const _=Pe(c,l,d);s[d]?(s[d].p(_,m),H(s[d],1)):(s[d]=Je(_),s[d].c(),H(s[d],1),s[d].m(e.parentNode,e))}for(re(),d=l.length;d<s.length;d+=1)r(d);oe()}const E={};!i&&m[0]&1&&(i=!0,E.node=c[0],U(()=>i=!1)),t.$set(E)},i(c){if(!a){for(let m=0;m<l.length;m+=1)H(s[m]);H(t.$$.fragment,c),a=!0}},o(c){s=s.filter(Boolean);for(let m=0;m<s.length;m+=1)Y(s[m]);Y(t.$$.fragment,c),a=!1},d(c){Te(s,c),c&&C(e),$(t,c)}}}function Je(n){let e,t,i,a,l,s,r;function o(_){n[21](_)}function u(_){n[22](_)}function c(_){n[23](_)}function m(_){n[24](_)}function E(_){n[25](_)}let d={name:n[0].name,maxFrameWidth:Rt,minFrameWidth:Ot,arenaWidth:n[3],arenaHeight:n[2],maxFrameHeight:jt,minFrameHeight:Pt,direction:n[30],grid:le};return n[0].x!==void 0&&(d.x=n[0].x),n[0].y!==void 0&&(d.y=n[0].y),n[0].style.width!==void 0&&(d.width=n[0].style.width),n[0].style.height!==void 0&&(d.height=n[0].style.height),n[1]!==void 0&&(d.isDragging=n[1]),e=new Ht({props:d}),A.push(()=>R(e,"x",o)),A.push(()=>R(e,"y",u)),A.push(()=>R(e,"width",c)),A.push(()=>R(e,"height",m)),A.push(()=>R(e,"isDragging",E)),{c(){K(e.$$.fragment)},l(_){ie(e.$$.fragment,_)},m(_,y){Q(e,_,y),r=!0},p(_,y){const M={};y[0]&1&&(M.name=_[0].name),y[0]&8&&(M.arenaWidth=_[3]),y[0]&4&&(M.arenaHeight=_[2]),!t&&y[0]&1&&(t=!0,M.x=_[0].x,U(()=>t=!1)),!i&&y[0]&1&&(i=!0,M.y=_[0].y,U(()=>i=!1)),!a&&y[0]&1&&(a=!0,M.width=_[0].style.width,U(()=>a=!1)),!l&&y[0]&1&&(l=!0,M.height=_[0].style.height,U(()=>l=!1)),!s&&y[0]&2&&(s=!0,M.isDragging=_[1],U(()=>s=!1)),e.$set(M)},i(_){r||(H(e.$$.fragment,_),r=!0)},o(_){Y(e.$$.fragment,_),r=!1},d(_){$(e,_)}}}function Bt(n){let e,t,i,a=n[0]&&document&&Fe&&xe(n);return{c(){e=se(),a&&a.c(),t=Z()},l(l){e=ae(l),a&&a.l(l),t=Z()},m(l,s){N(l,e,s),a&&a.m(l,s),N(l,t,s),i=!0},p(l,s){l[0]&&document&&Fe?a?(a.p(l,s),s[0]&1&&H(a,1)):(a=xe(l),a.c(),H(a,1),a.m(t.parentNode,t)):a&&(re(),Y(a,1,1,()=>{a=null}),oe())},i(l){i||(H(a),i=!0)},o(l){Y(a),i=!1},d(l){l&&C(e),a&&a.d(l),l&&C(t)}}}let le=20,Ot=40,Rt=2500,Pt=20,jt=2500;function xt(n,e,t){let i,a;He(n,Be,h=>t(14,i=h)),He(n,we,h=>t(27,a=h));let{node:l}=e,{arenaHeight:s}=e,{arenaWidth:r}=e,{isDragging:o=!1}=e;it();let u,c,m,E,d=["nw","w","sw","ne","e","se","n","s"];function _(h,O,he,ee){t(0,l.x=l.x+he/a.value,l),t(0,l.y=l.y+ee/a.value,l),b()}function y(h,O,he,ee,ve){t(1,o=!1),t(0,l.x=Math.round(l.x/le)*le,l),t(0,l.y=Math.round(l.y/le)*le,l),t(0,l.style.width=Math.round(l.style.width/le)*le,l),t(0,l.style.height=Math.round(l.style.height/le)*le,l)}function M(h,O,he,ee,ve,ze){let ye;for(let be in ee)ee.hasOwnProperty(be)&&(ye=be);return t(0,l.children=[...l.children,De(Me({},ve.newContainer),{x:h/a.value,y:O/a.value})],l),ye}function b(){l.x<0&&t(0,l.x=0,l),l.x+l.style.width>=r&&t(0,l.x-=l.x+l.style.width-r,l),l.y<0&&t(0,l.y=0,l),l.y+l.style.height>=s&&t(0,l.y-=l.y+l.style.height-s,l)}function W(){t(7,E=!1)}function L(h){u.focus(),lt(Be,i=u,i),t(7,E=!0)}function D(h){n.$$.not_equal(l.name,h)&&(l.name=h,t(0,l))}function V(h){n.$$.not_equal(l.props,h)&&(l.props=h,t(0,l))}function p(h,O,he,ee){he[ee]=h,t(0,l)}function v(h){o=h,t(1,o)}function w(h){A[h?"unshift":"push"](()=>{u=h,t(4,u)})}function F(){c=this.clientWidth,m=this.clientHeight,t(5,c),t(6,m)}function z(h){n.$$.not_equal(l.x,h)&&(l.x=h,t(0,l))}function f(h){n.$$.not_equal(l.y,h)&&(l.y=h,t(0,l))}function k(h){n.$$.not_equal(l.style.width,h)&&(l.style.width=h,t(0,l))}function g(h){n.$$.not_equal(l.style.height,h)&&(l.style.height=h,t(0,l))}function S(h){o=h,t(1,o)}function T(h){l=h,t(0,l)}return n.$$set=h=>{"node"in h&&t(0,l=h.node),"arenaHeight"in h&&t(2,s=h.arenaHeight),"arenaWidth"in h&&t(3,r=h.arenaWidth),"isDragging"in h&&t(1,o=h.isDragging)},n.$$.update=()=>{n.$$.dirty[0]&12&&(r||s)&&b(),n.$$.dirty[0]&16400&&i!=u&&W()},[l,o,s,r,u,c,m,E,d,_,y,M,W,L,i,D,V,p,v,w,F,z,f,k,g,S,T]}class at extends ce{constructor(e){super();fe(this,e,xt,Bt,ue,{node:0,arenaHeight:2,arenaWidth:3,isDragging:1},null,[-1,-1])}}function Ke(n){let e,t,i,a,l,s,r,o,u,c,m,E;function d(b){n[7](b)}let _={};n[5].value!==void 0&&(_.scale=n[5].value),t=new yt({props:_}),A.push(()=>R(t,"scale",d));function y(b){n[8](b)}let M={arenaWidth:n[3]*100,arenaHeight:n[4]*100};return n[0]!==void 0&&(M.node=n[0]),s=new at({props:M}),A.push(()=>R(s,"node",y)),{c(){e=P("div"),K(t.$$.fragment),a=se(),l=P("div"),K(s.$$.fragment),this.h()},l(b){e=j(b,"DIV",{class:!0,style:!0});var W=x(e);ie(t.$$.fragment,W),a=ae(W),l=j(W,"DIV",{class:!0});var L=x(l);ie(s.$$.fragment,L),L.forEach(C),W.forEach(C),this.h()},h(){I(l,"class","zoomable flexbox svelte-4dy2ei"),I(e,"class","canvas svelte-4dy2ei"),X(e,"height",n[2]+"px"),X(e,"width",n[1]+"px"),We(()=>n[9].call(e))},m(b,W){N(b,e,W),Q(t,e,null),B(e,a),B(e,l),Q(s,l,null),u=Xe(e,n[9].bind(e)),c=!0,m||(E=[pe(o=kt.call(null,l)),J(l,"zoomed",n[6])],m=!0)},p(b,W){const L={};!i&&W&32&&(i=!0,L.scale=b[5].value,U(()=>i=!1)),t.$set(L);const D={};W&8&&(D.arenaWidth=b[3]*100),W&16&&(D.arenaHeight=b[4]*100),!r&&W&1&&(r=!0,D.node=b[0],U(()=>r=!1)),s.$set(D),(!c||W&4)&&X(e,"height",b[2]+"px"),(!c||W&2)&&X(e,"width",b[1]+"px")},i(b){c||(H(t.$$.fragment,b),H(s.$$.fragment,b),c=!0)},o(b){Y(t.$$.fragment,b),Y(s.$$.fragment,b),c=!1},d(b){b&&C(e),$(t),$(s),u(),m=!1,ke(E)}}}function Ut(n){let e,t,i=n[5]&&Ke(n);return{c(){i&&i.c(),e=Z()},l(a){i&&i.l(a),e=Z()},m(a,l){i&&i.m(a,l),N(a,e,l),t=!0},p(a,[l]){a[5]?i?(i.p(a,l),l&32&&H(i,1)):(i=Ke(a),i.c(),H(i,1),i.m(e.parentNode,e)):i&&(re(),Y(i,1,1,()=>{i=null}),oe())},i(a){t||(H(i),t=!0)},o(a){Y(i),t=!1},d(a){i&&i.d(a),a&&C(e)}}}function Zt(n,e,t){let i;He(n,we,d=>t(5,i=d));let{data:a}=e,{width:l=400}=e,{height:s=600}=e,r,o;function u(d){lt(we,i=d.detail.scale,i)}function c(d){n.$$.not_equal(i.value,d)&&(i.value=d,we.set(i))}function m(d){a=d,t(0,a)}function E(){r=this.clientWidth,o=this.clientHeight,t(3,r),t(4,o)}return n.$$set=d=>{"data"in d&&t(0,a=d.data),"width"in d&&t(1,l=d.width),"height"in d&&t(2,s=d.height)},[a,l,s,r,o,i,u,c,m,E]}class Gt extends ce{constructor(e){super();fe(this,e,Zt,Ut,ue,{data:0,width:1,height:2})}}function Qe(n){let e,t,i;function a(s){n[5](s)}let l={width:n[0],height:n[1]};return n[3]!==void 0&&(l.data=n[3]),e=new Gt({props:l}),A.push(()=>R(e,"data",a)),{c(){K(e.$$.fragment)},l(s){ie(e.$$.fragment,s)},m(s,r){Q(e,s,r),i=!0},p(s,r){const o={};r&1&&(o.width=s[0]),r&2&&(o.height=s[1]),!t&&r&8&&(t=!0,o.data=s[3],U(()=>t=!1)),e.$set(o)},i(s){i||(H(e.$$.fragment,s),i=!0)},o(s){Y(e.$$.fragment,s),i=!1},d(s){$(e,s)}}}function Jt(n){let e,t,i,a,l=n[2]&&Qe(n);return{c(){l&&l.c(),e=Z()},l(s){l&&l.l(s),e=Z()},m(s,r){l&&l.m(s,r),N(s,e,r),t=!0,i||(a=J(window,"resize",n[4]),i=!0)},p(s,[r]){s[2]?l?(l.p(s,r),r&4&&H(l,1)):(l=Qe(s),l.c(),H(l,1),l.m(e.parentNode,e)):l&&(re(),Y(l,1,1,()=>{l=null}),oe())},i(s){t||(H(l),t=!0)},o(s){Y(l),t=!1},d(s){l&&l.d(s),s&&C(e),i=!1,a()}}}function Kt(n,e,t){let i,a,l;function s(){return Math.floor(Math.random()*10%ne.length)}let r={name:"My Dashboard of Lists",id:ge(),x:20,y:20,style:{backgroundColor:ne[s()],width:600,left:20,top:20,height:800},children:[{name:"Child 1",id:ge(),x:60,y:80,style:{backgroundColor:ne[s()],width:220,height:520,left:20,top:20},props:[],children:[{name:"Child A",id:ge(),x:20,y:80,style:{backgroundColor:ne[s()],width:120,height:120,left:20,top:20},props:[],children:[]}]},{name:"Child 2",id:ge(),x:300,y:80,style:{backgroundColor:ne[s()],width:100,height:140,left:20,top:20},props:[],children:[]},{name:"Child 3",id:ge(),x:420,y:80,style:{backgroundColor:ne[s()],width:100,height:160,left:20,top:20},props:[],children:[]}]};Ye(()=>{t(2,l=!0),o()});function o(c){t(1,a=document==null?void 0:document.body.offsetHeight),t(0,i=document==null?void 0:document.body.offsetWidth)}function u(c){r=c,t(3,r)}return[i,a,l,r,o,u]}class Qt extends ce{constructor(e){super();fe(this,e,Kt,Jt,ue,{})}}function $e(n){let e,t;return e=new Qt({}),{c(){K(e.$$.fragment)},l(i){ie(e.$$.fragment,i)},m(i,a){Q(e,i,a),t=!0},i(i){t||(H(e.$$.fragment,i),t=!0)},o(i){Y(e.$$.fragment,i),t=!1},d(i){$(e,i)}}}function $t(n){let e,t,i=n[0]&&$e();return{c(){i&&i.c(),e=Z()},l(a){i&&i.l(a),e=Z()},m(a,l){i&&i.m(a,l),N(a,e,l),t=!0},p(a,[l]){a[0]?i?l&1&&H(i,1):(i=$e(),i.c(),H(i,1),i.m(e.parentNode,e)):i&&(re(),Y(i,1,1,()=>{i=null}),oe())},i(a){t||(H(i),t=!0)},o(a){Y(i),t=!1},d(a){i&&i.d(a),a&&C(e)}}}function en(n,e,t){let i;return Ye(()=>{t(0,i=!0)}),[i]}class ln extends ce{constructor(e){super();fe(this,e,en,$t,ue,{})}}export{ln as default};