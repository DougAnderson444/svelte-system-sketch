function Y(){}function Ne(e,n){for(const r in n)e[r]=n[r];return e}function xe(e){return e()}function he(){return Object.create(null)}function B(e){e.forEach(xe)}function _e(e){return typeof e=="function"}function Re(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}function ze(e){return Object.keys(e).length===0}function Be(e,...n){if(e==null)return Y;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function Rn(e,n,r){e.$$.on_destroy.push(Be(n,r))}function zn(e,n,r,t){if(e){const a=Te(e,n,r,t);return e[0](a)}}function Te(e,n,r,t){return e[1]&&t?Ne(r.ctx.slice(),e[1](t(n))):r.ctx}function Bn(e,n,r,t){if(e[2]&&t){const a=e[2](t(r));if(n.dirty===void 0)return a;if(typeof a=="object"){const l=[],c=Math.max(n.dirty.length,a.length);for(let s=0;s<c;s+=1)l[s]=n.dirty[s]|a[s];return l}return n.dirty|a}return n.dirty}function Gn(e,n,r,t,a,l){if(a){const c=Te(n,r,t,l);e.p(c,a)}}function qn(e){if(e.ctx.length>32){const n=[],r=e.ctx.length/32;for(let t=0;t<r;t++)n[t]=-1;return n}return-1}function Jn(e){return e==null?"":e}function Kn(e,n,r){return e.set(r),n}function Un(e){return e&&_e(e.destroy)?e.destroy:Y}let O=!1;function Ge(){O=!0}function qe(){O=!1}function Je(e,n,r,t){for(;e<n;){const a=e+(n-e>>1);r(a)<=t?e=a+1:n=a}return e}function Ke(e){if(e.hydrate_init)return;e.hydrate_init=!0;let n=e.childNodes;if(e.nodeName==="HEAD"){const i=[];for(let d=0;d<n.length;d++){const D=n[d];D.claim_order!==void 0&&i.push(D)}n=i}const r=new Int32Array(n.length+1),t=new Int32Array(n.length);r[0]=-1;let a=0;for(let i=0;i<n.length;i++){const d=n[i].claim_order,D=(a>0&&n[r[a]].claim_order<=d?a+1:Je(1,a,u=>n[r[u]].claim_order,d))-1;t[i]=r[D]+1;const b=D+1;r[b]=i,a=Math.max(b,a)}const l=[],c=[];let s=n.length-1;for(let i=r[a]+1;i!=0;i=t[i-1]){for(l.push(n[i-1]);s>=i;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);l.reverse(),c.sort((i,d)=>i.claim_order-d.claim_order);for(let i=0,d=0;i<c.length;i++){for(;d<l.length&&c[i].claim_order>=l[d].claim_order;)d++;const D=d<l.length?l[d]:null;e.insertBefore(c[i],D)}}function Ue(e,n){e.appendChild(n)}function Qe(e,n){if(O){for(Ke(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;n!==e.actual_end_child?(n.claim_order!==void 0||n.parentNode!==e)&&e.insertBefore(n,e.actual_end_child):e.actual_end_child=n.nextSibling}else(n.parentNode!==e||n.nextSibling!==null)&&e.appendChild(n)}function Qn(e,n,r){O&&!r?Qe(e,n):(n.parentNode!==e||n.nextSibling!=r)&&e.insertBefore(n,r||null)}function Pe(e){e.parentNode.removeChild(e)}function Vn(e,n){for(let r=0;r<e.length;r+=1)e[r]&&e[r].d(n)}function Se(e){return document.createElement(e)}function fe(e){return document.createTextNode(e)}function On(){return fe(" ")}function er(){return fe("")}function ve(e,n,r,t){return e.addEventListener(n,r,t),()=>e.removeEventListener(n,r,t)}function nr(e){return function(n){return n.stopPropagation(),e.call(this,n)}}function rr(e,n,r){r==null?e.removeAttribute(n):e.getAttribute(n)!==r&&e.setAttribute(n,r)}function Ve(e){return Array.from(e.childNodes)}function Oe(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function Ze(e,n,r,t,a=!1){Oe(e);const l=(()=>{for(let c=e.claim_info.last_index;c<e.length;c++){const s=e[c];if(n(s)){const i=r(s);return i===void 0?e.splice(c,1):e[c]=i,a||(e.claim_info.last_index=c),s}}for(let c=e.claim_info.last_index-1;c>=0;c--){const s=e[c];if(n(s)){const i=r(s);return i===void 0?e.splice(c,1):e[c]=i,a?i===void 0&&e.claim_info.last_index--:e.claim_info.last_index=c,s}}return t()})();return l.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,l}function en(e,n,r,t){return Ze(e,a=>a.nodeName===n,a=>{const l=[];for(let c=0;c<a.attributes.length;c++){const s=a.attributes[c];r[s.name]||l.push(s.name)}l.forEach(c=>a.removeAttribute(c))},()=>t(n))}function tr(e,n,r){return en(e,n,r,Se)}function nn(e,n){return Ze(e,r=>r.nodeType===3,r=>{const t=""+n;if(r.data.startsWith(t)){if(r.data.length!==t.length)return r.splitText(t.length)}else r.data=t},()=>fe(n),!0)}function ar(e){return nn(e," ")}function or(e,n){n=""+n,e.wholeText!==n&&(e.data=n)}function lr(e,n,r,t){r===null?e.style.removeProperty(n):e.style.setProperty(n,r,t?"important":"")}let G;function rn(){if(G===void 0){G=!1;try{typeof window!="undefined"&&window.parent&&window.parent.document}catch{G=!0}}return G}function cr(e,n){getComputedStyle(e).position==="static"&&(e.style.position="relative");const t=Se("iframe");t.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),t.setAttribute("aria-hidden","true"),t.tabIndex=-1;const a=rn();let l;return a?(t.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=ve(window,"message",c=>{c.source===t.contentWindow&&n()})):(t.src="about:blank",t.onload=()=>{l=ve(t.contentWindow,"resize",n)}),Ue(e,t),()=>{(a||l&&t.contentWindow)&&l(),Pe(t)}}function tn(e,n,r=!1){const t=document.createEvent("CustomEvent");return t.initCustomEvent(e,r,!1,n),t}let z;function R(e){z=e}function ee(){if(!z)throw new Error("Function called outside component initialization");return z}function ir(e){ee().$$.on_mount.push(e)}function sr(e){ee().$$.after_update.push(e)}function ur(){const e=ee();return(n,r)=>{const t=e.$$.callbacks[n];if(t){const a=tn(n,r);t.slice().forEach(l=>{l.call(e,a)})}}}function fr(e,n){ee().$$.context.set(e,n)}const N=[],De=[],J=[],ce=[],He=Promise.resolve();let ie=!1;function Le(){ie||(ie=!0,He.then(Ae))}function dr(){return Le(),He}function se(e){J.push(e)}function pr(e){ce.push(e)}const te=new Set;let q=0;function Ae(){const e=z;do{for(;q<N.length;){const n=N[q];q++,R(n),an(n.$$)}for(R(null),N.length=0,q=0;De.length;)De.pop()();for(let n=0;n<J.length;n+=1){const r=J[n];te.has(r)||(te.add(r),r())}J.length=0}while(N.length);for(;ce.length;)ce.pop()();ie=!1,te.clear(),R(e)}function an(e){if(e.fragment!==null){e.update(),B(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(se)}}const K=new Set;let X;function mr(){X={r:0,c:[],p:X}}function hr(){X.r||B(X.c),X=X.p}function on(e,n){e&&e.i&&(K.delete(e),e.i(n))}function vr(e,n,r,t){if(e&&e.o){if(K.has(e))return;K.add(e),X.c.push(()=>{K.delete(e),t&&(r&&e.d(1),t())}),e.o(n)}}function Dr(e,n){const r={},t={},a={$$scope:1};let l=e.length;for(;l--;){const c=e[l],s=n[l];if(s){for(const i in c)i in s||(t[i]=1);for(const i in s)a[i]||(r[i]=s[i],a[i]=1);e[l]=s}else for(const i in c)a[i]=1}for(const c in t)c in r||(r[c]=void 0);return r}function yr(e){return typeof e=="object"&&e!==null?e:{}}function br(e,n,r){const t=e.$$.props[n];t!==void 0&&(e.$$.bound[t]=r,r(e.$$.ctx[t]))}function gr(e){e&&e.c()}function wr(e,n){e&&e.l(n)}function ln(e,n,r,t){const{fragment:a,on_mount:l,on_destroy:c,after_update:s}=e.$$;a&&a.m(n,r),t||se(()=>{const i=l.map(xe).filter(_e);c?c.push(...i):B(i),e.$$.on_mount=[]}),s.forEach(se)}function cn(e,n){const r=e.$$;r.fragment!==null&&(B(r.on_destroy),r.fragment&&r.fragment.d(n),r.on_destroy=r.fragment=null,r.ctx=[])}function sn(e,n){e.$$.dirty[0]===-1&&(N.push(e),Le(),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function xr(e,n,r,t,a,l,c,s=[-1]){const i=z;R(e);const d=e.$$={fragment:null,ctx:null,props:l,update:Y,not_equal:a,bound:he(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(i?i.$$.context:[])),callbacks:he(),dirty:s,skip_bound:!1,root:n.target||i.$$.root};c&&c(d.root);let D=!1;if(d.ctx=r?r(e,n.props||{},(b,u,...v)=>{const y=v.length?v[0]:u;return d.ctx&&a(d.ctx[b],d.ctx[b]=y)&&(!d.skip_bound&&d.bound[b]&&d.bound[b](y),D&&sn(e,b)),u}):[],d.update(),D=!0,B(d.before_update),d.fragment=t?t(d.ctx):!1,n.target){if(n.hydrate){Ge();const b=Ve(n.target);d.fragment&&d.fragment.l(b),b.forEach(Pe)}else d.fragment&&d.fragment.c();n.intro&&on(e.$$.fragment),ln(e,n.target,n.anchor,n.customElement),qe(),Ae()}R(i)}class _r{$destroy(){cn(this,1),this.$destroy=Y}$on(n,r){const t=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return t.push(r),()=>{const a=t.indexOf(r);a!==-1&&t.splice(a,1)}}$set(n){this.$$set&&!ze(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const M=[];function Tr(e,n=Y){let r;const t=new Set;function a(s){if(Re(e,s)&&(e=s,r)){const i=!M.length;for(const d of t)d[1](),M.push(d,e);if(i){for(let d=0;d<M.length;d+=2)M[d][0](M[d+1]);M.length=0}}}function l(s){a(s(e))}function c(s,i=Y){const d=[s,i];return t.add(d),t.size===1&&(r=n(a)||Y),s(e),()=>{t.delete(d),t.size===0&&(r(),r=null)}}return{set:a,update:l,subscribe:c}}let Pr=(e,n=21)=>(r=n)=>{let t="",a=r;for(;a--;)t+=e[Math.random()*e.length|0];return t};var ae=Function("return this")();function un(e,n){return e==null||"hasOwnProperty"in e&&typeof e.hasOwnProperty=="function"?e.hasOwnProperty(n):Object.prototype.hasOwnProperty.call(e,n)}function T(e){var n=/^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);if(n==null)throw new Error(e);var r=new Error(n[2]);throw r.name=n[1],r}function ye(e){return typeof e=="number"||e instanceof Number}function ue(e){return(typeof e=="number"||e instanceof Number)&&isFinite(e.valueOf())}function fn(e){return typeof e!="number"&&!(e instanceof Number)?!1:(e=e.valueOf(),isFinite(e)&&Math.round(e)===e)}function dn(e){return typeof e!="number"&&!(e instanceof Number)?!1:(e=e.valueOf(),isFinite(e)&&Math.round(e)===e&&e>=0)}function de(e){return typeof e=="string"||e instanceof String}var pn=/^\s*$/;function F(e){return(typeof e=="string"||e instanceof String)&&!pn.test(e.valueOf())}function pe(e){return typeof e=="function"}function mn(e){return e!=null&&typeof e=="object"}function ne(e){return e!=null&&typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype}var hn=Array.isArray;function vn(e,n,r,t){if(hn(e))try{for(var a=0,l=e.length;a<l;a++)if(n(e[a])==!1)return!1;return!(r!=null&&e.length<r||t!=null&&e.length>t)}catch{}return!1}function Ee(e,n){return n.indexOf(e)>=0}var Ie=!1,j=!0;function Dn(e,n,r,t,a){if(n==null){if(t)return n;T("MissingArgument: no "+I(e)+" given")}else if(r(n))switch(!0){case n instanceof Boolean:case n instanceof Number:case n instanceof String:return n.valueOf();default:return n}else T("InvalidArgument: the given "+I(e)+" is no valid "+I(a))}function k(e,n,r){var t=function(c,s){return Dn(c,s,e,n,r)},a=e.name;if(a!=null&&/^ValueIs/.test(a)){var l=a.replace(/^ValueIs/,n?"allow":"expect");return yn(t,l)}else return t}function yn(e,n){if(e==null&&T("MissingArgument: no function given"),typeof e!="function"&&T("InvalidArgument: the given 1st Argument is not a JavaScript function"),n==null&&T("MissingArgument: no desired name given"),typeof n!="string"&&!(n instanceof String)&&T("InvalidArgument: the given desired name is not a string"),e.name===n)return e;try{if(Object.defineProperty(e,"name",{value:n}),e.name===n)return e}catch{}var r=new Function("originalFunction","return function "+n+" () {return originalFunction.apply(this,Array.prototype.slice.apply(arguments))}");return r(e)}var bn=k(ue,j,"finite numeric value"),E=bn,gn=k(fn,Ie,"integral numeric value");function wn(e,n,r,t){return n==null?n:Tn(e,n,r,t)}var xn=wn;function _n(e,n,r,t){if(gn(e,n),isNaN(n)&&T("InvalidArgument: the given "+I(e)+" is not-a-number"),r!=null&&isFinite(r)){if(t!=null&&isFinite(t)){if(n<r||n>t)throw new RangeError("the given "+I(e)+" ("+n+") is outside "+("the allowed range ("+r+"..."+t+")"))}else if(n<r)throw new RangeError("the given "+I(e)+" is below the allowed "+("minimum ("+n+" < "+r+")"))}else if(t!=null&&isFinite(t)&&n>t)throw new RangeError("the given "+I(e)+" exceeds the allowed "+("maximum ("+n+" > "+t+")"));return n.valueOf()}var Tn=_n,Pn=k(dn,j,"ordinal number"),$=Pn,Sn=k(de,j,"literal string"),Zn=Sn,Hn=k(F,j,"non-empty literal string"),be=Hn,Ln=k(pe,j,"JavaScript function"),S=Ln,An=k(mn,Ie,"JavaScript object"),ke=k(ne,j,'"plain" JavaScript object'),U=ke;function En(e,n,r,t,a,l){return n==null?n:kn(e,n,r,t,a,l)}function In(e,n,r,t,a,l){if(n==null&&T("MissingArgument: no "+I(e)+" given"),vn(n,r,a,l))return n;T("InvalidArgument: the given "+I(e)+" is "+(t==null?"either not a list or contains invalid elements":"no "+I(t)))}var kn=In;function I(e){var n=/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?/g,r=/[\x00-\x1f\x7f-\x9f]/g;return e.replace(n,function(t){return t==="\\"?"\\\\":t}).replace(r,function(t){switch(t){case"\0":return"\\0";case"\b":return"\\b";case"\f":return"\\f";case`
`:return"\\n";case"\r":return"\\r";case"	":return"\\t";case"\v":return"\\v";default:{var a=t.charCodeAt(0).toString(16);return"\\x"+"00".slice(a.length)+a}}})}function Wn(e,n){n===void 0&&(n='"');var r=/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|'/g,t=/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|"/g,a=/[\x00-\x1f\x7f-\x9f]/g;return e.replace(n==="'"?r:t,function(l){switch(l){case"'":return"\\'";case'"':return'\\"';case"\\":return"\\\\";default:return l}}).replace(a,function(l){switch(l){case"\0":return"\\0";case"\b":return"\\b";case"\f":return"\\f";case`
`:return"\\n";case"\r":return"\\r";case"	":return"\\t";case"\v":return"\\v";default:{var c=l.charCodeAt(0).toString(16);return"\\x"+"00".slice(c.length)+c}}})}function We(e,n){return n===void 0&&(n='"'),n+Wn(e,n)+n}function Xn(e){An("candidate",e);for(var n in e)if(un(e,n))return!1;return!0}function Yn(e){return!Xn(e)}function Z(e,n,r){return n===void 0&&(n=-1/0),r===void 0&&(r=1/0),Math.max(n,Math.min(e,r))}function Fn(e,n,r){switch(!0){case n==null:throw new Error('no "Position" given');case(typeof n.left!="number"&&!(n.left instanceof Number)):case(typeof n.top!="number"&&!(n.top instanceof Number)):throw new Error('invalid "Position" given')}switch(e){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:n.left,top:n.top};case"document":return{left:n.left+window.scrollX,top:n.top+window.scrollY};case"local":switch(!0){case r==null:throw new Error("no target element given");case r instanceof Element:var t=window.getComputedStyle(r),a=parseFloat(t.borderLeftWidth),l=parseFloat(t.borderTopWidth),c=r.getBoundingClientRect();return{left:n.left-c.left-a,top:n.top-c.top-l};default:throw new Error("invalid target element given")}default:throw new Error("invalid coordinate system given")}}function Mn(e,n,r){switch(!0){case n==null:throw new Error('no "Position" given');case(typeof n.left!="number"&&!(n.left instanceof Number)):case(typeof n.top!="number"&&!(n.top instanceof Number)):throw new Error('invalid "Position" given')}switch(e){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:n.left-window.scrollX,top:n.top-window.scrollY};case"document":return{left:n.left,top:n.top};case"local":switch(!0){case r==null:throw new Error("no target element given");case r instanceof Element:var t=window.getComputedStyle(r),a=parseFloat(t.borderLeftWidth),l=parseFloat(t.borderTopWidth),c=r.getBoundingClientRect();return{left:n.left+window.scrollX-c.left-a,top:n.top+window.scrollY-c.top-l};default:throw new Error("invalid target element given")}default:throw new Error("invalid coordinate system given")}}function $n(e,n,r){switch(!0){case n==null:throw new Error('no "Position" given');case(typeof n.left!="number"&&!(n.left instanceof Number)):case(typeof n.top!="number"&&!(n.top instanceof Number)):throw new Error('invalid "Position" given')}var t,a,l;switch(!0){case r==null:throw new Error("no source element given");case r instanceof Element:var c=window.getComputedStyle(r),s=parseFloat(c.borderLeftWidth),i=parseFloat(c.borderTopWidth);t=r.getBoundingClientRect(),a=t.left+s,l=t.top+i;break;default:throw new Error("invalid source element given")}switch(e){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:n.left+a,top:n.top+l};case"document":return{left:n.left+a+window.scrollX,top:n.top+l+window.scrollY};case"local":return{left:n.left,top:n.top};default:throw new Error("invalid coordinate system given")}}var L={fromViewportTo:Fn,fromDocumentTo:Mn,fromLocalTo:$n},o="__DragAndDropActions"in ae?ae.__DragAndDropActions:ae.__DragAndDropActions={};function Q(e){e=U("drag options",e)||{};var n,r,t,a,l,c,s,i,d,D,b,u,v,y,p,h,w,g,f;switch(n=e.Extras,!0){case e.relativeTo==null:r="parent";break;case e.relativeTo==="parent":case e.relativeTo==="body":case F(e.relativeTo):case e.relativeTo instanceof HTMLElement:case e.relativeTo instanceof SVGElement:r=e.relativeTo;break;default:T("InvalidArgument: invalid position reference given")}switch(t=be('"onlyFrom" CSS selector',e.onlyFrom),a=be('"neverFrom" CSS selector',e.neverFrom),!0){case e.Dummy==null:l=void 0;break;case e.Dummy==="standard":case e.Dummy==="none":case F(e.Dummy):case e.Dummy instanceof HTMLElement:case e.Dummy instanceof SVGElement:case pe(e.Dummy):l=e.Dummy;break;default:T("InvalidArgument: invalid drag dummy specification given")}switch(c=E("dummy x offset",e.DummyOffsetX),s=E("dummy y offset",e.DummyOffsetY),i=E("min. x position",e.minX),i==null&&(i=-1/0),d=E("min. y position",e.minY),d==null&&(d=-1/0),D=E("max. x position",e.maxX),D==null&&(D=1/0),b=E("max. y position",e.maxY),b==null&&(b=1/0),!0){case e.Pannable==null:u=void 0;break;case F(e.Pannable):case e.Pannable instanceof HTMLElement:case e.Pannable instanceof SVGElement:u=e.Pannable;break;default:T('InvalidArgument: invalid "Pannable" specification given')}if(v=$("panning sensor width",e.PanSensorWidth),v==null&&(v=20),y=$("panning sensor height",e.PanSensorHeight),y==null&&(y=20),p=$("panning speed",e.PanSpeed),p==null&&(p=10),Cn(e.onDragStart)){var m=e.onDragStart,_=m.x,x=m.y;h=function(){return{x:_,y:x}}}else h=S('"onDragStart" handler',e.onDragStart);return w=S('"onDragMove" handler',e.onDragMove),g=S('"onDragEnd" handler',e.onDragEnd),{Extras:n,relativeTo:r,onlyFrom:t,neverFrom:a,Dummy:l,DummyOffsetX:c,DummyOffsetY:s,minX:i,minY:d,maxX:D,maxY:b,Pannable:u,PanSensorWidth:v,PanSensorHeight:y,PanSpeed:p,onDragStart:h,onDragMove:w,onDragEnd:g,onDragCancel:f}}function Sr(e,n){var r,t,a,l,c,s,i,d,D;r=!1,t=Q(n);function b(p){var h=t;if(Xe(e,h,p))return p.stopPropagation(),p.preventDefault(),!1;a=Fe(e,h);var w=L.fromDocumentTo("local",{left:p.pageX,top:p.pageY},a);if(l=c=0,d={x:0,y:0},h.onDragStart==null)d={x:0,y:0};else try{var g=h.onDragStart(h.Extras);if(ne(g)){var f=E("x start position",g.x),m=E("y start position",g.y);l=f-w.left,c=m-w.top,f=Z(f,h.minX,h.maxX),m=Z(m,h.minY,h.maxY),d={x:f,y:m}}}catch(A){console.error('"onDragStart" handler failed',A)}if(D=d,s=!1,h.Dummy==null&&(h.Dummy="none"),i=Me(e,h),i!=null&&p.dataTransfer!=null){var _=h.DummyOffsetX,x=h.DummyOffsetY;if(_==null||x==null){var P=L.fromDocumentTo("local",{left:p.pageX,top:p.pageY},e);_==null&&(_=P.left),x==null&&(x=P.top)}switch(!0){case h.Dummy==="none":p.dataTransfer.setDragImage(i,0,0),setTimeout(function(){document.body.removeChild(i)},0);break;case de(h.Dummy):p.dataTransfer.setDragImage(i,_,x),setTimeout(function(){document.body.removeChild(i.parentElement)},0);break;default:p.dataTransfer.setDragImage(i,_,x)}}p.dataTransfer!=null&&(p.dataTransfer.effectAllowed="none"),r=!0,setTimeout(function(){return e.classList.add("dragged")},0),p.stopPropagation()}function u(p){if(!r)return!1;var h=t;if(p.screenX===0&&p.screenY===0&&!s)s=!0;else{s=!1,V("draggable",e,h,p.pageX,p.pageY);var w=L.fromDocumentTo("local",{left:p.pageX,top:p.pageY},a),g=w.left+l,f=w.top+c;g=Z(g,h.minX,h.maxX),f=Z(f,h.minY,h.maxY);var m=g-D.x,_=f-D.y;D={x:g,y:f},H("onDragMove",h,g,f,m,_,h.Extras)}p.stopPropagation()}function v(p){if(!r)return!1;var h=t;if(h.onDragEnd!=null){var w=Z(D.x,h.minX,h.maxX),g=Z(D.y,h.minY,h.maxY),f=w-D.x,m=g-D.y;H("onDragEnd",h,w,g,f,m,h.Extras)}r=!1,e.classList.remove("dragged"),p.stopPropagation()}function y(p){p=Q(p),t.Extras==null&&p.Extras!=null&&(t.Extras=p.Extras),t.Dummy=p.Dummy||t.Dummy,t.minX=p.minX,t.minY=p.minY,t.maxX=p.maxX,t.maxY=p.maxY,t.Pannable=p.Pannable,t.PanSensorWidth=p.PanSensorWidth,t.PanSensorHeight=p.PanSensorHeight,t.PanSpeed=p.PanSpeed,t.onDragStart=p.onDragStart||t.onDragStart}return e.setAttribute("draggable","true"),e.addEventListener("dragstart",b),e.addEventListener("drag",u),e.addEventListener("dragend",v),{update:y}}function Xe(e,n,r){if(n.onlyFrom!=null||n.neverFrom!=null){var t=r.clientX,a=r.clientY,l=document.elementFromPoint(t,a);if(l=Ye(l,t,a),n.onlyFrom!=null){var c=l.closest(n.onlyFrom);if(e!==c&&!e.contains(c))return!0}if(n.neverFrom!=null){var c=l.closest(n.neverFrom);if(e===c||e.contains(c))return!0}}return!1}function Ye(e,n,r){for(var t=e.children,a=0,l=t.length;a<l;a++){var c=t[a],s=L.fromLocalTo("viewport",{left:0,top:0},c);if(!(n<s.left||r<s.top)&&!(n>s.left+c.offsetWidth-1)&&!(r>s.top+c.offsetHeight-1))return Ye(c,n,r)}return e}var jn=["copy","move","link"];function ge(e){e=U("drop options",e)||{};var n,r,t,a,l,c;return n=$e("list of allowed operations",e.Operations,"copy"),r=Object.assign({},U("data to be offered",e.DataToOffer)),"none"in r&&T('InvalidArgument: "none" is not a valid data type'),t=S('"onDropZoneEnter" handler',e.onDropZoneEnter),a=S('"onDropZoneHover" handler',e.onDropZoneHover),l=S('"onDropZoneLeave" handler',e.onDropZoneLeave),c=S('"onDropped" handler',e.onDropped),{Operations:n,DataToOffer:r,onDropZoneEnter:t,onDropZoneHover:a,onDropZoneLeave:l,onDropped:c}}function Zr(e,n){var r,t,a,l,c,s,i,d,D,b,u,v;r=!1,t=Q(n),a=ge(n);function y(f){var m=Object.assign({},t,a);if(Xe(e,m,f))return f.stopPropagation(),f.preventDefault(),!1;l=Fe(e,m);var _=L.fromDocumentTo("local",{left:f.pageX,top:f.pageY},l);if(c=s=0,D={x:0,y:0},m.onDragStart==null)D={x:0,y:0};else try{var x=m.onDragStart(m.Extras);if(ne(x)){var P=E("x start position",x.x),A=E("y start position",x.y);c=P-_.left,s=A-_.top,P=Z(P,m.minX,m.maxX),A=Z(A,m.minY,m.maxY),D={x:P,y:A}}}catch(Ce){console.error('"onDragStart" handler failed',Ce)}if(b=D,u=void 0,v=void 0,i=!1,m.Dummy==null&&(m.Dummy="standard"),d=Me(e,m),d!=null&&f.dataTransfer!=null){var W=m.DummyOffsetX,C=m.DummyOffsetY;if(W==null||C==null){var me=L.fromDocumentTo("local",{left:f.pageX,top:f.pageY},e);W==null&&(W=me.left),C==null&&(C=me.top)}switch(!0){case m.Dummy==="none":f.dataTransfer.setDragImage(d,0,0),setTimeout(function(){document.body.removeChild(d)},0);break;case de(m.Dummy):f.dataTransfer.setDragImage(d,W,C),setTimeout(function(){document.body.removeChild(d.parentElement)},0);break;default:f.dataTransfer.setDragImage(d,W,C)}}if(f.dataTransfer!=null){var je=Nn(m.Operations);if(f.dataTransfer.effectAllowed=je,Yn(m.DataToOffer))for(var re in m.DataToOffer)m.DataToOffer.hasOwnProperty(re)&&f.dataTransfer.setData(re,m.DataToOffer[re])}o.currentDroppableExtras=m.Extras,o.currentDropZoneExtras=void 0,o.currentDropZonePosition=void 0,o.currentDropZoneElement=void 0,o.DroppableWasDropped=!1,o.currentDropOperation=void 0,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0,r=!0,setTimeout(function(){return e.classList.add("dragged")},0),f.stopPropagation()}function p(f){if(!r)return!1;var m=Object.assign({},t,a);if(f.screenX===0&&f.screenY===0&&!i)i=!0;else{i=!1,V("draggable",e,m,f.pageX,f.pageY);var _=L.fromDocumentTo("local",{left:f.pageX,top:f.pageY},l),x=_.left+c,P=_.top+s;x=Z(x,m.minX,m.maxX),P=Z(P,m.minY,m.maxY);var A=x-b.x,W=P-b.y;b={x,y:P},H("onDragMove",m,x,P,A,W,m.Extras)}o.currentDropZoneElement===u?o.currentDropZoneElement!=null&&H("onDropZoneHover",m,o.currentDropZonePosition.x,o.currentDropZonePosition.y,o.currentDropZoneExtras,m.Extras):(o.currentDropZoneElement==null?(e.classList.remove("droppable"),H("onDropZoneLeave",m,v,m.Extras)):(e.classList.add("droppable"),H("onDropZoneEnter",m,o.currentDropZonePosition.x,o.currentDropZonePosition.y,v,m.Extras)),u=o.currentDropZoneElement,v=o.currentDropZoneExtras),f.stopPropagation()}function h(f){if(!r)return!1;var m=Object.assign({},t,a);if(o.DroppableWasDropped&&(H("onDropped",m,o.currentDropZonePosition.x,o.currentDropZonePosition.y,o.currentDropOperation,o.currentTypeTransferred,o.currentDataTransferred,o.currentDropZoneExtras,m.Extras),o.currentDropZoneExtras=void 0,o.currentDropZonePosition=void 0,o.currentDropZoneElement=void 0,o.DroppableWasDropped=!1,o.currentDropOperation=void 0,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0),m.onDragEnd!=null){var _=Z(b.x,m.minX,m.maxX),x=Z(b.y,m.minY,m.maxY),P=_-b.x,A=x-b.y;H("onDragEnd",m,_,x,P,A,m.Extras)}o.currentDroppableExtras=void 0,r=!1,e.classList.remove("dragged","droppable"),f.stopPropagation()}function w(f){f=Q(f),t.Extras==null&&f.Extras!=null&&(t.Extras=f.Extras),t.Dummy=f.Dummy||t.Dummy,t.minX=f.minX,t.minY=f.minY,t.maxX=f.maxX,t.maxY=f.maxY,t.Pannable=f.Pannable,t.PanSensorWidth=f.PanSensorWidth,t.PanSensorHeight=f.PanSensorHeight,t.PanSpeed=f.PanSpeed,t.onDragStart=f.onDragStart||t.onDragStart}function g(f){f=ge(f),a.Operations=f.Operations,a.DataToOffer=f.DataToOffer}return e.setAttribute("draggable","true"),e.addEventListener("dragstart",y),e.addEventListener("drag",p),e.addEventListener("dragend",h),{update:function(f){w(f),g(f)}}}function we(e){e=U("drop zone options",e)||{};var n,r,t,a,l,c,s,i,d,D,b,u,v;n=e.Extras,ke("data types to be accepted",e.TypesToAccept),r=Object.create(null),e.TypesToAccept!=null&&"none"in e.TypesToAccept&&T('InvalidArgument: "none" is not a valid data type');for(var y in e.TypesToAccept)e.TypesToAccept.hasOwnProperty(y)&&(r[y]=$e("list of accepted operations for type "+We(y),e.TypesToAccept[y]));switch(t=xn("min. time to hold",e.HoldDelay,0),!0){case e.Pannable==null:a=void 0;break;case e.Pannable==="this":case F(e.Pannable):case e.Pannable instanceof HTMLElement:case e.Pannable instanceof SVGElement:a=e.Pannable;break;default:T('InvalidArgument: invalid "Pannable" specification given')}return l=$("panning sensor width",e.PanSensorWidth),l==null&&(l=20),c=$("panning sensor height",e.PanSensorHeight),c==null&&(c=20),s=$("panning speed",e.PanSpeed),s==null&&(s=10),i=S('"onDroppableEnter" handler',e.onDroppableEnter),d=S('"onDroppableMove" handler',e.onDroppableMove),D=S('"onDroppableLeave" handler',e.onDroppableLeave),b=S('"onDroppableHold" handler',e.onDroppableHold),u=S('"onDroppableRelease" handler',e.onDroppableRelease),v=S('"onDrop" handler',e.onDrop),{Extras:n,TypesToAccept:r,HoldDelay:t,Pannable:a,PanSensorWidth:l,PanSensorHeight:c,PanSpeed:s,onDroppableEnter:i,onDroppableMove:d,onDroppableLeave:D,onDroppableHold:b,onDroppableRelease:u,onDrop:v}}function Hr(e,n){var r;r=we(n);function t(u){var v=r;V("dropzone",e,v,u.pageX,u.pageY);var y=oe(L.fromDocumentTo("local",{left:u.pageX,top:u.pageY},e));if(ye(v.HoldDelay)&&v.HoldDelay>0&&o.HoldWasTriggeredForElement!==e&&s(y),!(u.dataTransfer==null||u.dataTransfer.effectAllowed==="none")){var p=u.dataTransfer.dropEffect;if(p==="none")switch(u.dataTransfer.effectAllowed){case"copy":case"move":case"link":p=u.dataTransfer.effectAllowed;break;default:p=void 0}var h=v.TypesToAccept,w=u.dataTransfer.types.filter(function(f){return f in h&&h[f]!==""});if(w.length!==0){var g=le("onDroppableEnter",v,y.x,y.y,p,w,o.currentDroppableExtras,v.Extras);g!==!1&&(o.currentDropZoneExtras=v.Extras,o.currentDropZoneElement=e,o.currentDropZonePosition=y,e.classList.add("hovered"),u.preventDefault(),u.stopPropagation())}}}function a(u){var v=r;V("dropzone",e,v,u.pageX,u.pageY);var y=oe(L.fromDocumentTo("local",{left:u.pageX,top:u.pageY},e));if(ye(v.HoldDelay)&&v.HoldDelay>0&&o.HoldWasTriggeredForElement!==e&&(o.HoldPosition==null?s(y):i(y)),u.dataTransfer==null||u.dataTransfer.effectAllowed==="none"||o.currentDropZoneElement!=null&&o.currentDropZoneElement!==e){e.classList.remove("hovered");return}var p=u.dataTransfer.dropEffect;if(p==="none")switch(u.dataTransfer.effectAllowed){case"copy":case"move":case"link":p=u.dataTransfer.effectAllowed;break;default:p=void 0}var h=v.TypesToAccept,w=u.dataTransfer.types.filter(function(f){return f in h&&h[f]!==""});if(w.length===0){o.currentDropZoneElement===e&&(o.currentDropZoneExtras=void 0,o.currentDropZoneElement=void 0,o.currentDropZonePosition=void 0),e.classList.remove("hovered");return}o.currentDropZonePosition=y;var g=le("onDroppableMove",v,o.currentDropZonePosition.x,o.currentDropZonePosition.y,p,w,o.currentDroppableExtras,v.Extras);if(g===!1)o.currentDropZoneExtras=void 0,o.currentDropZoneElement=void 0,o.currentDropZonePosition=void 0,e.classList.remove("hovered");else return o.currentDropZoneExtras=v.Extras,o.currentDropZoneElement=e,e.classList.add("hovered"),u.preventDefault(),!1}function l(u){e.classList.remove("hovered"),o.DropZonePanning=!1,d();var v=r;o.currentDropZoneElement===e&&(o.currentTypeTransferred==null&&(o.currentDropZoneExtras=void 0,o.currentDropZoneElement=void 0,o.DroppableWasDropped=!1,o.currentDropZonePosition=void 0,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0,H("onDroppableLeave",v,o.currentDroppableExtras,v.Extras)),u.preventDefault(),u.stopPropagation())}function c(u){if(e.classList.remove("hovered"),o.DropZonePanning=!1,d(),!(u.dataTransfer==null||u.dataTransfer.effectAllowed==="none"||o.currentDropZoneElement!==e)){u.stopPropagation();var v=r,y=u.dataTransfer.dropEffect;if(y==="none")switch(u.dataTransfer.effectAllowed){case"copy":case"move":case"link":y=u.dataTransfer.effectAllowed;break;default:y=void 0}var p=v.TypesToAccept,h=u.dataTransfer.types.filter(function(f){return f in p&&(y==null||p[f].indexOf(y)>=0)});if(h.length===0){o.currentDropZoneExtras=void 0,o.currentDropZonePosition=void 0,o.DroppableWasDropped=!1,o.currentDropOperation=void 0,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0,H("onDroppableLeave",v,o.currentDroppableExtras,v.Extras);return}o.currentDropZonePosition=oe(L.fromDocumentTo("local",{left:u.pageX,top:u.pageY},e));var w={};h.forEach(function(f){return w[f]=u.dataTransfer.getData(f)});var g=le("onDrop",v,o.currentDropZonePosition.x,o.currentDropZonePosition.y,y,w,o.currentDroppableExtras,v.Extras);switch(!0){case g==null:o.DroppableWasDropped=!0,o.currentDropOperation=y,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0;break;case Ee(g,h):o.DroppableWasDropped=!0,o.currentDropOperation=y,o.currentTypeTransferred=g,o.currentDataTransferred=w[g];break;default:o.DroppableWasDropped=!1,o.currentDropZoneExtras=void 0,o.currentDropZonePosition=void 0,o.currentDropOperation=void 0,o.currentTypeTransferred=void 0,o.currentDataTransferred=void 0}o.currentDropZoneElement=void 0}}function s(u){o.HoldPosition=u,o.HoldTimer!=null&&clearTimeout(o.HoldTimer),o.HoldTimer=setTimeout(D,n.HoldDelay)}function i(u){var v=Math.pow(o.HoldPosition.x-u.x,2)+Math.pow(o.HoldPosition.y-u.y,2);v>25&&(o.HoldPosition=u,clearTimeout(o.HoldTimer),o.HoldTimer=setTimeout(D,n.HoldDelay))}function d(){delete o.HoldPosition,o.HoldTimer!=null&&(clearTimeout(o.HoldTimer),delete o.HoldTimer),delete o.HoldWasTriggeredForElement}function D(){var u=o.currentDropZonePosition||o.HoldPosition;delete o.HoldPosition,delete o.HoldTimer,o.HoldWasTriggeredForElement=e,H("onDroppableHold",n,u.x,u.y,o.currentDroppableExtras,n.Extras)}function b(u){u=we(u),r.Extras==null&&u.Extras!=null&&(r.Extras=u.Extras),r.TypesToAccept=u.TypesToAccept,r.HoldDelay=u.HoldDelay,r.Pannable=u.Pannable,r.PanSensorWidth=u.PanSensorWidth,r.PanSensorHeight=u.PanSensorHeight,r.PanSpeed=u.PanSpeed}return e.setAttribute("draggable","true"),e.addEventListener("dragenter",t),e.addEventListener("dragover",a),e.addEventListener("dragleave",l),e.addEventListener("drop",c),{update:b}}function Cn(e){return ne(e)&&ue(e.x)&&ue(e.y)}function oe(e){return{x:e.left,y:e.top}}function Fe(e,n){var r;switch(!0){case n.relativeTo==="parent":r=e.parentElement;break;case n.relativeTo==="body":r=document.body;break;case n.relativeTo instanceof HTMLElement:case n.relativeTo instanceof SVGElement:r=n.relativeTo,r!=document.body&&!document.body.contains(r)&&T('InvalidArgument: the HTML element given as "relativeTo" option is not part of this HTML document');break;default:r=e.closest(n.relativeTo)}return r==null?document.body:r}function Me(e,n){switch(!0){case n.Dummy==="standard":return;case n.Dummy==="none":var r=document.createElement("div");return r.setAttribute("style","display:block; position:absolute; width:1px; height:1px; background:transparent; border:none; margin:0px; padding:0px; cursor:auto"),document.body.appendChild(r),r;case F(n.Dummy):var t=document.createElement("div");return t.style.display="block",t.style.position="absolute",t.style.left=document.body.scrollWidth+100+"px",document.body.appendChild(t),t.innerHTML=n.Dummy,t.children[0];case n.Dummy instanceof HTMLElement:case n.Dummy instanceof SVGElement:return n.Dummy;case pe(n.Dummy):var a=void 0;try{a=n.Dummy(n.Extras,e)}catch(l){console.error("RuntimeError: creating draggable dummy failed",l)}if(a!=null){if(a instanceof HTMLElement||a instanceof SVGElement)return a;console.error("InvalidArgument: the newly created draggable dummy is neither an HTML nor an SVG element")}}}function V(e,n,r,t,a){if(!(e==="draggable"&&o.DropZonePanning)){if(r.Pannable==null||r.PanSensorWidth===0&&r.PanSensorHeight===0||r.PanSpeed===0){o.DropZonePanning=!1;return}var l;switch(!0){case F(r.Pannable):l=n.parentElement,l!=null&&(l=l.closest(r.Pannable));break;case(r.Pannable==="this"&&e==="dropzone"):l=n;break;case r.Pannable instanceof HTMLElement:case r.Pannable instanceof SVGElement:l=r.Pannable}if(l==null){o.DropZonePanning=!1;return}var c=L.fromDocumentTo("local",{left:t,top:a},l),s=c.left,i=c.top;s>=0&&s<r.PanSensorWidth&&(l.scrollLeft=Math.max(0,l.scrollLeft-r.PanSpeed));var d=l.clientWidth;s>=d-r.PanSensorWidth&&s<d&&(l.scrollLeft=Math.min(l.scrollLeft+r.PanSpeed,l.scrollWidth-d)),i>=0&&i<r.PanSensorHeight&&(l.scrollTop=Math.max(0,l.scrollTop-r.PanSpeed));var D=l.clientHeight;i>=D-r.PanSensorHeight&&i<D&&(l.scrollTop=Math.min(l.scrollTop+r.PanSpeed,l.scrollHeight-D)),o.DropZonePanning=e==="dropzone"}}function $e(e,n,r){r===void 0&&(r="copy move link");var t=Zn(e,n)||r;switch(t.trim()){case"all":return"copy move link";case"none":return""}var a=t.trim().replace(/\s+/g," ").split(" ");return En(e,a,function(l){return Ee(l,jn)}),a.reduce(function(l,c){return l.indexOf(c)<0?l+c+" ":l}," ")}function Nn(e){var n=((e.indexOf("move")<0?0:1)*2+(e.indexOf("link")<0?0:1))*2+(e.indexOf("copy")<0?0:1);return["none","copy","link","copyLink","move","copyMove","linkMove","all"][n]}function H(e,n){for(var r=[],t=2;t<arguments.length;t++)r[t-2]=arguments[t];if(n[e]!=null)try{return n[e].apply(null,r)}catch(a){console.error(We(e)+" handler failed",a)}}var le=H;export{br as $,yr as A,cn as B,Ne as C,Tr as D,dr as E,zn as F,Gn as G,qn as H,Bn as I,Qe as J,Y as K,Pr as L,Un as M,Zr as N,Sr as O,_e as P,Rn as Q,De as R,_r as S,se as T,cr as U,ur as V,Jn as W,ve as X,B as Y,nr as Z,Vn as _,Ve as a,pr as a0,Hr as a1,Kn as a2,rr as b,tr as c,Pe as d,Se as e,lr as f,Qn as g,nn as h,xr as i,or as j,On as k,er as l,ar as m,mr as n,vr as o,hr as p,on as q,fr as r,Re as s,fe as t,sr as u,ir as v,gr as w,wr as x,ln as y,Dr as z};