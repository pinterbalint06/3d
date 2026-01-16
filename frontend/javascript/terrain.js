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
  var b = "undefined" !== typeof process && process.Xb?.node ? a(process.Xb.node) : 2147483647;
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
var n = moduleArg, aa = "./this.program", ba = "", ca;
try {
  ba = (new URL(".", _scriptName)).href;
} catch {
}
if (!globalThis.window && !globalThis.WorkerGlobalScope) {
  throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
}
ca = async a => {
  p(!da(a), "readAsync does not work with file:// URLs");
  a = await fetch(a, {credentials:"same-origin"});
  if (a.ok) {
    return a.arrayBuffer();
  }
  throw Error(a.status + " : " + a.url);
};
var ea = console.log.bind(console), q = console.error.bind(console);
p(!0, "worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.");
p(!0, "node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.");
p(!0, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var fa;
globalThis.WebAssembly || q("no native wasm support detected");
var ha = !1, ia;
function p(a, b) {
  a || t("Assertion failed" + (b ? ": " + b : ""));
}
var da = a => a.startsWith("file://");
function ja() {
  var a = ka();
  p(0 == (a & 3));
  0 == a && (a += 4);
  w[a >> 2] = 34821223;
  w[a + 4 >> 2] = 2310721022;
  w[0] = 1668509029;
}
function la() {
  if (!ha) {
    var a = ka();
    0 == a && (a += 4);
    var b = w[a >> 2], c = w[a + 4 >> 2];
    34821223 == b && 2310721022 == c || t(`Stack overflow! Stack cookie has been overwritten at ${ma(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ma(c)} ${ma(b)}`);
    1668509029 != w[0] && t("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var na = new Int16Array(1), oa = new Int8Array(na.buffer);
na[0] = 25459;
115 === oa[0] && 99 === oa[1] || t("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
function pa(a) {
  Object.getOwnPropertyDescriptor(n, a) || Object.defineProperty(n, a, {configurable:!0, set() {
    t(`Attempt to set \`Module.${a}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function x(a) {
  return () => p(!1, `call to '${a}' via reference taken before Wasm module initialization`);
}
function qa(a) {
  Object.getOwnPropertyDescriptor(n, a) || Object.defineProperty(n, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    "FS_createPath" !== a && "FS_createDataFile" !== a && "FS_createPreloadedFile" !== a && "FS_preloadFile" !== a && "FS_unlink" !== a && "addRunDependency" !== a && "FS_createLazyFile" !== a && "FS_createDevice" !== a && "removeRunDependency" !== a || (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    t(b);
  }});
}
var ra, sa, z, B, C, ta, E, w, ua, va, wa, xa, ya = !1;
function za() {
  var a = Aa.buffer;
  z = new Int8Array(a);
  C = new Int16Array(a);
  n.HEAPU8 = B = new Uint8Array(a);
  ta = new Uint16Array(a);
  E = new Int32Array(a);
  w = new Uint32Array(a);
  ua = new Float32Array(a);
  va = new Float64Array(a);
  wa = new BigInt64Array(a);
  xa = new BigUint64Array(a);
}
p(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set, "JS engine does not provide full typed array support");
function t(a) {
  n.onAbort?.(a);
  a = "Aborted(" + a + ")";
  q(a);
  ha = !0;
  a = new WebAssembly.RuntimeError(a);
  sa?.(a);
  throw a;
}
function Ba(a, b) {
  return (...c) => {
    p(ya, `native function \`${a}\` called before runtime initialization`);
    var d = Ca[a];
    p(d, `exported native function \`${a}\` not found`);
    p(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var Da;
async function Ea(a) {
  if (!fa) {
    try {
      var b = await ca(a);
      return new Uint8Array(b);
    } catch {
    }
  }
  if (a == Da && fa) {
    a = new Uint8Array(fa);
  } else {
    throw "both async and sync fetching of the wasm failed";
  }
  return a;
}
async function Fa(a, b) {
  try {
    var c = await Ea(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    q(`failed to asynchronously prepare wasm: ${d}`), da(a) && q(`warning: Loading from a file URI (${a}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), t(d);
  }
}
async function Ga(a) {
  var b = Da;
  if (!fa) {
    try {
      var c = fetch(b, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      q(`wasm streaming compile failed: ${d}`), q("falling back to ArrayBuffer instantiation");
    }
  }
  return Fa(b, a);
}
class Ha {
  name="ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Ia = a => {
  for (; 0 < a.length;) {
    a.shift()(n);
  }
}, Ja = [], Ka = [], La = () => {
  var a = n.preRun.shift();
  Ka.push(a);
}, Ma = !0, ma = a => {
  p("number" === typeof a, `ptrToString expects a number, got ${typeof a}`);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, Na = a => {
  Na.Oa || (Na.Oa = {});
  Na.Oa[a] || (Na.Oa[a] = 1, q(a));
};
class Oa {
  constructor(a) {
    this.i = a - 24;
  }
}
var Pa = 0, F = () => {
  p(void 0 != Qa);
  var a = E[+Qa >> 2];
  Qa += 4;
  return a;
}, Ra = (a, b) => {
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
}, Sa = a => {
  var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
  (a = Ra(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Ta = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.slice(0, -1);
  return a + b;
}, Ua = a => a && a.match(/([^\/]+|\/)\/*$/)[1], Va = () => a => crypto.getRandomValues(a), Wa = a => {
  (Wa = Va())(a);
}, Xa = (...a) => {
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
  b = Ra(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, Ya = globalThis.TextDecoder && new TextDecoder(), Za = (a, b, c, d) => {
  c = b + c;
  if (d) {
    return c;
  }
  for (; a[b] && !(b >= c);) {
    ++b;
  }
  return b;
}, $a = (a, b = 0, c, d) => {
  c = Za(a, b, c, d);
  if (16 < c - b && a.buffer && Ya) {
    return Ya.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && Na("Invalid UTF-8 leading byte " + ma(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, ab = [], bb = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, cb = (a, b, c, d) => {
  p("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
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
      1114111 < g && Na("Invalid Unicode code point " + ma(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      b[c++] = 240 | g >> 18;
      b[c++] = 128 | g >> 12 & 63;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
      f++;
    }
  }
  b[c] = 0;
  return c - e;
}, db = a => {
  var b = Array(bb(a) + 1);
  a = cb(a, b, 0, b.length);
  b.length = a;
  return b;
}, eb = [];
function fb(a, b) {
  eb[a] = {input:[], output:[], T:b};
  gb(a, hb);
}
var hb = {open(a) {
  var b = eb[a.node.ma];
  if (!b) {
    throw new H(43);
  }
  a.s = b;
  a.seekable = !1;
}, close(a) {
  a.s.T.ua(a.s);
}, ua(a) {
  a.s.T.ua(a.s);
}, read(a, b, c, d) {
  if (!a.s || !a.s.T.Wa) {
    throw new H(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.s.T.Wa(a.s);
    } catch (k) {
      throw new H(29);
    }
    if (void 0 === g && 0 === e) {
      throw new H(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.Z = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.s || !a.s.T.La) {
    throw new H(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.s.T.La(a.s, b[c + e]);
    }
  } catch (f) {
    throw new H(29);
  }
  d && (a.node.L = a.node.G = Date.now());
  return e;
}}, ib = {Wa() {
  a: {
    if (!ab.length) {
      var a = null;
      globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
      if (!a) {
        a = null;
        break a;
      }
      ab = db(a);
    }
    a = ab.shift();
  }
  return a;
}, La(a, b) {
  null === b || 10 === b ? (ea($a(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, ua(a) {
  0 < a.output?.length && (ea($a(a.output)), a.output = []);
}, Bb() {
  return {ac:25856, cc:5, $b:191, bc:35387, Zb:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, Cb() {
  return 0;
}, Db() {
  return [24, 80];
}}, jb = {La(a, b) {
  null === b || 10 === b ? (q($a(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, ua(a) {
  0 < a.output?.length && (q($a(a.output)), a.output = []);
}}, kb = () => {
  t("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}, J = {N:null, S() {
  return J.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new H(63);
  }
  J.N || (J.N = {dir:{node:{U:J.m.U, R:J.m.R, ia:J.m.ia, Aa:J.m.Aa, gb:J.m.gb, Da:J.m.Da, hb:J.m.hb, Na:J.m.Na, Ba:J.m.Ba}, stream:{M:J.l.M}}, file:{node:{U:J.m.U, R:J.m.R}, stream:{M:J.l.M, read:J.l.read, write:J.l.write, Ka:J.l.Ka, cb:J.l.cb}}, link:{node:{U:J.m.U, R:J.m.R, na:J.m.na}, stream:{}}, Qa:{node:{U:J.m.U, R:J.m.R}, stream:lb}});
  c = mb(a, b, c, d);
  L(c.mode) ? (c.m = J.N.dir.node, c.l = J.N.dir.stream, c.h = {}) : 32768 === (c.mode & 61440) ? (c.m = J.N.file.node, c.l = J.N.file.stream, c.v = 0, c.h = null) : 40960 === (c.mode & 61440) ? (c.m = J.N.link.node, c.l = J.N.link.stream) : 8192 === (c.mode & 61440) && (c.m = J.N.Qa.node, c.l = J.N.Qa.stream);
  c.Z = c.L = c.G = Date.now();
  a && (a.h[b] = c, a.Z = a.L = a.G = c.Z);
  return c;
}, kc(a) {
  return a.h ? a.h.subarray ? a.h.subarray(0, a.v) : new Uint8Array(a.h) : new Uint8Array(0);
}, m:{U(a) {
  var b = {};
  b.dc = 8192 === (a.mode & 61440) ? a.id : 1;
  b.mc = a.id;
  b.mode = a.mode;
  b.qc = 1;
  b.uid = 0;
  b.lc = 0;
  b.ma = a.ma;
  L(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.Z = new Date(a.Z);
  b.L = new Date(a.L);
  b.G = new Date(a.G);
  b.nb = 4096;
  b.Yb = Math.ceil(b.size / b.nb);
  return b;
}, R(a, b) {
  for (var c of ["mode", "atime", "mtime", "ctime"]) {
    null != b[c] && (a[c] = b[c]);
  }
  void 0 !== b.size && (b = b.size, a.v != b && (0 == b ? (a.h = null, a.v = 0) : (c = a.h, a.h = new Uint8Array(b), c && a.h.set(c.subarray(0, Math.min(b, a.v))), a.v = b)));
}, ia() {
  throw new H(44);
}, Aa(a, b, c, d) {
  return J.createNode(a, b, c, d);
}, gb(a, b, c) {
  try {
    var d = nb(b, c);
  } catch (f) {
  }
  if (d) {
    if (L(a.mode)) {
      for (var e in d.h) {
        throw new H(55);
      }
    }
    ob(d);
  }
  delete a.parent.h[a.name];
  b.h[c] = a;
  a.name = c;
  b.G = b.L = a.parent.G = a.parent.L = Date.now();
}, Da(a, b) {
  delete a.h[b];
  a.G = a.L = Date.now();
}, hb(a, b) {
  var c = nb(a, b), d;
  for (d in c.h) {
    throw new H(55);
  }
  delete a.h[b];
  a.G = a.L = Date.now();
}, Na(a) {
  return [".", "..", ...Object.keys(a.h)];
}, Ba(a, b, c) {
  a = J.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, na(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new H(28);
  }
  return a.link;
}}, l:{read(a, b, c, d, e) {
  var f = a.node.h;
  if (e >= a.node.v) {
    return 0;
  }
  a = Math.min(a.node.v - e, d);
  p(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  p(!(b instanceof ArrayBuffer));
  b.buffer === z.buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.L = a.G = Date.now();
  if (b.subarray && (!a.h || a.h.subarray)) {
    if (f) {
      return p(0 === e, "canOwn must imply no weird position inside the file"), a.h = b.subarray(c, c + d), a.v = d;
    }
    if (0 === a.v && 0 === e) {
      return a.h = b.slice(c, c + d), a.v = d;
    }
    if (e + d <= a.v) {
      return a.h.set(b.subarray(c, c + d), e), d;
    }
  }
  f = e + d;
  var g = a.h ? a.h.length : 0;
  g >= f || (f = Math.max(f, g * (1048576 > g ? 2.0 : 1.125) >>> 0), 0 != g && (f = Math.max(f, 256)), g = a.h, a.h = new Uint8Array(f), 0 < a.v && a.h.set(g.subarray(0, a.v), 0));
  if (a.h.subarray && b.subarray) {
    a.h.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.h[e + f] = b[c + f];
    }
  }
  a.v = Math.max(a.v, e + d);
  return d;
}, M(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
  if (0 > b) {
    throw new H(28);
  }
  return b;
}, Ka(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new H(43);
  }
  a = a.node.h;
  if (e & 2 || !a || a.buffer !== z.buffer) {
    d = !0;
    e = kb();
    if (!e) {
      throw new H(48);
    }
    if (a) {
      if (0 < c || c + b < a.length) {
        a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
      }
      z.set(a, e);
    }
  } else {
    d = !1, e = a.byteOffset;
  }
  return {i:e, mb:d};
}, cb(a, b, c, d) {
  J.l.write(a, b, 0, d, c, !1);
  return 0;
}}}, pb = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, M = (a, b, c) => {
  p("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? $a(B, a, b, c) : "";
}, qb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, rb = async a => {
  var b = await ca(a);
  p(b, `Loading data file "${a}" failed (no arrayBuffer).`);
  return new Uint8Array(b);
}, sb = 0, tb = null, ub = {}, vb = null, wb = a => {
  sb--;
  n.monitorRunDependencies?.(sb);
  p(a, "removeRunDependency requires an ID");
  p(ub[a]);
  delete ub[a];
  0 == sb && (null !== vb && (clearInterval(vb), vb = null), tb && (a = tb, tb = null, a()));
}, xb = a => {
  sb++;
  n.monitorRunDependencies?.(sb);
  p(a, "addRunDependency requires an ID");
  p(!ub[a]);
  ub[a] = 1;
  null === vb && globalThis.setInterval && (vb = setInterval(() => {
    if (ha) {
      clearInterval(vb), vb = null;
    } else {
      var b = !1, c;
      for (c in ub) {
        b || (b = !0, q("still waiting on run dependencies:")), q(`dependency: ${c}`);
      }
      b && q("(end of list)");
    }
  }, 10000));
}, yb = [], zb = async(a, b) => {
  if ("undefined" != typeof Browser) {
    var c = Browser;
    w[c.i + 16 >> 2] = 0;
    w[c.i + 4 >> 2] = void 0;
    w[c.i + 8 >> 2] = void 0;
  }
  for (var d of yb) {
    if (d.canHandle(b)) {
      return p("AsyncFunction" === d.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), d.handle(a, b);
    }
  }
  return a;
}, Ab = null, Bb = {}, Cb = [], Db = 1, Eb = null, Fb = !1, Gb = !0, Hb = {}, H = class extends Error {
  name="ErrnoError";
  constructor(a) {
    super(ya ? M(Ib(a)) : "");
    this.K = a;
    for (var b in qb) {
      if (qb[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, Jb = class {
  H={};
  node=null;
  get object() {
    return this.node;
  }
  set object(a) {
    this.node = a;
  }
  get flags() {
    return this.H.flags;
  }
  set flags(a) {
    this.H.flags = a;
  }
  get position() {
    return this.H.position;
  }
  set position(a) {
    this.H.position = a;
  }
}, Kb = class {
  m={};
  l={};
  ka=null;
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.S = a.S;
    this.id = Db++;
    this.name = b;
    this.mode = c;
    this.ma = d;
    this.Z = this.L = this.G = Date.now();
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
  get Fb() {
    return L(this.mode);
  }
  get Eb() {
    return 8192 === (this.mode & 61440);
  }
};
function N(a, b = {}) {
  if (!a) {
    throw new H(44);
  }
  b.Fa ?? (b.Fa = !0);
  "/" === a.charAt(0) || (a = "//" + a);
  var c = 0;
  a: for (; 40 > c; c++) {
    a = a.split("/").filter(k => !!k);
    for (var d = Ab, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) {
        break;
      }
      if ("." !== a[f]) {
        if (".." === a[f]) {
          if (e = Ta(e), d === d.parent) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else {
            d = d.parent;
          }
        } else {
          e = Sa(e + "/" + a[f]);
          try {
            d = nb(d, a[f]);
          } catch (k) {
            if (44 === k?.K && g && b.Kb) {
              return {path:e};
            }
            throw k;
          }
          !d.ka || g && !b.Fa || (d = d.ka.root);
          if (40960 === (d.mode & 61440) && (!g || b.ga)) {
            if (!d.m.na) {
              throw new H(52);
            }
            d = d.m.na(d);
            "/" === d.charAt(0) || (d = Ta(e) + "/" + d);
            a = d + "/" + a.slice(f + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:e, node:d};
  }
  throw new H(32);
}
function Lb(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.S.bb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Mb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Eb.length;
}
function ob(a) {
  var b = Mb(a.parent.id, a.name);
  if (Eb[b] === a) {
    Eb[b] = a.aa;
  } else {
    for (b = Eb[b]; b;) {
      if (b.aa === a) {
        b.aa = a.aa;
        break;
      }
      b = b.aa;
    }
  }
}
function nb(a, b) {
  var c = L(a.mode) ? (c = Nb(a, "x")) ? c : a.m.ia ? 0 : 2 : 54;
  if (c) {
    throw new H(c);
  }
  for (c = Eb[Mb(a.id, b)]; c; c = c.aa) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.m.ia(a, b);
}
function mb(a, b, c, d) {
  p("object" == typeof a);
  a = new Kb(a, b, c, d);
  b = Mb(a.parent.id, a.name);
  a.aa = Eb[b];
  return Eb[b] = a;
}
function L(a) {
  return 16384 === (a & 61440);
}
function Ob(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Nb(a, b) {
  if (Gb) {
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
function Pb(a, b) {
  if (!L(a.mode)) {
    return 54;
  }
  try {
    return nb(a, b), 20;
  } catch (c) {
  }
  return Nb(a, "wx");
}
function Qb(a) {
  a = Cb[a];
  if (!a) {
    throw new H(8);
  }
  return a;
}
function Rb(a, b = -1) {
  p(-1 <= b);
  a = Object.assign(new Jb(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!Cb[b]) {
          break a;
        }
      }
      throw new H(33);
    }
  }
  a.C = b;
  return Cb[b] = a;
}
function Sb(a, b = -1) {
  a = Rb(a, b);
  a.l?.hc?.(a);
  return a;
}
function Tb(a, b) {
  var c = null?.l.R, d = c ? null : a;
  c ??= a.m.R;
  if (!c) {
    throw new H(63);
  }
  c(d, b);
}
var lb = {open(a) {
  a.l = Bb[a.node.ma].l;
  a.l.open?.(a);
}, M() {
  throw new H(70);
}};
function gb(a, b) {
  Bb[a] = {l:b};
}
function Ub(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Ab) {
    throw new H(10);
  }
  if (!c && !d) {
    var e = N(b, {Fa:!1});
    b = e.path;
    e = e.node;
    if (e.ka) {
      throw new H(10);
    }
    if (!L(e.mode)) {
      throw new H(54);
    }
  }
  b = {type:a, rc:{}, bb:b, Jb:[]};
  a = a.S(b);
  a.S = b;
  b.root = a;
  c ? Ab = a : e && (e.ka = b, e.S && e.S.Jb.push(b));
}
function Vb(a, b, c) {
  var d = N(a, {parent:!0}).node;
  a = Ua(a);
  if (!a) {
    throw new H(28);
  }
  if ("." === a || ".." === a) {
    throw new H(20);
  }
  var e = Pb(d, a);
  if (e) {
    throw new H(e);
  }
  if (!d.m.Aa) {
    throw new H(63);
  }
  return d.m.Aa(d, a, b, c);
}
function Wb(a, b = 438) {
  return Vb(a, b & 4095 | 32768, 0);
}
function O(a) {
  return Vb(a, 16895, 0);
}
function Xb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  return Vb(a, b | 8192, c);
}
function Yb(a, b) {
  if (!Xa(a)) {
    throw new H(44);
  }
  var c = N(b, {parent:!0}).node;
  if (!c) {
    throw new H(44);
  }
  b = Ua(b);
  var d = Pb(c, b);
  if (d) {
    throw new H(d);
  }
  if (!c.m.Ba) {
    throw new H(63);
  }
  c.m.Ba(c, b, a);
}
function Zb(a) {
  var b = N(a, {parent:!0}).node;
  if (!b) {
    throw new H(44);
  }
  a = Ua(a);
  var c = nb(b, a);
  a: {
    try {
      var d = nb(b, a);
    } catch (f) {
      d = f.K;
      break a;
    }
    var e = Nb(b, "wx");
    d = e ? e : L(d.mode) ? 31 : 0;
  }
  if (d) {
    throw new H(d);
  }
  if (!b.m.Da) {
    throw new H(63);
  }
  if (c.ka) {
    throw new H(10);
  }
  b.m.Da(b, a);
  ob(c);
}
function $b(a, b) {
  a = "string" == typeof a ? N(a, {ga:!0}).node : a;
  Tb(a, {mode:b & 4095 | a.mode & -4096, G:Date.now(), fc:void 0});
}
function ac(a, b, c = 438) {
  if ("" === a) {
    throw new H(44);
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
    a = N(a, {ga:!(b & 131072), Kb:!0});
    d = a.node;
    a = a.path;
  }
  var f = !1;
  if (b & 64) {
    if (d) {
      if (b & 128) {
        throw new H(20);
      }
    } else {
      if (e) {
        throw new H(31);
      }
      d = Vb(a, c | 511, 0);
      f = !0;
    }
  }
  if (!d) {
    throw new H(44);
  }
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && !L(d.mode)) {
    throw new H(54);
  }
  if (!f && (e = d ? 40960 === (d.mode & 61440) ? 32 : L(d.mode) && ("r" !== Ob(b) || b & 576) ? 31 : Nb(d, Ob(b)) : 44)) {
    throw new H(e);
  }
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? N(e, {ga:!0}).node : e;
    if (L(e.mode)) {
      throw new H(31);
    }
    if (32768 !== (e.mode & 61440)) {
      throw new H(28);
    }
    var g = Nb(e, "w");
    if (g) {
      throw new H(g);
    }
    Tb(e, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Rb({node:d, path:Lb(d), flags:b, seekable:!0, position:0, l:d.l, Wb:[], error:!1});
  e.l.open && e.l.open(e);
  f && $b(d, c & 511);
  !n.logReadFiles || b & 1 || a in Hb || (Hb[a] = 1);
  return e;
}
function bc(a) {
  if (null === a.C) {
    throw new H(8);
  }
  a.Ga && (a.Ga = null);
  try {
    a.l.close && a.l.close(a);
  } catch (b) {
    throw b;
  } finally {
    Cb[a.C] = null;
  }
  a.C = null;
}
function cc(a, b, c) {
  if (null === a.C) {
    throw new H(8);
  }
  if (!a.seekable || !a.l.M) {
    throw new H(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new H(28);
  }
  a.position = a.l.M(a, b, c);
  a.Wb = [];
}
function dc(a, b, c, d, e, f) {
  p(0 <= c);
  if (0 > d || 0 > e) {
    throw new H(28);
  }
  if (null === a.C) {
    throw new H(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new H(8);
  }
  if (L(a.node.mode)) {
    throw new H(31);
  }
  if (!a.l.write) {
    throw new H(28);
  }
  a.seekable && a.flags & 1024 && cc(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new H(70);
  }
  b = a.l.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}
function ec(a) {
  try {
    var b = N(a, {ga:!0});
    a = b.path;
  } catch (d) {
  }
  var c = {Gb:!1, rb:!1, error:0, name:null, path:null, object:null, Mb:!1, Ob:null, Nb:null};
  try {
    b = N(a, {parent:!0}), c.Mb = !0, c.Ob = b.path, c.Nb = b.node, c.name = Ua(a), b = N(a, {ga:!0}), c.rb = !0, c.path = b.path, c.object = b.node, c.name = b.node.name, c.Gb = "/" === b.path;
  } catch (d) {
    c.error = d.K;
  }
  return c;
}
function fc(a, b) {
  a = "string" == typeof a ? a : Lb(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      var d = Sa(a + "/" + c);
      try {
        O(d);
      } catch (e) {
        if (20 != e.K) {
          throw e;
        }
      }
      a = d;
    }
  }
  return d;
}
function gc(a, b, c, d) {
  a = Sa(("string" == typeof a ? a : Lb(a)) + "/" + b);
  return Wb(a, pb(c, d));
}
function hc(a, b, c, d, e, f) {
  var g = b;
  a && (a = "string" == typeof a ? a : Lb(a), g = b ? Sa(a + "/" + b) : a);
  a = pb(d, e);
  g = Wb(g, a);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) {
        b[d] = c.charCodeAt(d);
      }
      c = b;
    }
    $b(g, a | 146);
    b = ac(g, 577);
    dc(b, c, 0, c.length, 0, f);
    bc(b);
    $b(g, a);
  }
}
function P(a, b, c, d) {
  a = Sa(("string" == typeof a ? a : Lb(a)) + "/" + b);
  b = pb(!!c, !!d);
  P.ab ?? (P.ab = 64);
  var e = P.ab++ << 8 | 0;
  gb(e, {open(f) {
    f.seekable = !1;
  }, close() {
    d?.buffer?.length && d(10);
  }, read(f, g, k, l) {
    for (var m = 0, h = 0; h < l; h++) {
      try {
        var r = c();
      } catch (u) {
        throw new H(29);
      }
      if (void 0 === r && 0 === m) {
        throw new H(6);
      }
      if (null === r || void 0 === r) {
        break;
      }
      m++;
      g[k + h] = r;
    }
    m && (f.node.Z = Date.now());
    return m;
  }, write(f, g, k, l) {
    for (var m = 0; m < l; m++) {
      try {
        d(g[k + m]);
      } catch (h) {
        throw new H(29);
      }
    }
    l && (f.node.L = f.node.G = Date.now());
    return m;
  }});
  return Xb(a, b, e);
}
function ic(a) {
  if (!(a.Eb || a.Fb || a.link || a.h)) {
    if (globalThis.XMLHttpRequest) {
      t("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      try {
        a.h = (void 0)(a.url);
      } catch (b) {
        throw new H(29);
      }
    }
  }
}
function jc(a, b, c, d, e) {
  function f(h, r, u, v, y) {
    h = h.node.h;
    if (y >= h.length) {
      return 0;
    }
    v = Math.min(h.length - y, v);
    p(0 <= v);
    if (h.slice) {
      for (var A = 0; A < v; A++) {
        r[u + A] = h[y + A];
      }
    } else {
      for (A = 0; A < v; A++) {
        r[u + A] = h.get(y + A);
      }
    }
    return v;
  }
  class g {
    Ha=!1;
    H=[];
    ha=void 0;
    Ya=0;
    Xa=0;
    get(h) {
      if (!(h > this.length - 1 || 0 > h)) {
        var r = h % this.$a;
        return this.ha(h / this.$a | 0)[r];
      }
    }
    Lb(h) {
      this.ha = h;
    }
    Za() {
      var h = new XMLHttpRequest();
      h.open("HEAD", c, !1);
      h.send(null);
      200 <= h.status && 300 > h.status || 304 === h.status || t("Couldn't load " + c + ". Status: " + h.status);
      var r = Number(h.getResponseHeader("Content-length")), u, v = (u = h.getResponseHeader("Accept-Ranges")) && "bytes" === u;
      h = (u = h.getResponseHeader("Content-Encoding")) && "gzip" === u;
      var y = 1048576;
      v || (y = r);
      var A = this;
      A.Lb(G => {
        var I = G * y, D = (G + 1) * y - 1;
        D = Math.min(D, r - 1);
        if ("undefined" == typeof A.H[G]) {
          var V = A.H;
          I > D && t("invalid range (" + I + ", " + D + ") or no bytes requested!");
          D > r - 1 && t("only " + r + " bytes available! programmer error!");
          var K = new XMLHttpRequest();
          K.open("GET", c, !1);
          r !== y && K.setRequestHeader("Range", "bytes=" + I + "-" + D);
          K.responseType = "arraybuffer";
          K.overrideMimeType && K.overrideMimeType("text/plain; charset=x-user-defined");
          K.send(null);
          200 <= K.status && 300 > K.status || 304 === K.status || t("Couldn't load " + c + ". Status: " + K.status);
          I = void 0 !== K.response ? new Uint8Array(K.response || []) : db(K.responseText || "");
          V[G] = I;
        }
        "undefined" == typeof A.H[G] && t("doXHR failed!");
        return A.H[G];
      });
      if (h || !r) {
        y = r = 1, y = r = this.ha(0).length, ea("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.Ya = r;
      this.Xa = y;
      this.Ha = !0;
    }
    get length() {
      this.Ha || this.Za();
      return this.Ya;
    }
    get $a() {
      this.Ha || this.Za();
      return this.Xa;
    }
  }
  if (globalThis.XMLHttpRequest) {
    t("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
    var k = new g();
    var l = void 0;
  } else {
    l = c, k = void 0;
  }
  var m = gc(a, b, d, e);
  k ? m.h = k : l && (m.h = null, m.url = l);
  Object.defineProperties(m, {v:{get:function() {
    return this.h.length;
  }}});
  a = {};
  for (const [h, r] of Object.entries(m.l)) {
    a[h] = (...u) => {
      ic(m);
      return r(...u);
    };
  }
  a.read = (h, r, u, v, y) => {
    ic(m);
    return f(h, r, u, v, y);
  };
  a.Ka = (h, r, u) => {
    ic(m);
    var v = kb();
    if (!v) {
      throw new H(48);
    }
    f(h, z, v, r, u);
    return {i:v, mb:!0};
  };
  m.l = a;
  return m;
}
var kc = {}, Qa = void 0, lc = {}, mc = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function nc(a) {
  return this.o(w[a >> 2]);
}
var oc = {}, pc = {}, qc = {}, rc = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
}, R = (a, b, c) => {
  function d(k) {
    k = c(k);
    if (k.length !== a.length) {
      throw new rc("Mismatched type converter count");
    }
    for (var l = 0; l < a.length; ++l) {
      Q(a[l], k[l]);
    }
  }
  a.forEach(k => qc[k] = b);
  var e = Array(b.length), f = [], g = 0;
  for (let [k, l] of b.entries()) {
    pc.hasOwnProperty(l) ? e[k] = pc[l] : (f.push(l), oc.hasOwnProperty(l) || (oc[l] = []), oc[l].push(() => {
      e[k] = pc[l];
      ++g;
      g === f.length && d(e);
    }));
  }
  0 === f.length && d(e);
}, S = a => {
  for (var b = "";;) {
    var c = B[a++];
    if (!c) {
      return b;
    }
    b += String.fromCharCode(c);
  }
}, T = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
}, sc = a => {
  throw new T(a);
};
function tc(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new T(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (pc.hasOwnProperty(a)) {
    if (c.yb) {
      return;
    }
    throw new T(`Cannot register type '${d}' twice`);
  }
  pc[a] = b;
  delete qc[a];
  oc.hasOwnProperty(a) && (b = oc[a], delete oc[a], b.forEach(e => e()));
}
function Q(a, b, c = {}) {
  return tc(a, b, c);
}
var uc = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => z[d] : d => B[d];
    case 2:
      return c ? d => C[d >> 1] : d => ta[d >> 1];
    case 4:
      return c ? d => E[d >> 2] : d => w[d >> 2];
    case 8:
      return c ? d => wa[d >> 3] : d => xa[d >> 3];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, vc = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, wc = (a, b, c, d) => {
  if (b < c || b > d) {
    throw new TypeError(`Passing a number "${vc(b)}" from JS side to C/C++ side to an argument of type "${a}", which is outside the valid range [${c}, ${d}]!`);
  }
}, xc = a => {
  throw new T(a.g.u.j.name + " instance already deleted");
}, yc = !1, zc = () => {
}, Ac = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.D) {
    return null;
  }
  a = Ac(a, b, c.D);
  return null === a ? null : c.qb(a);
}, Bc = {}, Cc = {}, Dc = (a, b) => {
  if (void 0 === b) {
    throw new T("ptr should not be undefined");
  }
  for (; a.D;) {
    b = a.qa(b), a = a.D;
  }
  return Cc[b];
}, Fc = (a, b) => {
  if (!b.u || !b.i) {
    throw new rc("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.J !== !!b.A) {
    throw new rc("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return Ec(Object.create(a, {g:{value:b, writable:!0}}));
};
function Gc(a) {
  function b() {
    return this.wa ? Fc(this.j.V, {u:this.Pb, i:c, J:this, A:a}) : Fc(this.j.V, {u:this, i:a});
  }
  var c = this.vb(a);
  if (!c) {
    return this.Sa(a), null;
  }
  var d = Dc(this.j, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.i = c, d.g.A = a, d.clone();
    }
    d = d.clone();
    this.Sa(a);
    return d;
  }
  d = this.j.ub(c);
  d = Bc[d];
  if (!d) {
    return b.call(this);
  }
  d = this.va ? d.ob : d.pointerType;
  var e = Ac(c, this.j, d.j);
  return null === e ? b.call(this) : this.wa ? Fc(d.j.V, {u:d, i:e, J:this, A:a}) : Fc(d.j.V, {u:d, i:e});
}
var Ec = a => {
  if (!globalThis.FinalizationRegistry) {
    return Ec = b => b, a;
  }
  yc = new FinalizationRegistry(b => {
    console.warn(b.Ib);
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.A ? b.J.O(b.A) : b.u.j.O(b.i));
  });
  Ec = b => {
    var c = b.g;
    if (c.A) {
      var d = {g:c};
      c = Error(`Embind found a leaked C++ instance ${c.u.j.name} <${ma(c.i)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(c, Gc);
      d.Ib = c.stack.replace(/^Error: /, "");
      yc.register(b, d, b);
    }
    return b;
  };
  zc = b => {
    yc.unregister(b);
  };
  return Ec(a);
}, Hc = [];
function Ic() {
}
var Jc = (a, b) => Object.defineProperty(b, "name", {value:a}), Kc = (a, b, c) => {
  if (void 0 === a[b].I) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].I.hasOwnProperty(e.length)) {
        throw new T(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].I})!`);
      }
      return a[b].I[e.length].apply(this, e);
    };
    a[b].I = [];
    a[b].I[d.Y] = d;
  }
}, Lc = (a, b) => {
  if (n.hasOwnProperty(a)) {
    throw new T(`Cannot register public name '${a}' twice`);
  }
  n[a] = b;
  n[a].Y = void 0;
}, Mc = a => {
  p("string" === typeof a);
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function Nc(a, b, c, d, e, f, g, k) {
  this.name = a;
  this.constructor = b;
  this.V = c;
  this.O = d;
  this.D = e;
  this.ub = f;
  this.qa = g;
  this.qb = k;
  this.Qb = [];
}
var Oc = (a, b, c) => {
  for (; b !== c;) {
    if (!b.qa) {
      throw new T(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.qa(a);
    b = b.D;
  }
  return a;
};
function Pc(a, b) {
  if (null === b) {
    if (this.Ia) {
      throw new T(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new T(`Cannot pass "${vc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new T(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Oc(b.g.i, b.g.u.j, this.j);
}
function Qc(a, b) {
  if (null === b) {
    if (this.Ia) {
      throw new T(`null is not a valid ${this.name}`);
    }
    if (this.wa) {
      var c = this.Ma();
      null !== a && a.push(this.O, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new T(`Cannot pass "${vc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new T(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.va && b.g.u.va) {
    throw new T(`Cannot convert argument of type ${b.g.J ? b.g.J.name : b.g.u.name} to parameter type ${this.name}`);
  }
  c = Oc(b.g.i, b.g.u.j, this.j);
  if (this.wa) {
    if (void 0 === b.g.A) {
      throw new T("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.Vb) {
      case 0:
        if (b.g.J === this) {
          c = b.g.A;
        } else {
          throw new T(`Cannot convert argument of type ${b.g.J ? b.g.J.name : b.g.u.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        c = b.g.A;
        break;
      case 2:
        if (b.g.J === this) {
          c = b.g.A;
        } else {
          var d = b.clone();
          c = this.Rb(c, Rc(() => d["delete"]()));
          null !== a && a.push(this.O, c);
        }
        break;
      default:
        throw new T("Unsupporting sharing policy");
    }
  }
  return c;
}
function Sc(a, b) {
  if (null === b) {
    if (this.Ia) {
      throw new T(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new T(`Cannot pass "${vc(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new T(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.u.va) {
    throw new T(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
  }
  return Oc(b.g.i, b.g.u.j, this.j);
}
function Tc(a, b, c, d, e, f, g, k, l, m, h) {
  this.name = a;
  this.j = b;
  this.Ia = c;
  this.va = d;
  this.wa = e;
  this.Pb = f;
  this.Vb = g;
  this.fb = k;
  this.Ma = l;
  this.Rb = m;
  this.O = h;
  e || void 0 !== b.D ? this.B = Qc : (this.B = d ? Pc : Sc, this.F = null);
}
var Uc = (a, b) => {
  if (!n.hasOwnProperty(a)) {
    throw new rc("Replacing nonexistent public symbol");
  }
  n[a] = b;
  n[a].Y = void 0;
}, Vc = [], U = (a, b, c = !1) => {
  p(!c, "Async bindings are only supported with JSPI.");
  a = S(a);
  (c = Vc[b]) || (Vc[b] = c = Wc.get(b));
  p(Wc.get(b) == c, "JavaScript-side Wasm function table mirror is out of date!");
  if ("function" != typeof c) {
    throw new T(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
};
class Xc extends Error {
}
var $c = a => {
  a = Yc(a);
  var b = S(a);
  Zc(a);
  return b;
}, ad = (a, b) => {
  function c(f) {
    e[f] || pc[f] || (qc[f] ? qc[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Xc(`${a}: ` + d.map($c).join([", "]));
};
function bd(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].F) {
      return !0;
    }
  }
  return !1;
}
function cd(a, b, c, d, e) {
  (a < b || a > c) && e(`function ${d} called with ${a} arguments, expected ${b == c ? b : `${b} to ${c}`}`);
}
function dd(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new T("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  p(!f, "Async bindings are only supported with JSPI.");
  var k = null !== b[1] && null !== c, l = bd(b);
  c = !b[0].Hb;
  var m = g - 2;
  var h = b.length - 2;
  for (var r = b.length - 1; 2 <= r && b[r].optional; --r) {
    h--;
  }
  r = b[0];
  var u = b[1];
  d = [a, sc, d, e, mc, r.o.bind(r), u?.B.bind(u)];
  for (e = 2; e < g; ++e) {
    r = b[e], d.push(r.B.bind(r));
  }
  if (!l) {
    for (e = k ? 1 : 2; e < b.length; ++e) {
      null !== b[e].F && d.push(b[e].F);
    }
  }
  d.push(cd, h, m);
  l = bd(b);
  m = b.length - 2;
  h = [];
  e = ["fn"];
  k && e.push("thisWired");
  for (g = 0; g < m; ++g) {
    h.push(`arg${g}`), e.push(`arg${g}Wired`);
  }
  h = h.join(",");
  e = e.join(",");
  h = `return function (${h}) {\n` + "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  l && (h += "var destructors = [];\n");
  u = l ? "destructors" : "null";
  r = "humanName throwBindingError invoker fn runDestructors fromRetWire toClassParamWire".split(" ");
  k && (h += `var thisWired = toClassParamWire(${u}, this);\n`);
  for (g = 0; g < m; ++g) {
    var v = `toArg${g}Wire`;
    h += `var arg${g}Wired = ${v}(${u}, arg${g});\n`;
    r.push(v);
  }
  h += (c || f ? "var rv = " : "") + `invoker(${e});\n`;
  if (l) {
    h += "runDestructors(destructors);\n";
  } else {
    for (g = k ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].F && (h += `${f}_dtor(${f});\n`, r.push(`${f}_dtor`));
    }
  }
  c && (h += "var ret = fromRetWire(rv);\nreturn ret;\n");
  h += "}\n";
  r.push("checkArgCount", "minArgs", "maxArgs");
  h = `if (arguments.length !== ${r.length}){ throw new Error(humanName + "Expected ${r.length} closure arguments " + arguments.length + " given."); }\n${h}`;
  b = (new Function(r, h))(...d);
  return Jc(a, b);
}
var fd = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(w[b + 4 * d >> 2]);
  }
  return c;
}, gd = a => {
  a = a.trim();
  const b = a.indexOf("(");
  if (-1 === b) {
    return a;
  }
  p(a.endsWith(")"), "Parentheses for argument names should match.");
  return a.slice(0, b);
}, hd = (a, b, c) => {
  if (!(a instanceof Object)) {
    throw new T(`${c} with invalid "this": ${a}`);
  }
  if (!(a instanceof b.j.constructor)) {
    throw new T(`${c} incompatible with "this" of type ${a.constructor.name}`);
  }
  if (!a.g.i) {
    throw new T(`cannot call emscripten binding method ${c} on deleted object`);
  }
  return Oc(a.g.i, a.g.u.j, b.j);
}, jd = [], kd = [0, 1, , 1, null, 1, !0, 1, !1, 1], Rc = a => {
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
      const b = jd.pop() || kd.length;
      kd[b] = a;
      kd[b + 1] = 1;
      return b;
  }
}, ld = {name:"emscripten::val", o:a => {
  if (!a) {
    throw new T(`Cannot use deleted val. handle = ${a}`);
  }
  p(2 === a || void 0 !== kd[a] && 0 === a % 2, `invalid handle: ${a}`);
  var b = kd[a];
  9 < a && 0 === --kd[a + 1] && (p(void 0 !== kd[a], "Decref for unallocated handle."), kd[a] = void 0, jd.push(a));
  return b;
}, B:(a, b) => Rc(b), P:nc, F:null}, md = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? function(d) {
        return this.o(z[d]);
      } : function(d) {
        return this.o(B[d]);
      };
    case 2:
      return c ? function(d) {
        return this.o(C[d >> 1]);
      } : function(d) {
        return this.o(ta[d >> 1]);
      };
    case 4:
      return c ? function(d) {
        return this.o(E[d >> 2]);
      } : function(d) {
        return this.o(w[d >> 2]);
      };
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, nd = a => {
  var b = pc[a];
  if (void 0 === b) {
    throw a = `${"enum"} has unknown type ${$c(a)}`, new T(a);
  }
  return b;
}, od = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.o(ua[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.o(va[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, pd = (a, b, c) => {
  p("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return cb(a, B, b, c);
}, qd = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, rd = (a, b, c) => {
  p(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  a >>= 1;
  b = Za(ta, a, b / 2, c);
  if (16 < b - a && qd) {
    return qd.decode(ta.subarray(a, b));
  }
  for (c = ""; a < b; ++a) {
    c += String.fromCharCode(ta[a]);
  }
  return c;
}, sd = (a, b, c) => {
  p(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  p("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    C[b >> 1] = a.charCodeAt(e), b += 2;
  }
  C[b >> 1] = 0;
  return b - d;
}, td = a => 2 * a.length, ud = (a, b, c) => {
  p(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var d = "";
  a >>= 2;
  for (var e = 0; !(e >= b / 4); e++) {
    var f = w[a + e];
    if (!f && !c) {
      break;
    }
    d += String.fromCodePoint(f);
  }
  return d;
}, vd = (a, b, c) => {
  p(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  p("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.codePointAt(e);
    65535 < f && e++;
    E[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  E[b >> 2] = 0;
  return b - d;
}, wd = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    65535 < a.codePointAt(c) && c++, b += 4;
  }
  return b;
}, xd = 0, yd = {}, Ad = a => {
  if (!(a instanceof Ha || "unwind" == a)) {
    throw la(), a instanceof WebAssembly.RuntimeError && 0 >= zd() && q("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), a;
  }
}, Bd = a => {
  ia = a;
  Ma || 0 < xd || (n.onExit?.(a), ha = !0);
  throw new Ha(a);
}, Dd = a => {
  if (ha) {
    q("user callback triggered after runtime exited or application aborted.  Ignoring.");
  } else {
    try {
      if (a(), !(Ma || 0 < xd)) {
        try {
          ia = a = ia;
          Cd();
          if (Ma || 0 < xd) {
            var b = `program exited (with status: ${a}), but keepRuntimeAlive() is set (counter=${xd}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
            sa?.(b);
            q(b);
          }
          Bd(a);
        } catch (c) {
          Ad(c);
        }
      }
    } catch (c) {
      Ad(c);
    }
  }
}, Ed = [], Fd = [0, document, window], Gd = a => {
  a = 2 < a ? M(a) : a;
  return Fd[a] || document.querySelector(a);
}, W, Hd = a => {
  var b = "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return (a.getSupportedExtensions() || []).filter(c => b.includes(c));
}, Id = 1, Jd = [], X = [], Kd = [], Y = [], Ld = [], Md = [], Nd = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8], Od = a => {
  for (var b = Id++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  for (; a[b];) {
    b = Id++;
  }
  return b;
}, Qd = (a, b, c, d) => {
  for (var e = 0; e < a; e++) {
    var f = W[c](), g = f && Od(d);
    f ? (f.name = g, d[g] = f) : Pd ||= 1282;
    E[b + 4 * e >> 2] = g;
  }
}, Rd = a => {
  a = 32 - Math.clz32(0 === a ? 0 : a - 1);
  var b = Z.ba[a];
  if (b) {
    return b;
  }
  b = W.getParameter(34965);
  Z.ba[a] = W.createBuffer();
  W.bindBuffer(34963, Z.ba[a]);
  W.bufferData(34963, 1 << a, 35048);
  W.bindBuffer(34963, b);
  return Z.ba[a];
}, Td = a => {
  Sd = !1;
  for (var b = 0; b < Z.Ja; ++b) {
    var c = Z.da[b];
    if (c.sa && c.enabled) {
      Sd = !0;
      var d = c.size;
      var e = c.type, f = c.stride;
      d = 0 < f ? a * f : d * Nd[e - 5120] * a;
      e = 32 - Math.clz32(0 === d ? 0 : d - 1);
      f = Z.ca[e];
      var g = Z.W[e];
      Z.W[e] = Z.W[e] + 1 & 63;
      var k = f[g];
      k ? e = k : (k = W.getParameter(34964), f[g] = W.createBuffer(), W.bindBuffer(34962, f[g]), W.bufferData(34962, 1 << e, 35048), W.bindBuffer(34962, k), e = f[g]);
      W.bindBuffer(34962, e);
      W.bufferSubData(34962, 0, B.subarray(c.i, c.i + d));
      c.kb.call(W, b, c.size, c.type, c.eb, c.stride, 0);
    }
  }
}, Vd = (a, b) => {
  a.H || (a.H = a.getContext, a.getContext = function(d, e) {
    e = a.H(d, e);
    return "webgl" == d == e instanceof WebGLRenderingContext ? e : null;
  });
  var c = a.getContext("webgl2", b);
  return c ? Ud(c, b) : 0;
}, Ud = (a, b) => {
  var c = Od(Md), d = {handle:c, attributes:b, version:b.ja, X:a};
  a.canvas && (a.canvas.lb = d);
  Md[c] = d;
  if ("undefined" == typeof b.Ua || b.Ua) {
    if ((a = d) || (a = Z), !a.zb) {
      a.zb = !0;
      b = a.X;
      b.pc = b.getExtension("WEBGL_multi_draw");
      b.jc = b.getExtension("EXT_polygon_offset_clamp");
      b.ic = b.getExtension("EXT_clip_control");
      b.xc = b.getExtension("WEBGL_polygon_mode");
      b.ec = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
      b.nc = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
      2 <= a.version && (b.Ta = b.getExtension("EXT_disjoint_timer_query_webgl2"));
      if (2 > a.version || !b.Ta) {
        b.Ta = b.getExtension("EXT_disjoint_timer_query");
      }
      for (var e of Hd(b)) {
        e.includes("lose_context") || e.includes("debug") || b.getExtension(e);
      }
    }
  }
  d.Ja = d.X.getParameter(34921);
  d.da = [];
  for (e = 0; e < d.Ja; e++) {
    d.da[e] = {enabled:!1, sa:!1, size:0, type:0, eb:0, stride:0, i:0, kb:null};
  }
  d.W = [];
  d.Ca = [];
  d.W.length = d.Ca.length = 22;
  d.ca = [];
  d.oa = [];
  d.ca.length = d.oa.length = 22;
  d.ba = [];
  d.ba.length = 22;
  for (e = 0; 21 >= e; ++e) {
    d.ba[e] = null;
    d.W[e] = d.Ca[e] = 0;
    d.ca[e] = [];
    d.oa[e] = [];
    a = d.ca[e];
    b = d.oa[e];
    a.length = b.length = 64;
    for (var f = 0; 64 > f; ++f) {
      a[f] = b[f] = null;
    }
  }
  return c;
}, Pd, Z, Sd, Wd = ["default", "low-power", "high-performance"], Xd = {}, Zd = () => {
  if (!Yd) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:aa || "./this.program"}, b;
    for (b in Xd) {
      void 0 === Xd[b] ? delete a[b] : a[b] = Xd[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    Yd = c;
  }
  return Yd;
}, Yd, $d = a => "]" == a.slice(-1) && a.lastIndexOf("["), ae = a => {
  a -= 5120;
  return 0 == a ? z : 1 == a ? B : 2 == a ? C : 4 == a ? E : 6 == a ? ua : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? w : ta;
};
Eb = Array(4096);
Ub(J, "/");
O("/tmp");
O("/home");
O("/home/web_user");
(function() {
  O("/dev");
  gb(259, {read:() => 0, write:(d, e, f, g) => g, M:() => 0});
  Xb("/dev/null", 259);
  fb(1280, ib);
  fb(1536, jb);
  Xb("/dev/tty", 1280);
  Xb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (Wa(a), b = a.byteLength);
    return a[--b];
  };
  P("/dev", "random", c);
  P("/dev", "urandom", c);
  O("/dev/shm");
  O("/dev/shm/tmp");
})();
(function() {
  O("/proc");
  var a = O("/proc/self");
  O("/proc/self/fd");
  Ub({S() {
    var b = mb(a, "fd", 16895, 73);
    b.l = {M:J.l.M};
    b.m = {ia(c, d) {
      c = +d;
      var e = Qb(c);
      c = {parent:null, S:{bb:"fake"}, m:{na:() => e.path}, id:c + 1};
      return c.parent = c;
    }, Na() {
      return Array.from(Cb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
    }};
    return b;
  }}, "/proc/self/fd");
})();
(() => {
  let a = Ic.prototype;
  Object.assign(a, {isAliasOf:function(c) {
    if (!(this instanceof Ic && c instanceof Ic)) {
      return !1;
    }
    var d = this.g.u.j, e = this.g.i;
    c.g = c.g;
    var f = c.g.u.j;
    for (c = c.g.i; d.D;) {
      e = d.qa(e), d = d.D;
    }
    for (; f.D;) {
      c = f.qa(c), f = f.D;
    }
    return d === f && e === c;
  }, clone:function() {
    this.g.i || xc(this);
    if (this.g.la) {
      return this.g.count.value += 1, this;
    }
    var c = Ec, d = Object, e = d.create, f = Object.getPrototypeOf(this), g = this.g;
    c = c(e.call(d, f, {g:{value:{count:g.count, fa:g.fa, la:g.la, i:g.i, u:g.u, A:g.A, J:g.J}}}));
    c.g.count.value += 1;
    c.g.fa = !1;
    return c;
  }, ["delete"]() {
    this.g.i || xc(this);
    if (this.g.fa && !this.g.la) {
      throw new T("Object already scheduled for deletion");
    }
    zc(this);
    var c = this.g;
    --c.count.value;
    0 === c.count.value && (c.A ? c.J.O(c.A) : c.u.j.O(c.i));
    this.g.la || (this.g.A = void 0, this.g.i = void 0);
  }, isDeleted:function() {
    return !this.g.i;
  }, deleteLater:function() {
    this.g.i || xc(this);
    if (this.g.fa && !this.g.la) {
      throw new T("Object already scheduled for deletion");
    }
    Hc.push(this);
    this.g.fa = !0;
    return this;
  }});
  const b = Symbol.dispose;
  b && (a[b] = a["delete"]);
})();
Object.assign(Tc.prototype, {vb(a) {
  this.fb && (a = this.fb(a));
  return a;
}, Sa(a) {
  this.O?.(a);
}, P:nc, o:Gc});
p(10 === kd.length);
var be = () => {
  if (Z) {
    var a = Z.ca;
    Z.ca = Z.oa;
    Z.oa = a;
    a = Z.W;
    Z.W = Z.Ca;
    Z.Ca = a;
    for (a = 0; 21 >= a; ++a) {
      Z.W[a] = 0;
    }
  }
};
"undefined" != typeof MainLoop && MainLoop.sc.push(be);
n.noExitRuntime && (Ma = n.noExitRuntime);
n.preloadPlugins && (yb = n.preloadPlugins);
n.print && (ea = n.print);
n.printErr && (q = n.printErr);
n.wasmBinary && (fa = n.wasmBinary);
Object.getOwnPropertyDescriptor(n, "fetchSettings") && t("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
n.thisProgram && (aa = n.thisProgram);
p("undefined" == typeof n.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof n.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof n.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof n.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof n.read, "Module.read option was removed");
p("undefined" == typeof n.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
p("undefined" == typeof n.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
p("undefined" == typeof n.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
p("undefined" == typeof n.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
p("undefined" == typeof n.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
p("undefined" == typeof n.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
p("undefined" == typeof n.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
p("undefined" == typeof n.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if (n.preInit) {
  for ("function" == typeof n.preInit && (n.preInit = [n.preInit]); 0 < n.preInit.length;) {
    n.preInit.shift()();
  }
}
pa("preInit");
n.addRunDependency = xb;
n.removeRunDependency = wb;
n.FS_preloadFile = async(a, b, c, d, e, f, g, k) => {
  var l = b ? Xa(Sa(a + "/" + b)) : a, m;
  a: {
    for (var h = m = `cp ${l}`;;) {
      if (!ub[m]) {
        break a;
      }
      m = h + Math.random();
    }
  }
  xb(m);
  try {
    h = c, "string" == typeof c && (h = await rb(c)), h = await zb(h, l), k?.(), f || hc(a, b, h, d, e, g);
  } finally {
    wb(m);
  }
};
n.FS_unlink = (...a) => Zb(...a);
n.FS_createPath = (...a) => fc(...a);
n.FS_createDevice = (...a) => P(...a);
n.FS_createDataFile = (...a) => hc(...a);
n.FS_createLazyFile = (...a) => jc(...a);
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr runMainThreadEmAsm autoResumeAudioContext getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop asmjsMangle HandleAllocator addOnInit addOnPostCtor addOnPreMain addOnExit STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags safeSetTimeout setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback emscriptenWebGLGet emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory allocateUTF8 allocateUTF8OnStack demangle stackTrace getNativeTypeSize getFunctionArgsName createJsInvokerSignature PureVirtualError registerInheritedInstance unregisterInheritedInstance getInheritedInstanceCount getLiveInheritedInstances setDelayFunction count_emval_handles getStringOrSymbol emval_returnValue emval_lookupTypes emval_addMethodCaller".split(" ").forEach(function(a) {
  qa(a);
});
"run out err callMain abort wasmExports HEAPF32 HEAPF64 HEAP8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore createNamedFunction ptrToString exitJS getHeapMax growMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray readEmAsmArgs runEmAsmFunction jstoi_q getExecutableName handleException keepRuntimeAlive callUserCallback maybeExit asyncLoad alignMemory mmapAlloc wasmTable wasmMemory getUniqueRunDependency noExitRuntime addOnPreRun addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev initRandomFill randomFill emSetImmediate emClearImmediate_deps emClearImmediate registerPreMainLoop promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia createContext getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType toTypedArrayIndex webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode GL computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos AL GLUT EGL GLEW IDBStore SDL SDL_gfx webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance print printErr jstoi_s InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError EmValType EmValOptionalType throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol embindRepr registeredInstances getBasestPointer getInheritedInstance registeredPointers registerType integerReadValueFromPointer enumReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols Emval emval_methodCallers".split(" ").forEach(qa);
var ce = {110896:() => {
  throw "A böngésződ nem támogatja a WebGL-t!";
}, 110947:a => {
  throw "Sikertelen shader fordítás: " + M(a);
}, 111011:a => {
  throw "Sikertelen shader összekapcsolás: " + M(a);
}, 111081:(a, b) => {
  if (b = document.getElementById(M(b))) {
    b.innerText = a;
  }
}}, Yc = x("___getTypeName"), de = x("_malloc"), Zc = x("_free"), ee = x("_fflush"), ka = x("_emscripten_stack_get_end"), fe = x("__emscripten_timeout"), Ib = x("_strerror"), ge = x("_emscripten_stack_init"), zd = x("_emscripten_stack_get_current"), Aa = x("wasmMemory"), Wc = x("wasmTable"), he = {__cxa_throw:(a, b, c) => {
  a = new Oa(a);
  w[a.i + 16 >> 2] = 0;
  w[a.i + 4 >> 2] = b;
  w[a.i + 8 >> 2] = c;
  Pa++;
  p(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  Qa = c;
  try {
    var d = Qb(a);
    switch(b) {
      case 0:
        var e = F();
        if (0 > e) {
          break;
        }
        for (; Cb[e];) {
          e++;
        }
        return Sb(d, e).C;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = F(), d.flags |= e, 0;
      case 12:
        return e = F(), C[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof kc || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.K;
  }
}, __syscall_ioctl:function(a, b, c) {
  Qa = c;
  try {
    var d = Qb(a);
    switch(b) {
      case 21509:
        return d.s ? 0 : -59;
      case 21505:
        if (!d.s) {
          return -59;
        }
        if (d.s.T.Bb) {
          b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var e = F();
          E[e >> 2] = 25856;
          E[e + 4 >> 2] = 5;
          E[e + 8 >> 2] = 191;
          E[e + 12 >> 2] = 35387;
          for (var f = 0; 32 > f; f++) {
            z[e + f + 17] = b[f] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return d.s ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!d.s) {
          return -59;
        }
        if (d.s.T.Cb) {
          for (e = F(), b = [], f = 0; 32 > f; f++) {
            b.push(z[e + f + 17]);
          }
        }
        return 0;
      case 21519:
        if (!d.s) {
          return -59;
        }
        e = F();
        return E[e >> 2] = 0;
      case 21520:
        return d.s ? -28 : -59;
      case 21537:
      case 21531:
        e = F();
        if (!d.l.Ab) {
          throw new H(59);
        }
        return d.l.Ab(d, b, e);
      case 21523:
        if (!d.s) {
          return -59;
        }
        d.s.T.Db && (f = [24, 80], e = F(), C[e >> 1] = f[0], C[e + 2 >> 1] = f[1]);
        return 0;
      case 21524:
        return d.s ? 0 : -59;
      case 21515:
        return d.s ? 0 : -59;
      default:
        return -28;
    }
  } catch (g) {
    if ("undefined" == typeof kc || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.K;
  }
}, __syscall_openat:function(a, b, c, d) {
  Qa = d;
  try {
    b = M(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : Qb(a).path;
      if (0 == e.length) {
        throw new H(44);
      }
      b = f + "/" + e;
    }
    var g = d ? F() : 0;
    return ac(b, c, g).C;
  } catch (k) {
    if ("undefined" == typeof kc || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.K;
  }
}, _abort_js:() => t("native code called abort()"), _embind_finalize_value_object:a => {
  var b = lc[a];
  delete lc[a];
  var c = b.Ma, d = b.O, e = b.Va, f = e.map(g => g.xb).concat(e.map(g => g.Tb));
  R([a], f, g => {
    var k = {}, l, m;
    for ([l, m] of e.entries()) {
      const h = g[l], r = m.ha, u = m.wb, v = g[l + e.length], y = m.Sb, A = m.Ub;
      k[m.tb] = {read:G => h.o(r(u, G)), write:(G, I) => {
        var D = [];
        y(A, G, v.B(D, I));
        mc(D);
      }, optional:h.optional};
    }
    return [{name:b.name, o:h => {
      var r = {}, u;
      for (u in k) {
        r[u] = k[u].read(h);
      }
      d(h);
      return r;
    }, B:(h, r) => {
      for (var u in k) {
        if (!(u in r || k[u].optional)) {
          throw new TypeError(`Missing field: "${u}"`);
        }
      }
      var v = c();
      for (u in k) {
        k[u].write(v, r[u]);
      }
      null !== h && h.push(d, v);
      return v;
    }, P:nc, F:d}];
  });
}, _embind_register_bigint:(a, b, c, d, e) => {
  b = S(b);
  const f = 0n === d;
  let g = k => k;
  if (f) {
    const k = 8 * c;
    g = l => BigInt.asUintN(k, l);
    e = g(e);
  }
  Q(a, {name:b, o:g, B:(k, l) => {
    if ("number" == typeof l) {
      l = BigInt(l);
    } else if ("bigint" != typeof l) {
      throw new TypeError(`Cannot convert "${vc(l)}" to ${this.name}`);
    }
    wc(b, l, d, e);
    return l;
  }, P:uc(b, c, !f), F:null});
}, _embind_register_bool:(a, b, c, d) => {
  b = S(b);
  Q(a, {name:b, o:function(e) {
    return !!e;
  }, B:function(e, f) {
    return f ? c : d;
  }, P:function(e) {
    return this.o(B[e]);
  }, F:null});
}, _embind_register_class:(a, b, c, d, e, f, g, k, l, m, h, r, u) => {
  h = S(h);
  f = U(e, f);
  k &&= U(g, k);
  m &&= U(l, m);
  u = U(r, u);
  var v = Mc(h);
  Lc(v, function() {
    ad(`Cannot construct ${h} due to unbound types`, [d]);
  });
  R([a, b, c], d ? [d] : [], y => {
    y = y[0];
    if (d) {
      var A = y.j;
      var G = A.V;
    } else {
      G = Ic.prototype;
    }
    y = Jc(h, function(...K) {
      if (Object.getPrototypeOf(this) !== I) {
        throw new T(`Use 'new' to construct ${h}`);
      }
      if (void 0 === D.$) {
        throw new T(`${h} has no accessible constructor`);
      }
      var ed = D.$[K.length];
      if (void 0 === ed) {
        throw new T(`Tried to invoke ctor of ${h} with invalid number of parameters (${K.length}) - expected (${Object.keys(D.$).toString()}) parameters instead!`);
      }
      return ed.apply(this, K);
    });
    var I = Object.create(G, {constructor:{value:y}});
    y.prototype = I;
    var D = new Nc(h, y, I, u, A, f, k, m);
    if (D.D) {
      var V;
      (V = D.D).ra ?? (V.ra = []);
      D.D.ra.push(D);
    }
    A = new Tc(h, D, !0, !1, !1);
    V = new Tc(h + "*", D, !1, !1, !1);
    G = new Tc(h + " const*", D, !1, !0, !1);
    Bc[a] = {pointerType:V, ob:G};
    Uc(v, y);
    return [A, V, G];
  });
}, _embind_register_class_class_function:(a, b, c, d, e, f, g, k) => {
  var l = fd(c, d);
  b = S(b);
  b = gd(b);
  f = U(e, f, k);
  R([], [a], m => {
    function h() {
      ad(`Cannot call ${r} due to unbound types`, l);
    }
    m = m[0];
    var r = `${m.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    var u = m.j.constructor;
    void 0 === u[b] ? (h.Y = c - 1, u[b] = h) : (Kc(u, b, r), u[b].I[c - 1] = h);
    R([], l, v => {
      v = dd(r, [v[0], null].concat(v.slice(1)), null, f, g, k);
      void 0 === u[b].I ? (v.Y = c - 1, u[b] = v) : u[b].I[c - 1] = v;
      if (m.j.ra) {
        for (const y of m.j.ra) {
          y.constructor.hasOwnProperty(b) || (y.constructor[b] = v);
        }
      }
      return [];
    });
    return [];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  p(0 < b);
  var g = fd(b, c);
  e = U(d, e);
  R([], [a], k => {
    k = k[0];
    var l = `constructor ${k.name}`;
    void 0 === k.j.$ && (k.j.$ = []);
    if (void 0 !== k.j.$[b - 1]) {
      throw new T(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    k.j.$[b - 1] = () => {
      ad(`Cannot construct ${k.name} due to unbound types`, g);
    };
    R([], g, m => {
      m.splice(1, 0, null);
      k.j.$[b - 1] = dd(l, m, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, k, l) => {
  var m = fd(c, d);
  b = S(b);
  b = gd(b);
  f = U(e, f, l);
  R([], [a], h => {
    function r() {
      ad(`Cannot call ${u} due to unbound types`, m);
    }
    h = h[0];
    var u = `${h.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    k && h.j.Qb.push(b);
    var v = h.j.V, y = v[b];
    void 0 === y || void 0 === y.I && y.className !== h.name && y.Y === c - 2 ? (r.Y = c - 2, r.className = h.name, v[b] = r) : (Kc(v, b, u), v[b].I[c - 2] = r);
    R([], m, A => {
      A = dd(u, A, h, f, g, l);
      void 0 === v[b].I ? (A.Y = c - 2, v[b] = A) : v[b].I[c - 2] = A;
      return [];
    });
    return [];
  });
}, _embind_register_class_property:(a, b, c, d, e, f, g, k, l, m) => {
  b = S(b);
  e = U(d, e);
  R([], [a], h => {
    h = h[0];
    var r = `${h.name}.${b}`, u = {get() {
      ad(`Cannot access ${r} due to unbound types`, [c, g]);
    }, enumerable:!0, configurable:!0};
    u.set = l ? () => ad(`Cannot access ${r} due to unbound types`, [c, g]) : () => {
      throw new T(r + " is a read-only property");
    };
    Object.defineProperty(h.j.V, b, u);
    R([], l ? [c, g] : [c], v => {
      var y = v[0], A = {get() {
        var I = hd(this, h, r + " getter");
        return y.o(e(f, I));
      }, enumerable:!0};
      if (l) {
        l = U(k, l);
        var G = v[1];
        A.set = function(I) {
          var D = hd(this, h, r + " setter"), V = [];
          l(m, D, G.B(V, I));
          mc(V);
        };
      }
      Object.defineProperty(h.j.V, b, A);
      return [];
    });
    return [];
  });
}, _embind_register_emval:a => Q(a, ld), _embind_register_enum:(a, b, c, d) => {
  function e() {
  }
  b = S(b);
  e.values = {};
  Q(a, {name:b, constructor:e, o:function(f) {
    return this.constructor.values[f];
  }, B:(f, g) => g.value, P:md(b, c, d), F:null});
  Lc(b, e);
}, _embind_register_enum_value:(a, b, c) => {
  var d = nd(a);
  b = S(b);
  a = d.constructor;
  d = Object.create(d.constructor.prototype, {value:{value:c}, constructor:{value:Jc(`${d.name}_${b}`, function() {
  })}});
  a.values[c] = d;
  a[b] = d;
}, _embind_register_float:(a, b, c) => {
  b = S(b);
  Q(a, {name:b, o:d => d, B:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${vc(e)} to ${this.name}`);
    }
    return e;
  }, P:od(b, c), F:null});
}, _embind_register_integer:(a, b, c, d, e) => {
  b = S(b);
  let f = k => k;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = k => k << g >>> g;
    e = f(e);
  }
  Q(a, {name:b, o:f, B:(k, l) => {
    if ("number" != typeof l && "boolean" != typeof l) {
      throw new TypeError(`Cannot convert "${vc(l)}" to ${b}`);
    }
    wc(b, l, d, e);
    return l;
  }, P:uc(b, c, 0 !== d), F:null});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(z.buffer, w[f + 4 >> 2], w[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
  c = S(c);
  Q(a, {name:c, o:d, P:d}, {yb:!0});
}, _embind_register_std_string:(a, b) => {
  b = S(b);
  Q(a, {name:b, o(c) {
    var d = M(c + 4, w[c >> 2], !0);
    Zc(c);
    return d;
  }, B(c, d) {
    d instanceof ArrayBuffer && (d = new Uint8Array(d));
    var e = "string" == typeof d;
    if (!(e || ArrayBuffer.isView(d) && 1 == d.BYTES_PER_ELEMENT)) {
      throw new T("Cannot pass non-string to std::string");
    }
    var f = e ? bb(d) : d.length;
    var g = de(4 + f + 1), k = g + 4;
    w[g >> 2] = f;
    e ? pd(d, k, f + 1) : B.set(d, k);
    null !== c && c.push(Zc, g);
    return g;
  }, P:nc, F(c) {
    Zc(c);
  }});
}, _embind_register_std_wstring:(a, b, c) => {
  c = S(c);
  if (2 === b) {
    var d = rd;
    var e = sd;
    var f = td;
  } else {
    p(4 === b, "only 2-byte and 4-byte strings are currently supported"), d = ud, e = vd, f = wd;
  }
  Q(a, {name:c, o:g => {
    var k = d(g + 4, w[g >> 2] * b, !0);
    Zc(g);
    return k;
  }, B:(g, k) => {
    if ("string" != typeof k) {
      throw new T(`Cannot pass non-string to C++ string type ${c}`);
    }
    var l = f(k), m = de(4 + l + b);
    w[m >> 2] = l / b;
    e(k, m + 4, l + b);
    null !== g && g.push(Zc, m);
    return m;
  }, P:nc, F(g) {
    Zc(g);
  }});
}, _embind_register_value_object:(a, b, c, d, e, f) => {
  lc[a] = {name:S(b), Ma:U(c, d), O:U(e, f), Va:[]};
}, _embind_register_value_object_field:(a, b, c, d, e, f, g, k, l, m) => {
  lc[a].Va.push({tb:S(b), xb:c, ha:U(d, e), wb:f, Tb:g, Sb:U(k, l), Ub:m});
}, _embind_register_void:(a, b) => {
  b = S(b);
  Q(a, {Hb:!0, name:b, o:() => {
  }, B:() => {
  }});
}, _emscripten_fs_load_embedded_files:a => {
  do {
    var b = w[a >> 2];
    a += 4;
    var c = w[a >> 2];
    a += 4;
    var d = w[a >> 2];
    a += 4;
    b = M(b);
    fc("/", Ta(b));
    hc(b, null, z.subarray(d, d + c), !0, !0, !0);
  } while (w[a >> 2]);
}, _emscripten_runtime_keepalive_clear:() => {
  Ma = !1;
  xd = 0;
}, _setitimer_js:(a, b) => {
  yd[a] && (clearTimeout(yd[a].id), delete yd[a]);
  if (!b) {
    return 0;
  }
  var c = setTimeout(() => {
    p(a in yd);
    delete yd[a];
    Dd(() => fe(a, performance.now()));
  }, b);
  yd[a] = {id:c, wc:b};
  return 0;
}, _tzset_js:(a, b, c, d) => {
  var e = (new Date()).getFullYear(), f = (new Date(e, 0, 1)).getTimezoneOffset();
  e = (new Date(e, 6, 1)).getTimezoneOffset();
  w[a >> 2] = 60 * Math.max(f, e);
  E[b >> 2] = Number(f != e);
  b = g => {
    var k = Math.abs(g);
    return `UTC${0 <= g ? "-" : "+"}${String(Math.floor(k / 60)).padStart(2, "0")}${String(k % 60).padStart(2, "0")}`;
  };
  a = b(f);
  b = b(e);
  p(a);
  p(b);
  p(16 >= bb(a), `timezone name truncated to fit in TZNAME_MAX (${a})`);
  p(16 >= bb(b), `timezone name truncated to fit in TZNAME_MAX (${b})`);
  e < f ? (pd(a, c, 17), pd(b, d, 17)) : (pd(a, d, 17), pd(b, c, 17));
}, emscripten_asm_const_int:(a, b, c) => {
  p(Array.isArray(Ed));
  p(0 == c % 16);
  Ed.length = 0;
  for (var d; d = B[b++];) {
    var e = String.fromCharCode(d), f = ["d", "f", "i", "p"];
    f.push("j");
    p(f.includes(e), `Invalid character ${d}("${e}") in readEmAsmArgs! Use only [${f}], and do not specify "v" for void return argument.`);
    e = 105 != d;
    e &= 112 != d;
    c += e && c % 8 ? 4 : 0;
    Ed.push(112 == d ? w[c >> 2] : 106 == d ? wa[c >> 3] : 105 == d ? E[c >> 2] : va[c >> 3]);
    c += e ? 8 : 4;
  }
  p(ce.hasOwnProperty(a), `No EM_ASM constant found at address ${a}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return ce[a](...Ed);
}, emscripten_get_now:() => performance.now(), emscripten_resize_heap:a => {
  var b = B.length;
  a >>>= 0;
  p(a > b);
  if (2147483648 < a) {
    return q(`Cannot enlarge memory, requested ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math, f = e.min;
    d = Math.max(a, d);
    p(65536, "alignment argument is required");
    e = f.call(e, 2147483648, 65536 * Math.ceil(d / 65536));
    a: {
      f = e;
      d = Aa.buffer.byteLength;
      try {
        Aa.grow((f - d + 65535) / 65536 | 0);
        za();
        var g = 1;
        break a;
      } catch (k) {
        q(`growMemory: Attempted to grow heap from ${d} bytes to ${f} bytes, but got error: ${k}`);
      }
      g = void 0;
    }
    if (g) {
      return !0;
    }
  }
  q(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, emscripten_set_canvas_element_size:(a, b, c) => {
  a = Gd(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_webgl_create_context:(a, b) => {
  p(b);
  var c = b >> 2;
  b = {alpha:!!z[b + 0], depth:!!z[b + 1], stencil:!!z[b + 2], antialias:!!z[b + 3], premultipliedAlpha:!!z[b + 4], preserveDrawingBuffer:!!z[b + 5], powerPreference:Wd[E[c + 2]], failIfMajorPerformanceCaveat:!!z[b + 12], ja:E[c + 4], oc:E[c + 5], Ua:z[b + 24], sb:z[b + 25], tc:E[c + 7], vc:z[b + 32]};
  1 !== b.ja && 2 !== b.ja && q(`Invalid WebGL version requested: ${b.ja}`);
  2 !== b.ja && q("WebGL 1 requested but only WebGL 2 is supported (MIN_WEBGL_VERSION is 2)");
  a = Gd(a);
  return !a || b.sb ? 0 : Vd(a, b);
}, emscripten_webgl_destroy_context:a => {
  Z == a && (Z = 0);
  Z === Md[a] && (Z = null);
  "object" == typeof JSEvents && JSEvents.uc(Md[a].X.canvas);
  Md[a]?.X.canvas && (Md[a].X.canvas.lb = void 0);
  Md[a] = null;
}, emscripten_webgl_get_current_context:() => Z ? Z.handle : 0, emscripten_webgl_make_context_current:a => {
  Z = Md[a];
  n.ctx = W = Z?.X;
  return !a || W ? 0 : -5;
}, environ_get:(a, b) => {
  var c = 0, d = 0, e;
  for (e of Zd()) {
    var f = b + c;
    w[a + d >> 2] = f;
    c += pd(e, f, Infinity) + 1;
    d += 4;
  }
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = Zd();
  w[a >> 2] = c.length;
  a = 0;
  for (var d of c) {
    a += bb(d) + 1;
  }
  w[b >> 2] = a;
  return 0;
}, fd_close:function(a) {
  try {
    var b = Qb(a);
    bc(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof kc || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.K;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = Qb(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = w[a >> 2], l = w[a + 4 >> 2];
        a += 8;
        var m = e, h = k, r = l, u = f, v = z;
        p(0 <= h);
        if (0 > r || 0 > u) {
          throw new H(28);
        }
        if (null === m.C) {
          throw new H(8);
        }
        if (1 === (m.flags & 2097155)) {
          throw new H(8);
        }
        if (L(m.node.mode)) {
          throw new H(31);
        }
        if (!m.l.read) {
          throw new H(28);
        }
        var y = "undefined" != typeof u;
        if (!y) {
          u = m.position;
        } else if (!m.seekable) {
          throw new H(70);
        }
        var A = m.l.read(m, v, h, r, u);
        y || (m.position += A);
        var G = A;
        if (0 > G) {
          var I = -1;
          break a;
        }
        b += G;
        if (G < l) {
          break;
        }
        "undefined" != typeof f && (f += G);
      }
      I = b;
    }
    w[d >> 2] = I;
    return 0;
  } catch (D) {
    if ("undefined" == typeof kc || "ErrnoError" !== D.name) {
      throw D;
    }
    return D.K;
  }
}, fd_seek:function(a, b, c, d) {
  b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var e = Qb(a);
    cc(e, b, c);
    wa[d >> 3] = BigInt(e.position);
    e.Ga && 0 === b && 0 === c && (e.Ga = null);
    return 0;
  } catch (f) {
    if ("undefined" == typeof kc || "ErrnoError" !== f.name) {
      throw f;
    }
    return f.K;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = Qb(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = w[a >> 2], l = w[a + 4 >> 2];
        a += 8;
        var m = dc(e, z, k, l, f);
        if (0 > m) {
          var h = -1;
          break a;
        }
        b += m;
        if (m < l) {
          break;
        }
        "undefined" != typeof f && (f += m);
      }
      h = b;
    }
    w[d >> 2] = h;
    return 0;
  } catch (r) {
    if ("undefined" == typeof kc || "ErrnoError" !== r.name) {
      throw r;
    }
    return r.K;
  }
}, glActiveTexture:a => W.activeTexture(a), glAttachShader:(a, b) => {
  W.attachShader(X[a], Y[b]);
}, glBindBuffer:(a, b) => {
  if (b && !Jd[b]) {
    var c = W.createBuffer();
    c.name = b;
    Jd[b] = c;
  }
  34962 == a ? W.ta = b : 34963 == a && (W.ea = b);
  35051 == a ? W.Ra = b : 35052 == a && (W.Ea = b);
  W.bindBuffer(a, Jd[b]);
}, glBindBufferRange:(a, b, c, d, e) => {
  W.bindBufferRange(a, b, Jd[c], d, e);
}, glBindTexture:(a, b) => {
  W.bindTexture(a, Kd[b]);
}, glBindVertexArray:a => {
  W.bindVertexArray(Ld[a]);
  a = W.getParameter(34965);
  W.ea = a ? a.name | 0 : 0;
}, glBufferData:(a, b, c, d) => {
  c && b ? W.bufferData(a, B, d, c, b) : W.bufferData(a, b, d);
}, glBufferSubData:(a, b, c, d) => {
  c && W.bufferSubData(a, b, B, d, c);
}, glClear:a => W.clear(a), glClearColor:(a, b, c, d) => W.clearColor(a, b, c, d), glCompileShader:a => {
  W.compileShader(Y[a]);
}, glCreateProgram:() => {
  var a = Od(X), b = W.createProgram();
  b.name = a;
  b.za = b.xa = b.ya = 0;
  b.Pa = 1;
  X[a] = b;
  return a;
}, glCreateShader:a => {
  var b = Od(Y);
  Y[b] = W.createShader(a);
  return b;
}, glDeleteBuffers:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = E[b + 4 * c >> 2], e = Jd[d];
    e && (W.deleteBuffer(e), e.name = 0, Jd[d] = null, d == W.ta && (W.ta = 0), d == W.ea && (W.ea = 0), d == W.Ra && (W.Ra = 0), d == W.Ea && (W.Ea = 0));
  }
}, glDeleteProgram:a => {
  if (a) {
    var b = X[a];
    b ? (W.deleteProgram(b), b.name = 0, X[a] = null) : Pd ||= 1281;
  }
}, glDeleteShader:a => {
  if (a) {
    var b = Y[a];
    b ? (W.deleteShader(b), Y[a] = null) : Pd ||= 1281;
  }
}, glDeleteTextures:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = E[b + 4 * c >> 2], e = Kd[d];
    e && (W.deleteTexture(e), e.name = 0, Kd[d] = null);
  }
}, glDeleteVertexArrays:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = E[b + 4 * c >> 2];
    W.deleteVertexArray(Ld[d]);
    Ld[d] = null;
  }
}, glDrawElements:(a, b, c, d) => {
  var e = 0;
  if (!W.ea) {
    var f = 1 * Nd[c - 5120] * b;
    var g = Rd(f);
    W.bindBuffer(34963, g);
    W.bufferSubData(34963, 0, B.subarray(d, d + f));
    if (0 < b) {
      for (g = 0; g < Z.Ja; ++g) {
        if (f = Z.da[g], f.sa && f.enabled) {
          switch(c) {
            case 5121:
              e = Uint8Array;
              break;
            case 5123:
              e = Uint16Array;
              break;
            default:
              Pd ||= 1282;
              return;
          }
          e = (new e(B.buffer, d, b)).reduce((k, l) => Math.max(k, l)) + 1;
          break;
        }
      }
    }
    d = 0;
  }
  Td(e);
  W.drawElements(a, b, c, d);
  Sd && W.bindBuffer(34962, Jd[W.ta]);
  W.ea || W.bindBuffer(34963, null);
}, glEnable:a => W.enable(a), glEnableVertexAttribArray:a => {
  Z.da[a].enabled = !0;
  W.enableVertexAttribArray(a);
}, glGenBuffers:(a, b) => {
  Qd(a, b, "createBuffer", Jd);
}, glGenTextures:(a, b) => {
  Qd(a, b, "createTexture", Kd);
}, glGenVertexArrays:(a, b) => {
  Qd(a, b, "createVertexArray", Ld);
}, glGenerateMipmap:a => W.generateMipmap(a), glGetProgramInfoLog:(a, b, c, d) => {
  a = W.getProgramInfoLog(X[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? pd(a, d, b) : 0;
  c && (E[c >> 2] = b);
}, glGetProgramiv:(a, b, c) => {
  if (c) {
    if (a >= Id) {
      Pd ||= 1281;
    } else {
      if (a = X[a], 35716 == b) {
        a = W.getProgramInfoLog(a), null === a && (a = "(unknown error)"), E[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.za) {
          var d = W.getProgramParameter(a, 35718);
          for (b = 0; b < d; ++b) {
            a.za = Math.max(a.za, W.getActiveUniform(a, b).name.length + 1);
          }
        }
        E[c >> 2] = a.za;
      } else if (35722 == b) {
        if (!a.xa) {
          for (d = W.getProgramParameter(a, 35721), b = 0; b < d; ++b) {
            a.xa = Math.max(a.xa, W.getActiveAttrib(a, b).name.length + 1);
          }
        }
        E[c >> 2] = a.xa;
      } else if (35381 == b) {
        if (!a.ya) {
          for (d = W.getProgramParameter(a, 35382), b = 0; b < d; ++b) {
            a.ya = Math.max(a.ya, W.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        E[c >> 2] = a.ya;
      } else {
        E[c >> 2] = W.getProgramParameter(a, b);
      }
    }
  } else {
    Pd ||= 1281;
  }
}, glGetShaderInfoLog:(a, b, c, d) => {
  a = W.getShaderInfoLog(Y[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? pd(a, d, b) : 0;
  c && (E[c >> 2] = b);
}, glGetShaderiv:(a, b, c) => {
  c ? 35716 == b ? (a = W.getShaderInfoLog(Y[a]), null === a && (a = "(unknown error)"), E[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = W.getShaderSource(Y[a]), E[c >> 2] = a ? a.length + 1 : 0) : E[c >> 2] = W.getShaderParameter(Y[a], b) : Pd ||= 1281;
}, glGetUniformBlockIndex:(a, b) => W.getUniformBlockIndex(X[a], M(b)), glGetUniformLocation:(a, b) => {
  b = M(b);
  if (a = X[a]) {
    var c = a, d = c.pa, e = c.jb, f;
    if (!d) {
      c.pa = d = {};
      c.ib = {};
      var g = W.getProgramParameter(c, 35718);
      for (f = 0; f < g; ++f) {
        var k = W.getActiveUniform(c, f);
        var l = k.name;
        k = k.size;
        var m = $d(l);
        m = 0 < m ? l.slice(0, m) : l;
        var h = c.Pa;
        c.Pa += k;
        e[m] = [k, h];
        for (l = 0; l < k; ++l) {
          d[h] = l, c.ib[h++] = m;
        }
      }
    }
    c = a.pa;
    d = 0;
    e = b;
    f = $d(b);
    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
    if ((e = a.jb[e]) && d < e[0] && (d += e[1], c[d] = c[d] || W.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    Pd ||= 1281;
  }
  return -1;
}, glLinkProgram:a => {
  a = X[a];
  W.linkProgram(a);
  a.pa = 0;
  a.jb = {};
}, glShaderSource:(a, b, c, d) => {
  for (var e = "", f = 0; f < b; ++f) {
    e += M(w[c + 4 * f >> 2], d ? w[d + 4 * f >> 2] : void 0);
  }
  W.shaderSource(Y[a], e);
}, glTexImage2D:(a, b, c, d, e, f, g, k, l) => {
  if (W.Ea) {
    W.texImage2D(a, b, c, d, e, f, g, k, l);
  } else {
    if (l) {
      var m = ae(k);
      l >>>= 31 - Math.clz32(m.BYTES_PER_ELEMENT);
      W.texImage2D(a, b, c, d, e, f, g, k, m, l);
    } else {
      if (l) {
        m = ae(k);
        var h = e * (d * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[g - 6402] || 1) * m.BYTES_PER_ELEMENT + 4 - 1 & -4);
        l = m.subarray(l >>> 31 - Math.clz32(m.BYTES_PER_ELEMENT), l + h >>> 31 - Math.clz32(m.BYTES_PER_ELEMENT));
      } else {
        l = null;
      }
      W.texImage2D(a, b, c, d, e, f, g, k, l);
    }
  }
}, glTexParameteri:(a, b, c) => W.texParameteri(a, b, c), glUniform1i:(a, b) => {
  var c = W, d = c.uniform1i;
  var e = W.pb;
  if (e) {
    var f = e.pa[a];
    "number" == typeof f && (e.pa[a] = f = W.getUniformLocation(e, e.ib[a] + (0 < f ? `[${f}]` : "")));
    a = f;
  } else {
    Pd ||= 1282, a = void 0;
  }
  d.call(c, a, b);
}, glUniformBlockBinding:(a, b, c) => {
  a = X[a];
  W.uniformBlockBinding(a, b, c);
}, glUseProgram:a => {
  a = X[a];
  W.useProgram(a);
  W.pb = a;
}, glVertexAttribPointer:(a, b, c, d, e, f) => {
  var g = Z.da[a];
  W.ta ? (g.sa = !1, W.vertexAttribPointer(a, b, c, !!d, e, f)) : (g.size = b, g.type = c, g.eb = d, g.stride = e, g.i = f, g.sa = !0, g.kb = function(k, l, m, h, r, u) {
    this.vertexAttribPointer(k, l, m, h, r, u);
  });
}, glViewport:(a, b, c, d) => W.viewport(a, b, c, d), proc_exit:Bd, textureFromURL:function(a, b, c) {
  let d = Md[c].X, e = new Image(), f = M(b);
  e.onload = function() {
    let g = Kd[a];
    g ? (d.bindTexture(d.TEXTURE_2D, g), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, e), d.generateMipmap(d.TEXTURE_2D), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR_MIPMAP_LINEAR), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR), d.bindTexture(d.TEXTURE_2D, null)) : console.error("Texture failed to load (it no longer exists):\t" + f);
  };
  e.onerror = function() {
    console.error("Texture failed to load:\t" + f);
  };
  e.src = f;
}}, ie;
function je() {
  function a() {
    p(!ie);
    ie = !0;
    n.calledRun = !0;
    if (!ha) {
      p(!ya);
      ya = !0;
      la();
      if (!n.noFSInit && !Fb) {
        p(!Fb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        Fb = !0;
        c ??= n.stdin;
        d ??= n.stdout;
        b ??= n.stderr;
        c ? P("/dev", "stdin", c) : Yb("/dev/tty", "/dev/stdin");
        d ? P("/dev", "stdout", null, d) : Yb("/dev/tty", "/dev/stdout");
        b ? P("/dev", "stderr", null, b) : Yb("/dev/tty1", "/dev/stderr");
        var b = ac("/dev/stdin", 0);
        var c = ac("/dev/stdout", 1);
        var d = ac("/dev/stderr", 1);
        p(0 === b.C, `invalid handle for stdin (${b.C})`);
        p(1 === c.C, `invalid handle for stdout (${c.C})`);
        p(2 === d.C, `invalid handle for stderr (${d.C})`);
      }
      Ca.__wasm_call_ctors();
      Gb = !1;
      ra?.(n);
      n.onRuntimeInitialized?.();
      pa("onRuntimeInitialized");
      p(!n._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      la();
      if (n.postRun) {
        for ("function" == typeof n.postRun && (n.postRun = [n.postRun]); n.postRun.length;) {
          b = n.postRun.shift(), Ja.push(b);
        }
      }
      pa("postRun");
      Ia(Ja);
    }
  }
  if (0 < sb) {
    tb = je;
  } else {
    ge();
    ja();
    if (n.preRun) {
      for ("function" == typeof n.preRun && (n.preRun = [n.preRun]); n.preRun.length;) {
        La();
      }
    }
    pa("preRun");
    Ia(Ka);
    0 < sb ? tb = je : (n.setStatus ? (n.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => n.setStatus(""), 1);
      a();
    }, 1)) : a(), la());
  }
}
function Cd() {
  var a = ea, b = q, c = !1;
  ea = q = () => {
    c = !0;
  };
  try {
    ee(0);
    for (var d of ["stdout", "stderr"]) {
      var e = ec("/dev/" + d);
      if (!e) {
        return;
      }
      eb[e.object.ma]?.output?.length && (c = !0);
    }
  } catch (f) {
  }
  ea = a;
  q = b;
  c && Na("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var Ca;
Ca = await (async function() {
  function a(d) {
    d = Ca = d.exports;
    p("undefined" != typeof d.__getTypeName, "missing Wasm export: __getTypeName");
    Yc = Ba("__getTypeName", 1);
    p("undefined" != typeof d.malloc, "missing Wasm export: malloc");
    de = Ba("malloc", 1);
    p("undefined" != typeof d.free, "missing Wasm export: free");
    Zc = Ba("free", 1);
    p("undefined" != typeof d.fflush, "missing Wasm export: fflush");
    ee = Ba("fflush", 1);
    p("undefined" != typeof d.emscripten_stack_get_end, "missing Wasm export: emscripten_stack_get_end");
    ka = d.emscripten_stack_get_end;
    p("undefined" != typeof d.emscripten_stack_get_base, "missing Wasm export: emscripten_stack_get_base");
    p("undefined" != typeof d._emscripten_timeout, "missing Wasm export: _emscripten_timeout");
    fe = Ba("_emscripten_timeout", 2);
    p("undefined" != typeof d.strerror, "missing Wasm export: strerror");
    Ib = Ba("strerror", 1);
    p("undefined" != typeof d.emscripten_stack_init, "missing Wasm export: emscripten_stack_init");
    ge = d.emscripten_stack_init;
    p("undefined" != typeof d.emscripten_stack_get_free, "missing Wasm export: emscripten_stack_get_free");
    p("undefined" != typeof d._emscripten_stack_restore, "missing Wasm export: _emscripten_stack_restore");
    p("undefined" != typeof d._emscripten_stack_alloc, "missing Wasm export: _emscripten_stack_alloc");
    p("undefined" != typeof d.emscripten_stack_get_current, "missing Wasm export: emscripten_stack_get_current");
    zd = d.emscripten_stack_get_current;
    p("undefined" != typeof d.__cxa_increment_exception_refcount, "missing Wasm export: __cxa_increment_exception_refcount");
    p("undefined" != typeof d.memory, "missing Wasm export: memory");
    Aa = d.memory;
    p("undefined" != typeof d.__indirect_function_table, "missing Wasm export: __indirect_function_table");
    Wc = d.__indirect_function_table;
    za();
    return Ca;
  }
  var b = n, c = {env:he, wasi_snapshot_preview1:he};
  if (n.instantiateWasm) {
    return new Promise((d, e) => {
      try {
        n.instantiateWasm(c, (f, g) => {
          d(a(f, g));
        });
      } catch (f) {
        q(`Module.instantiateWasm callback failed with error: ${f}`), e(f);
      }
    });
  }
  Da ??= n.locateFile ? n.locateFile("terrain.wasm", ba) : ba + "terrain.wasm";
  return function(d) {
    p(n === b, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    b = null;
    return a(d.instance);
  }(await Ga(c));
}());
je();
ya ? moduleRtn = n : moduleRtn = new Promise((a, b) => {
  ra = a;
  sa = b;
});
for (const a of Object.keys(n)) {
  a in moduleArg || Object.defineProperty(moduleArg, a, {configurable:!0, get() {
    t(`Access to module property ('${a}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
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

