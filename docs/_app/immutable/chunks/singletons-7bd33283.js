import { writable } from "./index-e8f50377.js";
let base = "";
let assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
let version = "";
function set_version(value) {
  version = value;
}
function get_base_uri(doc) {
  let baseURI = doc.baseURI;
  if (!baseURI) {
    const baseTags = doc.getElementsByTagName("base");
    baseURI = baseTags.length ? baseTags[0].href : doc.URL;
  }
  return baseURI;
}
function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}
function find_anchor(event) {
  let a;
  let noscroll = null;
  let prefetch = null;
  let reload = null;
  for (const element of event.composedPath()) {
    if (!(element instanceof Element))
      continue;
    if (!a && element.nodeName.toUpperCase() === "A") {
      a = element;
    }
    if (noscroll === null)
      noscroll = get_link_option(element, "data-sveltekit-noscroll");
    if (prefetch === null)
      prefetch = get_link_option(element, "data-sveltekit-prefetch");
    if (reload === null)
      reload = get_link_option(element, "data-sveltekit-reload");
  }
  const url = a && new URL(a instanceof SVGAElement ? a.href.baseVal : a.href, document.baseURI);
  return {
    a,
    url,
    options: {
      noscroll,
      prefetch,
      reload
    },
    has: a ? {
      rel_external: (a.getAttribute("rel") || "").split(/\s+/).includes("external"),
      download: a.hasAttribute("download"),
      target: !!(a instanceof SVGAElement ? a.target.baseVal : a.target)
    } : {}
  };
}
function get_link_option(element, attribute) {
  const value = element.getAttribute(attribute);
  if (value === null)
    return value;
  if (value === "")
    return true;
  if (value === "off")
    return false;
  return false;
}
function notifiable_store(value) {
  const store = writable(value);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }
  return { notify, set, subscribe };
}
function create_updated_store() {
  const { set, subscribe } = writable(false);
  let timeout;
  async function check() {
    clearTimeout(timeout);
    const res = await fetch(`${assets}/${"_app/version.json"}`, {
      headers: {
        pragma: "no-cache",
        "cache-control": "no-cache"
      }
    });
    if (res.ok) {
      const data = await res.json();
      const updated = data.version !== version;
      if (updated) {
        set(true);
        clearTimeout(timeout);
      }
      return updated;
    } else {
      throw new Error(`Version check failed: ${res.status}`);
    }
  }
  return {
    subscribe,
    check
  };
}
function init(opts) {
  opts.client;
}
const stores = {
  url: notifiable_store({}),
  page: notifiable_store({}),
  navigating: writable(null),
  updated: create_updated_store()
};
export {
  find_anchor,
  get_base_uri,
  init,
  scroll_state,
  set_paths,
  set_version,
  stores
};
//# sourceMappingURL=singletons-7bd33283.js.map
