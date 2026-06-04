// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"8m8ip":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "14cadd503cc0253d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"ktMgX":[function(require,module,exports,__globalThis) {
// Detect the user's preferred color scheme, set the theme accordingly, and store the users preference.
class ThemeComponent {
    // Private class fields to store references to the relevant DOM elements and theme values.
    #preferDarkScheme = /** @type {MediaQueryList}*/ globalThis.matchMedia('(prefers-color-scheme: dark)');
    #themeToggleSelector = /**@type {string} */ '.toggle-theme';
    #btn = /** @type {HTMLButtonElement } */ document.querySelector(this.#themeToggleSelector);
    #htmlRootElement = /**@type {HTMLElement} */ document.documentElement;
    #darkTheme = /**@type {string} */ 'dark';
    #lightTheme = /**@type {string} */ 'light';
    #prefsKey = /**@type {string} */ 'devfinder-prefs';
    constructor(){
        this.#btn?.addEventListener('click', this.#toggleTheme.bind(this));
    }
    /**
   * Toggle the theme between light and dark mode, and store the users preference in localStorage.
   * @param {Event} evtObj - The click event object passed from the toggle button listener.
   * @returns {void} - Returns nothing.
   */ #toggleTheme(evtObj) {
        const targetEl = this.#getThemeToggleElement(evtObj.target);
        if (!targetEl) return;
        const nextTheme = this.#getNextTheme(this.#htmlRootElement.dataset.theme);
        this.#htmlRootElement.dataset.theme = nextTheme;
        this.#saveThemePreference(nextTheme);
    }
    /**
   * Find the theme toggle element from the event target.
   * @param {EventTarget | null} target - The original event target.
   * @returns {Element | null} - The toggle element, or null when the target is outside the toggle.
   */ #getThemeToggleElement(target) {
        if (!(target instanceof Element)) return null;
        return target.closest(this.#themeToggleSelector);
    }
    /**
   * Get the next theme value based on the current page theme and system preference.
   * @param {string | undefined} currentTheme - The current theme stored on the root element.
   * @returns {string} - The next theme to apply.
   */ #getNextTheme(currentTheme) {
        if (this.#preferDarkScheme.matches) return currentTheme === this.#darkTheme ? this.#lightTheme : this.#darkTheme;
        return currentTheme === this.#lightTheme ? this.#darkTheme : this.#lightTheme;
    }
    /**
   * Save the selected theme in localStorage.
   * @param {string} theme - The selected theme.
   * @returns {void} - Returns nothing.
   */ #saveThemePreference(theme) {
        localStorage.setItem(this.#prefsKey, JSON.stringify({
            theme
        }));
    }
}
/* Steps and Features to implement */ // 1. When the user clicks search or uses the enter key on the keyboard we want to check and see if the user has entered a value in the search input field. If they have not then we want to display a message saying "Enter GitHub username"
// Create a component called 'SearchComponent'
class SearchComponent {
    // Private class fields to store references to the relevant DOM elements and theme values.
    /** @type {UIComponent} */ #ui;
    #form = /**@type {HTMLFormElement} */ document.getElementById('searchForm');
    #search = /**@type {HTMLInputElement}*/ document.getElementById('username');
    #errorMessage = /**@type {HTMLSpanElement} */ document.getElementById('search-error');
    /**
   * Create a search component and connect it to the UI renderer
   * @param {UIComponent} ui - The UI component used to render the app content.
   */ constructor(ui){
        this.#ui = ui; // new UIComponent()
        this.#form.addEventListener('submit', this.#isUsernameEntered.bind(this));
    }
    /**
   * Check if the user has entered a username in the input field. If not then show the error message
   * @param {Event} evtObj - The click event object passed from the submit eventListener
   */ #isUsernameEntered(evtObj) {
        evtObj.preventDefault();
        if (this.#search.validity.valueMissing || this.#search.value.trim() === '') // Here we want to display a message saying "Enter GitHub username"
        this.#showErrorMessage(this.#errorMessage, 'Enter a GitHub username');
        else {
            // Here we want to remove the message saying "Enter GitHub username"
            this.#removeErrorMessage(this.#errorMessage, '');
            // Then we want to make make the fetch request based on the query that the user has passed in
            const query = this.#search.value.trim();
            this.#fetchGitHubUser(query);
        }
    }
    /**
   *  Fetch a GitHub user by username from the GitHub REST API. `fetch()` only rejects on network errors; HTTP 404 still resolves. This function explicitly treats HTTP 404 as an error by throwing.
   * @param {string} query - The GitHub username to look query and look up
   * @returns {Promise<void | object>} - A Promise object that resolves with the parsed JSON user object or rejects if the response status is '404'
   * @throws {Error} Rejects the returned Promise when the user is not found (404).
   */ #fetchGitHubUser(query) {
        this.#ui.render(this.#getSkeletonUI());
        const url = `https://api.github.com/users/${query}`;
        return fetch(url).then(function(response) {
            const HTTP_ERROR_NOT_FOUND = 404;
            if (response.status === HTTP_ERROR_NOT_FOUND) throw new Error(`No results`);
            return response.json();
        }).then((data)=>{
            this.#ui.render(this.#getUserProfileUI(data));
            // After rendering the users details then we want to animate the users followers, following and repos count from 0 to the actual value.
            this.#ui.countStats(data.public_repos, data.followers, data.following);
        }).catch((error)=>{
            if (error.message === 'No results') {
                this.#showErrorMessage(this.#errorMessage, error.message);
                this.#ui.render(this.#getNoResultsUI());
            } else this.#showErrorMessage(this.#errorMessage, 'No connection');
        });
    }
    /**
   * This method checks if the company value is a URL or not, and returns the appropriate HTML string to be rendered on the UI.
   * @param {string | null } company - The company value from the GitHub user data, which can be a string or null.
   * @returns {string} - The HTML string to be rendered for the company information on the user profile.
   */ #checkIfCompanyIsUrl(company) {
        if (!company) return `<span class="fade_not-available">Not available</span>`;
        else if (company.startsWith('@')) {
            const INDEX_ONE = /**@type {number} */ 1;
            const companyUsername = company.slice(INDEX_ONE);
            return `<a href="https://github.com/${companyUsername}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${company}</span></a>`;
        } else return `<p class="company-content"><span>${company}</span></p>`;
    }
    /**
   * This method gets the JavaScript value(an object) produced by parsing the JSON from the HTTP response body
   * @param {{public_repos: number, followers: number, following: number, avatar_url: string, bio: string | null, location: string | null, twitter_username: string | null, blog: string | null, created_at: string, login: string, name: string | null, company: string | null}} data - The produced JavaScript value parsed from the HTTP response body
   * @returns {string} -  The HTL structure of the User Profile as a string
   */ #getUserProfileUI(data) {
        const displayName = data.name ?? data.login;
        const ZERO = /**@type {number} */ 0;
        const joinedDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            timeZone: 'UTC',
            year: 'numeric'
        }).format(new Date(data.created_at));
        const userProfileUI = `
    <!-- User Profile UI -->
      <div class="app-profile">
        <div class="app-profile__information">
          <div class="app-profile__information__wrapper">
            <div class="app-profile__information-img">
              <img
                src="${data.avatar_url}"
                alt="${displayName}'s avatar"
                class="app-profile__img-placeholder"
              />
            </div>
            <section
              class="app-profile__information-header"
              aria-labelledby="profile-heading"
            >
              <h1 id="profile-heading" class="sr-only">Profile</h1>
              <!-- name, username, join date -->
              <div class="user-profile">
                ${data.name ? `<p class="user-profile__name">${data.name}</p>` : `<span class="fade_not-available">Name not available</span>`}
                <p class="user-profile__username">@${data.login}</p>
              </div>
              <p class="join-date">Joined ${joinedDate}</p>
            </section>
          </div>
          <section
            class="app-profile__information-bio"
            aria-labelledby="bio-heading"
          >
            <h2 id="bio-heading" class="sr-only">Bio</h2>
            ${data.bio ? `<p class="bio-content">${data.bio}</p>` : `<span class="fade_not-available">This profile has no bio</span>`}
          </section>

          <section
            class="app-profile__information-stats"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" class="sr-only">Stats</h2>
            <!-- repos, followers, following -->
            <ul class="user-stats">
              <li class="user-stats__repos">
                <p>
                  <span>Repos</span>
                  <span>${ZERO}</span>
                </p>
              </li>
              <li class="user-stats__followers">
                <p>
                  <span>Followers</span>
                  <span>${ZERO}</span>
                </p>
              </li>
              <li class="user-stats__following">
                <p>
                  <span>Following</span>
                  <span>${ZERO}</span>
                </p>
              </li>
            </ul>
          </section>
          <section
            class="app-profile__information-links"
            aria-labelledby="links-heading"
          >
            <h2 id="links-heading" class="sr-only">Links</h2>
            <!-- location, website, twitter, company -->
            <ul class="user-links">
              <li class="user-links__location">
                <img
                  class="${data.location ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("ccd61b436081403e"))}"
                  width="14"
                  height="20"
                />
                <img
                  class="${data.location ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="20"
                  src= "${new URL(require("fcd8816812236609"))}"
                />
                ${data.location ? `<p class="location-content">${data.location}</p>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__social-media">
                <img
                  class="${data.twitter_username ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("c17788165455cc79"))}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.twitter_username ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("52bc0b501a90d053"))}"
                  width="20"
                  height="20"
                />
                ${data.twitter_username ? `<a href="https://x.com/${data.twitter_username}" class="link-content" target="_blank" rel="noopener noreferrer"><span>@${data.twitter_username}</span></a>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__portfolio">
                <img
                  class="${data.blog ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("4d3826476d85d3ad"))}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.blog ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("443922e6e1c50676"))}"
                  width="20"
                  height="20"
                />
                ${data.blog ? `<a href="${data.blog}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${data.blog}</span></a>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__company">
                <img
                  class="${data.company ? 'available' : 'fade_not-available'}"
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("1933881ee8c44520"))}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.company ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(require("98d452f3902dc014"))}"
                  width="20"
                  height="20"
                />
                ${this.#checkIfCompanyIsUrl(data.company)}
              </li>
            </ul>
          </section>
        </div>
      </div>
    `;
        return userProfileUI;
    }
    /**
   * This method simply returns the No results UI stored in a variable
   * @returns {string} - The HTML structure of the No results UI as a string
   */ #getNoResultsUI() {
        const noResultsUI = `
    <!-- The No results found HTML structure -->
      <div class="app-no-profile-found">
        <section
          class="app-no-result-found"
          aria-labelledby="no-github-user-found"
        >
          <h1 id="no-github-user-found" class="sr-only">
            We've found no github user
          </h1>
          <p class="app-no-profile-found__summary">No results found!</p>
          <p class="app-no-profile-found__text">
            We couldn\u{2019}t find any GitHub users matching your search. Please
            double-check the username and try again.
          </p>
        </section>
      </div>
    `;
        return noResultsUI;
    }
    // UI for the loaded content from the value of the fulfilled promise
    /**
   * This method simply returns the skeleton UI stored in the variable
   * @returns {string} - The HTML structure of the skeleton loader UI as a string.
   */ #getSkeletonUI() {
        const skeletonUI = `
    <!-- The Skeleton Loader UI -->
      <div class="app-skeleton-body">
        <div class="app-skeleton-profile-section">
          <div class="app-skeleton-profile-section__user-profile">
            <div class ="app-skeleton-avatar">
              <div
                class="app-skeleton animate shimmer"
              ></div>
            </div>
            <div class="app-skeleton_username-name-joindate__wrapper">
              <div class="app-skeleton__username-name">
                <div
                  class="app-skeleton animate shimmer app-skeleton-line__name w-name"
                ></div>
                <div
                  class="app-skeleton animate shimmer app-skeleton-line w-username"
                ></div>
              </div>
              <div
                class="app-skeleton animate shimmer app-skeleton-line w-joindate"
              ></div>
            </div>
          </div>
          <div class="app-skeleton-profile-section__bio">
            <div class="app-skeleton animate shimmer app-skeleton-line"></div>
          </div>
          <div class="app-skeleton-profile-section__stats">
            <div
              class="app-skeleton animate shimmer app-skeleton-line__stats"
            ></div>
          </div>
          <div class="app-skeleton-profile-section__links">
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
          </div>
        </div>
      </div>
    `;
        return skeletonUI;
    }
    // Create a method that returns the HTML strings
    /**
   * Show the error message to the user
   * @param {HTMLSpanElement} message - The span element that would be used to show the error message to the user.
   * @param {string} content - The content that would be seen on the screen
   * @returns {void}
   */ #removeErrorMessage(message, content) {
        message.setAttribute('aria-hidden', 'true');
        message.textContent = content;
    }
    /**
   * Show the error message to the user
   * @param {HTMLSpanElement} message - The span element that would be used to show the error message to the user.
   * @param {string} content - The content that would be seen on the screen
   * @returns {void}
   */ #showErrorMessage(message, content) {
        message.setAttribute('aria-hidden', 'false');
        message.textContent = content;
    }
}
class UIComponent {
    app = /**@type {HTMLElement} */ document.querySelector('.app');
    /**
   * The constructor function simply clear the current UI and then updates it will render a new UI and needed on demand.
   * @param {string} renderedUI - The HTMLElement structure to be rendered
   */ render(renderedUI) {
        this.#clearUI();
        this.app.innerHTML = renderedUI;
    }
    /**
   * The method is used to count the followers, following and repos count from 0 to the actual value after the users details have been rendered on the UI.
   * @param {number} currentRepoStat - The current repos count value to be animated to on the UI
   * @param {number} currentFollowersStat - The current followers value to be animated to on the UI
   * @param {number} currentFollowingStat - The current following value to be animated to on the UI
   * @returns {void}
   */ countStats(currentRepoStat, currentFollowersStat, currentFollowingStat) {
        const interval = /**@type {number} */ 4000; // 4seconds
        const UPDATE_HOURS_BY = /**@type {number} */ 1;
        const loadedUserStats = /**@type {number[]} */ [
            currentRepoStat,
            currentFollowersStat,
            currentFollowingStat
        ];
        const statsElements = /** @type {NodeList} */ this.app.querySelectorAll('li[class^="user-stats__"] > p > span:last-child');
        const arrayOfStatsElements = Array.from(statsElements);
        arrayOfStatsElements.forEach((statElement, statElementIndex)=>{
            // Hold to we will for sure come back to this);
            let startStat = 0;
            const endStat = loadedUserStats[statElementIndex];
            const duration = Math.floor(interval / endStat);
            console.log(startStat, interval, UPDATE_HOURS_BY, endStat);
            const counter = setInterval(()=>{
                startStat += UPDATE_HOURS_BY;
                statElement.textContent = `${startStat}`;
                if (startStat === endStat) clearInterval(counter);
                if (startStat > endStat) {
                    startStat -= UPDATE_HOURS_BY;
                    if (startStat === endStat) {
                        statElement.textContent = `${startStat}`;
                        clearInterval(counter);
                    }
                }
            }, duration);
        });
    }
    #clearUI() {
        this.app.innerHTML = ``;
    }
}
/**
 * This function initializes the entire devfinder application
 * @param {ThemeComponent} themeComponent - The theme component instantiation
 * @param {SearchComponent} searchComponent - The search component instantiation
 * @returns {Array<ThemeComponent|SearchComponent>}  - The array of Components
 */ function devfinderOnIt(themeComponent, searchComponent) {
    const arrayOfComponents = [
        themeComponent,
        searchComponent
    ];
    return arrayOfComponents;
}
devfinderOnIt(new ThemeComponent(), new SearchComponent(new UIComponent()));

},{"ccd61b436081403e":"84w89","fcd8816812236609":"iNwQ7","c17788165455cc79":"eBHMO","52bc0b501a90d053":"lyk4S","4d3826476d85d3ad":"aWJA2","443922e6e1c50676":"dWDzq","1933881ee8c44520":"c52YT","98d452f3902dc014":"8nYaU"}],"84w89":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-location-dark.2f81633f.svg") + "?" + Date.now();

},{}],"iNwQ7":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-location-light.acad493b.svg") + "?" + Date.now();

},{}],"eBHMO":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-x-dark.446b3eca.svg") + "?" + Date.now();

},{}],"lyk4S":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-x-light.f26d515d.svg") + "?" + Date.now();

},{}],"aWJA2":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-website-dark.035b6591.svg") + "?" + Date.now();

},{}],"dWDzq":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-website-light.4dec2696.svg") + "?" + Date.now();

},{}],"c52YT":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-company-dark.ebe95dbf.svg") + "?" + Date.now();

},{}],"8nYaU":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icon-company-light.d2a66f83.svg") + "?" + Date.now();

},{}]},["8m8ip","ktMgX"], "ktMgX", "parcelRequire2f59", {}, "./", "/")

//# sourceMappingURL=github-user-search-app.3cc0253d.js.map
