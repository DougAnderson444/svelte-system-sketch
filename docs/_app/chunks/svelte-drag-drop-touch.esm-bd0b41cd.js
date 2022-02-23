var u;(function(c){var d=function(){function o(){this._dropEffect="move",this._effectAllowed="all",this._data={}}return Object.defineProperty(o.prototype,"dropEffect",{enumerable:!0,configurable:!0,get:function(){return this._dropEffect},set:function(a){this._dropEffect=a}}),Object.defineProperty(o.prototype,"effectAllowed",{enumerable:!0,configurable:!0,get:function(){return this._effectAllowed},set:function(a){this._effectAllowed=a}}),Object.defineProperty(o.prototype,"types",{enumerable:!0,configurable:!0,get:function(){return Object.keys(this._data)}}),o.prototype.clearData=function(a){a==null?this._data={}:delete this._data[a.toLowerCase()]},o.prototype.getData=function(a){return this._data[a.toLowerCase()]||""},o.prototype.setData=function(a,t){this._data[a.toLowerCase()]=t},o.prototype.setDragImage=function(a,t,e){var i=r._instance;i._imgCustom=a,i._imgOffset={x:t,y:e}},o}();c.DataTransfer=d;var r=function(){function o(){if(this._lastClick=0,r!=null&&r._instance!=null)throw new Error("DragDropTouch instance already created.");var t=!1;if(document.addEventListener("test",function(){},{get passive(){return t=!0,!0}}),navigator.maxTouchPoints>0){var e=this._touchstart.bind(this),i=this._touchmove.bind(this),n=this._touchend.bind(this),s=t?{passive:!1,capture:!1}:!1;document.addEventListener("touchstart",e,s),document.addEventListener("touchmove",i,s),document.addEventListener("touchend",n),document.addEventListener("touchcancel",n)}}o.getInstance=function(){return r._instance},o.prototype._touchstart=function(t){var e=this;if(this._shouldHandle(t)){if(Date.now()-this._lastClick<r._DBLCLICK&&this._dispatchEvent(t,"dblclick",t.target)){t.preventDefault(),this._reset();return}this._reset();var i=this._closestDraggable(t.target);i!=null&&!this._dispatchEvent(t,"mousemove",t.target)&&!this._dispatchEvent(t,"mousedown",t.target)&&(this._dragSource=i,this._ptDown=this._getPoint(t),this._lastTouch=t,t.preventDefault(),setTimeout(function(){e._dragSource===i&&e._img==null&&e._dispatchEvent(t,"contextmenu",i)&&e._reset()},r._CTXMENU),r._ISPRESSHOLDMODE&&(this._pressHoldInterval=setTimeout(function(){e._isDragEnabled=!0,e._touchmove(t)},r._PRESSHOLDAWAIT)))}},o.prototype._touchmove=function(t){if(this._shouldCancelPressHoldMove(t)){this._reset();return}if(this._shouldHandleMove(t)||this._shouldHandlePressHoldMove(t)){var e=this._getTarget(t);if(this._dispatchEvent(t,"mousemove",e)){this._lastTouch=t,t.preventDefault();return}var i=this._getPoint(this._lastTouch,!0),n=this._getPoint(t,!0);this._lastMovementX=n.x-i.x,this._lastMovementY=n.y-i.y;var s={movementX:this._lastMovementX,movementY:this._lastMovementY};this._dragSource&&this._img==null&&this._shouldStartDragging(t)&&(this._dispatchEvent(t,"dragstart",this._dragSource,s),this._createImage(t),this._dispatchEvent(t,"dragenter",e,s)),this._img!=null&&(this._lastTouch=t,t.preventDefault(),this._dispatchEvent(t,"drag",this._dragSource,s),e!=this._lastTarget&&(this._dispatchEvent(this._lastTouch,"dragleave",this._lastTarget,s),this._dispatchEvent(t,"dragenter",e,s),this._lastTarget=e),this._moveImage(t),this._isDropZone=this._dispatchEvent(t,"dragover",e,s))}},o.prototype._touchend=function(t){if(this._shouldHandle(t)){if(this._dispatchEvent(this._lastTouch,"mouseup",t.target)){t.preventDefault();return}if(this._img==null&&(this._dragSource=null,this._dispatchEvent(this._lastTouch,"click",t.target),this._lastClick=Date.now()),this._destroyImage(),this._dragSource){var e={movementX:this._lastMovementX,movementY:this._lastMovementY};t.type.indexOf("cancel")<0&&this._isDropZone&&this._dispatchEvent(this._lastTouch,"drop",this._lastTarget,e),this._dispatchEvent(this._lastTouch,"dragend",this._dragSource,e),this._reset()}}},o.prototype._shouldHandle=function(t){return t!=null&&!t.defaultPrevented&&t.touches!=null&&t.touches.length<2},o.prototype._shouldHandleMove=function(t){return!r._ISPRESSHOLDMODE&&this._shouldHandle(t)},o.prototype._shouldHandlePressHoldMove=function(t){return r._ISPRESSHOLDMODE&&this._isDragEnabled&&t!=null&&t.touches!=null&&t.touches.length>0},o.prototype._shouldCancelPressHoldMove=function(t){return r._ISPRESSHOLDMODE&&!this._isDragEnabled&&this._getDelta(t)>r._PRESSHOLDMARGIN},o.prototype._shouldStartDragging=function(t){var e=this._getDelta(t);return e>r._THRESHOLD||r._ISPRESSHOLDMODE&&e>=r._PRESSHOLDTHRESHOLD},o.prototype._reset=function(){this._destroyImage(),this._dragSource=null,this._lastTouch=null,this._lastTarget=null,this._ptDown=null,this._isDragEnabled=!1,this._isDropZone=!1,this._dataTransfer=new d,this._lastMovementX=0,this._lastMovementY=0,clearInterval(this._pressHoldInterval)},o.prototype._getPoint=function(t,e){if(t!=null&&t.touches!=null&&t.touches.length>0){var i=t.touches[0];return{x:e?i.pageX:i.clientX,y:e?i.pageY:i.clientY}}else{var n=t;return{x:e?n.pageX:n.clientX,y:e?n.pageY:n.clientY}}},o.prototype._getDelta=function(t){if(r._ISPRESSHOLDMODE&&!this._ptDown)return 0;var e=this._getPoint(t);return Math.abs(e.x-this._ptDown.x)+Math.abs(e.y-this._ptDown.y)},o.prototype._getTarget=function(t){for(var e=this._getPoint(t),i=document.elementFromPoint(e.x,e.y);i!=null&&getComputedStyle(i).pointerEvents=="none";)i=i.parentElement;return i},o.prototype._createImage=function(t){this._img!=null&&this._destroyImage();var e=this._imgCustom||this._dragSource;if(this._img=e.cloneNode(!0),this._copyStyle(e,this._img),this._img.style.top=this._img.style.left="-9999px",this._imgCustom==null){var i=e.getBoundingClientRect(),n=this._getPoint(t);this._imgOffset={x:n.x-i.left,y:n.y-i.top},this._img.style.opacity=r._OPACITY.toString()}this._moveImage(t),document.body.appendChild(this._img)},o.prototype._destroyImage=function(){this._img!=null&&this._img.parentElement!=null&&this._img.parentElement.removeChild(this._img),this._img=null,this._imgCustom=null},o.prototype._moveImage=function(t){var e=this;requestAnimationFrame(function(){if(e._img!=null){var i=e._getPoint(t,!0),n=e._img.style;n.position="absolute",n.pointerEvents="none",n.zIndex="999999",n.left=Math.round(i.x-e._imgOffset.x)+"px",n.top=Math.round(i.y-e._imgOffset.y)+"px"}})},o.prototype._copyProps=function(t,e,i){for(var n=0;n<i.length;n++){var s=i[n];t[s]=e[s]}},o.prototype._copyStyle=function(t,e){if(r._rmvAtts.forEach(function(p){e.removeAttribute(p)}),t instanceof HTMLCanvasElement){var i=t,n=e;n.width=i.width,n.height=i.height,n.getContext("2d").drawImage(i,0,0)}for(var s=getComputedStyle(t),h=0;h<s.length;h++){var _=s[h];_.indexOf("transition")<0&&(e.style[_]=s[_])}e.style.pointerEvents="none";for(var h=0;h<t.children.length;h++)this._copyStyle(t.children[h],e.children[h])},o.prototype._dispatchEvent=function(t,e,i,n){if(t!=null&&i!=null){var s=document.createEvent("Event"),h=t.touches!=null?t.touches[0]:t;return s.initEvent(e,!0,!0),s.button=0,s.which=s.buttons=1,this._copyProps(s,t,r._kbdProps),this._copyProps(s,h,r._ptProps),s.dataTransfer=this._dataTransfer,n!=null&&(s.movementX=n.movementX,s.movementY=n.movementY),i.dispatchEvent(s),s.defaultPrevented}return!1},o.prototype._closestDraggable=function(t){for(;t;t=t.parentElement)if(t.hasAttribute("draggable")&&t.getAttribute("draggable"))return t;return null};var a=new o;return a._instance=a,a}();c.DragDropTouch=r;var l=u.DragDropTouch;l._THRESHOLD=5,l._OPACITY=.5,l._DBLCLICK=500,l._CTXMENU=900,l._ISPRESSHOLDMODE=!1,l._PRESSHOLDAWAIT=400,l._PRESSHOLDMARGIN=25,l._PRESSHOLDTHRESHOLD=0,l._rmvAtts="id,class,style,draggable".split(","),l._kbdProps="altKey,ctrlKey,metaKey,shiftKey".split(","),l._ptProps="pageX,pageY,clientX,clientY,screenX,screenY,offsetX,offsetY".split(",")})(u||(u={}));var f=u,g=f.DragDropTouch;export{g as default};