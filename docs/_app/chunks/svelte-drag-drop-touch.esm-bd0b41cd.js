var DragDropTouch;
(function(DragDropTouchExport) {
  var DataTransfer = function() {
    function DataTransfer2() {
      this._dropEffect = "move";
      this._effectAllowed = "all";
      this._data = {};
    }
    Object.defineProperty(DataTransfer2.prototype, "dropEffect", {
      enumerable: true,
      configurable: true,
      get: function() {
        return this._dropEffect;
      },
      set: function(value) {
        this._dropEffect = value;
      }
    });
    Object.defineProperty(DataTransfer2.prototype, "effectAllowed", {
      enumerable: true,
      configurable: true,
      get: function() {
        return this._effectAllowed;
      },
      set: function(value) {
        this._effectAllowed = value;
      }
    });
    Object.defineProperty(DataTransfer2.prototype, "types", {
      enumerable: true,
      configurable: true,
      get: function() {
        return Object.keys(this._data);
      }
    });
    DataTransfer2.prototype.clearData = function(type) {
      if (type == null) {
        this._data = {};
      } else {
        delete this._data[type.toLowerCase()];
      }
    };
    DataTransfer2.prototype.getData = function(type) {
      return this._data[type.toLowerCase()] || "";
    };
    DataTransfer2.prototype.setData = function(type, value) {
      this._data[type.toLowerCase()] = value;
    };
    DataTransfer2.prototype.setDragImage = function(img, offsetX, offsetY) {
      var ddt = DragDropTouchSingleton._instance;
      ddt._imgCustom = img;
      ddt._imgOffset = { x: offsetX, y: offsetY };
    };
    return DataTransfer2;
  }();
  DragDropTouchExport.DataTransfer = DataTransfer;
  var DragDropTouchSingleton = function() {
    function DragDropTouch2() {
      this._lastClick = 0;
      if (DragDropTouchSingleton != null && DragDropTouchSingleton._instance != null) {
        throw new Error("DragDropTouch instance already created.");
      }
      var supportsPassive = false;
      document.addEventListener("test", function() {
      }, {
        get passive() {
          supportsPassive = true;
          return true;
        }
      });
      if (navigator.maxTouchPoints > 0) {
        var touchstart = this._touchstart.bind(this);
        var touchmove = this._touchmove.bind(this);
        var touchend = this._touchend.bind(this);
        var Options = supportsPassive ? { passive: false, capture: false } : false;
        document.addEventListener("touchstart", touchstart, Options);
        document.addEventListener("touchmove", touchmove, Options);
        document.addEventListener("touchend", touchend);
        document.addEventListener("touchcancel", touchend);
      }
    }
    DragDropTouch2.getInstance = function() {
      return DragDropTouchSingleton._instance;
    };
    DragDropTouch2.prototype._touchstart = function(e) {
      var _this = this;
      if (this._shouldHandle(e)) {
        if (Date.now() - this._lastClick < DragDropTouchSingleton._DBLCLICK) {
          if (this._dispatchEvent(e, "dblclick", e.target)) {
            e.preventDefault();
            this._reset();
            return;
          }
        }
        this._reset();
        var src_1 = this._closestDraggable(e.target);
        if (src_1 != null) {
          if (!this._dispatchEvent(e, "mousemove", e.target) && !this._dispatchEvent(e, "mousedown", e.target)) {
            this._dragSource = src_1;
            this._ptDown = this._getPoint(e);
            this._lastTouch = e;
            e.preventDefault();
            setTimeout(function() {
              if (_this._dragSource === src_1 && _this._img == null) {
                if (_this._dispatchEvent(e, "contextmenu", src_1)) {
                  _this._reset();
                }
              }
            }, DragDropTouchSingleton._CTXMENU);
            if (DragDropTouchSingleton._ISPRESSHOLDMODE) {
              this._pressHoldInterval = setTimeout(function() {
                _this._isDragEnabled = true;
                _this._touchmove(e);
              }, DragDropTouchSingleton._PRESSHOLDAWAIT);
            }
          }
        }
      }
    };
    DragDropTouch2.prototype._touchmove = function(e) {
      if (this._shouldCancelPressHoldMove(e)) {
        this._reset();
        return;
      }
      if (this._shouldHandleMove(e) || this._shouldHandlePressHoldMove(e)) {
        var target = this._getTarget(e);
        if (this._dispatchEvent(e, "mousemove", target)) {
          this._lastTouch = e;
          e.preventDefault();
          return;
        }
        var lastPointOnPage = this._getPoint(this._lastTouch, true);
        var curPointOnPage = this._getPoint(e, true);
        this._lastMovementX = curPointOnPage.x - lastPointOnPage.x;
        this._lastMovementY = curPointOnPage.y - lastPointOnPage.y;
        var Extras = { movementX: this._lastMovementX, movementY: this._lastMovementY };
        if (this._dragSource && this._img == null && this._shouldStartDragging(e)) {
          this._dispatchEvent(e, "dragstart", this._dragSource, Extras);
          this._createImage(e);
          this._dispatchEvent(e, "dragenter", target, Extras);
        }
        if (this._img != null) {
          this._lastTouch = e;
          e.preventDefault();
          this._dispatchEvent(e, "drag", this._dragSource, Extras);
          if (target != this._lastTarget) {
            this._dispatchEvent(this._lastTouch, "dragleave", this._lastTarget, Extras);
            this._dispatchEvent(e, "dragenter", target, Extras);
            this._lastTarget = target;
          }
          this._moveImage(e);
          this._isDropZone = this._dispatchEvent(e, "dragover", target, Extras);
        }
      }
    };
    DragDropTouch2.prototype._touchend = function(e) {
      if (this._shouldHandle(e)) {
        if (this._dispatchEvent(this._lastTouch, "mouseup", e.target)) {
          e.preventDefault();
          return;
        }
        if (this._img == null) {
          this._dragSource = null;
          this._dispatchEvent(this._lastTouch, "click", e.target);
          this._lastClick = Date.now();
        }
        this._destroyImage();
        if (this._dragSource) {
          var Extras = { movementX: this._lastMovementX, movementY: this._lastMovementY };
          if (e.type.indexOf("cancel") < 0 && this._isDropZone) {
            this._dispatchEvent(this._lastTouch, "drop", this._lastTarget, Extras);
          }
          this._dispatchEvent(this._lastTouch, "dragend", this._dragSource, Extras);
          this._reset();
        }
      }
    };
    DragDropTouch2.prototype._shouldHandle = function(e) {
      return e != null && !e.defaultPrevented && e.touches != null && e.touches.length < 2;
    };
    DragDropTouch2.prototype._shouldHandleMove = function(e) {
      return !DragDropTouchSingleton._ISPRESSHOLDMODE && this._shouldHandle(e);
    };
    DragDropTouch2.prototype._shouldHandlePressHoldMove = function(e) {
      return DragDropTouchSingleton._ISPRESSHOLDMODE && this._isDragEnabled && e != null && e.touches != null && e.touches.length > 0;
    };
    DragDropTouch2.prototype._shouldCancelPressHoldMove = function(e) {
      return DragDropTouchSingleton._ISPRESSHOLDMODE && !this._isDragEnabled && this._getDelta(e) > DragDropTouchSingleton._PRESSHOLDMARGIN;
    };
    DragDropTouch2.prototype._shouldStartDragging = function(e) {
      var delta = this._getDelta(e);
      return delta > DragDropTouchSingleton._THRESHOLD || DragDropTouchSingleton._ISPRESSHOLDMODE && delta >= DragDropTouchSingleton._PRESSHOLDTHRESHOLD;
    };
    DragDropTouch2.prototype._reset = function() {
      this._destroyImage();
      this._dragSource = null;
      this._lastTouch = null;
      this._lastTarget = null;
      this._ptDown = null;
      this._isDragEnabled = false;
      this._isDropZone = false;
      this._dataTransfer = new DataTransfer();
      this._lastMovementX = 0;
      this._lastMovementY = 0;
      clearInterval(this._pressHoldInterval);
    };
    DragDropTouch2.prototype._getPoint = function(e, page) {
      if (e != null && e.touches != null && e.touches.length > 0) {
        var Touch_1 = e.touches[0];
        return { x: page ? Touch_1.pageX : Touch_1.clientX, y: page ? Touch_1.pageY : Touch_1.clientY };
      } else {
        var Event_1 = e;
        return { x: page ? Event_1.pageX : Event_1.clientX, y: page ? Event_1.pageY : Event_1.clientY };
      }
    };
    DragDropTouch2.prototype._getDelta = function(e) {
      if (DragDropTouchSingleton._ISPRESSHOLDMODE && !this._ptDown) {
        return 0;
      }
      var p = this._getPoint(e);
      return Math.abs(p.x - this._ptDown.x) + Math.abs(p.y - this._ptDown.y);
    };
    DragDropTouch2.prototype._getTarget = function(e) {
      var pt = this._getPoint(e);
      var el = document.elementFromPoint(pt.x, pt.y);
      while (el != null && getComputedStyle(el).pointerEvents == "none") {
        el = el.parentElement;
      }
      return el;
    };
    DragDropTouch2.prototype._createImage = function(e) {
      if (this._img != null) {
        this._destroyImage();
      }
      var src = this._imgCustom || this._dragSource;
      this._img = src.cloneNode(true);
      this._copyStyle(src, this._img);
      this._img.style.top = this._img.style.left = "-9999px";
      if (this._imgCustom == null) {
        var rc = src.getBoundingClientRect();
        var pt = this._getPoint(e);
        this._imgOffset = { x: pt.x - rc.left, y: pt.y - rc.top };
        this._img.style.opacity = DragDropTouchSingleton._OPACITY.toString();
      }
      this._moveImage(e);
      document.body.appendChild(this._img);
    };
    DragDropTouch2.prototype._destroyImage = function() {
      if (this._img != null && this._img.parentElement != null) {
        this._img.parentElement.removeChild(this._img);
      }
      this._img = null;
      this._imgCustom = null;
    };
    DragDropTouch2.prototype._moveImage = function(e) {
      var _this = this;
      requestAnimationFrame(function() {
        if (_this._img != null) {
          var pt = _this._getPoint(e, true), s = _this._img.style;
          s.position = "absolute";
          s.pointerEvents = "none";
          s.zIndex = "999999";
          s.left = Math.round(pt.x - _this._imgOffset.x) + "px";
          s.top = Math.round(pt.y - _this._imgOffset.y) + "px";
        }
      });
    };
    DragDropTouch2.prototype._copyProps = function(dst, src, props) {
      for (var i = 0; i < props.length; i++) {
        var p = props[i];
        dst[p] = src[p];
      }
    };
    DragDropTouch2.prototype._copyStyle = function(src, dst) {
      DragDropTouchSingleton._rmvAtts.forEach(function(att) {
        dst.removeAttribute(att);
      });
      if (src instanceof HTMLCanvasElement) {
        var cSrc = src, cDst = dst;
        cDst.width = cSrc.width;
        cDst.height = cSrc.height;
        cDst.getContext("2d").drawImage(cSrc, 0, 0);
      }
      var cs = getComputedStyle(src);
      for (var i = 0; i < cs.length; i++) {
        var key = cs[i];
        if (key.indexOf("transition") < 0) {
          dst.style[key] = cs[key];
        }
      }
      dst.style.pointerEvents = "none";
      for (var i = 0; i < src.children.length; i++) {
        this._copyStyle(src.children[i], dst.children[i]);
      }
    };
    DragDropTouch2.prototype._dispatchEvent = function(e, type, target, Extras) {
      if (e != null && target != null) {
        var evt = document.createEvent("Event");
        var t = e["touches"] != null ? e["touches"][0] : e;
        evt.initEvent(type, true, true);
        evt["button"] = 0;
        evt["which"] = evt["buttons"] = 1;
        this._copyProps(evt, e, DragDropTouchSingleton._kbdProps);
        this._copyProps(evt, t, DragDropTouchSingleton._ptProps);
        evt["dataTransfer"] = this._dataTransfer;
        if (Extras != null) {
          evt["movementX"] = Extras.movementX;
          evt["movementY"] = Extras.movementY;
        }
        target.dispatchEvent(evt);
        return evt.defaultPrevented;
      }
      return false;
    };
    DragDropTouch2.prototype._closestDraggable = function(e) {
      for (; e; e = e.parentElement) {
        if (e.hasAttribute("draggable") && e.getAttribute("draggable")) {
          return e;
        }
      }
      return null;
    };
    var Singleton2 = new DragDropTouch2();
    Singleton2._instance = Singleton2;
    return Singleton2;
  }();
  DragDropTouchExport.DragDropTouch = DragDropTouchSingleton;
  var Singleton = DragDropTouch.DragDropTouch;
  Singleton._THRESHOLD = 5;
  Singleton._OPACITY = 0.5;
  Singleton._DBLCLICK = 500;
  Singleton._CTXMENU = 900;
  Singleton._ISPRESSHOLDMODE = false;
  Singleton._PRESSHOLDAWAIT = 400;
  Singleton._PRESSHOLDMARGIN = 25;
  Singleton._PRESSHOLDTHRESHOLD = 0;
  Singleton._rmvAtts = "id,class,style,draggable".split(",");
  Singleton._kbdProps = "altKey,ctrlKey,metaKey,shiftKey".split(",");
  Singleton._ptProps = "pageX,pageY,clientX,clientY,screenX,screenY,offsetX,offsetY".split(",");
})(DragDropTouch || (DragDropTouch = {}));
var DragDropTouch$1 = DragDropTouch;
var svelteDragDropTouch = DragDropTouch$1.DragDropTouch;
export { svelteDragDropTouch as default };
//# sourceMappingURL=svelte-drag-drop-touch.esm-bd0b41cd.js.map
