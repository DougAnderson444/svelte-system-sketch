function a(l,e,t){switch(!0){case e==null:throw new Error('no "Position" given');case(typeof e.left!="number"&&!(e.left instanceof Number)):case(typeof e.top!="number"&&!(e.top instanceof Number)):throw new Error('invalid "Position" given')}switch(l){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:e.left,top:e.top};case"document":return{left:e.left+window.scrollX,top:e.top+window.scrollY};case"local":switch(!0){case t==null:throw new Error("no target element given");case t instanceof Element:var r=window.getComputedStyle(t),o=parseFloat(r.borderLeftWidth),c=parseFloat(r.borderTopWidth),n=t.getBoundingClientRect();return{left:e.left-n.left-o,top:e.top-n.top-c};default:throw new Error("invalid target element given")}default:throw new Error("invalid coordinate system given")}}function d(l,e,t){switch(!0){case e==null:throw new Error('no "Position" given');case(typeof e.left!="number"&&!(e.left instanceof Number)):case(typeof e.top!="number"&&!(e.top instanceof Number)):throw new Error('invalid "Position" given')}switch(l){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:e.left-window.scrollX,top:e.top-window.scrollY};case"document":return{left:e.left,top:e.top};case"local":switch(!0){case t==null:throw new Error("no target element given");case t instanceof Element:var r=window.getComputedStyle(t),o=parseFloat(r.borderLeftWidth),c=parseFloat(r.borderTopWidth),n=t.getBoundingClientRect();return{left:e.left+window.scrollX-n.left-o,top:e.top+window.scrollY-n.top-c};default:throw new Error("invalid target element given")}default:throw new Error("invalid coordinate system given")}}function u(l,e,t){switch(!0){case e==null:throw new Error('no "Position" given');case(typeof e.left!="number"&&!(e.left instanceof Number)):case(typeof e.top!="number"&&!(e.top instanceof Number)):throw new Error('invalid "Position" given')}var r,o,c;switch(!0){case t==null:throw new Error("no source element given");case t instanceof Element:var n=window.getComputedStyle(t),w=parseFloat(n.borderLeftWidth),f=parseFloat(n.borderTopWidth);r=t.getBoundingClientRect(),o=r.left+w,c=r.top+f;break;default:throw new Error("invalid source element given")}switch(l){case null:case void 0:throw new Error("no coordinate system given");case"viewport":return{left:e.left+o,top:e.top+c};case"document":return{left:e.left+o+window.scrollX,top:e.top+c+window.scrollY};case"local":return{left:e.left,top:e.top};default:throw new Error("invalid coordinate system given")}}var s={fromViewportTo:a,fromDocumentTo:d,fromLocalTo:u};export{s as default};
