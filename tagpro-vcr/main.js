/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/App.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/App.css ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".game-frame {\n\twidth: 100%;\n\tmin-width: 1280px;\n\tmin-height: 800px;\n}\n\nhtml,\nbody,\n#root,\n#container {\n\theight: 100%;\n}\n\nol, ul {\n\tlist-style-position: inherit;\n\tmargin-left: 1.5rem;\n}\n\n#container {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.panel {\n\theight: 98%;\n\tpadding-bottom: 0.4rem;\n}\n\n#file {\n\tdisplay: none;\n}\n\n#header {\n\tpadding: 0.4rem;\n\twhite-space: nowrap;\n}\n\n#game-container {\n\tmargin-top: 0.4rem;\n\tflex: 10;\n\toverflow: hidden;\n}\n\n#game-frame {\n\twidth: 100%;\n\theight: 100%;\n}\n\n.btn {\n\tvertical-align: initial;\n}\n\n.modal.active .modal-overlay, .modal:target .modal-overlay {\n\tbackground: rgba(0, 0, 0, 0.5);\n}\n\n.control .rc-slider {\n\tdisplay: inline-block;\n\twidth: 20rem;\n\tmargin-right: 1rem;\n\tpadding-bottom: 0.5rem;\n}\n\n.control .rc-slider-disabled {\n\tbackground-color: inherit;\n}\n\n.control .rc-slider-track {\n\theight: 1rem;\n\tbackground-color: #4240d4;\n\tborder-radius: 0;\n}\n\n.control .rc-slider-disabled .rc-slider-track {\n\tbackground-color: #cccccc;\n}\n\n.control .rc-slider-rail {\n\theight: 1rem;\n\tbackground-color: #cccccc;\n\tborder-radius: 0;\n}\n\n.control .rc-slider-handle {\n\theight: 1.6rem;\n\twidth: 0.4rem;\n\tborder-radius: 0;\n\tmargin-top: -0.3rem;\n\tborder-color: #4240d4;\n\tbox-shadow: none;\n}\n\n.control .rc-slider-disabled .rc-slider-handle {\n\tborder-color: #cccccc;\n}\n\n.control button {\n\tborder: none;\n\tcursor: pointer;\n\tbackground: transparent;\n\tbackground-size: contain !important;\n\tbackground-repeat: no-repeat;\n\twidth: 1.8rem;\n\theight: 1.8rem;\n\tline-height: 1rem;\n\tvertical-align: middle;\n}\n\n.control button:hover {\n\topacity: 0.5;\n}\n\n.control button:hover, .control button:focus {\n\tbackground: transparent;\n\tbox-shadow: none;\n}\n\n.control button[data-state=hidden] {\n\tdisplay: none;\n}\n.control button[data-state=visible] {\n\tdisplay: block;\n}\n\n/* Color changing filters generated by: https://codepen.io/sosuke/pen/Pjoqqp */\n\n.control button[data-state=\"play\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M300 0H0v300h300V0zm-94.2 158.3-86.6 50c-1.3.8-2.8 1.1-4.3 1.1-4.7 0-8.5-3.8-8.5-8.5V101c0-3.1 1.6-5.9 4.3-7.4 2.6-1.5 5.9-1.5 8.6 0l86.6 50c2.6 1.5 4.3 4.3 4.3 7.4-.1 2.9-1.7 5.7-4.4 7.3z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n\n.control button[data-state=\"pause\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm164.6-44.5c0-9.5 7.7-17.2 17.2-17.2S199 96 199 105.5v89.1c0 9.5-7.7 17.2-17.2 17.2s-17.2-7.7-17.2-17.2v-89.1zm-64.6 0c0-9.5 7.7-17.2 17.2-17.2s17.2 7.7 17.2 17.2v89.1c0 9.5-7.7 17.2-17.2 17.2s-17.2-7.7-17.2-17.2v-89.1z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n\n.control button[data-state=\"stop\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm89.4-46.6c0-7.7 6.3-14 14-14h93.3c7.7 0 14 6.3 14 14v93.3c0 7.7-6.3 14-14 14h-93.3c-7.7 0-14-6.3-14-14v-93.3z'/%3E%3C/svg%3E\");\n\tfilter: invert(58%) sepia(83%) saturate(6031%) hue-rotate(7deg) brightness(96%) contrast(100%);\n}\n\n.control button[data-state=\"reload\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm146.1-86.9c21.9 0 41.9 8.2 57.2 21.6l-13.6 23.6c-11-11.5-26.5-18.7-43.6-18.7-33.3 0-60.4 27.1-60.4 60.4s27.1 60.4 60.4 60.4c25.4 0 47.1-15.7 56-37.9h-20.8l36.2-62.6 36.2 62.6h-23.6c-9.9 37.1-43.8 64.5-84 64.5-47.9 0-86.9-39-86.9-86.9s39-87 86.9-87z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n", "",{"version":3,"sources":["webpack://./src/components/App.css"],"names":[],"mappings":"AAAA;CACC,WAAW;CACX,iBAAiB;CACjB,iBAAiB;AAClB;;AAEA;;;;CAIC,YAAY;AACb;;AAEA;CACC,4BAA4B;CAC5B,mBAAmB;AACpB;;AAEA;CACC,aAAa;CACb,sBAAsB;AACvB;;AAEA;CACC,WAAW;CACX,sBAAsB;AACvB;;AAEA;CACC,aAAa;AACd;;AAEA;CACC,eAAe;CACf,mBAAmB;AACpB;;AAEA;CACC,kBAAkB;CAClB,QAAQ;CACR,gBAAgB;AACjB;;AAEA;CACC,WAAW;CACX,YAAY;AACb;;AAEA;CACC,uBAAuB;AACxB;;AAEA;CACC,8BAA8B;AAC/B;;AAEA;CACC,qBAAqB;CACrB,YAAY;CACZ,kBAAkB;CAClB,sBAAsB;AACvB;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,YAAY;CACZ,yBAAyB;CACzB,gBAAgB;AACjB;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,YAAY;CACZ,yBAAyB;CACzB,gBAAgB;AACjB;;AAEA;CACC,cAAc;CACd,aAAa;CACb,gBAAgB;CAChB,mBAAmB;CACnB,qBAAqB;CACrB,gBAAgB;AACjB;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,YAAY;CACZ,eAAe;CACf,uBAAuB;CACvB,mCAAmC;CACnC,4BAA4B;CAC5B,aAAa;CACb,cAAc;CACd,iBAAiB;CACjB,sBAAsB;AACvB;;AAEA;CACC,YAAY;AACb;;AAEA;CACC,uBAAuB;CACvB,gBAAgB;AACjB;;AAEA;CACC,aAAa;AACd;AACA;CACC,cAAc;AACf;;AAEA,8EAA8E;;AAE9E;CACC,mYAAmY;CACnY,8FAA8F;AAC/F;;AAEA;CACC,ybAAyb;CACzb,8FAA8F;AAC/F;;AAEA;CACC,4UAA4U;CAC5U,8FAA8F;AAC/F;;AAEA;CACC,udAAud;CACvd,8FAA8F;AAC/F","sourcesContent":[".game-frame {\n\twidth: 100%;\n\tmin-width: 1280px;\n\tmin-height: 800px;\n}\n\nhtml,\nbody,\n#root,\n#container {\n\theight: 100%;\n}\n\nol, ul {\n\tlist-style-position: inherit;\n\tmargin-left: 1.5rem;\n}\n\n#container {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.panel {\n\theight: 98%;\n\tpadding-bottom: 0.4rem;\n}\n\n#file {\n\tdisplay: none;\n}\n\n#header {\n\tpadding: 0.4rem;\n\twhite-space: nowrap;\n}\n\n#game-container {\n\tmargin-top: 0.4rem;\n\tflex: 10;\n\toverflow: hidden;\n}\n\n#game-frame {\n\twidth: 100%;\n\theight: 100%;\n}\n\n.btn {\n\tvertical-align: initial;\n}\n\n.modal.active .modal-overlay, .modal:target .modal-overlay {\n\tbackground: rgba(0, 0, 0, 0.5);\n}\n\n.control .rc-slider {\n\tdisplay: inline-block;\n\twidth: 20rem;\n\tmargin-right: 1rem;\n\tpadding-bottom: 0.5rem;\n}\n\n.control .rc-slider-disabled {\n\tbackground-color: inherit;\n}\n\n.control .rc-slider-track {\n\theight: 1rem;\n\tbackground-color: #4240d4;\n\tborder-radius: 0;\n}\n\n.control .rc-slider-disabled .rc-slider-track {\n\tbackground-color: #cccccc;\n}\n\n.control .rc-slider-rail {\n\theight: 1rem;\n\tbackground-color: #cccccc;\n\tborder-radius: 0;\n}\n\n.control .rc-slider-handle {\n\theight: 1.6rem;\n\twidth: 0.4rem;\n\tborder-radius: 0;\n\tmargin-top: -0.3rem;\n\tborder-color: #4240d4;\n\tbox-shadow: none;\n}\n\n.control .rc-slider-disabled .rc-slider-handle {\n\tborder-color: #cccccc;\n}\n\n.control button {\n\tborder: none;\n\tcursor: pointer;\n\tbackground: transparent;\n\tbackground-size: contain !important;\n\tbackground-repeat: no-repeat;\n\twidth: 1.8rem;\n\theight: 1.8rem;\n\tline-height: 1rem;\n\tvertical-align: middle;\n}\n\n.control button:hover {\n\topacity: 0.5;\n}\n\n.control button:hover, .control button:focus {\n\tbackground: transparent;\n\tbox-shadow: none;\n}\n\n.control button[data-state=hidden] {\n\tdisplay: none;\n}\n.control button[data-state=visible] {\n\tdisplay: block;\n}\n\n/* Color changing filters generated by: https://codepen.io/sosuke/pen/Pjoqqp */\n\n.control button[data-state=\"play\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M300 0H0v300h300V0zm-94.2 158.3-86.6 50c-1.3.8-2.8 1.1-4.3 1.1-4.7 0-8.5-3.8-8.5-8.5V101c0-3.1 1.6-5.9 4.3-7.4 2.6-1.5 5.9-1.5 8.6 0l86.6 50c2.6 1.5 4.3 4.3 4.3 7.4-.1 2.9-1.7 5.7-4.4 7.3z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n\n.control button[data-state=\"pause\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm164.6-44.5c0-9.5 7.7-17.2 17.2-17.2S199 96 199 105.5v89.1c0 9.5-7.7 17.2-17.2 17.2s-17.2-7.7-17.2-17.2v-89.1zm-64.6 0c0-9.5 7.7-17.2 17.2-17.2s17.2 7.7 17.2 17.2v89.1c0 9.5-7.7 17.2-17.2 17.2s-17.2-7.7-17.2-17.2v-89.1z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n\n.control button[data-state=\"stop\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm89.4-46.6c0-7.7 6.3-14 14-14h93.3c7.7 0 14 6.3 14 14v93.3c0 7.7-6.3 14-14 14h-93.3c-7.7 0-14-6.3-14-14v-93.3z'/%3E%3C/svg%3E\");\n\tfilter: invert(58%) sepia(83%) saturate(6031%) hue-rotate(7deg) brightness(96%) contrast(100%);\n}\n\n.control button[data-state=\"reload\"] {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 150v150h300V0H0v150zm146.1-86.9c21.9 0 41.9 8.2 57.2 21.6l-13.6 23.6c-11-11.5-26.5-18.7-43.6-18.7-33.3 0-60.4 27.1-60.4 60.4s27.1 60.4 60.4 60.4c25.4 0 47.1-15.7 56-37.9h-20.8l36.2-62.6 36.2 62.6h-23.6c-9.9 37.1-43.8 64.5-84 64.5-47.9 0-86.9-39-86.9-86.9s39-87 86.9-87z'/%3E%3C/svg%3E\");\n\tfilter: invert(60%) sepia(31%) saturate(1116%) hue-rotate(76deg) brightness(87%) contrast(84%);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/components/App.css":
/*!********************************!*\
  !*** ./src/components/App.css ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/components/App.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rc_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-slider */ "./node_modules/rc-slider/es/index.js");
/* harmony import */ var rc_slider_assets_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rc-slider/assets/index.css */ "./node_modules/rc-slider/assets/index.css");
/* harmony import */ var _stores_AppState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stores/AppState */ "./src/stores/AppState.ts");
/* harmony import */ var _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/ProfileSettings */ "./src/utils/ProfileSettings.tsx");
/* harmony import */ var _utils_Textures__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/Textures */ "./src/utils/Textures.tsx");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Modal */ "./src/components/Modal.tsx");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./App.css */ "./src/components/App.css");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};










const gameFiles = {
    [_stores_AppState__WEBPACK_IMPORTED_MODULE_5__["GameTypes"].NORMAL]: 'game.html',
    [_stores_AppState__WEBPACK_IMPORTED_MODULE_5__["GameTypes"].EGGBALL]: 'game-egg.html',
    [_stores_AppState__WEBPACK_IMPORTED_MODULE_5__["GameTypes"].DRAGON_TOWER]: 'game-dragon-tower.html'
};
const App = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(class AppClass extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
    renderGame() {
        const { appState } = this.props;
        const gameType = appState.gameType();
        const gameSrc = gameFiles[gameType];
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("iframe", { id: "game-frame", src: gameSrc, frameBorder: "0" });
    }
    renderSettings() {
        const { appState } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "container grid-sm panel" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-header" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-title h5" }, "TagPro VCR Playback Settings")),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-body" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "columns" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "column col-6" },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Chat"),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideAllChat', 'Show All Chat', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideTeamChat', 'Show Team Chat', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideGroupChat', 'Show Group Chat', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideSystemChat', 'Show System Chat', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "HUD"),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideNames', 'Show Player Names', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideDegrees', 'Show Player Degrees', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideMatchState', 'Show Time, Score & Flags', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHidePerformanceInfo', 'Show FPS', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Video Settings"),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('disableParticles', 'Enable Particle Effects', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('forceCanvasRenderer', 'Enable WebGL Rendering', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('disableViewportScaling', 'Enable Viewport Scaling', true),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null)),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "column col-6" },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "EggBall"),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideRaptors', 'Show Raptors', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Other"),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('disableBallSpin', 'Enable Ball Spin', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideTeamNames', 'Show Custom Team Names', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderProfileCheckbox"]('vcrHideFlair', 'Show Flair', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                        "Tile Respawn Warnings:",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_6__["renderTileRespawnSelect"]())),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: "btn centered", onClick: appState.handleSettings }, "Done")))));
    }
    renderInfo() {
        const { appState } = this.props;
        const okButton = (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: "btn btn-primary close-modal", onClick: appState.handleDismissModal }, "Ok"));
        const failedModal = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_8__["default"], { title: "Invalid Recording", body: "This file does not contain a valid TagPro VCR recording.", stateVar: appState.modal === _stores_AppState__WEBPACK_IMPORTED_MODULE_5__["Modals"].FAILED, closeHandler: appState.handleDismissModal, actionButton: okButton });
        const forbiddenModal = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_8__["default"], { title: "Forbidden", body: "Unable to load recordings from this URL.", stateVar: appState.modal === _stores_AppState__WEBPACK_IMPORTED_MODULE_5__["Modals"].FORBIDDEN, closeHandler: appState.handleDismissModal, actionButton: okButton });
        const loadingModal = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_8__["default"], { title: "Please Wait", body: "Loading...", stateVar: appState.modal === _stores_AppState__WEBPACK_IMPORTED_MODULE_5__["Modals"].FETCHING, closeHandler: appState.handleDismissModal });
        const launchModal = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_8__["default"], { title: "Ready to Play", body: "Your recording has been loaded and is ready to play.", stateVar: appState.modal === _stores_AppState__WEBPACK_IMPORTED_MODULE_5__["Modals"].LAUNCH, closeHandler: appState.handleDismissModal, actionButton: this.renderStartButton() });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "container grid-sm panel" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-header" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-title h5" }, "TagPro VCR")),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "panel-body" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Usage"),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("ol", null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", null,
                        "Install the userscript:",
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.user.js" }, "tagpro-vcr.user.js"),
                        "."),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", null,
                        "Play a game of ",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "http://tagpro.gg" }, "TagPro"),
                        "."),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", null,
                        "Upload the recorded game here (",
                        this.renderUploadLabel(),
                        ") and click",
                        ' ',
                        this.renderStartButton(),
                        ".")),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Notes"),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("ul", null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", null,
                        "To test your TagPro userscripts here, add this @include:",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("code", null, "// @include https://bash-tp.github.io/tagpro-vcr/game*.html")),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", null,
                        "The game is running in \"spectator\"-mode, so you can press ",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("code", null, "C"),
                        " to center the view,",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("code", null, "+"),
                        "/",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("code", null, "-"),
                        " to zoom in/out etc. (see ",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "https://www.reddit.com/r/TagPro/wiki/gameplay#wiki_spectator" }, "wiki"),
                        ").")),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Texture Pack Selection"),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null,
                    "See ",
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "https://tagpro.koalabeast.com/textures/" }, "game"),
                    " for available texture packs."),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null, _utils_Textures__WEBPACK_IMPORTED_MODULE_7__["renderTextureSelect"]()),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: "btn centered", onClick: appState.handleSettings }, "More Settings")),
            failedModal,
            forbiddenModal,
            loadingModal,
            launchModal));
    }
    renderUploadLabel(label) {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("label", { htmlFor: "file", className: "btn btn-link" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("i", { className: "icon icon-upload" }),
            " ",
            label || 'Upload recording'));
    }
    renderStartButton() {
        const { appState } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-success', {
                disabled: appState.started || !appState.recording
            }), onClick: appState.handleStart }, "Play"));
    }
    renderNavbarStopped() {
        const { appState } = this.props;
        const fetchClasses = classnames__WEBPACK_IMPORTED_MODULE_0___default()('form-icon', 'icon', {
            'loading': appState.fetching,
            'icon-check': appState.recordingURL && !appState.fetching && appState.urlIsValid === true,
            'icon-stop': appState.recordingURL && appState.urlIsValid === false
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "form-horizontal" },
            this.renderUploadLabel(appState.recordingName),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, " or "),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('input-group input-inline', { 'has-icon-right': !!appState.recordingURL }) },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", { className: "form-input", type: "text", value: appState.recordingURL, onChange: appState.handleUrlChange, placeholder: "Fetch from URL (http://...)" }),
                appState.recordingURL && react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("i", { className: fetchClasses })),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", { id: "file", type: "file", accept: ".ndjson,.jsonl", onChange: appState.handleFileSelect }),
            ' ',
            this.renderStartButton()));
    }
    renderNavbarLoading() {
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "form-horizontal" }, "Loading..."));
    }
    renderNavbarPlaying() {
        const { appState } = this.props;
        const fmt = (t) => {
            if (appState.initialState === 3 /* NotStarted */ && t < appState.startPacket[0]) {
                return '-' + timeFormat(appState.firstTimePacket[2].time - (t - appState.firstTimePacket[0]));
            }
            else if (appState.overtimePacket && t >= appState.overtimePacket[0]) {
                return timeFormat(appState.overtimePacket[2].time + (t - appState.overtimePacket[0])) + " OT";
            }
            else {
                return timeFormat(appState.startPacket[2].time - (t - appState.startPacket[0]));
            }
        };
        const { Handle } = rc_slider__WEBPACK_IMPORTED_MODULE_3__["default"];
        const handle = props => {
            const { value, dragging, index } = props, restProps = __rest(props, ["value", "dragging", "index"]);
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](rc_slider__WEBPACK_IMPORTED_MODULE_3__["SliderTooltip"], { prefixCls: "rc-slider-tooltip", overlay: fmt(value), visible: dragging, placement: "top", key: index },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Handle, Object.assign({ value: value }, restProps))));
        };
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "form-horizontal" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", { className: "control" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](rc_slider__WEBPACK_IMPORTED_MODULE_3__["default"], { min: appState.minTS, max: appState.maxTS - (appState.maxTS % 1000), value: appState.currentTS, defaultValue: appState.minTS, handle: handle, disabled: appState.finished, onChange: appState.handleSlider, onAfterChange: appState.handleSeek }),
                ' ',
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: "btn", type: "button", "data-state": appState.finished ? "reload" : appState.paused ? "play" : "pause", onClick: appState.handleButton }),
                ' ',
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: "btn", type: "button", "data-state": "stop", onClick: appState.handleStop }))));
    }
    render() {
        const { appState } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { id: "container" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("header", { id: "header", className: "navbar" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-section" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, "TagPro VCR")),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-center" }, appState.started ? (appState.playing ? this.renderNavbarPlaying() : this.renderNavbarLoading()) : this.renderNavbarStopped()),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-section" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "https://github.com/bash-tp/tagpro-vcr", className: "btn" }, "GitHub"))),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { id: "game-container" }, appState.started ? this.renderGame() : appState.settings ? this.renderSettings() : this.renderInfo())));
    }
});
function timeFormat(time) {
    return new Date(time).toISOString().substr(14, 5);
}


/***/ }),

/***/ "./src/components/Modal.tsx":
/*!**********************************!*\
  !*** ./src/components/Modal.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Modal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        const p = this.props;
        let footer;
        if (p.actionButton) {
            footer = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-footer" }, p.actionButton));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: `modal modal-sm ${p.stateVar ? 'active' : ''}` },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-overlay" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-header" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "btn btn-clear float-right close-modal", onClick: p.closeHandler }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-title" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, p.title))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "modal-body" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "content" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, p.body))),
                footer)));
    }
}


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
/* harmony import */ var _stores_AppState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/AppState */ "./src/stores/AppState.ts");




const appState = new _stores_AppState__WEBPACK_IMPORTED_MODULE_3__["AppState"]();
Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_App__WEBPACK_IMPORTED_MODULE_2__["App"], { appState: appState }), document.getElementById('root'));


/***/ }),

/***/ "./src/stores/AppState.ts":
/*!********************************!*\
  !*** ./src/stores/AppState.ts ***!
  \********************************/
/*! exports provided: GameTypes, Modals, AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameTypes", function() { return GameTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modals", function() { return Modals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppState", function() { return AppState; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");
/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventedChannel */ "./src/utils/EventedChannel.ts");


const fetchPatterns = [
    new RegExp('^https://res\\.cloudinary\\.com/eggball/raw/upload/EggBall/[0-9]+.ndjson$')
];
var GameTypes;
(function (GameTypes) {
    GameTypes[GameTypes["NORMAL"] = 0] = "NORMAL";
    GameTypes[GameTypes["EGGBALL"] = 1] = "EGGBALL";
    GameTypes[GameTypes["DRAGON_TOWER"] = 2] = "DRAGON_TOWER";
})(GameTypes || (GameTypes = {}));
var Modals;
(function (Modals) {
    Modals[Modals["NONE"] = 0] = "NONE";
    Modals[Modals["FAILED"] = 1] = "FAILED";
    Modals[Modals["FORBIDDEN"] = 2] = "FORBIDDEN";
    Modals[Modals["FETCHING"] = 3] = "FETCHING";
    Modals[Modals["LAUNCH"] = 4] = "LAUNCH";
})(Modals || (Modals = {}));
class AppState {
    constructor() {
        this.recording = localStorage.getItem('recording');
        this.recordingName = localStorage.getItem('recordingName');
        this.recordingURL = '';
        this.selectedFile = undefined;
        this.packets = undefined;
        this.modal = Modals.NONE;
        this.settings = false;
        this.fetching = false;
        this.urlIsValid = undefined;
        this.started = false;
        this.playing = false;
        this.paused = false;
        this.seeking = false;
        this.finished = false;
        this.minTS = 0;
        this.maxTS = 0;
        this.currentTS = 0;
        this.firstTimePacket = undefined;
        this.startPacket = undefined;
        this.overtimePacket = undefined;
        this.initialState = 0;
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["makeAutoObservable"])(this, { channel: false, packets: false }, { autoBind: true });
        const channel = (this.channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__["default"]('vcr'));
        channel.on('request-recording', this.handleRequestRecording);
        channel.on('show-controls', this.handleShowControls);
        channel.on('time-sync', this.handleTimeSync);
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.selectedFile, file => {
            if (!file) {
                this.recordingName = undefined;
                this.recording = undefined;
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                Object(mobx__WEBPACK_IMPORTED_MODULE_0__["runInAction"])(() => {
                    this.recordingName = file.name;
                    this.recording = reader.result;
                });
            });
            reader.readAsText(file);
        });
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.recordingURL, url => {
            if (!this.recordingURL) {
                return;
            }
            this.fetching = true;
            fetch(url)
                .then(r => {
                if (!r.ok) {
                    throw r;
                }
                else {
                    return r.text();
                }
            })
                .then(text => {
                Object(mobx__WEBPACK_IMPORTED_MODULE_0__["runInAction"])(() => {
                    this.recording = text;
                    this.fetching = false;
                    this.urlIsValid = true;
                    if (this.modal === Modals.FETCHING) {
                        this.modal = Modals.LAUNCH;
                    }
                });
            })
                .catch(err => {
                Object(mobx__WEBPACK_IMPORTED_MODULE_0__["runInAction"])(() => {
                    this.recording = undefined;
                    this.fetching = false;
                    this.urlIsValid = false;
                    if (this.modal === Modals.FETCHING) {
                        this.modal = Modals.FAILED;
                    }
                });
            });
        }, {
            delay: 1000
        });
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.recording, localStore(this, 'recording'));
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.recordingName, localStore(this, 'recordingName'));
        this.checkHash();
        window.addEventListener('hashchange', this.hashChange);
    }
    checkHash() {
        const hash = location.hash;
        if (hash === '#launch') {
            this.modal = Modals.LAUNCH;
        }
        if (hash.startsWith('#fetch=')) {
            const url = hash.substr(7);
            const valid = !!fetchPatterns.find(p => url.match(p));
            if (valid) {
                this.modal = Modals.FETCHING;
                this.recording = '';
                this.recordingName = '';
                this.recordingURL = url;
            }
            else {
                this.modal = Modals.FORBIDDEN;
            }
        }
        location.hash = '';
    }
    hashChange() {
        const hash = location.hash;
        if (hash !== '' && hash !== '#') {
            location.reload();
        }
    }
    gameType() {
        const mapPacket = this.packets.find(p => p[1] === 'map');
        try {
            switch (mapPacket[2].info.name) {
                case 'Egg Ball':
                    return GameTypes.EGGBALL;
                case 'Tower of the TagPro Dragon':
                    return GameTypes.DRAGON_TOWER;
            }
        }
        catch (_a) {
            // ignore
        }
        return GameTypes.NORMAL;
    }
    handleSettings() {
        this.settings = !this.settings;
    }
    handleFileSelect(ev) {
        this.selectedFile = ev.target.files[0];
        ev.target.value = '';
    }
    handleUrlChange(ev) {
        this.recordingURL = ev.target.value;
        this.selectedFile = undefined;
        this.urlIsValid = undefined;
        this.fetching = false;
    }
    handleRequestRecording() {
        this.finished = false;
        this.paused = false;
        this.playing = false;
        this.currentTS = this.minTS;
        this.channel.emit('recording', this.packets);
    }
    handleShowControls() {
        this.playing = true;
    }
    handleTimeSync(data) {
        const state = data.state;
        const time = data.time;
        if (state === 2 /* Ended */) {
            this.currentTS = this.maxTS;
            this.finished = true;
            return;
        }
        if (this.seeking) {
            return;
        }
        if (state === 5 /* Overtime */) {
            this.currentTS = this.overtimePacket[0] + time;
        }
        else {
            const packet = (state === 3 /* NotStarted */) ? this.firstTimePacket : this.startPacket;
            this.currentTS = packet[0] + (packet[2].time - time);
        }
    }
    handleButton(ev) {
        const target = ev.target;
        switch (target.getAttribute('data-state')) {
            case 'pause':
                this.handlePause();
                break;
            case 'play':
                this.handleUnpause();
                break;
            case 'reload':
                this.handleReload();
                break;
        }
    }
    handleDismissModal() {
        this.modal = Modals.NONE;
    }
    handleStart() {
        this.modal = Modals.NONE;
        if (!this.recording) {
            return;
        }
        this.settings = false;
        let failed = false;
        try {
            this.parseRecording(this.recording);
        }
        catch (_a) {
            failed = true;
        }
        if (!failed) {
            failed || (failed = this.packets[0][1] !== 'recorder-metadata');
            this.packets.forEach(p => {
                failed || (failed = typeof p[0] !== 'number');
                failed || (failed = typeof p[1] !== 'string');
            });
        }
        if (failed) {
            this.modal = Modals.FAILED;
            this.recording = undefined;
            this.recordingName = undefined;
            return;
        }
        this.started = true;
    }
    handleStop() {
        this.started = false;
        this.playing = false;
    }
    handlePause() {
        this.paused = true;
        this.channel.emit('pause');
    }
    handleUnpause() {
        this.paused = false;
        this.channel.emit('unpause');
    }
    handleReload() {
        this.channel.emit('reload');
    }
    handleSlider(pos) {
        this.currentTS = pos;
        this.seeking = true;
    }
    handleSeek(to) {
        if (this.paused) {
            this.handleUnpause();
        }
        if (this.finished) {
            this.currentTS = this.maxTS;
            this.seeking = false;
            return;
        }
        this.channel.emit('seek', to);
        this.seeking = false;
    }
    parseRecording(data) {
        const packets = data
            .split('\n')
            .filter(l => l.trim().length > 0)
            .map(line => JSON.parse(line));
        const endIndex = packets.findIndex(p => p[1] === 'end');
        const endPacket = packets[endIndex] || packets[packets.length - 1];
        const duration = endPacket[0];
        const connect = packets.find(p => p[1] === 'connect');
        if (connect) {
            connect[2] || (connect[2] = {});
            connect[2].duration = duration;
        }
        else {
            packets.splice(1, 0, [0, 'connect', { 'duration': duration }]);
        }
        this.firstTimePacket = packets.find(p => p[1] === 'time');
        this.startPacket = packets.find(p => p[1] === 'time' && p[2].state === 1 /* Active */);
        this.overtimePacket = packets.find(p => p[1] === 'time' && p[2].state === 5 /* Overtime */);
        this.initialState = this.firstTimePacket[2].state;
        this.minTS = this.firstTimePacket[0];
        this.maxTS = endPacket[0];
        this.packets = packets;
    }
}
function localStore(target, key) {
    return function () {
        if (target[key]) {
            // console.log('setting', key);
            localStorage.setItem(key, String(target[key]));
        }
        else {
            // console.log('removing', key);
            localStorage.removeItem(key);
        }
    };
}


/***/ }),

/***/ "./src/utils/EventedChannel.ts":
/*!*************************************!*\
  !*** ./src/utils/EventedChannel.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventedChannel; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);

class EventedChannel extends BroadcastChannel {
    constructor(name) {
        super(name);
        const events = (this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a());
        this.addEventListener('message', ev => {
            const [type, ...args] = ev.data;
            events.emit(type, ...args);
        });
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    emit(type, data) {
        this.postMessage([type, data]);
    }
}


/***/ }),

/***/ "./src/utils/ProfileSettings.tsx":
/*!***************************************!*\
  !*** ./src/utils/ProfileSettings.tsx ***!
  \***************************************/
/*! exports provided: renderProfileCheckbox, renderTileRespawnSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderProfileCheckbox", function() { return renderProfileCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTileRespawnSelect", function() { return renderTileRespawnSelect; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");



const cookieOptions = {
    expires: 36500
};
// Checkboxes:
function handleCheckboxChange(e) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set(e.target.id, String(!e.target.checked), cookieOptions);
}
function renderProfileCheckbox(cookieName, label, defaultValue) {
    const cookie = js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get(cookieName);
    const initial = cookie === 'true' ? true :
        cookie === 'false' ? false :
            defaultValue;
    // NOTE: the booleans are always inverted. For example:
    // Enable Ball Spin, the cookie name is disableBallSpin.
    // When checked, the cookie value is false, and when unchecked it's true.
    // The defaultValue parameter is the default cookie value, NOT checked.
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", { type: "checkbox", id: cookieName, defaultChecked: !initial, onChange: handleCheckboxChange }),
        ' ',
        label));
}
// Select for Tile Respawn Warnings:
const respawns = [
    { label: 'Blink', value: 'blink' },
    { label: 'Transparent', value: 'alpha' },
    { label: 'None', value: 'none' }
];
function tileRespawnChange(selection) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set('tileRespawnWarnings', selection.value, cookieOptions);
}
function renderTileRespawnSelect() {
    var _a;
    const cookie = js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get('tileRespawnWarnings');
    const initial = (_a = respawns.find(r => r.value === cookie)) !== null && _a !== void 0 ? _a : respawns[0];
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], { defaultValue: initial, options: respawns, onChange: tileRespawnChange, menuPosition: "fixed" }));
}


/***/ }),

/***/ "./src/utils/Textures.tsx":
/*!********************************!*\
  !*** ./src/utils/Textures.tsx ***!
  \********************************/
/*! exports provided: renderTextureSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTextureSelect", function() { return renderTextureSelect; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");



const cookieOptions = {
    expires: 36500
};
const textures = {
    "Classic": {
        "author": "LuckySpammer",
        "name": "Classic",
        "popularity": 2921165341,
        "portal": "./vendor/textures/classic/portal.png",
        "speedpad": "./vendor/textures/classic/speedpad.png",
        "speedpadBlue": "./vendor/textures/classic/speedpadblue.png",
        "speedpadRed": "./vendor/textures/classic/speedpadred.png",
        "splats": "./vendor/textures/classic/splats.png",
        "tiles": "./vendor/textures/classic/tiles.png",
        "url": "classic"
    },
    "Sniper Pack": {
        "author": "DOKE",
        "name": "Sniper Pack",
        "popularity": 1126558074,
        "portal": "./vendor/textures/sniperpack/portal.png",
        "speedpad": "./vendor/textures/sniperpack/speedpad.png",
        "speedpadBlue": "./vendor/textures/sniperpack/speedpadblue.png",
        "speedpadRed": "./vendor/textures/sniperpack/speedpadred.png",
        "splats": "./vendor/textures/sniperpack/splats.png",
        "tiles": "./vendor/textures/sniperpack/tiles.png",
        "url": "sniperpack"
    },
    "Coral Light": {
        "author": "MagicPigeon",
        "name": "Coral Light",
        "popularity": 980595502,
        "portal": "./vendor/textures/corallight/portal.png",
        "speedpad": "./vendor/textures/corallight/speedpad.png",
        "speedpadBlue": "./vendor/textures/corallight/speedpadblue.png",
        "speedpadRed": "./vendor/textures/corallight/speedpadred.png",
        "splats": "./vendor/textures/corallight/splats.png",
        "tiles": "./vendor/textures/corallight/tiles.png",
        "url": "corallight"
    },
    "Muscle's Cup Gradients": {
        "author": "MuscleCups",
        "name": "Muscle's Cup Gradients",
        "popularity": 923618899,
        "portal": "./vendor/textures/musclescupgradients/portal.png",
        "speedpad": "./vendor/textures/musclescupgradients/speedpad.png",
        "speedpadBlue": "./vendor/textures/musclescupgradients/speedpadblue.png",
        "speedpadRed": "./vendor/textures/musclescupgradients/speedpadred.png",
        "splats": "./vendor/textures/musclescupgradients/splats.png",
        "tiles": "./vendor/textures/musclescupgradients/tiles.png",
        "url": "musclescupgradients"
    },
    "Muscle's Cup OG": {
        "author": "MuscleCups",
        "name": "Muscle's Cup OG",
        "popularity": 574009262,
        "portal": "./vendor/textures/musclescupog/portal.png",
        "speedpad": "./vendor/textures/musclescupog/speedpad.png",
        "speedpadBlue": "./vendor/textures/musclescupog/speedpadblue.png",
        "speedpadRed": "./vendor/textures/musclescupog/speedpadred.png",
        "splats": "./vendor/textures/musclescupog/splats.png",
        "tiles": "./vendor/textures/musclescupog/tiles.png",
        "url": "musclescupog"
    },
    "Coral": {
        "author": "MagicPigeon",
        "name": "Coral",
        "popularity": 397846887,
        "portal": "./vendor/textures/coral/portal.png",
        "speedpad": "./vendor/textures/coral/speedpad.png",
        "speedpadBlue": "./vendor/textures/coral/speedpadblue.png",
        "speedpadRed": "./vendor/textures/coral/speedpadred.png",
        "splats": "./vendor/textures/coral/splats.png",
        "tiles": "./vendor/textures/coral/tiles.png",
        "url": "coral"
    },
    "MTBad": {
        "author": "mtbkr24",
        "name": "MTBad",
        "popularity": 384471824,
        "portal": "./vendor/textures/mtbad/portal.png",
        "speedpad": "./vendor/textures/mtbad/speedpad.png",
        "speedpadBlue": "./vendor/textures/mtbad/speedpadblue.png",
        "speedpadRed": "./vendor/textures/mtbad/speedpadred.png",
        "splats": "./vendor/textures/mtbad/splats.png",
        "tiles": "./vendor/textures/mtbad/tiles.png",
        "url": "mtbad"
    },
    "Flat": {
        "author": "why",
        "name": "Flat",
        "popularity": 364039388,
        "portal": "./vendor/textures/flat/portal.png",
        "speedpad": "./vendor/textures/flat/speedpad.png",
        "speedpadBlue": "./vendor/textures/flat/speedpadblue.png",
        "speedpadRed": "./vendor/textures/flat/speedpadred.png",
        "splats": "./vendor/textures/flat/splats.png",
        "tiles": "./vendor/textures/flat/tiles.png",
        "url": "flat"
    },
    "MLTP Live": {
        "author": "Ron Spawnson",
        "name": "MLTP Live",
        "popularity": 268288375,
        "portal": "./vendor/textures/mltplive/portal.png",
        "speedpad": "./vendor/textures/mltplive/speedpad.png",
        "speedpadBlue": "./vendor/textures/mltplive/speedpadblue.png",
        "speedpadRed": "./vendor/textures/mltplive/speedpadred.png",
        "splats": "./vendor/textures/mltplive/splats.png",
        "tiles": "./vendor/textures/mltplive/tiles.png",
        "url": "mltplive"
    },
    "Plumb": {
        "author": "SuperTed",
        "name": "Plumb",
        "popularity": 195240879,
        "portal": "./vendor/textures/plumb/portal.png",
        "speedpad": "./vendor/textures/plumb/speedpad.png",
        "speedpadBlue": "./vendor/textures/plumb/speedpadblue.png",
        "speedpadRed": "./vendor/textures/plumb/speedpadred.png",
        "splats": "./vendor/textures/plumb/splats.png",
        "tiles": "./vendor/textures/plumb/tiles.png",
        "url": "plumb"
    },
    "Isometric": {
        "author": "mtbkr24",
        "name": "Isometric",
        "popularity": 183844878,
        "portal": "./vendor/textures/isometric/portal.png",
        "speedpad": "./vendor/textures/isometric/speedpad.png",
        "speedpadBlue": "./vendor/textures/isometric/speedpadblue.png",
        "speedpadRed": "./vendor/textures/isometric/speedpadred.png",
        "splats": "./vendor/textures/isometric/splats.png",
        "tiles": "./vendor/textures/isometric/tiles.png",
        "url": "isometric"
    },
    "Plique": {
        "author": "Despair",
        "name": "Plique",
        "popularity": 167979698,
        "portal": "./vendor/textures/plique/portal.png",
        "speedpad": "./vendor/textures/plique/speedpad.png",
        "speedpadBlue": "./vendor/textures/plique/speedpadblue.png",
        "speedpadRed": "./vendor/textures/plique/speedpadred.png",
        "splats": "./vendor/textures/plique/splats.png",
        "tiles": "./vendor/textures/plique/tiles.png",
        "url": "plique"
    },
    "CamsPP Light": {
        "author": "Cam",
        "name": "CamsPP Light",
        "popularity": 161206545,
        "portal": "./vendor/textures/camspplight/portal.png",
        "speedpad": "./vendor/textures/camspplight/speedpad.png",
        "speedpadBlue": "./vendor/textures/camspplight/speedpadblue.png",
        "speedpadRed": "./vendor/textures/camspplight/speedpadred.png",
        "splats": "./vendor/textures/camspplight/splats.png",
        "tiles": "./vendor/textures/camspplight/tiles.png",
        "url": "camspplight"
    },
    "Sparkle": {
        "author": "MagicPigeon",
        "name": "Sparkle",
        "popularity": 157434127,
        "portal": "./vendor/textures/sparkle/portal.png",
        "speedpad": "./vendor/textures/sparkle/speedpad.png",
        "speedpadBlue": "./vendor/textures/sparkle/speedpadblue.png",
        "speedpadRed": "./vendor/textures/sparkle/speedpadred.png",
        "splats": "./vendor/textures/sparkle/splats.png",
        "tiles": "./vendor/textures/sparkle/tiles.png",
        "url": "sparkle"
    },
    "24K": {
        "author": "MagicPigeon",
        "name": "24K",
        "popularity": 151940555,
        "portal": "./vendor/textures/24k/portal.png",
        "speedpad": "./vendor/textures/24k/speedpad.png",
        "speedpadBlue": "./vendor/textures/24k/speedpadblue.png",
        "speedpadRed": "./vendor/textures/24k/speedpadred.png",
        "splats": "./vendor/textures/24k/splats.png",
        "tiles": "./vendor/textures/24k/tiles.png",
        "url": "24k"
    },
    "CamsPP Old": {
        "author": "Cam",
        "name": "CamsPP Old",
        "popularity": 148573697,
        "portal": "./vendor/textures/camsppold/portal.png",
        "speedpad": "./vendor/textures/camsppold/speedpad.png",
        "speedpadBlue": "./vendor/textures/camsppold/speedpadblue.png",
        "speedpadRed": "./vendor/textures/camsppold/speedpadred.png",
        "splats": "./vendor/textures/camsppold/splats.png",
        "tiles": "./vendor/textures/camsppold/tiles.png",
        "url": "camsppold"
    },
    "CMYK": {
        "author": "MagicPigeon",
        "name": "CMYK",
        "popularity": 126742621,
        "portal": "./vendor/textures/cmyk/portal.png",
        "speedpad": "./vendor/textures/cmyk/speedpad.png",
        "speedpadBlue": "./vendor/textures/cmyk/speedpadblue.png",
        "speedpadRed": "./vendor/textures/cmyk/speedpadred.png",
        "splats": "./vendor/textures/cmyk/splats.png",
        "tiles": "./vendor/textures/cmyk/tiles.png",
        "url": "cmyk"
    },
    "CamsPP Dark": {
        "author": "Cam",
        "name": "CamsPP Dark",
        "popularity": 120137217,
        "portal": "./vendor/textures/camsppdark/portal.png",
        "speedpad": "./vendor/textures/camsppdark/speedpad.png",
        "speedpadBlue": "./vendor/textures/camsppdark/speedpadblue.png",
        "speedpadRed": "./vendor/textures/camsppdark/speedpadred.png",
        "splats": "./vendor/textures/camsppdark/splats.png",
        "tiles": "./vendor/textures/camsppdark/tiles.png",
        "url": "camsppdark"
    },
    "Precision Dark": {
        "author": "Peach Fuzz",
        "name": "Precision Dark",
        "popularity": 116594193,
        "portal": "./vendor/textures/precisiondark/portal.png",
        "speedpad": "./vendor/textures/precisiondark/speedpad.png",
        "speedpadBlue": "./vendor/textures/precisiondark/speedpadblue.png",
        "speedpadRed": "./vendor/textures/precisiondark/speedpadred.png",
        "splats": "./vendor/textures/precisiondark/splats.png",
        "tiles": "./vendor/textures/precisiondark/tiles.png",
        "url": "precisiondark"
    },
    "PastelPro": {
        "author": "SuperTed",
        "name": "PastelPro",
        "popularity": 115963179,
        "portal": "./vendor/textures/pastelpro/portal.png",
        "speedpad": "./vendor/textures/pastelpro/speedpad.png",
        "speedpadBlue": "./vendor/textures/pastelpro/speedpadblue.png",
        "speedpadRed": "./vendor/textures/pastelpro/speedpadred.png",
        "splats": "./vendor/textures/pastelpro/splats.png",
        "tiles": "./vendor/textures/pastelpro/tiles.png",
        "url": "pastelpro"
    },
    "Element+": {
        "author": "MagicPigeon",
        "name": "Element+",
        "popularity": 113423416,
        "portal": "./vendor/textures/element/portal.png",
        "speedpad": "./vendor/textures/element/speedpad.png",
        "speedpadBlue": "./vendor/textures/element/speedpadblue.png",
        "speedpadRed": "./vendor/textures/element/speedpadred.png",
        "splats": "./vendor/textures/element/splats.png",
        "tiles": "./vendor/textures/element/tiles.png",
        "url": "element"
    },
    "Sketch+": {
        "author": "MagicPigeon",
        "name": "Sketch+",
        "popularity": 94563964,
        "portal": "./vendor/textures/sketch/portal.png",
        "speedpad": "./vendor/textures/sketch/speedpad.png",
        "speedpadBlue": "./vendor/textures/sketch/speedpadblue.png",
        "speedpadRed": "./vendor/textures/sketch/speedpadred.png",
        "splats": "./vendor/textures/sketch/splats.png",
        "tiles": "./vendor/textures/sketch/tiles.png",
        "url": "sketch"
    },
    "Electric": {
        "author": "Bug",
        "name": "Electric",
        "popularity": 90140000,
        "portal": "./vendor/textures/electric/portal.png",
        "speedpad": "./vendor/textures/electric/speedpad.png",
        "speedpadBlue": "./vendor/textures/electric/speedpadblue.png",
        "speedpadRed": "./vendor/textures/electric/speedpadred.png",
        "splats": "./vendor/textures/electric/splats.png",
        "tiles": "./vendor/textures/electric/tiles.png",
        "url": "electric"
    },
    "Sharp": {
        "author": "MagicPigeon",
        "name": "Sharp",
        "popularity": 84223773,
        "portal": "./vendor/textures/sharp/portal.png",
        "speedpad": "./vendor/textures/sharp/speedpad.png",
        "speedpadBlue": "./vendor/textures/sharp/speedpadblue.png",
        "speedpadRed": "./vendor/textures/sharp/speedpadred.png",
        "splats": "./vendor/textures/sharp/splats.png",
        "tiles": "./vendor/textures/sharp/tiles.png",
        "url": "sharp"
    },
    "Mural": {
        "author": "DaEvil1",
        "name": "Mural",
        "popularity": 58661716,
        "portal": "./vendor/textures/mural/portal.png",
        "speedpad": "./vendor/textures/mural/speedpad.png",
        "speedpadBlue": "./vendor/textures/mural/speedpadblue.png",
        "speedpadRed": "./vendor/textures/mural/speedpadred.png",
        "splats": "./vendor/textures/mural/splats.png",
        "tiles": "./vendor/textures/mural/tiles.png",
        "url": "mural"
    },
    "TerminalPX": {
        "author": "pooppants",
        "name": "TerminalPX",
        "popularity": 58605743,
        "portal": "./vendor/textures/terminalpx/portal.png",
        "speedpad": "./vendor/textures/terminalpx/speedpad.png",
        "speedpadBlue": "./vendor/textures/terminalpx/speedpadblue.png",
        "speedpadRed": "./vendor/textures/terminalpx/speedpadred.png",
        "splats": "./vendor/textures/terminalpx/splats.png",
        "tiles": "./vendor/textures/terminalpx/tiles.png",
        "url": "terminalpx"
    },
    "Supreme": {
        "author": "bicycle",
        "name": "Supreme",
        "popularity": 56012886,
        "portal": "./vendor/textures/supreme/portal.png",
        "speedpad": "./vendor/textures/supreme/speedpad.png",
        "speedpadBlue": "./vendor/textures/supreme/speedpadblue.png",
        "speedpadRed": "./vendor/textures/supreme/speedpadred.png",
        "splats": "./vendor/textures/supreme/splats.png",
        "tiles": "./vendor/textures/supreme/tiles.png",
        "url": "supreme"
    },
    "Circlejerk": {
        "author": "Bizkut and Ion",
        "name": "Circlejerk",
        "popularity": 54315659,
        "portal": "./vendor/textures/circlejerk/portal.png",
        "speedpad": "./vendor/textures/circlejerk/speedpad.png",
        "speedpadBlue": "./vendor/textures/circlejerk/speedpadblue.png",
        "speedpadRed": "./vendor/textures/circlejerk/speedpadred.png",
        "splats": "./vendor/textures/circlejerk/splats.png",
        "tiles": "./vendor/textures/circlejerk/tiles.png",
        "url": "circlejerk"
    },
    "Crystal": {
        "author": "MagicPigeon",
        "name": "Crystal",
        "popularity": 50792579,
        "portal": "./vendor/textures/crystal/portal.png",
        "speedpad": "./vendor/textures/crystal/speedpad.png",
        "speedpadBlue": "./vendor/textures/crystal/speedpadblue.png",
        "speedpadRed": "./vendor/textures/crystal/speedpadred.png",
        "splats": "./vendor/textures/crystal/splats.png",
        "tiles": "./vendor/textures/crystal/tiles.png",
        "url": "crystal"
    },
    "Turbo": {
        "author": "Ooops",
        "name": "Turbo",
        "popularity": 38707709,
        "portal": "./vendor/textures/turbo/portal.png",
        "speedpad": "./vendor/textures/turbo/speedpad.png",
        "speedpadBlue": "./vendor/textures/turbo/speedpadblue.png",
        "speedpadRed": "./vendor/textures/turbo/speedpadred.png",
        "splats": "./vendor/textures/turbo/splats.png",
        "tiles": "./vendor/textures/turbo/tiles.png",
        "url": "turbo"
    },
    "Celeste": {
        "author": "MagicPigeon",
        "name": "Celeste",
        "popularity": 37567955,
        "portal": "./vendor/textures/celeste/portal.png",
        "speedpad": "./vendor/textures/celeste/speedpad.png",
        "speedpadBlue": "./vendor/textures/celeste/speedpadblue.png",
        "speedpadRed": "./vendor/textures/celeste/speedpadred.png",
        "splats": "./vendor/textures/celeste/splats.png",
        "tiles": "./vendor/textures/celeste/tiles.png",
        "url": "celeste"
    },
    "Flat (Bug)": {
        "author": "Bug",
        "name": "Flat (Bug)",
        "popularity": 36605283,
        "portal": "./vendor/textures/flatbug/portal.png",
        "speedpad": "./vendor/textures/flatbug/speedpad.png",
        "speedpadBlue": "./vendor/textures/flatbug/speedpadblue.png",
        "speedpadRed": "./vendor/textures/flatbug/speedpadred.png",
        "splats": "./vendor/textures/flatbug/splats.png",
        "tiles": "./vendor/textures/flatbug/tiles.png",
        "url": "flatbug"
    },
    "Starlight": {
        "author": "MagicPigeon",
        "name": "Starlight",
        "popularity": 34834874,
        "portal": "./vendor/textures/starlight/portal.png",
        "speedpad": "./vendor/textures/starlight/speedpad.png",
        "speedpadBlue": "./vendor/textures/starlight/speedpadblue.png",
        "speedpadRed": "./vendor/textures/starlight/speedpadred.png",
        "splats": "./vendor/textures/starlight/splats.png",
        "tiles": "./vendor/textures/starlight/tiles.png",
        "url": "starlight"
    },
    "Bold": {
        "author": "MagicPigeon",
        "name": "Bold",
        "popularity": 30256001,
        "portal": "./vendor/textures/bold/portal.png",
        "speedpad": "./vendor/textures/bold/speedpad.png",
        "speedpadBlue": "./vendor/textures/bold/speedpadblue.png",
        "speedpadRed": "./vendor/textures/bold/speedpadred.png",
        "splats": "./vendor/textures/bold/splats.png",
        "tiles": "./vendor/textures/bold/tiles.png",
        "url": "bold"
    },
    "Mumbo": {
        "author": "MagicPigeon",
        "name": "Mumbo",
        "popularity": 26355501,
        "portal": "./vendor/textures/mumbo/portal.png",
        "speedpad": "./vendor/textures/mumbo/speedpad.png",
        "speedpadBlue": "./vendor/textures/mumbo/speedpadblue.png",
        "speedpadRed": "./vendor/textures/mumbo/speedpadred.png",
        "splats": "./vendor/textures/mumbo/splats.png",
        "tiles": "./vendor/textures/mumbo/tiles.png",
        "url": "mumbo"
    },
    "Maxima": {
        "author": "MagicPigeon",
        "name": "Maxima",
        "popularity": 24527963,
        "portal": "./vendor/textures/maxima/portal.png",
        "speedpad": "./vendor/textures/maxima/speedpad.png",
        "speedpadBlue": "./vendor/textures/maxima/speedpadblue.png",
        "speedpadRed": "./vendor/textures/maxima/speedpadred.png",
        "splats": "./vendor/textures/maxima/splats.png",
        "tiles": "./vendor/textures/maxima/tiles.png",
        "url": "maxima"
    },
    "Chip": {
        "author": "nom",
        "name": "Chip",
        "popularity": 17276938,
        "portal": "./vendor/textures/chip/portal.png",
        "speedpad": "./vendor/textures/chip/speedpad.png",
        "speedpadBlue": "./vendor/textures/chip/speedpadblue.png",
        "speedpadRed": "./vendor/textures/chip/speedpadred.png",
        "splats": "./vendor/textures/chip/splats.png",
        "tiles": "./vendor/textures/chip/tiles.png",
        "url": "chip"
    },
    "nom": {
        "author": "nom",
        "name": "nom",
        "popularity": 6966621,
        "portal": "./vendor/textures/nom/portal.png",
        "speedpad": "./vendor/textures/nom/speedpad.png",
        "speedpadBlue": "./vendor/textures/nom/speedpadblue.png",
        "speedpadRed": "./vendor/textures/nom/speedpadred.png",
        "splats": "./vendor/textures/nom/splats.png",
        "tiles": "./vendor/textures/nom/tiles.png",
        "url": "nom"
    }
};
function getTexture(name) {
    return textures[name];
}
function getTextureList() {
    const list = [];
    Object.entries(textures).forEach(([name, texture]) => {
        list.push({ label: name, value: JSON.stringify(texture) });
    });
    return list;
}
function handleTextureChange(selection) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set('textures', selection.value, cookieOptions);
}
function renderTextureSelect() {
    const initial = { label: "Muscle's Cup Gradients" };
    const cookie = js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get('textures');
    if (cookie) {
        const texture = JSON.parse(cookie);
        const name = texture.name;
        if (getTexture(name)) {
            initial.label = name;
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], { defaultValue: initial, options: getTextureList(), onChange: handleTextureChange, menuPosition: "fixed" }));
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map