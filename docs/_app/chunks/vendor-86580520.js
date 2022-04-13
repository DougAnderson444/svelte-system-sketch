function noop$2() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop$2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$2;
}
let is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  let children2 = target.childNodes;
  if (target.nodeName === "HEAD") {
    const myChildren = [];
    for (let i = 0; i < children2.length; i++) {
      const node = children2[i];
      if (node.claim_order !== void 0) {
        myChildren.push(node);
      }
    }
    children2 = myChildren;
  }
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = (longest > 0 && children2[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children2[m[idx]].claim_order, current)) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  target.appendChild(node);
}
function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }
    if (node !== target.actual_end_child) {
      if (node.claim_order !== void 0 || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}
function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function init_claim_info(nodes) {
  if (nodes.claim_info === void 0) {
    nodes.claim_info = { last_index: 0, total_claimed: 0 };
  }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
  init_claim_info(nodes);
  const resultNode = (() => {
    for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        } else if (replacement === void 0) {
          nodes.claim_info.last_index--;
        }
        return node;
      }
    }
    return createNode();
  })();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, (node) => node.nodeName === name, (node) => {
    const remove = [];
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }
    remove.forEach((v) => node.removeAttribute(v));
    return void 0;
  }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}
function claim_text(nodes, data) {
  return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
    const dataStr = "" + data;
    if (node.data.startsWith(dataStr)) {
      if (node.data.length !== dataStr.length) {
        return node.splitText(dataStr.length);
      }
    } else {
      node.data = dataStr;
    }
  }, () => text(data), true);
}
function claim_space(nodes) {
  return claim_text(nodes, " ");
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow)
        fn();
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop$2,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop$2;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
const subscriber_queue = [];
function writable(value, start = noop$2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
var RangePips_svelte_svelte_type_style_lang = "";
var RangeSlider_svelte_svelte_type_style_lang = "";
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i = size;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
var global$1 = /* @__PURE__ */ Function("return this")();
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
function ValueIsNumber(Value) {
  return typeof Value === "number" || Value instanceof Number;
}
function ValueIsFiniteNumber(Value) {
  return (typeof Value === "number" || Value instanceof Number) && isFinite(Value.valueOf());
}
function ValueIsInteger(Value) {
  if (typeof Value !== "number" && !(Value instanceof Number)) {
    return false;
  }
  Value = Value.valueOf();
  return isFinite(Value) && Math.round(Value) === Value;
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
var expectInteger = /* @__PURE__ */ ValidatorForClassifier(ValueIsInteger, rejectNil, "integral numeric value");
function allowIntegerInRange(Description, Argument, minValue, maxValue) {
  return Argument == null ? Argument : expectedIntegerInRange(Description, Argument, minValue, maxValue);
}
var allowedIntegerInRange = allowIntegerInRange;
function expectIntegerInRange(Description, Argument, minValue, maxValue) {
  expectInteger(Description, Argument);
  if (isNaN(Argument)) {
    throwError("InvalidArgument: the given " + escaped(Description) + " is not-a-number");
  }
  if (minValue != null && isFinite(minValue)) {
    if (maxValue != null && isFinite(maxValue)) {
      if (Argument < minValue || Argument > maxValue) {
        throw new RangeError("the given " + escaped(Description) + " (" + Argument + ") is outside " + ("the allowed range (" + minValue + "..." + maxValue + ")"));
      }
    } else {
      if (Argument < minValue) {
        throw new RangeError("the given " + escaped(Description) + " is below the allowed " + ("minimum (" + Argument + " < " + minValue + ")"));
      }
    }
  } else {
    if (maxValue != null && isFinite(maxValue)) {
      if (Argument > maxValue) {
        throw new RangeError("the given " + escaped(Description) + " exceeds the allowed " + ("maximum (" + Argument + " > " + maxValue + ")"));
      }
    }
  }
  return Argument.valueOf();
}
var expectedIntegerInRange = expectIntegerInRange;
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
var Context = "__DragAndDropActions" in global$1 ? global$1.__DragAndDropActions : global$1.__DragAndDropActions = {};
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
function parsedDropZoneOptions(Options) {
  Options = allowedPlainObject("drop zone options", Options) || {};
  var Extras, TypesToAccept, HoldDelay;
  var Pannable;
  var PanSensorWidth, PanSensorHeight, PanSpeed;
  var onDroppableEnter, onDroppableMove, onDroppableLeave;
  var onDroppableHold, onDroppableRelease, onDrop;
  Extras = Options.Extras;
  allowPlainObject("data types to be accepted", Options.TypesToAccept);
  TypesToAccept = /* @__PURE__ */ Object.create(null);
  if (Options.TypesToAccept != null && "none" in Options.TypesToAccept)
    throwError('InvalidArgument: "none" is not a valid data type');
  for (var Type in Options.TypesToAccept) {
    if (Options.TypesToAccept.hasOwnProperty(Type)) {
      TypesToAccept[Type] = parsedOperations("list of accepted operations for type " + quoted(Type), Options.TypesToAccept[Type]);
    }
  }
  HoldDelay = allowedIntegerInRange("min. time to hold", Options.HoldDelay, 0);
  switch (true) {
    case Options.Pannable == null:
      Pannable = void 0;
      break;
    case Options.Pannable === "this":
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
  onDroppableEnter = allowedFunction('"onDroppableEnter" handler', Options.onDroppableEnter);
  onDroppableMove = allowedFunction('"onDroppableMove" handler', Options.onDroppableMove);
  onDroppableLeave = allowedFunction('"onDroppableLeave" handler', Options.onDroppableLeave);
  onDroppableHold = allowedFunction('"onDroppableHold" handler', Options.onDroppableHold);
  onDroppableRelease = allowedFunction('"onDroppableRelease" handler', Options.onDroppableRelease);
  onDrop = allowedFunction('"onDrop" handler', Options.onDrop);
  return {
    Extras,
    TypesToAccept,
    HoldDelay,
    Pannable,
    PanSensorWidth,
    PanSensorHeight,
    PanSpeed,
    onDroppableEnter,
    onDroppableMove,
    onDroppableLeave,
    onDroppableHold,
    onDroppableRelease,
    onDrop
  };
}
function asDropZone(Element2, Options) {
  var currentDropZoneOptions;
  currentDropZoneOptions = parsedDropZoneOptions(Options);
  function enteredByDroppable(originalEvent) {
    var Options2 = currentDropZoneOptions;
    performPanningFor("dropzone", Element2, Options2, originalEvent.pageX, originalEvent.pageY);
    var DropZonePosition = asPosition(svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, Element2));
    if (ValueIsNumber(Options2.HoldDelay) && Options2.HoldDelay > 0 && Context.HoldWasTriggeredForElement !== Element2) {
      startHoldTimer(DropZonePosition);
    }
    if (originalEvent.dataTransfer == null || originalEvent.dataTransfer.effectAllowed === "none") {
      return;
    }
    var wantedOperation = originalEvent.dataTransfer.dropEffect;
    if (wantedOperation === "none") {
      switch (originalEvent.dataTransfer.effectAllowed) {
        case "copy":
        case "move":
        case "link":
          wantedOperation = originalEvent.dataTransfer.effectAllowed;
          break;
        default:
          wantedOperation = void 0;
      }
    }
    var TypesToAccept = Options2.TypesToAccept;
    var offeredTypeList = originalEvent.dataTransfer.types.filter(function(Type) {
      return Type in TypesToAccept && TypesToAccept[Type] !== "";
    });
    if (offeredTypeList.length === 0) {
      return;
    }
    var accepted = ResultOfHandler("onDroppableEnter", Options2, DropZonePosition.x, DropZonePosition.y, wantedOperation, offeredTypeList, Context.currentDroppableExtras, Options2.Extras);
    if (accepted === false) {
      return;
    } else {
      Context.currentDropZoneExtras = Options2.Extras;
      Context.currentDropZoneElement = Element2;
      Context.currentDropZonePosition = DropZonePosition;
      Element2.classList.add("hovered");
      originalEvent.preventDefault();
      originalEvent.stopPropagation();
    }
  }
  function hoveredByDroppable(originalEvent) {
    var Options2 = currentDropZoneOptions;
    performPanningFor("dropzone", Element2, Options2, originalEvent.pageX, originalEvent.pageY);
    var DropZonePosition = asPosition(svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, Element2));
    if (ValueIsNumber(Options2.HoldDelay) && Options2.HoldDelay > 0 && Context.HoldWasTriggeredForElement !== Element2) {
      if (Context.HoldPosition == null) {
        startHoldTimer(DropZonePosition);
      } else {
        continueHoldTimer(DropZonePosition);
      }
    }
    if (originalEvent.dataTransfer == null || originalEvent.dataTransfer.effectAllowed === "none" || Context.currentDropZoneElement != null && Context.currentDropZoneElement !== Element2) {
      Element2.classList.remove("hovered");
      return;
    }
    var wantedOperation = originalEvent.dataTransfer.dropEffect;
    if (wantedOperation === "none") {
      switch (originalEvent.dataTransfer.effectAllowed) {
        case "copy":
        case "move":
        case "link":
          wantedOperation = originalEvent.dataTransfer.effectAllowed;
          break;
        default:
          wantedOperation = void 0;
      }
    }
    var TypesToAccept = Options2.TypesToAccept;
    var offeredTypeList = originalEvent.dataTransfer.types.filter(function(Type) {
      return Type in TypesToAccept && TypesToAccept[Type] !== "";
    });
    if (offeredTypeList.length === 0) {
      if (Context.currentDropZoneElement === Element2) {
        Context.currentDropZoneExtras = void 0;
        Context.currentDropZoneElement = void 0;
        Context.currentDropZonePosition = void 0;
      }
      Element2.classList.remove("hovered");
      return;
    }
    Context.currentDropZonePosition = DropZonePosition;
    var accepted = ResultOfHandler("onDroppableMove", Options2, Context.currentDropZonePosition.x, Context.currentDropZonePosition.y, wantedOperation, offeredTypeList, Context.currentDroppableExtras, Options2.Extras);
    if (accepted === false) {
      Context.currentDropZoneExtras = void 0;
      Context.currentDropZoneElement = void 0;
      Context.currentDropZonePosition = void 0;
      Element2.classList.remove("hovered");
    } else {
      Context.currentDropZoneExtras = Options2.Extras;
      Context.currentDropZoneElement = Element2;
      Element2.classList.add("hovered");
      originalEvent.preventDefault();
      return false;
    }
  }
  function leftByDroppable(originalEvent) {
    Element2.classList.remove("hovered");
    Context.DropZonePanning = false;
    stopHoldTimer();
    var Options2 = currentDropZoneOptions;
    if (Context.currentDropZoneElement === Element2) {
      if (Context.currentTypeTransferred == null) {
        Context.currentDropZoneExtras = void 0;
        Context.currentDropZoneElement = void 0;
        Context.DroppableWasDropped = false;
        Context.currentDropZonePosition = void 0;
        Context.currentTypeTransferred = void 0;
        Context.currentDataTransferred = void 0;
        invokeHandler("onDroppableLeave", Options2, Context.currentDroppableExtras, Options2.Extras);
      }
      originalEvent.preventDefault();
      originalEvent.stopPropagation();
    }
  }
  function droppedByDroppable(originalEvent) {
    Element2.classList.remove("hovered");
    Context.DropZonePanning = false;
    stopHoldTimer();
    if (originalEvent.dataTransfer == null || originalEvent.dataTransfer.effectAllowed === "none" || Context.currentDropZoneElement !== Element2) {
      return;
    }
    originalEvent.stopPropagation();
    var Options2 = currentDropZoneOptions;
    var wantedOperation = originalEvent.dataTransfer.dropEffect;
    if (wantedOperation === "none") {
      switch (originalEvent.dataTransfer.effectAllowed) {
        case "copy":
        case "move":
        case "link":
          wantedOperation = originalEvent.dataTransfer.effectAllowed;
          break;
        default:
          wantedOperation = void 0;
      }
    }
    var TypesToAccept = Options2.TypesToAccept;
    var offeredTypeList = originalEvent.dataTransfer.types.filter(function(Type) {
      return Type in TypesToAccept && (wantedOperation == null || TypesToAccept[Type].indexOf(wantedOperation) >= 0);
    });
    if (offeredTypeList.length === 0) {
      Context.currentDropZoneExtras = void 0;
      Context.currentDropZonePosition = void 0;
      Context.DroppableWasDropped = false;
      Context.currentDropOperation = void 0;
      Context.currentTypeTransferred = void 0;
      Context.currentDataTransferred = void 0;
      invokeHandler("onDroppableLeave", Options2, Context.currentDroppableExtras, Options2.Extras);
      return;
    }
    Context.currentDropZonePosition = asPosition(svelteCoordinateConversion.fromDocumentTo("local", { left: originalEvent.pageX, top: originalEvent.pageY }, Element2));
    var offeredData = {};
    offeredTypeList.forEach(function(Type) {
      return offeredData[Type] = originalEvent.dataTransfer.getData(Type);
    });
    var acceptedType = ResultOfHandler("onDrop", Options2, Context.currentDropZonePosition.x, Context.currentDropZonePosition.y, wantedOperation, offeredData, Context.currentDroppableExtras, Options2.Extras);
    switch (true) {
      case acceptedType == null:
        Context.DroppableWasDropped = true;
        Context.currentDropOperation = wantedOperation;
        Context.currentTypeTransferred = void 0;
        Context.currentDataTransferred = void 0;
        break;
      case ValueIsOneOf(acceptedType, offeredTypeList):
        Context.DroppableWasDropped = true;
        Context.currentDropOperation = wantedOperation;
        Context.currentTypeTransferred = acceptedType;
        Context.currentDataTransferred = offeredData[acceptedType];
        break;
      default:
        Context.DroppableWasDropped = false;
        Context.currentDropZoneExtras = void 0;
        Context.currentDropZonePosition = void 0;
        Context.currentDropOperation = void 0;
        Context.currentTypeTransferred = void 0;
        Context.currentDataTransferred = void 0;
    }
    Context.currentDropZoneElement = void 0;
  }
  function startHoldTimer(DropZonePosition) {
    Context.HoldPosition = DropZonePosition;
    if (Context.HoldTimer != null) {
      clearTimeout(Context.HoldTimer);
    }
    Context.HoldTimer = setTimeout(triggerHold, Options.HoldDelay);
  }
  function continueHoldTimer(DropZonePosition) {
    var Offset = Math.pow(Context.HoldPosition.x - DropZonePosition.x, 2) + Math.pow(Context.HoldPosition.y - DropZonePosition.y, 2);
    if (Offset > 25) {
      Context.HoldPosition = DropZonePosition;
      clearTimeout(Context.HoldTimer);
      Context.HoldTimer = setTimeout(triggerHold, Options.HoldDelay);
    }
  }
  function stopHoldTimer() {
    delete Context.HoldPosition;
    if (Context.HoldTimer != null) {
      clearTimeout(Context.HoldTimer);
      delete Context.HoldTimer;
    }
    delete Context.HoldWasTriggeredForElement;
  }
  function triggerHold() {
    var DropZonePosition = Context.currentDropZonePosition || Context.HoldPosition;
    delete Context.HoldPosition;
    delete Context.HoldTimer;
    Context.HoldWasTriggeredForElement = Element2;
    invokeHandler("onDroppableHold", Options, DropZonePosition.x, DropZonePosition.y, Context.currentDroppableExtras, Options.Extras);
  }
  function updateDropZoneOptions(Options2) {
    Options2 = parsedDropZoneOptions(Options2);
    if (currentDropZoneOptions.Extras == null && Options2.Extras != null) {
      currentDropZoneOptions.Extras = Options2.Extras;
    }
    currentDropZoneOptions.TypesToAccept = Options2.TypesToAccept;
    currentDropZoneOptions.HoldDelay = Options2.HoldDelay;
    currentDropZoneOptions.Pannable = Options2.Pannable;
    currentDropZoneOptions.PanSensorWidth = Options2.PanSensorWidth;
    currentDropZoneOptions.PanSensorHeight = Options2.PanSensorHeight;
    currentDropZoneOptions.PanSpeed = Options2.PanSpeed;
  }
  Element2.setAttribute("draggable", "true");
  Element2.addEventListener("dragenter", enteredByDroppable);
  Element2.addEventListener("dragover", hoveredByDroppable);
  Element2.addEventListener("dragleave", leftByDroppable);
  Element2.addEventListener("drop", droppedByDroppable);
  return { update: updateDropZoneOptions };
}
function ValueIsPosition(Candidate) {
  return ValueIsPlainObject(Candidate) && ValueIsFiniteNumber(Candidate.x) && ValueIsFiniteNumber(Candidate.y);
}
function asPosition(Value) {
  return { x: Value.left, y: Value.top };
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
var ResultOfHandler = invokeHandler;
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
  constructor(_element, { start = () => true, move = noop$1, end = noop$1, rawUpdates = false, avoidPointerEvents = false } = {}) {
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
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.addEventListener("pointerup", this._pointerEnd);
        this._element.addEventListener("pointercancel", this._pointerEnd);
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
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart);
      this._element.addEventListener("touchstart", this._touchStart);
      this._element.addEventListener("touchmove", this._move);
      this._element.addEventListener("touchend", this._touchEnd);
      this._element.addEventListener("touchcancel", this._touchEnd);
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
export { PointerTracker$1 as PointerTracker, PointerTracker as PointerTracker$1, SvelteComponent, action_destroyer, add_flush_callback, add_render_callback, add_resize_listener, afterUpdate, append_hydration, asDropZone, asDroppable, assign, attr, bind, binding_callbacks, check_outros, children, claim_component, claim_element, claim_space, claim_text, component_subscribe, createEventDispatcher, create_component, create_slot, customAlphabet, destroy_component, destroy_each, detach, element, empty, get_all_dirty_from_scope, get_slot_changes, get_spread_object, get_spread_update, globals, group_outros, init, insert_hydration, is_function, listen, mount_component, noop$2 as noop, null_to_empty, onMount, run_all, safe_not_equal, setContext, set_data, set_store_value, set_style, space, stop_propagation, text, tick, transition_in, transition_out, update_slot_base, writable };
//# sourceMappingURL=vendor-86580520.js.map
