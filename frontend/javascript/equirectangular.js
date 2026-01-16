// This code implements the `-sMODULARIZE` settings by taking the generated
// JS program code (INNER_JS_CODE) and wrapping it in a factory function.

// Single threaded MINIMAL_RUNTIME programs do not need access to
// document.currentScript, so a simple export declaration is enough.
var createModule = (() => {
  // When MODULARIZE this JS may be executed later,
  // after document.currentScript is gone, so we save it.
  // In EXPORT_ES6 mode we can just use 'import.meta.url'.
  var _scriptName = globalThis.document?.currentScript?.src;
  return async function(moduleArg = {}) {
    var moduleRtn;

(function() {
  function a(c) {
    c = c.split("-")[0];
    for (c = c.split(".").slice(0, 3); 3 > c.length;) {
      c.push("00");
    }
    c = c.map(d => d.padStart(2, "0"));
    return c.join("");
  }
  var b = "undefined" !== typeof process && process.Qb?.node ? a(process.Qb.node) : 2147483647;
  if (2147483647 > b) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  if (2147483647 > b) {
    throw Error(`This emscripten-generated code requires node v${"214748.36.47"} (detected v${[b / 10000 | 0, (b / 100 | 0) % 100, b % 100].join(".")})`);
  }
  b = "undefined" !== typeof navigator && navigator.userAgent?.includes("Safari/") && navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? a(navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : 2147483647;
  if (150000 > b) {
    throw Error(`This emscripten-generated code requires Safari v${"15.0.0"} (detected v${b})`);
  }
  b = "undefined" !== typeof navigator && navigator.userAgent?.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : 2147483647;
  if (79 > b) {
    throw Error(`This emscripten-generated code requires Firefox v79 (detected v${b})`);
  }
  b = "undefined" !== typeof navigator && navigator.userAgent?.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : 2147483647;
  if (85 > b) {
    throw Error(`This emscripten-generated code requires Chrome v85 (detected v${b})`);
  }
})();
var m = moduleArg, aa = "./this.program", ba = "", ca;
try {
  ba = (new URL(".", _scriptName)).href;
} catch {
}
if (!globalThis.window && !globalThis.WorkerGlobalScope) {
  throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
}
ca = async a => {
  n(!da(a), "readAsync does not work with file:// URLs");
  a = await fetch(a, {credentials:"same-origin"});
  if (a.ok) {
    return a.arrayBuffer();
  }
  throw Error(a.status + " : " + a.url);
};
var ea = console.log.bind(console), p = console.error.bind(console);
n(!0, "worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.");
n(!0, "node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.");
n(!0, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var fa;
globalThis.WebAssembly || p("no native wasm support detected");
var ha = !1, ia;
function n(a, b) {
  a || r("Assertion failed" + (b ? ": " + b : ""));
}
var da = a => a.startsWith("file://");
function ja() {
  var a = la();
  n(0 == (a & 3));
  0 == a && (a += 4);
  u[a >> 2] = 34821223;
  u[a + 4 >> 2] = 2310721022;
  u[0] = 1668509029;
}
function ma() {
  if (!ha) {
    var a = la();
    0 == a && (a += 4);
    var b = u[a >> 2], c = u[a + 4 >> 2];
    34821223 == b && 2310721022 == c || r(`Stack overflow! Stack cookie has been overwritten at ${na(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${na(c)} ${na(b)}`);
    1668509029 != u[0] && r("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var oa = new Int16Array(1), pa = new Int8Array(oa.buffer);
oa[0] = 25459;
115 === pa[0] && 99 === pa[1] || r("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
function qa(a) {
  Object.getOwnPropertyDescriptor(m, a) || Object.defineProperty(m, a, {configurable:!0, set() {
    r(`Attempt to set \`Module.${a}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function w(a) {
  return () => n(!1, `call to '${a}' via reference taken before Wasm module initialization`);
}
function ra(a) {
  Object.getOwnPropertyDescriptor(m, a) || Object.defineProperty(m, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    "FS_createPath" !== a && "FS_createDataFile" !== a && "FS_createPreloadedFile" !== a && "FS_preloadFile" !== a && "FS_unlink" !== a && "addRunDependency" !== a && "FS_createLazyFile" !== a && "FS_createDevice" !== a && "removeRunDependency" !== a || (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    r(b);
  }});
}
var sa, ta, y, z, A, ua, D, u, va, wa, xa, ya, za = !1;
function Aa() {
  var a = Ba.buffer;
  y = new Int8Array(a);
  A = new Int16Array(a);
  m.HEAPU8 = z = new Uint8Array(a);
  ua = new Uint16Array(a);
  D = new Int32Array(a);
  u = new Uint32Array(a);
  va = new Float32Array(a);
  wa = new Float64Array(a);
  xa = new BigInt64Array(a);
  ya = new BigUint64Array(a);
}
n(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set, "JS engine does not provide full typed array support");
function r(a) {
  m.onAbort?.(a);
  a = "Aborted(" + a + ")";
  p(a);
  ha = !0;
  a = new WebAssembly.RuntimeError(a);
  ta?.(a);
  throw a;
}
function Ca(a, b) {
  return (...c) => {
    n(za, `native function \`${a}\` called before runtime initialization`);
    var d = Da[a];
    n(d, `exported native function \`${a}\` not found`);
    n(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var Ea;
async function Fa(a) {
  if (!fa) {
    try {
      var b = await ca(a);
      return new Uint8Array(b);
    } catch {
    }
  }
  if (a == Ea && fa) {
    a = new Uint8Array(fa);
  } else {
    throw "both async and sync fetching of the wasm failed";
  }
  return a;
}
async function Ga(a, b) {
  try {
    var c = await Fa(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    p(`failed to asynchronously prepare wasm: ${d}`), da(a) && p(`warning: Loading from a file URI (${a}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), r(d);
  }
}
async function Ha(a) {
  var b = Ea;
  if (!fa) {
    try {
      var c = fetch(b, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      p(`wasm streaming compile failed: ${d}`), p("falling back to ArrayBuffer instantiation");
    }
  }
  return Ga(b, a);
}
class Ia {
  name="ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Ja = a => {
  for (; 0 < a.length;) {
    a.shift()(m);
  }
}, Ka = [], La = [], Ma = () => {
  var a = m.preRun.shift();
  La.push(a);
}, Na = !0, na = a => {
  n("number" === typeof a, `ptrToString expects a number, got ${typeof a}`);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, Oa = a => {
  Oa.Ma || (Oa.Ma = {});
  Oa.Ma[a] || (Oa.Ma[a] = 1, p(a));
};
class Pa {
  constructor(a) {
    this.i = a - 24;
  }
}
var Qa = 0, E = () => {
  n(void 0 != Ra);
  var a = D[+Ra >> 2];
  Ra += 4;
  return a;
}, Sa = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, Ta = a => {
  var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
  (a = Sa(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Ua = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.slice(0, -1);
  return a + b;
}, Va = a => a && a.match(/([^\/]+|\/)\/*$/)[1], Wa = () => a => crypto.getRandomValues(a), Xa = a => {
  (Xa = Wa())(a);
}, Ya = (...a) => {
  for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
    c = 0 <= d ? a[d] : "/";
    if ("string" != typeof c) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!c) {
      return "";
    }
    b = c + "/" + b;
    c = "/" === c.charAt(0);
  }
  b = Sa(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, Za = globalThis.TextDecoder && new TextDecoder(), $a = (a, b, c, d) => {
  c = b + c;
  if (d) {
    return c;
  }
  for (; a[b] && !(b >= c);) {
    ++b;
  }
  return b;
}, ab = (a, b = 0, c, d) => {
  c = $a(a, b, c, d);
  if (16 < c - b && a.buffer && Za) {
    return Za.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && Oa("Invalid UTF-8 leading byte " + na(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, bb = [], cb = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, db = (a, b, c, d) => {
  n("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.codePointAt(f);
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else if (2047 >= g) {
      if (c + 1 >= d) {
        break;
      }
      b[c++] = 192 | g >> 6;
      b[c++] = 128 | g & 63;
    } else if (65535 >= g) {
      if (c + 2 >= d) {
        break;
      }
      b[c++] = 224 | g >> 12;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
    } else {
      if (c + 3 >= d) {
        break;
      }
      1114111 < g && Oa("Invalid Unicode code point " + na(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      b[c++] = 240 | g >> 18;
      b[c++] = 128 | g >> 12 & 63;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
      f++;
    }
  }
  b[c] = 0;
  return c - e;
}, eb = a => {
  var b = Array(cb(a) + 1);
  a = db(a, b, 0, b.length);
  b.length = a;
  return b;
}, fb = [];
function gb(a, b) {
  fb[a] = {input:[], output:[], P:b};
  hb(a, ib);
}
var ib = {open(a) {
  var b = fb[a.node.la];
  if (!b) {
    throw new G(43);
  }
  a.o = b;
  a.seekable = !1;
}, close(a) {
  a.o.P.sa(a.o);
}, sa(a) {
  a.o.P.sa(a.o);
}, read(a, b, c, d) {
  if (!a.o || !a.o.P.Ua) {
    throw new G(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.o.P.Ua(a.o);
    } catch (h) {
      throw new G(29);
    }
    if (void 0 === g && 0 === e) {
      throw new G(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.X = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.o || !a.o.P.Ka) {
    throw new G(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.o.P.Ka(a.o, b[c + e]);
    }
  } catch (f) {
    throw new G(29);
  }
  d && (a.node.K = a.node.D = Date.now());
  return e;
}}, jb = {Ua() {
  a: {
    if (!bb.length) {
      var a = null;
      globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
      if (!a) {
        a = null;
        break a;
      }
      bb = eb(a);
    }
    a = bb.shift();
  }
  return a;
}, Ka(a, b) {
  null === b || 10 === b ? (ea(ab(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, sa(a) {
  0 < a.output?.length && (ea(ab(a.output)), a.output = []);
}, xb() {
  return {Ub:25856, Wb:5, Tb:191, Vb:35387, Sb:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, yb() {
  return 0;
}, zb() {
  return [24, 80];
}}, kb = {Ka(a, b) {
  null === b || 10 === b ? (p(ab(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, sa(a) {
  0 < a.output?.length && (p(ab(a.output)), a.output = []);
}}, lb = () => {
  r("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}, J = {M:null, O() {
  return J.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new G(63);
  }
  J.M || (J.M = {dir:{node:{U:J.l.U, N:J.l.N, ha:J.l.ha, ya:J.l.ya, fb:J.l.fb, Ba:J.l.Ba, gb:J.l.gb, La:J.l.La, za:J.l.za}, stream:{L:J.j.L}}, file:{node:{U:J.l.U, N:J.l.N}, stream:{L:J.j.L, read:J.j.read, write:J.j.write, Ja:J.j.Ja, ab:J.j.ab}}, link:{node:{U:J.l.U, N:J.l.N, ma:J.l.ma}, stream:{}}, Pa:{node:{U:J.l.U, N:J.l.N}, stream:mb}});
  c = nb(a, b, c, d);
  K(c.mode) ? (c.l = J.M.dir.node, c.j = J.M.dir.stream, c.h = {}) : 32768 === (c.mode & 61440) ? (c.l = J.M.file.node, c.j = J.M.file.stream, c.u = 0, c.h = null) : 40960 === (c.mode & 61440) ? (c.l = J.M.link.node, c.j = J.M.link.stream) : 8192 === (c.mode & 61440) && (c.l = J.M.Pa.node, c.j = J.M.Pa.stream);
  c.X = c.K = c.D = Date.now();
  a && (a.h[b] = c, a.X = a.K = a.D = c.X);
  return c;
}, cc(a) {
  return a.h ? a.h.subarray ? a.h.subarray(0, a.u) : new Uint8Array(a.h) : new Uint8Array(0);
}, l:{U(a) {
  var b = {};
  b.Xb = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ec = a.id;
  b.mode = a.mode;
  b.jc = 1;
  b.uid = 0;
  b.dc = 0;
  b.la = a.la;
  K(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.u : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.X = new Date(a.X);
  b.K = new Date(a.K);
  b.D = new Date(a.D);
  b.mb = 4096;
  b.Rb = Math.ceil(b.size / b.mb);
  return b;
}, N(a, b) {
  for (var c of ["mode", "atime", "mtime", "ctime"]) {
    null != b[c] && (a[c] = b[c]);
  }
  void 0 !== b.size && (b = b.size, a.u != b && (0 == b ? (a.h = null, a.u = 0) : (c = a.h, a.h = new Uint8Array(b), c && a.h.set(c.subarray(0, Math.min(b, a.u))), a.u = b)));
}, ha() {
  throw new G(44);
}, ya(a, b, c, d) {
  return J.createNode(a, b, c, d);
}, fb(a, b, c) {
  try {
    var d = ob(b, c);
  } catch (f) {
  }
  if (d) {
    if (K(a.mode)) {
      for (var e in d.h) {
        throw new G(55);
      }
    }
    pb(d);
  }
  delete a.parent.h[a.name];
  b.h[c] = a;
  a.name = c;
  b.D = b.K = a.parent.D = a.parent.K = Date.now();
}, Ba(a, b) {
  delete a.h[b];
  a.D = a.K = Date.now();
}, gb(a, b) {
  var c = ob(a, b), d;
  for (d in c.h) {
    throw new G(55);
  }
  delete a.h[b];
  a.D = a.K = Date.now();
}, La(a) {
  return [".", "..", ...Object.keys(a.h)];
}, za(a, b, c) {
  a = J.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, ma(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new G(28);
  }
  return a.link;
}}, j:{read(a, b, c, d, e) {
  var f = a.node.h;
  if (e >= a.node.u) {
    return 0;
  }
  a = Math.min(a.node.u - e, d);
  n(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  n(!(b instanceof ArrayBuffer));
  b.buffer === y.buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.K = a.D = Date.now();
  if (b.subarray && (!a.h || a.h.subarray)) {
    if (f) {
      return n(0 === e, "canOwn must imply no weird position inside the file"), a.h = b.subarray(c, c + d), a.u = d;
    }
    if (0 === a.u && 0 === e) {
      return a.h = b.slice(c, c + d), a.u = d;
    }
    if (e + d <= a.u) {
      return a.h.set(b.subarray(c, c + d), e), d;
    }
  }
  f = e + d;
  var g = a.h ? a.h.length : 0;
  g >= f || (f = Math.max(f, g * (1048576 > g ? 2.0 : 1.125) >>> 0), 0 != g && (f = Math.max(f, 256)), g = a.h, a.h = new Uint8Array(f), 0 < a.u && a.h.set(g.subarray(0, a.u), 0));
  if (a.h.subarray && b.subarray) {
    a.h.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.h[e + f] = b[c + f];
    }
  }
  a.u = Math.max(a.u, e + d);
  return d;
}, L(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.u);
  if (0 > b) {
    throw new G(28);
  }
  return b;
}, Ja(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new G(43);
  }
  a = a.node.h;
  if (e & 2 || !a || a.buffer !== y.buffer) {
    d = !0;
    e = lb();
    if (!e) {
      throw new G(48);
    }
    if (a) {
      if (0 < c || c + b < a.length) {
        a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
      }
      y.set(a, e);
    }
  } else {
    d = !1, e = a.byteOffset;
  }
  return {i:e, lb:d};
}, ab(a, b, c, d) {
  J.j.write(a, b, 0, d, c, !1);
  return 0;
}}}, qb = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, L = (a, b, c) => {
  n("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? ab(z, a, b, c) : "";
}, rb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, sb = async a => {
  var b = await ca(a);
  n(b, `Loading data file "${a}" failed (no arrayBuffer).`);
  return new Uint8Array(b);
}, tb = 0, ub = null, vb = {}, wb = null, xb = a => {
  tb--;
  m.monitorRunDependencies?.(tb);
  n(a, "removeRunDependency requires an ID");
  n(vb[a]);
  delete vb[a];
  0 == tb && (null !== wb && (clearInterval(wb), wb = null), ub && (a = ub, ub = null, a()));
}, yb = a => {
  tb++;
  m.monitorRunDependencies?.(tb);
  n(a, "addRunDependency requires an ID");
  n(!vb[a]);
  vb[a] = 1;
  null === wb && globalThis.setInterval && (wb = setInterval(() => {
    if (ha) {
      clearInterval(wb), wb = null;
    } else {
      var b = !1, c;
      for (c in vb) {
        b || (b = !0, p("still waiting on run dependencies:")), p(`dependency: ${c}`);
      }
      b && p("(end of list)");
    }
  }, 10000));
}, zb = [], Ab = async(a, b) => {
  if ("undefined" != typeof Browser) {
    var c = Browser;
    u[c.i + 16 >> 2] = 0;
    u[c.i + 4 >> 2] = void 0;
    u[c.i + 8 >> 2] = void 0;
  }
  for (var d of zb) {
    if (d.canHandle(b)) {
      return n("AsyncFunction" === d.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), d.handle(a, b);
    }
  }
  return a;
}, Bb = null, Cb = {}, Db = [], Eb = 1, Fb = null, Gb = !1, Hb = !0, Ib = {}, G = class extends Error {
  name="ErrnoError";
  constructor(a) {
    super(za ? L(Jb(a)) : "");
    this.J = a;
    for (var b in rb) {
      if (rb[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, Kb = class {
  F={};
  node=null;
  get object() {
    return this.node;
  }
  set object(a) {
    this.node = a;
  }
  get flags() {
    return this.F.flags;
  }
  set flags(a) {
    this.F.flags = a;
  }
  get position() {
    return this.F.position;
  }
  set position(a) {
    this.F.position = a;
  }
}, Lb = class {
  l={};
  j={};
  ja=null;
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.O = a.O;
    this.id = Eb++;
    this.name = b;
    this.mode = c;
    this.la = d;
    this.X = this.K = this.D = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }
  get Bb() {
    return K(this.mode);
  }
  get Ab() {
    return 8192 === (this.mode & 61440);
  }
};
function M(a, b = {}) {
  if (!a) {
    throw new G(44);
  }
  b.Da ?? (b.Da = !0);
  "/" === a.charAt(0) || (a = "//" + a);
  var c = 0;
  a: for (; 40 > c; c++) {
    a = a.split("/").filter(h => !!h);
    for (var d = Bb, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) {
        break;
      }
      if ("." !== a[f]) {
        if (".." === a[f]) {
          if (e = Ua(e), d === d.parent) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else {
            d = d.parent;
          }
        } else {
          e = Ta(e + "/" + a[f]);
          try {
            d = ob(d, a[f]);
          } catch (h) {
            if (44 === h?.J && g && b.Fb) {
              return {path:e};
            }
            throw h;
          }
          !d.ja || g && !b.Da || (d = d.ja.root);
          if (40960 === (d.mode & 61440) && (!g || b.ga)) {
            if (!d.l.ma) {
              throw new G(52);
            }
            d = d.l.ma(d);
            "/" === d.charAt(0) || (d = Ua(e) + "/" + d);
            a = d + "/" + a.slice(f + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:e, node:d};
  }
  throw new G(32);
}
function Mb(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.O.$a, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Nb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Fb.length;
}
function pb(a) {
  var b = Nb(a.parent.id, a.name);
  if (Fb[b] === a) {
    Fb[b] = a.$;
  } else {
    for (b = Fb[b]; b;) {
      if (b.$ === a) {
        b.$ = a.$;
        break;
      }
      b = b.$;
    }
  }
}
function ob(a, b) {
  var c = K(a.mode) ? (c = Ob(a, "x")) ? c : a.l.ha ? 0 : 2 : 54;
  if (c) {
    throw new G(c);
  }
  for (c = Fb[Nb(a.id, b)]; c; c = c.$) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.l.ha(a, b);
}
function nb(a, b, c, d) {
  n("object" == typeof a);
  a = new Lb(a, b, c, d);
  b = Nb(a.parent.id, a.name);
  a.$ = Fb[b];
  return Fb[b] = a;
}
function K(a) {
  return 16384 === (a & 61440);
}
function Pb(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Ob(a, b) {
  if (Hb) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function Qb(a, b) {
  if (!K(a.mode)) {
    return 54;
  }
  try {
    return ob(a, b), 20;
  } catch (c) {
  }
  return Ob(a, "wx");
}
function Rb(a) {
  a = Db[a];
  if (!a) {
    throw new G(8);
  }
  return a;
}
function Sb(a, b = -1) {
  n(-1 <= b);
  a = Object.assign(new Kb(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!Db[b]) {
          break a;
        }
      }
      throw new G(33);
    }
  }
  a.A = b;
  return Db[b] = a;
}
function Tb(a, b = -1) {
  a = Sb(a, b);
  a.j?.$b?.(a);
  return a;
}
function Ub(a, b) {
  var c = null?.j.N, d = c ? null : a;
  c ??= a.l.N;
  if (!c) {
    throw new G(63);
  }
  c(d, b);
}
var mb = {open(a) {
  a.j = Cb[a.node.la].j;
  a.j.open?.(a);
}, L() {
  throw new G(70);
}};
function hb(a, b) {
  Cb[a] = {j:b};
}
function Vb(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Bb) {
    throw new G(10);
  }
  if (!c && !d) {
    var e = M(b, {Da:!1});
    b = e.path;
    e = e.node;
    if (e.ja) {
      throw new G(10);
    }
    if (!K(e.mode)) {
      throw new G(54);
    }
  }
  b = {type:a, kc:{}, $a:b, Eb:[]};
  a = a.O(b);
  a.O = b;
  b.root = a;
  c ? Bb = a : e && (e.ja = b, e.O && e.O.Eb.push(b));
}
function Wb(a, b, c) {
  var d = M(a, {parent:!0}).node;
  a = Va(a);
  if (!a) {
    throw new G(28);
  }
  if ("." === a || ".." === a) {
    throw new G(20);
  }
  var e = Qb(d, a);
  if (e) {
    throw new G(e);
  }
  if (!d.l.ya) {
    throw new G(63);
  }
  return d.l.ya(d, a, b, c);
}
function Xb(a, b = 438) {
  return Wb(a, b & 4095 | 32768, 0);
}
function N(a) {
  return Wb(a, 16895, 0);
}
function Yb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  return Wb(a, b | 8192, c);
}
function Zb(a, b) {
  if (!Ya(a)) {
    throw new G(44);
  }
  var c = M(b, {parent:!0}).node;
  if (!c) {
    throw new G(44);
  }
  b = Va(b);
  var d = Qb(c, b);
  if (d) {
    throw new G(d);
  }
  if (!c.l.za) {
    throw new G(63);
  }
  c.l.za(c, b, a);
}
function $b(a) {
  var b = M(a, {parent:!0}).node;
  if (!b) {
    throw new G(44);
  }
  a = Va(a);
  var c = ob(b, a);
  a: {
    try {
      var d = ob(b, a);
    } catch (f) {
      d = f.J;
      break a;
    }
    var e = Ob(b, "wx");
    d = e ? e : K(d.mode) ? 31 : 0;
  }
  if (d) {
    throw new G(d);
  }
  if (!b.l.Ba) {
    throw new G(63);
  }
  if (c.ja) {
    throw new G(10);
  }
  b.l.Ba(b, a);
  pb(c);
}
function ac(a, b) {
  a = "string" == typeof a ? M(a, {ga:!0}).node : a;
  Ub(a, {mode:b & 4095 | a.mode & -4096, D:Date.now(), Zb:void 0});
}
function bc(a, b, c = 438) {
  if ("" === a) {
    throw new G(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? c & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    d = a;
  } else {
    var e = a.endsWith("/");
    a = M(a, {ga:!(b & 131072), Fb:!0});
    d = a.node;
    a = a.path;
  }
  var f = !1;
  if (b & 64) {
    if (d) {
      if (b & 128) {
        throw new G(20);
      }
    } else {
      if (e) {
        throw new G(31);
      }
      d = Wb(a, c | 511, 0);
      f = !0;
    }
  }
  if (!d) {
    throw new G(44);
  }
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && !K(d.mode)) {
    throw new G(54);
  }
  if (!f && (e = d ? 40960 === (d.mode & 61440) ? 32 : K(d.mode) && ("r" !== Pb(b) || b & 576) ? 31 : Ob(d, Pb(b)) : 44)) {
    throw new G(e);
  }
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? M(e, {ga:!0}).node : e;
    if (K(e.mode)) {
      throw new G(31);
    }
    if (32768 !== (e.mode & 61440)) {
      throw new G(28);
    }
    var g = Ob(e, "w");
    if (g) {
      throw new G(g);
    }
    Ub(e, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Sb({node:d, path:Mb(d), flags:b, seekable:!0, position:0, j:d.j, Pb:[], error:!1});
  e.j.open && e.j.open(e);
  f && ac(d, c & 511);
  !m.logReadFiles || b & 1 || a in Ib || (Ib[a] = 1);
  return e;
}
function cc(a) {
  if (null === a.A) {
    throw new G(8);
  }
  a.Ea && (a.Ea = null);
  try {
    a.j.close && a.j.close(a);
  } catch (b) {
    throw b;
  } finally {
    Db[a.A] = null;
  }
  a.A = null;
}
function dc(a, b, c) {
  if (null === a.A) {
    throw new G(8);
  }
  if (!a.seekable || !a.j.L) {
    throw new G(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new G(28);
  }
  a.position = a.j.L(a, b, c);
  a.Pb = [];
}
function ec(a, b, c, d, e, f) {
  n(0 <= c);
  if (0 > d || 0 > e) {
    throw new G(28);
  }
  if (null === a.A) {
    throw new G(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new G(8);
  }
  if (K(a.node.mode)) {
    throw new G(31);
  }
  if (!a.j.write) {
    throw new G(28);
  }
  a.seekable && a.flags & 1024 && dc(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new G(70);
  }
  b = a.j.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}
function fc(a) {
  try {
    var b = M(a, {ga:!0});
    a = b.path;
  } catch (d) {
  }
  var c = {Cb:!1, qb:!1, error:0, name:null, path:null, object:null, Gb:!1, Ib:null, Hb:null};
  try {
    b = M(a, {parent:!0}), c.Gb = !0, c.Ib = b.path, c.Hb = b.node, c.name = Va(a), b = M(a, {ga:!0}), c.qb = !0, c.path = b.path, c.object = b.node, c.name = b.node.name, c.Cb = "/" === b.path;
  } catch (d) {
    c.error = d.J;
  }
  return c;
}
function gc(a, b) {
  a = "string" == typeof a ? a : Mb(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      var d = Ta(a + "/" + c);
      try {
        N(d);
      } catch (e) {
        if (20 != e.J) {
          throw e;
        }
      }
      a = d;
    }
  }
  return d;
}
function hc(a, b, c, d) {
  a = Ta(("string" == typeof a ? a : Mb(a)) + "/" + b);
  return Xb(a, qb(c, d));
}
function ic(a, b, c, d, e, f) {
  var g = b;
  a && (a = "string" == typeof a ? a : Mb(a), g = b ? Ta(a + "/" + b) : a);
  a = qb(d, e);
  g = Xb(g, a);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) {
        b[d] = c.charCodeAt(d);
      }
      c = b;
    }
    ac(g, a | 146);
    b = bc(g, 577);
    ec(b, c, 0, c.length, 0, f);
    cc(b);
    ac(g, a);
  }
}
function P(a, b, c, d) {
  a = Ta(("string" == typeof a ? a : Mb(a)) + "/" + b);
  b = qb(!!c, !!d);
  P.Za ?? (P.Za = 64);
  var e = P.Za++ << 8 | 0;
  hb(e, {open(f) {
    f.seekable = !1;
  }, close() {
    d?.buffer?.length && d(10);
  }, read(f, g, h, l) {
    for (var q = 0, k = 0; k < l; k++) {
      try {
        var t = c();
      } catch (v) {
        throw new G(29);
      }
      if (void 0 === t && 0 === q) {
        throw new G(6);
      }
      if (null === t || void 0 === t) {
        break;
      }
      q++;
      g[h + k] = t;
    }
    q && (f.node.X = Date.now());
    return q;
  }, write(f, g, h, l) {
    for (var q = 0; q < l; q++) {
      try {
        d(g[h + q]);
      } catch (k) {
        throw new G(29);
      }
    }
    l && (f.node.K = f.node.D = Date.now());
    return q;
  }});
  return Yb(a, b, e);
}
function jc(a) {
  if (!(a.Ab || a.Bb || a.link || a.h)) {
    if (globalThis.XMLHttpRequest) {
      r("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      try {
        a.h = (void 0)(a.url);
      } catch (b) {
        throw new G(29);
      }
    }
  }
}
function kc(a, b, c, d, e) {
  function f(k, t, v, B, x) {
    k = k.node.h;
    if (x >= k.length) {
      return 0;
    }
    B = Math.min(k.length - x, B);
    n(0 <= B);
    if (k.slice) {
      for (var C = 0; C < B; C++) {
        t[v + C] = k[x + C];
      }
    } else {
      for (C = 0; C < B; C++) {
        t[v + C] = k.get(x + C);
      }
    }
    return B;
  }
  class g {
    Ga=!1;
    F=[];
    Fa=void 0;
    Xa=0;
    Wa=0;
    get(k) {
      if (!(k > this.length - 1 || 0 > k)) {
        var t = k % this.cb;
        return this.Fa(k / this.cb | 0)[t];
      }
    }
    Nb(k) {
      this.Fa = k;
    }
    Ya() {
      var k = new XMLHttpRequest();
      k.open("HEAD", c, !1);
      k.send(null);
      200 <= k.status && 300 > k.status || 304 === k.status || r("Couldn't load " + c + ". Status: " + k.status);
      var t = Number(k.getResponseHeader("Content-length")), v, B = (v = k.getResponseHeader("Accept-Ranges")) && "bytes" === v;
      k = (v = k.getResponseHeader("Content-Encoding")) && "gzip" === v;
      var x = 1048576;
      B || (x = t);
      var C = this;
      C.Nb(H => {
        var O = H * x, F = (H + 1) * x - 1;
        F = Math.min(F, t - 1);
        if ("undefined" == typeof C.F[H]) {
          var ka = C.F;
          O > F && r("invalid range (" + O + ", " + F + ") or no bytes requested!");
          F > t - 1 && r("only " + t + " bytes available! programmer error!");
          var I = new XMLHttpRequest();
          I.open("GET", c, !1);
          t !== x && I.setRequestHeader("Range", "bytes=" + O + "-" + F);
          I.responseType = "arraybuffer";
          I.overrideMimeType && I.overrideMimeType("text/plain; charset=x-user-defined");
          I.send(null);
          200 <= I.status && 300 > I.status || 304 === I.status || r("Couldn't load " + c + ". Status: " + I.status);
          O = void 0 !== I.response ? new Uint8Array(I.response || []) : eb(I.responseText || "");
          ka[H] = O;
        }
        "undefined" == typeof C.F[H] && r("doXHR failed!");
        return C.F[H];
      });
      if (k || !t) {
        x = t = 1, x = t = this.Fa(0).length, ea("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.Xa = t;
      this.Wa = x;
      this.Ga = !0;
    }
    get length() {
      this.Ga || this.Ya();
      return this.Xa;
    }
    get cb() {
      this.Ga || this.Ya();
      return this.Wa;
    }
  }
  if (globalThis.XMLHttpRequest) {
    r("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
    var h = new g();
    var l = void 0;
  } else {
    l = c, h = void 0;
  }
  var q = hc(a, b, d, e);
  h ? q.h = h : l && (q.h = null, q.url = l);
  Object.defineProperties(q, {u:{get:function() {
    return this.h.length;
  }}});
  a = {};
  for (const [k, t] of Object.entries(q.j)) {
    a[k] = (...v) => {
      jc(q);
      return t(...v);
    };
  }
  a.read = (k, t, v, B, x) => {
    jc(q);
    return f(k, t, v, B, x);
  };
  a.Ja = (k, t, v) => {
    jc(q);
    var B = lb();
    if (!B) {
      throw new G(48);
    }
    f(k, y, B, t, v);
    return {i:B, lb:!0};
  };
  q.j = a;
  return q;
}
var lc = {}, Ra = void 0, Q = a => {
  for (var b = "";;) {
    var c = z[a++];
    if (!c) {
      return b;
    }
    b += String.fromCharCode(c);
  }
}, mc = {}, nc = {}, oc = {}, R = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
}, pc = a => {
  throw new R(a);
};
function qc(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new R(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (nc.hasOwnProperty(a)) {
    if (c.ub) {
      return;
    }
    throw new R(`Cannot register type '${d}' twice`);
  }
  nc[a] = b;
  delete oc[a];
  mc.hasOwnProperty(a) && (b = mc[a], delete mc[a], b.forEach(e => e()));
}
function S(a, b, c = {}) {
  return qc(a, b, c);
}
var rc = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => y[d] : d => z[d];
    case 2:
      return c ? d => A[d >> 1] : d => ua[d >> 1];
    case 4:
      return c ? d => D[d >> 2] : d => u[d >> 2];
    case 8:
      return c ? d => xa[d >> 3] : d => ya[d >> 3];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, sc = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, tc = (a, b, c, d) => {
  if (b < c || b > d) {
    throw new TypeError(`Passing a number "${sc(b)}" from JS side to C/C++ side to an argument of type "${a}", which is outside the valid range [${c}, ${d}]!`);
  }
}, uc = a => {
  throw new R(a.g.s.m.name + " instance already deleted");
}, vc = !1, wc = () => {
}, xc = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.C) {
    return null;
  }
  a = xc(a, b, c.C);
  return null === a ? null : c.pb(a);
}, yc = {}, zc = {}, Ac = (a, b) => {
  if (void 0 === b) {
    throw new R("ptr should not be undefined");
  }
  for (; a.C;) {
    b = a.pa(b), a = a.C;
  }
  return zc[b];
}, Bc = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
}, Dc = (a, b) => {
  if (!b.s || !b.i) {
    throw new Bc("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.G !== !!b.v) {
    throw new Bc("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return Cc(Object.create(a, {g:{value:b, writable:!0}}));
};
function Ec(a) {
  function b() {
    return this.ua ? Dc(this.m.Z, {s:this.Jb, i:c, G:this, v:a}) : Dc(this.m.Z, {s:this, i:a});
  }
  var c = this.tb(a);
  if (!c) {
    return this.Ra(a), null;
  }
  var d = Ac(this.m, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.i = c, d.g.v = a, d.clone();
    }
    d = d.clone();
    this.Ra(a);
    return d;
  }
  d = this.m.sb(c);
  d = yc[d];
  if (!d) {
    return b.call(this);
  }
  d = this.ta ? d.nb : d.pointerType;
  var e = xc(c, this.m, d.m);
  return null === e ? b.call(this) : this.ua ? Dc(d.m.Z, {s:d, i:e, G:this, v:a}) : Dc(d.m.Z, {s:d, i:e});
}
var Cc = a => {
  if (!globalThis.FinalizationRegistry) {
    return Cc = b => b, a;
  }
  vc = new FinalizationRegistry(b => {
    console.warn(b.Db);
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.v ? b.G.V(b.v) : b.s.m.V(b.i));
  });
  Cc = b => {
    var c = b.g;
    if (c.v) {
      var d = {g:c};
      c = Error(`Embind found a leaked C++ instance ${c.s.m.name} <${na(c.i)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(c, Ec);
      d.Db = c.stack.replace(/^Error: /, "");
      vc.register(b, d, b);
    }
    return b;
  };
  wc = b => {
    vc.unregister(b);
  };
  return Cc(a);
}, Fc = [];
function Gc() {
}
var Hc = (a, b) => Object.defineProperty(b, "name", {value:a}), Ic = (a, b, c) => {
  if (void 0 === a[b].R) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].R.hasOwnProperty(e.length)) {
        throw new R(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].R})!`);
      }
      return a[b].R[e.length].apply(this, e);
    };
    a[b].R = [];
    a[b].R[d.ca] = d;
  }
}, Jc = (a, b) => {
  if (m.hasOwnProperty(a)) {
    throw new R(`Cannot register public name '${a}' twice`);
  }
  m[a] = b;
  m[a].ca = void 0;
}, Kc = a => {
  n("string" === typeof a);
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function Lc(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.constructor = b;
  this.Z = c;
  this.V = d;
  this.C = e;
  this.sb = f;
  this.pa = g;
  this.pb = h;
  this.Kb = [];
}
var Mc = (a, b, c) => {
  for (; b !== c;) {
    if (!b.pa) {
      throw new R(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.pa(a);
    b = b.C;
  }
  return a;
};
function Nc(a, b) {
  if (null === b) {
    if (this.Ha) {
      throw new R(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new R(`Cannot pass "${sc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Mc(b.g.i, b.g.s.m, this.m);
}
function Oc(a, b) {
  if (null === b) {
    if (this.Ha) {
      throw new R(`null is not a valid ${this.name}`);
    }
    if (this.ua) {
      var c = this.Lb();
      null !== a && a.push(this.V, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new R(`Cannot pass "${sc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.ta && b.g.s.ta) {
    throw new R(`Cannot convert argument of type ${b.g.G ? b.g.G.name : b.g.s.name} to parameter type ${this.name}`);
  }
  c = Mc(b.g.i, b.g.s.m, this.m);
  if (this.ua) {
    if (void 0 === b.g.v) {
      throw new R("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.Ob) {
      case 0:
        if (b.g.G === this) {
          c = b.g.v;
        } else {
          throw new R(`Cannot convert argument of type ${b.g.G ? b.g.G.name : b.g.s.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        c = b.g.v;
        break;
      case 2:
        if (b.g.G === this) {
          c = b.g.v;
        } else {
          var d = b.clone();
          c = this.Mb(c, Pc(() => d["delete"]()));
          null !== a && a.push(this.V, c);
        }
        break;
      default:
        throw new R("Unsupporting sharing policy");
    }
  }
  return c;
}
function Qc(a, b) {
  if (null === b) {
    if (this.Ha) {
      throw new R(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new R(`Cannot pass "${sc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.s.ta) {
    throw new R(`Cannot convert argument of type ${b.g.s.name} to parameter type ${this.name}`);
  }
  return Mc(b.g.i, b.g.s.m, this.m);
}
function Rc(a) {
  return this.B(u[a >> 2]);
}
function Sc(a, b, c, d, e, f, g, h, l, q, k) {
  this.name = a;
  this.m = b;
  this.Ha = c;
  this.ta = d;
  this.ua = e;
  this.Jb = f;
  this.Ob = g;
  this.eb = h;
  this.Lb = l;
  this.Mb = q;
  this.V = k;
  e || void 0 !== b.C ? this.H = Oc : (this.H = d ? Nc : Qc, this.I = null);
}
var Tc = (a, b) => {
  if (!m.hasOwnProperty(a)) {
    throw new Bc("Replacing nonexistent public symbol");
  }
  m[a] = b;
  m[a].ca = void 0;
}, Uc = [], Wc = (a, b, c = !1) => {
  n(!c, "Async bindings are only supported with JSPI.");
  a = Q(a);
  (c = Uc[b]) || (Uc[b] = c = Vc.get(b));
  n(Vc.get(b) == c, "JavaScript-side Wasm function table mirror is out of date!");
  if ("function" != typeof c) {
    throw new R(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
};
class Xc extends Error {
}
var $c = a => {
  a = Yc(a);
  var b = Q(a);
  Zc(a);
  return b;
}, ad = (a, b) => {
  function c(f) {
    e[f] || nc[f] || (oc[f] ? oc[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Xc(`${a}: ` + d.map($c).join([", "]));
}, bd = (a, b, c) => {
  function d(h) {
    h = c(h);
    if (h.length !== a.length) {
      throw new Bc("Mismatched type converter count");
    }
    for (var l = 0; l < a.length; ++l) {
      S(a[l], h[l]);
    }
  }
  a.forEach(h => oc[h] = b);
  var e = Array(b.length), f = [], g = 0;
  for (let [h, l] of b.entries()) {
    nc.hasOwnProperty(l) ? e[h] = nc[l] : (f.push(l), mc.hasOwnProperty(l) || (mc[l] = []), mc[l].push(() => {
      e[h] = nc[l];
      ++g;
      g === f.length && d(e);
    }));
  }
  0 === f.length && d(e);
}, cd = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(u[b + 4 * d >> 2]);
  }
  return c;
}, dd = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function fd(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].I) {
      return !0;
    }
  }
  return !1;
}
function gd(a, b, c, d, e) {
  (a < b || a > c) && e(`function ${d} called with ${a} arguments, expected ${b == c ? b : `${b} to ${c}`}`);
}
function hd(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new R("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  n(!f, "Async bindings are only supported with JSPI.");
  var h = null !== b[1] && null !== c, l = fd(b);
  c = !b[0].Va;
  var q = g - 2;
  var k = b.length - 2;
  for (var t = b.length - 1; 2 <= t && b[t].optional; --t) {
    k--;
  }
  t = b[0];
  var v = b[1];
  d = [a, pc, d, e, dd, t.B.bind(t), v?.H.bind(v)];
  for (e = 2; e < g; ++e) {
    t = b[e], d.push(t.H.bind(t));
  }
  if (!l) {
    for (e = h ? 1 : 2; e < b.length; ++e) {
      null !== b[e].I && d.push(b[e].I);
    }
  }
  d.push(gd, k, q);
  l = fd(b);
  q = b.length - 2;
  k = [];
  e = ["fn"];
  h && e.push("thisWired");
  for (g = 0; g < q; ++g) {
    k.push(`arg${g}`), e.push(`arg${g}Wired`);
  }
  k = k.join(",");
  e = e.join(",");
  k = `return function (${k}) {\n` + "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  l && (k += "var destructors = [];\n");
  v = l ? "destructors" : "null";
  t = "humanName throwBindingError invoker fn runDestructors fromRetWire toClassParamWire".split(" ");
  h && (k += `var thisWired = toClassParamWire(${v}, this);\n`);
  for (g = 0; g < q; ++g) {
    var B = `toArg${g}Wire`;
    k += `var arg${g}Wired = ${B}(${v}, arg${g});\n`;
    t.push(B);
  }
  k += (c || f ? "var rv = " : "") + `invoker(${e});\n`;
  if (l) {
    k += "runDestructors(destructors);\n";
  } else {
    for (g = h ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].I && (k += `${f}_dtor(${f});\n`, t.push(`${f}_dtor`));
    }
  }
  c && (k += "var ret = fromRetWire(rv);\nreturn ret;\n");
  k += "}\n";
  t.push("checkArgCount", "minArgs", "maxArgs");
  k = `if (arguments.length !== ${t.length}){ throw new Error(humanName + "Expected ${t.length} closure arguments " + arguments.length + " given."); }\n${k}`;
  b = (new Function(t, k))(...d);
  return Hc(a, b);
}
var jd = a => {
  a = a.trim();
  const b = a.indexOf("(");
  if (-1 === b) {
    return a;
  }
  n(a.endsWith(")"), "Parentheses for argument names should match.");
  return a.slice(0, b);
}, kd = [], T = [0, 1, , 1, null, 1, !0, 1, !1, 1], ld = a => {
  9 < a && 0 === --T[a + 1] && (n(void 0 !== T[a], "Decref for unallocated handle."), T[a] = void 0, kd.push(a));
}, md = a => {
  if (!a) {
    throw new R(`Cannot use deleted val. handle = ${a}`);
  }
  n(2 === a || void 0 !== T[a] && 0 === a % 2, `invalid handle: ${a}`);
  return T[a];
}, Pc = a => {
  switch(a) {
    case void 0:
      return 2;
    case null:
      return 4;
    case !0:
      return 6;
    case !1:
      return 8;
    default:
      const b = kd.pop() || T.length;
      T[b] = a;
      T[b + 1] = 1;
      return b;
  }
}, nd = {name:"emscripten::val", B:a => {
  var b = md(a);
  ld(a);
  return b;
}, H:(a, b) => Pc(b), S:Rc, I:null}, od = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.B(va[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.B(wa[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, pd = (a, b, c) => {
  n("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return db(a, z, b, c);
}, qd = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, rd = (a, b, c) => {
  n(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  a >>= 1;
  b = $a(ua, a, b / 2, c);
  if (16 < b - a && qd) {
    return qd.decode(ua.subarray(a, b));
  }
  for (c = ""; a < b; ++a) {
    c += String.fromCharCode(ua[a]);
  }
  return c;
}, sd = (a, b, c) => {
  n(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  n("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    A[b >> 1] = a.charCodeAt(e), b += 2;
  }
  A[b >> 1] = 0;
  return b - d;
}, td = a => 2 * a.length, ud = (a, b, c) => {
  n(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var d = "";
  a >>= 2;
  for (var e = 0; !(e >= b / 4); e++) {
    var f = u[a + e];
    if (!f && !c) {
      break;
    }
    d += String.fromCodePoint(f);
  }
  return d;
}, vd = (a, b, c) => {
  n(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  n("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.codePointAt(e);
    65535 < f && e++;
    D[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  D[b >> 2] = 0;
  return b - d;
}, wd = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    65535 < a.codePointAt(c) && c++, b += 4;
  }
  return b;
}, xd = 0, yd = [], zd = a => {
  var b = yd.length;
  yd.push(a);
  return b;
}, Ad = (a, b) => {
  for (var c = Array(a), d = 0; d < a; ++d) {
    var e = d, f = u[b + 4 * d >> 2], g = nc[f];
    if (void 0 === g) {
      throw a = `${`parameter ${d}`} has unknown type ${$c(f)}`, new R(a);
    }
    c[e] = g;
  }
  return c;
}, Bd = (a, b, c) => {
  var d = [];
  a = a(d, c);
  d.length && (u[b >> 2] = Pc(d));
  return a;
}, Cd = {}, Dd = a => {
  var b = Cd[a];
  return void 0 === b ? Q(a) : b;
}, Ed = {}, Gd = a => {
  if (!(a instanceof Ia || "unwind" == a)) {
    throw ma(), a instanceof WebAssembly.RuntimeError && 0 >= Fd() && p("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), a;
  }
}, Hd = a => {
  ia = a;
  Na || 0 < xd || (m.onExit?.(a), ha = !0);
  throw new Ia(a);
}, Jd = a => {
  if (ha) {
    p("user callback triggered after runtime exited or application aborted.  Ignoring.");
  } else {
    try {
      if (a(), !(Na || 0 < xd)) {
        try {
          ia = a = ia;
          Id();
          if (Na || 0 < xd) {
            var b = `program exited (with status: ${a}), but keepRuntimeAlive() is set (counter=${xd}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
            ta?.(b);
            p(b);
          }
          Hd(a);
        } catch (c) {
          Gd(c);
        }
      }
    } catch (c) {
      Gd(c);
    }
  }
}, Kd = [], Ld = [0, document, window], Md = a => {
  a = 2 < a ? L(a) : a;
  return Ld[a] || document.querySelector(a);
}, U, Nd = a => {
  var b = "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return (a.getSupportedExtensions() || []).filter(c => b.includes(c));
}, Od = 1, Pd = [], V = [], Qd = [], W = [], Rd = [], X = [], Sd = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8], Td = a => {
  for (var b = Od++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  for (; a[b];) {
    b = Od++;
  }
  return b;
}, Ud = (a, b, c, d) => {
  for (var e = 0; e < a; e++) {
    var f = U[c](), g = f && Td(d);
    f ? (f.name = g, d[g] = f) : Y ||= 1282;
    D[b + 4 * e >> 2] = g;
  }
}, Vd = a => {
  a = 32 - Math.clz32(0 === a ? 0 : a - 1);
  var b = Z.aa[a];
  if (b) {
    return b;
  }
  b = U.getParameter(34965);
  Z.aa[a] = U.createBuffer();
  U.bindBuffer(34963, Z.aa[a]);
  U.bufferData(34963, 1 << a, 35048);
  U.bindBuffer(34963, b);
  return Z.aa[a];
}, Xd = a => {
  Wd = !1;
  for (var b = 0; b < Z.Ia; ++b) {
    var c = Z.da[b];
    if (c.qa && c.enabled) {
      Wd = !0;
      var d = c.size;
      var e = c.type, f = c.stride;
      d = 0 < f ? a * f : d * Sd[e - 5120] * a;
      e = 32 - Math.clz32(0 === d ? 0 : d - 1);
      f = Z.ba[e];
      var g = Z.W[e];
      Z.W[e] = Z.W[e] + 1 & 63;
      var h = f[g];
      h ? e = h : (h = U.getParameter(34964), f[g] = U.createBuffer(), U.bindBuffer(34962, f[g]), U.bufferData(34962, 1 << e, 35048), U.bindBuffer(34962, h), e = f[g]);
      U.bindBuffer(34962, e);
      U.bufferSubData(34962, 0, z.subarray(c.i, c.i + d));
      c.jb.call(U, b, c.size, c.type, c.bb, c.stride, 0);
    }
  }
}, Zd = (a, b) => {
  a.F || (a.F = a.getContext, a.getContext = function(d, e) {
    e = a.F(d, e);
    return "webgl" == d == e instanceof WebGLRenderingContext ? e : null;
  });
  var c = a.getContext("webgl2", b);
  return c ? Yd(c, b) : 0;
}, Yd = (a, b) => {
  var c = Td(X), d = {handle:c, attributes:b, version:b.ia, T:a};
  a.canvas && (a.canvas.kb = d);
  X[c] = d;
  if ("undefined" == typeof b.Ta || b.Ta) {
    if ((a = d) || (a = Z), !a.vb) {
      a.vb = !0;
      b = a.T;
      b.ic = b.getExtension("WEBGL_multi_draw");
      b.bc = b.getExtension("EXT_polygon_offset_clamp");
      b.ac = b.getExtension("EXT_clip_control");
      b.qc = b.getExtension("WEBGL_polygon_mode");
      b.Yb = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
      b.fc = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
      2 <= a.version && (b.Sa = b.getExtension("EXT_disjoint_timer_query_webgl2"));
      if (2 > a.version || !b.Sa) {
        b.Sa = b.getExtension("EXT_disjoint_timer_query");
      }
      for (var e of Nd(b)) {
        e.includes("lose_context") || e.includes("debug") || b.getExtension(e);
      }
    }
  }
  d.Ia = d.T.getParameter(34921);
  d.da = [];
  for (e = 0; e < d.Ia; e++) {
    d.da[e] = {enabled:!1, qa:!1, size:0, type:0, bb:0, stride:0, i:0, jb:null};
  }
  d.W = [];
  d.Aa = [];
  d.W.length = d.Aa.length = 22;
  d.ba = [];
  d.na = [];
  d.ba.length = d.na.length = 22;
  d.aa = [];
  d.aa.length = 22;
  for (e = 0; 21 >= e; ++e) {
    d.aa[e] = null;
    d.W[e] = d.Aa[e] = 0;
    d.ba[e] = [];
    d.na[e] = [];
    a = d.ba[e];
    b = d.na[e];
    a.length = b.length = 64;
    for (var f = 0; 64 > f; ++f) {
      a[f] = b[f] = null;
    }
  }
  return c;
}, Y, Z, Wd, $d = ["default", "low-power", "high-performance"], ae = {}, ce = () => {
  if (!be) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:aa || "./this.program"}, b;
    for (b in ae) {
      void 0 === ae[b] ? delete a[b] : a[b] = ae[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    be = c;
  }
  return be;
}, be, de = () => {
  var a = Nd(U);
  return a = a.concat(a.map(b => "GL_" + b));
}, ee = (a, b) => {
  if (b) {
    var c = void 0;
    switch(a) {
      case 36346:
        c = 1;
        break;
      case 36344:
        return;
      case 34814:
      case 36345:
        c = 0;
        break;
      case 34466:
        var d = U.getParameter(34467);
        c = d ? d.length : 0;
        break;
      case 33309:
        if (2 > Z.version) {
          Y ||= 1282;
          return;
        }
        c = de().length;
        break;
      case 33307:
      case 33308:
        if (2 > Z.version) {
          Y ||= 1280;
          return;
        }
        c = 33307 == a ? 3 : 0;
    }
    if (void 0 === c) {
      switch(d = U.getParameter(a), typeof d) {
        case "number":
          c = d;
          break;
        case "boolean":
          c = d ? 1 : 0;
          break;
        case "string":
          Y ||= 1280;
          return;
        case "object":
          if (null === d) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068:
                c = 0;
                break;
              default:
                Y ||= 1280;
                return;
            }
          } else {
            if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
              for (a = 0; a < d.length; ++a) {
                D[b + 4 * a >> 2] = d[a];
              }
              return;
            }
            try {
              c = d.name | 0;
            } catch (e) {
              Y ||= 1280;
              p(`GL_INVALID_ENUM in glGet${0}v: Unknown object returned from WebGL getParameter(${a})! (error: ${e})`);
              return;
            }
          }
          break;
        default:
          Y ||= 1280;
          p(`GL_INVALID_ENUM in glGet${0}v: Native code calling glGet${0}v(${a}) and it returns ${d} of type ${typeof d}!`);
          return;
      }
    }
    D[b >> 2] = c;
  } else {
    Y ||= 1281;
  }
}, fe = a => "]" == a.slice(-1) && a.lastIndexOf("["), ge = a => {
  a -= 5120;
  return 0 == a ? y : 1 == a ? z : 2 == a ? A : 4 == a ? D : 6 == a ? va : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? u : ua;
};
Fb = Array(4096);
Vb(J, "/");
N("/tmp");
N("/home");
N("/home/web_user");
(function() {
  N("/dev");
  hb(259, {read:() => 0, write:(d, e, f, g) => g, L:() => 0});
  Yb("/dev/null", 259);
  gb(1280, jb);
  gb(1536, kb);
  Yb("/dev/tty", 1280);
  Yb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (Xa(a), b = a.byteLength);
    return a[--b];
  };
  P("/dev", "random", c);
  P("/dev", "urandom", c);
  N("/dev/shm");
  N("/dev/shm/tmp");
})();
(function() {
  N("/proc");
  var a = N("/proc/self");
  N("/proc/self/fd");
  Vb({O() {
    var b = nb(a, "fd", 16895, 73);
    b.j = {L:J.j.L};
    b.l = {ha(c, d) {
      c = +d;
      var e = Rb(c);
      c = {parent:null, O:{$a:"fake"}, l:{ma:() => e.path}, id:c + 1};
      return c.parent = c;
    }, La() {
      return Array.from(Db.entries()).filter(([, c]) => c).map(([c]) => c.toString());
    }};
    return b;
  }}, "/proc/self/fd");
})();
(() => {
  let a = Gc.prototype;
  Object.assign(a, {isAliasOf:function(c) {
    if (!(this instanceof Gc && c instanceof Gc)) {
      return !1;
    }
    var d = this.g.s.m, e = this.g.i;
    c.g = c.g;
    var f = c.g.s.m;
    for (c = c.g.i; d.C;) {
      e = d.pa(e), d = d.C;
    }
    for (; f.C;) {
      c = f.pa(c), f = f.C;
    }
    return d === f && e === c;
  }, clone:function() {
    this.g.i || uc(this);
    if (this.g.ka) {
      return this.g.count.value += 1, this;
    }
    var c = Cc, d = Object, e = d.create, f = Object.getPrototypeOf(this), g = this.g;
    c = c(e.call(d, f, {g:{value:{count:g.count, fa:g.fa, ka:g.ka, i:g.i, s:g.s, v:g.v, G:g.G}}}));
    c.g.count.value += 1;
    c.g.fa = !1;
    return c;
  }, ["delete"]() {
    this.g.i || uc(this);
    if (this.g.fa && !this.g.ka) {
      throw new R("Object already scheduled for deletion");
    }
    wc(this);
    var c = this.g;
    --c.count.value;
    0 === c.count.value && (c.v ? c.G.V(c.v) : c.s.m.V(c.i));
    this.g.ka || (this.g.v = void 0, this.g.i = void 0);
  }, isDeleted:function() {
    return !this.g.i;
  }, deleteLater:function() {
    this.g.i || uc(this);
    if (this.g.fa && !this.g.ka) {
      throw new R("Object already scheduled for deletion");
    }
    Fc.push(this);
    this.g.fa = !0;
    return this;
  }});
  const b = Symbol.dispose;
  b && (a[b] = a["delete"]);
})();
Object.assign(Sc.prototype, {tb(a) {
  this.eb && (a = this.eb(a));
  return a;
}, Ra(a) {
  this.V?.(a);
}, S:Rc, B:Ec});
n(10 === T.length);
var he = () => {
  if (Z) {
    var a = Z.ba;
    Z.ba = Z.na;
    Z.na = a;
    a = Z.W;
    Z.W = Z.Aa;
    Z.Aa = a;
    for (a = 0; 21 >= a; ++a) {
      Z.W[a] = 0;
    }
  }
};
"undefined" != typeof MainLoop && MainLoop.lc.push(he);
m.noExitRuntime && (Na = m.noExitRuntime);
m.preloadPlugins && (zb = m.preloadPlugins);
m.print && (ea = m.print);
m.printErr && (p = m.printErr);
m.wasmBinary && (fa = m.wasmBinary);
Object.getOwnPropertyDescriptor(m, "fetchSettings") && r("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
m.thisProgram && (aa = m.thisProgram);
n("undefined" == typeof m.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
n("undefined" == typeof m.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
n("undefined" == typeof m.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
n("undefined" == typeof m.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
n("undefined" == typeof m.read, "Module.read option was removed");
n("undefined" == typeof m.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
n("undefined" == typeof m.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
n("undefined" == typeof m.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
n("undefined" == typeof m.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
n("undefined" == typeof m.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
n("undefined" == typeof m.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
n("undefined" == typeof m.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
n("undefined" == typeof m.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if (m.preInit) {
  for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length;) {
    m.preInit.shift()();
  }
}
qa("preInit");
m.addRunDependency = yb;
m.removeRunDependency = xb;
m.FS_preloadFile = async(a, b, c, d, e, f, g, h) => {
  var l = b ? Ya(Ta(a + "/" + b)) : a, q;
  a: {
    for (var k = q = `cp ${l}`;;) {
      if (!vb[q]) {
        break a;
      }
      q = k + Math.random();
    }
  }
  yb(q);
  try {
    k = c, "string" == typeof c && (k = await sb(c)), k = await Ab(k, l), h?.(), f || ic(a, b, k, d, e, g);
  } finally {
    xb(q);
  }
};
m.FS_unlink = (...a) => $b(...a);
m.FS_createPath = (...a) => gc(...a);
m.FS_createDevice = (...a) => P(...a);
m.FS_createDataFile = (...a) => ic(...a);
m.FS_createLazyFile = (...a) => kc(...a);
"writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr runMainThreadEmAsm autoResumeAudioContext getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop asmjsMangle HandleAllocator addOnInit addOnPostCtor addOnPreMain addOnExit STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags safeSetTimeout setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory allocateUTF8 allocateUTF8OnStack demangle stackTrace getNativeTypeSize getFunctionArgsName createJsInvokerSignature PureVirtualError registerInheritedInstance unregisterInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer setDelayFunction validateThis count_emval_handles".split(" ").forEach(function(a) {
  ra(a);
});
"run out err callMain abort wasmExports HEAPF32 HEAPF64 HEAP8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie writeI53ToI64 readI53FromI64 readI53FromU64 INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore createNamedFunction ptrToString exitJS getHeapMax growMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray readEmAsmArgs runEmAsmFunction jstoi_q getExecutableName handleException keepRuntimeAlive callUserCallback maybeExit asyncLoad alignMemory mmapAlloc wasmTable wasmMemory getUniqueRunDependency noExitRuntime addOnPreRun addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev initRandomFill randomFill emSetImmediate emClearImmediate_deps emClearImmediate registerPreMainLoop promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia createContext getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType toTypedArrayIndex webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos AL GLUT EGL GLEW IDBStore SDL SDL_gfx webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance print printErr jstoi_s InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError EmValType EmValOptionalType throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol embindRepr registeredInstances getBasestPointer getInheritedInstance registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols getStringOrSymbol Emval emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller".split(" ").forEach(ra);
var ie = {102976:() => {
  throw "A böngésződ nem támogatja a WebGL-t!";
}, 103027:a => {
  throw "Sikertelen shader fordítás: " + L(a);
}, 103091:a => {
  throw "Sikertelen shader összekapcsolás: " + L(a);
}, 103161:(a, b) => {
  if (b = document.getElementById(L(b))) {
    b.innerText = a;
  }
}, 103251:() => {
  console.log("full");
}, 103271:() => {
  console.log("2x2");
}, 103290:() => {
  console.log("4x4");
}}, Yc = w("___getTypeName"), je = w("_malloc"), Zc = w("_free"), ke = w("_fflush"), la = w("_emscripten_stack_get_end"), le = w("__emscripten_timeout"), Jb = w("_strerror"), me = w("_emscripten_stack_init"), Fd = w("_emscripten_stack_get_current"), Ba = w("wasmMemory"), Vc = w("wasmTable"), ne = {__cxa_throw:(a, b, c) => {
  a = new Pa(a);
  u[a.i + 16 >> 2] = 0;
  u[a.i + 4 >> 2] = b;
  u[a.i + 8 >> 2] = c;
  Qa++;
  n(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  Ra = c;
  try {
    var d = Rb(a);
    switch(b) {
      case 0:
        var e = E();
        if (0 > e) {
          break;
        }
        for (; Db[e];) {
          e++;
        }
        return Tb(d, e).A;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = E(), d.flags |= e, 0;
      case 12:
        return e = E(), A[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof lc || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.J;
  }
}, __syscall_ioctl:function(a, b, c) {
  Ra = c;
  try {
    var d = Rb(a);
    switch(b) {
      case 21509:
        return d.o ? 0 : -59;
      case 21505:
        if (!d.o) {
          return -59;
        }
        if (d.o.P.xb) {
          b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var e = E();
          D[e >> 2] = 25856;
          D[e + 4 >> 2] = 5;
          D[e + 8 >> 2] = 191;
          D[e + 12 >> 2] = 35387;
          for (var f = 0; 32 > f; f++) {
            y[e + f + 17] = b[f] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return d.o ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!d.o) {
          return -59;
        }
        if (d.o.P.yb) {
          for (e = E(), b = [], f = 0; 32 > f; f++) {
            b.push(y[e + f + 17]);
          }
        }
        return 0;
      case 21519:
        if (!d.o) {
          return -59;
        }
        e = E();
        return D[e >> 2] = 0;
      case 21520:
        return d.o ? -28 : -59;
      case 21537:
      case 21531:
        e = E();
        if (!d.j.wb) {
          throw new G(59);
        }
        return d.j.wb(d, b, e);
      case 21523:
        if (!d.o) {
          return -59;
        }
        d.o.P.zb && (f = [24, 80], e = E(), A[e >> 1] = f[0], A[e + 2 >> 1] = f[1]);
        return 0;
      case 21524:
        return d.o ? 0 : -59;
      case 21515:
        return d.o ? 0 : -59;
      default:
        return -28;
    }
  } catch (g) {
    if ("undefined" == typeof lc || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.J;
  }
}, __syscall_openat:function(a, b, c, d) {
  Ra = d;
  try {
    b = L(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : Rb(a).path;
      if (0 == e.length) {
        throw new G(44);
      }
      b = f + "/" + e;
    }
    var g = d ? E() : 0;
    return bc(b, c, g).A;
  } catch (h) {
    if ("undefined" == typeof lc || "ErrnoError" !== h.name) {
      throw h;
    }
    return -h.J;
  }
}, _abort_js:() => r("native code called abort()"), _embind_register_bigint:(a, b, c, d, e) => {
  b = Q(b);
  const f = 0n === d;
  let g = h => h;
  if (f) {
    const h = 8 * c;
    g = l => BigInt.asUintN(h, l);
    e = g(e);
  }
  S(a, {name:b, B:g, H:(h, l) => {
    if ("number" == typeof l) {
      l = BigInt(l);
    } else if ("bigint" != typeof l) {
      throw new TypeError(`Cannot convert "${sc(l)}" to ${this.name}`);
    }
    tc(b, l, d, e);
    return l;
  }, S:rc(b, c, !f), I:null});
}, _embind_register_bool:(a, b, c, d) => {
  b = Q(b);
  S(a, {name:b, B:function(e) {
    return !!e;
  }, H:function(e, f) {
    return f ? c : d;
  }, S:function(e) {
    return this.B(z[e]);
  }, I:null});
}, _embind_register_class:(a, b, c, d, e, f, g, h, l, q, k, t, v) => {
  k = Q(k);
  f = Wc(e, f);
  h &&= Wc(g, h);
  q &&= Wc(l, q);
  v = Wc(t, v);
  var B = Kc(k);
  Jc(B, function() {
    ad(`Cannot construct ${k} due to unbound types`, [d]);
  });
  bd([a, b, c], d ? [d] : [], x => {
    x = x[0];
    if (d) {
      var C = x.m;
      var H = C.Z;
    } else {
      H = Gc.prototype;
    }
    x = Hc(k, function(...I) {
      if (Object.getPrototypeOf(this) !== O) {
        throw new R(`Use 'new' to construct ${k}`);
      }
      if (void 0 === F.Y) {
        throw new R(`${k} has no accessible constructor`);
      }
      var ed = F.Y[I.length];
      if (void 0 === ed) {
        throw new R(`Tried to invoke ctor of ${k} with invalid number of parameters (${I.length}) - expected (${Object.keys(F.Y).toString()}) parameters instead!`);
      }
      return ed.apply(this, I);
    });
    var O = Object.create(H, {constructor:{value:x}});
    x.prototype = O;
    var F = new Lc(k, x, O, v, C, f, h, q);
    if (F.C) {
      var ka;
      (ka = F.C).Oa ?? (ka.Oa = []);
      F.C.Oa.push(F);
    }
    C = new Sc(k, F, !0, !1, !1);
    ka = new Sc(k + "*", F, !1, !1, !1);
    H = new Sc(k + " const*", F, !1, !0, !1);
    yc[a] = {pointerType:ka, nb:H};
    Tc(B, x);
    return [C, ka, H];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  n(0 < b);
  var g = cd(b, c);
  e = Wc(d, e);
  bd([], [a], h => {
    h = h[0];
    var l = `constructor ${h.name}`;
    void 0 === h.m.Y && (h.m.Y = []);
    if (void 0 !== h.m.Y[b - 1]) {
      throw new R(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    h.m.Y[b - 1] = () => {
      ad(`Cannot construct ${h.name} due to unbound types`, g);
    };
    bd([], g, q => {
      q.splice(1, 0, null);
      h.m.Y[b - 1] = hd(l, q, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, h, l) => {
  var q = cd(c, d);
  b = Q(b);
  b = jd(b);
  f = Wc(e, f, l);
  bd([], [a], k => {
    function t() {
      ad(`Cannot call ${v} due to unbound types`, q);
    }
    k = k[0];
    var v = `${k.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    h && k.m.Kb.push(b);
    var B = k.m.Z, x = B[b];
    void 0 === x || void 0 === x.R && x.className !== k.name && x.ca === c - 2 ? (t.ca = c - 2, t.className = k.name, B[b] = t) : (Ic(B, b, v), B[b].R[c - 2] = t);
    bd([], q, C => {
      C = hd(v, C, k, f, g, l);
      void 0 === B[b].R ? (C.ca = c - 2, B[b] = C) : B[b].R[c - 2] = C;
      return [];
    });
    return [];
  });
}, _embind_register_emval:a => S(a, nd), _embind_register_float:(a, b, c) => {
  b = Q(b);
  S(a, {name:b, B:d => d, H:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${sc(e)} to ${this.name}`);
    }
    return e;
  }, S:od(b, c), I:null});
}, _embind_register_integer:(a, b, c, d, e) => {
  b = Q(b);
  let f = h => h;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = h => h << g >>> g;
    e = f(e);
  }
  S(a, {name:b, B:f, H:(h, l) => {
    if ("number" != typeof l && "boolean" != typeof l) {
      throw new TypeError(`Cannot convert "${sc(l)}" to ${b}`);
    }
    tc(b, l, d, e);
    return l;
  }, S:rc(b, c, 0 !== d), I:null});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(y.buffer, u[f + 4 >> 2], u[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
  c = Q(c);
  S(a, {name:c, B:d, S:d}, {ub:!0});
}, _embind_register_std_string:(a, b) => {
  b = Q(b);
  S(a, {name:b, B(c) {
    var d = L(c + 4, u[c >> 2], !0);
    Zc(c);
    return d;
  }, H(c, d) {
    d instanceof ArrayBuffer && (d = new Uint8Array(d));
    var e = "string" == typeof d;
    if (!(e || ArrayBuffer.isView(d) && 1 == d.BYTES_PER_ELEMENT)) {
      throw new R("Cannot pass non-string to std::string");
    }
    var f = e ? cb(d) : d.length;
    var g = je(4 + f + 1), h = g + 4;
    u[g >> 2] = f;
    e ? pd(d, h, f + 1) : z.set(d, h);
    null !== c && c.push(Zc, g);
    return g;
  }, S:Rc, I(c) {
    Zc(c);
  }});
}, _embind_register_std_wstring:(a, b, c) => {
  c = Q(c);
  if (2 === b) {
    var d = rd;
    var e = sd;
    var f = td;
  } else {
    n(4 === b, "only 2-byte and 4-byte strings are currently supported"), d = ud, e = vd, f = wd;
  }
  S(a, {name:c, B:g => {
    var h = d(g + 4, u[g >> 2] * b, !0);
    Zc(g);
    return h;
  }, H:(g, h) => {
    if ("string" != typeof h) {
      throw new R(`Cannot pass non-string to C++ string type ${c}`);
    }
    var l = f(h), q = je(4 + l + b);
    u[q >> 2] = l / b;
    e(h, q + 4, l + b);
    null !== g && g.push(Zc, q);
    return q;
  }, S:Rc, I(g) {
    Zc(g);
  }});
}, _embind_register_void:(a, b) => {
  b = Q(b);
  S(a, {Va:!0, name:b, B:() => {
  }, H:() => {
  }});
}, _emscripten_fs_load_embedded_files:a => {
  do {
    var b = u[a >> 2];
    a += 4;
    var c = u[a >> 2];
    a += 4;
    var d = u[a >> 2];
    a += 4;
    b = L(b);
    gc("/", Ua(b));
    ic(b, null, y.subarray(d, d + c), !0, !0, !0);
  } while (u[a >> 2]);
}, _emscripten_runtime_keepalive_clear:() => {
  Na = !1;
  xd = 0;
}, _emval_create_invoker:(a, b, c) => {
  var [d, ...e] = Ad(a, b);
  b = d.H.bind(d);
  var f = e.map(l => l.S.bind(l));
  a--;
  var g = {toValue:md};
  a = f.map((l, q) => {
    var k = `argFromPtr${q}`;
    g[k] = l;
    return `${k}(args${q ? "+" + 8 * q : ""})`;
  });
  switch(c) {
    case 0:
      var h = "toValue(handle)";
      break;
    case 2:
      h = "new (toValue(handle))";
      break;
    case 3:
      h = "";
      break;
    case 1:
      g.getStringOrSymbol = Dd, h = "toValue(handle)[getStringOrSymbol(methodName)]";
  }
  h += `(${a})`;
  d.Va || (g.toReturnWire = b, g.emval_returnValue = Bd, h = `return emval_returnValue(toReturnWire, destructorsRef, ${h})`);
  h = `return function (handle, methodName, destructorsRef, args) {
  ${h}
  }`;
  c = (new Function(Object.keys(g), h))(...Object.values(g));
  h = `methodCaller<(${e.map(l => l.name)}) => ${d.name}>`;
  return zd(Hc(h, c));
}, _emval_decref:ld, _emval_get_global:a => {
  if (!a) {
    return Pc(globalThis);
  }
  a = Dd(a);
  return Pc(globalThis[a]);
}, _emval_invoke:(a, b, c, d, e) => yd[a](b, c, d, e), _emval_run_destructors:a => {
  var b = md(a);
  dd(b);
  ld(a);
}, _emval_set_property:(a, b, c) => {
  a = md(a);
  b = md(b);
  c = md(c);
  a[b] = c;
}, _setitimer_js:(a, b) => {
  Ed[a] && (clearTimeout(Ed[a].id), delete Ed[a]);
  if (!b) {
    return 0;
  }
  var c = setTimeout(() => {
    n(a in Ed);
    delete Ed[a];
    Jd(() => le(a, performance.now()));
  }, b);
  Ed[a] = {id:c, pc:b};
  return 0;
}, _tzset_js:(a, b, c, d) => {
  var e = (new Date()).getFullYear(), f = (new Date(e, 0, 1)).getTimezoneOffset();
  e = (new Date(e, 6, 1)).getTimezoneOffset();
  u[a >> 2] = 60 * Math.max(f, e);
  D[b >> 2] = Number(f != e);
  b = g => {
    var h = Math.abs(g);
    return `UTC${0 <= g ? "-" : "+"}${String(Math.floor(h / 60)).padStart(2, "0")}${String(h % 60).padStart(2, "0")}`;
  };
  a = b(f);
  b = b(e);
  n(a);
  n(b);
  n(16 >= cb(a), `timezone name truncated to fit in TZNAME_MAX (${a})`);
  n(16 >= cb(b), `timezone name truncated to fit in TZNAME_MAX (${b})`);
  e < f ? (pd(a, c, 17), pd(b, d, 17)) : (pd(a, d, 17), pd(b, c, 17));
}, emscripten_asm_const_int:(a, b, c) => {
  n(Array.isArray(Kd));
  n(0 == c % 16);
  Kd.length = 0;
  for (var d; d = z[b++];) {
    var e = String.fromCharCode(d), f = ["d", "f", "i", "p"];
    f.push("j");
    n(f.includes(e), `Invalid character ${d}("${e}") in readEmAsmArgs! Use only [${f}], and do not specify "v" for void return argument.`);
    e = 105 != d;
    e &= 112 != d;
    c += e && c % 8 ? 4 : 0;
    Kd.push(112 == d ? u[c >> 2] : 106 == d ? xa[c >> 3] : 105 == d ? D[c >> 2] : wa[c >> 3]);
    c += e ? 8 : 4;
  }
  n(ie.hasOwnProperty(a), `No EM_ASM constant found at address ${a}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return ie[a](...Kd);
}, emscripten_get_now:() => performance.now(), emscripten_resize_heap:a => {
  var b = z.length;
  a >>>= 0;
  n(a > b);
  if (2147483648 < a) {
    return p(`Cannot enlarge memory, requested ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math, f = e.min;
    d = Math.max(a, d);
    n(65536, "alignment argument is required");
    e = f.call(e, 2147483648, 65536 * Math.ceil(d / 65536));
    a: {
      f = e;
      d = Ba.buffer.byteLength;
      try {
        Ba.grow((f - d + 65535) / 65536 | 0);
        Aa();
        var g = 1;
        break a;
      } catch (h) {
        p(`growMemory: Attempted to grow heap from ${d} bytes to ${f} bytes, but got error: ${h}`);
      }
      g = void 0;
    }
    if (g) {
      return !0;
    }
  }
  p(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, emscripten_set_canvas_element_size:(a, b, c) => {
  a = Md(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_webgl_create_context:(a, b) => {
  n(b);
  var c = b >> 2;
  b = {alpha:!!y[b + 0], depth:!!y[b + 1], stencil:!!y[b + 2], antialias:!!y[b + 3], premultipliedAlpha:!!y[b + 4], preserveDrawingBuffer:!!y[b + 5], powerPreference:$d[D[c + 2]], failIfMajorPerformanceCaveat:!!y[b + 12], ia:D[c + 4], hc:D[c + 5], Ta:y[b + 24], rb:y[b + 25], mc:D[c + 7], oc:y[b + 32]};
  1 !== b.ia && 2 !== b.ia && p(`Invalid WebGL version requested: ${b.ia}`);
  2 !== b.ia && p("WebGL 1 requested but only WebGL 2 is supported (MIN_WEBGL_VERSION is 2)");
  a = Md(a);
  return !a || b.rb ? 0 : Zd(a, b);
}, emscripten_webgl_destroy_context:a => {
  Z == a && (Z = 0);
  Z === X[a] && (Z = null);
  "object" == typeof JSEvents && JSEvents.nc(X[a].T.canvas);
  X[a]?.T.canvas && (X[a].T.canvas.kb = void 0);
  X[a] = null;
}, emscripten_webgl_get_current_context:() => Z ? Z.handle : 0, emscripten_webgl_make_context_current:a => {
  Z = X[a];
  m.ctx = U = Z?.T;
  return !a || U ? 0 : -5;
}, environ_get:(a, b) => {
  var c = 0, d = 0, e;
  for (e of ce()) {
    var f = b + c;
    u[a + d >> 2] = f;
    c += pd(e, f, Infinity) + 1;
    d += 4;
  }
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = ce();
  u[a >> 2] = c.length;
  a = 0;
  for (var d of c) {
    a += cb(d) + 1;
  }
  u[b >> 2] = a;
  return 0;
}, equirectangularFromURL:function(a, b, c, d) {
  let e = X[b].T, f = new Image(), g = L(a), h = md(d);
  f.onload = function() {
    var l = c * c;
    let q = [];
    for (var k = 0; k < l && Qd[h[k]];) {
      q.push(Qd[h[k]]), k++;
    }
    if (k == l) {
      l = document.createElement("canvas");
      k = l.getContext("2d");
      let t = f.width / c, v = f.height / c;
      l.width = t;
      l.height = v;
      let B = 0;
      for (let x = 0; x < c; x++) {
        for (let C = 0; C < c; C++) {
          k.clearRect(0, 0, t, v), k.drawImage(f, x * t, C * v, t, v, 0, 0, t, v), e.bindTexture(e.TEXTURE_2D, q[B]), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, l), e.generateMipmap(e.TEXTURE_2D), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.bindTexture(e.TEXTURE_2D, 
          null), B++;
        }
      }
    } else {
      console.error("Texture failed to load (it no longer exists):\t" + g);
    }
  };
  f.onerror = function() {
    console.error("Texture failed to load:\t" + g);
  };
  f.src = g;
}, fd_close:function(a) {
  try {
    var b = Rb(a);
    cc(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof lc || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.J;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = Rb(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = u[a >> 2], l = u[a + 4 >> 2];
        a += 8;
        var q = e, k = h, t = l, v = f, B = y;
        n(0 <= k);
        if (0 > t || 0 > v) {
          throw new G(28);
        }
        if (null === q.A) {
          throw new G(8);
        }
        if (1 === (q.flags & 2097155)) {
          throw new G(8);
        }
        if (K(q.node.mode)) {
          throw new G(31);
        }
        if (!q.j.read) {
          throw new G(28);
        }
        var x = "undefined" != typeof v;
        if (!x) {
          v = q.position;
        } else if (!q.seekable) {
          throw new G(70);
        }
        var C = q.j.read(q, B, k, t, v);
        x || (q.position += C);
        var H = C;
        if (0 > H) {
          var O = -1;
          break a;
        }
        b += H;
        if (H < l) {
          break;
        }
        "undefined" != typeof f && (f += H);
      }
      O = b;
    }
    u[d >> 2] = O;
    return 0;
  } catch (F) {
    if ("undefined" == typeof lc || "ErrnoError" !== F.name) {
      throw F;
    }
    return F.J;
  }
}, fd_seek:function(a, b, c, d) {
  b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var e = Rb(a);
    dc(e, b, c);
    xa[d >> 3] = BigInt(e.position);
    e.Ea && 0 === b && 0 === c && (e.Ea = null);
    return 0;
  } catch (f) {
    if ("undefined" == typeof lc || "ErrnoError" !== f.name) {
      throw f;
    }
    return f.J;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = Rb(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = u[a >> 2], l = u[a + 4 >> 2];
        a += 8;
        var q = ec(e, y, h, l, f);
        if (0 > q) {
          var k = -1;
          break a;
        }
        b += q;
        if (q < l) {
          break;
        }
        "undefined" != typeof f && (f += q);
      }
      k = b;
    }
    u[d >> 2] = k;
    return 0;
  } catch (t) {
    if ("undefined" == typeof lc || "ErrnoError" !== t.name) {
      throw t;
    }
    return t.J;
  }
}, glActiveTexture:a => U.activeTexture(a), glAttachShader:(a, b) => {
  U.attachShader(V[a], W[b]);
}, glBindBuffer:(a, b) => {
  if (b && !Pd[b]) {
    var c = U.createBuffer();
    c.name = b;
    Pd[b] = c;
  }
  34962 == a ? U.ra = b : 34963 == a && (U.ea = b);
  35051 == a ? U.Qa = b : 35052 == a && (U.Ca = b);
  U.bindBuffer(a, Pd[b]);
}, glBindBufferRange:(a, b, c, d, e) => {
  U.bindBufferRange(a, b, Pd[c], d, e);
}, glBindTexture:(a, b) => {
  U.bindTexture(a, Qd[b]);
}, glBindVertexArray:a => {
  U.bindVertexArray(Rd[a]);
  a = U.getParameter(34965);
  U.ea = a ? a.name | 0 : 0;
}, glBufferData:(a, b, c, d) => {
  c && b ? U.bufferData(a, z, d, c, b) : U.bufferData(a, b, d);
}, glBufferSubData:(a, b, c, d) => {
  c && U.bufferSubData(a, b, z, d, c);
}, glClear:a => U.clear(a), glClearColor:(a, b, c, d) => U.clearColor(a, b, c, d), glCompileShader:a => {
  U.compileShader(W[a]);
}, glCreateProgram:() => {
  var a = Td(V), b = U.createProgram();
  b.name = a;
  b.xa = b.va = b.wa = 0;
  b.Na = 1;
  V[a] = b;
  return a;
}, glCreateShader:a => {
  var b = Td(W);
  W[b] = U.createShader(a);
  return b;
}, glDeleteBuffers:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = D[b + 4 * c >> 2], e = Pd[d];
    e && (U.deleteBuffer(e), e.name = 0, Pd[d] = null, d == U.ra && (U.ra = 0), d == U.ea && (U.ea = 0), d == U.Qa && (U.Qa = 0), d == U.Ca && (U.Ca = 0));
  }
}, glDeleteProgram:a => {
  if (a) {
    var b = V[a];
    b ? (U.deleteProgram(b), b.name = 0, V[a] = null) : Y ||= 1281;
  }
}, glDeleteShader:a => {
  if (a) {
    var b = W[a];
    b ? (U.deleteShader(b), W[a] = null) : Y ||= 1281;
  }
}, glDeleteTextures:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = D[b + 4 * c >> 2], e = Qd[d];
    e && (U.deleteTexture(e), e.name = 0, Qd[d] = null);
  }
}, glDeleteVertexArrays:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = D[b + 4 * c >> 2];
    U.deleteVertexArray(Rd[d]);
    Rd[d] = null;
  }
}, glDrawElements:(a, b, c, d) => {
  var e = 0;
  if (!U.ea) {
    var f = 1 * Sd[c - 5120] * b;
    var g = Vd(f);
    U.bindBuffer(34963, g);
    U.bufferSubData(34963, 0, z.subarray(d, d + f));
    if (0 < b) {
      for (g = 0; g < Z.Ia; ++g) {
        if (f = Z.da[g], f.qa && f.enabled) {
          switch(c) {
            case 5121:
              e = Uint8Array;
              break;
            case 5123:
              e = Uint16Array;
              break;
            default:
              Y ||= 1282;
              return;
          }
          e = (new e(z.buffer, d, b)).reduce((h, l) => Math.max(h, l)) + 1;
          break;
        }
      }
    }
    d = 0;
  }
  Xd(e);
  U.drawElements(a, b, c, d);
  Wd && U.bindBuffer(34962, Pd[U.ra]);
  U.ea || U.bindBuffer(34963, null);
}, glEnable:a => U.enable(a), glEnableVertexAttribArray:a => {
  Z.da[a].enabled = !0;
  U.enableVertexAttribArray(a);
}, glGenBuffers:(a, b) => {
  Ud(a, b, "createBuffer", Pd);
}, glGenTextures:(a, b) => {
  Ud(a, b, "createTexture", Qd);
}, glGenVertexArrays:(a, b) => {
  Ud(a, b, "createVertexArray", Rd);
}, glGenerateMipmap:a => U.generateMipmap(a), glGetIntegerv:(a, b) => ee(a, b), glGetProgramInfoLog:(a, b, c, d) => {
  a = U.getProgramInfoLog(V[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? pd(a, d, b) : 0;
  c && (D[c >> 2] = b);
}, glGetProgramiv:(a, b, c) => {
  if (c) {
    if (a >= Od) {
      Y ||= 1281;
    } else {
      if (a = V[a], 35716 == b) {
        a = U.getProgramInfoLog(a), null === a && (a = "(unknown error)"), D[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.xa) {
          var d = U.getProgramParameter(a, 35718);
          for (b = 0; b < d; ++b) {
            a.xa = Math.max(a.xa, U.getActiveUniform(a, b).name.length + 1);
          }
        }
        D[c >> 2] = a.xa;
      } else if (35722 == b) {
        if (!a.va) {
          for (d = U.getProgramParameter(a, 35721), b = 0; b < d; ++b) {
            a.va = Math.max(a.va, U.getActiveAttrib(a, b).name.length + 1);
          }
        }
        D[c >> 2] = a.va;
      } else if (35381 == b) {
        if (!a.wa) {
          for (d = U.getProgramParameter(a, 35382), b = 0; b < d; ++b) {
            a.wa = Math.max(a.wa, U.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        D[c >> 2] = a.wa;
      } else {
        D[c >> 2] = U.getProgramParameter(a, b);
      }
    }
  } else {
    Y ||= 1281;
  }
}, glGetShaderInfoLog:(a, b, c, d) => {
  a = U.getShaderInfoLog(W[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? pd(a, d, b) : 0;
  c && (D[c >> 2] = b);
}, glGetShaderiv:(a, b, c) => {
  c ? 35716 == b ? (a = U.getShaderInfoLog(W[a]), null === a && (a = "(unknown error)"), D[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = U.getShaderSource(W[a]), D[c >> 2] = a ? a.length + 1 : 0) : D[c >> 2] = U.getShaderParameter(W[a], b) : Y ||= 1281;
}, glGetUniformBlockIndex:(a, b) => U.getUniformBlockIndex(V[a], L(b)), glGetUniformLocation:(a, b) => {
  b = L(b);
  if (a = V[a]) {
    var c = a, d = c.oa, e = c.ib, f;
    if (!d) {
      c.oa = d = {};
      c.hb = {};
      var g = U.getProgramParameter(c, 35718);
      for (f = 0; f < g; ++f) {
        var h = U.getActiveUniform(c, f);
        var l = h.name;
        h = h.size;
        var q = fe(l);
        q = 0 < q ? l.slice(0, q) : l;
        var k = c.Na;
        c.Na += h;
        e[q] = [h, k];
        for (l = 0; l < h; ++l) {
          d[k] = l, c.hb[k++] = q;
        }
      }
    }
    c = a.oa;
    d = 0;
    e = b;
    f = fe(b);
    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
    if ((e = a.ib[e]) && d < e[0] && (d += e[1], c[d] = c[d] || U.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    Y ||= 1281;
  }
  return -1;
}, glLinkProgram:a => {
  a = V[a];
  U.linkProgram(a);
  a.oa = 0;
  a.ib = {};
}, glShaderSource:(a, b, c, d) => {
  for (var e = "", f = 0; f < b; ++f) {
    e += L(u[c + 4 * f >> 2], d ? u[d + 4 * f >> 2] : void 0);
  }
  U.shaderSource(W[a], e);
}, glTexImage2D:(a, b, c, d, e, f, g, h, l) => {
  if (U.Ca) {
    U.texImage2D(a, b, c, d, e, f, g, h, l);
  } else {
    if (l) {
      var q = ge(h);
      l >>>= 31 - Math.clz32(q.BYTES_PER_ELEMENT);
      U.texImage2D(a, b, c, d, e, f, g, h, q, l);
    } else {
      if (l) {
        q = ge(h);
        var k = e * (d * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[g - 6402] || 1) * q.BYTES_PER_ELEMENT + 4 - 1 & -4);
        l = q.subarray(l >>> 31 - Math.clz32(q.BYTES_PER_ELEMENT), l + k >>> 31 - Math.clz32(q.BYTES_PER_ELEMENT));
      } else {
        l = null;
      }
      U.texImage2D(a, b, c, d, e, f, g, h, l);
    }
  }
}, glTexParameteri:(a, b, c) => U.texParameteri(a, b, c), glUniform1i:(a, b) => {
  var c = U, d = c.uniform1i;
  var e = U.ob;
  if (e) {
    var f = e.oa[a];
    "number" == typeof f && (e.oa[a] = f = U.getUniformLocation(e, e.hb[a] + (0 < f ? `[${f}]` : "")));
    a = f;
  } else {
    Y ||= 1282, a = void 0;
  }
  d.call(c, a, b);
}, glUniformBlockBinding:(a, b, c) => {
  a = V[a];
  U.uniformBlockBinding(a, b, c);
}, glUseProgram:a => {
  a = V[a];
  U.useProgram(a);
  U.ob = a;
}, glVertexAttribPointer:(a, b, c, d, e, f) => {
  var g = Z.da[a];
  U.ra ? (g.qa = !1, U.vertexAttribPointer(a, b, c, !!d, e, f)) : (g.size = b, g.type = c, g.bb = d, g.stride = e, g.i = f, g.qa = !0, g.jb = function(h, l, q, k, t, v) {
    this.vertexAttribPointer(h, l, q, k, t, v);
  });
}, glViewport:(a, b, c, d) => U.viewport(a, b, c, d), proc_exit:Hd, textureFromURL:function(a, b, c) {
  let d = X[c].T, e = new Image(), f = L(b);
  e.onload = function() {
    let g = Qd[a];
    g ? (d.bindTexture(d.TEXTURE_2D, g), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, e), d.generateMipmap(d.TEXTURE_2D), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR_MIPMAP_LINEAR), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR), d.bindTexture(d.TEXTURE_2D, null)) : console.error("Texture failed to load (it no longer exists):\t" + f);
  };
  e.onerror = function() {
    console.error("Texture failed to load:\t" + f);
  };
  e.src = f;
}}, oe;
function pe() {
  function a() {
    n(!oe);
    oe = !0;
    m.calledRun = !0;
    if (!ha) {
      n(!za);
      za = !0;
      ma();
      if (!m.noFSInit && !Gb) {
        n(!Gb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        Gb = !0;
        c ??= m.stdin;
        d ??= m.stdout;
        b ??= m.stderr;
        c ? P("/dev", "stdin", c) : Zb("/dev/tty", "/dev/stdin");
        d ? P("/dev", "stdout", null, d) : Zb("/dev/tty", "/dev/stdout");
        b ? P("/dev", "stderr", null, b) : Zb("/dev/tty1", "/dev/stderr");
        var b = bc("/dev/stdin", 0);
        var c = bc("/dev/stdout", 1);
        var d = bc("/dev/stderr", 1);
        n(0 === b.A, `invalid handle for stdin (${b.A})`);
        n(1 === c.A, `invalid handle for stdout (${c.A})`);
        n(2 === d.A, `invalid handle for stderr (${d.A})`);
      }
      Da.__wasm_call_ctors();
      Hb = !1;
      sa?.(m);
      m.onRuntimeInitialized?.();
      qa("onRuntimeInitialized");
      n(!m._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      ma();
      if (m.postRun) {
        for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length;) {
          b = m.postRun.shift(), Ka.push(b);
        }
      }
      qa("postRun");
      Ja(Ka);
    }
  }
  if (0 < tb) {
    ub = pe;
  } else {
    me();
    ja();
    if (m.preRun) {
      for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length;) {
        Ma();
      }
    }
    qa("preRun");
    Ja(La);
    0 < tb ? ub = pe : (m.setStatus ? (m.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => m.setStatus(""), 1);
      a();
    }, 1)) : a(), ma());
  }
}
function Id() {
  var a = ea, b = p, c = !1;
  ea = p = () => {
    c = !0;
  };
  try {
    ke(0);
    for (var d of ["stdout", "stderr"]) {
      var e = fc("/dev/" + d);
      if (!e) {
        return;
      }
      fb[e.object.la]?.output?.length && (c = !0);
    }
  } catch (f) {
  }
  ea = a;
  p = b;
  c && Oa("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var Da;
Da = await (async function() {
  function a(d) {
    d = Da = d.exports;
    n("undefined" != typeof d.__getTypeName, "missing Wasm export: __getTypeName");
    Yc = Ca("__getTypeName", 1);
    n("undefined" != typeof d.malloc, "missing Wasm export: malloc");
    je = Ca("malloc", 1);
    n("undefined" != typeof d.free, "missing Wasm export: free");
    Zc = Ca("free", 1);
    n("undefined" != typeof d.fflush, "missing Wasm export: fflush");
    ke = Ca("fflush", 1);
    n("undefined" != typeof d.emscripten_stack_get_end, "missing Wasm export: emscripten_stack_get_end");
    la = d.emscripten_stack_get_end;
    n("undefined" != typeof d.emscripten_stack_get_base, "missing Wasm export: emscripten_stack_get_base");
    n("undefined" != typeof d._emscripten_timeout, "missing Wasm export: _emscripten_timeout");
    le = Ca("_emscripten_timeout", 2);
    n("undefined" != typeof d.strerror, "missing Wasm export: strerror");
    Jb = Ca("strerror", 1);
    n("undefined" != typeof d.emscripten_stack_init, "missing Wasm export: emscripten_stack_init");
    me = d.emscripten_stack_init;
    n("undefined" != typeof d.emscripten_stack_get_free, "missing Wasm export: emscripten_stack_get_free");
    n("undefined" != typeof d._emscripten_stack_restore, "missing Wasm export: _emscripten_stack_restore");
    n("undefined" != typeof d._emscripten_stack_alloc, "missing Wasm export: _emscripten_stack_alloc");
    n("undefined" != typeof d.emscripten_stack_get_current, "missing Wasm export: emscripten_stack_get_current");
    Fd = d.emscripten_stack_get_current;
    n("undefined" != typeof d.__cxa_increment_exception_refcount, "missing Wasm export: __cxa_increment_exception_refcount");
    n("undefined" != typeof d.memory, "missing Wasm export: memory");
    Ba = d.memory;
    n("undefined" != typeof d.__indirect_function_table, "missing Wasm export: __indirect_function_table");
    Vc = d.__indirect_function_table;
    Aa();
    return Da;
  }
  var b = m, c = {env:ne, wasi_snapshot_preview1:ne};
  if (m.instantiateWasm) {
    return new Promise((d, e) => {
      try {
        m.instantiateWasm(c, (f, g) => {
          d(a(f, g));
        });
      } catch (f) {
        p(`Module.instantiateWasm callback failed with error: ${f}`), e(f);
      }
    });
  }
  Ea ??= m.locateFile ? m.locateFile("equirectangular.wasm", ba) : ba + "equirectangular.wasm";
  return function(d) {
    n(m === b, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    b = null;
    return a(d.instance);
  }(await Ha(c));
}());
pe();
za ? moduleRtn = m : moduleRtn = new Promise((a, b) => {
  sa = a;
  ta = b;
});
for (const a of Object.keys(m)) {
  a in moduleArg || Object.defineProperty(moduleArg, a, {configurable:!0, get() {
    r(`Access to module property ('${a}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
  }});
}
;


    return moduleRtn;
  };
})();

// Export using a UMD style export, or ES6 exports if selected
if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = createModule;
  // This default export looks redundant, but it allows TS to import this
  // commonjs style module.
  module.exports.default = createModule;
} else if (typeof define === 'function' && define['amd'])
  define([], () => createModule);

