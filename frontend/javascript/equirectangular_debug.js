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
  function $humanReadableVersionToPacked$$($str$jscomp$6_vers$$) {
    $str$jscomp$6_vers$$ = $str$jscomp$6_vers$$.split("-")[0];
    for ($str$jscomp$6_vers$$ = $str$jscomp$6_vers$$.split(".").slice(0, 3); 3 > $str$jscomp$6_vers$$.length;) {
      $str$jscomp$6_vers$$.push("00");
    }
    $str$jscomp$6_vers$$ = $str$jscomp$6_vers$$.map($n$jscomp$2$$ => $n$jscomp$2$$.padStart(2, "0"));
    return $str$jscomp$6_vers$$.join("");
  }
  var $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ = "undefined" !== typeof process && process.$versions$?.node ? $humanReadableVersionToPacked$$(process.$versions$.node) : 2147483647;
  if (2147483647 > $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  if (2147483647 > $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$) {
    throw Error(`This emscripten-generated code requires node v${"214748.36.47"} (detected v${[$currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ / 10000 | 0, ($currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ / 100 | 0) % 100, $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ % 100].join(".")})`);
  }
  $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ = "undefined" !== typeof navigator && navigator.userAgent?.includes("Safari/") && navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? $humanReadableVersionToPacked$$(navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : 2147483647;
  if (150000 > $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$) {
    throw Error(`This emscripten-generated code requires Safari v${"15.0.0"} (detected v${$currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$})`);
  }
  $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ = "undefined" !== typeof navigator && navigator.userAgent?.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : 2147483647;
  if (79 > $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$) {
    throw Error(`This emscripten-generated code requires Firefox v79 (detected v${$currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$})`);
  }
  $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$ = "undefined" !== typeof navigator && navigator.userAgent?.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : 2147483647;
  if (85 > $currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$) {
    throw Error(`This emscripten-generated code requires Chrome v85 (detected v${$currentChromeVersion_currentFirefoxVersion_currentNodeVersion_currentSafariVersion$$})`);
  }
})();
var $Module$$ = moduleArg, $thisProgram$$ = "./this.program", $scriptDirectory$$ = "", $readAsync$$;
try {
  $scriptDirectory$$ = (new URL(".", _scriptName)).href;
} catch {
}
if (!globalThis.window && !globalThis.WorkerGlobalScope) {
  throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
}
$readAsync$$ = async $response$jscomp$2_url$jscomp$24$$ => {
  $assert$$(!$isFileURI$$($response$jscomp$2_url$jscomp$24$$), "readAsync does not work with file:// URLs");
  $response$jscomp$2_url$jscomp$24$$ = await fetch($response$jscomp$2_url$jscomp$24$$, {credentials:"same-origin"});
  if ($response$jscomp$2_url$jscomp$24$$.ok) {
    return $response$jscomp$2_url$jscomp$24$$.arrayBuffer();
  }
  throw Error($response$jscomp$2_url$jscomp$24$$.status + " : " + $response$jscomp$2_url$jscomp$24$$.url);
};
var $out$$ = console.log.bind(console), $err$$ = console.error.bind(console);
$assert$$(!0, "worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.");
$assert$$(!0, "node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.");
$assert$$(!0, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var $wasmBinary$$;
globalThis.WebAssembly || $err$$("no native wasm support detected");
var $ABORT$$ = !1;
function $assert$$($condition$jscomp$2$$, $text$jscomp$12$$) {
  $condition$jscomp$2$$ || $abort$$("Assertion failed" + ($text$jscomp$12$$ ? ": " + $text$jscomp$12$$ : ""));
}
var $isFileURI$$ = $filename$jscomp$2$$ => $filename$jscomp$2$$.startsWith("file://");
function $writeStackCookie$$() {
  var $max$$ = $_emscripten_stack_get_end$$();
  $assert$$(0 == ($max$$ & 3));
  0 == $max$$ && ($max$$ += 4);
  $HEAPU32$$[$max$$ >> 2] = 34821223;
  $HEAPU32$$[$max$$ + 4 >> 2] = 2310721022;
  $HEAPU32$$[0] = 1668509029;
}
function $checkStackCookie$$() {
  if (!$ABORT$$) {
    var $max$jscomp$1$$ = $_emscripten_stack_get_end$$();
    0 == $max$jscomp$1$$ && ($max$jscomp$1$$ += 4);
    var $cookie1$$ = $HEAPU32$$[$max$jscomp$1$$ >> 2], $cookie2$$ = $HEAPU32$$[$max$jscomp$1$$ + 4 >> 2];
    34821223 == $cookie1$$ && 2310721022 == $cookie2$$ || $abort$$(`Stack overflow! Stack cookie has been overwritten at ${$ptrToString$$($max$jscomp$1$$)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${$ptrToString$$($cookie2$$)} ${$ptrToString$$($cookie1$$)}`);
    1668509029 != $HEAPU32$$[0] && $abort$$("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var $h16$jscomp$inline_62$$ = new Int16Array(1), $h8$jscomp$inline_63$$ = new Int8Array($h16$jscomp$inline_62$$.buffer);
$h16$jscomp$inline_62$$[0] = 25459;
115 === $h8$jscomp$inline_63$$[0] && 99 === $h8$jscomp$inline_63$$[1] || $abort$$("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
function $consumedModuleProp$$($prop$jscomp$2$$) {
  Object.getOwnPropertyDescriptor($Module$$, $prop$jscomp$2$$) || Object.defineProperty($Module$$, $prop$jscomp$2$$, {configurable:!0, set() {
    $abort$$(`Attempt to set \`Module.${$prop$jscomp$2$$}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function $makeInvalidEarlyAccess$$($name$jscomp$74$$) {
  return () => $assert$$(!1, `call to '${$name$jscomp$74$$}' via reference taken before Wasm module initialization`);
}
function $unexportedRuntimeSymbol$$($sym$jscomp$3$$) {
  Object.getOwnPropertyDescriptor($Module$$, $sym$jscomp$3$$) || Object.defineProperty($Module$$, $sym$jscomp$3$$, {configurable:!0, get() {
    var $msg$$ = `'${$sym$jscomp$3$$}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    "FS_createPath" !== $sym$jscomp$3$$ && "FS_createDataFile" !== $sym$jscomp$3$$ && "FS_createPreloadedFile" !== $sym$jscomp$3$$ && "FS_preloadFile" !== $sym$jscomp$3$$ && "FS_unlink" !== $sym$jscomp$3$$ && "addRunDependency" !== $sym$jscomp$3$$ && "FS_createLazyFile" !== $sym$jscomp$3$$ && "FS_createDevice" !== $sym$jscomp$3$$ && "removeRunDependency" !== $sym$jscomp$3$$ || ($msg$$ += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    $abort$$($msg$$);
  }});
}
var $readyPromiseResolve$$, $readyPromiseReject$$, $HEAP8$$, $HEAPU8$$, $HEAP16$$, $HEAPU16$$, $HEAP32$$, $HEAPU32$$, $HEAPF32$$, $HEAPF64$$, $HEAP64$$, $HEAPU64$$, $runtimeInitialized$$ = !1;
function $updateMemoryViews$$() {
  var $b$jscomp$1$$ = $wasmMemory$$.buffer;
  $HEAP8$$ = new Int8Array($b$jscomp$1$$);
  $HEAP16$$ = new Int16Array($b$jscomp$1$$);
  $Module$$.HEAPU8 = $HEAPU8$$ = new Uint8Array($b$jscomp$1$$);
  $HEAPU16$$ = new Uint16Array($b$jscomp$1$$);
  $HEAP32$$ = new Int32Array($b$jscomp$1$$);
  $HEAPU32$$ = new Uint32Array($b$jscomp$1$$);
  $HEAPF32$$ = new Float32Array($b$jscomp$1$$);
  $HEAPF64$$ = new Float64Array($b$jscomp$1$$);
  $HEAP64$$ = new BigInt64Array($b$jscomp$1$$);
  $HEAPU64$$ = new BigUint64Array($b$jscomp$1$$);
}
$assert$$(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set, "JS engine does not provide full typed array support");
function $abort$$($e$jscomp$7_what$$) {
  $Module$$.onAbort?.($e$jscomp$7_what$$);
  $e$jscomp$7_what$$ = "Aborted(" + $e$jscomp$7_what$$ + ")";
  $err$$($e$jscomp$7_what$$);
  $ABORT$$ = !0;
  $e$jscomp$7_what$$ = new WebAssembly.RuntimeError($e$jscomp$7_what$$);
  $readyPromiseReject$$?.($e$jscomp$7_what$$);
  throw $e$jscomp$7_what$$;
}
function $createExportWrapper$$($name$jscomp$76$$) {
  return (...$args$jscomp$4$$) => {
    $assert$$($runtimeInitialized$$, `native function \`${$name$jscomp$76$$}\` called before runtime initialization`);
    var $f$jscomp$1$$ = $wasmExports$$[$name$jscomp$76$$];
    $assert$$($f$jscomp$1$$, `exported native function \`${$name$jscomp$76$$}\` not found`);
    $assert$$(1 >= $args$jscomp$4$$.length, `native function \`${$name$jscomp$76$$}\` called with ${$args$jscomp$4$$.length} args but expects ${1}`);
    return $f$jscomp$1$$(...$args$jscomp$4$$);
  };
}
var $wasmBinaryFile$$;
async function $getWasmBinary$$($JSCompiler_inline_result$jscomp$0_binaryFile$$) {
  if (!$wasmBinary$$) {
    try {
      var $response$jscomp$3$$ = await $readAsync$$($JSCompiler_inline_result$jscomp$0_binaryFile$$);
      return new Uint8Array($response$jscomp$3$$);
    } catch {
    }
  }
  if ($JSCompiler_inline_result$jscomp$0_binaryFile$$ == $wasmBinaryFile$$ && $wasmBinary$$) {
    $JSCompiler_inline_result$jscomp$0_binaryFile$$ = new Uint8Array($wasmBinary$$);
  } else {
    throw "both async and sync fetching of the wasm failed";
  }
  return $JSCompiler_inline_result$jscomp$0_binaryFile$$;
}
async function $instantiateArrayBuffer$$($binaryFile$jscomp$1$$, $imports$$) {
  try {
    var $binary$$ = await $getWasmBinary$$($binaryFile$jscomp$1$$);
    return await WebAssembly.instantiate($binary$$, $imports$$);
  } catch ($reason$jscomp$9$$) {
    $err$$(`failed to asynchronously prepare wasm: ${$reason$jscomp$9$$}`), $isFileURI$$($binaryFile$jscomp$1$$) && $err$$(`warning: Loading from a file URI (${$binaryFile$jscomp$1$$}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), $abort$$($reason$jscomp$9$$);
  }
}
async function $instantiateAsync$$($imports$jscomp$1$$) {
  var $binaryFile$jscomp$2$$ = $wasmBinaryFile$$;
  if (!$wasmBinary$$) {
    try {
      var $response$jscomp$4$$ = fetch($binaryFile$jscomp$2$$, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming($response$jscomp$4$$, $imports$jscomp$1$$);
    } catch ($reason$jscomp$10$$) {
      $err$$(`wasm streaming compile failed: ${$reason$jscomp$10$$}`), $err$$("falling back to ArrayBuffer instantiation");
    }
  }
  return $instantiateArrayBuffer$$($binaryFile$jscomp$2$$, $imports$jscomp$1$$);
}
var $callRuntimeCallbacks$$ = $callbacks$$ => {
  for (; 0 < $callbacks$$.length;) {
    $callbacks$$.shift()($Module$$);
  }
}, $onPostRuns$$ = [], $onPreRuns$$ = [], $addOnPreRun$$ = () => {
  var $cb$jscomp$1$$ = $Module$$.preRun.shift();
  $onPreRuns$$.push($cb$jscomp$1$$);
}, $ptrToString$$ = $ptr$jscomp$1$$ => {
  $assert$$("number" === typeof $ptr$jscomp$1$$, `ptrToString expects a number, got ${typeof $ptr$jscomp$1$$}`);
  return "0x" + ($ptr$jscomp$1$$ >>> 0).toString(16).padStart(8, "0");
}, $warnOnce$$ = $text$jscomp$13$$ => {
  $warnOnce$$.$shown$ || ($warnOnce$$.$shown$ = {});
  $warnOnce$$.$shown$[$text$jscomp$13$$] || ($warnOnce$$.$shown$[$text$jscomp$13$$] = 1, $err$$($text$jscomp$13$$));
};
class $ExceptionInfo$$ {
  constructor($excPtr$$) {
    this.$ptr$ = $excPtr$$ - 24;
  }
}
var $uncaughtExceptionCount$$ = 0, $syscallGetVarargI$$ = () => {
  $assert$$(void 0 != $SYSCALLS$varargs$$);
  var $ret$$ = $HEAP32$$[+$SYSCALLS$varargs$$ >> 2];
  $SYSCALLS$varargs$$ += 4;
  return $ret$$;
}, $PATH$normalizeArray$$ = ($parts$$, $allowAboveRoot$$) => {
  for (var $up$$ = 0, $i$jscomp$4$$ = $parts$$.length - 1; 0 <= $i$jscomp$4$$; $i$jscomp$4$$--) {
    var $last$$ = $parts$$[$i$jscomp$4$$];
    "." === $last$$ ? $parts$$.splice($i$jscomp$4$$, 1) : ".." === $last$$ ? ($parts$$.splice($i$jscomp$4$$, 1), $up$$++) : $up$$ && ($parts$$.splice($i$jscomp$4$$, 1), $up$$--);
  }
  if ($allowAboveRoot$$) {
    for (; $up$$; $up$$--) {
      $parts$$.unshift("..");
    }
  }
  return $parts$$;
}, $PATH$normalize$$ = $path$jscomp$7$$ => {
  var $isAbsolute$$ = "/" === $path$jscomp$7$$.charAt(0), $trailingSlash$$ = "/" === $path$jscomp$7$$.slice(-1);
  ($path$jscomp$7$$ = $PATH$normalizeArray$$($path$jscomp$7$$.split("/").filter($p$$ => !!$p$$), !$isAbsolute$$).join("/")) || $isAbsolute$$ || ($path$jscomp$7$$ = ".");
  $path$jscomp$7$$ && $trailingSlash$$ && ($path$jscomp$7$$ += "/");
  return ($isAbsolute$$ ? "/" : "") + $path$jscomp$7$$;
}, $PATH$dirname$$ = $path$jscomp$8_root$jscomp$3$$ => {
  var $dir_result$jscomp$3$$ = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec($path$jscomp$8_root$jscomp$3$$).slice(1);
  $path$jscomp$8_root$jscomp$3$$ = $dir_result$jscomp$3$$[0];
  $dir_result$jscomp$3$$ = $dir_result$jscomp$3$$[1];
  if (!$path$jscomp$8_root$jscomp$3$$ && !$dir_result$jscomp$3$$) {
    return ".";
  }
  $dir_result$jscomp$3$$ &&= $dir_result$jscomp$3$$.slice(0, -1);
  return $path$jscomp$8_root$jscomp$3$$ + $dir_result$jscomp$3$$;
}, $initRandomFill$$ = () => $view$jscomp$5$$ => crypto.getRandomValues($view$jscomp$5$$), $randomFill$$ = $view$jscomp$6$$ => {
  ($randomFill$$ = $initRandomFill$$())($view$jscomp$6$$);
}, $PATH_FS$resolve$$ = (...$args$jscomp$5$$) => {
  for (var $resolvedPath$$ = "", $path$jscomp$10_resolvedAbsolute$$ = !1, $i$jscomp$5$$ = $args$jscomp$5$$.length - 1; -1 <= $i$jscomp$5$$ && !$path$jscomp$10_resolvedAbsolute$$; $i$jscomp$5$$--) {
    $path$jscomp$10_resolvedAbsolute$$ = 0 <= $i$jscomp$5$$ ? $args$jscomp$5$$[$i$jscomp$5$$] : "/";
    if ("string" != typeof $path$jscomp$10_resolvedAbsolute$$) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!$path$jscomp$10_resolvedAbsolute$$) {
      return "";
    }
    $resolvedPath$$ = $path$jscomp$10_resolvedAbsolute$$ + "/" + $resolvedPath$$;
    $path$jscomp$10_resolvedAbsolute$$ = "/" === $path$jscomp$10_resolvedAbsolute$$.charAt(0);
  }
  $resolvedPath$$ = $PATH$normalizeArray$$($resolvedPath$$.split("/").filter($p$jscomp$1$$ => !!$p$jscomp$1$$), !$path$jscomp$10_resolvedAbsolute$$).join("/");
  return ($path$jscomp$10_resolvedAbsolute$$ ? "/" : "") + $resolvedPath$$ || ".";
}, $UTF8Decoder$$ = globalThis.TextDecoder && new TextDecoder(), $findStringEnd$$ = ($heapOrArray$$, $idx$$, $maxBytesToRead_maxIdx$$, $ignoreNul$$) => {
  $maxBytesToRead_maxIdx$$ = $idx$$ + $maxBytesToRead_maxIdx$$;
  if ($ignoreNul$$) {
    return $maxBytesToRead_maxIdx$$;
  }
  for (; $heapOrArray$$[$idx$$] && !($idx$$ >= $maxBytesToRead_maxIdx$$);) {
    ++$idx$$;
  }
  return $idx$$;
}, $UTF8ArrayToString$$ = ($heapOrArray$jscomp$1$$, $idx$jscomp$1$$ = 0, $endPtr_maxBytesToRead$jscomp$1$$, $ignoreNul$jscomp$1_str$jscomp$7$$) => {
  $endPtr_maxBytesToRead$jscomp$1$$ = $findStringEnd$$($heapOrArray$jscomp$1$$, $idx$jscomp$1$$, $endPtr_maxBytesToRead$jscomp$1$$, $ignoreNul$jscomp$1_str$jscomp$7$$);
  if (16 < $endPtr_maxBytesToRead$jscomp$1$$ - $idx$jscomp$1$$ && $heapOrArray$jscomp$1$$.buffer && $UTF8Decoder$$) {
    return $UTF8Decoder$$.decode($heapOrArray$jscomp$1$$.subarray($idx$jscomp$1$$, $endPtr_maxBytesToRead$jscomp$1$$));
  }
  for ($ignoreNul$jscomp$1_str$jscomp$7$$ = ""; $idx$jscomp$1$$ < $endPtr_maxBytesToRead$jscomp$1$$;) {
    var $ch_u0$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++];
    if ($ch_u0$$ & 128) {
      var $u1$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
      if (192 == ($ch_u0$$ & 224)) {
        $ignoreNul$jscomp$1_str$jscomp$7$$ += String.fromCharCode(($ch_u0$$ & 31) << 6 | $u1$$);
      } else {
        var $u2$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
        224 == ($ch_u0$$ & 240) ? $ch_u0$$ = ($ch_u0$$ & 15) << 12 | $u1$$ << 6 | $u2$$ : (240 != ($ch_u0$$ & 248) && $warnOnce$$("Invalid UTF-8 leading byte " + $ptrToString$$($ch_u0$$) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), $ch_u0$$ = ($ch_u0$$ & 7) << 18 | $u1$$ << 12 | $u2$$ << 6 | $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63);
        65536 > $ch_u0$$ ? $ignoreNul$jscomp$1_str$jscomp$7$$ += String.fromCharCode($ch_u0$$) : ($ch_u0$$ -= 65536, $ignoreNul$jscomp$1_str$jscomp$7$$ += String.fromCharCode(55296 | $ch_u0$$ >> 10, 56320 | $ch_u0$$ & 1023));
      }
    } else {
      $ignoreNul$jscomp$1_str$jscomp$7$$ += String.fromCharCode($ch_u0$$);
    }
  }
  return $ignoreNul$jscomp$1_str$jscomp$7$$;
}, $FS_stdin_getChar_buffer$$ = [], $lengthBytesUTF8$$ = $str$jscomp$8$$ => {
  for (var $len$$ = 0, $i$jscomp$7$$ = 0; $i$jscomp$7$$ < $str$jscomp$8$$.length; ++$i$jscomp$7$$) {
    var $c$$ = $str$jscomp$8$$.charCodeAt($i$jscomp$7$$);
    127 >= $c$$ ? $len$$++ : 2047 >= $c$$ ? $len$$ += 2 : 55296 <= $c$$ && 57343 >= $c$$ ? ($len$$ += 4, ++$i$jscomp$7$$) : $len$$ += 3;
  }
  return $len$$;
}, $stringToUTF8Array$$ = ($str$jscomp$9$$, $heap$$, $outIdx$$, $endIdx_maxBytesToWrite$$) => {
  $assert$$("string" === typeof $str$jscomp$9$$, `stringToUTF8Array expects a string (got ${typeof $str$jscomp$9$$})`);
  if (!(0 < $endIdx_maxBytesToWrite$$)) {
    return 0;
  }
  var $startIdx$$ = $outIdx$$;
  $endIdx_maxBytesToWrite$$ = $outIdx$$ + $endIdx_maxBytesToWrite$$ - 1;
  for (var $i$jscomp$8$$ = 0; $i$jscomp$8$$ < $str$jscomp$9$$.length; ++$i$jscomp$8$$) {
    var $u$$ = $str$jscomp$9$$.codePointAt($i$jscomp$8$$);
    if (127 >= $u$$) {
      if ($outIdx$$ >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = $u$$;
    } else if (2047 >= $u$$) {
      if ($outIdx$$ + 1 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = 192 | $u$$ >> 6;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
    } else if (65535 >= $u$$) {
      if ($outIdx$$ + 2 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = 224 | $u$$ >> 12;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
    } else {
      if ($outIdx$$ + 3 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      1114111 < $u$$ && $warnOnce$$("Invalid Unicode code point " + $ptrToString$$($u$$) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      $heap$$[$outIdx$$++] = 240 | $u$$ >> 18;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 12 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
      $i$jscomp$8$$++;
    }
  }
  $heap$$[$outIdx$$] = 0;
  return $outIdx$$ - $startIdx$$;
}, $intArrayFromString$$ = $numBytesWritten_stringy$$ => {
  var $u8array$$ = Array($lengthBytesUTF8$$($numBytesWritten_stringy$$) + 1);
  $numBytesWritten_stringy$$ = $stringToUTF8Array$$($numBytesWritten_stringy$$, $u8array$$, 0, $u8array$$.length);
  $u8array$$.length = $numBytesWritten_stringy$$;
  return $u8array$$;
}, $TTY$ttys$$ = [];
function $TTY$register$$($dev$$, $ops$$) {
  $TTY$ttys$$[$dev$$] = {input:[], output:[], $ops$:$ops$$};
  $FS$registerDevice$$($dev$$, $TTY$stream_ops$$);
}
var $TTY$stream_ops$$ = {open($stream$jscomp$4$$) {
  var $tty$$ = $TTY$ttys$$[$stream$jscomp$4$$.node.$rdev$];
  if (!$tty$$) {
    throw new $FS$ErrnoError$$(43);
  }
  $stream$jscomp$4$$.$tty$ = $tty$$;
  $stream$jscomp$4$$.seekable = !1;
}, close($stream$jscomp$5$$) {
  $stream$jscomp$5$$.$tty$.$ops$.$fsync$($stream$jscomp$5$$.$tty$);
}, $fsync$($stream$jscomp$6$$) {
  $stream$jscomp$6$$.$tty$.$ops$.$fsync$($stream$jscomp$6$$.$tty$);
}, read($stream$jscomp$7$$, $buffer$jscomp$18$$, $offset$jscomp$26$$, $length$jscomp$18$$) {
  if (!$stream$jscomp$7$$.$tty$ || !$stream$jscomp$7$$.$tty$.$ops$.$get_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  for (var $bytesRead$$ = 0, $i$jscomp$9$$ = 0; $i$jscomp$9$$ < $length$jscomp$18$$; $i$jscomp$9$$++) {
    try {
      var $result$jscomp$5$$ = $stream$jscomp$7$$.$tty$.$ops$.$get_char$($stream$jscomp$7$$.$tty$);
    } catch ($e$jscomp$9$$) {
      throw new $FS$ErrnoError$$(29);
    }
    if (void 0 === $result$jscomp$5$$ && 0 === $bytesRead$$) {
      throw new $FS$ErrnoError$$(6);
    }
    if (null === $result$jscomp$5$$ || void 0 === $result$jscomp$5$$) {
      break;
    }
    $bytesRead$$++;
    $buffer$jscomp$18$$[$offset$jscomp$26$$ + $i$jscomp$9$$] = $result$jscomp$5$$;
  }
  $bytesRead$$ && ($stream$jscomp$7$$.node.$atime$ = Date.now());
  return $bytesRead$$;
}, write($stream$jscomp$8$$, $buffer$jscomp$19$$, $offset$jscomp$27$$, $length$jscomp$19$$) {
  if (!$stream$jscomp$8$$.$tty$ || !$stream$jscomp$8$$.$tty$.$ops$.$put_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  try {
    for (var $i$jscomp$10$$ = 0; $i$jscomp$10$$ < $length$jscomp$19$$; $i$jscomp$10$$++) {
      $stream$jscomp$8$$.$tty$.$ops$.$put_char$($stream$jscomp$8$$.$tty$, $buffer$jscomp$19$$[$offset$jscomp$27$$ + $i$jscomp$10$$]);
    }
  } catch ($e$jscomp$10$$) {
    throw new $FS$ErrnoError$$(29);
  }
  $length$jscomp$19$$ && ($stream$jscomp$8$$.node.$mtime$ = $stream$jscomp$8$$.node.$ctime$ = Date.now());
  return $i$jscomp$10$$;
}}, $TTY$default_tty_ops$$ = {$get_char$() {
  a: {
    if (!$FS_stdin_getChar_buffer$$.length) {
      var $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ = null;
      globalThis.window?.prompt && ($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ = window.prompt("Input: "), null !== $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ && ($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ += "\n"));
      if (!$JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$) {
        $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ = null;
        break a;
      }
      $FS_stdin_getChar_buffer$$ = $intArrayFromString$$($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$);
    }
    $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$ = $FS_stdin_getChar_buffer$$.shift();
  }
  return $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_67$$;
}, $put_char$($tty$jscomp$2$$, $val$jscomp$1$$) {
  null === $val$jscomp$1$$ || 10 === $val$jscomp$1$$ ? ($out$$($UTF8ArrayToString$$($tty$jscomp$2$$.output)), $tty$jscomp$2$$.output = []) : 0 != $val$jscomp$1$$ && $tty$jscomp$2$$.output.push($val$jscomp$1$$);
}, $fsync$($tty$jscomp$3$$) {
  0 < $tty$jscomp$3$$.output?.length && ($out$$($UTF8ArrayToString$$($tty$jscomp$3$$.output)), $tty$jscomp$3$$.output = []);
}, $ioctl_tcgets$() {
  return {$c_iflag$:25856, $c_oflag$:5, $c_cflag$:191, $c_lflag$:35387, $c_cc$:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, $ioctl_tcsets$() {
  return 0;
}, $ioctl_tiocgwinsz$() {
  return [24, 80];
}}, $TTY$default_tty1_ops$$ = {$put_char$($tty$jscomp$7$$, $val$jscomp$2$$) {
  null === $val$jscomp$2$$ || 10 === $val$jscomp$2$$ ? ($err$$($UTF8ArrayToString$$($tty$jscomp$7$$.output)), $tty$jscomp$7$$.output = []) : 0 != $val$jscomp$2$$ && $tty$jscomp$7$$.output.push($val$jscomp$2$$);
}, $fsync$($tty$jscomp$8$$) {
  0 < $tty$jscomp$8$$.output?.length && ($err$$($UTF8ArrayToString$$($tty$jscomp$8$$.output)), $tty$jscomp$8$$.output = []);
}}, $mmapAlloc$$ = () => {
  $abort$$("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}, $MEMFS$$ = {$ops_table$:null, $mount$() {
  return $MEMFS$$.createNode(null, "/", 16895, 0);
}, createNode($parent$jscomp$4$$, $name$jscomp$77$$, $mode$jscomp$15_node$jscomp$5$$, $dev$jscomp$1$$) {
  if (24576 === ($mode$jscomp$15_node$jscomp$5$$ & 61440) || 4096 === ($mode$jscomp$15_node$jscomp$5$$ & 61440)) {
    throw new $FS$ErrnoError$$(63);
  }
  $MEMFS$$.$ops_table$ || ($MEMFS$$.$ops_table$ = {dir:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, $lookup$:$MEMFS$$.$node_ops$.$lookup$, $mknod$:$MEMFS$$.$node_ops$.$mknod$, $rename$:$MEMFS$$.$node_ops$.$rename$, $unlink$:$MEMFS$$.$node_ops$.$unlink$, $rmdir$:$MEMFS$$.$node_ops$.$rmdir$, $readdir$:$MEMFS$$.$node_ops$.$readdir$, $symlink$:$MEMFS$$.$node_ops$.$symlink$}, stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$}}, file:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, 
  $setattr$:$MEMFS$$.$node_ops$.$setattr$}, stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$, read:$MEMFS$$.$stream_ops$.read, write:$MEMFS$$.$stream_ops$.write, $mmap$:$MEMFS$$.$stream_ops$.$mmap$, $msync$:$MEMFS$$.$stream_ops$.$msync$}}, link:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, $readlink$:$MEMFS$$.$node_ops$.$readlink$}, stream:{}}, $chrdev$:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$}, stream:$FS$chrdev_stream_ops$$}});
  $mode$jscomp$15_node$jscomp$5$$ = $FS$createNode$$($parent$jscomp$4$$, $name$jscomp$77$$, $mode$jscomp$15_node$jscomp$5$$, $dev$jscomp$1$$);
  $FS$isDir$$($mode$jscomp$15_node$jscomp$5$$.mode) ? ($mode$jscomp$15_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.dir.node, $mode$jscomp$15_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.dir.stream, $mode$jscomp$15_node$jscomp$5$$.$contents$ = {}) : 32768 === ($mode$jscomp$15_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$15_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.file.node, $mode$jscomp$15_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.file.stream, $mode$jscomp$15_node$jscomp$5$$.$usedBytes$ = 
  0, $mode$jscomp$15_node$jscomp$5$$.$contents$ = null) : 40960 === ($mode$jscomp$15_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$15_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.link.node, $mode$jscomp$15_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.link.stream) : 8192 === ($mode$jscomp$15_node$jscomp$5$$.mode & 61440) && ($mode$jscomp$15_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.$chrdev$.node, $mode$jscomp$15_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.$chrdev$.stream);
  $mode$jscomp$15_node$jscomp$5$$.$atime$ = $mode$jscomp$15_node$jscomp$5$$.$mtime$ = $mode$jscomp$15_node$jscomp$5$$.$ctime$ = Date.now();
  $parent$jscomp$4$$ && ($parent$jscomp$4$$.$contents$[$name$jscomp$77$$] = $mode$jscomp$15_node$jscomp$5$$, $parent$jscomp$4$$.$atime$ = $parent$jscomp$4$$.$mtime$ = $parent$jscomp$4$$.$ctime$ = $mode$jscomp$15_node$jscomp$5$$.$atime$);
  return $mode$jscomp$15_node$jscomp$5$$;
}, $getFileDataAsTypedArray$($node$jscomp$6$$) {
  return $node$jscomp$6$$.$contents$ ? $node$jscomp$6$$.$contents$.subarray ? $node$jscomp$6$$.$contents$.subarray(0, $node$jscomp$6$$.$usedBytes$) : new Uint8Array($node$jscomp$6$$.$contents$) : new Uint8Array(0);
}, $node_ops$:{$getattr$($node$jscomp$9$$) {
  var $attr$$ = {};
  $attr$$.$dev$ = 8192 === ($node$jscomp$9$$.mode & 61440) ? $node$jscomp$9$$.id : 1;
  $attr$$.$ino$ = $node$jscomp$9$$.id;
  $attr$$.mode = $node$jscomp$9$$.mode;
  $attr$$.$nlink$ = 1;
  $attr$$.uid = 0;
  $attr$$.$gid$ = 0;
  $attr$$.$rdev$ = $node$jscomp$9$$.$rdev$;
  $FS$isDir$$($node$jscomp$9$$.mode) ? $attr$$.size = 4096 : 32768 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.$usedBytes$ : 40960 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.link.length : $attr$$.size = 0;
  $attr$$.$atime$ = new Date($node$jscomp$9$$.$atime$);
  $attr$$.$mtime$ = new Date($node$jscomp$9$$.$mtime$);
  $attr$$.$ctime$ = new Date($node$jscomp$9$$.$ctime$);
  $attr$$.$blksize$ = 4096;
  $attr$$.$blocks$ = Math.ceil($attr$$.size / $attr$$.$blksize$);
  return $attr$$;
}, $setattr$($node$jscomp$10$$, $attr$jscomp$1_newSize$jscomp$inline_70$$) {
  for (var $key$jscomp$39_oldContents$jscomp$inline_72$$ of ["mode", "atime", "mtime", "ctime"]) {
    null != $attr$jscomp$1_newSize$jscomp$inline_70$$[$key$jscomp$39_oldContents$jscomp$inline_72$$] && ($node$jscomp$10$$[$key$jscomp$39_oldContents$jscomp$inline_72$$] = $attr$jscomp$1_newSize$jscomp$inline_70$$[$key$jscomp$39_oldContents$jscomp$inline_72$$]);
  }
  void 0 !== $attr$jscomp$1_newSize$jscomp$inline_70$$.size && ($attr$jscomp$1_newSize$jscomp$inline_70$$ = $attr$jscomp$1_newSize$jscomp$inline_70$$.size, $node$jscomp$10$$.$usedBytes$ != $attr$jscomp$1_newSize$jscomp$inline_70$$ && (0 == $attr$jscomp$1_newSize$jscomp$inline_70$$ ? ($node$jscomp$10$$.$contents$ = null, $node$jscomp$10$$.$usedBytes$ = 0) : ($key$jscomp$39_oldContents$jscomp$inline_72$$ = $node$jscomp$10$$.$contents$, $node$jscomp$10$$.$contents$ = new Uint8Array($attr$jscomp$1_newSize$jscomp$inline_70$$), 
  $key$jscomp$39_oldContents$jscomp$inline_72$$ && $node$jscomp$10$$.$contents$.set($key$jscomp$39_oldContents$jscomp$inline_72$$.subarray(0, Math.min($attr$jscomp$1_newSize$jscomp$inline_70$$, $node$jscomp$10$$.$usedBytes$))), $node$jscomp$10$$.$usedBytes$ = $attr$jscomp$1_newSize$jscomp$inline_70$$)));
}, $lookup$() {
  throw new $FS$ErrnoError$$(44);
}, $mknod$($parent$jscomp$6$$, $name$jscomp$79$$, $mode$jscomp$16$$, $dev$jscomp$2$$) {
  return $MEMFS$$.createNode($parent$jscomp$6$$, $name$jscomp$79$$, $mode$jscomp$16$$, $dev$jscomp$2$$);
}, $rename$($old_node$$, $new_dir$$, $new_name$$) {
  try {
    var $new_node$$ = $FS$lookupNode$$($new_dir$$, $new_name$$);
  } catch ($e$jscomp$11$$) {
  }
  if ($new_node$$) {
    if ($FS$isDir$$($old_node$$.mode)) {
      for (var $i$jscomp$11$$ in $new_node$$.$contents$) {
        throw new $FS$ErrnoError$$(55);
      }
    }
    $FS$hashRemoveNode$$($new_node$$);
  }
  delete $old_node$$.parent.$contents$[$old_node$$.name];
  $new_dir$$.$contents$[$new_name$$] = $old_node$$;
  $old_node$$.name = $new_name$$;
  $new_dir$$.$ctime$ = $new_dir$$.$mtime$ = $old_node$$.parent.$ctime$ = $old_node$$.parent.$mtime$ = Date.now();
}, $unlink$($parent$jscomp$7$$, $name$jscomp$80$$) {
  delete $parent$jscomp$7$$.$contents$[$name$jscomp$80$$];
  $parent$jscomp$7$$.$ctime$ = $parent$jscomp$7$$.$mtime$ = Date.now();
}, $rmdir$($parent$jscomp$8$$, $name$jscomp$81$$) {
  var $node$jscomp$11$$ = $FS$lookupNode$$($parent$jscomp$8$$, $name$jscomp$81$$), $i$jscomp$12$$;
  for ($i$jscomp$12$$ in $node$jscomp$11$$.$contents$) {
    throw new $FS$ErrnoError$$(55);
  }
  delete $parent$jscomp$8$$.$contents$[$name$jscomp$81$$];
  $parent$jscomp$8$$.$ctime$ = $parent$jscomp$8$$.$mtime$ = Date.now();
}, $readdir$($node$jscomp$12$$) {
  return [".", "..", ...Object.keys($node$jscomp$12$$.$contents$)];
}, $symlink$($node$jscomp$13_parent$jscomp$9$$, $newname$$, $oldpath$$) {
  $node$jscomp$13_parent$jscomp$9$$ = $MEMFS$$.createNode($node$jscomp$13_parent$jscomp$9$$, $newname$$, 41471, 0);
  $node$jscomp$13_parent$jscomp$9$$.link = $oldpath$$;
  return $node$jscomp$13_parent$jscomp$9$$;
}, $readlink$($node$jscomp$14$$) {
  if (40960 !== ($node$jscomp$14$$.mode & 61440)) {
    throw new $FS$ErrnoError$$(28);
  }
  return $node$jscomp$14$$.link;
}}, $stream_ops$:{read($size$jscomp$22_stream$jscomp$9$$, $buffer$jscomp$20$$, $offset$jscomp$28$$, $i$jscomp$13_length$jscomp$20$$, $position$jscomp$1$$) {
  var $contents$jscomp$2$$ = $size$jscomp$22_stream$jscomp$9$$.node.$contents$;
  if ($position$jscomp$1$$ >= $size$jscomp$22_stream$jscomp$9$$.node.$usedBytes$) {
    return 0;
  }
  $size$jscomp$22_stream$jscomp$9$$ = Math.min($size$jscomp$22_stream$jscomp$9$$.node.$usedBytes$ - $position$jscomp$1$$, $i$jscomp$13_length$jscomp$20$$);
  $assert$$(0 <= $size$jscomp$22_stream$jscomp$9$$);
  if (8 < $size$jscomp$22_stream$jscomp$9$$ && $contents$jscomp$2$$.subarray) {
    $buffer$jscomp$20$$.set($contents$jscomp$2$$.subarray($position$jscomp$1$$, $position$jscomp$1$$ + $size$jscomp$22_stream$jscomp$9$$), $offset$jscomp$28$$);
  } else {
    for ($i$jscomp$13_length$jscomp$20$$ = 0; $i$jscomp$13_length$jscomp$20$$ < $size$jscomp$22_stream$jscomp$9$$; $i$jscomp$13_length$jscomp$20$$++) {
      $buffer$jscomp$20$$[$offset$jscomp$28$$ + $i$jscomp$13_length$jscomp$20$$] = $contents$jscomp$2$$[$position$jscomp$1$$ + $i$jscomp$13_length$jscomp$20$$];
    }
  }
  return $size$jscomp$22_stream$jscomp$9$$;
}, write($node$jscomp$15_stream$jscomp$10$$, $buffer$jscomp$21$$, $offset$jscomp$29$$, $length$jscomp$21$$, $position$jscomp$2$$, $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$) {
  $assert$$(!($buffer$jscomp$21$$ instanceof ArrayBuffer));
  $buffer$jscomp$21$$.buffer === $HEAP8$$.buffer && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ = !1);
  if (!$length$jscomp$21$$) {
    return 0;
  }
  $node$jscomp$15_stream$jscomp$10$$ = $node$jscomp$15_stream$jscomp$10$$.node;
  $node$jscomp$15_stream$jscomp$10$$.$mtime$ = $node$jscomp$15_stream$jscomp$10$$.$ctime$ = Date.now();
  if ($buffer$jscomp$21$$.subarray && (!$node$jscomp$15_stream$jscomp$10$$.$contents$ || $node$jscomp$15_stream$jscomp$10$$.$contents$.subarray)) {
    if ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$) {
      return $assert$$(0 === $position$jscomp$2$$, "canOwn must imply no weird position inside the file"), $node$jscomp$15_stream$jscomp$10$$.$contents$ = $buffer$jscomp$21$$.subarray($offset$jscomp$29$$, $offset$jscomp$29$$ + $length$jscomp$21$$), $node$jscomp$15_stream$jscomp$10$$.$usedBytes$ = $length$jscomp$21$$;
    }
    if (0 === $node$jscomp$15_stream$jscomp$10$$.$usedBytes$ && 0 === $position$jscomp$2$$) {
      return $node$jscomp$15_stream$jscomp$10$$.$contents$ = $buffer$jscomp$21$$.slice($offset$jscomp$29$$, $offset$jscomp$29$$ + $length$jscomp$21$$), $node$jscomp$15_stream$jscomp$10$$.$usedBytes$ = $length$jscomp$21$$;
    }
    if ($position$jscomp$2$$ + $length$jscomp$21$$ <= $node$jscomp$15_stream$jscomp$10$$.$usedBytes$) {
      return $node$jscomp$15_stream$jscomp$10$$.$contents$.set($buffer$jscomp$21$$.subarray($offset$jscomp$29$$, $offset$jscomp$29$$ + $length$jscomp$21$$), $position$jscomp$2$$), $length$jscomp$21$$;
    }
  }
  $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ = $position$jscomp$2$$ + $length$jscomp$21$$;
  var $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ = $node$jscomp$15_stream$jscomp$10$$.$contents$ ? $node$jscomp$15_stream$jscomp$10$$.$contents$.length : 0;
  $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ >= $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ || ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ = Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$, $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ * (1048576 > $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ ? 2.0 : 1.125) >>> 0), 0 != $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ = 
  Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$, 256)), $oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$ = $node$jscomp$15_stream$jscomp$10$$.$contents$, $node$jscomp$15_stream$jscomp$10$$.$contents$ = new Uint8Array($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$), 0 < $node$jscomp$15_stream$jscomp$10$$.$usedBytes$ && $node$jscomp$15_stream$jscomp$10$$.$contents$.set($oldContents$jscomp$inline_78_prevCapacity$jscomp$inline_77$$.subarray(0, $node$jscomp$15_stream$jscomp$10$$.$usedBytes$), 
  0));
  if ($node$jscomp$15_stream$jscomp$10$$.$contents$.subarray && $buffer$jscomp$21$$.subarray) {
    $node$jscomp$15_stream$jscomp$10$$.$contents$.set($buffer$jscomp$21$$.subarray($offset$jscomp$29$$, $offset$jscomp$29$$ + $length$jscomp$21$$), $position$jscomp$2$$);
  } else {
    for ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ = 0; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$ < $length$jscomp$21$$; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$++) {
      $node$jscomp$15_stream$jscomp$10$$.$contents$[$position$jscomp$2$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$] = $buffer$jscomp$21$$[$offset$jscomp$29$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_75$$];
    }
  }
  $node$jscomp$15_stream$jscomp$10$$.$usedBytes$ = Math.max($node$jscomp$15_stream$jscomp$10$$.$usedBytes$, $position$jscomp$2$$ + $length$jscomp$21$$);
  return $length$jscomp$21$$;
}, $llseek$($stream$jscomp$11$$, $offset$jscomp$30_position$jscomp$3$$, $whence$$) {
  1 === $whence$$ ? $offset$jscomp$30_position$jscomp$3$$ += $stream$jscomp$11$$.position : 2 === $whence$$ && 32768 === ($stream$jscomp$11$$.node.mode & 61440) && ($offset$jscomp$30_position$jscomp$3$$ += $stream$jscomp$11$$.node.$usedBytes$);
  if (0 > $offset$jscomp$30_position$jscomp$3$$) {
    throw new $FS$ErrnoError$$(28);
  }
  return $offset$jscomp$30_position$jscomp$3$$;
}, $mmap$($contents$jscomp$3_stream$jscomp$12$$, $length$jscomp$22$$, $position$jscomp$4$$, $allocated_prot$$, $flags$jscomp$6_ptr$jscomp$4$$) {
  if (32768 !== ($contents$jscomp$3_stream$jscomp$12$$.node.mode & 61440)) {
    throw new $FS$ErrnoError$$(43);
  }
  $contents$jscomp$3_stream$jscomp$12$$ = $contents$jscomp$3_stream$jscomp$12$$.node.$contents$;
  if ($flags$jscomp$6_ptr$jscomp$4$$ & 2 || !$contents$jscomp$3_stream$jscomp$12$$ || $contents$jscomp$3_stream$jscomp$12$$.buffer !== $HEAP8$$.buffer) {
    $allocated_prot$$ = !0;
    $flags$jscomp$6_ptr$jscomp$4$$ = $mmapAlloc$$();
    if (!$flags$jscomp$6_ptr$jscomp$4$$) {
      throw new $FS$ErrnoError$$(48);
    }
    if ($contents$jscomp$3_stream$jscomp$12$$) {
      if (0 < $position$jscomp$4$$ || $position$jscomp$4$$ + $length$jscomp$22$$ < $contents$jscomp$3_stream$jscomp$12$$.length) {
        $contents$jscomp$3_stream$jscomp$12$$.subarray ? $contents$jscomp$3_stream$jscomp$12$$ = $contents$jscomp$3_stream$jscomp$12$$.subarray($position$jscomp$4$$, $position$jscomp$4$$ + $length$jscomp$22$$) : $contents$jscomp$3_stream$jscomp$12$$ = Array.prototype.slice.call($contents$jscomp$3_stream$jscomp$12$$, $position$jscomp$4$$, $position$jscomp$4$$ + $length$jscomp$22$$);
      }
      $HEAP8$$.set($contents$jscomp$3_stream$jscomp$12$$, $flags$jscomp$6_ptr$jscomp$4$$);
    }
  } else {
    $allocated_prot$$ = !1, $flags$jscomp$6_ptr$jscomp$4$$ = $contents$jscomp$3_stream$jscomp$12$$.byteOffset;
  }
  return {$ptr$:$flags$jscomp$6_ptr$jscomp$4$$, $allocated$:$allocated_prot$$};
}, $msync$($stream$jscomp$13$$, $buffer$jscomp$22$$, $offset$jscomp$31$$, $length$jscomp$23$$) {
  $MEMFS$$.$stream_ops$.write($stream$jscomp$13$$, $buffer$jscomp$22$$, 0, $length$jscomp$23$$, $offset$jscomp$31$$, !1);
  return 0;
}}}, $FS_getMode$$ = ($canRead$$, $canWrite$$) => {
  var $mode$jscomp$17$$ = 0;
  $canRead$$ && ($mode$jscomp$17$$ |= 365);
  $canWrite$$ && ($mode$jscomp$17$$ |= 146);
  return $mode$jscomp$17$$;
}, $UTF8ToString$$ = ($ptr$jscomp$5$$, $maxBytesToRead$jscomp$2$$, $ignoreNul$jscomp$2$$) => {
  $assert$$("number" == typeof $ptr$jscomp$5$$, `UTF8ToString expects a number (got ${typeof $ptr$jscomp$5$$})`);
  return $ptr$jscomp$5$$ ? $UTF8ArrayToString$$($HEAPU8$$, $ptr$jscomp$5$$, $maxBytesToRead$jscomp$2$$, $ignoreNul$jscomp$2$$) : "";
}, $ERRNO_CODES$$ = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, 
EL2HLT:112, EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, 
ECONNRESET:15, ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, $asyncLoad$$ = async $url$jscomp$25$$ => {
  var $arrayBuffer$$ = await $readAsync$$($url$jscomp$25$$);
  $assert$$($arrayBuffer$$, `Loading data file "${$url$jscomp$25$$}" failed (no arrayBuffer).`);
  return new Uint8Array($arrayBuffer$$);
}, $runDependencies$$ = 0, $dependenciesFulfilled$$ = null, $runDependencyTracking$$ = {}, $runDependencyWatcher$$ = null, $removeRunDependency$$ = $callback$jscomp$58_id$jscomp$7$$ => {
  $runDependencies$$--;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($callback$jscomp$58_id$jscomp$7$$, "removeRunDependency requires an ID");
  $assert$$($runDependencyTracking$$[$callback$jscomp$58_id$jscomp$7$$]);
  delete $runDependencyTracking$$[$callback$jscomp$58_id$jscomp$7$$];
  0 == $runDependencies$$ && (null !== $runDependencyWatcher$$ && (clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null), $dependenciesFulfilled$$ && ($callback$jscomp$58_id$jscomp$7$$ = $dependenciesFulfilled$$, $dependenciesFulfilled$$ = null, $callback$jscomp$58_id$jscomp$7$$()));
}, $addRunDependency$$ = $id$jscomp$8$$ => {
  $runDependencies$$++;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($id$jscomp$8$$, "addRunDependency requires an ID");
  $assert$$(!$runDependencyTracking$$[$id$jscomp$8$$]);
  $runDependencyTracking$$[$id$jscomp$8$$] = 1;
  null === $runDependencyWatcher$$ && globalThis.setInterval && ($runDependencyWatcher$$ = setInterval(() => {
    if ($ABORT$$) {
      clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null;
    } else {
      var $shown$$ = !1, $dep$$;
      for ($dep$$ in $runDependencyTracking$$) {
        $shown$$ || ($shown$$ = !0, $err$$("still waiting on run dependencies:")), $err$$(`dependency: ${$dep$$}`);
      }
      $shown$$ && $err$$("(end of list)");
    }
  }, 10000));
}, $preloadPlugins$$ = [], $FS_handledByPreloadPlugin$$ = async($byteArray$$, $fullname$$) => {
  if ("undefined" != typeof Browser) {
    var $JSCompiler_StaticMethods_init$self$jscomp$inline_80$$ = Browser;
    $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_80$$.$ptr$ + 16 >> 2] = 0;
    $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_80$$.$ptr$ + 4 >> 2] = void 0;
    $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_80$$.$ptr$ + 8 >> 2] = void 0;
  }
  for (var $plugin$$ of $preloadPlugins$$) {
    if ($plugin$$.canHandle($fullname$$)) {
      return $assert$$("AsyncFunction" === $plugin$$.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), $plugin$$.handle($byteArray$$, $fullname$$);
    }
  }
  return $byteArray$$;
}, $FS$root$$ = null, $FS$devices$$ = {}, $FS$streams$$ = [], $FS$nextInode$$ = 1, $FS$nameTable$$ = null, $FS$initialized$$ = !1, $FS$ignorePermissions$$ = !0, $FS$readFiles$$ = {}, $FS$ErrnoError$$ = class extends Error {
  name="ErrnoError";
  constructor($errno$jscomp$1$$) {
    super($runtimeInitialized$$ ? $UTF8ToString$$($_strerror$$($errno$jscomp$1$$)) : "");
    this.$errno$ = $errno$jscomp$1$$;
    for (var $key$jscomp$40$$ in $ERRNO_CODES$$) {
      if ($ERRNO_CODES$$[$key$jscomp$40$$] === $errno$jscomp$1$$) {
        this.code = $key$jscomp$40$$;
        break;
      }
    }
  }
}, $FS$FSStream$$ = class {
  $g$={};
  node=null;
  get flags() {
    return this.$g$.flags;
  }
  set flags($val$jscomp$4$$) {
    this.$g$.flags = $val$jscomp$4$$;
  }
  get position() {
    return this.$g$.position;
  }
  set position($val$jscomp$5$$) {
    this.$g$.position = $val$jscomp$5$$;
  }
}, $FS$FSNode$$ = class {
  $node_ops$={};
  $stream_ops$={};
  $mounted$=null;
  constructor($parent$jscomp$12$$, $name$jscomp$84$$, $mode$jscomp$18$$, $rdev$$) {
    $parent$jscomp$12$$ ||= this;
    this.parent = $parent$jscomp$12$$;
    this.$mount$ = $parent$jscomp$12$$.$mount$;
    this.id = $FS$nextInode$$++;
    this.name = $name$jscomp$84$$;
    this.mode = $mode$jscomp$18$$;
    this.$rdev$ = $rdev$$;
    this.$atime$ = this.$mtime$ = this.$ctime$ = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read($val$jscomp$6$$) {
    $val$jscomp$6$$ ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write($val$jscomp$7$$) {
    $val$jscomp$7$$ ? this.mode |= 146 : this.mode &= -147;
  }
  get $isFolder$() {
    return $FS$isDir$$(this.mode);
  }
  get $isDevice$() {
    return 8192 === (this.mode & 61440);
  }
};
function $FS$lookupPath$$($parts$jscomp$1_path$jscomp$11$$, $opts$$ = {}) {
  if (!$parts$jscomp$1_path$jscomp$11$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $opts$$.$follow_mount$ ?? ($opts$$.$follow_mount$ = !0);
  "/" === $parts$jscomp$1_path$jscomp$11$$.charAt(0) || ($parts$jscomp$1_path$jscomp$11$$ = "//" + $parts$jscomp$1_path$jscomp$11$$);
  var $nlinks$$ = 0;
  a: for (; 40 > $nlinks$$; $nlinks$$++) {
    $parts$jscomp$1_path$jscomp$11$$ = $parts$jscomp$1_path$jscomp$11$$.split("/").filter($p$jscomp$2$$ => !!$p$jscomp$2$$);
    for (var $current_link$$ = $FS$root$$, $current_path$$ = "/", $i$jscomp$15$$ = 0; $i$jscomp$15$$ < $parts$jscomp$1_path$jscomp$11$$.length; $i$jscomp$15$$++) {
      var $islast$$ = $i$jscomp$15$$ === $parts$jscomp$1_path$jscomp$11$$.length - 1;
      if ($islast$$ && $opts$$.parent) {
        break;
      }
      if ("." !== $parts$jscomp$1_path$jscomp$11$$[$i$jscomp$15$$]) {
        if (".." === $parts$jscomp$1_path$jscomp$11$$[$i$jscomp$15$$]) {
          if ($current_path$$ = $PATH$dirname$$($current_path$$), $current_link$$ === $current_link$$.parent) {
            $parts$jscomp$1_path$jscomp$11$$ = $current_path$$ + "/" + $parts$jscomp$1_path$jscomp$11$$.slice($i$jscomp$15$$ + 1).join("/");
            $nlinks$$--;
            continue a;
          } else {
            $current_link$$ = $current_link$$.parent;
          }
        } else {
          $current_path$$ = $PATH$normalize$$($current_path$$ + "/" + $parts$jscomp$1_path$jscomp$11$$[$i$jscomp$15$$]);
          try {
            $current_link$$ = $FS$lookupNode$$($current_link$$, $parts$jscomp$1_path$jscomp$11$$[$i$jscomp$15$$]);
          } catch ($e$jscomp$12$$) {
            if (44 === $e$jscomp$12$$?.$errno$ && $islast$$ && $opts$$.$noent_okay$) {
              return {path:$current_path$$};
            }
            throw $e$jscomp$12$$;
          }
          !$current_link$$.$mounted$ || $islast$$ && !$opts$$.$follow_mount$ || ($current_link$$ = $current_link$$.$mounted$.root);
          if (40960 === ($current_link$$.mode & 61440) && (!$islast$$ || $opts$$.$follow$)) {
            if (!$current_link$$.$node_ops$.$readlink$) {
              throw new $FS$ErrnoError$$(52);
            }
            $current_link$$ = $current_link$$.$node_ops$.$readlink$($current_link$$);
            "/" === $current_link$$.charAt(0) || ($current_link$$ = $PATH$dirname$$($current_path$$) + "/" + $current_link$$);
            $parts$jscomp$1_path$jscomp$11$$ = $current_link$$ + "/" + $parts$jscomp$1_path$jscomp$11$$.slice($i$jscomp$15$$ + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:$current_path$$, node:$current_link$$};
  }
  throw new $FS$ErrnoError$$(32);
}
function $FS$getPath$$($mount$jscomp$1_node$jscomp$16$$) {
  for (var $path$jscomp$12$$;;) {
    if ($mount$jscomp$1_node$jscomp$16$$ === $mount$jscomp$1_node$jscomp$16$$.parent) {
      return $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.$mount$.$mountpoint$, $path$jscomp$12$$ ? "/" !== $mount$jscomp$1_node$jscomp$16$$[$mount$jscomp$1_node$jscomp$16$$.length - 1] ? `${$mount$jscomp$1_node$jscomp$16$$}/${$path$jscomp$12$$}` : $mount$jscomp$1_node$jscomp$16$$ + $path$jscomp$12$$ : $mount$jscomp$1_node$jscomp$16$$;
    }
    $path$jscomp$12$$ = $path$jscomp$12$$ ? `${$mount$jscomp$1_node$jscomp$16$$.name}/${$path$jscomp$12$$}` : $mount$jscomp$1_node$jscomp$16$$.name;
    $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.parent;
  }
}
function $FS$hashName$$($parentid$$, $name$jscomp$85$$) {
  for (var $hash$$ = 0, $i$jscomp$16$$ = 0; $i$jscomp$16$$ < $name$jscomp$85$$.length; $i$jscomp$16$$++) {
    $hash$$ = ($hash$$ << 5) - $hash$$ + $name$jscomp$85$$.charCodeAt($i$jscomp$16$$) | 0;
  }
  return ($parentid$$ + $hash$$ >>> 0) % $FS$nameTable$$.length;
}
function $FS$hashRemoveNode$$($node$jscomp$18$$) {
  var $current$jscomp$1_hash$jscomp$2$$ = $FS$hashName$$($node$jscomp$18$$.parent.id, $node$jscomp$18$$.name);
  if ($FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] === $node$jscomp$18$$) {
    $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] = $node$jscomp$18$$.$name_next$;
  } else {
    for ($current$jscomp$1_hash$jscomp$2$$ = $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$]; $current$jscomp$1_hash$jscomp$2$$;) {
      if ($current$jscomp$1_hash$jscomp$2$$.$name_next$ === $node$jscomp$18$$) {
        $current$jscomp$1_hash$jscomp$2$$.$name_next$ = $node$jscomp$18$$.$name_next$;
        break;
      }
      $current$jscomp$1_hash$jscomp$2$$ = $current$jscomp$1_hash$jscomp$2$$.$name_next$;
    }
  }
}
function $FS$lookupNode$$($parent$jscomp$13$$, $name$jscomp$86$$) {
  var $errCode_errCode$jscomp$inline_85_node$jscomp$19$$ = $FS$isDir$$($parent$jscomp$13$$.mode) ? ($errCode_errCode$jscomp$inline_85_node$jscomp$19$$ = $FS$nodePermissions$$($parent$jscomp$13$$, "x")) ? $errCode_errCode$jscomp$inline_85_node$jscomp$19$$ : $parent$jscomp$13$$.$node_ops$.$lookup$ ? 0 : 2 : 54;
  if ($errCode_errCode$jscomp$inline_85_node$jscomp$19$$) {
    throw new $FS$ErrnoError$$($errCode_errCode$jscomp$inline_85_node$jscomp$19$$);
  }
  for ($errCode_errCode$jscomp$inline_85_node$jscomp$19$$ = $FS$nameTable$$[$FS$hashName$$($parent$jscomp$13$$.id, $name$jscomp$86$$)]; $errCode_errCode$jscomp$inline_85_node$jscomp$19$$; $errCode_errCode$jscomp$inline_85_node$jscomp$19$$ = $errCode_errCode$jscomp$inline_85_node$jscomp$19$$.$name_next$) {
    var $nodeName$$ = $errCode_errCode$jscomp$inline_85_node$jscomp$19$$.name;
    if ($errCode_errCode$jscomp$inline_85_node$jscomp$19$$.parent.id === $parent$jscomp$13$$.id && $nodeName$$ === $name$jscomp$86$$) {
      return $errCode_errCode$jscomp$inline_85_node$jscomp$19$$;
    }
  }
  return $parent$jscomp$13$$.$node_ops$.$lookup$($parent$jscomp$13$$, $name$jscomp$86$$);
}
function $FS$createNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_88_name$jscomp$87$$, $mode$jscomp$19$$, $rdev$jscomp$1$$) {
  $assert$$("object" == typeof $node$jscomp$20_parent$jscomp$14$$);
  $node$jscomp$20_parent$jscomp$14$$ = new $FS$FSNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_88_name$jscomp$87$$, $mode$jscomp$19$$, $rdev$jscomp$1$$);
  $hash$jscomp$inline_88_name$jscomp$87$$ = $FS$hashName$$($node$jscomp$20_parent$jscomp$14$$.parent.id, $node$jscomp$20_parent$jscomp$14$$.name);
  $node$jscomp$20_parent$jscomp$14$$.$name_next$ = $FS$nameTable$$[$hash$jscomp$inline_88_name$jscomp$87$$];
  return $FS$nameTable$$[$hash$jscomp$inline_88_name$jscomp$87$$] = $node$jscomp$20_parent$jscomp$14$$;
}
function $FS$isDir$$($mode$jscomp$21$$) {
  return 16384 === ($mode$jscomp$21$$ & 61440);
}
function $FS$flagsToPermissionString$$($flag$jscomp$1$$) {
  var $perms$$ = ["r", "w", "rw"][$flag$jscomp$1$$ & 3];
  $flag$jscomp$1$$ & 512 && ($perms$$ += "w");
  return $perms$$;
}
function $FS$nodePermissions$$($node$jscomp$24$$, $perms$jscomp$1$$) {
  if ($FS$ignorePermissions$$) {
    return 0;
  }
  if (!$perms$jscomp$1$$.includes("r") || $node$jscomp$24$$.mode & 292) {
    if ($perms$jscomp$1$$.includes("w") && !($node$jscomp$24$$.mode & 146) || $perms$jscomp$1$$.includes("x") && !($node$jscomp$24$$.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function $FS$mayCreate$$($dir$jscomp$2$$, $name$jscomp$88$$) {
  if (!$FS$isDir$$($dir$jscomp$2$$.mode)) {
    return 54;
  }
  try {
    return $FS$lookupNode$$($dir$jscomp$2$$, $name$jscomp$88$$), 20;
  } catch ($e$jscomp$13$$) {
  }
  return $FS$nodePermissions$$($dir$jscomp$2$$, "wx");
}
function $FS$getStreamChecked$$($fd$jscomp$1_stream$jscomp$14$$) {
  $fd$jscomp$1_stream$jscomp$14$$ = $FS$streams$$[$fd$jscomp$1_stream$jscomp$14$$];
  if (!$fd$jscomp$1_stream$jscomp$14$$) {
    throw new $FS$ErrnoError$$(8);
  }
  return $fd$jscomp$1_stream$jscomp$14$$;
}
function $FS$createStream$$($stream$jscomp$15$$, $fd$jscomp$3_fd$jscomp$inline_90$$ = -1) {
  $assert$$(-1 <= $fd$jscomp$3_fd$jscomp$inline_90$$);
  $stream$jscomp$15$$ = Object.assign(new $FS$FSStream$$(), $stream$jscomp$15$$);
  if (-1 == $fd$jscomp$3_fd$jscomp$inline_90$$) {
    a: {
      for ($fd$jscomp$3_fd$jscomp$inline_90$$ = 0; 4096 >= $fd$jscomp$3_fd$jscomp$inline_90$$; $fd$jscomp$3_fd$jscomp$inline_90$$++) {
        if (!$FS$streams$$[$fd$jscomp$3_fd$jscomp$inline_90$$]) {
          break a;
        }
      }
      throw new $FS$ErrnoError$$(33);
    }
  }
  $stream$jscomp$15$$.$fd$ = $fd$jscomp$3_fd$jscomp$inline_90$$;
  return $FS$streams$$[$fd$jscomp$3_fd$jscomp$inline_90$$] = $stream$jscomp$15$$;
}
function $FS$dupStream$$($origStream_stream$jscomp$16$$, $fd$jscomp$5$$ = -1) {
  $origStream_stream$jscomp$16$$ = $FS$createStream$$($origStream_stream$jscomp$16$$, $fd$jscomp$5$$);
  $origStream_stream$jscomp$16$$.$stream_ops$?.$dup$?.($origStream_stream$jscomp$16$$);
  return $origStream_stream$jscomp$16$$;
}
function $FS$doSetAttr$$($node$jscomp$28$$, $attr$jscomp$2$$) {
  var $setattr$$ = null?.$stream_ops$.$setattr$, $arg$jscomp$8$$ = $setattr$$ ? null : $node$jscomp$28$$;
  $setattr$$ ??= $node$jscomp$28$$.$node_ops$.$setattr$;
  if (!$setattr$$) {
    throw new $FS$ErrnoError$$(63);
  }
  $setattr$$($arg$jscomp$8$$, $attr$jscomp$2$$);
}
var $FS$chrdev_stream_ops$$ = {open($stream$jscomp$18$$) {
  $stream$jscomp$18$$.$stream_ops$ = $FS$devices$$[$stream$jscomp$18$$.node.$rdev$].$stream_ops$;
  $stream$jscomp$18$$.$stream_ops$.open?.($stream$jscomp$18$$);
}, $llseek$() {
  throw new $FS$ErrnoError$$(70);
}};
function $FS$registerDevice$$($dev$jscomp$5$$, $ops$jscomp$1$$) {
  $FS$devices$$[$dev$jscomp$5$$] = {$stream_ops$:$ops$jscomp$1$$};
}
function $FS$mount$$($mountRoot_type$jscomp$171$$, $mount$jscomp$4_mountpoint$$) {
  if ("string" == typeof $mountRoot_type$jscomp$171$$) {
    throw $mountRoot_type$jscomp$171$$;
  }
  var $root$jscomp$4$$ = "/" === $mount$jscomp$4_mountpoint$$, $pseudo$$ = !$mount$jscomp$4_mountpoint$$;
  if ($root$jscomp$4$$ && $FS$root$$) {
    throw new $FS$ErrnoError$$(10);
  }
  if (!$root$jscomp$4$$ && !$pseudo$$) {
    var $lookup_node$jscomp$29$$ = $FS$lookupPath$$($mount$jscomp$4_mountpoint$$, {$follow_mount$:!1});
    $mount$jscomp$4_mountpoint$$ = $lookup_node$jscomp$29$$.path;
    $lookup_node$jscomp$29$$ = $lookup_node$jscomp$29$$.node;
    if ($lookup_node$jscomp$29$$.$mounted$) {
      throw new $FS$ErrnoError$$(10);
    }
    if (!$FS$isDir$$($lookup_node$jscomp$29$$.mode)) {
      throw new $FS$ErrnoError$$(54);
    }
  }
  $mount$jscomp$4_mountpoint$$ = {type:$mountRoot_type$jscomp$171$$, $opts$:{}, $mountpoint$:$mount$jscomp$4_mountpoint$$, $mounts$:[]};
  $mountRoot_type$jscomp$171$$ = $mountRoot_type$jscomp$171$$.$mount$($mount$jscomp$4_mountpoint$$);
  $mountRoot_type$jscomp$171$$.$mount$ = $mount$jscomp$4_mountpoint$$;
  $mount$jscomp$4_mountpoint$$.root = $mountRoot_type$jscomp$171$$;
  $root$jscomp$4$$ ? $FS$root$$ = $mountRoot_type$jscomp$171$$ : $lookup_node$jscomp$29$$ && ($lookup_node$jscomp$29$$.$mounted$ = $mount$jscomp$4_mountpoint$$, $lookup_node$jscomp$29$$.$mount$ && $lookup_node$jscomp$29$$.$mount$.$mounts$.push($mount$jscomp$4_mountpoint$$));
}
function $FS$mknod$$($name$jscomp$91_path$jscomp$13$$, $mode$jscomp$27$$, $dev$jscomp$7$$) {
  var $parent$jscomp$16$$ = $FS$lookupPath$$($name$jscomp$91_path$jscomp$13$$, {parent:!0}).node;
  $name$jscomp$91_path$jscomp$13$$ = $name$jscomp$91_path$jscomp$13$$ && $name$jscomp$91_path$jscomp$13$$.match(/([^\/]+|\/)\/*$/)[1];
  if (!$name$jscomp$91_path$jscomp$13$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if ("." === $name$jscomp$91_path$jscomp$13$$ || ".." === $name$jscomp$91_path$jscomp$13$$) {
    throw new $FS$ErrnoError$$(20);
  }
  var $errCode$jscomp$5$$ = $FS$mayCreate$$($parent$jscomp$16$$, $name$jscomp$91_path$jscomp$13$$);
  if ($errCode$jscomp$5$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$5$$);
  }
  if (!$parent$jscomp$16$$.$node_ops$.$mknod$) {
    throw new $FS$ErrnoError$$(63);
  }
  return $parent$jscomp$16$$.$node_ops$.$mknod$($parent$jscomp$16$$, $name$jscomp$91_path$jscomp$13$$, $mode$jscomp$27$$, $dev$jscomp$7$$);
}
function $FS$create$$($path$jscomp$15$$, $mode$jscomp$28$$ = 438) {
  return $FS$mknod$$($path$jscomp$15$$, $mode$jscomp$28$$ & 4095 | 32768, 0);
}
function $FS$mkdir$$($path$jscomp$16$$) {
  return $FS$mknod$$($path$jscomp$16$$, 16895, 0);
}
function $FS$mkdev$$($path$jscomp$18$$, $mode$jscomp$31$$, $dev$jscomp$8$$) {
  "undefined" == typeof $dev$jscomp$8$$ && ($dev$jscomp$8$$ = $mode$jscomp$31$$, $mode$jscomp$31$$ = 438);
  return $FS$mknod$$($path$jscomp$18$$, $mode$jscomp$31$$ | 8192, $dev$jscomp$8$$);
}
function $FS$symlink$$($oldpath$jscomp$1$$, $newname$jscomp$1_newpath$$) {
  if (!$PATH_FS$resolve$$($oldpath$jscomp$1$$)) {
    throw new $FS$ErrnoError$$(44);
  }
  var $parent$jscomp$17$$ = $FS$lookupPath$$($newname$jscomp$1_newpath$$, {parent:!0}).node;
  if (!$parent$jscomp$17$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $newname$jscomp$1_newpath$$ = $newname$jscomp$1_newpath$$ && $newname$jscomp$1_newpath$$.match(/([^\/]+|\/)\/*$/)[1];
  var $errCode$jscomp$6$$ = $FS$mayCreate$$($parent$jscomp$17$$, $newname$jscomp$1_newpath$$);
  if ($errCode$jscomp$6$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$6$$);
  }
  if (!$parent$jscomp$17$$.$node_ops$.$symlink$) {
    throw new $FS$ErrnoError$$(63);
  }
  $parent$jscomp$17$$.$node_ops$.$symlink$($parent$jscomp$17$$, $newname$jscomp$1_newpath$$, $oldpath$jscomp$1$$);
}
function $FS$unlink$$($name$jscomp$93_path$jscomp$21$$) {
  var $parent$jscomp$19$$ = $FS$lookupPath$$($name$jscomp$93_path$jscomp$21$$, {parent:!0}).node;
  if (!$parent$jscomp$19$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $name$jscomp$93_path$jscomp$21$$ = $name$jscomp$93_path$jscomp$21$$ && $name$jscomp$93_path$jscomp$21$$.match(/([^\/]+|\/)\/*$/)[1];
  var $node$jscomp$34$$ = $FS$lookupNode$$($parent$jscomp$19$$, $name$jscomp$93_path$jscomp$21$$);
  a: {
    try {
      var $errCode$jscomp$9_node$jscomp$inline_381$$ = $FS$lookupNode$$($parent$jscomp$19$$, $name$jscomp$93_path$jscomp$21$$);
    } catch ($e$jscomp$inline_383$$) {
      $errCode$jscomp$9_node$jscomp$inline_381$$ = $e$jscomp$inline_383$$.$errno$;
      break a;
    }
    var $errCode$jscomp$inline_382$$ = $FS$nodePermissions$$($parent$jscomp$19$$, "wx");
    $errCode$jscomp$9_node$jscomp$inline_381$$ = $errCode$jscomp$inline_382$$ ? $errCode$jscomp$inline_382$$ : $FS$isDir$$($errCode$jscomp$9_node$jscomp$inline_381$$.mode) ? 31 : 0;
  }
  if ($errCode$jscomp$9_node$jscomp$inline_381$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$9_node$jscomp$inline_381$$);
  }
  if (!$parent$jscomp$19$$.$node_ops$.$unlink$) {
    throw new $FS$ErrnoError$$(63);
  }
  if ($node$jscomp$34$$.$mounted$) {
    throw new $FS$ErrnoError$$(10);
  }
  $parent$jscomp$19$$.$node_ops$.$unlink$($parent$jscomp$19$$, $name$jscomp$93_path$jscomp$21$$);
  $FS$hashRemoveNode$$($node$jscomp$34$$);
}
function $FS$chmod$$($node$jscomp$38_path$jscomp$25$$, $mode$jscomp$33$$) {
  $node$jscomp$38_path$jscomp$25$$ = "string" == typeof $node$jscomp$38_path$jscomp$25$$ ? $FS$lookupPath$$($node$jscomp$38_path$jscomp$25$$, {$follow$:!0}).node : $node$jscomp$38_path$jscomp$25$$;
  $FS$doSetAttr$$($node$jscomp$38_path$jscomp$25$$, {mode:$mode$jscomp$33$$ & 4095 | $node$jscomp$38_path$jscomp$25$$.mode & -4096, $ctime$:Date.now(), $dontFollow$:void 0});
}
function $FS$open$$($lookup$jscomp$14_path$jscomp$31$$, $JSCompiler_temp$jscomp$4_flags$jscomp$9$$, $mode$jscomp$36$$ = 438) {
  if ("" === $lookup$jscomp$14_path$jscomp$31$$) {
    throw new $FS$ErrnoError$$(44);
  }
  if ("string" == typeof $JSCompiler_temp$jscomp$4_flags$jscomp$9$$) {
    var $flags$jscomp$inline_103_node$jscomp$44$$ = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[$JSCompiler_temp$jscomp$4_flags$jscomp$9$$];
    if ("undefined" == typeof $flags$jscomp$inline_103_node$jscomp$44$$) {
      throw Error(`Unknown file open mode: ${$JSCompiler_temp$jscomp$4_flags$jscomp$9$$}`);
    }
    $JSCompiler_temp$jscomp$4_flags$jscomp$9$$ = $flags$jscomp$inline_103_node$jscomp$44$$;
  }
  $mode$jscomp$36$$ = $JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 64 ? $mode$jscomp$36$$ & 4095 | 32768 : 0;
  if ("object" == typeof $lookup$jscomp$14_path$jscomp$31$$) {
    $flags$jscomp$inline_103_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$31$$;
  } else {
    var $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ = $lookup$jscomp$14_path$jscomp$31$$.endsWith("/");
    $lookup$jscomp$14_path$jscomp$31$$ = $FS$lookupPath$$($lookup$jscomp$14_path$jscomp$31$$, {$follow$:!($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 131072), $noent_okay$:!0});
    $flags$jscomp$inline_103_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$31$$.node;
    $lookup$jscomp$14_path$jscomp$31$$ = $lookup$jscomp$14_path$jscomp$31$$.path;
  }
  var $created$$ = !1;
  if ($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 64) {
    if ($flags$jscomp$inline_103_node$jscomp$44$$) {
      if ($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 128) {
        throw new $FS$ErrnoError$$(20);
      }
    } else {
      if ($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$) {
        throw new $FS$ErrnoError$$(31);
      }
      $flags$jscomp$inline_103_node$jscomp$44$$ = $FS$mknod$$($lookup$jscomp$14_path$jscomp$31$$, $mode$jscomp$36$$ | 511, 0);
      $created$$ = !0;
    }
  }
  if (!$flags$jscomp$inline_103_node$jscomp$44$$) {
    throw new $FS$ErrnoError$$(44);
  }
  8192 === ($flags$jscomp$inline_103_node$jscomp$44$$.mode & 61440) && ($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ &= -513);
  if ($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 65536 && !$FS$isDir$$($flags$jscomp$inline_103_node$jscomp$44$$.mode)) {
    throw new $FS$ErrnoError$$(54);
  }
  if (!$created$$ && ($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ = $flags$jscomp$inline_103_node$jscomp$44$$ ? 40960 === ($flags$jscomp$inline_103_node$jscomp$44$$.mode & 61440) ? 32 : $FS$isDir$$($flags$jscomp$inline_103_node$jscomp$44$$.mode) && ("r" !== $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$4_flags$jscomp$9$$) || $JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 576) ? 31 : $FS$nodePermissions$$($flags$jscomp$inline_103_node$jscomp$44$$, 
  $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$4_flags$jscomp$9$$)) : 44)) {
    throw new $FS$ErrnoError$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$);
  }
  if ($JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 512 && !$created$$) {
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ = $flags$jscomp$inline_103_node$jscomp$44$$;
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ = "string" == typeof $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ ? $FS$lookupPath$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$, {$follow$:!0}).node : $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$;
    if ($FS$isDir$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$.mode)) {
      throw new $FS$ErrnoError$$(31);
    }
    if (32768 !== ($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$.mode & 61440)) {
      throw new $FS$ErrnoError$$(28);
    }
    var $errCode$jscomp$inline_387$$ = $FS$nodePermissions$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$, "w");
    if ($errCode$jscomp$inline_387$$) {
      throw new $FS$ErrnoError$$($errCode$jscomp$inline_387$$);
    }
    $FS$doSetAttr$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$, {size:0, timestamp:Date.now()});
  }
  $JSCompiler_temp$jscomp$4_flags$jscomp$9$$ &= -131713;
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$ = $FS$createStream$$({node:$flags$jscomp$inline_103_node$jscomp$44$$, path:$FS$getPath$$($flags$jscomp$inline_103_node$jscomp$44$$), flags:$JSCompiler_temp$jscomp$4_flags$jscomp$9$$, seekable:!0, position:0, $stream_ops$:$flags$jscomp$inline_103_node$jscomp$44$$.$stream_ops$, $ungotten$:[], error:!1});
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$.$stream_ops$.open && $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$.$stream_ops$.open($errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$);
  $created$$ && $FS$chmod$$($flags$jscomp$inline_103_node$jscomp$44$$, $mode$jscomp$36$$ & 511);
  !$Module$$.logReadFiles || $JSCompiler_temp$jscomp$4_flags$jscomp$9$$ & 1 || $lookup$jscomp$14_path$jscomp$31$$ in $FS$readFiles$$ || ($FS$readFiles$$[$lookup$jscomp$14_path$jscomp$31$$] = 1);
  return $errCode$jscomp$11_isDirPath_node$jscomp$inline_385_path$jscomp$inline_105_stream$jscomp$27$$;
}
function $FS$close$$($stream$jscomp$28$$) {
  if (null === $stream$jscomp$28$$.$fd$) {
    throw new $FS$ErrnoError$$(8);
  }
  $stream$jscomp$28$$.$getdents$ && ($stream$jscomp$28$$.$getdents$ = null);
  try {
    $stream$jscomp$28$$.$stream_ops$.close && $stream$jscomp$28$$.$stream_ops$.close($stream$jscomp$28$$);
  } catch ($e$jscomp$18$$) {
    throw $e$jscomp$18$$;
  } finally {
    $FS$streams$$[$stream$jscomp$28$$.$fd$] = null;
  }
  $stream$jscomp$28$$.$fd$ = null;
}
function $FS$llseek$$($stream$jscomp$30$$, $offset$jscomp$32$$, $whence$jscomp$1$$) {
  if (null === $stream$jscomp$30$$.$fd$) {
    throw new $FS$ErrnoError$$(8);
  }
  if (!$stream$jscomp$30$$.seekable || !$stream$jscomp$30$$.$stream_ops$.$llseek$) {
    throw new $FS$ErrnoError$$(70);
  }
  if (0 != $whence$jscomp$1$$ && 1 != $whence$jscomp$1$$ && 2 != $whence$jscomp$1$$) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$30$$.position = $stream$jscomp$30$$.$stream_ops$.$llseek$($stream$jscomp$30$$, $offset$jscomp$32$$, $whence$jscomp$1$$);
  $stream$jscomp$30$$.$ungotten$ = [];
}
function $FS$write$$($stream$jscomp$32$$, $buffer$jscomp$24_bytesWritten$jscomp$1$$, $offset$jscomp$34$$, $length$jscomp$25$$, $position$jscomp$6$$, $canOwn$jscomp$3$$) {
  $assert$$(0 <= $offset$jscomp$34$$);
  if (0 > $length$jscomp$25$$ || 0 > $position$jscomp$6$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if (null === $stream$jscomp$32$$.$fd$) {
    throw new $FS$ErrnoError$$(8);
  }
  if (0 === ($stream$jscomp$32$$.flags & 2097155)) {
    throw new $FS$ErrnoError$$(8);
  }
  if ($FS$isDir$$($stream$jscomp$32$$.node.mode)) {
    throw new $FS$ErrnoError$$(31);
  }
  if (!$stream$jscomp$32$$.$stream_ops$.write) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$32$$.seekable && $stream$jscomp$32$$.flags & 1024 && $FS$llseek$$($stream$jscomp$32$$, 0, 2);
  var $seeking$jscomp$1$$ = "undefined" != typeof $position$jscomp$6$$;
  if (!$seeking$jscomp$1$$) {
    $position$jscomp$6$$ = $stream$jscomp$32$$.position;
  } else if (!$stream$jscomp$32$$.seekable) {
    throw new $FS$ErrnoError$$(70);
  }
  $buffer$jscomp$24_bytesWritten$jscomp$1$$ = $stream$jscomp$32$$.$stream_ops$.write($stream$jscomp$32$$, $buffer$jscomp$24_bytesWritten$jscomp$1$$, $offset$jscomp$34$$, $length$jscomp$25$$, $position$jscomp$6$$, $canOwn$jscomp$3$$);
  $seeking$jscomp$1$$ || ($stream$jscomp$32$$.position += $buffer$jscomp$24_bytesWritten$jscomp$1$$);
  return $buffer$jscomp$24_bytesWritten$jscomp$1$$;
}
function $FS$createPath$$($parent$jscomp$21$$, $parts$jscomp$2_path$jscomp$37$$) {
  $parent$jscomp$21$$ = "string" == typeof $parent$jscomp$21$$ ? $parent$jscomp$21$$ : $FS$getPath$$($parent$jscomp$21$$);
  for ($parts$jscomp$2_path$jscomp$37$$ = $parts$jscomp$2_path$jscomp$37$$.split("/").reverse(); $parts$jscomp$2_path$jscomp$37$$.length;) {
    var $part$$ = $parts$jscomp$2_path$jscomp$37$$.pop();
    if ($part$$) {
      var $current$jscomp$3$$ = $PATH$normalize$$($parent$jscomp$21$$ + "/" + $part$$);
      try {
        $FS$mkdir$$($current$jscomp$3$$);
      } catch ($e$jscomp$21$$) {
        if (20 != $e$jscomp$21$$.$errno$) {
          throw $e$jscomp$21$$;
        }
      }
      $parent$jscomp$21$$ = $current$jscomp$3$$;
    }
  }
  return $current$jscomp$3$$;
}
function $FS$createFile$$($parent$jscomp$22_path$jscomp$38$$, $name$jscomp$95$$, $canRead$jscomp$4$$, $canWrite$jscomp$4$$) {
  $parent$jscomp$22_path$jscomp$38$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$22_path$jscomp$38$$ ? $parent$jscomp$22_path$jscomp$38$$ : $FS$getPath$$($parent$jscomp$22_path$jscomp$38$$)) + "/" + $name$jscomp$95$$);
  return $FS$create$$($parent$jscomp$22_path$jscomp$38$$, $FS_getMode$$($canRead$jscomp$4$$, $canWrite$jscomp$4$$));
}
function $FS$createDataFile$$($mode$jscomp$38_parent$jscomp$23$$, $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$, $data$jscomp$83$$, $canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$5$$, $canOwn$jscomp$4$$) {
  var $node$jscomp$46_path$jscomp$39$$ = $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$;
  $mode$jscomp$38_parent$jscomp$23$$ && ($mode$jscomp$38_parent$jscomp$23$$ = "string" == typeof $mode$jscomp$38_parent$jscomp$23$$ ? $mode$jscomp$38_parent$jscomp$23$$ : $FS$getPath$$($mode$jscomp$38_parent$jscomp$23$$), $node$jscomp$46_path$jscomp$39$$ = $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$ ? $PATH$normalize$$($mode$jscomp$38_parent$jscomp$23$$ + "/" + $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$) : $mode$jscomp$38_parent$jscomp$23$$);
  $mode$jscomp$38_parent$jscomp$23$$ = $FS_getMode$$($canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$5$$);
  $node$jscomp$46_path$jscomp$39$$ = $FS$create$$($node$jscomp$46_path$jscomp$39$$, $mode$jscomp$38_parent$jscomp$23$$);
  if ($data$jscomp$83$$) {
    if ("string" == typeof $data$jscomp$83$$) {
      $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$ = Array($data$jscomp$83$$.length);
      $canRead$jscomp$5_i$jscomp$17$$ = 0;
      for ($canWrite$jscomp$5_len$jscomp$5$$ = $data$jscomp$83$$.length; $canRead$jscomp$5_i$jscomp$17$$ < $canWrite$jscomp$5_len$jscomp$5$$; ++$canRead$jscomp$5_i$jscomp$17$$) {
        $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$[$canRead$jscomp$5_i$jscomp$17$$] = $data$jscomp$83$$.charCodeAt($canRead$jscomp$5_i$jscomp$17$$);
      }
      $data$jscomp$83$$ = $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$;
    }
    $FS$chmod$$($node$jscomp$46_path$jscomp$39$$, $mode$jscomp$38_parent$jscomp$23$$ | 146);
    $arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$ = $FS$open$$($node$jscomp$46_path$jscomp$39$$, 577);
    $FS$write$$($arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$, $data$jscomp$83$$, 0, $data$jscomp$83$$.length, 0, $canOwn$jscomp$4$$);
    $FS$close$$($arr$jscomp$3_name$jscomp$96_stream$jscomp$41$$);
    $FS$chmod$$($node$jscomp$46_path$jscomp$39$$, $mode$jscomp$38_parent$jscomp$23$$);
  }
}
function $FS$createDevice$$($parent$jscomp$24_path$jscomp$40$$, $mode$jscomp$39_name$jscomp$97$$, $input$jscomp$11$$, $output$jscomp$4$$) {
  $parent$jscomp$24_path$jscomp$40$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$24_path$jscomp$40$$ ? $parent$jscomp$24_path$jscomp$40$$ : $FS$getPath$$($parent$jscomp$24_path$jscomp$40$$)) + "/" + $mode$jscomp$39_name$jscomp$97$$);
  $mode$jscomp$39_name$jscomp$97$$ = $FS_getMode$$(!!$input$jscomp$11$$, !!$output$jscomp$4$$);
  $FS$createDevice$$.$major$ ?? ($FS$createDevice$$.$major$ = 64);
  var $dev$jscomp$9$$ = $FS$createDevice$$.$major$++ << 8 | 0;
  $FS$registerDevice$$($dev$jscomp$9$$, {open($stream$jscomp$42$$) {
    $stream$jscomp$42$$.seekable = !1;
  }, close() {
    $output$jscomp$4$$?.buffer?.length && $output$jscomp$4$$(10);
  }, read($stream$jscomp$44$$, $buffer$jscomp$27$$, $offset$jscomp$37$$, $length$jscomp$30$$) {
    for (var $bytesRead$jscomp$2$$ = 0, $i$jscomp$18$$ = 0; $i$jscomp$18$$ < $length$jscomp$30$$; $i$jscomp$18$$++) {
      try {
        var $result$jscomp$6$$ = $input$jscomp$11$$();
      } catch ($e$jscomp$22$$) {
        throw new $FS$ErrnoError$$(29);
      }
      if (void 0 === $result$jscomp$6$$ && 0 === $bytesRead$jscomp$2$$) {
        throw new $FS$ErrnoError$$(6);
      }
      if (null === $result$jscomp$6$$ || void 0 === $result$jscomp$6$$) {
        break;
      }
      $bytesRead$jscomp$2$$++;
      $buffer$jscomp$27$$[$offset$jscomp$37$$ + $i$jscomp$18$$] = $result$jscomp$6$$;
    }
    $bytesRead$jscomp$2$$ && ($stream$jscomp$44$$.node.$atime$ = Date.now());
    return $bytesRead$jscomp$2$$;
  }, write($stream$jscomp$45$$, $buffer$jscomp$28$$, $offset$jscomp$38$$, $length$jscomp$31$$) {
    for (var $i$jscomp$19$$ = 0; $i$jscomp$19$$ < $length$jscomp$31$$; $i$jscomp$19$$++) {
      try {
        $output$jscomp$4$$($buffer$jscomp$28$$[$offset$jscomp$38$$ + $i$jscomp$19$$]);
      } catch ($e$jscomp$23$$) {
        throw new $FS$ErrnoError$$(29);
      }
    }
    $length$jscomp$31$$ && ($stream$jscomp$45$$.node.$mtime$ = $stream$jscomp$45$$.node.$ctime$ = Date.now());
    return $i$jscomp$19$$;
  }});
  return $FS$mkdev$$($parent$jscomp$24_path$jscomp$40$$, $mode$jscomp$39_name$jscomp$97$$, $dev$jscomp$9$$);
}
function $FS$forceLoadFile$$($obj$jscomp$29$$) {
  if (!($obj$jscomp$29$$.$isDevice$ || $obj$jscomp$29$$.$isFolder$ || $obj$jscomp$29$$.link || $obj$jscomp$29$$.$contents$)) {
    if (globalThis.XMLHttpRequest) {
      $abort$$("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      try {
        $obj$jscomp$29$$.$contents$ = (void 0)($obj$jscomp$29$$.url);
      } catch ($e$jscomp$24$$) {
        throw new $FS$ErrnoError$$(29);
      }
    }
  }
}
function $FS$createLazyFile$$($parent$jscomp$25_stream_ops$$, $name$jscomp$98$$, $url$jscomp$28$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$) {
  function $writeChunks$$($contents$jscomp$4_stream$jscomp$46$$, $buffer$jscomp$29$$, $offset$jscomp$39$$, $length$jscomp$32_size$jscomp$23$$, $position$jscomp$8$$) {
    $contents$jscomp$4_stream$jscomp$46$$ = $contents$jscomp$4_stream$jscomp$46$$.node.$contents$;
    if ($position$jscomp$8$$ >= $contents$jscomp$4_stream$jscomp$46$$.length) {
      return 0;
    }
    $length$jscomp$32_size$jscomp$23$$ = Math.min($contents$jscomp$4_stream$jscomp$46$$.length - $position$jscomp$8$$, $length$jscomp$32_size$jscomp$23$$);
    $assert$$(0 <= $length$jscomp$32_size$jscomp$23$$);
    if ($contents$jscomp$4_stream$jscomp$46$$.slice) {
      for (var $i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$32_size$jscomp$23$$; $i$jscomp$20$$++) {
        $buffer$jscomp$29$$[$offset$jscomp$39$$ + $i$jscomp$20$$] = $contents$jscomp$4_stream$jscomp$46$$[$position$jscomp$8$$ + $i$jscomp$20$$];
      }
    } else {
      for ($i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$32_size$jscomp$23$$; $i$jscomp$20$$++) {
        $buffer$jscomp$29$$[$offset$jscomp$39$$ + $i$jscomp$20$$] = $contents$jscomp$4_stream$jscomp$46$$.get($position$jscomp$8$$ + $i$jscomp$20$$);
      }
    }
    return $length$jscomp$32_size$jscomp$23$$;
  }
  class $LazyUint8Array$$ {
    $i$=!1;
    $g$=[];
    $h$=void 0;
    $l$=0;
    $j$=0;
    get($idx$jscomp$3$$) {
      if (!($idx$jscomp$3$$ > this.length - 1 || 0 > $idx$jscomp$3$$)) {
        var $chunkOffset$$ = $idx$jscomp$3$$ % this.$o$;
        return this.$h$($idx$jscomp$3$$ / this.$o$ | 0)[$chunkOffset$$];
      }
    }
    $s$($getter$$) {
      this.$h$ = $getter$$;
    }
    $m$() {
      var $usesGzip_xhr$$ = new XMLHttpRequest();
      $usesGzip_xhr$$.open("HEAD", $url$jscomp$28$$, !1);
      $usesGzip_xhr$$.send(null);
      200 <= $usesGzip_xhr$$.status && 300 > $usesGzip_xhr$$.status || 304 === $usesGzip_xhr$$.status || $abort$$("Couldn't load " + $url$jscomp$28$$ + ". Status: " + $usesGzip_xhr$$.status);
      var $datalength$$ = Number($usesGzip_xhr$$.getResponseHeader("Content-length")), $header$jscomp$2$$, $hasByteServing$$ = ($header$jscomp$2$$ = $usesGzip_xhr$$.getResponseHeader("Accept-Ranges")) && "bytes" === $header$jscomp$2$$;
      $usesGzip_xhr$$ = ($header$jscomp$2$$ = $usesGzip_xhr$$.getResponseHeader("Content-Encoding")) && "gzip" === $header$jscomp$2$$;
      var $chunkSize$$ = 1048576;
      $hasByteServing$$ || ($chunkSize$$ = $datalength$$);
      var $lazyArray$jscomp$1$$ = this;
      $lazyArray$jscomp$1$$.$s$($chunkNum$jscomp$1$$ => {
        var $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$ = $chunkNum$jscomp$1$$ * $chunkSize$$, $end$jscomp$12_to$jscomp$inline_119$$ = ($chunkNum$jscomp$1$$ + 1) * $chunkSize$$ - 1;
        $end$jscomp$12_to$jscomp$inline_119$$ = Math.min($end$jscomp$12_to$jscomp$inline_119$$, $datalength$$ - 1);
        if ("undefined" == typeof $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$]) {
          var $JSCompiler_temp_const$jscomp$9$$ = $lazyArray$jscomp$1$$.$g$;
          $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$ > $end$jscomp$12_to$jscomp$inline_119$$ && $abort$$("invalid range (" + $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$ + ", " + $end$jscomp$12_to$jscomp$inline_119$$ + ") or no bytes requested!");
          $end$jscomp$12_to$jscomp$inline_119$$ > $datalength$$ - 1 && $abort$$("only " + $datalength$$ + " bytes available! programmer error!");
          var $xhr$jscomp$inline_120$$ = new XMLHttpRequest();
          $xhr$jscomp$inline_120$$.open("GET", $url$jscomp$28$$, !1);
          $datalength$$ !== $chunkSize$$ && $xhr$jscomp$inline_120$$.setRequestHeader("Range", "bytes=" + $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$ + "-" + $end$jscomp$12_to$jscomp$inline_119$$);
          $xhr$jscomp$inline_120$$.responseType = "arraybuffer";
          $xhr$jscomp$inline_120$$.overrideMimeType && $xhr$jscomp$inline_120$$.overrideMimeType("text/plain; charset=x-user-defined");
          $xhr$jscomp$inline_120$$.send(null);
          200 <= $xhr$jscomp$inline_120$$.status && 300 > $xhr$jscomp$inline_120$$.status || 304 === $xhr$jscomp$inline_120$$.status || $abort$$("Couldn't load " + $url$jscomp$28$$ + ". Status: " + $xhr$jscomp$inline_120$$.status);
          $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$ = void 0 !== $xhr$jscomp$inline_120$$.response ? new Uint8Array($xhr$jscomp$inline_120$$.response || []) : $intArrayFromString$$($xhr$jscomp$inline_120$$.responseText || "");
          $JSCompiler_temp_const$jscomp$9$$[$chunkNum$jscomp$1$$] = $JSCompiler_inline_result$jscomp$10_start$jscomp$14$$;
        }
        "undefined" == typeof $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$] && $abort$$("doXHR failed!");
        return $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$];
      });
      if ($usesGzip_xhr$$ || !$datalength$$) {
        $chunkSize$$ = $datalength$$ = 1, $chunkSize$$ = $datalength$$ = this.$h$(0).length, $out$$("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.$l$ = $datalength$$;
      this.$j$ = $chunkSize$$;
      this.$i$ = !0;
    }
    get length() {
      this.$i$ || this.$m$();
      return this.$l$;
    }
    get $o$() {
      this.$i$ || this.$m$();
      return this.$j$;
    }
  }
  if (globalThis.XMLHttpRequest) {
    $abort$$("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
    var $JSCompiler_object_inline_contents_359$$ = new $LazyUint8Array$$();
    var $JSCompiler_object_inline_url_360$$ = void 0;
  } else {
    $JSCompiler_object_inline_url_360$$ = $url$jscomp$28$$, $JSCompiler_object_inline_contents_359$$ = void 0;
  }
  var $node$jscomp$47$$ = $FS$createFile$$($parent$jscomp$25_stream_ops$$, $name$jscomp$98$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$);
  $JSCompiler_object_inline_contents_359$$ ? $node$jscomp$47$$.$contents$ = $JSCompiler_object_inline_contents_359$$ : $JSCompiler_object_inline_url_360$$ && ($node$jscomp$47$$.$contents$ = null, $node$jscomp$47$$.url = $JSCompiler_object_inline_url_360$$);
  Object.defineProperties($node$jscomp$47$$, {$usedBytes$:{get:function() {
    return this.$contents$.length;
  }}});
  $parent$jscomp$25_stream_ops$$ = {};
  for (const [$key$jscomp$41$$, $fn$$] of Object.entries($node$jscomp$47$$.$stream_ops$)) {
    $parent$jscomp$25_stream_ops$$[$key$jscomp$41$$] = (...$args$jscomp$7$$) => {
      $FS$forceLoadFile$$($node$jscomp$47$$);
      return $fn$$(...$args$jscomp$7$$);
    };
  }
  $parent$jscomp$25_stream_ops$$.read = ($stream$jscomp$47$$, $buffer$jscomp$30$$, $offset$jscomp$40$$, $length$jscomp$33$$, $position$jscomp$9$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    return $writeChunks$$($stream$jscomp$47$$, $buffer$jscomp$30$$, $offset$jscomp$40$$, $length$jscomp$33$$, $position$jscomp$9$$);
  };
  $parent$jscomp$25_stream_ops$$.$mmap$ = ($stream$jscomp$48$$, $length$jscomp$34$$, $position$jscomp$10$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    var $ptr$jscomp$6$$ = $mmapAlloc$$();
    if (!$ptr$jscomp$6$$) {
      throw new $FS$ErrnoError$$(48);
    }
    $writeChunks$$($stream$jscomp$48$$, $HEAP8$$, $ptr$jscomp$6$$, $length$jscomp$34$$, $position$jscomp$10$$);
    return {$ptr$:$ptr$jscomp$6$$, $allocated$:!0};
  };
  $node$jscomp$47$$.$stream_ops$ = $parent$jscomp$25_stream_ops$$;
  return $node$jscomp$47$$;
}
var $FS$$ = {}, $SYSCALLS$varargs$$ = void 0, $AsciiToString$$ = $ptr$jscomp$8$$ => {
  for (var $str$jscomp$11$$ = "";;) {
    var $ch$jscomp$1$$ = $HEAPU8$$[$ptr$jscomp$8$$++];
    if (!$ch$jscomp$1$$) {
      return $str$jscomp$11$$;
    }
    $str$jscomp$11$$ += String.fromCharCode($ch$jscomp$1$$);
  }
}, $awaitingDependencies$$ = {}, $registeredTypes$$ = {}, $typeDependencies$$ = {}, $BindingError$$ = class extends Error {
  constructor($message$jscomp$40$$) {
    super($message$jscomp$40$$);
    this.name = "BindingError";
  }
}, $throwBindingError$$ = $message$jscomp$41$$ => {
  throw new $BindingError$$($message$jscomp$41$$);
};
function $sharedRegisterType$$($rawType$$, $callbacks$jscomp$1_registeredInstance$$, $options$jscomp$67$$ = {}) {
  var $name$jscomp$99$$ = $callbacks$jscomp$1_registeredInstance$$.name;
  if (!$rawType$$) {
    throw new $BindingError$$(`type "${$name$jscomp$99$$}" must have a positive integer typeid pointer`);
  }
  if ($registeredTypes$$.hasOwnProperty($rawType$$)) {
    if ($options$jscomp$67$$.$ignoreDuplicateRegistrations$) {
      return;
    }
    throw new $BindingError$$(`Cannot register type '${$name$jscomp$99$$}' twice`);
  }
  $registeredTypes$$[$rawType$$] = $callbacks$jscomp$1_registeredInstance$$;
  delete $typeDependencies$$[$rawType$$];
  $awaitingDependencies$$.hasOwnProperty($rawType$$) && ($callbacks$jscomp$1_registeredInstance$$ = $awaitingDependencies$$[$rawType$$], delete $awaitingDependencies$$[$rawType$$], $callbacks$jscomp$1_registeredInstance$$.forEach($cb$jscomp$2$$ => $cb$jscomp$2$$()));
}
function $registerType$$($rawType$jscomp$1$$, $registeredInstance$jscomp$1$$, $options$jscomp$68$$ = {}) {
  return $sharedRegisterType$$($rawType$jscomp$1$$, $registeredInstance$jscomp$1$$, $options$jscomp$68$$);
}
var $integerReadValueFromPointer$$ = ($name$jscomp$100$$, $width$jscomp$28$$, $signed$$) => {
  switch($width$jscomp$28$$) {
    case 1:
      return $signed$$ ? $pointer$$ => $HEAP8$$[$pointer$$] : $pointer$jscomp$1$$ => $HEAPU8$$[$pointer$jscomp$1$$];
    case 2:
      return $signed$$ ? $pointer$jscomp$2$$ => $HEAP16$$[$pointer$jscomp$2$$ >> 1] : $pointer$jscomp$3$$ => $HEAPU16$$[$pointer$jscomp$3$$ >> 1];
    case 4:
      return $signed$$ ? $pointer$jscomp$4$$ => $HEAP32$$[$pointer$jscomp$4$$ >> 2] : $pointer$jscomp$5$$ => $HEAPU32$$[$pointer$jscomp$5$$ >> 2];
    case 8:
      return $signed$$ ? $pointer$jscomp$6$$ => $HEAP64$$[$pointer$jscomp$6$$ >> 3] : $pointer$jscomp$7$$ => $HEAPU64$$[$pointer$jscomp$7$$ >> 3];
    default:
      throw new TypeError(`invalid integer width (${$width$jscomp$28$$}): ${$name$jscomp$100$$}`);
  }
}, $embindRepr$$ = $v$jscomp$2$$ => {
  if (null === $v$jscomp$2$$) {
    return "null";
  }
  var $t$$ = typeof $v$jscomp$2$$;
  return "object" === $t$$ || "array" === $t$$ || "function" === $t$$ ? $v$jscomp$2$$.toString() : "" + $v$jscomp$2$$;
}, $assertIntegerRange$$ = ($typeName$$, $value$jscomp$96$$, $minRange$$, $maxRange$$) => {
  if ($value$jscomp$96$$ < $minRange$$ || $value$jscomp$96$$ > $maxRange$$) {
    throw new TypeError(`Passing a number "${$embindRepr$$($value$jscomp$96$$)}" from JS side to C/C++ side to an argument of type "${$typeName$$}", which is outside the valid range [${$minRange$$}, ${$maxRange$$}]!`);
  }
}, $throwInstanceAlreadyDeleted$$ = $obj$jscomp$30$$ => {
  throw new $BindingError$$($obj$jscomp$30$$.$$$$.$ptrType$.$registeredClass$.name + " instance already deleted");
}, $finalizationRegistry$$ = !1, $detachFinalizer$$ = () => {
}, $downcastPointer$$ = ($ptr$jscomp$9_rv$$, $ptrClass$$, $desiredClass$$) => {
  if ($ptrClass$$ === $desiredClass$$) {
    return $ptr$jscomp$9_rv$$;
  }
  if (void 0 === $desiredClass$$.$baseClass$) {
    return null;
  }
  $ptr$jscomp$9_rv$$ = $downcastPointer$$($ptr$jscomp$9_rv$$, $ptrClass$$, $desiredClass$$.$baseClass$);
  return null === $ptr$jscomp$9_rv$$ ? null : $desiredClass$$.$downcast$($ptr$jscomp$9_rv$$);
}, $registeredPointers$$ = {}, $registeredInstances$$ = {}, $getInheritedInstance$$ = ($class_$jscomp$1_class_$jscomp$inline_128$$, $ptr$jscomp$11_ptr$jscomp$inline_129$$) => {
  if (void 0 === $ptr$jscomp$11_ptr$jscomp$inline_129$$) {
    throw new $BindingError$$("ptr should not be undefined");
  }
  for (; $class_$jscomp$1_class_$jscomp$inline_128$$.$baseClass$;) {
    $ptr$jscomp$11_ptr$jscomp$inline_129$$ = $class_$jscomp$1_class_$jscomp$inline_128$$.$upcast$($ptr$jscomp$11_ptr$jscomp$inline_129$$), $class_$jscomp$1_class_$jscomp$inline_128$$ = $class_$jscomp$1_class_$jscomp$inline_128$$.$baseClass$;
  }
  return $registeredInstances$$[$ptr$jscomp$11_ptr$jscomp$inline_129$$];
}, $InternalError$$ = class extends Error {
  constructor($message$jscomp$42$$) {
    super($message$jscomp$42$$);
    this.name = "InternalError";
  }
}, $makeClassHandle$$ = ($prototype$$, $record$$) => {
  if (!$record$$.$ptrType$ || !$record$$.$ptr$) {
    throw new $InternalError$$("makeClassHandle requires ptr and ptrType");
  }
  if (!!$record$$.$smartPtrType$ !== !!$record$$.$smartPtr$) {
    throw new $InternalError$$("Both smartPtrType and smartPtr must be specified");
  }
  $record$$.count = {value:1};
  return $attachFinalizer$$(Object.create($prototype$$, {$$$$:{value:$record$$, writable:!0}}));
};
function $RegisteredPointer_fromWireType$$($ptr$jscomp$12$$) {
  function $makeDefaultHandle$$() {
    return this.$isSmartPointer$ ? $makeClassHandle$$(this.$registeredClass$.$instancePrototype$, {$ptrType$:this.$pointeeType$, $ptr$:$rawPointer$$, $smartPtrType$:this, $smartPtr$:$ptr$jscomp$12$$}) : $makeClassHandle$$(this.$registeredClass$.$instancePrototype$, {$ptrType$:this, $ptr$:$ptr$jscomp$12$$});
  }
  var $rawPointer$$ = this.$getPointee$($ptr$jscomp$12$$);
  if (!$rawPointer$$) {
    return this.$destructor$($ptr$jscomp$12$$), null;
  }
  var $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$ = $getInheritedInstance$$(this.$registeredClass$, $rawPointer$$);
  if (void 0 !== $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$) {
    if (0 === $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$$$$.count.value) {
      return $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$$$$.$ptr$ = $rawPointer$$, $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$$$$.$smartPtr$ = $ptr$jscomp$12$$, $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.clone();
    }
    $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$ = $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.clone();
    this.$destructor$($ptr$jscomp$12$$);
    return $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$;
  }
  $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$ = this.$registeredClass$.$getActualType$($rawPointer$$);
  $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$ = $registeredPointers$$[$actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$];
  if (!$actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$) {
    return $makeDefaultHandle$$.call(this);
  }
  $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$ = this.$isConst$ ? $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$constPointerType$ : $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.pointerType;
  var $dp$$ = $downcastPointer$$($rawPointer$$, this.$registeredClass$, $actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$registeredClass$);
  return null === $dp$$ ? $makeDefaultHandle$$.call(this) : this.$isSmartPointer$ ? $makeClassHandle$$($actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$registeredClass$.$instancePrototype$, {$ptrType$:$actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$, $ptr$:$dp$$, $smartPtrType$:this, $smartPtr$:$ptr$jscomp$12$$}) : $makeClassHandle$$($actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$.$registeredClass$.$instancePrototype$, 
  {$ptrType$:$actualType_registeredInstance$jscomp$2_registeredPointerRecord_rv$jscomp$1_toType$$, $ptr$:$dp$$});
}
var $attachFinalizer$$ = $handle$jscomp$14$$ => {
  if (!globalThis.FinalizationRegistry) {
    return $attachFinalizer$$ = $handle$jscomp$15$$ => $handle$jscomp$15$$, $handle$jscomp$14$$;
  }
  $finalizationRegistry$$ = new FinalizationRegistry($$$$jscomp$inline_135_info$jscomp$2$$ => {
    console.warn($$$$jscomp$inline_135_info$jscomp$2$$.$leakWarning$);
    $$$$jscomp$inline_135_info$jscomp$2$$ = $$$$jscomp$inline_135_info$jscomp$2$$.$$$$;
    --$$$$jscomp$inline_135_info$jscomp$2$$.count.value;
    0 === $$$$jscomp$inline_135_info$jscomp$2$$.count.value && ($$$$jscomp$inline_135_info$jscomp$2$$.$smartPtr$ ? $$$$jscomp$inline_135_info$jscomp$2$$.$smartPtrType$.$rawDestructor$($$$$jscomp$inline_135_info$jscomp$2$$.$smartPtr$) : $$$$jscomp$inline_135_info$jscomp$2$$.$ptrType$.$registeredClass$.$rawDestructor$($$$$jscomp$inline_135_info$jscomp$2$$.$ptr$));
  });
  $attachFinalizer$$ = $handle$jscomp$16$$ => {
    var $$$$jscomp$2_err$jscomp$5$$ = $handle$jscomp$16$$.$$$$;
    if ($$$$jscomp$2_err$jscomp$5$$.$smartPtr$) {
      var $info$jscomp$3$$ = {$$$$:$$$$jscomp$2_err$jscomp$5$$};
      $$$$jscomp$2_err$jscomp$5$$ = Error(`Embind found a leaked C++ instance ${$$$$jscomp$2_err$jscomp$5$$.$ptrType$.$registeredClass$.name} <${$ptrToString$$($$$$jscomp$2_err$jscomp$5$$.$ptr$)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace($$$$jscomp$2_err$jscomp$5$$, $RegisteredPointer_fromWireType$$);
      $info$jscomp$3$$.$leakWarning$ = $$$$jscomp$2_err$jscomp$5$$.stack.replace(/^Error: /, "");
      $finalizationRegistry$$.register($handle$jscomp$16$$, $info$jscomp$3$$, $handle$jscomp$16$$);
    }
    return $handle$jscomp$16$$;
  };
  $detachFinalizer$$ = $handle$jscomp$17$$ => {
    $finalizationRegistry$$.unregister($handle$jscomp$17$$);
  };
  return $attachFinalizer$$($handle$jscomp$14$$);
}, $deletionQueue$$ = [];
function $ClassHandle$$() {
}
var $createNamedFunction$$ = ($name$jscomp$103$$, $func$jscomp$7$$) => Object.defineProperty($func$jscomp$7$$, "name", {value:$name$jscomp$103$$}), $ensureOverloadTable$$ = ($proto$jscomp$4$$, $methodName$$, $humanName$$) => {
  if (void 0 === $proto$jscomp$4$$[$methodName$$].$overloadTable$) {
    var $prevFunc$$ = $proto$jscomp$4$$[$methodName$$];
    $proto$jscomp$4$$[$methodName$$] = function(...$args$jscomp$8$$) {
      if (!$proto$jscomp$4$$[$methodName$$].$overloadTable$.hasOwnProperty($args$jscomp$8$$.length)) {
        throw new $BindingError$$(`Function '${$humanName$$}' called with an invalid number of arguments (${$args$jscomp$8$$.length}) - expects one of (${$proto$jscomp$4$$[$methodName$$].$overloadTable$})!`);
      }
      return $proto$jscomp$4$$[$methodName$$].$overloadTable$[$args$jscomp$8$$.length].apply(this, $args$jscomp$8$$);
    };
    $proto$jscomp$4$$[$methodName$$].$overloadTable$ = [];
    $proto$jscomp$4$$[$methodName$$].$overloadTable$[$prevFunc$$.$argCount$] = $prevFunc$$;
  }
}, $exposePublicSymbol$$ = ($name$jscomp$104$$, $value$jscomp$100$$) => {
  if ($Module$$.hasOwnProperty($name$jscomp$104$$)) {
    throw new $BindingError$$(`Cannot register public name '${$name$jscomp$104$$}' twice`);
  }
  $Module$$[$name$jscomp$104$$] = $value$jscomp$100$$;
  $Module$$[$name$jscomp$104$$].$argCount$ = void 0;
}, $makeLegalFunctionName$$ = $name$jscomp$105$$ => {
  $assert$$("string" === typeof $name$jscomp$105$$);
  $name$jscomp$105$$ = $name$jscomp$105$$.replace(/[^a-zA-Z0-9_]/g, "$");
  var $f$jscomp$2$$ = $name$jscomp$105$$.charCodeAt(0);
  return 48 <= $f$jscomp$2$$ && 57 >= $f$jscomp$2$$ ? `_${$name$jscomp$105$$}` : $name$jscomp$105$$;
};
function $RegisteredClass$$($name$jscomp$106$$, $constructor$$, $instancePrototype$$, $rawDestructor$$, $baseClass$$, $getActualType$$, $upcast$$, $downcast$$) {
  this.name = $name$jscomp$106$$;
  this.constructor = $constructor$$;
  this.$instancePrototype$ = $instancePrototype$$;
  this.$rawDestructor$ = $rawDestructor$$;
  this.$baseClass$ = $baseClass$$;
  this.$getActualType$ = $getActualType$$;
  this.$upcast$ = $upcast$$;
  this.$downcast$ = $downcast$$;
  this.$pureVirtualFunctions$ = [];
}
var $upcastPointer$$ = ($ptr$jscomp$13$$, $ptrClass$jscomp$1$$, $desiredClass$jscomp$1$$) => {
  for (; $ptrClass$jscomp$1$$ !== $desiredClass$jscomp$1$$;) {
    if (!$ptrClass$jscomp$1$$.$upcast$) {
      throw new $BindingError$$(`Expected null or instance of ${$desiredClass$jscomp$1$$.name}, got an instance of ${$ptrClass$jscomp$1$$.name}`);
    }
    $ptr$jscomp$13$$ = $ptrClass$jscomp$1$$.$upcast$($ptr$jscomp$13$$);
    $ptrClass$jscomp$1$$ = $ptrClass$jscomp$1$$.$baseClass$;
  }
  return $ptr$jscomp$13$$;
};
function $constNoSmartPtrRawPointerToWireType$$($destructors$jscomp$2$$, $handle$jscomp$18$$) {
  if (null === $handle$jscomp$18$$) {
    if (this.$isReference$) {
      throw new $BindingError$$(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!$handle$jscomp$18$$.$$$$) {
    throw new $BindingError$$(`Cannot pass "${$embindRepr$$($handle$jscomp$18$$)}" as a ${this.name}`);
  }
  if (!$handle$jscomp$18$$.$$$$.$ptr$) {
    throw new $BindingError$$(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return $upcastPointer$$($handle$jscomp$18$$.$$$$.$ptr$, $handle$jscomp$18$$.$$$$.$ptrType$.$registeredClass$, this.$registeredClass$);
}
function $genericPointerToWireType$$($destructors$jscomp$3$$, $handle$jscomp$19$$) {
  if (null === $handle$jscomp$19$$) {
    if (this.$isReference$) {
      throw new $BindingError$$(`null is not a valid ${this.name}`);
    }
    if (this.$isSmartPointer$) {
      var $ptr$jscomp$15$$ = this.$rawConstructor$();
      null !== $destructors$jscomp$3$$ && $destructors$jscomp$3$$.push(this.$rawDestructor$, $ptr$jscomp$15$$);
      return $ptr$jscomp$15$$;
    }
    return 0;
  }
  if (!$handle$jscomp$19$$ || !$handle$jscomp$19$$.$$$$) {
    throw new $BindingError$$(`Cannot pass "${$embindRepr$$($handle$jscomp$19$$)}" as a ${this.name}`);
  }
  if (!$handle$jscomp$19$$.$$$$.$ptr$) {
    throw new $BindingError$$(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.$isConst$ && $handle$jscomp$19$$.$$$$.$ptrType$.$isConst$) {
    throw new $BindingError$$(`Cannot convert argument of type ${$handle$jscomp$19$$.$$$$.$smartPtrType$ ? $handle$jscomp$19$$.$$$$.$smartPtrType$.name : $handle$jscomp$19$$.$$$$.$ptrType$.name} to parameter type ${this.name}`);
  }
  $ptr$jscomp$15$$ = $upcastPointer$$($handle$jscomp$19$$.$$$$.$ptr$, $handle$jscomp$19$$.$$$$.$ptrType$.$registeredClass$, this.$registeredClass$);
  if (this.$isSmartPointer$) {
    if (void 0 === $handle$jscomp$19$$.$$$$.$smartPtr$) {
      throw new $BindingError$$("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.$sharingPolicy$) {
      case 0:
        if ($handle$jscomp$19$$.$$$$.$smartPtrType$ === this) {
          $ptr$jscomp$15$$ = $handle$jscomp$19$$.$$$$.$smartPtr$;
        } else {
          throw new $BindingError$$(`Cannot convert argument of type ${$handle$jscomp$19$$.$$$$.$smartPtrType$ ? $handle$jscomp$19$$.$$$$.$smartPtrType$.name : $handle$jscomp$19$$.$$$$.$ptrType$.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        $ptr$jscomp$15$$ = $handle$jscomp$19$$.$$$$.$smartPtr$;
        break;
      case 2:
        if ($handle$jscomp$19$$.$$$$.$smartPtrType$ === this) {
          $ptr$jscomp$15$$ = $handle$jscomp$19$$.$$$$.$smartPtr$;
        } else {
          var $clonedHandle$$ = $handle$jscomp$19$$.clone();
          $ptr$jscomp$15$$ = this.$rawShare$($ptr$jscomp$15$$, $Emval$toHandle$$(() => $clonedHandle$$["delete"]()));
          null !== $destructors$jscomp$3$$ && $destructors$jscomp$3$$.push(this.$rawDestructor$, $ptr$jscomp$15$$);
        }
        break;
      default:
        throw new $BindingError$$("Unsupporting sharing policy");
    }
  }
  return $ptr$jscomp$15$$;
}
function $nonConstNoSmartPtrRawPointerToWireType$$($destructors$jscomp$4$$, $handle$jscomp$20$$) {
  if (null === $handle$jscomp$20$$) {
    if (this.$isReference$) {
      throw new $BindingError$$(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!$handle$jscomp$20$$.$$$$) {
    throw new $BindingError$$(`Cannot pass "${$embindRepr$$($handle$jscomp$20$$)}" as a ${this.name}`);
  }
  if (!$handle$jscomp$20$$.$$$$.$ptr$) {
    throw new $BindingError$$(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if ($handle$jscomp$20$$.$$$$.$ptrType$.$isConst$) {
    throw new $BindingError$$(`Cannot convert argument of type ${$handle$jscomp$20$$.$$$$.$ptrType$.name} to parameter type ${this.name}`);
  }
  return $upcastPointer$$($handle$jscomp$20$$.$$$$.$ptr$, $handle$jscomp$20$$.$$$$.$ptrType$.$registeredClass$, this.$registeredClass$);
}
function $readPointer$$($pointer$jscomp$9$$) {
  return this.$fromWireType$($HEAPU32$$[$pointer$jscomp$9$$ >> 2]);
}
function $RegisteredPointer$$($name$jscomp$107$$, $registeredClass$$, $isReference$$, $isConst$$, $isSmartPointer$$, $pointeeType$$, $sharingPolicy$$, $rawGetPointee$$, $rawConstructor$$, $rawShare$$, $rawDestructor$jscomp$1$$) {
  this.name = $name$jscomp$107$$;
  this.$registeredClass$ = $registeredClass$$;
  this.$isReference$ = $isReference$$;
  this.$isConst$ = $isConst$$;
  this.$isSmartPointer$ = $isSmartPointer$$;
  this.$pointeeType$ = $pointeeType$$;
  this.$sharingPolicy$ = $sharingPolicy$$;
  this.$rawGetPointee$ = $rawGetPointee$$;
  this.$rawConstructor$ = $rawConstructor$$;
  this.$rawShare$ = $rawShare$$;
  this.$rawDestructor$ = $rawDestructor$jscomp$1$$;
  $isSmartPointer$$ || void 0 !== $registeredClass$$.$baseClass$ ? this.$toWireType$ = $genericPointerToWireType$$ : (this.$toWireType$ = $isConst$$ ? $constNoSmartPtrRawPointerToWireType$$ : $nonConstNoSmartPtrRawPointerToWireType$$, this.$destructorFunction$ = null);
}
var $replacePublicSymbol$$ = ($name$jscomp$108$$, $value$jscomp$101$$) => {
  if (!$Module$$.hasOwnProperty($name$jscomp$108$$)) {
    throw new $InternalError$$("Replacing nonexistent public symbol");
  }
  $Module$$[$name$jscomp$108$$] = $value$jscomp$101$$;
  $Module$$[$name$jscomp$108$$].$argCount$ = void 0;
}, $wasmTableMirror$$ = [], $embind__requireFunction$$ = ($signature$jscomp$1$$, $rawFunction$$, $fp_func$jscomp$inline_396_isAsync$$ = !1) => {
  $assert$$(!$fp_func$jscomp$inline_396_isAsync$$, "Async bindings are only supported with JSPI.");
  $signature$jscomp$1$$ = $AsciiToString$$($signature$jscomp$1$$);
  ($fp_func$jscomp$inline_396_isAsync$$ = $wasmTableMirror$$[$rawFunction$$]) || ($wasmTableMirror$$[$rawFunction$$] = $fp_func$jscomp$inline_396_isAsync$$ = $wasmTable$$.get($rawFunction$$));
  $assert$$($wasmTable$$.get($rawFunction$$) == $fp_func$jscomp$inline_396_isAsync$$, "JavaScript-side Wasm function table mirror is out of date!");
  if ("function" != typeof $fp_func$jscomp$inline_396_isAsync$$) {
    throw new $BindingError$$(`unknown function pointer with signature ${$signature$jscomp$1$$}: ${$rawFunction$$}`);
  }
  return $fp_func$jscomp$inline_396_isAsync$$;
};
class $UnboundTypeError$$ extends Error {
}
var $getTypeName$$ = $ptr$jscomp$19_type$jscomp$172$$ => {
  $ptr$jscomp$19_type$jscomp$172$$ = $___getTypeName$$($ptr$jscomp$19_type$jscomp$172$$);
  var $rv$jscomp$2$$ = $AsciiToString$$($ptr$jscomp$19_type$jscomp$172$$);
  $_free$$($ptr$jscomp$19_type$jscomp$172$$);
  return $rv$jscomp$2$$;
}, $throwUnboundTypeError$$ = ($message$jscomp$44$$, $types$$) => {
  function $visit$$($type$jscomp$173$$) {
    $seen$$[$type$jscomp$173$$] || $registeredTypes$$[$type$jscomp$173$$] || ($typeDependencies$$[$type$jscomp$173$$] ? $typeDependencies$$[$type$jscomp$173$$].forEach($visit$$) : ($unboundTypes$$.push($type$jscomp$173$$), $seen$$[$type$jscomp$173$$] = !0));
  }
  var $unboundTypes$$ = [], $seen$$ = {};
  $types$$.forEach($visit$$);
  throw new $UnboundTypeError$$(`${$message$jscomp$44$$}: ` + $unboundTypes$$.map($getTypeName$$).join([", "]));
}, $whenDependentTypesAreResolved$$ = ($myTypes$$, $dependentTypes$$, $getTypeConverters$$) => {
  function $onComplete$$($myTypeConverters_typeConverters$jscomp$1$$) {
    $myTypeConverters_typeConverters$jscomp$1$$ = $getTypeConverters$$($myTypeConverters_typeConverters$jscomp$1$$);
    if ($myTypeConverters_typeConverters$jscomp$1$$.length !== $myTypes$$.length) {
      throw new $InternalError$$("Mismatched type converter count");
    }
    for (var $i$jscomp$22$$ = 0; $i$jscomp$22$$ < $myTypes$$.length; ++$i$jscomp$22$$) {
      $registerType$$($myTypes$$[$i$jscomp$22$$], $myTypeConverters_typeConverters$jscomp$1$$[$i$jscomp$22$$]);
    }
  }
  $myTypes$$.forEach($type$jscomp$174$$ => $typeDependencies$$[$type$jscomp$174$$] = $dependentTypes$$);
  var $typeConverters$$ = Array($dependentTypes$$.length), $unregisteredTypes$$ = [], $registered$$ = 0;
  for (let [$i$jscomp$23$$, $dt$$] of $dependentTypes$$.entries()) {
    $registeredTypes$$.hasOwnProperty($dt$$) ? $typeConverters$$[$i$jscomp$23$$] = $registeredTypes$$[$dt$$] : ($unregisteredTypes$$.push($dt$$), $awaitingDependencies$$.hasOwnProperty($dt$$) || ($awaitingDependencies$$[$dt$$] = []), $awaitingDependencies$$[$dt$$].push(() => {
      $typeConverters$$[$i$jscomp$23$$] = $registeredTypes$$[$dt$$];
      ++$registered$$;
      $registered$$ === $unregisteredTypes$$.length && $onComplete$$($typeConverters$$);
    }));
  }
  0 === $unregisteredTypes$$.length && $onComplete$$($typeConverters$$);
}, $heap32VectorToArray$$ = ($count$jscomp$39$$, $firstElement$$) => {
  for (var $array$jscomp$6$$ = [], $i$jscomp$24$$ = 0; $i$jscomp$24$$ < $count$jscomp$39$$; $i$jscomp$24$$++) {
    $array$jscomp$6$$.push($HEAPU32$$[$firstElement$$ + 4 * $i$jscomp$24$$ >> 2]);
  }
  return $array$jscomp$6$$;
}, $runDestructors$$ = $destructors$jscomp$5$$ => {
  for (; $destructors$jscomp$5$$.length;) {
    var $ptr$jscomp$20$$ = $destructors$jscomp$5$$.pop();
    $destructors$jscomp$5$$.pop()($ptr$jscomp$20$$);
  }
};
function $usesDestructorStack$$($argTypes$$) {
  for (var $i$jscomp$25$$ = 1; $i$jscomp$25$$ < $argTypes$$.length; ++$i$jscomp$25$$) {
    if (null !== $argTypes$$[$i$jscomp$25$$] && void 0 === $argTypes$$[$i$jscomp$25$$].$destructorFunction$) {
      return !0;
    }
  }
  return !1;
}
function $checkArgCount$$($numArgs$$, $minArgs$$, $maxArgs$$, $humanName$jscomp$1$$, $throwBindingError$jscomp$1$$) {
  ($numArgs$$ < $minArgs$$ || $numArgs$$ > $maxArgs$$) && $throwBindingError$jscomp$1$$(`function ${$humanName$jscomp$1$$} called with ${$numArgs$$} arguments, expected ${$minArgs$$ == $maxArgs$$ ? $minArgs$$ : `${$minArgs$$} to ${$maxArgs$$}`}`);
}
function $craftInvokerFunction$$($humanName$jscomp$2$$, $argTypes$jscomp$3_invokerFn$$, $classType_returns$jscomp$1$$, $closureArgs_cppInvokerFunc$$, $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$, $isAsync$jscomp$2_paramName$jscomp$inline_198$$) {
  var $argCount$jscomp$1_i$jscomp$inline_193$$ = $argTypes$jscomp$3_invokerFn$$.length;
  if (2 > $argCount$jscomp$1_i$jscomp$inline_193$$) {
    throw new $BindingError$$("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  $assert$$(!$isAsync$jscomp$2_paramName$jscomp$inline_198$$, "Async bindings are only supported with JSPI.");
  var $isClassMethodFunc$jscomp$1$$ = null !== $argTypes$jscomp$3_invokerFn$$[1] && null !== $classType_returns$jscomp$1$$, $needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$ = $usesDestructorStack$$($argTypes$jscomp$3_invokerFn$$);
  $classType_returns$jscomp$1$$ = !$argTypes$jscomp$3_invokerFn$$[0].$isVoid$;
  var $argCount$jscomp$inline_190_expectedArgCount$$ = $argCount$jscomp$1_i$jscomp$inline_193$$ - 2;
  var $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ = $argTypes$jscomp$3_invokerFn$$.length - 2;
  for (var $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$ = $argTypes$jscomp$3_invokerFn$$.length - 1; 2 <= $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$ && $argTypes$jscomp$3_invokerFn$$[$argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$].optional; --$argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$) {
    $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$--;
  }
  $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$ = $argTypes$jscomp$3_invokerFn$$[0];
  var $dtorStack$jscomp$inline_195_instType$$ = $argTypes$jscomp$3_invokerFn$$[1];
  $closureArgs_cppInvokerFunc$$ = [$humanName$jscomp$2$$, $throwBindingError$$, $closureArgs_cppInvokerFunc$$, $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$, $runDestructors$$, $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.$fromWireType$.bind($argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$), $dtorStack$jscomp$inline_195_instType$$?.$toWireType$.bind($dtorStack$jscomp$inline_195_instType$$)];
  for ($argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ = 2; $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ < $argCount$jscomp$1_i$jscomp$inline_193$$; ++$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$) {
    $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$ = $argTypes$jscomp$3_invokerFn$$[$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$], $closureArgs_cppInvokerFunc$$.push($argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.$toWireType$.bind($argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$));
  }
  if (!$needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$) {
    for ($argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ = $isClassMethodFunc$jscomp$1$$ ? 1 : 2; $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ < $argTypes$jscomp$3_invokerFn$$.length; ++$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$) {
      null !== $argTypes$jscomp$3_invokerFn$$[$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$].$destructorFunction$ && $closureArgs_cppInvokerFunc$$.push($argTypes$jscomp$3_invokerFn$$[$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$].$destructorFunction$);
    }
  }
  $closureArgs_cppInvokerFunc$$.push($checkArgCount$$, $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$, $argCount$jscomp$inline_190_expectedArgCount$$);
  $needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$ = $usesDestructorStack$$($argTypes$jscomp$3_invokerFn$$);
  $argCount$jscomp$inline_190_expectedArgCount$$ = $argTypes$jscomp$3_invokerFn$$.length - 2;
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ = [];
  $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ = ["fn"];
  $isClassMethodFunc$jscomp$1$$ && $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$.push("thisWired");
  for ($argCount$jscomp$1_i$jscomp$inline_193$$ = 0; $argCount$jscomp$1_i$jscomp$inline_193$$ < $argCount$jscomp$inline_190_expectedArgCount$$; ++$argCount$jscomp$1_i$jscomp$inline_193$$) {
    $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$.push(`arg${$argCount$jscomp$1_i$jscomp$inline_193$$}`), $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$.push(`arg${$argCount$jscomp$1_i$jscomp$inline_193$$}Wired`);
  }
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ = $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$.join(",");
  $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$ = $argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$.join(",");
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ = `return function (${$argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$}) {\n` + "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  $needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$ && ($argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += "var destructors = [];\n");
  $dtorStack$jscomp$inline_195_instType$$ = $needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$ ? "destructors" : "null";
  $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$ = "humanName throwBindingError invoker fn runDestructors fromRetWire toClassParamWire".split(" ");
  $isClassMethodFunc$jscomp$1$$ && ($argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += `var thisWired = toClassParamWire(${$dtorStack$jscomp$inline_195_instType$$}, this);\n`);
  for ($argCount$jscomp$1_i$jscomp$inline_193$$ = 0; $argCount$jscomp$1_i$jscomp$inline_193$$ < $argCount$jscomp$inline_190_expectedArgCount$$; ++$argCount$jscomp$1_i$jscomp$inline_193$$) {
    var $argName$jscomp$inline_197$$ = `toArg${$argCount$jscomp$1_i$jscomp$inline_193$$}Wire`;
    $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += `var arg${$argCount$jscomp$1_i$jscomp$inline_193$$}Wired = ${$argName$jscomp$inline_197$$}(${$dtorStack$jscomp$inline_195_instType$$}, arg${$argCount$jscomp$1_i$jscomp$inline_193$$});\n`;
    $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.push($argName$jscomp$inline_197$$);
  }
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += ($classType_returns$jscomp$1$$ || $isAsync$jscomp$2_paramName$jscomp$inline_198$$ ? "var rv = " : "") + `invoker(${$argsListWired$jscomp$inline_192_cppTargetFunc_i$jscomp$28$$});\n`;
  if ($needsDestructorStack$jscomp$1_needsDestructorStack$jscomp$inline_189$$) {
    $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += "runDestructors(destructors);\n";
  } else {
    for ($argCount$jscomp$1_i$jscomp$inline_193$$ = $isClassMethodFunc$jscomp$1$$ ? 1 : 2; $argCount$jscomp$1_i$jscomp$inline_193$$ < $argTypes$jscomp$3_invokerFn$$.length; ++$argCount$jscomp$1_i$jscomp$inline_193$$) {
      $isAsync$jscomp$2_paramName$jscomp$inline_198$$ = 1 === $argCount$jscomp$1_i$jscomp$inline_193$$ ? "thisWired" : "arg" + ($argCount$jscomp$1_i$jscomp$inline_193$$ - 2) + "Wired", null !== $argTypes$jscomp$3_invokerFn$$[$argCount$jscomp$1_i$jscomp$inline_193$$].$destructorFunction$ && ($argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += `${$isAsync$jscomp$2_paramName$jscomp$inline_198$$}_dtor(${$isAsync$jscomp$2_paramName$jscomp$inline_198$$});\n`, 
      $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.push(`${$isAsync$jscomp$2_paramName$jscomp$inline_198$$}_dtor`));
    }
  }
  $classType_returns$jscomp$1$$ && ($argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += "var ret = fromRetWire(rv);\nreturn ret;\n");
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ += "}\n";
  $argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.push("checkArgCount", "minArgs", "maxArgs");
  $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$ = `if (arguments.length !== ${$argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.length}){ throw new Error(humanName + "Expected ${$argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$.length} closure arguments " + arguments.length + " given."); }\n${$argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$}`;
  $argTypes$jscomp$3_invokerFn$$ = (new Function($argType_args1$jscomp$inline_196_i$jscomp$inline_183_retType$$, $argsList$jscomp$inline_191_invokerFnBody$jscomp$inline_194_minArgs$jscomp$1_requiredArgCount$jscomp$inline_182$$))(...$closureArgs_cppInvokerFunc$$);
  return $createNamedFunction$$($humanName$jscomp$2$$, $argTypes$jscomp$3_invokerFn$$);
}
var $getFunctionName$$ = $signature$jscomp$2$$ => {
  $signature$jscomp$2$$ = $signature$jscomp$2$$.trim();
  const $argsIndex$$ = $signature$jscomp$2$$.indexOf("(");
  if (-1 === $argsIndex$$) {
    return $signature$jscomp$2$$;
  }
  $assert$$($signature$jscomp$2$$.endsWith(")"), "Parentheses for argument names should match.");
  return $signature$jscomp$2$$.slice(0, $argsIndex$$);
}, $emval_freelist$$ = [], $emval_handles$$ = [0, 1, , 1, null, 1, !0, 1, !1, 1], $__emval_decref$$ = $handle$jscomp$21$$ => {
  9 < $handle$jscomp$21$$ && 0 === --$emval_handles$$[$handle$jscomp$21$$ + 1] && ($assert$$(void 0 !== $emval_handles$$[$handle$jscomp$21$$], "Decref for unallocated handle."), $emval_handles$$[$handle$jscomp$21$$] = void 0, $emval_freelist$$.push($handle$jscomp$21$$));
}, $Emval$toValue$$ = $handle$jscomp$22$$ => {
  if (!$handle$jscomp$22$$) {
    throw new $BindingError$$(`Cannot use deleted val. handle = ${$handle$jscomp$22$$}`);
  }
  $assert$$(2 === $handle$jscomp$22$$ || void 0 !== $emval_handles$$[$handle$jscomp$22$$] && 0 === $handle$jscomp$22$$ % 2, `invalid handle: ${$handle$jscomp$22$$}`);
  return $emval_handles$$[$handle$jscomp$22$$];
}, $Emval$toHandle$$ = $value$jscomp$102$$ => {
  switch($value$jscomp$102$$) {
    case void 0:
      return 2;
    case null:
      return 4;
    case !0:
      return 6;
    case !1:
      return 8;
    default:
      const $handle$jscomp$23$$ = $emval_freelist$$.pop() || $emval_handles$$.length;
      $emval_handles$$[$handle$jscomp$23$$] = $value$jscomp$102$$;
      $emval_handles$$[$handle$jscomp$23$$ + 1] = 1;
      return $handle$jscomp$23$$;
  }
}, $EmValType$$ = {name:"emscripten::val", $fromWireType$:$handle$jscomp$24$$ => {
  var $rv$jscomp$3$$ = $Emval$toValue$$($handle$jscomp$24$$);
  $__emval_decref$$($handle$jscomp$24$$);
  return $rv$jscomp$3$$;
}, $toWireType$:($destructors$jscomp$7$$, $value$jscomp$103$$) => $Emval$toHandle$$($value$jscomp$103$$), $readValueFromPointer$:$readPointer$$, $destructorFunction$:null}, $floatReadValueFromPointer$$ = ($name$jscomp$110$$, $width$jscomp$29$$) => {
  switch($width$jscomp$29$$) {
    case 4:
      return function($pointer$jscomp$10$$) {
        return this.$fromWireType$($HEAPF32$$[$pointer$jscomp$10$$ >> 2]);
      };
    case 8:
      return function($pointer$jscomp$11$$) {
        return this.$fromWireType$($HEAPF64$$[$pointer$jscomp$11$$ >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${$width$jscomp$29$$}): ${$name$jscomp$110$$}`);
  }
}, $stringToUTF8$$ = ($str$jscomp$12$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$) => {
  $assert$$("number" == typeof $maxBytesToWrite$jscomp$1$$, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return $stringToUTF8Array$$($str$jscomp$12$$, $HEAPU8$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$);
}, $UTF16Decoder$$ = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, $UTF16ToString$$ = ($i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$, $ignoreNul$jscomp$3_str$jscomp$14$$) => {
  $assert$$(0 == $i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$ % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  $i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$ >>= 1;
  $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ = $findStringEnd$$($HEAPU16$$, $i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ / 2, $ignoreNul$jscomp$3_str$jscomp$14$$);
  if (16 < $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ - $i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$ && $UTF16Decoder$$) {
    return $UTF16Decoder$$.decode($HEAPU16$$.subarray($i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$));
  }
  for ($ignoreNul$jscomp$3_str$jscomp$14$$ = ""; $i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$ < $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$; ++$i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$) {
    $ignoreNul$jscomp$3_str$jscomp$14$$ += String.fromCharCode($HEAPU16$$[$i$jscomp$31_idx$jscomp$4_ptr$jscomp$23$$]);
  }
  return $ignoreNul$jscomp$3_str$jscomp$14$$;
}, $stringToUTF16$$ = ($str$jscomp$15$$, $outPtr$jscomp$1$$, $maxBytesToWrite$jscomp$2_numCharsToWrite$$) => {
  $assert$$(0 == $outPtr$jscomp$1$$ % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  $assert$$("number" == typeof $maxBytesToWrite$jscomp$2_numCharsToWrite$$, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ ??= 2147483647;
  if (2 > $maxBytesToWrite$jscomp$2_numCharsToWrite$$) {
    return 0;
  }
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ -= 2;
  var $startPtr$$ = $outPtr$jscomp$1$$;
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ = $maxBytesToWrite$jscomp$2_numCharsToWrite$$ < 2 * $str$jscomp$15$$.length ? $maxBytesToWrite$jscomp$2_numCharsToWrite$$ / 2 : $str$jscomp$15$$.length;
  for (var $i$jscomp$32$$ = 0; $i$jscomp$32$$ < $maxBytesToWrite$jscomp$2_numCharsToWrite$$; ++$i$jscomp$32$$) {
    $HEAP16$$[$outPtr$jscomp$1$$ >> 1] = $str$jscomp$15$$.charCodeAt($i$jscomp$32$$), $outPtr$jscomp$1$$ += 2;
  }
  $HEAP16$$[$outPtr$jscomp$1$$ >> 1] = 0;
  return $outPtr$jscomp$1$$ - $startPtr$$;
}, $lengthBytesUTF16$$ = $str$jscomp$16$$ => 2 * $str$jscomp$16$$.length, $UTF32ToString$$ = ($ptr$jscomp$24_startIdx$jscomp$1$$, $maxBytesToRead$jscomp$4$$, $ignoreNul$jscomp$4$$) => {
  $assert$$(0 == $ptr$jscomp$24_startIdx$jscomp$1$$ % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var $str$jscomp$17$$ = "";
  $ptr$jscomp$24_startIdx$jscomp$1$$ >>= 2;
  for (var $i$jscomp$33$$ = 0; !($i$jscomp$33$$ >= $maxBytesToRead$jscomp$4$$ / 4); $i$jscomp$33$$++) {
    var $utf32$$ = $HEAPU32$$[$ptr$jscomp$24_startIdx$jscomp$1$$ + $i$jscomp$33$$];
    if (!$utf32$$ && !$ignoreNul$jscomp$4$$) {
      break;
    }
    $str$jscomp$17$$ += String.fromCodePoint($utf32$$);
  }
  return $str$jscomp$17$$;
}, $stringToUTF32$$ = ($str$jscomp$18$$, $outPtr$jscomp$2$$, $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) => {
  $assert$$(0 == $outPtr$jscomp$2$$ % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  $assert$$("number" == typeof $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ ??= 2147483647;
  if (4 > $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) {
    return 0;
  }
  var $startPtr$jscomp$1$$ = $outPtr$jscomp$2$$;
  $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ = $startPtr$jscomp$1$$ + $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ - 4;
  for (var $i$jscomp$34$$ = 0; $i$jscomp$34$$ < $str$jscomp$18$$.length; ++$i$jscomp$34$$) {
    var $codePoint$jscomp$1$$ = $str$jscomp$18$$.codePointAt($i$jscomp$34$$);
    65535 < $codePoint$jscomp$1$$ && $i$jscomp$34$$++;
    $HEAP32$$[$outPtr$jscomp$2$$ >> 2] = $codePoint$jscomp$1$$;
    $outPtr$jscomp$2$$ += 4;
    if ($outPtr$jscomp$2$$ + 4 > $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) {
      break;
    }
  }
  $HEAP32$$[$outPtr$jscomp$2$$ >> 2] = 0;
  return $outPtr$jscomp$2$$ - $startPtr$jscomp$1$$;
}, $lengthBytesUTF32$$ = $str$jscomp$19$$ => {
  for (var $len$jscomp$7$$ = 0, $i$jscomp$35$$ = 0; $i$jscomp$35$$ < $str$jscomp$19$$.length; ++$i$jscomp$35$$) {
    65535 < $str$jscomp$19$$.codePointAt($i$jscomp$35$$) && $i$jscomp$35$$++, $len$jscomp$7$$ += 4;
  }
  return $len$jscomp$7$$;
}, $emval_methodCallers$$ = [], $emval_addMethodCaller$$ = $caller$$ => {
  var $id$jscomp$9$$ = $emval_methodCallers$$.length;
  $emval_methodCallers$$.push($caller$$);
  return $id$jscomp$9$$;
}, $emval_lookupTypes$$ = ($argCount$jscomp$4_message$jscomp$inline_398$$, $argTypes$jscomp$6$$) => {
  for (var $a$jscomp$1$$ = Array($argCount$jscomp$4_message$jscomp$inline_398$$), $i$jscomp$36$$ = 0; $i$jscomp$36$$ < $argCount$jscomp$4_message$jscomp$inline_398$$; ++$i$jscomp$36$$) {
    var $JSCompiler_temp_const$jscomp$48$$ = $i$jscomp$36$$, $rawType$jscomp$inline_204$$ = $HEAPU32$$[$argTypes$jscomp$6$$ + 4 * $i$jscomp$36$$ >> 2], $impl$jscomp$inline_206$$ = $registeredTypes$$[$rawType$jscomp$inline_204$$];
    if (void 0 === $impl$jscomp$inline_206$$) {
      throw $argCount$jscomp$4_message$jscomp$inline_398$$ = `${`parameter ${$i$jscomp$36$$}`} has unknown type ${$getTypeName$$($rawType$jscomp$inline_204$$)}`, new $BindingError$$($argCount$jscomp$4_message$jscomp$inline_398$$);
    }
    $a$jscomp$1$$[$JSCompiler_temp_const$jscomp$48$$] = $impl$jscomp$inline_206$$;
  }
  return $a$jscomp$1$$;
}, $emval_returnValue$$ = ($result$jscomp$7_toReturnWire$$, $destructorsRef$$, $handle$jscomp$26$$) => {
  var $destructors$jscomp$13$$ = [];
  $result$jscomp$7_toReturnWire$$ = $result$jscomp$7_toReturnWire$$($destructors$jscomp$13$$, $handle$jscomp$26$$);
  $destructors$jscomp$13$$.length && ($HEAPU32$$[$destructorsRef$$ >> 2] = $Emval$toHandle$$($destructors$jscomp$13$$));
  return $result$jscomp$7_toReturnWire$$;
}, $emval_symbols$$ = {}, $getStringOrSymbol$$ = $address$$ => {
  var $symbol$$ = $emval_symbols$$[$address$$];
  return void 0 === $symbol$$ ? $AsciiToString$$($address$$) : $symbol$$;
}, $readEmAsmArgsArray$$ = [], $specialHTMLTargets$$ = [0, document, window], $findEventTarget$$ = $cString$jscomp$inline_208_target$jscomp$92$$ => {
  $cString$jscomp$inline_208_target$jscomp$92$$ = 2 < $cString$jscomp$inline_208_target$jscomp$92$$ ? $UTF8ToString$$($cString$jscomp$inline_208_target$jscomp$92$$) : $cString$jscomp$inline_208_target$jscomp$92$$;
  return $specialHTMLTargets$$[$cString$jscomp$inline_208_target$jscomp$92$$] || document.querySelector($cString$jscomp$inline_208_target$jscomp$92$$);
}, $GLctx$$, $getEmscriptenSupportedExtensions$$ = $ctx$jscomp$6$$ => {
  var $supportedExtensions$$ = "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return ($ctx$jscomp$6$$.getSupportedExtensions() || []).filter($ext$$ => $supportedExtensions$$.includes($ext$$));
}, $GL$counter$$ = 1, $GL$buffers$$ = [], $GL$programs$$ = [], $GL$textures$$ = [], $GL$shaders$$ = [], $GL$vaos$$ = [], $GL$contexts$$ = [], $GL$getNewId$$ = $table$$ => {
  for (var $ret$jscomp$5$$ = $GL$counter$$++, $i$jscomp$38$$ = $table$$.length; $i$jscomp$38$$ < $ret$jscomp$5$$; $i$jscomp$38$$++) {
    $table$$[$i$jscomp$38$$] = null;
  }
  return $ret$jscomp$5$$;
}, $GL$genObject$$ = ($n$jscomp$4$$, $buffers$jscomp$2$$, $createFunction$$, $objectTable$$) => {
  for (var $i$jscomp$39$$ = 0; $i$jscomp$39$$ < $n$jscomp$4$$; $i$jscomp$39$$++) {
    var $buffer$jscomp$32$$ = $GLctx$$[$createFunction$$](), $id$jscomp$10$$ = $buffer$jscomp$32$$ && $GL$getNewId$$($objectTable$$);
    $buffer$jscomp$32$$ ? ($buffer$jscomp$32$$.name = $id$jscomp$10$$, $objectTable$$[$id$jscomp$10$$] = $buffer$jscomp$32$$) : $GL$lastError$$ ||= 1282;
    $HEAP32$$[$buffers$jscomp$2$$ + 4 * $i$jscomp$39$$ >> 2] = $id$jscomp$10$$;
  }
}, $GL$createContext$$ = ($canvas$jscomp$1$$, $webGLContextAttributes$$) => {
  $canvas$jscomp$1$$.$g$ || ($canvas$jscomp$1$$.$g$ = $canvas$jscomp$1$$.getContext, $canvas$jscomp$1$$.getContext = function($ver$$, $attrs_gl$$) {
    $attrs_gl$$ = $canvas$jscomp$1$$.$g$($ver$$, $attrs_gl$$);
    return "webgl" == $ver$$ == $attrs_gl$$ instanceof WebGLRenderingContext ? $attrs_gl$$ : null;
  });
  var $ctx$jscomp$7$$ = $canvas$jscomp$1$$.getContext("webgl2", $webGLContextAttributes$$);
  return $ctx$jscomp$7$$ ? $GL$registerContext$$($ctx$jscomp$7$$, $webGLContextAttributes$$) : 0;
}, $GL$registerContext$$ = ($context$jscomp$inline_212_ctx$jscomp$8$$, $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$) => {
  var $handle$jscomp$31$$ = $GL$getNewId$$($GL$contexts$$), $context$jscomp$6$$ = {handle:$handle$jscomp$31$$, attributes:$GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$, version:$GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$majorVersion$, $GLctx$:$context$jscomp$inline_212_ctx$jscomp$8$$};
  $context$jscomp$inline_212_ctx$jscomp$8$$.canvas && ($context$jscomp$inline_212_ctx$jscomp$8$$.canvas.$GLctxObject$ = $context$jscomp$6$$);
  $GL$contexts$$[$handle$jscomp$31$$] = $context$jscomp$6$$;
  if ("undefined" == typeof $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$enableExtensionsByDefault$ || $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$enableExtensionsByDefault$) {
    if (($context$jscomp$inline_212_ctx$jscomp$8$$ = $context$jscomp$6$$) || ($context$jscomp$inline_212_ctx$jscomp$8$$ = $GL$currentContext$$), !$context$jscomp$inline_212_ctx$jscomp$8$$.$initExtensionsDone$) {
      $context$jscomp$inline_212_ctx$jscomp$8$$.$initExtensionsDone$ = !0;
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$ = $context$jscomp$inline_212_ctx$jscomp$8$$.$GLctx$;
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$multiDrawWebgl$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("WEBGL_multi_draw");
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$extPolygonOffsetClamp$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("EXT_polygon_offset_clamp");
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$extClipControl$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("EXT_clip_control");
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$webglPolygonMode$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("WEBGL_polygon_mode");
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$dibvbi$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
      $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$mdibvbi$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
      2 <= $context$jscomp$inline_212_ctx$jscomp$8$$.version && ($GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$disjointTimerQueryExt$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("EXT_disjoint_timer_query_webgl2"));
      if (2 > $context$jscomp$inline_212_ctx$jscomp$8$$.version || !$GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$disjointTimerQueryExt$) {
        $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.$disjointTimerQueryExt$ = $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension("EXT_disjoint_timer_query");
      }
      for (var $ext$jscomp$inline_214$$ of $getEmscriptenSupportedExtensions$$($GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$)) {
        $ext$jscomp$inline_214$$.includes("lose_context") || $ext$jscomp$inline_214$$.includes("debug") || $GLctx$jscomp$inline_213_webGLContextAttributes$jscomp$1$$.getExtension($ext$jscomp$inline_214$$);
      }
    }
  }
  return $handle$jscomp$31$$;
}, $GL$lastError$$, $GL$currentContext$$, $webglPowerPreferences$$ = ["default", "low-power", "high-performance"], $ENV$$ = {}, $getEnvStrings$$ = () => {
  if (!$getEnvStrings$strings$$) {
    var $env$$ = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:$thisProgram$$ || "./this.program"}, $x$jscomp$92$$;
    for ($x$jscomp$92$$ in $ENV$$) {
      void 0 === $ENV$$[$x$jscomp$92$$] ? delete $env$$[$x$jscomp$92$$] : $env$$[$x$jscomp$92$$] = $ENV$$[$x$jscomp$92$$];
    }
    var $strings$$ = [];
    for ($x$jscomp$92$$ in $env$$) {
      $strings$$.push(`${$x$jscomp$92$$}=${$env$$[$x$jscomp$92$$]}`);
    }
    $getEnvStrings$strings$$ = $strings$$;
  }
  return $getEnvStrings$strings$$;
}, $getEnvStrings$strings$$, $webglGetExtensions$$ = () => {
  var $exts$$ = $getEmscriptenSupportedExtensions$$($GLctx$$);
  return $exts$$ = $exts$$.concat($exts$$.map($e$jscomp$33$$ => "GL_" + $e$jscomp$33$$));
}, $emscriptenWebGLGet$$ = ($i$jscomp$46_name_$$, $p$jscomp$3$$) => {
  if ($p$jscomp$3$$) {
    var $ret$jscomp$8$$ = void 0;
    switch($i$jscomp$46_name_$$) {
      case 36346:
        $ret$jscomp$8$$ = 1;
        break;
      case 36344:
        return;
      case 34814:
      case 36345:
        $ret$jscomp$8$$ = 0;
        break;
      case 34466:
        var $formats_result$jscomp$8$$ = $GLctx$$.getParameter(34467);
        $ret$jscomp$8$$ = $formats_result$jscomp$8$$ ? $formats_result$jscomp$8$$.length : 0;
        break;
      case 33309:
        if (2 > $GL$currentContext$$.version) {
          $GL$lastError$$ ||= 1282;
          return;
        }
        $ret$jscomp$8$$ = $webglGetExtensions$$().length;
        break;
      case 33307:
      case 33308:
        if (2 > $GL$currentContext$$.version) {
          $GL$lastError$$ ||= 1280;
          return;
        }
        $ret$jscomp$8$$ = 33307 == $i$jscomp$46_name_$$ ? 3 : 0;
    }
    if (void 0 === $ret$jscomp$8$$) {
      switch($formats_result$jscomp$8$$ = $GLctx$$.getParameter($i$jscomp$46_name_$$), typeof $formats_result$jscomp$8$$) {
        case "number":
          $ret$jscomp$8$$ = $formats_result$jscomp$8$$;
          break;
        case "boolean":
          $ret$jscomp$8$$ = $formats_result$jscomp$8$$ ? 1 : 0;
          break;
        case "string":
          $GL$lastError$$ ||= 1280;
          return;
        case "object":
          if (null === $formats_result$jscomp$8$$) {
            switch($i$jscomp$46_name_$$) {
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
                $ret$jscomp$8$$ = 0;
                break;
              default:
                $GL$lastError$$ ||= 1280;
                return;
            }
          } else {
            if ($formats_result$jscomp$8$$ instanceof Float32Array || $formats_result$jscomp$8$$ instanceof Uint32Array || $formats_result$jscomp$8$$ instanceof Int32Array || $formats_result$jscomp$8$$ instanceof Array) {
              for ($i$jscomp$46_name_$$ = 0; $i$jscomp$46_name_$$ < $formats_result$jscomp$8$$.length; ++$i$jscomp$46_name_$$) {
                $HEAP32$$[$p$jscomp$3$$ + 4 * $i$jscomp$46_name_$$ >> 2] = $formats_result$jscomp$8$$[$i$jscomp$46_name_$$];
              }
              return;
            }
            try {
              $ret$jscomp$8$$ = $formats_result$jscomp$8$$.name | 0;
            } catch ($e$jscomp$34$$) {
              $GL$lastError$$ ||= 1280;
              $err$$(`GL_INVALID_ENUM in glGet${0}v: Unknown object returned from WebGL getParameter(${$i$jscomp$46_name_$$})! (error: ${$e$jscomp$34$$})`);
              return;
            }
          }
          break;
        default:
          $GL$lastError$$ ||= 1280;
          $err$$(`GL_INVALID_ENUM in glGet${0}v: Native code calling glGet${0}v(${$i$jscomp$46_name_$$}) and it returns ${$formats_result$jscomp$8$$} of type ${typeof $formats_result$jscomp$8$$}!`);
          return;
      }
    }
    $HEAP32$$[$p$jscomp$3$$ >> 2] = $ret$jscomp$8$$;
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $webglGetLeftBracePos$$ = $name$jscomp$119$$ => "]" == $name$jscomp$119$$.slice(-1) && $name$jscomp$119$$.lastIndexOf("["), $heapObjectForWebGLType$$ = $type$jscomp$178$$ => {
  $type$jscomp$178$$ -= 5120;
  return 0 == $type$jscomp$178$$ ? $HEAP8$$ : 1 == $type$jscomp$178$$ ? $HEAPU8$$ : 2 == $type$jscomp$178$$ ? $HEAP16$$ : 4 == $type$jscomp$178$$ ? $HEAP32$$ : 6 == $type$jscomp$178$$ ? $HEAPF32$$ : 5 == $type$jscomp$178$$ || 28922 == $type$jscomp$178$$ || 28520 == $type$jscomp$178$$ || 30779 == $type$jscomp$178$$ || 30782 == $type$jscomp$178$$ ? $HEAPU32$$ : $HEAPU16$$;
};
$FS$nameTable$$ = Array(4096);
$FS$mount$$($MEMFS$$, "/");
$FS$mkdir$$("/tmp");
$FS$mkdir$$("/home");
$FS$mkdir$$("/home/web_user");
(function() {
  $FS$mkdir$$("/dev");
  $FS$registerDevice$$(259, {read:() => 0, write:($stream$jscomp$38$$, $buffer$jscomp$26$$, $offset$jscomp$36$$, $length$jscomp$29$$) => $length$jscomp$29$$, $llseek$:() => 0});
  $FS$mkdev$$("/dev/null", 259);
  $TTY$register$$(1280, $TTY$default_tty_ops$$);
  $TTY$register$$(1536, $TTY$default_tty1_ops$$);
  $FS$mkdev$$("/dev/tty", 1280);
  $FS$mkdev$$("/dev/tty1", 1536);
  var $randomBuffer$$ = new Uint8Array(1024), $randomLeft$$ = 0, $randomByte$$ = () => {
    0 === $randomLeft$$ && ($randomFill$$($randomBuffer$$), $randomLeft$$ = $randomBuffer$$.byteLength);
    return $randomBuffer$$[--$randomLeft$$];
  };
  $FS$createDevice$$("/dev", "random", $randomByte$$);
  $FS$createDevice$$("/dev", "urandom", $randomByte$$);
  $FS$mkdir$$("/dev/shm");
  $FS$mkdir$$("/dev/shm/tmp");
})();
(function() {
  $FS$mkdir$$("/proc");
  var $proc_self$$ = $FS$mkdir$$("/proc/self");
  $FS$mkdir$$("/proc/self/fd");
  $FS$mount$$({$mount$() {
    var $node$jscomp$45$$ = $FS$createNode$$($proc_self$$, "fd", 16895, 73);
    $node$jscomp$45$$.$stream_ops$ = {$llseek$:$MEMFS$$.$stream_ops$.$llseek$};
    $node$jscomp$45$$.$node_ops$ = {$lookup$($fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$, $name$jscomp$94$$) {
      $fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$ = +$name$jscomp$94$$;
      var $stream$jscomp$39$$ = $FS$getStreamChecked$$($fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$);
      $fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$ = {parent:null, $mount$:{$mountpoint$:"fake"}, $node_ops$:{$readlink$:() => $stream$jscomp$39$$.path}, id:$fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$ + 1};
      return $fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$.parent = $fd$jscomp$10_parent$jscomp$20_ret$jscomp$1$$;
    }, $readdir$() {
      return Array.from($FS$streams$$.entries()).filter(([, $v$$]) => $v$$).map(([$k$jscomp$1$$]) => $k$jscomp$1$$.toString());
    }};
    return $node$jscomp$45$$;
  }}, "/proc/self/fd");
})();
(() => {
  let $proto$jscomp$3$$ = $ClassHandle$$.prototype;
  Object.assign($proto$jscomp$3$$, {isAliasOf:function($other$jscomp$11_right$jscomp$2$$) {
    if (!(this instanceof $ClassHandle$$ && $other$jscomp$11_right$jscomp$2$$ instanceof $ClassHandle$$)) {
      return !1;
    }
    var $leftClass$$ = this.$$$$.$ptrType$.$registeredClass$, $left$jscomp$2$$ = this.$$$$.$ptr$;
    $other$jscomp$11_right$jscomp$2$$.$$$$ = $other$jscomp$11_right$jscomp$2$$.$$$$;
    var $rightClass$$ = $other$jscomp$11_right$jscomp$2$$.$$$$.$ptrType$.$registeredClass$;
    for ($other$jscomp$11_right$jscomp$2$$ = $other$jscomp$11_right$jscomp$2$$.$$$$.$ptr$; $leftClass$$.$baseClass$;) {
      $left$jscomp$2$$ = $leftClass$$.$upcast$($left$jscomp$2$$), $leftClass$$ = $leftClass$$.$baseClass$;
    }
    for (; $rightClass$$.$baseClass$;) {
      $other$jscomp$11_right$jscomp$2$$ = $rightClass$$.$upcast$($other$jscomp$11_right$jscomp$2$$), $rightClass$$ = $rightClass$$.$baseClass$;
    }
    return $leftClass$$ === $rightClass$$ && $left$jscomp$2$$ === $other$jscomp$11_right$jscomp$2$$;
  }, clone:function() {
    this.$$$$.$ptr$ || $throwInstanceAlreadyDeleted$$(this);
    if (this.$$$$.$preservePointerOnDelete$) {
      return this.$$$$.count.value += 1, this;
    }
    var $JSCompiler_temp_const$jscomp$41_clone$$ = $attachFinalizer$$, $JSCompiler_temp_const$jscomp$40$$ = Object, $JSCompiler_temp_const$jscomp$39$$ = $JSCompiler_temp_const$jscomp$40$$.create, $JSCompiler_temp_const$jscomp$38$$ = Object.getPrototypeOf(this), $o$jscomp$inline_240$$ = this.$$$$;
    $JSCompiler_temp_const$jscomp$41_clone$$ = $JSCompiler_temp_const$jscomp$41_clone$$($JSCompiler_temp_const$jscomp$39$$.call($JSCompiler_temp_const$jscomp$40$$, $JSCompiler_temp_const$jscomp$38$$, {$$$$:{value:{count:$o$jscomp$inline_240$$.count, $deleteScheduled$:$o$jscomp$inline_240$$.$deleteScheduled$, $preservePointerOnDelete$:$o$jscomp$inline_240$$.$preservePointerOnDelete$, $ptr$:$o$jscomp$inline_240$$.$ptr$, $ptrType$:$o$jscomp$inline_240$$.$ptrType$, $smartPtr$:$o$jscomp$inline_240$$.$smartPtr$, 
    $smartPtrType$:$o$jscomp$inline_240$$.$smartPtrType$}}}));
    $JSCompiler_temp_const$jscomp$41_clone$$.$$$$.count.value += 1;
    $JSCompiler_temp_const$jscomp$41_clone$$.$$$$.$deleteScheduled$ = !1;
    return $JSCompiler_temp_const$jscomp$41_clone$$;
  }, ["delete"]() {
    this.$$$$.$ptr$ || $throwInstanceAlreadyDeleted$$(this);
    if (this.$$$$.$deleteScheduled$ && !this.$$$$.$preservePointerOnDelete$) {
      throw new $BindingError$$("Object already scheduled for deletion");
    }
    $detachFinalizer$$(this);
    var $$$$jscomp$inline_244$$ = this.$$$$;
    --$$$$jscomp$inline_244$$.count.value;
    0 === $$$$jscomp$inline_244$$.count.value && ($$$$jscomp$inline_244$$.$smartPtr$ ? $$$$jscomp$inline_244$$.$smartPtrType$.$rawDestructor$($$$$jscomp$inline_244$$.$smartPtr$) : $$$$jscomp$inline_244$$.$ptrType$.$registeredClass$.$rawDestructor$($$$$jscomp$inline_244$$.$ptr$));
    this.$$$$.$preservePointerOnDelete$ || (this.$$$$.$smartPtr$ = void 0, this.$$$$.$ptr$ = void 0);
  }, isDeleted:function() {
    return !this.$$$$.$ptr$;
  }, deleteLater:function() {
    this.$$$$.$ptr$ || $throwInstanceAlreadyDeleted$$(this);
    if (this.$$$$.$deleteScheduled$ && !this.$$$$.$preservePointerOnDelete$) {
      throw new $BindingError$$("Object already scheduled for deletion");
    }
    $deletionQueue$$.push(this);
    this.$$$$.$deleteScheduled$ = !0;
    return this;
  }});
  const $symbolDispose$$ = Symbol.dispose;
  $symbolDispose$$ && ($proto$jscomp$3$$[$symbolDispose$$] = $proto$jscomp$3$$["delete"]);
})();
Object.assign($RegisteredPointer$$.prototype, {$getPointee$($ptr$jscomp$inline_248$$) {
  this.$rawGetPointee$ && ($ptr$jscomp$inline_248$$ = this.$rawGetPointee$($ptr$jscomp$inline_248$$));
  return $ptr$jscomp$inline_248$$;
}, $destructor$($ptr$jscomp$inline_249$$) {
  this.$rawDestructor$?.($ptr$jscomp$inline_249$$);
}, $readValueFromPointer$:$readPointer$$, $fromWireType$:$RegisteredPointer_fromWireType$$});
$assert$$(10 === $emval_handles$$.length);
$Module$$.preloadPlugins && ($preloadPlugins$$ = $Module$$.preloadPlugins);
$Module$$.print && ($out$$ = $Module$$.print);
$Module$$.printErr && ($err$$ = $Module$$.printErr);
$Module$$.wasmBinary && ($wasmBinary$$ = $Module$$.wasmBinary);
Object.getOwnPropertyDescriptor($Module$$, "fetchSettings") && $abort$$("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
$Module$$.thisProgram && ($thisProgram$$ = $Module$$.thisProgram);
$assert$$("undefined" == typeof $Module$$.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.read, "Module.read option was removed");
$assert$$("undefined" == typeof $Module$$.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
$assert$$("undefined" == typeof $Module$$.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
$assert$$("undefined" == typeof $Module$$.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
$assert$$("undefined" == typeof $Module$$.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
$assert$$("undefined" == typeof $Module$$.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
$assert$$("undefined" == typeof $Module$$.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
$assert$$("undefined" == typeof $Module$$.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
$assert$$("undefined" == typeof $Module$$.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if ($Module$$.preInit) {
  for ("function" == typeof $Module$$.preInit && ($Module$$.preInit = [$Module$$.preInit]); 0 < $Module$$.preInit.length;) {
    $Module$$.preInit.shift()();
  }
}
$consumedModuleProp$$("preInit");
$Module$$.addRunDependency = $addRunDependency$$;
$Module$$.removeRunDependency = $removeRunDependency$$;
$Module$$.FS_preloadFile = async($parent$jscomp$10$$, $name$jscomp$82$$, $url$jscomp$26$$, $canRead$jscomp$1$$, $canWrite$jscomp$1$$, $dontCreateFile$$, $canOwn$jscomp$1$$, $preFinish$$) => {
  var $fullname$jscomp$1$$ = $name$jscomp$82$$ ? $PATH_FS$resolve$$($PATH$normalize$$($parent$jscomp$10$$ + "/" + $name$jscomp$82$$)) : $parent$jscomp$10$$, $dep$jscomp$1_id$jscomp$inline_252$$;
  a: {
    for (var $byteArray$jscomp$1_orig$jscomp$inline_253$$ = $dep$jscomp$1_id$jscomp$inline_252$$ = `cp ${$fullname$jscomp$1$$}`;;) {
      if (!$runDependencyTracking$$[$dep$jscomp$1_id$jscomp$inline_252$$]) {
        break a;
      }
      $dep$jscomp$1_id$jscomp$inline_252$$ = $byteArray$jscomp$1_orig$jscomp$inline_253$$ + Math.random();
    }
  }
  $addRunDependency$$($dep$jscomp$1_id$jscomp$inline_252$$);
  try {
    $byteArray$jscomp$1_orig$jscomp$inline_253$$ = $url$jscomp$26$$, "string" == typeof $url$jscomp$26$$ && ($byteArray$jscomp$1_orig$jscomp$inline_253$$ = await $asyncLoad$$($url$jscomp$26$$)), $byteArray$jscomp$1_orig$jscomp$inline_253$$ = await $FS_handledByPreloadPlugin$$($byteArray$jscomp$1_orig$jscomp$inline_253$$, $fullname$jscomp$1$$), $preFinish$$?.(), $dontCreateFile$$ || $FS$createDataFile$$($parent$jscomp$10$$, $name$jscomp$82$$, $byteArray$jscomp$1_orig$jscomp$inline_253$$, $canRead$jscomp$1$$, 
    $canWrite$jscomp$1$$, $canOwn$jscomp$1$$);
  } finally {
    $removeRunDependency$$($dep$jscomp$1_id$jscomp$inline_252$$);
  }
};
$Module$$.FS_unlink = (...$args$jscomp$15$$) => $FS$unlink$$(...$args$jscomp$15$$);
$Module$$.FS_createPath = (...$args$jscomp$14$$) => $FS$createPath$$(...$args$jscomp$14$$);
$Module$$.FS_createDevice = (...$args$jscomp$17$$) => $FS$createDevice$$(...$args$jscomp$17$$);
$Module$$.FS_createDataFile = (...$args$jscomp$6$$) => $FS$createDataFile$$(...$args$jscomp$6$$);
$Module$$.FS_createLazyFile = (...$args$jscomp$16$$) => $FS$createLazyFile$$(...$args$jscomp$16$$);
"writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory exitJS withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr runMainThreadEmAsm autoResumeAudioContext getDynCaller dynCall handleException keepRuntimeAlive runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle HandleAllocator addOnInit addOnPostCtor addOnPreMain addOnExit STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags safeSetTimeout setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop registerPreMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory allocateUTF8 allocateUTF8OnStack demangle stackTrace getNativeTypeSize getFunctionArgsName createJsInvokerSignature PureVirtualError registerInheritedInstance unregisterInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer setDelayFunction validateThis count_emval_handles".split(" ").forEach(function($sym$jscomp$2$$) {
  $unexportedRuntimeSymbol$$($sym$jscomp$2$$);
});
"run out err callMain abort wasmExports HEAPF32 HEAPF64 HEAP8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie writeI53ToI64 readI53FromI64 readI53FromU64 INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore createNamedFunction ptrToString getHeapMax growMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray readEmAsmArgs runEmAsmFunction jstoi_q getExecutableName asyncLoad alignMemory mmapAlloc wasmTable wasmMemory getUniqueRunDependency noExitRuntime addOnPreRun addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev initRandomFill randomFill emSetImmediate emClearImmediate_deps emClearImmediate promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia createContext getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType toTypedArrayIndex webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos AL GLUT EGL GLEW IDBStore SDL SDL_gfx webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance print printErr jstoi_s InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError EmValType EmValOptionalType throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol embindRepr registeredInstances getBasestPointer getInheritedInstance registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols getStringOrSymbol Emval emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller".split(" ").forEach($unexportedRuntimeSymbol$$);
var $ASM_CONSTS$$ = {103880:() => {
  throw "A böngésződ nem támogatja a WebGL-t!";
}, 103931:$$0$$ => {
  throw "Sikertelen shader fordítás: " + $UTF8ToString$$($$0$$);
}, 103995:$$0$jscomp$1$$ => {
  throw "Sikertelen shader összekapcsolás: " + $UTF8ToString$$($$0$jscomp$1$$);
}, 104065:($$0$jscomp$2$$, $$1_fps$$) => {
  if ($$1_fps$$ = document.getElementById($UTF8ToString$$($$1_fps$$))) {
    $$1_fps$$.innerText = $$0$jscomp$2$$;
  }
}, 104155:() => {
  console.log("full");
}, 104175:() => {
  console.log("2x2");
}, 104194:() => {
  console.log("4x4");
}}, $___getTypeName$$ = $makeInvalidEarlyAccess$$("___getTypeName"), $_malloc$$ = $makeInvalidEarlyAccess$$("_malloc"), $_free$$ = $makeInvalidEarlyAccess$$("_free"), $_emscripten_stack_get_end$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_get_end"), $_strerror$$ = $makeInvalidEarlyAccess$$("_strerror"), $_emscripten_stack_init$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_init"), $wasmMemory$$ = $makeInvalidEarlyAccess$$("wasmMemory"), $wasmTable$$ = $makeInvalidEarlyAccess$$("wasmTable"), 
$wasmImports$$ = {__cxa_throw:($JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$, $type$jscomp$170$$, $destructor$jscomp$2$$) => {
  $JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$ = new $ExceptionInfo$$($JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$);
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$.$ptr$ + 16 >> 2] = 0;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$.$ptr$ + 4 >> 2] = $type$jscomp$170$$;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_255_ptr$jscomp$3$$.$ptr$ + 8 >> 2] = $destructor$jscomp$2$$;
  $uncaughtExceptionCount$$++;
  $assert$$(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function($fd$jscomp$12$$, $cmd$jscomp$1$$, $varargs$$) {
  $SYSCALLS$varargs$$ = $varargs$$;
  try {
    var $stream$jscomp$51$$ = $FS$getStreamChecked$$($fd$jscomp$12$$);
    switch($cmd$jscomp$1$$) {
      case 0:
        var $arg$jscomp$11$$ = $syscallGetVarargI$$();
        if (0 > $arg$jscomp$11$$) {
          break;
        }
        for (; $FS$streams$$[$arg$jscomp$11$$];) {
          $arg$jscomp$11$$++;
        }
        return $FS$dupStream$$($stream$jscomp$51$$, $arg$jscomp$11$$).$fd$;
      case 1:
      case 2:
        return 0;
      case 3:
        return $stream$jscomp$51$$.flags;
      case 4:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $stream$jscomp$51$$.flags |= $arg$jscomp$11$$, 0;
      case 12:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$11$$ + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch ($e$jscomp$25$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$25$$.name) {
      throw $e$jscomp$25$$;
    }
    return -$e$jscomp$25$$.$errno$;
  }
}, __syscall_ioctl:function($fd$jscomp$13$$, $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$, $varargs$jscomp$1$$) {
  $SYSCALLS$varargs$$ = $varargs$jscomp$1$$;
  try {
    var $stream$jscomp$52$$ = $FS$getStreamChecked$$($fd$jscomp$13$$);
    switch($JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$) {
      case 21509:
        return $stream$jscomp$52$$.$tty$ ? 0 : -59;
      case 21505:
        if (!$stream$jscomp$52$$.$tty$) {
          return -59;
        }
        if ($stream$jscomp$52$$.$tty$.$ops$.$ioctl_tcgets$) {
          $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$ = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var $arg$jscomp$inline_261_argp$$ = $syscallGetVarargI$$();
          $HEAP32$$[$arg$jscomp$inline_261_argp$$ >> 2] = 25856;
          $HEAP32$$[$arg$jscomp$inline_261_argp$$ + 4 >> 2] = 5;
          $HEAP32$$[$arg$jscomp$inline_261_argp$$ + 8 >> 2] = 191;
          $HEAP32$$[$arg$jscomp$inline_261_argp$$ + 12 >> 2] = 35387;
          for (var $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $HEAP8$$[$arg$jscomp$inline_261_argp$$ + $i$jscomp$21_winsize$$ + 17] = $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$[$i$jscomp$21_winsize$$] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return $stream$jscomp$52$$.$tty$ ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!$stream$jscomp$52$$.$tty$) {
          return -59;
        }
        if ($stream$jscomp$52$$.$tty$.$ops$.$ioctl_tcsets$) {
          for ($arg$jscomp$inline_261_argp$$ = $syscallGetVarargI$$(), $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$ = [], $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$.push($HEAP8$$[$arg$jscomp$inline_261_argp$$ + $i$jscomp$21_winsize$$ + 17]);
          }
        }
        return 0;
      case 21519:
        if (!$stream$jscomp$52$$.$tty$) {
          return -59;
        }
        $arg$jscomp$inline_261_argp$$ = $syscallGetVarargI$$();
        return $HEAP32$$[$arg$jscomp$inline_261_argp$$ >> 2] = 0;
      case 21520:
        return $stream$jscomp$52$$.$tty$ ? -28 : -59;
      case 21537:
      case 21531:
        $arg$jscomp$inline_261_argp$$ = $syscallGetVarargI$$();
        if (!$stream$jscomp$52$$.$stream_ops$.$ioctl$) {
          throw new $FS$ErrnoError$$(59);
        }
        return $stream$jscomp$52$$.$stream_ops$.$ioctl$($stream$jscomp$52$$, $JSCompiler_object_inline_c_cc_365_c_cc_op$jscomp$1$$, $arg$jscomp$inline_261_argp$$);
      case 21523:
        if (!$stream$jscomp$52$$.$tty$) {
          return -59;
        }
        $stream$jscomp$52$$.$tty$.$ops$.$ioctl_tiocgwinsz$ && ($i$jscomp$21_winsize$$ = [24, 80], $arg$jscomp$inline_261_argp$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$inline_261_argp$$ >> 1] = $i$jscomp$21_winsize$$[0], $HEAP16$$[$arg$jscomp$inline_261_argp$$ + 2 >> 1] = $i$jscomp$21_winsize$$[1]);
        return 0;
      case 21524:
        return $stream$jscomp$52$$.$tty$ ? 0 : -59;
      case 21515:
        return $stream$jscomp$52$$.$tty$ ? 0 : -59;
      default:
        return -28;
    }
  } catch ($e$jscomp$26$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$26$$.name) {
      throw $e$jscomp$26$$;
    }
    return -$e$jscomp$26$$.$errno$;
  }
}, __syscall_openat:function($dirfd$jscomp$1$$, $path$jscomp$42$$, $flags$jscomp$13$$, $varargs$jscomp$2$$) {
  $SYSCALLS$varargs$$ = $varargs$jscomp$2$$;
  try {
    $path$jscomp$42$$ = $UTF8ToString$$($path$jscomp$42$$);
    var $path$jscomp$inline_264$$ = $path$jscomp$42$$;
    if ("/" === $path$jscomp$inline_264$$.charAt(0)) {
      $path$jscomp$42$$ = $path$jscomp$inline_264$$;
    } else {
      var $dir$jscomp$inline_266$$ = -100 === $dirfd$jscomp$1$$ ? "/" : $FS$getStreamChecked$$($dirfd$jscomp$1$$).path;
      if (0 == $path$jscomp$inline_264$$.length) {
        throw new $FS$ErrnoError$$(44);
      }
      $path$jscomp$42$$ = $dir$jscomp$inline_266$$ + "/" + $path$jscomp$inline_264$$;
    }
    var $mode$jscomp$40$$ = $varargs$jscomp$2$$ ? $syscallGetVarargI$$() : 0;
    return $FS$open$$($path$jscomp$42$$, $flags$jscomp$13$$, $mode$jscomp$40$$).$fd$;
  } catch ($e$jscomp$27$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$27$$.name) {
      throw $e$jscomp$27$$;
    }
    return -$e$jscomp$27$$.$errno$;
  }
}, _abort_js:() => $abort$$("native code called abort()"), _embind_register_bigint:($primitiveType$$, $name$jscomp$101$$, $size$jscomp$24$$, $minRange$jscomp$1$$, $maxRange$jscomp$1$$) => {
  $name$jscomp$101$$ = $AsciiToString$$($name$jscomp$101$$);
  const $isUnsignedType$$ = 0n === $minRange$jscomp$1$$;
  let $fromWireType$$ = $value$jscomp$97$$ => $value$jscomp$97$$;
  if ($isUnsignedType$$) {
    const $bitSize$$ = 8 * $size$jscomp$24$$;
    $fromWireType$$ = $value$jscomp$98$$ => BigInt.asUintN($bitSize$$, $value$jscomp$98$$);
    $maxRange$jscomp$1$$ = $fromWireType$$($maxRange$jscomp$1$$);
  }
  $registerType$$($primitiveType$$, {name:$name$jscomp$101$$, $fromWireType$:$fromWireType$$, $toWireType$:($destructors$$, $value$jscomp$99$$) => {
    if ("number" == typeof $value$jscomp$99$$) {
      $value$jscomp$99$$ = BigInt($value$jscomp$99$$);
    } else if ("bigint" != typeof $value$jscomp$99$$) {
      throw new TypeError(`Cannot convert "${$embindRepr$$($value$jscomp$99$$)}" to ${this.name}`);
    }
    $assertIntegerRange$$($name$jscomp$101$$, $value$jscomp$99$$, $minRange$jscomp$1$$, $maxRange$jscomp$1$$);
    return $value$jscomp$99$$;
  }, $readValueFromPointer$:$integerReadValueFromPointer$$($name$jscomp$101$$, $size$jscomp$24$$, !$isUnsignedType$$), $destructorFunction$:null});
}, _embind_register_bool:($rawType$jscomp$2$$, $name$jscomp$102$$, $trueValue$$, $falseValue$$) => {
  $name$jscomp$102$$ = $AsciiToString$$($name$jscomp$102$$);
  $registerType$$($rawType$jscomp$2$$, {name:$name$jscomp$102$$, $fromWireType$:function($wt$$) {
    return !!$wt$$;
  }, $toWireType$:function($destructors$jscomp$1$$, $o$$) {
    return $o$$ ? $trueValue$$ : $falseValue$$;
  }, $readValueFromPointer$:function($pointer$jscomp$8$$) {
    return this.$fromWireType$($HEAPU8$$[$pointer$jscomp$8$$]);
  }, $destructorFunction$:null});
}, _embind_register_class:($rawType$jscomp$3$$, $rawPointerType$$, $rawConstPointerType$$, $baseClassRawType$$, $getActualTypeSignature$$, $getActualType$jscomp$1$$, $upcastSignature$$, $upcast$jscomp$1$$, $downcastSignature$$, $downcast$jscomp$1$$, $name$jscomp$109$$, $destructorSignature$$, $rawDestructor$jscomp$2$$) => {
  $name$jscomp$109$$ = $AsciiToString$$($name$jscomp$109$$);
  $getActualType$jscomp$1$$ = $embind__requireFunction$$($getActualTypeSignature$$, $getActualType$jscomp$1$$);
  $upcast$jscomp$1$$ &&= $embind__requireFunction$$($upcastSignature$$, $upcast$jscomp$1$$);
  $downcast$jscomp$1$$ &&= $embind__requireFunction$$($downcastSignature$$, $downcast$jscomp$1$$);
  $rawDestructor$jscomp$2$$ = $embind__requireFunction$$($destructorSignature$$, $rawDestructor$jscomp$2$$);
  var $legalFunctionName$$ = $makeLegalFunctionName$$($name$jscomp$109$$);
  $exposePublicSymbol$$($legalFunctionName$$, function() {
    $throwUnboundTypeError$$(`Cannot construct ${$name$jscomp$109$$} due to unbound types`, [$baseClassRawType$$]);
  });
  $whenDependentTypesAreResolved$$([$rawType$jscomp$3$$, $rawPointerType$$, $rawConstPointerType$$], $baseClassRawType$$ ? [$baseClassRawType$$] : [], $base$jscomp$3_constructor$jscomp$1$$ => {
    $base$jscomp$3_constructor$jscomp$1$$ = $base$jscomp$3_constructor$jscomp$1$$[0];
    if ($baseClassRawType$$) {
      var $baseClass$jscomp$1_referenceConverter$$ = $base$jscomp$3_constructor$jscomp$1$$.$registeredClass$;
      var $basePrototype_constPointerConverter$$ = $baseClass$jscomp$1_referenceConverter$$.$instancePrototype$;
    } else {
      $basePrototype_constPointerConverter$$ = $ClassHandle$$.prototype;
    }
    $base$jscomp$3_constructor$jscomp$1$$ = $createNamedFunction$$($name$jscomp$109$$, function(...$args$jscomp$9$$) {
      if (Object.getPrototypeOf(this) !== $instancePrototype$jscomp$1$$) {
        throw new $BindingError$$(`Use 'new' to construct ${$name$jscomp$109$$}`);
      }
      if (void 0 === $registeredClass$jscomp$1$$.$constructor_body$) {
        throw new $BindingError$$(`${$name$jscomp$109$$} has no accessible constructor`);
      }
      var $body$jscomp$1$$ = $registeredClass$jscomp$1$$.$constructor_body$[$args$jscomp$9$$.length];
      if (void 0 === $body$jscomp$1$$) {
        throw new $BindingError$$(`Tried to invoke ctor of ${$name$jscomp$109$$} with invalid number of parameters (${$args$jscomp$9$$.length}) - expected (${Object.keys($registeredClass$jscomp$1$$.$constructor_body$).toString()}) parameters instead!`);
      }
      return $body$jscomp$1$$.apply(this, $args$jscomp$9$$);
    });
    var $instancePrototype$jscomp$1$$ = Object.create($basePrototype_constPointerConverter$$, {constructor:{value:$base$jscomp$3_constructor$jscomp$1$$}});
    $base$jscomp$3_constructor$jscomp$1$$.prototype = $instancePrototype$jscomp$1$$;
    var $registeredClass$jscomp$1$$ = new $RegisteredClass$$($name$jscomp$109$$, $base$jscomp$3_constructor$jscomp$1$$, $instancePrototype$jscomp$1$$, $rawDestructor$jscomp$2$$, $baseClass$jscomp$1_referenceConverter$$, $getActualType$jscomp$1$$, $upcast$jscomp$1$$, $downcast$jscomp$1$$);
    if ($registeredClass$jscomp$1$$.$baseClass$) {
      var $$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$;
      ($$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$ = $registeredClass$jscomp$1$$.$baseClass$).$__derivedClasses$ ?? ($$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$.$__derivedClasses$ = []);
      $registeredClass$jscomp$1$$.$baseClass$.$__derivedClasses$.push($registeredClass$jscomp$1$$);
    }
    $baseClass$jscomp$1_referenceConverter$$ = new $RegisteredPointer$$($name$jscomp$109$$, $registeredClass$jscomp$1$$, !0, !1, !1);
    $$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$ = new $RegisteredPointer$$($name$jscomp$109$$ + "*", $registeredClass$jscomp$1$$, !1, !1, !1);
    $basePrototype_constPointerConverter$$ = new $RegisteredPointer$$($name$jscomp$109$$ + " const*", $registeredClass$jscomp$1$$, !1, !0, !1);
    $registeredPointers$$[$rawType$jscomp$3$$] = {pointerType:$$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$, $constPointerType$:$basePrototype_constPointerConverter$$};
    $replacePublicSymbol$$($legalFunctionName$$, $base$jscomp$3_constructor$jscomp$1$$);
    return [$baseClass$jscomp$1_referenceConverter$$, $$jscomp$logical$assign$tmpm2011566177$4_pointerConverter$$, $basePrototype_constPointerConverter$$];
  });
}, _embind_register_class_constructor:($rawClassType$$, $argCount$jscomp$2$$, $rawArgTypesAddr$$, $invokerSignature$$, $invoker$$, $rawConstructor$jscomp$1$$) => {
  $assert$$(0 < $argCount$jscomp$2$$);
  var $rawArgTypes$$ = $heap32VectorToArray$$($argCount$jscomp$2$$, $rawArgTypesAddr$$);
  $invoker$$ = $embind__requireFunction$$($invokerSignature$$, $invoker$$);
  $whenDependentTypesAreResolved$$([], [$rawClassType$$], $classType$jscomp$1$$ => {
    $classType$jscomp$1$$ = $classType$jscomp$1$$[0];
    var $humanName$jscomp$3$$ = `constructor ${$classType$jscomp$1$$.name}`;
    void 0 === $classType$jscomp$1$$.$registeredClass$.$constructor_body$ && ($classType$jscomp$1$$.$registeredClass$.$constructor_body$ = []);
    if (void 0 !== $classType$jscomp$1$$.$registeredClass$.$constructor_body$[$argCount$jscomp$2$$ - 1]) {
      throw new $BindingError$$(`Cannot register multiple constructors with identical number of parameters (${$argCount$jscomp$2$$ - 1}) for class '${$classType$jscomp$1$$.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    $classType$jscomp$1$$.$registeredClass$.$constructor_body$[$argCount$jscomp$2$$ - 1] = () => {
      $throwUnboundTypeError$$(`Cannot construct ${$classType$jscomp$1$$.name} due to unbound types`, $rawArgTypes$$);
    };
    $whenDependentTypesAreResolved$$([], $rawArgTypes$$, $argTypes$jscomp$4$$ => {
      $argTypes$jscomp$4$$.splice(1, 0, null);
      $classType$jscomp$1$$.$registeredClass$.$constructor_body$[$argCount$jscomp$2$$ - 1] = $craftInvokerFunction$$($humanName$jscomp$3$$, $argTypes$jscomp$4$$, null, $invoker$$, $rawConstructor$jscomp$1$$);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:($rawClassType$jscomp$1$$, $methodName$jscomp$1$$, $argCount$jscomp$3$$, $rawArgTypesAddr$jscomp$1$$, $invokerSignature$jscomp$1$$, $rawInvoker$$, $context$jscomp$5$$, $isPureVirtual$$, $isAsync$jscomp$3$$) => {
  var $rawArgTypes$jscomp$1$$ = $heap32VectorToArray$$($argCount$jscomp$3$$, $rawArgTypesAddr$jscomp$1$$);
  $methodName$jscomp$1$$ = $AsciiToString$$($methodName$jscomp$1$$);
  $methodName$jscomp$1$$ = $getFunctionName$$($methodName$jscomp$1$$);
  $rawInvoker$$ = $embind__requireFunction$$($invokerSignature$jscomp$1$$, $rawInvoker$$, $isAsync$jscomp$3$$);
  $whenDependentTypesAreResolved$$([], [$rawClassType$jscomp$1$$], $classType$jscomp$2$$ => {
    function $unboundTypesHandler$$() {
      $throwUnboundTypeError$$(`Cannot call ${$humanName$jscomp$4$$} due to unbound types`, $rawArgTypes$jscomp$1$$);
    }
    $classType$jscomp$2$$ = $classType$jscomp$2$$[0];
    var $humanName$jscomp$4$$ = `${$classType$jscomp$2$$.name}.${$methodName$jscomp$1$$}`;
    $methodName$jscomp$1$$.startsWith("@@") && ($methodName$jscomp$1$$ = Symbol[$methodName$jscomp$1$$.substring(2)]);
    $isPureVirtual$$ && $classType$jscomp$2$$.$registeredClass$.$pureVirtualFunctions$.push($methodName$jscomp$1$$);
    var $proto$jscomp$5$$ = $classType$jscomp$2$$.$registeredClass$.$instancePrototype$, $method$jscomp$1$$ = $proto$jscomp$5$$[$methodName$jscomp$1$$];
    void 0 === $method$jscomp$1$$ || void 0 === $method$jscomp$1$$.$overloadTable$ && $method$jscomp$1$$.className !== $classType$jscomp$2$$.name && $method$jscomp$1$$.$argCount$ === $argCount$jscomp$3$$ - 2 ? ($unboundTypesHandler$$.$argCount$ = $argCount$jscomp$3$$ - 2, $unboundTypesHandler$$.className = $classType$jscomp$2$$.name, $proto$jscomp$5$$[$methodName$jscomp$1$$] = $unboundTypesHandler$$) : ($ensureOverloadTable$$($proto$jscomp$5$$, $methodName$jscomp$1$$, $humanName$jscomp$4$$), $proto$jscomp$5$$[$methodName$jscomp$1$$].$overloadTable$[$argCount$jscomp$3$$ - 
    2] = $unboundTypesHandler$$);
    $whenDependentTypesAreResolved$$([], $rawArgTypes$jscomp$1$$, $argTypes$jscomp$5_memberFunction$$ => {
      $argTypes$jscomp$5_memberFunction$$ = $craftInvokerFunction$$($humanName$jscomp$4$$, $argTypes$jscomp$5_memberFunction$$, $classType$jscomp$2$$, $rawInvoker$$, $context$jscomp$5$$, $isAsync$jscomp$3$$);
      void 0 === $proto$jscomp$5$$[$methodName$jscomp$1$$].$overloadTable$ ? ($argTypes$jscomp$5_memberFunction$$.$argCount$ = $argCount$jscomp$3$$ - 2, $proto$jscomp$5$$[$methodName$jscomp$1$$] = $argTypes$jscomp$5_memberFunction$$) : $proto$jscomp$5$$[$methodName$jscomp$1$$].$overloadTable$[$argCount$jscomp$3$$ - 2] = $argTypes$jscomp$5_memberFunction$$;
      return [];
    });
    return [];
  });
}, _embind_register_emval:$rawType$jscomp$4$$ => $registerType$$($rawType$jscomp$4$$, $EmValType$$), _embind_register_float:($rawType$jscomp$5$$, $name$jscomp$111$$, $size$jscomp$25$$) => {
  $name$jscomp$111$$ = $AsciiToString$$($name$jscomp$111$$);
  $registerType$$($rawType$jscomp$5$$, {name:$name$jscomp$111$$, $fromWireType$:$value$jscomp$104$$ => $value$jscomp$104$$, $toWireType$:($destructors$jscomp$8$$, $value$jscomp$105$$) => {
    if ("number" != typeof $value$jscomp$105$$ && "boolean" != typeof $value$jscomp$105$$) {
      throw new TypeError(`Cannot convert ${$embindRepr$$($value$jscomp$105$$)} to ${this.name}`);
    }
    return $value$jscomp$105$$;
  }, $readValueFromPointer$:$floatReadValueFromPointer$$($name$jscomp$111$$, $size$jscomp$25$$), $destructorFunction$:null});
}, _embind_register_integer:($primitiveType$jscomp$1$$, $name$jscomp$112$$, $size$jscomp$26$$, $minRange$jscomp$2$$, $maxRange$jscomp$2$$) => {
  $name$jscomp$112$$ = $AsciiToString$$($name$jscomp$112$$);
  let $fromWireType$jscomp$1$$ = $value$jscomp$106$$ => $value$jscomp$106$$;
  if (0 === $minRange$jscomp$2$$) {
    var $bitshift$$ = 32 - 8 * $size$jscomp$26$$;
    $fromWireType$jscomp$1$$ = $value$jscomp$107$$ => $value$jscomp$107$$ << $bitshift$$ >>> $bitshift$$;
    $maxRange$jscomp$2$$ = $fromWireType$jscomp$1$$($maxRange$jscomp$2$$);
  }
  $registerType$$($primitiveType$jscomp$1$$, {name:$name$jscomp$112$$, $fromWireType$:$fromWireType$jscomp$1$$, $toWireType$:($destructors$jscomp$9$$, $value$jscomp$108$$) => {
    if ("number" != typeof $value$jscomp$108$$ && "boolean" != typeof $value$jscomp$108$$) {
      throw new TypeError(`Cannot convert "${$embindRepr$$($value$jscomp$108$$)}" to ${$name$jscomp$112$$}`);
    }
    $assertIntegerRange$$($name$jscomp$112$$, $value$jscomp$108$$, $minRange$jscomp$2$$, $maxRange$jscomp$2$$);
    return $value$jscomp$108$$;
  }, $readValueFromPointer$:$integerReadValueFromPointer$$($name$jscomp$112$$, $size$jscomp$26$$, 0 !== $minRange$jscomp$2$$), $destructorFunction$:null});
}, _embind_register_memory_view:($rawType$jscomp$6$$, $dataTypeIndex$$, $name$jscomp$113$$) => {
  function $decodeMemoryView$$($handle$jscomp$25$$) {
    return new $TA$$($HEAP8$$.buffer, $HEAPU32$$[$handle$jscomp$25$$ + 4 >> 2], $HEAPU32$$[$handle$jscomp$25$$ >> 2]);
  }
  var $TA$$ = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][$dataTypeIndex$$];
  $name$jscomp$113$$ = $AsciiToString$$($name$jscomp$113$$);
  $registerType$$($rawType$jscomp$6$$, {name:$name$jscomp$113$$, $fromWireType$:$decodeMemoryView$$, $readValueFromPointer$:$decodeMemoryView$$}, {$ignoreDuplicateRegistrations$:!0});
}, _embind_register_std_string:($rawType$jscomp$7$$, $name$jscomp$114$$) => {
  $name$jscomp$114$$ = $AsciiToString$$($name$jscomp$114$$);
  $registerType$$($rawType$jscomp$7$$, {name:$name$jscomp$114$$, $fromWireType$($value$jscomp$109$$) {
    var $str$jscomp$13$$ = $UTF8ToString$$($value$jscomp$109$$ + 4, $HEAPU32$$[$value$jscomp$109$$ >> 2], !0);
    $_free$$($value$jscomp$109$$);
    return $str$jscomp$13$$;
  }, $toWireType$($destructors$jscomp$10$$, $value$jscomp$110$$) {
    $value$jscomp$110$$ instanceof ArrayBuffer && ($value$jscomp$110$$ = new Uint8Array($value$jscomp$110$$));
    var $valueIsOfTypeString$$ = "string" == typeof $value$jscomp$110$$;
    if (!($valueIsOfTypeString$$ || ArrayBuffer.isView($value$jscomp$110$$) && 1 == $value$jscomp$110$$.BYTES_PER_ELEMENT)) {
      throw new $BindingError$$("Cannot pass non-string to std::string");
    }
    var $length$jscomp$36$$ = $valueIsOfTypeString$$ ? $lengthBytesUTF8$$($value$jscomp$110$$) : $value$jscomp$110$$.length;
    var $base$jscomp$4$$ = $_malloc$$(4 + $length$jscomp$36$$ + 1), $ptr$jscomp$21$$ = $base$jscomp$4$$ + 4;
    $HEAPU32$$[$base$jscomp$4$$ >> 2] = $length$jscomp$36$$;
    $valueIsOfTypeString$$ ? $stringToUTF8$$($value$jscomp$110$$, $ptr$jscomp$21$$, $length$jscomp$36$$ + 1) : $HEAPU8$$.set($value$jscomp$110$$, $ptr$jscomp$21$$);
    null !== $destructors$jscomp$10$$ && $destructors$jscomp$10$$.push($_free$$, $base$jscomp$4$$);
    return $base$jscomp$4$$;
  }, $readValueFromPointer$:$readPointer$$, $destructorFunction$($ptr$jscomp$22$$) {
    $_free$$($ptr$jscomp$22$$);
  }});
}, _embind_register_std_wstring:($rawType$jscomp$8$$, $charSize$$, $name$jscomp$115$$) => {
  $name$jscomp$115$$ = $AsciiToString$$($name$jscomp$115$$);
  if (2 === $charSize$$) {
    var $decodeString$$ = $UTF16ToString$$;
    var $encodeString$$ = $stringToUTF16$$;
    var $lengthBytesUTF$$ = $lengthBytesUTF16$$;
  } else {
    $assert$$(4 === $charSize$$, "only 2-byte and 4-byte strings are currently supported"), $decodeString$$ = $UTF32ToString$$, $encodeString$$ = $stringToUTF32$$, $lengthBytesUTF$$ = $lengthBytesUTF32$$;
  }
  $registerType$$($rawType$jscomp$8$$, {name:$name$jscomp$115$$, $fromWireType$:$value$jscomp$111$$ => {
    var $str$jscomp$20$$ = $decodeString$$($value$jscomp$111$$ + 4, $HEAPU32$$[$value$jscomp$111$$ >> 2] * $charSize$$, !0);
    $_free$$($value$jscomp$111$$);
    return $str$jscomp$20$$;
  }, $toWireType$:($destructors$jscomp$11$$, $value$jscomp$112$$) => {
    if ("string" != typeof $value$jscomp$112$$) {
      throw new $BindingError$$(`Cannot pass non-string to C++ string type ${$name$jscomp$115$$}`);
    }
    var $length$jscomp$38$$ = $lengthBytesUTF$$($value$jscomp$112$$), $ptr$jscomp$25$$ = $_malloc$$(4 + $length$jscomp$38$$ + $charSize$$);
    $HEAPU32$$[$ptr$jscomp$25$$ >> 2] = $length$jscomp$38$$ / $charSize$$;
    $encodeString$$($value$jscomp$112$$, $ptr$jscomp$25$$ + 4, $length$jscomp$38$$ + $charSize$$);
    null !== $destructors$jscomp$11$$ && $destructors$jscomp$11$$.push($_free$$, $ptr$jscomp$25$$);
    return $ptr$jscomp$25$$;
  }, $readValueFromPointer$:$readPointer$$, $destructorFunction$($ptr$jscomp$26$$) {
    $_free$$($ptr$jscomp$26$$);
  }});
}, _embind_register_void:($rawType$jscomp$9$$, $name$jscomp$116$$) => {
  $name$jscomp$116$$ = $AsciiToString$$($name$jscomp$116$$);
  $registerType$$($rawType$jscomp$9$$, {$isVoid$:!0, name:$name$jscomp$116$$, $fromWireType$:() => {
  }, $toWireType$:() => {
  }});
}, _emscripten_fs_load_embedded_files:$ptr$jscomp$27$$ => {
  do {
    var $name$jscomp$117_name_addr$$ = $HEAPU32$$[$ptr$jscomp$27$$ >> 2];
    $ptr$jscomp$27$$ += 4;
    var $len$jscomp$8$$ = $HEAPU32$$[$ptr$jscomp$27$$ >> 2];
    $ptr$jscomp$27$$ += 4;
    var $content$$ = $HEAPU32$$[$ptr$jscomp$27$$ >> 2];
    $ptr$jscomp$27$$ += 4;
    $name$jscomp$117_name_addr$$ = $UTF8ToString$$($name$jscomp$117_name_addr$$);
    $FS$createPath$$("/", $PATH$dirname$$($name$jscomp$117_name_addr$$));
    $FS$createDataFile$$($name$jscomp$117_name_addr$$, null, $HEAP8$$.subarray($content$$, $content$$ + $len$jscomp$8$$), !0, !0, !0);
  } while ($HEAPU32$$[$ptr$jscomp$27$$ >> 2]);
}, _emval_create_invoker:($argCount$jscomp$5_args$jscomp$11$$, $argTypesPtr_toReturnWire$jscomp$1$$, $invokerFunction_kind$jscomp$4$$) => {
  var [$retType$jscomp$1$$, ...$argTypes$jscomp$7$$] = $emval_lookupTypes$$($argCount$jscomp$5_args$jscomp$11$$, $argTypesPtr_toReturnWire$jscomp$1$$);
  $argTypesPtr_toReturnWire$jscomp$1$$ = $retType$jscomp$1$$.$toWireType$.bind($retType$jscomp$1$$);
  var $argFromPtr$$ = $argTypes$jscomp$7$$.map($type$jscomp$175$$ => $type$jscomp$175$$.$readValueFromPointer$.bind($type$jscomp$175$$));
  $argCount$jscomp$5_args$jscomp$11$$--;
  var $captures$$ = {toValue:$Emval$toValue$$};
  $argCount$jscomp$5_args$jscomp$11$$ = $argFromPtr$$.map(($argFromPtr$jscomp$1$$, $i$jscomp$37$$) => {
    var $captureName$$ = `argFromPtr${$i$jscomp$37$$}`;
    $captures$$[$captureName$$] = $argFromPtr$jscomp$1$$;
    return `${$captureName$$}(args${$i$jscomp$37$$ ? "+" + 8 * $i$jscomp$37$$ : ""})`;
  });
  switch($invokerFunction_kind$jscomp$4$$) {
    case 0:
      var $functionBody_functionName$$ = "toValue(handle)";
      break;
    case 2:
      $functionBody_functionName$$ = "new (toValue(handle))";
      break;
    case 3:
      $functionBody_functionName$$ = "";
      break;
    case 1:
      $captures$$.getStringOrSymbol = $getStringOrSymbol$$, $functionBody_functionName$$ = "toValue(handle)[getStringOrSymbol(methodName)]";
  }
  $functionBody_functionName$$ += `(${$argCount$jscomp$5_args$jscomp$11$$})`;
  $retType$jscomp$1$$.$isVoid$ || ($captures$$.toReturnWire = $argTypesPtr_toReturnWire$jscomp$1$$, $captures$$.emval_returnValue = $emval_returnValue$$, $functionBody_functionName$$ = `return emval_returnValue(toReturnWire, destructorsRef, ${$functionBody_functionName$$})`);
  $functionBody_functionName$$ = `return function (handle, methodName, destructorsRef, args) {
  ${$functionBody_functionName$$}
  }`;
  $invokerFunction_kind$jscomp$4$$ = (new Function(Object.keys($captures$$), $functionBody_functionName$$))(...Object.values($captures$$));
  $functionBody_functionName$$ = `methodCaller<(${$argTypes$jscomp$7$$.map($t$jscomp$1$$ => $t$jscomp$1$$.name)}) => ${$retType$jscomp$1$$.name}>`;
  return $emval_addMethodCaller$$($createNamedFunction$$($functionBody_functionName$$, $invokerFunction_kind$jscomp$4$$));
}, _emval_decref:$__emval_decref$$, _emval_get_global:$name$jscomp$118$$ => {
  if (!$name$jscomp$118$$) {
    return $Emval$toHandle$$(globalThis);
  }
  $name$jscomp$118$$ = $getStringOrSymbol$$($name$jscomp$118$$);
  return $Emval$toHandle$$(globalThis[$name$jscomp$118$$]);
}, _emval_invoke:($caller$jscomp$1$$, $handle$jscomp$27$$, $methodName$jscomp$2$$, $destructorsRef$jscomp$1$$, $args$jscomp$12$$) => $emval_methodCallers$$[$caller$jscomp$1$$]($handle$jscomp$27$$, $methodName$jscomp$2$$, $destructorsRef$jscomp$1$$, $args$jscomp$12$$), _emval_run_destructors:$handle$jscomp$28$$ => {
  var $destructors$jscomp$14$$ = $Emval$toValue$$($handle$jscomp$28$$);
  $runDestructors$$($destructors$jscomp$14$$);
  $__emval_decref$$($handle$jscomp$28$$);
}, _emval_set_property:($handle$jscomp$29$$, $key$jscomp$42$$, $value$jscomp$113$$) => {
  $handle$jscomp$29$$ = $Emval$toValue$$($handle$jscomp$29$$);
  $key$jscomp$42$$ = $Emval$toValue$$($key$jscomp$42$$);
  $value$jscomp$113$$ = $Emval$toValue$$($value$jscomp$113$$);
  $handle$jscomp$29$$[$key$jscomp$42$$] = $value$jscomp$113$$;
}, _tzset_js:($timezone_winterName$$, $daylight_extractZone_summerName$$, $std_name$$, $dst_name$$) => {
  var $currentYear_summerOffset$$ = (new Date()).getFullYear(), $winterOffset$$ = (new Date($currentYear_summerOffset$$, 0, 1)).getTimezoneOffset();
  $currentYear_summerOffset$$ = (new Date($currentYear_summerOffset$$, 6, 1)).getTimezoneOffset();
  $HEAPU32$$[$timezone_winterName$$ >> 2] = 60 * Math.max($winterOffset$$, $currentYear_summerOffset$$);
  $HEAP32$$[$daylight_extractZone_summerName$$ >> 2] = Number($winterOffset$$ != $currentYear_summerOffset$$);
  $daylight_extractZone_summerName$$ = $timezoneOffset$$ => {
    var $absOffset$$ = Math.abs($timezoneOffset$$);
    return `UTC${0 <= $timezoneOffset$$ ? "-" : "+"}${String(Math.floor($absOffset$$ / 60)).padStart(2, "0")}${String($absOffset$$ % 60).padStart(2, "0")}`;
  };
  $timezone_winterName$$ = $daylight_extractZone_summerName$$($winterOffset$$);
  $daylight_extractZone_summerName$$ = $daylight_extractZone_summerName$$($currentYear_summerOffset$$);
  $assert$$($timezone_winterName$$);
  $assert$$($daylight_extractZone_summerName$$);
  $assert$$(16 >= $lengthBytesUTF8$$($timezone_winterName$$), `timezone name truncated to fit in TZNAME_MAX (${$timezone_winterName$$})`);
  $assert$$(16 >= $lengthBytesUTF8$$($daylight_extractZone_summerName$$), `timezone name truncated to fit in TZNAME_MAX (${$daylight_extractZone_summerName$$})`);
  $currentYear_summerOffset$$ < $winterOffset$$ ? ($stringToUTF8$$($timezone_winterName$$, $std_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $dst_name$$, 17)) : ($stringToUTF8$$($timezone_winterName$$, $dst_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $std_name$$, 17));
}, emscripten_asm_const_int:($code$jscomp$3$$, $sigPtr$jscomp$2_sigPtr$jscomp$inline_424$$, $argbuf$jscomp$1_buf$jscomp$inline_425$$) => {
  $assert$$(Array.isArray($readEmAsmArgsArray$$));
  $assert$$(0 == $argbuf$jscomp$1_buf$jscomp$inline_425$$ % 16);
  $readEmAsmArgsArray$$.length = 0;
  for (var $ch$jscomp$inline_426$$; $ch$jscomp$inline_426$$ = $HEAPU8$$[$sigPtr$jscomp$2_sigPtr$jscomp$inline_424$$++];) {
    var $chr$jscomp$inline_427_wide$jscomp$inline_429$$ = String.fromCharCode($ch$jscomp$inline_426$$), $validChars$jscomp$inline_428$$ = ["d", "f", "i", "p"];
    $validChars$jscomp$inline_428$$.push("j");
    $assert$$($validChars$jscomp$inline_428$$.includes($chr$jscomp$inline_427_wide$jscomp$inline_429$$), `Invalid character ${$ch$jscomp$inline_426$$}("${$chr$jscomp$inline_427_wide$jscomp$inline_429$$}") in readEmAsmArgs! Use only [${$validChars$jscomp$inline_428$$}], and do not specify "v" for void return argument.`);
    $chr$jscomp$inline_427_wide$jscomp$inline_429$$ = 105 != $ch$jscomp$inline_426$$;
    $chr$jscomp$inline_427_wide$jscomp$inline_429$$ &= 112 != $ch$jscomp$inline_426$$;
    $argbuf$jscomp$1_buf$jscomp$inline_425$$ += $chr$jscomp$inline_427_wide$jscomp$inline_429$$ && $argbuf$jscomp$1_buf$jscomp$inline_425$$ % 8 ? 4 : 0;
    $readEmAsmArgsArray$$.push(112 == $ch$jscomp$inline_426$$ ? $HEAPU32$$[$argbuf$jscomp$1_buf$jscomp$inline_425$$ >> 2] : 106 == $ch$jscomp$inline_426$$ ? $HEAP64$$[$argbuf$jscomp$1_buf$jscomp$inline_425$$ >> 3] : 105 == $ch$jscomp$inline_426$$ ? $HEAP32$$[$argbuf$jscomp$1_buf$jscomp$inline_425$$ >> 2] : $HEAPF64$$[$argbuf$jscomp$1_buf$jscomp$inline_425$$ >> 3]);
    $argbuf$jscomp$1_buf$jscomp$inline_425$$ += $chr$jscomp$inline_427_wide$jscomp$inline_429$$ ? 8 : 4;
  }
  $assert$$($ASM_CONSTS$$.hasOwnProperty($code$jscomp$3$$), `No EM_ASM constant found at address ${$code$jscomp$3$$}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return $ASM_CONSTS$$[$code$jscomp$3$$](...$readEmAsmArgsArray$$);
}, emscripten_get_now:() => performance.now(), emscripten_resize_heap:$requestedSize$$ => {
  var $oldSize$$ = $HEAPU8$$.length;
  $requestedSize$$ >>>= 0;
  $assert$$($requestedSize$$ > $oldSize$$);
  if (2147483648 < $requestedSize$$) {
    return $err$$(`Cannot enlarge memory, requested ${$requestedSize$$} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var $cutDown$$ = 1; 4 >= $cutDown$$; $cutDown$$ *= 2) {
    var $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ = $oldSize$$ * (1 + 0.2 / $cutDown$$);
    $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ = Math.min($oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$, $requestedSize$$ + 100663296);
    var $JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$ = Math, $JSCompiler_temp_const$jscomp$51_size$jscomp$inline_280$$ = $JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$.min;
    $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ = Math.max($requestedSize$$, $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$);
    $assert$$(65536, "alignment argument is required");
    $JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$ = $JSCompiler_temp_const$jscomp$51_size$jscomp$inline_280$$.call($JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$, 2147483648, 65536 * Math.ceil($oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ / 65536));
    a: {
      $JSCompiler_temp_const$jscomp$51_size$jscomp$inline_280$$ = $JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$;
      $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ = $wasmMemory$$.buffer.byteLength;
      try {
        $wasmMemory$$.grow(($JSCompiler_temp_const$jscomp$51_size$jscomp$inline_280$$ - $oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$ + 65535) / 65536 | 0);
        $updateMemoryViews$$();
        var $JSCompiler_inline_result$jscomp$54$$ = 1;
        break a;
      } catch ($e$jscomp$inline_283$$) {
        $err$$(`growMemory: Attempted to grow heap from ${$oldHeapSize$jscomp$inline_281_overGrownHeapSize_size$jscomp$inline_277$$} bytes to ${$JSCompiler_temp_const$jscomp$51_size$jscomp$inline_280$$} bytes, but got error: ${$e$jscomp$inline_283$$}`);
      }
      $JSCompiler_inline_result$jscomp$54$$ = void 0;
    }
    if ($JSCompiler_inline_result$jscomp$54$$) {
      return !0;
    }
  }
  $err$$(`Failed to grow the heap from ${$oldSize$$} bytes to ${$JSCompiler_temp_const$jscomp$52_newSize$jscomp$2$$} bytes, not enough memory!`);
  return !1;
}, emscripten_set_canvas_element_size:($canvas_target$jscomp$93$$, $width$jscomp$30$$, $height$jscomp$25$$) => {
  $canvas_target$jscomp$93$$ = $findEventTarget$$($canvas_target$jscomp$93$$);
  if (!$canvas_target$jscomp$93$$) {
    return -4;
  }
  $canvas_target$jscomp$93$$.width = $width$jscomp$30$$;
  $canvas_target$jscomp$93$$.height = $height$jscomp$25$$;
  return 0;
}, emscripten_webgl_create_context:($canvas$jscomp$2_target$jscomp$94$$, $attributes$jscomp$1_contextAttributes$$) => {
  $assert$$($attributes$jscomp$1_contextAttributes$$);
  var $attr32$$ = $attributes$jscomp$1_contextAttributes$$ >> 2;
  $attributes$jscomp$1_contextAttributes$$ = {alpha:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 0], depth:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 1], stencil:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 2], antialias:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 3], premultipliedAlpha:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 4], preserveDrawingBuffer:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 5], powerPreference:$webglPowerPreferences$$[$HEAP32$$[$attr32$$ + 
  2]], failIfMajorPerformanceCaveat:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 12], $majorVersion$:$HEAP32$$[$attr32$$ + 4], $minorVersion$:$HEAP32$$[$attr32$$ + 5], $enableExtensionsByDefault$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 24], $explicitSwapControl$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 25], $proxyContextToMainThread$:$HEAP32$$[$attr32$$ + 7], $renderViaOffscreenBackBuffer$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$$ + 32]};
  1 !== $attributes$jscomp$1_contextAttributes$$.$majorVersion$ && 2 !== $attributes$jscomp$1_contextAttributes$$.$majorVersion$ && $err$$(`Invalid WebGL version requested: ${$attributes$jscomp$1_contextAttributes$$.$majorVersion$}`);
  2 !== $attributes$jscomp$1_contextAttributes$$.$majorVersion$ && $err$$("WebGL 1 requested but only WebGL 2 is supported (MIN_WEBGL_VERSION is 2)");
  $canvas$jscomp$2_target$jscomp$94$$ = $findEventTarget$$($canvas$jscomp$2_target$jscomp$94$$);
  return !$canvas$jscomp$2_target$jscomp$94$$ || $attributes$jscomp$1_contextAttributes$$.$explicitSwapControl$ ? 0 : $GL$createContext$$($canvas$jscomp$2_target$jscomp$94$$, $attributes$jscomp$1_contextAttributes$$);
}, emscripten_webgl_destroy_context:$contextHandle$jscomp$4$$ => {
  $GL$currentContext$$ == $contextHandle$jscomp$4$$ && ($GL$currentContext$$ = 0);
  $GL$currentContext$$ === $GL$contexts$$[$contextHandle$jscomp$4$$] && ($GL$currentContext$$ = null);
  "object" == typeof JSEvents && JSEvents.$removeAllHandlersOnTarget$($GL$contexts$$[$contextHandle$jscomp$4$$].$GLctx$.canvas);
  $GL$contexts$$[$contextHandle$jscomp$4$$]?.$GLctx$.canvas && ($GL$contexts$$[$contextHandle$jscomp$4$$].$GLctx$.canvas.$GLctxObject$ = void 0);
  $GL$contexts$$[$contextHandle$jscomp$4$$] = null;
}, emscripten_webgl_get_current_context:() => $GL$currentContext$$ ? $GL$currentContext$$.handle : 0, emscripten_webgl_make_context_current:$contextHandle$jscomp$5$$ => {
  $GL$currentContext$$ = $GL$contexts$$[$contextHandle$jscomp$5$$];
  $Module$$.ctx = $GLctx$$ = $GL$currentContext$$?.$GLctx$;
  return !$contextHandle$jscomp$5$$ || $GLctx$$ ? 0 : -5;
}, environ_get:($__environ$$, $environ_buf$$) => {
  var $bufSize$$ = 0, $envp$$ = 0, $string$jscomp$4$$;
  for ($string$jscomp$4$$ of $getEnvStrings$$()) {
    var $ptr$jscomp$28$$ = $environ_buf$$ + $bufSize$$;
    $HEAPU32$$[$__environ$$ + $envp$$ >> 2] = $ptr$jscomp$28$$;
    $bufSize$$ += $stringToUTF8$$($string$jscomp$4$$, $ptr$jscomp$28$$, Infinity) + 1;
    $envp$$ += 4;
  }
  return 0;
}, environ_sizes_get:($bufSize$jscomp$1_penviron_count$$, $penviron_buf_size$$) => {
  var $strings$jscomp$1$$ = $getEnvStrings$$();
  $HEAPU32$$[$bufSize$jscomp$1_penviron_count$$ >> 2] = $strings$jscomp$1$$.length;
  $bufSize$jscomp$1_penviron_count$$ = 0;
  for (var $string$jscomp$5$$ of $strings$jscomp$1$$) {
    $bufSize$jscomp$1_penviron_count$$ += $lengthBytesUTF8$$($string$jscomp$5$$) + 1;
  }
  $HEAPU32$$[$penviron_buf_size$$ >> 2] = $bufSize$jscomp$1_penviron_count$$;
  return 0;
}, equirectangularFromURL:function($url$jscomp$30$$, $ctxId$jscomp$1$$, $tiles$$, $textureIdsHandle$$) {
  let $gl$jscomp$2$$ = $GL$contexts$$[$ctxId$jscomp$1$$].$GLctx$, $img$jscomp$3$$ = new Image(), $imgUrl$jscomp$1$$ = $UTF8ToString$$($url$jscomp$30$$), $textureIds$$ = $Emval$toValue$$($textureIdsHandle$$);
  $img$jscomp$3$$.onload = function() {
    var $canvas$jscomp$3_textureCount$$ = $tiles$$ * $tiles$$;
    let $textures$jscomp$2$$ = [];
    for (var $ctx$jscomp$9_i$jscomp$49$$ = 0; $ctx$jscomp$9_i$jscomp$49$$ < $canvas$jscomp$3_textureCount$$ && $GL$textures$$[$textureIds$$[$ctx$jscomp$9_i$jscomp$49$$]];) {
      $textures$jscomp$2$$.push($GL$textures$$[$textureIds$$[$ctx$jscomp$9_i$jscomp$49$$]]), $ctx$jscomp$9_i$jscomp$49$$++;
    }
    if ($ctx$jscomp$9_i$jscomp$49$$ == $canvas$jscomp$3_textureCount$$) {
      $canvas$jscomp$3_textureCount$$ = document.createElement("canvas");
      $ctx$jscomp$9_i$jscomp$49$$ = $canvas$jscomp$3_textureCount$$.getContext("2d");
      let $tileW$$ = $img$jscomp$3$$.width / $tiles$$, $tileH$$ = $img$jscomp$3$$.height / $tiles$$;
      $canvas$jscomp$3_textureCount$$.width = $tileW$$;
      $canvas$jscomp$3_textureCount$$.height = $tileH$$;
      let $i$jscomp$50$$ = 0;
      for (let $x$jscomp$94$$ = 0; $x$jscomp$94$$ < $tiles$$; $x$jscomp$94$$++) {
        for (let $y$jscomp$78$$ = 0; $y$jscomp$78$$ < $tiles$$; $y$jscomp$78$$++) {
          $ctx$jscomp$9_i$jscomp$49$$.clearRect(0, 0, $tileW$$, $tileH$$), $ctx$jscomp$9_i$jscomp$49$$.drawImage($img$jscomp$3$$, $x$jscomp$94$$ * $tileW$$, $y$jscomp$78$$ * $tileH$$, $tileW$$, $tileH$$, 0, 0, $tileW$$, $tileH$$), $gl$jscomp$2$$.bindTexture($gl$jscomp$2$$.TEXTURE_2D, $textures$jscomp$2$$[$i$jscomp$50$$]), $gl$jscomp$2$$.texImage2D($gl$jscomp$2$$.TEXTURE_2D, 0, $gl$jscomp$2$$.RGBA, $gl$jscomp$2$$.RGBA, $gl$jscomp$2$$.UNSIGNED_BYTE, $canvas$jscomp$3_textureCount$$), $gl$jscomp$2$$.generateMipmap($gl$jscomp$2$$.TEXTURE_2D), 
          $gl$jscomp$2$$.texParameteri($gl$jscomp$2$$.TEXTURE_2D, $gl$jscomp$2$$.TEXTURE_MIN_FILTER, $gl$jscomp$2$$.LINEAR), $gl$jscomp$2$$.texParameteri($gl$jscomp$2$$.TEXTURE_2D, $gl$jscomp$2$$.TEXTURE_MAG_FILTER, $gl$jscomp$2$$.NEAREST), $gl$jscomp$2$$.texParameteri($gl$jscomp$2$$.TEXTURE_2D, $gl$jscomp$2$$.TEXTURE_WRAP_S, $gl$jscomp$2$$.CLAMP_TO_EDGE), $gl$jscomp$2$$.texParameteri($gl$jscomp$2$$.TEXTURE_2D, $gl$jscomp$2$$.TEXTURE_WRAP_T, $gl$jscomp$2$$.CLAMP_TO_EDGE), $gl$jscomp$2$$.bindTexture($gl$jscomp$2$$.TEXTURE_2D, 
          null), $i$jscomp$50$$++;
        }
      }
    } else {
      console.error("Texture failed to load (it no longer exists):\t" + $imgUrl$jscomp$1$$);
    }
  };
  $img$jscomp$3$$.onerror = function() {
    console.error("Texture failed to load:\t" + $imgUrl$jscomp$1$$);
  };
  $img$jscomp$3$$.src = $imgUrl$jscomp$1$$;
}, fd_close:function($fd$jscomp$14$$) {
  try {
    var $stream$jscomp$53$$ = $FS$getStreamChecked$$($fd$jscomp$14$$);
    $FS$close$$($stream$jscomp$53$$);
    return 0;
  } catch ($e$jscomp$29$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$29$$.name) {
      throw $e$jscomp$29$$;
    }
    return $e$jscomp$29$$.$errno$;
  }
}, fd_read:function($fd$jscomp$15_iov$jscomp$inline_290$$, $iov$jscomp$1_ret$jscomp$inline_293$$, $iovcnt$jscomp$1$$, $pnum$$) {
  try {
    a: {
      var $stream$jscomp$inline_289$$ = $FS$getStreamChecked$$($fd$jscomp$15_iov$jscomp$inline_290$$);
      $fd$jscomp$15_iov$jscomp$inline_290$$ = $iov$jscomp$1_ret$jscomp$inline_293$$;
      for (var $offset$jscomp$inline_292$$, $i$jscomp$inline_294$$ = $iov$jscomp$1_ret$jscomp$inline_293$$ = 0; $i$jscomp$inline_294$$ < $iovcnt$jscomp$1$$; $i$jscomp$inline_294$$++) {
        var $ptr$jscomp$inline_295$$ = $HEAPU32$$[$fd$jscomp$15_iov$jscomp$inline_290$$ >> 2], $len$jscomp$inline_296$$ = $HEAPU32$$[$fd$jscomp$15_iov$jscomp$inline_290$$ + 4 >> 2];
        $fd$jscomp$15_iov$jscomp$inline_290$$ += 8;
        var $stream$jscomp$inline_431$$ = $stream$jscomp$inline_289$$, $offset$jscomp$inline_432$$ = $ptr$jscomp$inline_295$$, $length$jscomp$inline_433$$ = $len$jscomp$inline_296$$, $position$jscomp$inline_434$$ = $offset$jscomp$inline_292$$, $buffer$jscomp$inline_435$$ = $HEAP8$$;
        $assert$$(0 <= $offset$jscomp$inline_432$$);
        if (0 > $length$jscomp$inline_433$$ || 0 > $position$jscomp$inline_434$$) {
          throw new $FS$ErrnoError$$(28);
        }
        if (null === $stream$jscomp$inline_431$$.$fd$) {
          throw new $FS$ErrnoError$$(8);
        }
        if (1 === ($stream$jscomp$inline_431$$.flags & 2097155)) {
          throw new $FS$ErrnoError$$(8);
        }
        if ($FS$isDir$$($stream$jscomp$inline_431$$.node.mode)) {
          throw new $FS$ErrnoError$$(31);
        }
        if (!$stream$jscomp$inline_431$$.$stream_ops$.read) {
          throw new $FS$ErrnoError$$(28);
        }
        var $seeking$jscomp$inline_436$$ = "undefined" != typeof $position$jscomp$inline_434$$;
        if (!$seeking$jscomp$inline_436$$) {
          $position$jscomp$inline_434$$ = $stream$jscomp$inline_431$$.position;
        } else if (!$stream$jscomp$inline_431$$.seekable) {
          throw new $FS$ErrnoError$$(70);
        }
        var $bytesRead$jscomp$inline_437$$ = $stream$jscomp$inline_431$$.$stream_ops$.read($stream$jscomp$inline_431$$, $buffer$jscomp$inline_435$$, $offset$jscomp$inline_432$$, $length$jscomp$inline_433$$, $position$jscomp$inline_434$$);
        $seeking$jscomp$inline_436$$ || ($stream$jscomp$inline_431$$.position += $bytesRead$jscomp$inline_437$$);
        var $curr$jscomp$inline_297$$ = $bytesRead$jscomp$inline_437$$;
        if (0 > $curr$jscomp$inline_297$$) {
          var $num$jscomp$6$$ = -1;
          break a;
        }
        $iov$jscomp$1_ret$jscomp$inline_293$$ += $curr$jscomp$inline_297$$;
        if ($curr$jscomp$inline_297$$ < $len$jscomp$inline_296$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_292$$ && ($offset$jscomp$inline_292$$ += $curr$jscomp$inline_297$$);
      }
      $num$jscomp$6$$ = $iov$jscomp$1_ret$jscomp$inline_293$$;
    }
    $HEAPU32$$[$pnum$$ >> 2] = $num$jscomp$6$$;
    return 0;
  } catch ($e$jscomp$30$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$30$$.name) {
      throw $e$jscomp$30$$;
    }
    return $e$jscomp$30$$.$errno$;
  }
}, fd_seek:function($fd$jscomp$16$$, $offset$jscomp$44$$, $whence$jscomp$2$$, $newOffset$$) {
  $offset$jscomp$44$$ = -9007199254740992 > $offset$jscomp$44$$ || 9007199254740992 < $offset$jscomp$44$$ ? NaN : Number($offset$jscomp$44$$);
  try {
    if (isNaN($offset$jscomp$44$$)) {
      return 61;
    }
    var $stream$jscomp$56$$ = $FS$getStreamChecked$$($fd$jscomp$16$$);
    $FS$llseek$$($stream$jscomp$56$$, $offset$jscomp$44$$, $whence$jscomp$2$$);
    $HEAP64$$[$newOffset$$ >> 3] = BigInt($stream$jscomp$56$$.position);
    $stream$jscomp$56$$.$getdents$ && 0 === $offset$jscomp$44$$ && 0 === $whence$jscomp$2$$ && ($stream$jscomp$56$$.$getdents$ = null);
    return 0;
  } catch ($e$jscomp$31$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$31$$.name) {
      throw $e$jscomp$31$$;
    }
    return $e$jscomp$31$$.$errno$;
  }
}, fd_write:function($fd$jscomp$17_iov$jscomp$inline_300$$, $iov$jscomp$3_ret$jscomp$inline_303$$, $iovcnt$jscomp$3$$, $pnum$jscomp$1$$) {
  try {
    a: {
      var $stream$jscomp$inline_299$$ = $FS$getStreamChecked$$($fd$jscomp$17_iov$jscomp$inline_300$$);
      $fd$jscomp$17_iov$jscomp$inline_300$$ = $iov$jscomp$3_ret$jscomp$inline_303$$;
      for (var $offset$jscomp$inline_302$$, $i$jscomp$inline_304$$ = $iov$jscomp$3_ret$jscomp$inline_303$$ = 0; $i$jscomp$inline_304$$ < $iovcnt$jscomp$3$$; $i$jscomp$inline_304$$++) {
        var $ptr$jscomp$inline_305$$ = $HEAPU32$$[$fd$jscomp$17_iov$jscomp$inline_300$$ >> 2], $len$jscomp$inline_306$$ = $HEAPU32$$[$fd$jscomp$17_iov$jscomp$inline_300$$ + 4 >> 2];
        $fd$jscomp$17_iov$jscomp$inline_300$$ += 8;
        var $curr$jscomp$inline_307$$ = $FS$write$$($stream$jscomp$inline_299$$, $HEAP8$$, $ptr$jscomp$inline_305$$, $len$jscomp$inline_306$$, $offset$jscomp$inline_302$$);
        if (0 > $curr$jscomp$inline_307$$) {
          var $num$jscomp$8$$ = -1;
          break a;
        }
        $iov$jscomp$3_ret$jscomp$inline_303$$ += $curr$jscomp$inline_307$$;
        if ($curr$jscomp$inline_307$$ < $len$jscomp$inline_306$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_302$$ && ($offset$jscomp$inline_302$$ += $curr$jscomp$inline_307$$);
      }
      $num$jscomp$8$$ = $iov$jscomp$3_ret$jscomp$inline_303$$;
    }
    $HEAPU32$$[$pnum$jscomp$1$$ >> 2] = $num$jscomp$8$$;
    return 0;
  } catch ($e$jscomp$32$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$32$$.name) {
      throw $e$jscomp$32$$;
    }
    return $e$jscomp$32$$.$errno$;
  }
}, glActiveTexture:$x0$jscomp$2$$ => $GLctx$$.activeTexture($x0$jscomp$2$$), glAttachShader:($program$jscomp$63$$, $shader$jscomp$11$$) => {
  $GLctx$$.attachShader($GL$programs$$[$program$jscomp$63$$], $GL$shaders$$[$shader$jscomp$11$$]);
}, glBindBuffer:($target$jscomp$95$$, $buffer$jscomp$33$$) => {
  35051 == $target$jscomp$95$$ ? $GLctx$$.$currentPixelPackBufferBinding$ = $buffer$jscomp$33$$ : 35052 == $target$jscomp$95$$ && ($GLctx$$.$currentPixelUnpackBufferBinding$ = $buffer$jscomp$33$$);
  $GLctx$$.bindBuffer($target$jscomp$95$$, $GL$buffers$$[$buffer$jscomp$33$$]);
}, glBindBufferRange:($target$jscomp$96$$, $index$jscomp$103$$, $buffer$jscomp$34$$, $offset$jscomp$46$$, $ptrsize$$) => {
  $GLctx$$.bindBufferRange($target$jscomp$96$$, $index$jscomp$103$$, $GL$buffers$$[$buffer$jscomp$34$$], $offset$jscomp$46$$, $ptrsize$$);
}, glBindTexture:($target$jscomp$97$$, $texture$jscomp$7$$) => {
  $GLctx$$.bindTexture($target$jscomp$97$$, $GL$textures$$[$texture$jscomp$7$$]);
}, glBindVertexArray:$vao$$ => {
  $GLctx$$.bindVertexArray($GL$vaos$$[$vao$$]);
}, glBufferData:($target$jscomp$98$$, $size$jscomp$30$$, $data$jscomp$85$$, $usage$jscomp$2$$) => {
  $data$jscomp$85$$ && $size$jscomp$30$$ ? $GLctx$$.bufferData($target$jscomp$98$$, $HEAPU8$$, $usage$jscomp$2$$, $data$jscomp$85$$, $size$jscomp$30$$) : $GLctx$$.bufferData($target$jscomp$98$$, $size$jscomp$30$$, $usage$jscomp$2$$);
}, glBufferSubData:($target$jscomp$99$$, $offset$jscomp$47$$, $size$jscomp$31$$, $data$jscomp$86$$) => {
  $size$jscomp$31$$ && $GLctx$$.bufferSubData($target$jscomp$99$$, $offset$jscomp$47$$, $HEAPU8$$, $data$jscomp$86$$, $size$jscomp$31$$);
}, glClear:$x0$jscomp$3$$ => $GLctx$$.clear($x0$jscomp$3$$), glClearColor:($x0$jscomp$4$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$) => $GLctx$$.clearColor($x0$jscomp$4$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$), glCompileShader:$shader$jscomp$12$$ => {
  $GLctx$$.compileShader($GL$shaders$$[$shader$jscomp$12$$]);
}, glCreateProgram:() => {
  var $id$jscomp$11$$ = $GL$getNewId$$($GL$programs$$), $program$jscomp$64$$ = $GLctx$$.createProgram();
  $program$jscomp$64$$.name = $id$jscomp$11$$;
  $program$jscomp$64$$.$maxUniformLength$ = $program$jscomp$64$$.$maxAttributeLength$ = $program$jscomp$64$$.$maxUniformBlockNameLength$ = 0;
  $program$jscomp$64$$.$uniformIdCounter$ = 1;
  $GL$programs$$[$id$jscomp$11$$] = $program$jscomp$64$$;
  return $id$jscomp$11$$;
}, glCreateShader:$shaderType$$ => {
  var $id$jscomp$12$$ = $GL$getNewId$$($GL$shaders$$);
  $GL$shaders$$[$id$jscomp$12$$] = $GLctx$$.createShader($shaderType$$);
  return $id$jscomp$12$$;
}, glDeleteBuffers:($n$jscomp$5$$, $buffers$jscomp$3$$) => {
  for (var $i$jscomp$43$$ = 0; $i$jscomp$43$$ < $n$jscomp$5$$; $i$jscomp$43$$++) {
    var $id$jscomp$13$$ = $HEAP32$$[$buffers$jscomp$3$$ + 4 * $i$jscomp$43$$ >> 2], $buffer$jscomp$35$$ = $GL$buffers$$[$id$jscomp$13$$];
    $buffer$jscomp$35$$ && ($GLctx$$.deleteBuffer($buffer$jscomp$35$$), $buffer$jscomp$35$$.name = 0, $GL$buffers$$[$id$jscomp$13$$] = null, $id$jscomp$13$$ == $GLctx$$.$currentPixelPackBufferBinding$ && ($GLctx$$.$currentPixelPackBufferBinding$ = 0), $id$jscomp$13$$ == $GLctx$$.$currentPixelUnpackBufferBinding$ && ($GLctx$$.$currentPixelUnpackBufferBinding$ = 0));
  }
}, glDeleteProgram:$id$jscomp$14$$ => {
  if ($id$jscomp$14$$) {
    var $program$jscomp$65$$ = $GL$programs$$[$id$jscomp$14$$];
    $program$jscomp$65$$ ? ($GLctx$$.deleteProgram($program$jscomp$65$$), $program$jscomp$65$$.name = 0, $GL$programs$$[$id$jscomp$14$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, glDeleteShader:$id$jscomp$15$$ => {
  if ($id$jscomp$15$$) {
    var $shader$jscomp$13$$ = $GL$shaders$$[$id$jscomp$15$$];
    $shader$jscomp$13$$ ? ($GLctx$$.deleteShader($shader$jscomp$13$$), $GL$shaders$$[$id$jscomp$15$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, glDeleteTextures:($n$jscomp$6$$, $textures$$) => {
  for (var $i$jscomp$44$$ = 0; $i$jscomp$44$$ < $n$jscomp$6$$; $i$jscomp$44$$++) {
    var $id$jscomp$16$$ = $HEAP32$$[$textures$$ + 4 * $i$jscomp$44$$ >> 2], $texture$jscomp$8$$ = $GL$textures$$[$id$jscomp$16$$];
    $texture$jscomp$8$$ && ($GLctx$$.deleteTexture($texture$jscomp$8$$), $texture$jscomp$8$$.name = 0, $GL$textures$$[$id$jscomp$16$$] = null);
  }
}, glDeleteVertexArrays:($n$jscomp$7$$, $vaos$$) => {
  for (var $i$jscomp$45$$ = 0; $i$jscomp$45$$ < $n$jscomp$7$$; $i$jscomp$45$$++) {
    var $id$jscomp$17$$ = $HEAP32$$[$vaos$$ + 4 * $i$jscomp$45$$ >> 2];
    $GLctx$$.deleteVertexArray($GL$vaos$$[$id$jscomp$17$$]);
    $GL$vaos$$[$id$jscomp$17$$] = null;
  }
}, glDrawElements:($mode$jscomp$41$$, $count$jscomp$41$$, $type$jscomp$176$$, $indices$$) => {
  $GLctx$$.drawElements($mode$jscomp$41$$, $count$jscomp$41$$, $type$jscomp$176$$, $indices$$);
}, glEnable:$x0$jscomp$5$$ => $GLctx$$.enable($x0$jscomp$5$$), glEnableVertexAttribArray:$index$jscomp$104$$ => {
  $GLctx$$.enableVertexAttribArray($index$jscomp$104$$);
}, glGenBuffers:($n$jscomp$8$$, $buffers$jscomp$4$$) => {
  $GL$genObject$$($n$jscomp$8$$, $buffers$jscomp$4$$, "createBuffer", $GL$buffers$$);
}, glGenTextures:($n$jscomp$9$$, $textures$jscomp$1$$) => {
  $GL$genObject$$($n$jscomp$9$$, $textures$jscomp$1$$, "createTexture", $GL$textures$$);
}, glGenVertexArrays:($n$jscomp$10$$, $arrays$$) => {
  $GL$genObject$$($n$jscomp$10$$, $arrays$$, "createVertexArray", $GL$vaos$$);
}, glGenerateMipmap:$x0$jscomp$6$$ => $GLctx$$.generateMipmap($x0$jscomp$6$$), glGetIntegerv:($name_$jscomp$1$$, $p$jscomp$4$$) => $emscriptenWebGLGet$$($name_$jscomp$1$$, $p$jscomp$4$$), glGetProgramInfoLog:($log_program$jscomp$66$$, $maxLength_numBytesWrittenExclNull$$, $length$jscomp$40$$, $infoLog$$) => {
  $log_program$jscomp$66$$ = $GLctx$$.getProgramInfoLog($GL$programs$$[$log_program$jscomp$66$$]);
  null === $log_program$jscomp$66$$ && ($log_program$jscomp$66$$ = "(unknown error)");
  $maxLength_numBytesWrittenExclNull$$ = 0 < $maxLength_numBytesWrittenExclNull$$ && $infoLog$$ ? $stringToUTF8$$($log_program$jscomp$66$$, $infoLog$$, $maxLength_numBytesWrittenExclNull$$) : 0;
  $length$jscomp$40$$ && ($HEAP32$$[$length$jscomp$40$$ >> 2] = $maxLength_numBytesWrittenExclNull$$);
}, glGetProgramiv:($log$jscomp$1_program$jscomp$67$$, $i$jscomp$47_pname$jscomp$26$$, $p$jscomp$5$$) => {
  if ($p$jscomp$5$$) {
    if ($log$jscomp$1_program$jscomp$67$$ >= $GL$counter$$) {
      $GL$lastError$$ ||= 1281;
    } else {
      if ($log$jscomp$1_program$jscomp$67$$ = $GL$programs$$[$log$jscomp$1_program$jscomp$67$$], 35716 == $i$jscomp$47_pname$jscomp$26$$) {
        $log$jscomp$1_program$jscomp$67$$ = $GLctx$$.getProgramInfoLog($log$jscomp$1_program$jscomp$67$$), null === $log$jscomp$1_program$jscomp$67$$ && ($log$jscomp$1_program$jscomp$67$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$5$$ >> 2] = $log$jscomp$1_program$jscomp$67$$.length + 1;
      } else if (35719 == $i$jscomp$47_pname$jscomp$26$$) {
        if (!$log$jscomp$1_program$jscomp$67$$.$maxUniformLength$) {
          var $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$67$$, 35718);
          for ($i$jscomp$47_pname$jscomp$26$$ = 0; $i$jscomp$47_pname$jscomp$26$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$47_pname$jscomp$26$$) {
            $log$jscomp$1_program$jscomp$67$$.$maxUniformLength$ = Math.max($log$jscomp$1_program$jscomp$67$$.$maxUniformLength$, $GLctx$$.getActiveUniform($log$jscomp$1_program$jscomp$67$$, $i$jscomp$47_pname$jscomp$26$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$5$$ >> 2] = $log$jscomp$1_program$jscomp$67$$.$maxUniformLength$;
      } else if (35722 == $i$jscomp$47_pname$jscomp$26$$) {
        if (!$log$jscomp$1_program$jscomp$67$$.$maxAttributeLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$67$$, 35721), $i$jscomp$47_pname$jscomp$26$$ = 0; $i$jscomp$47_pname$jscomp$26$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$47_pname$jscomp$26$$) {
            $log$jscomp$1_program$jscomp$67$$.$maxAttributeLength$ = Math.max($log$jscomp$1_program$jscomp$67$$.$maxAttributeLength$, $GLctx$$.getActiveAttrib($log$jscomp$1_program$jscomp$67$$, $i$jscomp$47_pname$jscomp$26$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$5$$ >> 2] = $log$jscomp$1_program$jscomp$67$$.$maxAttributeLength$;
      } else if (35381 == $i$jscomp$47_pname$jscomp$26$$) {
        if (!$log$jscomp$1_program$jscomp$67$$.$maxUniformBlockNameLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$67$$, 35382), $i$jscomp$47_pname$jscomp$26$$ = 0; $i$jscomp$47_pname$jscomp$26$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$47_pname$jscomp$26$$) {
            $log$jscomp$1_program$jscomp$67$$.$maxUniformBlockNameLength$ = Math.max($log$jscomp$1_program$jscomp$67$$.$maxUniformBlockNameLength$, $GLctx$$.getActiveUniformBlockName($log$jscomp$1_program$jscomp$67$$, $i$jscomp$47_pname$jscomp$26$$).length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$5$$ >> 2] = $log$jscomp$1_program$jscomp$67$$.$maxUniformBlockNameLength$;
      } else {
        $HEAP32$$[$p$jscomp$5$$ >> 2] = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$67$$, $i$jscomp$47_pname$jscomp$26$$);
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, glGetShaderInfoLog:($log$jscomp$2_shader$jscomp$14$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$1$$, $length$jscomp$41$$, $infoLog$jscomp$1$$) => {
  $log$jscomp$2_shader$jscomp$14$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$2_shader$jscomp$14$$]);
  null === $log$jscomp$2_shader$jscomp$14$$ && ($log$jscomp$2_shader$jscomp$14$$ = "(unknown error)");
  $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$1$$ = 0 < $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$1$$ && $infoLog$jscomp$1$$ ? $stringToUTF8$$($log$jscomp$2_shader$jscomp$14$$, $infoLog$jscomp$1$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$1$$) : 0;
  $length$jscomp$41$$ && ($HEAP32$$[$length$jscomp$41$$ >> 2] = $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$1$$);
}, glGetShaderiv:($log$jscomp$3_shader$jscomp$15_source$jscomp$18$$, $pname$jscomp$27$$, $p$jscomp$6$$) => {
  $p$jscomp$6$$ ? 35716 == $pname$jscomp$27$$ ? ($log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$3_shader$jscomp$15_source$jscomp$18$$]), null === $log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ && ($log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$6$$ >> 2] = $log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ ? $log$jscomp$3_shader$jscomp$15_source$jscomp$18$$.length + 1 : 0) : 35720 == $pname$jscomp$27$$ ? 
  ($log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ = $GLctx$$.getShaderSource($GL$shaders$$[$log$jscomp$3_shader$jscomp$15_source$jscomp$18$$]), $HEAP32$$[$p$jscomp$6$$ >> 2] = $log$jscomp$3_shader$jscomp$15_source$jscomp$18$$ ? $log$jscomp$3_shader$jscomp$15_source$jscomp$18$$.length + 1 : 0) : $HEAP32$$[$p$jscomp$6$$ >> 2] = $GLctx$$.getShaderParameter($GL$shaders$$[$log$jscomp$3_shader$jscomp$15_source$jscomp$18$$], $pname$jscomp$27$$) : $GL$lastError$$ ||= 1281;
}, glGetUniformBlockIndex:($program$jscomp$68$$, $uniformBlockName$jscomp$1$$) => $GLctx$$.getUniformBlockIndex($GL$programs$$[$program$jscomp$68$$], $UTF8ToString$$($uniformBlockName$jscomp$1$$)), glGetUniformLocation:($program$jscomp$70$$, $name$jscomp$120$$) => {
  $name$jscomp$120$$ = $UTF8ToString$$($name$jscomp$120$$);
  if ($program$jscomp$70$$ = $GL$programs$$[$program$jscomp$70$$]) {
    var $program$jscomp$inline_319_uniformLocsById$jscomp$1$$ = $program$jscomp$70$$, $arrayIndex_uniformLocsById$jscomp$inline_320$$ = $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformLocsById$, $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$ = $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformSizeAndIdsByName$, $i$jscomp$inline_322_leftBrace$$;
    if (!$arrayIndex_uniformLocsById$jscomp$inline_320$$) {
      $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformLocsById$ = $arrayIndex_uniformLocsById$jscomp$inline_320$$ = {};
      $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformArrayNamesById$ = {};
      var $numActiveUniforms$jscomp$inline_324$$ = $GLctx$$.getProgramParameter($program$jscomp$inline_319_uniformLocsById$jscomp$1$$, 35718);
      for ($i$jscomp$inline_322_leftBrace$$ = 0; $i$jscomp$inline_322_leftBrace$$ < $numActiveUniforms$jscomp$inline_324$$; ++$i$jscomp$inline_322_leftBrace$$) {
        var $sz$jscomp$inline_327_u$jscomp$inline_325$$ = $GLctx$$.getActiveUniform($program$jscomp$inline_319_uniformLocsById$jscomp$1$$, $i$jscomp$inline_322_leftBrace$$);
        var $j$jscomp$inline_323_nm$jscomp$inline_326$$ = $sz$jscomp$inline_327_u$jscomp$inline_325$$.name;
        $sz$jscomp$inline_327_u$jscomp$inline_325$$ = $sz$jscomp$inline_327_u$jscomp$inline_325$$.size;
        var $arrayName$jscomp$inline_329_lb$jscomp$inline_328$$ = $webglGetLeftBracePos$$($j$jscomp$inline_323_nm$jscomp$inline_326$$);
        $arrayName$jscomp$inline_329_lb$jscomp$inline_328$$ = 0 < $arrayName$jscomp$inline_329_lb$jscomp$inline_328$$ ? $j$jscomp$inline_323_nm$jscomp$inline_326$$.slice(0, $arrayName$jscomp$inline_329_lb$jscomp$inline_328$$) : $j$jscomp$inline_323_nm$jscomp$inline_326$$;
        var $id$jscomp$inline_330$$ = $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformIdCounter$;
        $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformIdCounter$ += $sz$jscomp$inline_327_u$jscomp$inline_325$$;
        $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$[$arrayName$jscomp$inline_329_lb$jscomp$inline_328$$] = [$sz$jscomp$inline_327_u$jscomp$inline_325$$, $id$jscomp$inline_330$$];
        for ($j$jscomp$inline_323_nm$jscomp$inline_326$$ = 0; $j$jscomp$inline_323_nm$jscomp$inline_326$$ < $sz$jscomp$inline_327_u$jscomp$inline_325$$; ++$j$jscomp$inline_323_nm$jscomp$inline_326$$) {
          $arrayIndex_uniformLocsById$jscomp$inline_320$$[$id$jscomp$inline_330$$] = $j$jscomp$inline_323_nm$jscomp$inline_326$$, $program$jscomp$inline_319_uniformLocsById$jscomp$1$$.$uniformArrayNamesById$[$id$jscomp$inline_330$$++] = $arrayName$jscomp$inline_329_lb$jscomp$inline_328$$;
        }
      }
    }
    $program$jscomp$inline_319_uniformLocsById$jscomp$1$$ = $program$jscomp$70$$.$uniformLocsById$;
    $arrayIndex_uniformLocsById$jscomp$inline_320$$ = 0;
    $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$ = $name$jscomp$120$$;
    $i$jscomp$inline_322_leftBrace$$ = $webglGetLeftBracePos$$($name$jscomp$120$$);
    0 < $i$jscomp$inline_322_leftBrace$$ && ($arrayIndex_uniformLocsById$jscomp$inline_320$$ = parseInt($name$jscomp$120$$.slice($i$jscomp$inline_322_leftBrace$$ + 1)) >>> 0, $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$ = $name$jscomp$120$$.slice(0, $i$jscomp$inline_322_leftBrace$$));
    if (($sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$ = $program$jscomp$70$$.$uniformSizeAndIdsByName$[$sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$]) && $arrayIndex_uniformLocsById$jscomp$inline_320$$ < $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$[0] && ($arrayIndex_uniformLocsById$jscomp$inline_320$$ += $sizeAndId_uniformBaseName_uniformSizeAndIdsByName$jscomp$inline_321$$[1], $program$jscomp$inline_319_uniformLocsById$jscomp$1$$[$arrayIndex_uniformLocsById$jscomp$inline_320$$] = 
    $program$jscomp$inline_319_uniformLocsById$jscomp$1$$[$arrayIndex_uniformLocsById$jscomp$inline_320$$] || $GLctx$$.getUniformLocation($program$jscomp$70$$, $name$jscomp$120$$))) {
      return $arrayIndex_uniformLocsById$jscomp$inline_320$$;
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
  return -1;
}, glLinkProgram:$program$jscomp$71$$ => {
  $program$jscomp$71$$ = $GL$programs$$[$program$jscomp$71$$];
  $GLctx$$.linkProgram($program$jscomp$71$$);
  $program$jscomp$71$$.$uniformLocsById$ = 0;
  $program$jscomp$71$$.$uniformSizeAndIdsByName$ = {};
}, glShaderSource:($shader$jscomp$16$$, $count$jscomp$42$$, $string$jscomp$6$$, $length$jscomp$42$$) => {
  for (var $source$jscomp$inline_337$$ = "", $i$jscomp$inline_338$$ = 0; $i$jscomp$inline_338$$ < $count$jscomp$42$$; ++$i$jscomp$inline_338$$) {
    $source$jscomp$inline_337$$ += $UTF8ToString$$($HEAPU32$$[$string$jscomp$6$$ + 4 * $i$jscomp$inline_338$$ >> 2], $length$jscomp$42$$ ? $HEAPU32$$[$length$jscomp$42$$ + 4 * $i$jscomp$inline_338$$ >> 2] : void 0);
  }
  $GLctx$$.shaderSource($GL$shaders$$[$shader$jscomp$16$$], $source$jscomp$inline_337$$);
}, glTexImage2D:($target$jscomp$100$$, $level$jscomp$19$$, $internalFormat$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$, $border$jscomp$5$$, $format$jscomp$21$$, $type$jscomp$180$$, $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$) => {
  if ($GLctx$$.$currentPixelUnpackBufferBinding$) {
    $GLctx$$.texImage2D($target$jscomp$100$$, $level$jscomp$19$$, $internalFormat$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$, $border$jscomp$5$$, $format$jscomp$21$$, $type$jscomp$180$$, $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$);
  } else {
    if ($JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$) {
      var $heap$jscomp$3_heap$jscomp$inline_345$$ = $heapObjectForWebGLType$$($type$jscomp$180$$);
      $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$ >>>= 31 - Math.clz32($heap$jscomp$3_heap$jscomp$inline_345$$.BYTES_PER_ELEMENT);
      $GLctx$$.texImage2D($target$jscomp$100$$, $level$jscomp$19$$, $internalFormat$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$, $border$jscomp$5$$, $format$jscomp$21$$, $type$jscomp$180$$, $heap$jscomp$3_heap$jscomp$inline_345$$, $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$);
    } else {
      if ($JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$) {
        $heap$jscomp$3_heap$jscomp$inline_345$$ = $heapObjectForWebGLType$$($type$jscomp$180$$);
        var $bytes$jscomp$inline_346$$ = $height$jscomp$28$$ * ($width$jscomp$33$$ * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[$format$jscomp$21$$ - 6402] || 1) * $heap$jscomp$3_heap$jscomp$inline_345$$.BYTES_PER_ELEMENT + 4 - 1 & -4);
        $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$ = $heap$jscomp$3_heap$jscomp$inline_345$$.subarray($JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$ >>> 31 - Math.clz32($heap$jscomp$3_heap$jscomp$inline_345$$.BYTES_PER_ELEMENT), $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$ + $bytes$jscomp$inline_346$$ >>> 31 - Math.clz32($heap$jscomp$3_heap$jscomp$inline_345$$.BYTES_PER_ELEMENT));
      } else {
        $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$ = null;
      }
      $GLctx$$.texImage2D($target$jscomp$100$$, $level$jscomp$19$$, $internalFormat$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$, $border$jscomp$5$$, $format$jscomp$21$$, $type$jscomp$180$$, $JSCompiler_temp$jscomp$58_index$jscomp$105_pixels$jscomp$2$$);
    }
  }
}, glTexParameteri:($x0$jscomp$7$$, $x1$jscomp$6$$, $x2$jscomp$4$$) => $GLctx$$.texParameteri($x0$jscomp$7$$, $x1$jscomp$6$$, $x2$jscomp$4$$), glUniform1i:($JSCompiler_inline_result$jscomp$61_location$jscomp$80$$, $v0$jscomp$16$$) => {
  var $JSCompiler_temp_const$jscomp$60$$ = $GLctx$$, $JSCompiler_temp_const$jscomp$59$$ = $JSCompiler_temp_const$jscomp$60$$.uniform1i;
  var $p$jscomp$inline_349$$ = $GLctx$$.$currentProgram$;
  if ($p$jscomp$inline_349$$) {
    var $webglLoc$jscomp$inline_350$$ = $p$jscomp$inline_349$$.$uniformLocsById$[$JSCompiler_inline_result$jscomp$61_location$jscomp$80$$];
    "number" == typeof $webglLoc$jscomp$inline_350$$ && ($p$jscomp$inline_349$$.$uniformLocsById$[$JSCompiler_inline_result$jscomp$61_location$jscomp$80$$] = $webglLoc$jscomp$inline_350$$ = $GLctx$$.getUniformLocation($p$jscomp$inline_349$$, $p$jscomp$inline_349$$.$uniformArrayNamesById$[$JSCompiler_inline_result$jscomp$61_location$jscomp$80$$] + (0 < $webglLoc$jscomp$inline_350$$ ? `[${$webglLoc$jscomp$inline_350$$}]` : "")));
    $JSCompiler_inline_result$jscomp$61_location$jscomp$80$$ = $webglLoc$jscomp$inline_350$$;
  } else {
    $GL$lastError$$ ||= 1282, $JSCompiler_inline_result$jscomp$61_location$jscomp$80$$ = void 0;
  }
  $JSCompiler_temp_const$jscomp$59$$.call($JSCompiler_temp_const$jscomp$60$$, $JSCompiler_inline_result$jscomp$61_location$jscomp$80$$, $v0$jscomp$16$$);
}, glUniformBlockBinding:($program$jscomp$72$$, $uniformBlockIndex$jscomp$3$$, $uniformBlockBinding$jscomp$1$$) => {
  $program$jscomp$72$$ = $GL$programs$$[$program$jscomp$72$$];
  $GLctx$$.uniformBlockBinding($program$jscomp$72$$, $uniformBlockIndex$jscomp$3$$, $uniformBlockBinding$jscomp$1$$);
}, glUseProgram:$program$jscomp$73$$ => {
  $program$jscomp$73$$ = $GL$programs$$[$program$jscomp$73$$];
  $GLctx$$.useProgram($program$jscomp$73$$);
  $GLctx$$.$currentProgram$ = $program$jscomp$73$$;
}, glVertexAttribPointer:($index$jscomp$106$$, $size$jscomp$32$$, $type$jscomp$181$$, $normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$34$$) => {
  $GLctx$$.vertexAttribPointer($index$jscomp$106$$, $size$jscomp$32$$, $type$jscomp$181$$, !!$normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$34$$);
}, glViewport:($x0$jscomp$8$$, $x1$jscomp$7$$, $x2$jscomp$5$$, $x3$jscomp$1$$) => $GLctx$$.viewport($x0$jscomp$8$$, $x1$jscomp$7$$, $x2$jscomp$5$$, $x3$jscomp$1$$), textureFromURL:function($textureID$$, $url$jscomp$29$$, $ctxId$$) {
  let $gl$jscomp$1$$ = $GL$contexts$$[$ctxId$$].$GLctx$, $img$jscomp$2$$ = new Image(), $imgUrl$$ = $UTF8ToString$$($url$jscomp$29$$);
  $img$jscomp$2$$.onload = function() {
    let $texture$jscomp$9$$ = $GL$textures$$[$textureID$$];
    $texture$jscomp$9$$ ? ($gl$jscomp$1$$.bindTexture($gl$jscomp$1$$.TEXTURE_2D, $texture$jscomp$9$$), $gl$jscomp$1$$.texImage2D($gl$jscomp$1$$.TEXTURE_2D, 0, $gl$jscomp$1$$.RGBA, $gl$jscomp$1$$.RGBA, $gl$jscomp$1$$.UNSIGNED_BYTE, $img$jscomp$2$$), $gl$jscomp$1$$.generateMipmap($gl$jscomp$1$$.TEXTURE_2D), $gl$jscomp$1$$.texParameteri($gl$jscomp$1$$.TEXTURE_2D, $gl$jscomp$1$$.TEXTURE_MIN_FILTER, $gl$jscomp$1$$.LINEAR_MIPMAP_LINEAR), $gl$jscomp$1$$.texParameteri($gl$jscomp$1$$.TEXTURE_2D, $gl$jscomp$1$$.TEXTURE_MAG_FILTER, 
    $gl$jscomp$1$$.LINEAR), $gl$jscomp$1$$.bindTexture($gl$jscomp$1$$.TEXTURE_2D, null)) : console.error("Texture failed to load (it no longer exists):\t" + $imgUrl$$);
  };
  $img$jscomp$2$$.onerror = function() {
    console.error("Texture failed to load:\t" + $imgUrl$$);
  };
  $img$jscomp$2$$.src = $imgUrl$$;
}}, $calledRun$$;
function $run$$() {
  function $doRun$$() {
    $assert$$(!$calledRun$$);
    $calledRun$$ = !0;
    $Module$$.calledRun = !0;
    if (!$ABORT$$) {
      $assert$$(!$runtimeInitialized$$);
      $runtimeInitialized$$ = !0;
      $checkStackCookie$$();
      if (!$Module$$.noFSInit && !$FS$initialized$$) {
        $assert$$(!$FS$initialized$$, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        $FS$initialized$$ = !0;
        $input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$ ??= $Module$$.stdin;
        $output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$ ??= $Module$$.stdout;
        $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$ ??= $Module$$.stderr;
        $input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$ ? $FS$createDevice$$("/dev", "stdin", $input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$) : $FS$symlink$$("/dev/tty", "/dev/stdin");
        $output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$ ? $FS$createDevice$$("/dev", "stdout", null, $output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$) : $FS$symlink$$("/dev/tty", "/dev/stdout");
        $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$ ? $FS$createDevice$$("/dev", "stderr", null, $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$) : $FS$symlink$$("/dev/tty1", "/dev/stderr");
        var $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$ = $FS$open$$("/dev/stdin", 0);
        var $input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$ = $FS$open$$("/dev/stdout", 1);
        var $output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$ = $FS$open$$("/dev/stderr", 1);
        $assert$$(0 === $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$.$fd$, `invalid handle for stdin (${$cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$.$fd$})`);
        $assert$$(1 === $input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$.$fd$, `invalid handle for stdout (${$input$jscomp$inline_441_input$jscomp$inline_444_stdout$jscomp$inline_448$$.$fd$})`);
        $assert$$(2 === $output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$.$fd$, `invalid handle for stderr (${$output$jscomp$inline_442_output$jscomp$inline_445_stderr$jscomp$inline_449$$.$fd$})`);
      }
      $wasmExports$$.__wasm_call_ctors();
      $FS$ignorePermissions$$ = !1;
      $readyPromiseResolve$$?.($Module$$);
      $Module$$.onRuntimeInitialized?.();
      $consumedModuleProp$$("onRuntimeInitialized");
      $assert$$(!$Module$$._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      $checkStackCookie$$();
      if ($Module$$.postRun) {
        for ("function" == typeof $Module$$.postRun && ($Module$$.postRun = [$Module$$.postRun]); $Module$$.postRun.length;) {
          $cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$ = $Module$$.postRun.shift(), $onPostRuns$$.push($cb$jscomp$inline_451_error$jscomp$inline_443_error$jscomp$inline_446_stdin$jscomp$inline_447$$);
        }
      }
      $consumedModuleProp$$("postRun");
      $callRuntimeCallbacks$$($onPostRuns$$);
    }
  }
  if (0 < $runDependencies$$) {
    $dependenciesFulfilled$$ = $run$$;
  } else {
    $_emscripten_stack_init$$();
    $writeStackCookie$$();
    if ($Module$$.preRun) {
      for ("function" == typeof $Module$$.preRun && ($Module$$.preRun = [$Module$$.preRun]); $Module$$.preRun.length;) {
        $addOnPreRun$$();
      }
    }
    $consumedModuleProp$$("preRun");
    $callRuntimeCallbacks$$($onPreRuns$$);
    0 < $runDependencies$$ ? $dependenciesFulfilled$$ = $run$$ : ($Module$$.setStatus ? ($Module$$.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => $Module$$.setStatus(""), 1);
      $doRun$$();
    }, 1)) : $doRun$$(), $checkStackCookie$$());
  }
}
var $wasmExports$$;
$wasmExports$$ = await (async function() {
  function $receiveInstance$$($instance$jscomp$1_wasmExports$jscomp$inline_356$$) {
    $instance$jscomp$1_wasmExports$jscomp$inline_356$$ = $wasmExports$$ = $instance$jscomp$1_wasmExports$jscomp$inline_356$$.exports;
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.__getTypeName, "missing Wasm export: __getTypeName");
    $___getTypeName$$ = $createExportWrapper$$("__getTypeName");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.malloc, "missing Wasm export: malloc");
    $_malloc$$ = $createExportWrapper$$("malloc");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.free, "missing Wasm export: free");
    $_free$$ = $createExportWrapper$$("free");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.fflush, "missing Wasm export: fflush");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_get_end, "missing Wasm export: emscripten_stack_get_end");
    $_emscripten_stack_get_end$$ = $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_get_end;
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_get_base, "missing Wasm export: emscripten_stack_get_base");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.strerror, "missing Wasm export: strerror");
    $_strerror$$ = $createExportWrapper$$("strerror");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_init, "missing Wasm export: emscripten_stack_init");
    $_emscripten_stack_init$$ = $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_init;
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_get_free, "missing Wasm export: emscripten_stack_get_free");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$._emscripten_stack_restore, "missing Wasm export: _emscripten_stack_restore");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$._emscripten_stack_alloc, "missing Wasm export: _emscripten_stack_alloc");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.emscripten_stack_get_current, "missing Wasm export: emscripten_stack_get_current");
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.memory, "missing Wasm export: memory");
    $wasmMemory$$ = $instance$jscomp$1_wasmExports$jscomp$inline_356$$.memory;
    $assert$$("undefined" != typeof $instance$jscomp$1_wasmExports$jscomp$inline_356$$.__indirect_function_table, "missing Wasm export: __indirect_function_table");
    $wasmTable$$ = $instance$jscomp$1_wasmExports$jscomp$inline_356$$.__indirect_function_table;
    $updateMemoryViews$$();
    return $wasmExports$$;
  }
  var $trueModule$$ = $Module$$, $info$$ = {env:$wasmImports$$, wasi_snapshot_preview1:$wasmImports$$};
  if ($Module$$.instantiateWasm) {
    return new Promise(($resolve$$, $reject$$) => {
      try {
        $Module$$.instantiateWasm($info$$, ($inst$$, $mod$$) => {
          $resolve$$($receiveInstance$$($inst$$, $mod$$));
        });
      } catch ($e$jscomp$8$$) {
        $err$$(`Module.instantiateWasm callback failed with error: ${$e$jscomp$8$$}`), $reject$$($e$jscomp$8$$);
      }
    });
  }
  $wasmBinaryFile$$ ??= $Module$$.locateFile ? $Module$$.locateFile("equirectangular_debug.wasm", $scriptDirectory$$) : $scriptDirectory$$ + "equirectangular_debug.wasm";
  return function($result$jscomp$2$$) {
    $assert$$($Module$$ === $trueModule$$, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    $trueModule$$ = null;
    return $receiveInstance$$($result$jscomp$2$$.instance);
  }(await $instantiateAsync$$($info$$));
}());
$run$$();
$runtimeInitialized$$ ? moduleRtn = $Module$$ : moduleRtn = new Promise(($resolve$jscomp$1$$, $reject$jscomp$1$$) => {
  $readyPromiseResolve$$ = $resolve$jscomp$1$$;
  $readyPromiseReject$$ = $reject$jscomp$1$$;
});
for (const $prop$jscomp$4$$ of Object.keys($Module$$)) {
  $prop$jscomp$4$$ in moduleArg || Object.defineProperty(moduleArg, $prop$jscomp$4$$, {configurable:!0, get() {
    $abort$$(`Access to module property ('${$prop$jscomp$4$$}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
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

