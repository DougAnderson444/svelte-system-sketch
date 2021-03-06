import { SvelteComponent, init, safe_not_equal, element, text, space, claim_element, children, claim_text, claim_space, detach, attr, insert_hydration, append_hydration, action_destroyer, set_data, noop as noop$2, onMount, binding_callbacks, set_style, component_subscribe, null_to_empty, add_render_callback, listen, is_function, run_all, createEventDispatcher, tick, empty, destroy_each, create_component, claim_component, mount_component, add_flush_callback, transition_in, transition_out, destroy_component, add_resize_listener, stop_propagation, group_outros, check_outros, bind, set_store_value, globals } from "../chunks/index-182dfd00.js";
import { writable } from "../chunks/index-dca0cab6.js";
var Canvas_svelte_svelte_type_style_lang = "";
var RangePips_svelte_svelte_type_style_lang = "";
var RangeSlider_svelte_svelte_type_style_lang = "";
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size2 = defaultSize) => {
    let id = "";
    let i = size2;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
function safeid(n = 16) {
  return customAlphabet("abcdefghijklmnopqrztuvwxyz1234567890", n)();
}
function createNewNode(params) {
  const newNode = {
    name: "Name",
    id: safeid(),
    x: 10,
    y: 10,
    style: {
      backgroundColor: "#fee9004b",
      width: 120,
      height: 120,
      left: 10,
      top: 10
    },
    props: [],
    children: []
  };
  return newNode;
}
var global = /* @__PURE__ */ Function("return this")();
function Object_hasOwnProperty(Value, PropertyName) {
  return Value == null || "hasOwnProperty" in Value && typeof Value.hasOwnProperty === "function" ? Value.hasOwnProperty(PropertyName) : Object.prototype.hasOwnProperty.call(Value, PropertyName);
}
function throwError(Message) {
  var Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
  if (Match == null) {
    throw new Error(Message);
  } else {
    var namedError = new Error(Match[2]);
    namedError.name = Match[1];
    throw namedError;
  }
}
function ValueIsFiniteNumber(Value) {
  return (typeof Value === "number" || Value instanceof Number) && isFinite(Value.valueOf());
}
function ValueIsOrdinal(Value) {
  if (typeof Value !== "number" && !(Value instanceof Number)) {
    return false;
  }
  Value = Value.valueOf();
  return isFinite(Value) && Math.round(Value) === Value && Value >= 0;
}
function ValueIsString(Value) {
  return typeof Value === "string" || Value instanceof String;
}
var emptyStringPattern = /^\s*$/;
function ValueIsNonEmptyString(Value) {
  return (typeof Value === "string" || Value instanceof String) && !emptyStringPattern.test(Value.valueOf());
}
function ValueIsFunction(Value) {
  return typeof Value === "function";
}
function ValueIsObject(Value) {
  return Value != null && typeof Value === "object";
}
function ValueIsPlainObject(Value) {
  return Value != null && typeof Value === "object" && Object.getPrototypeOf(Value) === Object.prototype;
}
var ValueIsArray = Array.isArray;
function ValueIsListSatisfying(Value, Validator, minLength, maxLength) {
  if (ValueIsArray(Value)) {
    try {
      for (var i = 0, l = Value.length; i < l; i++) {
        if (Validator(Value[i]) == false) {
          return false;
        }
      }
      if (minLength != null) {
        if (Value.length < minLength) {
          return false;
        }
      }
      if (maxLength != null) {
        if (Value.length > maxLength) {
          return false;
        }
      }
      return true;
    } catch (Signal) {
    }
  }
  return false;
}
function ValueIsOneOf(Value, ValueList) {
  return ValueList.indexOf(Value) >= 0;
}
var rejectNil = false;
var acceptNil = true;
function validatedArgument(Description, Argument, ValueIsValid, NilIsAcceptable, Expectation) {
  if (Argument == null) {
    if (NilIsAcceptable) {
      return Argument;
    } else {
      throwError("MissingArgument: no " + escaped(Description) + " given");
    }
  } else {
    if (ValueIsValid(Argument)) {
      switch (true) {
        case Argument instanceof Boolean:
        case Argument instanceof Number:
        case Argument instanceof String:
          return Argument.valueOf();
        default:
          return Argument;
      }
    } else {
      throwError("InvalidArgument: the given " + escaped(Description) + " is no valid " + escaped(Expectation));
    }
  }
}
function ValidatorForClassifier(Classifier, NilIsAcceptable, Expectation) {
  var Validator = function(Description, Argument) {
    return validatedArgument(Description, Argument, Classifier, NilIsAcceptable, Expectation);
  };
  var ClassifierName = Classifier.name;
  if (ClassifierName != null && /^ValueIs/.test(ClassifierName)) {
    var ValidatorName = ClassifierName.replace(/^ValueIs/, NilIsAcceptable ? "allow" : "expect");
    return FunctionWithName(Validator, ValidatorName);
  } else {
    return Validator;
  }
}
function FunctionWithName(originalFunction, desiredName) {
  if (originalFunction == null) {
    throwError("MissingArgument: no function given");
  }
  if (typeof originalFunction !== "function") {
    throwError("InvalidArgument: the given 1st Argument is not a JavaScript function");
  }
  if (desiredName == null) {
    throwError("MissingArgument: no desired name given");
  }
  if (typeof desiredName !== "string" && !(desiredName instanceof String)) {
    throwError("InvalidArgument: the given desired name is not a string");
  }
  if (originalFunction.name === desiredName) {
    return originalFunction;
  }
  try {
    Object.defineProperty(originalFunction, "name", { value: desiredName });
    if (originalFunction.name === desiredName) {
      return originalFunction;
    }
  } catch (signal) {
  }
  var renamed = new Function("originalFunction", "return function " + desiredName + " () {return originalFunction.apply(this,Array.prototype.slice.apply(arguments))}");
  return renamed(originalFunction);
}
var allowFiniteNumber = /* @__PURE__ */ ValidatorForClassifier(ValueIsFiniteNumber, acceptNil, "finite numeric value"), allowedFiniteNumber = allowFiniteNumber;
var allowOrdinal = /* @__PURE__ */ ValidatorForClassifier(ValueIsOrdinal, acceptNil, "ordinal number"), allowedOrdinal = allowOrdinal;
var allowString = /* @__PURE__ */ ValidatorForClassifier(ValueIsString, acceptNil, "literal string"), allowedString = allowString;
var allowNonEmptyString = /* @__PURE__ */ ValidatorForClassifier(ValueIsNonEmptyString, acceptNil, "non-empty literal string"), allowedNonEmptyString = allowNonEmptyString;
var allowFunction = /* @__PURE__ */ ValidatorForClassifier(ValueIsFunction, acceptNil, "JavaScript function"), allowedFunction = allowFunction;
var expectObject = /* @__PURE__ */ ValidatorForClassifier(ValueIsObject, rejectNil, "JavaScript object");
var allowPlainObject = /* @__PURE__ */ ValidatorForClassifier(ValueIsPlainObject, acceptNil, '"plain" JavaScript object'), allowedPlainObject = allowPlainObject;
function allowListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
  return Argument == null ? Argument : expectedListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength);
}
function expectListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
  if (Argument == null) {
    throwError("MissingArgument: no " + escaped(Description) + " given");
  }
  if (ValueIsListSatisfying(Argument, Validator, minLength, maxLength)) {
    return Argument;
  } else {
    throwError("InvalidArgument: the given " + escaped(Description) + " is " + (Expectation == null ? "either not a list or contains invalid elements" : "no " + escaped(Expectation)));
  }
}
var expectedListSatisfying = expectListSatisfying;
function escaped(Text) {
  var EscapeSequencePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?/g;
  var CtrlCharCodePattern = /[\x00-\x1f\x7f-\x9f]/g;
  return Text.replace(EscapeSequencePattern, function(Match) {
    return Match === "\\" ? "\\\\" : Match;
  }).replace(CtrlCharCodePattern, function(Match) {
    switch (Match) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        var HexCode = Match.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(HexCode.length) + HexCode;
      }
    }
  });
}
function quotable(Text, Quote) {
  if (Quote === void 0) {
    Quote = '"';
  }
  var EscSeqOrSglQuotePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|'/g;
  var EscSeqOrDblQuotePattern = /\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|"/g;
  var CtrlCharCodePattern = /[\x00-\x1f\x7f-\x9f]/g;
  return Text.replace(Quote === "'" ? EscSeqOrSglQuotePattern : EscSeqOrDblQuotePattern, function(Match) {
    switch (Match) {
      case "'":
        return "\\'";
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
      default:
        return Match;
    }
  }).replace(CtrlCharCodePattern, function(Match) {
    switch (Match) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        var HexCode = Match.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(HexCode.length) + HexCode;
      }
    }
  });
}
function quoted(Text, Quote) {
  if (Quote === void 0) {
    Quote = '"';
  }
  return Quote + quotable(Text, Quote) + Quote;
}
function ObjectIsEmpty(Candidate) {
  expectObject("candidate", Candidate);
  for (var Key in Candidate) {
    if (Object_hasOwnProperty(Candidate, Key)) {
      return false;
    }
  }
  return true;
}
function ObjectIsNotEmpty(Candidate) {
  return !ObjectIsEmpty(Candidate);
}
function constrained(Value, Minimum, Maximum) {
  if (Minimum === void 0) {
    Minimum = -Infinity;
  }
  if (Maximum === void 0) {
    Maximum = Infinity;
  }
  return Math.max(Minimum, Math.min(Value, Maximum));
}
function fromViewportTo(System, originalPosition, Target) {
  switch (true) {
    case originalPosition == null:
      throw new Error('no "Position" given');
    case (typeof originalPosition.left !== "number" && !(originalPosition.left instanceof Number)):
    case (typeof originalPosition.top !== "number" && !(originalPosition.top instanceof Number)):
      throw new Error('invalid "Position" given');
  }
  switch (System) {
    case null:
    case void 0:
      throw new Error("no coordinate system given");
    case "viewport":
      return { left: originalPosition.left, top: originalPosition.top };
    case "document":
      return {
        left: originalPosition.left + window.scrollX,
        top: originalPosition.top + window.scrollY
      };
    case "local":
      switch (true) {
        case Target == null:
          throw new Error("no target element given");
        case Target instanceof Element:
          var computedStyle = window.getComputedStyle(Target);
          var leftOffset = parseFloat(computedStyle.borderLeftWidth);
          var topOffset = parseFloat(computedStyle.borderTopWidth);
          var TargetPositionInViewport = Target.getBoundingClientRect();
          return {
            left: originalPosition.left - TargetPositionInViewport.left - leftOffset,
            top: originalPosition.top - TargetPositionInViewport.top - topOffset
          };
        default:
          throw new Error("invalid target element given");
      }
    default:
      throw new Error("invalid coordinate system given");
  }
}
function fromDocumentTo(System, originalPosition, Target) {
  switch (true) {
    case originalPosition == null:
      throw new Error('no "Position" given');
    case (typeof originalPosition.left !== "number" && !(originalPosition.left instanceof Number)):
    case (typeof originalPosition.top !== "number" && !(originalPosition.top instanceof Number)):
      throw new Error('invalid "Position" given');
  }
  switch (System) {
    case null:
    case void 0:
      throw new Error("no coordinate system given");
    case "viewport":
      return {
        left: originalPosition.left - window.scrollX,
        top: originalPosition.top - window.scrollY
      };
    case "document":
      return { left: originalPosition.left, top: originalPosition.top };
    case "local":
      switch (true) {
        case Target == null:
          throw new Error("no target element given");
        case Target instanceof Element:
          var computedStyle = window.getComputedStyle(Target);
          var leftOffset = parseFloat(computedStyle.borderLeftWidth);
          var topOffset = parseFloat(computedStyle.borderTopWidth);
          var TargetPositionInViewport = Target.getBoundingClientRect();
          return {
            left: originalPosition.left + window.scrollX - TargetPositionInViewport.left - leftOffset,
            top: originalPosition.top + window.scrollY - TargetPositionInViewport.top - topOffset
          };
        default:
          throw new Error("invalid target element given");
      }
    default:
      throw new Error("invalid coordinate system given");
  }
}
function fromLocalTo(System, originalPosition, Source) {
  switch (true) {
    case originalPosition == null:
      throw new Error('no "Position" given');
    case (typeof originalPosition.left !== "number" && !(originalPosition.left instanceof Number)):
    case (typeof originalPosition.top !== "number" && !(originalPosition.top instanceof Number)):
      throw new Error('invalid "Position" given');
  }
  var SourcePositionInViewport, leftPosition, topPosition;
  switch (true) {
    case Source == null:
      throw new Error("no source element given");
    case Source instanceof Element:
      var computedStyle = window.getComputedStyle(Source);
      var leftOffset = parseFloat(computedStyle.borderLeftWidth);
      var topOffset = parseFloat(computedStyle.borderTopWidth);
      SourcePositionInViewport = Source.getBoundingClientRect();
      leftPosition = SourcePositionInViewport.left + leftOffset;
      topPosition = SourcePositionInViewport.top + topOffset;
      break;
    default:
      throw new Error("invalid source element given");
  }
  switch (System) {
    case null:
    case void 0:
      throw new Error("no coordinate system given");
    case "viewport":
      return {
        left: originalPosition.left + leftPosition,
        top: originalPosition.top + topPosition
      };
    case "document":
      return {
        left: originalPosition.left + leftPosition + window.scrollX,
        top: originalPosition.top + topPosition + window.scrollY
      };
    case "local":
      return { left: originalPosition.left, top: originalPosition.top };
    default:
      throw new Error("invalid coordinate system given");
  }
}
var svelteCoordinateConversion = {
  fromViewportTo,
  fromDocumentTo,
  fromLocalTo
};
var Context = "__DragAndDropActions" in global ? global.__DragAndDropActions : global.__DragAndDropActions = {};
function parsedDraggableOptions(Options) {
  Options = allowedPlainObject("drag options", Options) || {};
  var Extras, relativeTo;
  var onlyFrom, neverFrom;
  var Dummy, DummyOffsetX, DummyOffsetY;
  var minX, minY, maxX, maxY;
  var Pannable;
  var PanSensorWidth, PanSensorHeight, PanSpeed;
  var onDragStart, onDragMove, onDragEnd, onDragCancel;
  Extras = Options.Extras;
  switch (true) {
    case Options.relativeTo == null:
      relativeTo = "parent";
      break;
    case Options.relativeTo === "parent":
    case Options.relativeTo === "body":
    case ValueIsNonEmptyString(Options.relativeTo):
    case Options.relativeTo instanceof HTMLElement:
    case Options.relativeTo instanceof SVGElement:
      relativeTo = Options.relativeTo;
      break;
    default:
      throwError("InvalidArgument: invalid position reference given");
  }
  onlyFrom = allowedNonEmptyString('"onlyFrom" CSS selector', Options.onlyFrom);
  neverFrom = allowedNonEmptyString('"neverFrom" CSS selector', Options.neverFrom);
  switch (true) {
    case Options.Dummy == null:
      Dummy = void 0;
      break;
    case Options.Dummy === "standard":
    case Options.Dummy === "none":
    case ValueIsNonEmptyString(Options.Dummy):
    case Options.Dummy instanceof HTMLElement:
    case Options.Dummy instanceof SVGElement:
    case ValueIsFunction(Options.Dummy):
      Dummy = Options.Dummy;
      break;
    default:
      throwError("InvalidArgument: invalid drag dummy specification given");
  }
  DummyOffsetX = allowedFiniteNumber("dummy x offset", Options.DummyOffsetX);
  DummyOffsetY = allowedFiniteNumber("dummy y offset", Options.DummyOffsetY);
  minX = allowedFiniteNumber("min. x position", Options.minX);
  if (minX == null) {
    minX = -Infinity;
  }
  minY = allowedFiniteNumber("min. y position", Options.minY);
  if (minY == null) {
    minY = -Infinity;
  }
  maxX = allowedFiniteNumber("max. x position", Options.maxX);
  if (maxX == null) {
    maxX = Infinity;
  }
  maxY = allowedFiniteNumber("max. y position", Options.maxY);
  if (maxY == null) {
    maxY = Infinity;
  }
  switch (true) {
    case Options.Pannable == null:
      Pannable = void 0;
      break;
    case ValueIsNonEmptyString(Options.Pannable):
    case Options.Pannable instanceof HTMLElement:
    case Options.Pannable instanceof SVGElement:
      Pannable = Options.Pannable;
      break;
    default:
      throwError('InvalidArgument: invalid "Pannable" specification given');
  }
  PanSensorWidth = allowedOrdinal("panning sensor width", Options.PanSensorWidth);
  if (PanSensorWidth == null) {
    PanSensorWidth = 20;
  }
  PanSensorHeight = allowedOrdinal("panning sensor height", Options.PanSensorHeight);
  if (PanSensorHeight == null) {
    PanSensorHeight = 20;
  }
  PanSpeed = allowedOrdinal("panning speed", Options.PanSpeed);
  if (PanSpeed == null) {
    PanSpeed = 10;
  }
  if (ValueIsPosition(Options.onDragStart)) {
    var _a = Options.onDragStart, x_1 = _a.x, y_1 = _a.y;
    onDragStart = function() {
      return { x: x_1, y: y_1 };
    };
  } else {
    onDragStart = allowedFunction('"onDragStart" handler', Options.onDragStart);
  }
  onDragMove = allowedFunction('"onDragMove" handler', Options.onDragMove);
  onDragEnd = allowedFunction('"onDragEnd" handler', Options.onDragEnd);
  return {
    Extras,
    relativeTo,
    onlyFrom,
    neverFrom,
    Dummy,
    DummyOffsetX,
    DummyOffsetY,
    minX,
    minY,
    maxX,
    maxY,
    Pannable,
    PanSensorWidth,
    PanSensorHeight,
    PanSpeed,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragCancel
  };
}
function fromForbiddenElement(Element2, Options, originalEvent) {
  if (Options.onlyFrom != null || Options.neverFrom != null) {
    var x = originalEvent.clientX;
    var y = originalEvent.clientY;
    var touchedElement = document.elementFromPoint(x, y);
    touchedElement = innerElementOf(touchedElement, x, y);
    if (Options.onlyFrom != null) {
      var fromElement = touchedElement.closest(Options.onlyFrom);
      if (Element2 !== fromElement && !Element2.contains(fromElement)) {
        return true;
      }
    }
    if (Options.neverFrom != null) {
      var fromElement = touchedElement.closest(Options.neverFrom);
      if (Element2 === fromElement || Element2.contains(fromElement)) {
        return true;
      }
    }
  }
  return false;
}
function innerElementOf(Candidate, x, y) {
  var innerElements = Candidate.children;
  for (var i = 0, l = innerElements.length; i < l; i++) {
    var innerElement = innerElements[i];
    var Position = svelteCoordinateConversion.fromLocalTo("viewport", { left: 0, top: 0 }, innerElement);
    if (x < Position.left || y < Position.top) {
      continue;
    }
    if (x > Position.left + innerElement.offsetWidth - 1) {
      continue;
    }
    if (y > Position.top + innerElement.offsetHeight - 1) {
      continue;
    }
    return innerElementOf(innerElement, x, y);
  }
  return Candidate;
}
var DropOperations = ["copy", "move", "link"];
function parsedDroppableOptions(Options) {
  Options = allowedPlainObject("drop options", Options) || {};
  var Operations, DataToOffer;
  var onDropZoneEnter, onDropZoneHover, onDropZoneLeave;
  var onDropped;
  Operations = parsedOperations("list of allowed operations", Options.Operations, "copy");
  DataToOffer = Object.assign({}, allowedPlainObject("data to be offered", Options.DataToOffer));
  if ("none" in DataToOffer)
    throwError('InvalidArgument: "none" is not a valid data type');
  onDropZoneEnter = allowedFunction('"onDropZoneEnter" handler', Options.onDropZoneEnter);
  onDropZoneHover = allowedFunction('"onDropZoneHover" handler', Options.onDropZoneHover);
  onDropZoneLeave = allowedFunction('"onDropZoneLeave" handler', Options.onDropZoneLeave);
  onDropped = allowedFunction('"onDropped" handler', Options.onDropped);
  return {
    Operations,
    DataToOffer,
    onDropZoneEnter,
    onDropZoneHover,
    onDropZoneLeave,
    onDropped
  };
}
function asDroppable(Element2, Options) {
  var isDragged;
  var currentDraggableOptions;
  var currentDroppableOptions;
  var PositionReference;
  var ReferenceDeltaX, ReferenceDeltaY;
  var PositioningWasDelayed;
  var DragImage;
  var initialPosition;
  var lastPosition;
  var lastDropZoneElement;
  var lastDropZoneExtras;
  isDragged = false;
  currentDraggableOptions = parsedDraggableOptions(Options);
  currentDroppableOptions = parsedDroppableOptions(Options);
  function startDragging(originalEvent) {
    var Options2 = Object.assign({}, currentDraggableOptions, currentDroppableOptions);
    if (fromForbiddenElement(Element2, Options2, originalEvent)) {
      originalEvent.stopPropagation();
      originalEvent.preventDefault();
      return false;
    }
    PositionReference = PositionReferenceFor(Element2, Options2);
    var relativePosition = svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, PositionReference);
    ReferenceDeltaX = ReferenceDeltaY = 0;
    initialPosition = { x: 0, y: 0 };
    if (Options2.onDragStart == null) {
      initialPosition = { x: 0, y: 0 };
    } else {
      try {
        var StartPosition = Options2.onDragStart(Options2.Extras);
        if (ValueIsPlainObject(StartPosition)) {
          var x = allowedFiniteNumber("x start position", StartPosition.x);
          var y = allowedFiniteNumber("y start position", StartPosition.y);
          ReferenceDeltaX = x - relativePosition.left;
          ReferenceDeltaY = y - relativePosition.top;
          x = constrained(x, Options2.minX, Options2.maxX);
          y = constrained(y, Options2.minY, Options2.maxY);
          initialPosition = { x, y };
        }
      } catch (Signal) {
        console.error('"onDragStart" handler failed', Signal);
      }
    }
    lastPosition = initialPosition;
    lastDropZoneElement = void 0;
    lastDropZoneExtras = void 0;
    PositioningWasDelayed = false;
    if (Options2.Dummy == null) {
      Options2.Dummy = "standard";
    }
    DragImage = DragImageFor(Element2, Options2);
    if (DragImage != null && originalEvent.dataTransfer != null) {
      var OffsetX = Options2.DummyOffsetX;
      var OffsetY = Options2.DummyOffsetY;
      if (OffsetX == null || OffsetY == null) {
        var PositionInDraggable = svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, Element2);
        if (OffsetX == null) {
          OffsetX = PositionInDraggable.left;
        }
        if (OffsetY == null) {
          OffsetY = PositionInDraggable.top;
        }
      }
      switch (true) {
        case Options2.Dummy === "none":
          originalEvent.dataTransfer.setDragImage(DragImage, 0, 0);
          setTimeout(function() {
            document.body.removeChild(DragImage);
          }, 0);
          break;
        case ValueIsString(Options2.Dummy):
          originalEvent.dataTransfer.setDragImage(DragImage, OffsetX, OffsetY);
          setTimeout(function() {
            document.body.removeChild(DragImage.parentElement);
          }, 0);
          break;
        default:
          originalEvent.dataTransfer.setDragImage(DragImage, OffsetX, OffsetY);
      }
    }
    if (originalEvent.dataTransfer != null) {
      var allowedEffects = allowedEffectsFrom(Options2.Operations);
      originalEvent.dataTransfer.effectAllowed = allowedEffects;
      if (ObjectIsNotEmpty(Options2.DataToOffer)) {
        for (var Type in Options2.DataToOffer) {
          if (Options2.DataToOffer.hasOwnProperty(Type)) {
            originalEvent.dataTransfer.setData(Type, Options2.DataToOffer[Type]);
          }
        }
      }
    }
    Context.currentDroppableExtras = Options2.Extras;
    Context.currentDropZoneExtras = void 0;
    Context.currentDropZonePosition = void 0;
    Context.currentDropZoneElement = void 0;
    Context.DroppableWasDropped = false;
    Context.currentDropOperation = void 0;
    Context.currentTypeTransferred = void 0;
    Context.currentDataTransferred = void 0;
    isDragged = true;
    setTimeout(function() {
      return Element2.classList.add("dragged");
    }, 0);
    originalEvent.stopPropagation();
  }
  function continueDragging(originalEvent) {
    if (!isDragged) {
      return false;
    }
    var Options2 = Object.assign({}, currentDraggableOptions, currentDroppableOptions);
    if (originalEvent.screenX === 0 && originalEvent.screenY === 0 && !PositioningWasDelayed) {
      PositioningWasDelayed = true;
    } else {
      PositioningWasDelayed = false;
      performPanningFor("draggable", Element2, Options2, originalEvent.pageX, originalEvent.pageY);
      var relativePosition = svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, PositionReference);
      var x = relativePosition.left + ReferenceDeltaX;
      var y = relativePosition.top + ReferenceDeltaY;
      x = constrained(x, Options2.minX, Options2.maxX);
      y = constrained(y, Options2.minY, Options2.maxY);
      var dx = x - lastPosition.x;
      var dy = y - lastPosition.y;
      lastPosition = { x, y };
      invokeHandler("onDragMove", Options2, x, y, dx, dy, Options2.Extras);
    }
    if (Context.currentDropZoneElement === lastDropZoneElement) {
      if (Context.currentDropZoneElement != null) {
        invokeHandler("onDropZoneHover", Options2, Context.currentDropZonePosition.x, Context.currentDropZonePosition.y, Context.currentDropZoneExtras, Options2.Extras);
      }
    } else {
      if (Context.currentDropZoneElement == null) {
        Element2.classList.remove("droppable");
        invokeHandler("onDropZoneLeave", Options2, lastDropZoneExtras, Options2.Extras);
      } else {
        Element2.classList.add("droppable");
        invokeHandler("onDropZoneEnter", Options2, Context.currentDropZonePosition.x, Context.currentDropZonePosition.y, lastDropZoneExtras, Options2.Extras);
      }
      lastDropZoneElement = Context.currentDropZoneElement;
      lastDropZoneExtras = Context.currentDropZoneExtras;
    }
    originalEvent.stopPropagation();
  }
  function finishDragging(originalEvent) {
    if (!isDragged) {
      return false;
    }
    var Options2 = Object.assign({}, currentDraggableOptions, currentDroppableOptions);
    if (Context.DroppableWasDropped) {
      invokeHandler("onDropped", Options2, Context.currentDropZonePosition.x, Context.currentDropZonePosition.y, Context.currentDropOperation, Context.currentTypeTransferred, Context.currentDataTransferred, Context.currentDropZoneExtras, Options2.Extras);
      Context.currentDropZoneExtras = void 0;
      Context.currentDropZonePosition = void 0;
      Context.currentDropZoneElement = void 0;
      Context.DroppableWasDropped = false;
      Context.currentDropOperation = void 0;
      Context.currentTypeTransferred = void 0;
      Context.currentDataTransferred = void 0;
    }
    if (Options2.onDragEnd != null) {
      var x = constrained(lastPosition.x, Options2.minX, Options2.maxX);
      var y = constrained(lastPosition.y, Options2.minY, Options2.maxY);
      var dx = x - lastPosition.x;
      var dy = y - lastPosition.y;
      invokeHandler("onDragEnd", Options2, x, y, dx, dy, Options2.Extras);
    }
    Context.currentDroppableExtras = void 0;
    isDragged = false;
    Element2.classList.remove("dragged", "droppable");
    originalEvent.stopPropagation();
  }
  function updateDraggableOptions(Options2) {
    Options2 = parsedDraggableOptions(Options2);
    if (currentDraggableOptions.Extras == null && Options2.Extras != null) {
      currentDraggableOptions.Extras = Options2.Extras;
    }
    currentDraggableOptions.Dummy = Options2.Dummy || currentDraggableOptions.Dummy;
    currentDraggableOptions.minX = Options2.minX;
    currentDraggableOptions.minY = Options2.minY;
    currentDraggableOptions.maxX = Options2.maxX;
    currentDraggableOptions.maxY = Options2.maxY;
    currentDraggableOptions.Pannable = Options2.Pannable;
    currentDraggableOptions.PanSensorWidth = Options2.PanSensorWidth;
    currentDraggableOptions.PanSensorHeight = Options2.PanSensorHeight;
    currentDraggableOptions.PanSpeed = Options2.PanSpeed;
    currentDraggableOptions.onDragStart = Options2.onDragStart || currentDraggableOptions.onDragStart;
  }
  function updateDroppableOptions(Options2) {
    Options2 = parsedDroppableOptions(Options2);
    currentDroppableOptions.Operations = Options2.Operations;
    currentDroppableOptions.DataToOffer = Options2.DataToOffer;
  }
  Element2.setAttribute("draggable", "true");
  Element2.addEventListener("dragstart", startDragging);
  Element2.addEventListener("drag", continueDragging);
  Element2.addEventListener("dragend", finishDragging);
  return {
    update: function(Options2) {
      updateDraggableOptions(Options2);
      updateDroppableOptions(Options2);
    }
  };
}
function ValueIsPosition(Candidate) {
  return ValueIsPlainObject(Candidate) && ValueIsFiniteNumber(Candidate.x) && ValueIsFiniteNumber(Candidate.y);
}
function PositionReferenceFor(Element2, Options) {
  var PositionReference;
  switch (true) {
    case Options.relativeTo === "parent":
      PositionReference = Element2.parentElement;
      break;
    case Options.relativeTo === "body":
      PositionReference = document.body;
      break;
    case Options.relativeTo instanceof HTMLElement:
    case Options.relativeTo instanceof SVGElement:
      PositionReference = Options.relativeTo;
      if (PositionReference != document.body && !document.body.contains(PositionReference))
        throwError('InvalidArgument: the HTML element given as "relativeTo" option is not part of this HTML document');
      break;
    default:
      PositionReference = Element2.closest(Options.relativeTo);
  }
  return PositionReference == null ? document.body : PositionReference;
}
function DragImageFor(Element2, Options) {
  switch (true) {
    case Options.Dummy === "standard":
      return void 0;
    case Options.Dummy === "none":
      var invisibleDragImage = document.createElement("div");
      invisibleDragImage.setAttribute("style", "display:block; position:absolute; width:1px; height:1px; background:transparent; border:none; margin:0px; padding:0px; cursor:auto");
      document.body.appendChild(invisibleDragImage);
      return invisibleDragImage;
    case ValueIsNonEmptyString(Options.Dummy):
      var auxiliaryElement = document.createElement("div");
      auxiliaryElement.style.display = "block";
      auxiliaryElement.style.position = "absolute";
      auxiliaryElement.style.left = document.body.scrollWidth + 100 + "px";
      document.body.appendChild(auxiliaryElement);
      auxiliaryElement.innerHTML = Options.Dummy;
      return auxiliaryElement.children[0];
    case Options.Dummy instanceof HTMLElement:
    case Options.Dummy instanceof SVGElement:
      return Options.Dummy;
    case ValueIsFunction(Options.Dummy):
      var Candidate = void 0;
      try {
        Candidate = Options.Dummy(Options.Extras, Element2);
      } catch (Signal) {
        console.error("RuntimeError: creating draggable dummy failed", Signal);
      }
      if (Candidate != null) {
        if (Candidate instanceof HTMLElement || Candidate instanceof SVGElement) {
          return Candidate;
        } else {
          console.error("InvalidArgument: the newly created draggable dummy is neither an HTML nor an SVG element");
        }
      }
  }
}
function performPanningFor(Type, Element2, Options, xOnPage, yOnPage) {
  if (Type === "draggable" && Context.DropZonePanning) {
    return;
  }
  if (Options.Pannable == null || Options.PanSensorWidth === 0 && Options.PanSensorHeight === 0 || Options.PanSpeed === 0) {
    Context.DropZonePanning = false;
    return;
  }
  var pannableElement;
  switch (true) {
    case ValueIsNonEmptyString(Options.Pannable):
      pannableElement = Element2.parentElement;
      if (pannableElement != null) {
        pannableElement = pannableElement.closest(Options.Pannable);
      }
      break;
    case (Options.Pannable === "this" && Type === "dropzone"):
      pannableElement = Element2;
      break;
    case Options.Pannable instanceof HTMLElement:
    case Options.Pannable instanceof SVGElement:
      pannableElement = Options.Pannable;
  }
  if (pannableElement == null) {
    Context.DropZonePanning = false;
    return;
  }
  var _a = svelteCoordinateConversion.fromDocumentTo("local", { left: xOnPage, top: yOnPage }, pannableElement), xInPannable = _a.left, yInPannable = _a.top;
  if (xInPannable >= 0 && xInPannable < Options.PanSensorWidth) {
    pannableElement.scrollLeft = Math.max(0, pannableElement.scrollLeft - Options.PanSpeed);
  }
  var PannableWidth = pannableElement.clientWidth;
  if (xInPannable >= PannableWidth - Options.PanSensorWidth && xInPannable < PannableWidth) {
    pannableElement.scrollLeft = Math.min(pannableElement.scrollLeft + Options.PanSpeed, pannableElement.scrollWidth - PannableWidth);
  }
  if (yInPannable >= 0 && yInPannable < Options.PanSensorHeight) {
    pannableElement.scrollTop = Math.max(0, pannableElement.scrollTop - Options.PanSpeed);
  }
  var PannableHeight = pannableElement.clientHeight;
  if (yInPannable >= PannableHeight - Options.PanSensorHeight && yInPannable < PannableHeight) {
    pannableElement.scrollTop = Math.min(pannableElement.scrollTop + Options.PanSpeed, pannableElement.scrollHeight - PannableHeight);
  }
  Context.DropZonePanning = Type === "dropzone";
}
function parsedOperations(Description, Argument, Default) {
  if (Default === void 0) {
    Default = "copy move link";
  }
  var Operations = allowedString(Description, Argument) || Default;
  switch (Operations.trim()) {
    case "all":
      return "copy move link";
    case "none":
      return "";
  }
  var OperationList = Operations.trim().replace(/\s+/g, " ").split(" ");
  allowListSatisfying(Description, OperationList, function(Operation) {
    return ValueIsOneOf(Operation, DropOperations);
  });
  return OperationList.reduce(function(Result, Operation) {
    return Result.indexOf(Operation) < 0 ? Result + Operation + " " : Result;
  }, " ");
}
function allowedEffectsFrom(Operations) {
  var EffectIndex = ((Operations.indexOf("move") < 0 ? 0 : 1) * 2 + (Operations.indexOf("link") < 0 ? 0 : 1)) * 2 + (Operations.indexOf("copy") < 0 ? 0 : 1);
  return [
    "none",
    "copy",
    "link",
    "copyLink",
    "move",
    "copyMove",
    "linkMove",
    "all"
  ][EffectIndex];
}
function invokeHandler(Name, Options) {
  var Arguments = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    Arguments[_i - 2] = arguments[_i];
  }
  if (Options[Name] != null) {
    try {
      return Options[Name].apply(null, Arguments);
    } catch (Signal) {
      console.error(quoted(Name) + " handler failed", Signal);
    }
  }
}
class Pointer$1 {
  constructor(nativePointer) {
    this.id = -1;
    this.nativePointer = nativePointer;
    this.pageX = nativePointer.pageX;
    this.pageY = nativePointer.pageY;
    this.clientX = nativePointer.clientX;
    this.clientY = nativePointer.clientY;
    if (self.Touch && nativePointer instanceof Touch) {
      this.id = nativePointer.identifier;
    } else if (isPointerEvent$1(nativePointer)) {
      this.id = nativePointer.pointerId;
    }
  }
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer$1(p));
      if (events.length > 0)
        return events;
    }
    return [this];
  }
}
const isPointerEvent$1 = (event) => "pointerId" in event;
const isTouchEvent$1 = (event) => "changedTouches" in event;
const noop$1 = () => {
};
class PointerTracker$1 {
  constructor(_element, { start = () => true, move = noop$1, end = noop$1, rawUpdates = false, avoidPointerEvents = false, eventListenerOptions = { capture: false, passive: false, once: false } } = {}) {
    this._element = _element;
    this.startPointers = [];
    this.currentPointers = [];
    this._excludeFromButtonsCheck = /* @__PURE__ */ new Set();
    this._pointerStart = (event) => {
      if (isPointerEvent$1(event) && event.buttons === 0) {
        this._excludeFromButtonsCheck.add(event.pointerId);
      } else if (!(event.buttons & 1)) {
        return;
      }
      const pointer = new Pointer$1(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent$1(event)) {
        const capturingElement = event.target && "setPointerCapture" in event.target ? event.target : this._element;
        capturingElement.setPointerCapture(event.pointerId);
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move, this._eventListenerOptions);
        this._element.addEventListener("pointerup", this._pointerEnd, this._eventListenerOptions);
        this._element.addEventListener("pointercancel", this._pointerEnd, this._eventListenerOptions);
      } else {
        window.addEventListener("mousemove", this._move);
        window.addEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchStart = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerStart(new Pointer$1(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent$1(event) && (!isPointerEvent$1(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent$1(event) ? Array.from(event.changedTouches).map((t) => new Pointer$1(t)) : [new Pointer$1(event)];
      const trackedChangedPointers = [];
      for (const pointer of changedPointers) {
        const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
        if (index === -1)
          continue;
        trackedChangedPointers.push(pointer);
        this.currentPointers[index] = pointer;
      }
      if (trackedChangedPointers.length === 0)
        return;
      this._moveCallback(previousPointers, trackedChangedPointers, event);
    };
    this._triggerPointerEnd = (pointer, event) => {
      if (!isTouchEvent$1(event) && event.buttons & 1) {
        return false;
      }
      const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
      if (index === -1)
        return false;
      this.currentPointers.splice(index, 1);
      this.startPointers.splice(index, 1);
      this._excludeFromButtonsCheck.delete(pointer.id);
      const cancelled = !(event.type === "mouseup" || event.type === "touchend" || event.type === "pointerup");
      this._endCallback(pointer, event, cancelled);
      return true;
    };
    this._pointerEnd = (event) => {
      if (!this._triggerPointerEnd(new Pointer$1(event), event))
        return;
      if (isPointerEvent$1(event)) {
        if (this.currentPointers.length)
          return;
        this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.removeEventListener("pointerup", this._pointerEnd);
        this._element.removeEventListener("pointercancel", this._pointerEnd);
      } else {
        window.removeEventListener("mousemove", this._move);
        window.removeEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchEnd = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerEnd(new Pointer$1(touch), event);
      }
    };
    this._startCallback = start;
    this._moveCallback = move;
    this._endCallback = end;
    this._rawUpdates = rawUpdates && "onpointerrawupdate" in window;
    this._eventListenerOptions = eventListenerOptions;
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart, this._eventListenerOptions);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart, this._eventListenerOptions);
      this._element.addEventListener("touchstart", this._touchStart, this._eventListenerOptions);
      this._element.addEventListener("touchmove", this._move, this._eventListenerOptions);
      this._element.addEventListener("touchend", this._touchEnd, this._eventListenerOptions);
      this._element.addEventListener("touchcancel", this._touchEnd, this._eventListenerOptions);
    }
  }
  stop() {
    this._element.removeEventListener("pointerdown", this._pointerStart);
    this._element.removeEventListener("mousedown", this._pointerStart);
    this._element.removeEventListener("touchstart", this._touchStart);
    this._element.removeEventListener("touchmove", this._move);
    this._element.removeEventListener("touchend", this._touchEnd);
    this._element.removeEventListener("touchcancel", this._touchEnd);
    this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
    this._element.removeEventListener("pointerup", this._pointerEnd);
    this._element.removeEventListener("pointercancel", this._pointerEnd);
    window.removeEventListener("mousemove", this._move);
    window.removeEventListener("mouseup", this._pointerEnd);
  }
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
}
var Menu_svelte_svelte_type_style_lang = "";
function create_fragment$8(ctx) {
  let div1;
  let t0;
  let t1;
  let t2;
  let div0;
  let t3;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      t0 = text("Scale ");
      t1 = text(ctx[0]);
      t2 = space();
      div0 = element("div");
      t3 = text("+ Drag Me");
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t0 = claim_text(div1_nodes, "Scale ");
      t1 = claim_text(div1_nodes, ctx[0]);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t3 = claim_text(div0_nodes, "+ Drag Me");
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "yellow svelte-woukud");
      attr(div1, "class", "pallette svelte-woukud");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, t0);
      append_hydration(div1, t1);
      append_hydration(div1, t2);
      append_hydration(div1, div0);
      append_hydration(div0, t3);
      ctx[4](div1);
      if (!mounted) {
        dispose = action_destroyer(asDroppable.call(null, div0, {
          Extras: { newContainer: ctx[2] },
          Operations: "copy",
          DataToOffer: { "item/plain": "" }
        }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t1, ctx2[0]);
    },
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching)
        detach(div1);
      ctx[4](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { children: children2 } = $$props;
  let { scale: scale2 = 1 } = $$props;
  let pallette;
  onMount(async () => {
    new PointerTracker$1(pallette, {
      start: (pointer, event) => {
        return false;
      }
    });
  });
  let newContainer = createNewNode();
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pallette = $$value;
      $$invalidate(1, pallette);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("children" in $$props2)
      $$invalidate(3, children2 = $$props2.children);
    if ("scale" in $$props2)
      $$invalidate(0, scale2 = $$props2.scale);
  };
  return [scale2, pallette, newContainer, children2, div1_binding];
}
class Menu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { children: 3, scale: 0 });
  }
}
var Gripper_svelte_svelte_type_style_lang = "";
var Nodes_svelte_svelte_type_style_lang = "";
var Wrapper_svelte_svelte_type_style_lang = "";
class Pointer {
  constructor(nativePointer) {
    this.id = -1;
    this.nativePointer = nativePointer;
    this.pageX = nativePointer.pageX;
    this.pageY = nativePointer.pageY;
    this.clientX = nativePointer.clientX;
    this.clientY = nativePointer.clientY;
    if (self.Touch && nativePointer instanceof Touch) {
      this.id = nativePointer.identifier;
    } else if (isPointerEvent(nativePointer)) {
      this.id = nativePointer.pointerId;
    }
  }
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer(p));
      if (events.length > 0)
        return events;
    }
    return [this];
  }
}
const isPointerEvent = (event) => "pointerId" in event;
const isTouchEvent = (event) => "changedTouches" in event;
const noop = () => {
};
class PointerTracker {
  constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false, eventListenerOptions = { capture: false, passive: false, once: false } } = {}) {
    this._element = _element;
    this.startPointers = [];
    this.currentPointers = [];
    this._excludeFromButtonsCheck = /* @__PURE__ */ new Set();
    this._pointerStart = (event) => {
      if (isPointerEvent(event) && event.buttons === 0) {
        this._excludeFromButtonsCheck.add(event.pointerId);
      } else if (!(event.buttons & 1)) {
        return;
      }
      const pointer = new Pointer(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent(event)) {
        const capturingElement = event.target && "setPointerCapture" in event.target ? event.target : this._element;
        capturingElement.setPointerCapture(event.pointerId);
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move, this._eventListenerOptions);
        this._element.addEventListener("pointerup", this._pointerEnd, this._eventListenerOptions);
        this._element.addEventListener("pointercancel", this._pointerEnd, this._eventListenerOptions);
      } else {
        window.addEventListener("mousemove", this._move);
        window.addEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchStart = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerStart(new Pointer(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent(event) && (!isPointerEvent(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent(event) ? Array.from(event.changedTouches).map((t) => new Pointer(t)) : [new Pointer(event)];
      const trackedChangedPointers = [];
      for (const pointer of changedPointers) {
        const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
        if (index === -1)
          continue;
        trackedChangedPointers.push(pointer);
        this.currentPointers[index] = pointer;
      }
      if (trackedChangedPointers.length === 0)
        return;
      this._moveCallback(previousPointers, trackedChangedPointers, event);
    };
    this._triggerPointerEnd = (pointer, event) => {
      if (!isTouchEvent(event) && event.buttons & 1) {
        return false;
      }
      const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
      if (index === -1)
        return false;
      this.currentPointers.splice(index, 1);
      this.startPointers.splice(index, 1);
      this._excludeFromButtonsCheck.delete(pointer.id);
      const cancelled = !(event.type === "mouseup" || event.type === "touchend" || event.type === "pointerup");
      this._endCallback(pointer, event, cancelled);
      return true;
    };
    this._pointerEnd = (event) => {
      if (!this._triggerPointerEnd(new Pointer(event), event))
        return;
      if (isPointerEvent(event)) {
        if (this.currentPointers.length)
          return;
        this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.removeEventListener("pointerup", this._pointerEnd);
        this._element.removeEventListener("pointercancel", this._pointerEnd);
      } else {
        window.removeEventListener("mousemove", this._move);
        window.removeEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchEnd = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerEnd(new Pointer(touch), event);
      }
    };
    this._startCallback = start;
    this._moveCallback = move;
    this._endCallback = end;
    this._rawUpdates = rawUpdates && "onpointerrawupdate" in window;
    this._eventListenerOptions = eventListenerOptions;
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart, this._eventListenerOptions);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart, this._eventListenerOptions);
      this._element.addEventListener("touchstart", this._touchStart, this._eventListenerOptions);
      this._element.addEventListener("touchmove", this._move, this._eventListenerOptions);
      this._element.addEventListener("touchend", this._touchEnd, this._eventListenerOptions);
      this._element.addEventListener("touchcancel", this._touchEnd, this._eventListenerOptions);
    }
  }
  stop() {
    this._element.removeEventListener("pointerdown", this._pointerStart);
    this._element.removeEventListener("mousedown", this._pointerStart);
    this._element.removeEventListener("touchstart", this._touchStart);
    this._element.removeEventListener("touchmove", this._move);
    this._element.removeEventListener("touchend", this._touchEnd);
    this._element.removeEventListener("touchcancel", this._touchEnd);
    this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
    this._element.removeEventListener("pointerup", this._pointerEnd);
    this._element.removeEventListener("pointercancel", this._pointerEnd);
    window.removeEventListener("mousemove", this._move);
    window.removeEventListener("mouseup", this._pointerEnd);
  }
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
}
var styles = "";
const minScaleAttr = "min-scale";
function getDistance(a, b) {
  if (!b)
    return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}
function getMidpoint(a, b) {
  if (!b)
    return a;
  return {
    clientX: (a.clientX + b.clientX) / 2,
    clientY: (a.clientY + b.clientY) / 2
  };
}
function getAbsoluteValue(value, max) {
  if (typeof value === "number")
    return value;
  if (value.trimRight().endsWith("%")) {
    return max * parseFloat(value) / 100;
  }
  return parseFloat(value);
}
function createMatrix() {
  return new DOMMatrix();
}
function createPoint() {
  return new DOMPoint();
}
const MIN_SCALE = 0.01;
class PinchZoom {
  constructor(node) {
    this._transform = createMatrix();
    this._node = node;
    this._parentEl = this._node.parentElement || document.body;
    new MutationObserver(() => this._stageElChange()).observe(this._node, { childList: true });
    this._pointerTracker = new PointerTracker(this._parentEl, {
      eventListenerOptions: { capture: true },
      start: (pointer, event) => {
        if (this._pointerTracker.currentPointers.length === 0 && (event.target instanceof HTMLInputElement || event.target.isContentEditable)) {
          return false;
        }
        if (this._pointerTracker.currentPointers.length === 2 || !this._parentEl)
          return false;
        event.preventDefault();
        if (this._pointerTracker.currentPointers.length === 1) {
          event.stopPropagation();
          return true;
        }
        if (this._pointerTracker.currentPointers.length === 0) {
          return true;
        }
      },
      move: (previousPointers, changedPointers, event) => {
        if (this._pointerTracker.currentPointers.length === 0)
          return;
        if (this._pointerTracker.currentPointers.length === 1 && !(event.target == this._parentEl || event.target == node))
          return;
        event.stopPropagation();
        this._onPointerMove(previousPointers, this._pointerTracker.currentPointers);
      },
      end: (pointer, event, cancelled) => {
      }
    });
    this._parentEl.addEventListener("wheel", (event) => this._onWheel(event));
  }
  static get observedAttributes() {
    return [minScaleAttr];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === minScaleAttr) {
      if (this.scale < this.minScale) {
        this.setTransform({ scale: this.minScale });
      }
    }
  }
  get minScale() {
    const attrValue = this._node.getAttribute(minScaleAttr);
    if (!attrValue)
      return MIN_SCALE;
    const value = parseFloat(attrValue);
    if (Number.isFinite(value))
      return Math.max(MIN_SCALE, value);
    return MIN_SCALE;
  }
  set minScale(value) {
    this._node.setAttribute(minScaleAttr, String(value));
  }
  connectedCallback() {
    this._stageElChange();
  }
  get x() {
    return this._transform.e;
  }
  get y() {
    return this._transform.f;
  }
  get scale() {
    return this._transform.a;
  }
  scaleTo(scale2, opts = {}) {
    let { originX = 0, originY = 0 } = opts;
    const { relativeTo = "content", allowChangeEvent = false } = opts;
    const relativeToEl = relativeTo === "content" ? this._parentEl : this._node;
    if (!relativeToEl || !this._parentEl) {
      this.setTransform({ scale: scale2, allowChangeEvent });
      return;
    }
    const rect = relativeToEl.getBoundingClientRect();
    originX = getAbsoluteValue(originX, rect.width);
    originY = getAbsoluteValue(originY, rect.height);
    if (relativeTo === "content") {
      originX += this.x;
      originY += this.y;
    } else {
      const currentRect = this._parentEl.getBoundingClientRect();
      originX -= currentRect.left;
      originY -= currentRect.top;
    }
    this._applyChange({
      allowChangeEvent,
      originX,
      originY,
      scaleDiff: scale2 / this.scale
    });
  }
  setTransform(opts = {}) {
    const { scale: scale2 = this.scale, allowChangeEvent = false } = opts;
    let { x = this.x, y = this.y } = opts;
    if (!this._parentEl) {
      this._updateTransform(scale2, x, y, allowChangeEvent);
      return;
    }
    const thisBounds = this._node.getBoundingClientRect();
    const parentElBounds = this._parentEl.getBoundingClientRect();
    if (!thisBounds.width || !thisBounds.height) {
      this._updateTransform(scale2, x, y, allowChangeEvent);
      return;
    }
    let topLeft = createPoint();
    topLeft.x = parentElBounds.left - thisBounds.left;
    topLeft.y = parentElBounds.top - thisBounds.top;
    let bottomRight = createPoint();
    bottomRight.x = parentElBounds.width + topLeft.x;
    bottomRight.y = parentElBounds.height + topLeft.y;
    const matrix = createMatrix().translate(x, y).scale(scale2).multiply(this._transform.inverse());
    topLeft = topLeft.matrixTransform(matrix);
    bottomRight = bottomRight.matrixTransform(matrix);
    this._updateTransform(scale2, x, y, allowChangeEvent);
  }
  _updateTransform(scale2, x, y, allowChangeEvent) {
    if (scale2 < this.minScale)
      return;
    if (scale2 === this.scale && x === this.x && y === this.y)
      return;
    this._transform.e = x;
    this._transform.f = y;
    this._transform.d = this._transform.a = scale2;
    this._node.style.transform = `translate(${x}px,${y}px) scale(${scale2})`;
    if (allowChangeEvent) {
      const event = new Event("change", { bubbles: true });
      this._node.dispatchEvent(event);
    }
  }
  _stageElChange() {
    this._parentEl = this._node.parentElement || document.body;
    this.setTransform({ allowChangeEvent: true });
  }
  _onWheel(event) {
    if (!this._parentEl)
      return;
    event.preventDefault();
    this._parentEl.getBoundingClientRect();
    let { deltaY } = event;
    const { ctrlKey, deltaMode } = event;
    if (deltaMode === 1) {
      deltaY *= 15;
    }
    const divisor = ctrlKey ? 200 : 600;
    const scaleDiff = 1 - deltaY / divisor;
    this._applyChange({
      scaleDiff,
      originX: event.pageX - this._parentEl.offsetLeft - this._parentEl.clientWidth / 2,
      originY: event.pageY - this._parentEl.offsetTop - this._parentEl.clientHeight / 2,
      allowChangeEvent: true
    });
  }
  _onPointerMove(previousPointers, currentPointers) {
    if (!this._parentEl)
      return;
    const currentRect = this._parentEl.getBoundingClientRect();
    const prevMidpoint = getMidpoint(previousPointers[0], previousPointers[1]);
    const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);
    const originX = prevMidpoint.clientX - currentRect.left - currentRect.width / 2;
    const originY = prevMidpoint.clientY - currentRect.top - currentRect.height / 2;
    const prevDistance = getDistance(previousPointers[0], previousPointers[1]);
    const newDistance = getDistance(currentPointers[0], currentPointers[1]);
    const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
    this._applyChange({
      originX,
      originY,
      scaleDiff,
      panX: newMidpoint.clientX - prevMidpoint.clientX,
      panY: newMidpoint.clientY - prevMidpoint.clientY,
      allowChangeEvent: true
    });
  }
  _applyChange(opts = {}) {
    const { panX = 0, panY = 0, originX = 0, originY = 0, scaleDiff = 1, allowChangeEvent = false } = opts;
    const matrix = createMatrix().translate(panX, panY).translate(originX, originY).scale(scaleDiff).translate(-originX, -originY).multiply(this._transform);
    this.setTransform({
      allowChangeEvent,
      scale: matrix.a,
      x: matrix.e,
      y: matrix.f
    });
  }
}
const pzoom = (node, params = {}) => {
  let container = node.parentElement || document.body;
  container.style["touch-action"] = "none";
  container.style["user-select"] = "none";
  container.style["overflow"] = "hidden";
  container.style["position"] = "relative";
  node.style["touch-action"] = "none";
  node.style["user-select"] = "none";
  node.style["position"] = "absolute";
  new PinchZoom(node);
};
const scale = writable({ value: 1 });
const selected = writable(null);
var ResizeHandle_svelte_svelte_type_style_lang = "";
function create_fragment$7(ctx) {
  let div1;
  let div0;
  let div0_class_value;
  let div1_class_value;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", div0_class_value = "resize-handle-decoration " + ctx[0] + " svelte-ejs9cn");
      attr(div1, "class", div1_class_value = "resize-handle " + ctx[0] + " svelte-ejs9cn");
      set_style(div1, "--size", size);
      set_style(div1, "left", ctx[3] + "px");
      set_style(div1, "top", ctx[2] + "px");
      set_style(div1, "cursor", ctx[4]);
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      ctx[19](div1);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && div0_class_value !== (div0_class_value = "resize-handle-decoration " + ctx2[0] + " svelte-ejs9cn")) {
        attr(div0, "class", div0_class_value);
      }
      if (dirty & 1 && div1_class_value !== (div1_class_value = "resize-handle " + ctx2[0] + " svelte-ejs9cn")) {
        attr(div1, "class", div1_class_value);
      }
      if (dirty & 8) {
        set_style(div1, "left", ctx2[3] + "px");
      }
      if (dirty & 4) {
        set_style(div1, "top", ctx2[2] + "px");
      }
    },
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching)
        detach(div1);
      ctx[19](null);
    }
  };
}
let size = "4em";
function instance$7($$self, $$props, $$invalidate) {
  let handleWidth;
  let handleHeight;
  let left;
  let top;
  let $scale;
  component_subscribe($$self, scale, ($$value) => $$invalidate(20, $scale = $$value));
  let { x } = $$props;
  let { y } = $$props;
  let { width } = $$props;
  let { height } = $$props;
  let { maxFrameHeight: maxFrameHeight2 = 2500 } = $$props;
  let { maxFrameWidth: maxFrameWidth2 = 2500 } = $$props;
  let { minFrameHeight: minFrameHeight2 = 40 } = $$props;
  let { minFrameWidth: minFrameWidth2 = 40 } = $$props;
  let { arenaWidth } = $$props;
  let { arenaHeight } = $$props;
  let { direction } = $$props;
  let { isDragging = false } = $$props;
  let { grid: grid2 } = $$props;
  const isPointerEvent2 = (event) => "pointerId" in event;
  let handleEl;
  onMount(() => {
    const pointerTracker = new PointerTracker$1(handleEl, {
      start: (pointer, event) => {
        if (pointerTracker.currentPointers.length === 2)
          return false;
        event.stopPropagation();
        event.preventDefault();
        return true;
      },
      move: (previousPointers, changedPointers, event) => {
        if (!isPointerEvent2(event))
          return;
        let dx = event.clientX - previousPointers[0].clientX;
        let dy = event.clientY - previousPointers[0].clientY;
        dragHandle(event.clientX, event.clientY, dx, dy);
      },
      end: (pointer, event, cancelled) => {
        onDragEnd();
      }
    });
  });
  let cursor = direction == "nw" || direction == "se" ? "nwse-resize" : direction == "n" || direction == "s" ? "ns-resize" : direction == "ne" || direction == "sw" ? "nesw-resize" : "ew-resize";
  function handleX(direction2, x2, width2, handleWidth2) {
    switch (direction2) {
      case "nw":
      case "w":
      case "sw":
        return x2 - handleWidth2 / 2;
      case "n":
      case "s":
        return x2 + width2 / 2;
      case "ne":
      case "e":
      case "se":
        return x2 + width2;
    }
  }
  function handleY(direction2, y2, height2, handleHeight2) {
    switch (direction2) {
      case "nw":
      case "n":
      case "ne":
        return y2 - handleHeight2 / 2;
      case "e":
      case "w":
        return y2 + height2 / 2 - handleHeight2 / 2;
      case "sw":
      case "s":
      case "se":
        return y2 + height2;
    }
  }
  function dragHandle(_x, _y, dx, dy) {
    switch (direction) {
      case "nw":
      case "w":
      case "sw":
        $$invalidate(5, x = Math.max(0, x + width - maxFrameWidth2, Math.min(x + width - minFrameWidth2, arenaWidth, x + dx / $scale.value)));
        $$invalidate(7, width = width - dx / $scale.value);
        break;
      case "ne":
      case "e":
      case "se":
        $$invalidate(7, width = Math.max(0, x + minFrameWidth2, Math.min(x + maxFrameWidth2, arenaWidth, x + width + dx / $scale.value)) - x);
    }
    switch (direction) {
      case "nw":
      case "n":
      case "ne":
        $$invalidate(6, y = Math.max(0, y + height - maxFrameHeight2, Math.min(y + height - minFrameHeight2, arenaHeight, y + dy / $scale.value)));
        $$invalidate(8, height = height - dy / $scale.value);
        break;
      case "sw":
      case "s":
      case "se":
        $$invalidate(8, height = Math.max(0, y + minFrameHeight2, Math.min(y + maxFrameHeight2, arenaHeight, y + height + dy / $scale.value)) - y);
    }
  }
  function onDragEnd() {
    $$invalidate(9, isDragging = false);
    if (grid2) {
      $$invalidate(5, x = Math.floor(x / grid2) * grid2);
      $$invalidate(6, y = Math.floor(y / grid2) * grid2);
      $$invalidate(7, width = Math.floor(width / grid2) * grid2);
      $$invalidate(8, height = Math.floor(height / grid2) * grid2);
    }
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      handleEl = $$value;
      $$invalidate(1, handleEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("x" in $$props2)
      $$invalidate(5, x = $$props2.x);
    if ("y" in $$props2)
      $$invalidate(6, y = $$props2.y);
    if ("width" in $$props2)
      $$invalidate(7, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(8, height = $$props2.height);
    if ("maxFrameHeight" in $$props2)
      $$invalidate(10, maxFrameHeight2 = $$props2.maxFrameHeight);
    if ("maxFrameWidth" in $$props2)
      $$invalidate(11, maxFrameWidth2 = $$props2.maxFrameWidth);
    if ("minFrameHeight" in $$props2)
      $$invalidate(12, minFrameHeight2 = $$props2.minFrameHeight);
    if ("minFrameWidth" in $$props2)
      $$invalidate(13, minFrameWidth2 = $$props2.minFrameWidth);
    if ("arenaWidth" in $$props2)
      $$invalidate(14, arenaWidth = $$props2.arenaWidth);
    if ("arenaHeight" in $$props2)
      $$invalidate(15, arenaHeight = $$props2.arenaHeight);
    if ("direction" in $$props2)
      $$invalidate(0, direction = $$props2.direction);
    if ("isDragging" in $$props2)
      $$invalidate(9, isDragging = $$props2.isDragging);
    if ("grid" in $$props2)
      $$invalidate(16, grid2 = $$props2.grid);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      $$invalidate(18, handleWidth = handleEl ? handleEl.getClientRects()[0].height : 8);
    }
    if ($$self.$$.dirty & 2) {
      $$invalidate(17, handleHeight = handleEl ? handleEl.getClientRects()[0].width : 8);
    }
    if ($$self.$$.dirty & 262305) {
      $$invalidate(3, left = handleX(direction, x, width, handleWidth));
    }
    if ($$self.$$.dirty & 131393) {
      $$invalidate(2, top = handleY(direction, y, height, handleHeight));
    }
  };
  return [
    direction,
    handleEl,
    top,
    left,
    cursor,
    x,
    y,
    width,
    height,
    isDragging,
    maxFrameHeight2,
    maxFrameWidth2,
    minFrameHeight2,
    minFrameWidth2,
    arenaWidth,
    arenaHeight,
    grid2,
    handleHeight,
    handleWidth,
    div1_binding
  ];
}
class ResizeHandle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      x: 5,
      y: 6,
      width: 7,
      height: 8,
      maxFrameHeight: 10,
      maxFrameWidth: 11,
      minFrameHeight: 12,
      minFrameWidth: 13,
      arenaWidth: 14,
      arenaHeight: 15,
      direction: 0,
      isDragging: 9,
      grid: 16
    });
  }
}
function clickOutside(node, { enabled: initialEnabled, handleUnselect }) {
  const handleOutsideClick = ({ target }) => {
    if (node !== target && node.parentElement != target.parentElement && !node.contains(target)) {
      handleUnselect();
    }
  };
  function update({ enabled }) {
    if (enabled) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
  }
  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener("click", handleOutsideClick);
    }
  };
}
var EditableText_svelte_svelte_type_style_lang = "";
function create_fragment$6(ctx) {
  let div;
  let div_class_value;
  let clickOutside_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { contenteditable: true, class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "contenteditable", "");
      attr(div, "class", div_class_value = null_to_empty(ctx[0]) + " svelte-1708iua");
      if (ctx[3] === void 0)
        add_render_callback(() => ctx[12].call(div));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      ctx[11](div);
      if (ctx[3] !== void 0) {
        div.innerHTML = ctx[3];
      }
      if (!mounted) {
        dispose = [
          listen(div, "keydown", ctx[5]),
          listen(div, "blur", ctx[6]),
          listen(div, "input", ctx[12]),
          listen(div, "click", ctx[4]),
          action_destroyer(clickOutside_action = clickOutside.call(null, div, {
            enabled: ctx[1],
            handleUnselect: ctx[7]
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && div_class_value !== (div_class_value = null_to_empty(ctx2[0]) + " svelte-1708iua")) {
        attr(div, "class", div_class_value);
      }
      if (dirty & 8 && ctx2[3] !== div.innerHTML) {
        div.innerHTML = ctx2[3];
      }
      if (clickOutside_action && is_function(clickOutside_action.update) && dirty & 2)
        clickOutside_action.update.call(null, {
          enabled: ctx2[1],
          handleUnselect: ctx2[7]
        });
    },
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching)
        detach(div);
      ctx[11](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { value = "" } = $$props;
  let { type = "text" } = $$props;
  let { placeholder = "" } = $$props;
  let { labelClasses = "" } = $$props;
  let editing = false;
  let inputEl;
  let label = value;
  const dispatch = createEventDispatcher();
  async function toggle(event) {
    $$invalidate(1, editing = !editing);
    console.log(`editing toggled to ${editing}`);
    if (editing) {
      await tick();
      inputEl.focus();
    } else {
      stopEditing();
    }
  }
  function stopEditing() {
    $$invalidate(1, editing = false);
    $$invalidate(8, value = label);
    dispatch("doneEditing");
  }
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      inputEl.blur();
    }
  };
  const handleBlur = (_) => {
    if (value != "" && value != null)
      toggle();
    else
      $$invalidate(8, value = "Enter Value");
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      document.selection.empty();
    }
  };
  function handleUnselect(e) {
    if (document.activeElement === inputEl)
      inputEl.blur();
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inputEl = $$value;
      $$invalidate(2, inputEl);
    });
  }
  function div_input_handler() {
    label = this.innerHTML;
    $$invalidate(3, label);
  }
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(8, value = $$props2.value);
    if ("type" in $$props2)
      $$invalidate(9, type = $$props2.type);
    if ("placeholder" in $$props2)
      $$invalidate(10, placeholder = $$props2.placeholder);
    if ("labelClasses" in $$props2)
      $$invalidate(0, labelClasses = $$props2.labelClasses);
  };
  return [
    labelClasses,
    editing,
    inputEl,
    label,
    toggle,
    handleEnter,
    handleBlur,
    handleUnselect,
    value,
    type,
    placeholder,
    div_binding,
    div_input_handler
  ];
}
class EditableText extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      value: 8,
      type: 9,
      placeholder: 10,
      labelClasses: 0
    });
  }
}
const colors = [
  "#63B75A4B",
  "#FEE9004B",
  "#ff003b4b",
  "#69f5dc4B",
  "#FF9D484B",
  "#7a00ff4B",
  "#ff14f84b",
  "#376bff4b"
];
var ColorPicker_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}
function create_if_block$5(ctx) {
  let each_1_anchor;
  let each_value = colors;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value = colors;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block$1(ctx) {
  let div;
  let t;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[1](ctx[2], ...args);
  }
  return {
    c() {
      div = element("div");
      t = text("\xA0 \xA0\r\n			");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "\xA0 \xA0\r\n			");
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "colorOption svelte-7w3296");
      set_style(div, "background-color", ctx[2]);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
      if (!mounted) {
        dispose = listen(div, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$5(ctx) {
  let main;
  let if_block = ctx[0] && colors && create_if_block$5(ctx);
  return {
    c() {
      main = element("main");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      if (if_block)
        if_block.l(main_nodes);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(main, "class", "svelte-7w3296");
    },
    m(target, anchor) {
      insert_hydration(target, main, anchor);
      if (if_block)
        if_block.m(main, null);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] && colors) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          if_block.m(main, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching)
        detach(main);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { backgroundColor = "#fee9004b" } = $$props;
  const click_handler = (color, e) => $$invalidate(0, backgroundColor = color);
  $$self.$$set = ($$props2) => {
    if ("backgroundColor" in $$props2)
      $$invalidate(0, backgroundColor = $$props2.backgroundColor);
  };
  return [backgroundColor, click_handler];
}
class ColorPicker extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { backgroundColor: 0 });
  }
}
var ContextMenu_svelte_svelte_type_style_lang = "";
function create_if_block$4(ctx) {
  let colorpicker;
  let updating_backgroundColor;
  let current;
  function colorpicker_backgroundColor_binding(value) {
    ctx[2](value);
  }
  let colorpicker_props = {};
  if (ctx[0].style.backgroundColor !== void 0) {
    colorpicker_props.backgroundColor = ctx[0].style.backgroundColor;
  }
  colorpicker = new ColorPicker({ props: colorpicker_props });
  binding_callbacks.push(() => bind(colorpicker, "backgroundColor", colorpicker_backgroundColor_binding));
  return {
    c() {
      create_component(colorpicker.$$.fragment);
    },
    l(nodes) {
      claim_component(colorpicker.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(colorpicker, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const colorpicker_changes = {};
      if (!updating_backgroundColor && dirty & 1) {
        updating_backgroundColor = true;
        colorpicker_changes.backgroundColor = ctx2[0].style.backgroundColor;
        add_flush_callback(() => updating_backgroundColor = false);
      }
      colorpicker.$set(colorpicker_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(colorpicker.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(colorpicker.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(colorpicker, detaching);
    }
  };
}
function create_fragment$4(ctx) {
  var _a, _b;
  let div;
  let t0;
  let span0;
  let t1;
  let t2;
  let span1;
  let t3;
  let div_resize_listener;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[0] && ((_b = (_a = ctx[0]) == null ? void 0 : _a.style) == null ? void 0 : _b.backgroundColor) && ColorPicker && create_if_block$4(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      span0 = element("span");
      t1 = text("\u21AA");
      t2 = space();
      span1 = element("span");
      t3 = text("\u{1F5D1}\uFE0F");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      t0 = claim_space(div_nodes);
      span0 = claim_element(div_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t1 = claim_text(span0_nodes, "\u21AA");
      span0_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      span1 = claim_element(div_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      t3 = claim_text(span1_nodes, "\u{1F5D1}\uFE0F");
      span1_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "connect svelte-1fxjj2n");
      attr(span1, "class", "svelte-1fxjj2n");
      attr(div, "class", "context-menu svelte-1fxjj2n");
      set_style(div, "right", "-" + ctx[1] * 3.25 + "px");
      set_style(div, "top", "0");
      add_render_callback(() => ctx[3].call(div));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      append_hydration(div, t0);
      append_hydration(div, span0);
      append_hydration(span0, t1);
      append_hydration(div, t2);
      append_hydration(div, span1);
      append_hydration(span1, t3);
      div_resize_listener = add_resize_listener(div, ctx[3].bind(div));
      current = true;
      if (!mounted) {
        dispose = [
          listen(span0, "click", stop_propagation(handleConnect)),
          listen(span1, "click", stop_propagation(handleDelete))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b2;
      if (ctx2[0] && ((_b2 = (_a2 = ctx2[0]) == null ? void 0 : _a2.style) == null ? void 0 : _b2.backgroundColor) && ColorPicker) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 2) {
        set_style(div, "right", "-" + ctx2[1] * 3.25 + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      div_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function handleDelete(e) {
}
function handleConnect(e) {
}
function instance$4($$self, $$props, $$invalidate) {
  let { node } = $$props;
  let offsetWidth;
  function colorpicker_backgroundColor_binding(value) {
    if ($$self.$$.not_equal(node.style.backgroundColor, value)) {
      node.style.backgroundColor = value;
      $$invalidate(0, node);
    }
  }
  function div_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    $$invalidate(1, offsetWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(0, node = $$props2.node);
  };
  return [
    node,
    offsetWidth,
    colorpicker_backgroundColor_binding,
    div_elementresize_handler
  ];
}
class ContextMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { node: 0 });
  }
}
var Container_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[32] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[35] = list[i];
  child_ctx[36] = list;
  child_ctx[37] = i;
  return child_ctx;
}
function create_if_block$3(ctx) {
  var _a, _b;
  let div1;
  let div0;
  let editabletext;
  let updating_value;
  let t0;
  let t1_value = (ctx[4] ? window.getComputedStyle(ctx[4])["font-size"] : "Calculating size...") + "";
  let t1;
  let t2;
  let switch_instance;
  let updating_props;
  let t3;
  let t4;
  let div1_resize_listener;
  let clickOutside_action;
  let t5;
  let if_block2_anchor;
  let current;
  let mounted;
  let dispose;
  function editabletext_value_binding(value) {
    ctx[11](value);
  }
  let editabletext_props = {};
  if (ctx[0].name !== void 0) {
    editabletext_props.value = ctx[0].name;
  }
  editabletext = new EditableText({ props: editabletext_props });
  binding_callbacks.push(() => bind(editabletext, "value", editabletext_value_binding));
  function switch_instance_props_binding(value) {
    ctx[12](value);
  }
  var switch_value = ctx[0].component;
  function switch_props(ctx2) {
    let switch_instance_props = {};
    if (ctx2[0].props !== void 0) {
      switch_instance_props.props = ctx2[0].props;
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "props", switch_instance_props_binding));
  }
  let if_block0 = ((_b = (_a = ctx[0]) == null ? void 0 : _a.children) == null ? void 0 : _b.length) > 0 && create_if_block_3(ctx);
  let if_block1 = ctx[4] && ctx[7] && create_if_block_2(ctx);
  let if_block2 = ctx[4] && ctx[7] && create_if_block_1(ctx);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(editabletext.$$.fragment);
      t0 = text("\r\n		\r\n		Container font-size: ");
      t1 = text(t1_value);
      t2 = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t3 = space();
      if (if_block0)
        if_block0.c();
      t4 = space();
      if (if_block1)
        if_block1.c();
      t5 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(editabletext.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t0 = claim_text(div1_nodes, "\r\n		\r\n		Container font-size: ");
      t1 = claim_text(div1_nodes, t1_value);
      t2 = claim_space(div1_nodes);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, div1_nodes);
      t3 = claim_space(div1_nodes);
      if (if_block0)
        if_block0.l(div1_nodes);
      t4 = claim_space(div1_nodes);
      if (if_block1)
        if_block1.l(div1_nodes);
      div1_nodes.forEach(detach);
      t5 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      if_block2_anchor = empty();
      this.h();
    },
    h() {
      var _a2, _b2, _c, _d, _e, _f;
      attr(div0, "class", "title svelte-1zt0np");
      attr(div1, "class", "container svelte-1zt0np");
      set_style(div1, "position", "absolute");
      set_style(div1, "left", ctx[0].x + "px");
      set_style(div1, "top", ctx[0].y + "px");
      set_style(div1, "width", ((_b2 = (_a2 = ctx[0]) == null ? void 0 : _a2.style) == null ? void 0 : _b2.width) + "px");
      set_style(div1, "height", ((_d = (_c = ctx[0]) == null ? void 0 : _c.style) == null ? void 0 : _d.height) + "px");
      set_style(div1, "font-size", fontSize);
      set_style(div1, "background-color", ((_f = (_e = ctx[0]) == null ? void 0 : _e.style) == null ? void 0 : _f.backgroundColor) || "#fee9004b");
      add_render_callback(() => ctx[17].call(div1));
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      mount_component(editabletext, div0, null);
      append_hydration(div1, t0);
      append_hydration(div1, t1);
      append_hydration(div1, t2);
      if (switch_instance) {
        mount_component(switch_instance, div1, null);
      }
      append_hydration(div1, t3);
      if (if_block0)
        if_block0.m(div1, null);
      append_hydration(div1, t4);
      if (if_block1)
        if_block1.m(div1, null);
      ctx[16](div1);
      div1_resize_listener = add_resize_listener(div1, ctx[17].bind(div1));
      insert_hydration(target, t5, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, if_block2_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(clickOutside_action = clickOutside.call(null, div1, {
            enabled: ctx[7],
            handleUnselect: ctx[9]
          })),
          listen(div1, "focusout", ctx[9]),
          listen(div1, "dragstart", handleDragStart)
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h;
      const editabletext_changes = {};
      if (!updating_value && dirty[0] & 1) {
        updating_value = true;
        editabletext_changes.value = ctx2[0].name;
        add_flush_callback(() => updating_value = false);
      }
      editabletext.$set(editabletext_changes);
      if ((!current || dirty[0] & 16) && t1_value !== (t1_value = (ctx2[4] ? window.getComputedStyle(ctx2[4])["font-size"] : "Calculating size...") + ""))
        set_data(t1, t1_value);
      const switch_instance_changes = {};
      if (!updating_props && dirty[0] & 1) {
        updating_props = true;
        switch_instance_changes.props = ctx2[0].props;
        add_flush_callback(() => updating_props = false);
      }
      if (switch_value !== (switch_value = ctx2[0].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          binding_callbacks.push(() => bind(switch_instance, "props", switch_instance_props_binding));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div1, t3);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
      if (((_b2 = (_a2 = ctx2[0]) == null ? void 0 : _a2.children) == null ? void 0 : _b2.length) > 0) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & 1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t4);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[4] && ctx2[7]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 144) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & 1) {
        set_style(div1, "left", ctx2[0].x + "px");
      }
      if (!current || dirty[0] & 1) {
        set_style(div1, "top", ctx2[0].y + "px");
      }
      if (!current || dirty[0] & 1) {
        set_style(div1, "width", ((_d = (_c = ctx2[0]) == null ? void 0 : _c.style) == null ? void 0 : _d.width) + "px");
      }
      if (!current || dirty[0] & 1) {
        set_style(div1, "height", ((_f = (_e = ctx2[0]) == null ? void 0 : _e.style) == null ? void 0 : _f.height) + "px");
      }
      if (!current || dirty[0] & 1) {
        set_style(div1, "background-color", ((_h = (_g = ctx2[0]) == null ? void 0 : _g.style) == null ? void 0 : _h.backgroundColor) || "#fee9004b");
      }
      if (clickOutside_action && is_function(clickOutside_action.update) && dirty[0] & 128)
        clickOutside_action.update.call(null, {
          enabled: ctx2[7],
          handleUnselect: ctx2[9]
        });
      if (ctx2[4] && ctx2[7]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & 144) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(editabletext.$$.fragment, local);
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(editabletext.$$.fragment, local);
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(editabletext);
      if (switch_instance)
        destroy_component(switch_instance);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      ctx[16](null);
      div1_resize_listener();
      if (detaching)
        detach(t5);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(if_block2_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_3(ctx) {
  let each_1_anchor;
  let current;
  let each_value_1 = ctx[0].children;
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 99) {
        each_value_1 = ctx2[0].children;
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block_1(ctx) {
  let container_1;
  let updating_node;
  let updating_isDragging;
  let current;
  function container_1_node_binding(value) {
    ctx[13](value, ctx[35], ctx[36], ctx[37]);
  }
  function container_1_isDragging_binding(value) {
    ctx[14](value);
  }
  let container_1_props = {
    arenaWidth: ctx[5],
    arenaHeight: ctx[6]
  };
  if (ctx[35] !== void 0) {
    container_1_props.node = ctx[35];
  }
  if (ctx[1] !== void 0) {
    container_1_props.isDragging = ctx[1];
  }
  container_1 = new Container({ props: container_1_props });
  binding_callbacks.push(() => bind(container_1, "node", container_1_node_binding));
  binding_callbacks.push(() => bind(container_1, "isDragging", container_1_isDragging_binding));
  return {
    c() {
      create_component(container_1.$$.fragment);
    },
    l(nodes) {
      claim_component(container_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(container_1, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const container_1_changes = {};
      if (dirty[0] & 32)
        container_1_changes.arenaWidth = ctx[5];
      if (dirty[0] & 64)
        container_1_changes.arenaHeight = ctx[6];
      if (!updating_node && dirty[0] & 1) {
        updating_node = true;
        container_1_changes.node = ctx[35];
        add_flush_callback(() => updating_node = false);
      }
      if (!updating_isDragging && dirty[0] & 2) {
        updating_isDragging = true;
        container_1_changes.isDragging = ctx[1];
        add_flush_callback(() => updating_isDragging = false);
      }
      container_1.$set(container_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(container_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(container_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(container_1, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let contextmenu;
  let updating_node;
  let current;
  function contextmenu_node_binding(value) {
    ctx[15](value);
  }
  let contextmenu_props = {};
  if (ctx[0] !== void 0) {
    contextmenu_props.node = ctx[0];
  }
  contextmenu = new ContextMenu({ props: contextmenu_props });
  binding_callbacks.push(() => bind(contextmenu, "node", contextmenu_node_binding));
  return {
    c() {
      create_component(contextmenu.$$.fragment);
    },
    l(nodes) {
      claim_component(contextmenu.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(contextmenu, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const contextmenu_changes = {};
      if (!updating_node && dirty[0] & 1) {
        updating_node = true;
        contextmenu_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      contextmenu.$set(contextmenu_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(contextmenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(contextmenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(contextmenu, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ctx[8];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 271) {
        each_value = ctx2[8];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block(ctx) {
  let resizehandle;
  let updating_x;
  let updating_y;
  let updating_width;
  let updating_height;
  let updating_isDragging;
  let current;
  function resizehandle_x_binding(value) {
    ctx[18](value);
  }
  function resizehandle_y_binding(value) {
    ctx[19](value);
  }
  function resizehandle_width_binding(value) {
    ctx[20](value);
  }
  function resizehandle_height_binding(value) {
    ctx[21](value);
  }
  function resizehandle_isDragging_binding(value) {
    ctx[22](value);
  }
  let resizehandle_props = {
    maxFrameWidth,
    minFrameWidth,
    arenaWidth: ctx[3],
    arenaHeight: ctx[2],
    maxFrameHeight,
    minFrameHeight,
    direction: ctx[32],
    grid
  };
  if (ctx[0].x !== void 0) {
    resizehandle_props.x = ctx[0].x;
  }
  if (ctx[0].y !== void 0) {
    resizehandle_props.y = ctx[0].y;
  }
  if (ctx[0].style.width !== void 0) {
    resizehandle_props.width = ctx[0].style.width;
  }
  if (ctx[0].style.height !== void 0) {
    resizehandle_props.height = ctx[0].style.height;
  }
  if (ctx[1] !== void 0) {
    resizehandle_props.isDragging = ctx[1];
  }
  resizehandle = new ResizeHandle({ props: resizehandle_props });
  binding_callbacks.push(() => bind(resizehandle, "x", resizehandle_x_binding));
  binding_callbacks.push(() => bind(resizehandle, "y", resizehandle_y_binding));
  binding_callbacks.push(() => bind(resizehandle, "width", resizehandle_width_binding));
  binding_callbacks.push(() => bind(resizehandle, "height", resizehandle_height_binding));
  binding_callbacks.push(() => bind(resizehandle, "isDragging", resizehandle_isDragging_binding));
  return {
    c() {
      create_component(resizehandle.$$.fragment);
    },
    l(nodes) {
      claim_component(resizehandle.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(resizehandle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const resizehandle_changes = {};
      if (dirty[0] & 8)
        resizehandle_changes.arenaWidth = ctx2[3];
      if (dirty[0] & 4)
        resizehandle_changes.arenaHeight = ctx2[2];
      if (!updating_x && dirty[0] & 1) {
        updating_x = true;
        resizehandle_changes.x = ctx2[0].x;
        add_flush_callback(() => updating_x = false);
      }
      if (!updating_y && dirty[0] & 1) {
        updating_y = true;
        resizehandle_changes.y = ctx2[0].y;
        add_flush_callback(() => updating_y = false);
      }
      if (!updating_width && dirty[0] & 1) {
        updating_width = true;
        resizehandle_changes.width = ctx2[0].style.width;
        add_flush_callback(() => updating_width = false);
      }
      if (!updating_height && dirty[0] & 1) {
        updating_height = true;
        resizehandle_changes.height = ctx2[0].style.height;
        add_flush_callback(() => updating_height = false);
      }
      if (!updating_isDragging && dirty[0] & 2) {
        updating_isDragging = true;
        resizehandle_changes.isDragging = ctx2[1];
        add_flush_callback(() => updating_isDragging = false);
      }
      resizehandle.$set(resizehandle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(resizehandle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(resizehandle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(resizehandle, detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] && document && clickOutside && create_if_block$3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0] && document && clickOutside) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
let grid = 20;
let minFrameWidth = 40;
let maxFrameWidth = 2500;
let minFrameHeight = 20;
let maxFrameHeight = 2500;
let fontSize = "0.8em";
function handleDragStart(e) {
  console.log("Drag started");
  e.preventDefault();
}
function instance$3($$self, $$props, $$invalidate) {
  let $selected;
  let $scale;
  component_subscribe($$self, selected, ($$value) => $$invalidate(10, $selected = $$value));
  component_subscribe($$self, scale, ($$value) => $$invalidate(24, $scale = $$value));
  let { node } = $$props;
  let { arenaHeight } = $$props;
  let { arenaWidth } = $$props;
  let { isDragging = false } = $$props;
  createEventDispatcher();
  let container;
  let clientWidth, clientHeight;
  let isFocused;
  let directions = ["nw", "w", "sw", "ne", "e", "se", "n", "s"];
  let pointerTracker;
  onMount(async () => {
    pointerTracker = new PointerTracker$1(container, {
      start: (pointer, event) => {
        if (pointerTracker.currentPointers.length === 0 && (event.target instanceof HTMLInputElement || event.target.isContentEditable)) {
          console.log("single pointers on input / editable element");
          return false;
        }
        if (pointerTracker.currentPointers.length === 1)
          return false;
        event.stopPropagation();
        event.preventDefault();
        return true;
      },
      move: (previousPointers, changedPointers, event) => {
        let dx = event.clientX - previousPointers[0].clientX;
        let dy = event.clientY - previousPointers[0].clientY;
        dragFrame(event.clientX, event.clientY, dx, dy);
      },
      end: (pointer, event, cancelled) => {
        onDragEnd();
        handleFocus();
      }
    });
  });
  function dragFrame(_x, _y, dx, dy) {
    $$invalidate(0, node.x = node.x + dx / $scale.value, node);
    $$invalidate(0, node.y = node.y + dy / $scale.value, node);
    assertArenaBounds();
  }
  function onDragEnd() {
    $$invalidate(1, isDragging = false);
    $$invalidate(0, node.x = Math.round(node.x / grid) * grid, node);
    $$invalidate(0, node.y = Math.round(node.y / grid) * grid, node);
    $$invalidate(0, node.style.width = Math.round(node.style.width / grid) * grid, node);
    $$invalidate(0, node.style.height = Math.round(node.style.height / grid) * grid, node);
  }
  function assertArenaBounds() {
    if (node.x < 0) {
      $$invalidate(0, node.x = 0, node);
    }
    if (node.x + node.style.width >= arenaWidth) {
      $$invalidate(0, node.x -= node.x + node.style.width - arenaWidth, node);
    }
    if (node.y < 0) {
      $$invalidate(0, node.y = 0, node);
    }
    if (node.y + node.style.height >= arenaHeight) {
      $$invalidate(0, node.y -= node.y + node.style.height - arenaHeight, node);
    }
  }
  function handleUnselect() {
    $$invalidate(7, isFocused = false);
  }
  function handleFocus(e) {
    container.focus();
    set_store_value(selected, $selected = container, $selected);
    $$invalidate(7, isFocused = true);
  }
  function editabletext_value_binding(value) {
    if ($$self.$$.not_equal(node.name, value)) {
      node.name = value;
      $$invalidate(0, node);
    }
  }
  function switch_instance_props_binding(value) {
    if ($$self.$$.not_equal(node.props, value)) {
      node.props = value;
      $$invalidate(0, node);
    }
  }
  function container_1_node_binding(value, child, each_value_1, child_index) {
    each_value_1[child_index] = value;
    $$invalidate(0, node);
  }
  function container_1_isDragging_binding(value) {
    isDragging = value;
    $$invalidate(1, isDragging);
  }
  function contextmenu_node_binding(value) {
    node = value;
    $$invalidate(0, node);
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      container = $$value;
      $$invalidate(4, container);
    });
  }
  function div1_elementresize_handler() {
    clientWidth = this.clientWidth;
    clientHeight = this.clientHeight;
    $$invalidate(5, clientWidth);
    $$invalidate(6, clientHeight);
  }
  function resizehandle_x_binding(value) {
    if ($$self.$$.not_equal(node.x, value)) {
      node.x = value;
      $$invalidate(0, node);
    }
  }
  function resizehandle_y_binding(value) {
    if ($$self.$$.not_equal(node.y, value)) {
      node.y = value;
      $$invalidate(0, node);
    }
  }
  function resizehandle_width_binding(value) {
    if ($$self.$$.not_equal(node.style.width, value)) {
      node.style.width = value;
      $$invalidate(0, node);
    }
  }
  function resizehandle_height_binding(value) {
    if ($$self.$$.not_equal(node.style.height, value)) {
      node.style.height = value;
      $$invalidate(0, node);
    }
  }
  function resizehandle_isDragging_binding(value) {
    isDragging = value;
    $$invalidate(1, isDragging);
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(0, node = $$props2.node);
    if ("arenaHeight" in $$props2)
      $$invalidate(2, arenaHeight = $$props2.arenaHeight);
    if ("arenaWidth" in $$props2)
      $$invalidate(3, arenaWidth = $$props2.arenaWidth);
    if ("isDragging" in $$props2)
      $$invalidate(1, isDragging = $$props2.isDragging);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 12) {
      if (arenaWidth || arenaHeight)
        assertArenaBounds();
    }
    if ($$self.$$.dirty[0] & 1040) {
      if ($selected != container)
        handleUnselect();
    }
  };
  return [
    node,
    isDragging,
    arenaHeight,
    arenaWidth,
    container,
    clientWidth,
    clientHeight,
    isFocused,
    directions,
    handleUnselect,
    $selected,
    editabletext_value_binding,
    switch_instance_props_binding,
    container_1_node_binding,
    container_1_isDragging_binding,
    contextmenu_node_binding,
    div1_binding,
    div1_elementresize_handler,
    resizehandle_x_binding,
    resizehandle_y_binding,
    resizehandle_width_binding,
    resizehandle_height_binding,
    resizehandle_isDragging_binding
  ];
}
class Container extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      node: 0,
      arenaHeight: 2,
      arenaWidth: 3,
      isDragging: 1
    }, null, [-1, -1]);
  }
}
var Sketch_svelte_svelte_type_style_lang = "";
function create_if_block$2(ctx) {
  let div1;
  let menu;
  let updating_scale;
  let t;
  let div0;
  let container;
  let updating_node;
  let pzoom_action;
  let div1_resize_listener;
  let current;
  let mounted;
  let dispose;
  function menu_scale_binding(value) {
    ctx[8](value);
  }
  let menu_props = {};
  if (ctx[6].value !== void 0) {
    menu_props.scale = ctx[6].value;
  }
  menu = new Menu({ props: menu_props });
  binding_callbacks.push(() => bind(menu, "scale", menu_scale_binding));
  function container_node_binding(value) {
    ctx[9](value);
  }
  let container_props = {
    arenaWidth: ctx[3] * 100,
    arenaHeight: ctx[4] * 100
  };
  if (ctx[0] !== void 0) {
    container_props.node = ctx[0];
  }
  container = new Container({ props: container_props });
  binding_callbacks.push(() => bind(container, "node", container_node_binding));
  return {
    c() {
      div1 = element("div");
      create_component(menu.$$.fragment);
      t = space();
      div0 = element("div");
      create_component(container.$$.fragment);
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      claim_component(menu.$$.fragment, div1_nodes);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(container.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "zoomable flexbox svelte-1gksd2v");
      attr(div1, "class", "canvas svelte-1gksd2v");
      set_style(div1, "height", ctx[2] + "px");
      set_style(div1, "width", ctx[1] + "px");
      add_render_callback(() => ctx[11].call(div1));
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      mount_component(menu, div1, null);
      append_hydration(div1, t);
      append_hydration(div1, div0);
      mount_component(container, div0, null);
      ctx[10](div0);
      div1_resize_listener = add_resize_listener(div1, ctx[11].bind(div1));
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(pzoom_action = pzoom.call(null, div0)),
          listen(div0, "change", ctx[7])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const menu_changes = {};
      if (!updating_scale && dirty & 64) {
        updating_scale = true;
        menu_changes.scale = ctx2[6].value;
        add_flush_callback(() => updating_scale = false);
      }
      menu.$set(menu_changes);
      const container_changes = {};
      if (dirty & 8)
        container_changes.arenaWidth = ctx2[3] * 100;
      if (dirty & 16)
        container_changes.arenaHeight = ctx2[4] * 100;
      if (!updating_node && dirty & 1) {
        updating_node = true;
        container_changes.node = ctx2[0];
        add_flush_callback(() => updating_node = false);
      }
      container.$set(container_changes);
      if (!current || dirty & 4) {
        set_style(div1, "height", ctx2[2] + "px");
      }
      if (!current || dirty & 2) {
        set_style(div1, "width", ctx2[1] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(menu.$$.fragment, local);
      transition_in(container.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menu.$$.fragment, local);
      transition_out(container.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(menu);
      destroy_component(container);
      ctx[10](null);
      div1_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[6] && create_if_block$2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[6]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 64) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $scale;
  component_subscribe($$self, scale, ($$value) => $$invalidate(6, $scale = $$value));
  let { data } = $$props;
  let { width = 400 } = $$props;
  let { height = 600 } = $$props;
  let clientWidth, clientHeight;
  let zoomable;
  function handleChange(e) {
    let m;
    const re = /(\w+)\(([^)]*)\)/g;
    while (m = re.exec(zoomable.style.transform)) {
      if (m[1] == "scale" && parseFloat(m[2]).toFixed(2) != $scale.value.toFixed(2)) {
        set_store_value(scale, $scale.value = parseFloat(m[2]), $scale);
      }
    }
  }
  function menu_scale_binding(value) {
    if ($$self.$$.not_equal($scale.value, value)) {
      $scale.value = value;
      scale.set($scale);
    }
  }
  function container_node_binding(value) {
    data = value;
    $$invalidate(0, data);
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      zoomable = $$value;
      $$invalidate(5, zoomable);
    });
  }
  function div1_elementresize_handler() {
    clientWidth = this.clientWidth;
    clientHeight = this.clientHeight;
    $$invalidate(3, clientWidth);
    $$invalidate(4, clientHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("width" in $$props2)
      $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(2, height = $$props2.height);
  };
  return [
    data,
    width,
    height,
    clientWidth,
    clientHeight,
    zoomable,
    $scale,
    handleChange,
    menu_scale_binding,
    container_node_binding,
    div0_binding,
    div1_elementresize_handler
  ];
}
class Sketch extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { data: 0, width: 1, height: 2 });
  }
}
var App_svelte_svelte_type_style_lang = "";
const { window: window_1 } = globals;
function create_if_block$1(ctx) {
  let sketch;
  let updating_data;
  let current;
  function sketch_data_binding(value) {
    ctx[5](value);
  }
  let sketch_props = {
    width: ctx[0],
    height: ctx[1]
  };
  if (ctx[2] !== void 0) {
    sketch_props.data = ctx[2];
  }
  sketch = new Sketch({ props: sketch_props });
  binding_callbacks.push(() => bind(sketch, "data", sketch_data_binding));
  return {
    c() {
      create_component(sketch.$$.fragment);
    },
    l(nodes) {
      claim_component(sketch.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(sketch, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const sketch_changes = {};
      if (dirty & 1)
        sketch_changes.width = ctx2[0];
      if (dirty & 2)
        sketch_changes.height = ctx2[1];
      if (!updating_data && dirty & 4) {
        updating_data = true;
        sketch_changes.data = ctx2[2];
        add_flush_callback(() => updating_data = false);
      }
      sketch.$set(sketch_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sketch.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sketch.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sketch, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[3] && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "app svelte-16vwtwf");
      set_style(div, "--vh", ctx[3] + "px");
      set_style(div, "height", "calc(var(--vh, 1vh) * 100)");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = listen(window_1, "resize", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 8) {
        set_style(div, "--vh", ctx2[3] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let width;
  let height;
  function randomColor() {
    return Math.floor(Math.random() * 10 % colors.length);
  }
  let data = {
    name: "My Dashboard of Lists",
    id: safeid(),
    x: 20,
    y: 20,
    style: {
      backgroundColor: colors[randomColor()],
      width: 600,
      left: 20,
      top: 20,
      height: 800
    },
    children: [
      {
        name: "Child 1",
        id: safeid(),
        x: 60,
        y: 80,
        style: {
          backgroundColor: colors[randomColor()],
          width: 220,
          height: 520,
          left: 20,
          top: 20
        },
        props: [],
        children: [
          {
            name: "Child A",
            id: safeid(),
            x: 20,
            y: 80,
            style: {
              backgroundColor: colors[randomColor()],
              width: 120,
              height: 120,
              left: 20,
              top: 20
            },
            props: [],
            children: []
          }
        ]
      },
      {
        name: "Child 2",
        id: safeid(),
        x: 300,
        y: 80,
        style: {
          backgroundColor: colors[randomColor()],
          width: 100,
          height: 140,
          left: 20,
          top: 20
        },
        props: [],
        children: []
      },
      {
        name: "Child 3",
        id: safeid(),
        x: 420,
        y: 80,
        style: {
          backgroundColor: colors[randomColor()],
          width: 100,
          height: 160,
          left: 20,
          top: 20
        },
        props: [],
        children: []
      }
    ]
  };
  let vh;
  onMount(() => {
    handleViewportSize();
  });
  function handleViewportSize(_) {
    $$invalidate(3, vh = window.innerHeight * 0.01);
    $$invalidate(1, height = window.innerHeight);
    $$invalidate(0, width = document == null ? void 0 : document.body.clientWidth);
  }
  function sketch_data_binding(value) {
    data = value;
    $$invalidate(2, data);
  }
  return [width, height, data, vh, handleViewportSize, sketch_data_binding];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_if_block(ctx) {
  let app;
  let current;
  app = new App({});
  return {
    c() {
      create_component(app.$$.fragment);
    },
    l(nodes) {
      claim_component(app.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(app, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(app.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(app.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(app, detaching);
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] && create_if_block();
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let mounted;
  onMount(() => {
    $$invalidate(0, mounted = true);
  });
  return [mounted];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
//# sourceMappingURL=index.svelte-9d0192a9.js.map
