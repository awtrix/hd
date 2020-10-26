(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AwtrixComponent.awtrix"] = factory(require("vue"));
	else
		root["AwtrixComponent.awtrix"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE_vue__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@soda/get-current-script/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@soda/get-current-script/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller\n// MIT license\n// source: https://github.com/amiller-gh/currentScript-polyfill\n\n// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505\n\n(function (root, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n}(typeof self !== 'undefined' ? self : this, function () {\n  function getCurrentScript () {\n    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')\n    // for chrome\n    if (!descriptor && 'currentScript' in document && document.currentScript) {\n      return document.currentScript\n    }\n\n    // for other browsers with native support for currentScript\n    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {\n      return document.currentScript\n    }\n  \n    // IE 8-10 support script readyState\n    // IE 11+ & Firefox support stack trace\n    try {\n      throw new Error();\n    }\n    catch (err) {\n      // Find the second match for the \"at\" string to get file src url from stack.\n      var ieStackRegExp = /.*at [^(]*\\((.*):(.+):(.+)\\)$/ig,\n        ffStackRegExp = /@([^@]*):(\\d+):(\\d+)\\s*$/ig,\n        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),\n        scriptLocation = (stackDetails && stackDetails[1]) || false,\n        line = (stackDetails && stackDetails[2]) || false,\n        currentLocation = document.location.href.replace(document.location.hash, ''),\n        pageSource,\n        inlineScriptSourceRegExp,\n        inlineScriptSource,\n        scripts = document.getElementsByTagName('script'); // Live NodeList collection\n  \n      if (scriptLocation === currentLocation) {\n        pageSource = document.documentElement.outerHTML;\n        inlineScriptSourceRegExp = new RegExp('(?:[^\\\\n]+?\\\\n){0,' + (line - 2) + '}[^<]*<script>([\\\\d\\\\D]*?)<\\\\/script>[\\\\d\\\\D]*', 'i');\n        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();\n      }\n  \n      for (var i = 0; i < scripts.length; i++) {\n        // If ready state is interactive, return the script tag\n        if (scripts[i].readyState === 'interactive') {\n          return scripts[i];\n        }\n  \n        // If src matches, return the script tag\n        if (scripts[i].src === scriptLocation) {\n          return scripts[i];\n        }\n  \n        // If inline source matches, return the script tag\n        if (\n          scriptLocation === currentLocation &&\n          scripts[i].innerHTML &&\n          scripts[i].innerHTML.trim() === inlineScriptSource\n        ) {\n          return scripts[i];\n        }\n      }\n  \n      // If no match, return null\n      return null;\n    }\n  };\n\n  return getCurrentScript\n}));\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./node_modules/@soda/get-current-script/index.js?");

/***/ }),

/***/ "./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPublicPath */ \"./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js\");\n/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~entry */ \"./yeelight/frontend.vue\");\n/* empty/unused harmony star reexport */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_entry__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js?");

/***/ }),

/***/ "./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This file is imported into lib/wc client bundles.\n\nif (typeof window !== 'undefined') {\n  var currentScript = window.document.currentScript\n  if (true) {\n    var getCurrentScript = __webpack_require__(/*! @soda/get-current-script */ \"./node_modules/@soda/get-current-script/index.js\")\n    currentScript = getCurrentScript()\n\n    // for backward compatibility, because previously we directly included the polyfill\n    if (!('currentScript' in document)) {\n      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })\n    }\n  }\n\n  var src = currentScript && currentScript.src.match(/(.+\\/)[^/]+\\.js(\\?.*)?$/)\n  if (src) {\n    __webpack_require__.p = src[1] // eslint-disable-line\n  }\n}\n\n// Indicate to webpack that this file can be concatenated\n/* harmony default export */ __webpack_exports__[\"default\"] = (null);\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./yeelight/frontend.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./yeelight/frontend.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({\n    props: ['io'],\n\n    data () {\n        return {\n            status: 'n/a',\n        }\n    },\n\n    mounted () {\n    },\n\n    methods: {\n        async toggle () {\n          this.io.emit('toggle')\n        },\n\n        async updateStatus () {\n        },\n    },\n}));\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./yeelight/frontend.vue?./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"236c382a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./yeelight/frontend.vue?vue&type=template&id=c21f9f34&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"236c382a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./yeelight/frontend.vue?vue&type=template&id=c21f9f34& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticStyle: { padding: \"30px\" } }, [\n    _c(\n      \"button\",\n      {\n        style: { backgroundColor: _vm.status == \"on\" ? \"green\" : \"red\" },\n        on: { click: _vm.toggle }\n      },\n      [_vm._v(\"Toggle Light\")]\n    ),\n    _c(\"p\", [_vm._v(\"Current Status: \" + _vm._s(_vm.status))])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./yeelight/frontend.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22236c382a-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return normalizeComponent; });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () {\n        injectStyles.call(\n          this,\n          (options.functional ? this.parent : this).$root.$options.shadowRoot\n        )\n      }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functional component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ "./yeelight/frontend.vue":
/*!*******************************!*\
  !*** ./yeelight/frontend.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend.vue?vue&type=template&id=c21f9f34& */ \"./yeelight/frontend.vue?vue&type=template&id=c21f9f34&\");\n/* harmony import */ var _frontend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frontend.vue?vue&type=script&lang=js& */ \"./yeelight/frontend.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _frontend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"yeelight/frontend.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./yeelight/frontend.vue?");

/***/ }),

/***/ "./yeelight/frontend.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./yeelight/frontend.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_frontend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./frontend.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./yeelight/frontend.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_frontend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./yeelight/frontend.vue?");

/***/ }),

/***/ "./yeelight/frontend.vue?vue&type=template&id=c21f9f34&":
/*!**************************************************************!*\
  !*** ./yeelight/frontend.vue?vue&type=template&id=c21f9f34& ***!
  \**************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_236c382a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"236c382a-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./frontend.vue?vue&type=template&id=c21f9f34& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"236c382a-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./yeelight/frontend.vue?vue&type=template&id=c21f9f34&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_236c382a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_236c382a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_frontend_vue_vue_type_template_id_c21f9f34___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/./yeelight/frontend.vue?");

/***/ }),

/***/ "vue":
/*!******************************************************************!*\
  !*** external {"commonjs":"vue","commonjs2":"vue","root":"Vue"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;\n\n//# sourceURL=webpack://AwtrixComponent.awtrix/external_%7B%22commonjs%22:%22vue%22,%22commonjs2%22:%22vue%22,%22root%22:%22Vue%22%7D?");

/***/ })

/******/ })["default"];
});
