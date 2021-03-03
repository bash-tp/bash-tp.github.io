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
___CSS_LOADER_EXPORT___.push([module.i, ".game-frame {\n\twidth: 100%;\n\tmin-width: 1280px;\n\tmin-height: 800px;\n}\n\nhtml,\nbody,\n#root,\n#container {\n\theight: 100%;\n}\n\n#container {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.panel {\n\theight: 98%;\n\tpadding-bottom: 0.4rem;\n}\n\n#file {\n\tdisplay: none;\n}\n\n#header {\n\tpadding: 0.4rem;\n\twhite-space: nowrap;\n}\n\n#game-container {\n\tmargin-top: 0.4rem;\n\tflex: 10;\n\toverflow: hidden;\n}\n\n#game-frame {\n\twidth: 100%;\n\theight: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/components/App.css"],"names":[],"mappings":"AAAA;CACC,WAAW;CACX,iBAAiB;CACjB,iBAAiB;AAClB;;AAEA;;;;CAIC,YAAY;AACb;;AAEA;CACC,aAAa;CACb,sBAAsB;AACvB;;AAEA;CACC,WAAW;CACX,sBAAsB;AACvB;;AAEA;CACC,aAAa;AACd;;AAEA;CACC,eAAe;CACf,mBAAmB;AACpB;;AAEA;CACC,kBAAkB;CAClB,QAAQ;CACR,gBAAgB;AACjB;;AAEA;CACC,WAAW;CACX,YAAY;AACb","sourcesContent":[".game-frame {\n\twidth: 100%;\n\tmin-width: 1280px;\n\tmin-height: 800px;\n}\n\nhtml,\nbody,\n#root,\n#container {\n\theight: 100%;\n}\n\n#container {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.panel {\n\theight: 98%;\n\tpadding-bottom: 0.4rem;\n}\n\n#file {\n\tdisplay: none;\n}\n\n#header {\n\tpadding: 0.4rem;\n\twhite-space: nowrap;\n}\n\n#game-container {\n\tmargin-top: 0.4rem;\n\tflex: 10;\n\toverflow: hidden;\n}\n\n#game-frame {\n\twidth: 100%;\n\theight: 100%;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ProfileSettings */ "./src/utils/ProfileSettings.tsx");
/* harmony import */ var _utils_Textures__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Textures */ "./src/utils/Textures.tsx");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.css */ "./src/components/App.css");






const App = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(class AppClass extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
    renderGame() {
        const { appState } = this.props;
        const eggBall = appState.isEggBall();
        const gameSrc = eggBall ? "game-egg.html" : "game.html";
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("iframe", { id: "game-frame", src: gameSrc, frameBorder: "0" });
    }
    renderInfo() {
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
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null, _utils_Textures__WEBPACK_IMPORTED_MODULE_4__["renderTextureSelect"]()),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("p", null),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h6", null, "Settings"),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "columns" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "column col-6" },
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__["renderProfileCheckbox"]('disableBallSpin', 'Enable Ball Spin', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__["renderProfileCheckbox"]('disableParticles', 'Enable Particle Effects', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__["renderProfileCheckbox"]('forceCanvasRenderer', 'Enable WebGL Rendering', false),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__["renderProfileCheckbox"]('disableViewportScaling', 'Enable Viewport Scaling', true)),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "column col-6" },
                        "Tile Respawn Warnings:",
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("br", null),
                        _utils_ProfileSettings__WEBPACK_IMPORTED_MODULE_3__["renderTileRespawnSelect"]())))));
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
            }), onClick: appState.handleStart }, "Start"));
    }
    renderStopButton() {
        const { appState } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-error', { disabled: !appState.started }), onClick: appState.handleStop }, "Stop"));
    }
    render() {
        const { appState } = this.props;
        const fetchClasses = classnames__WEBPACK_IMPORTED_MODULE_0___default()('form-icon', 'icon', {
            'loading': appState.fetching,
            'icon-check': appState.recordingURL && !appState.fetching && appState.urlIsValid === true,
            'icon-stop': appState.recordingURL && appState.urlIsValid === false
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { id: "container" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("header", { id: "header", className: "navbar" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-section" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, "TagPro VCR")),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-center" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: "form-horizontal" },
                        this.renderUploadLabel(appState.recordingName),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, " or "),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('input-group input-inline', { 'has-icon-right': !!appState.recordingURL }) },
                            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", { className: "form-input", type: "text", value: appState.recordingURL, onChange: appState.handleUrlChange, placeholder: "Fetch from URL (http://...)" }),
                            appState.recordingURL && react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("i", { className: fetchClasses })),
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", { id: "file", type: "file", accept: ".ndjson,.jsonl", onChange: appState.handleFileSelect }),
                        ' ',
                        this.renderStartButton(),
                        ' ',
                        this.renderStopButton())),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: "navbar-section" },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("a", { href: "https://github.com/bash-tp/tagpro-vcr", className: "btn" }, "GitHub"))),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { id: "game-container" }, appState.started ? this.renderGame() : this.renderInfo())));
    }
});


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
/*! exports provided: AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppState", function() { return AppState; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");
/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventedChannel */ "./src/utils/EventedChannel.ts");


class AppState {
    constructor() {
        this.recording = localStorage.getItem('recording');
        this.recordingName = localStorage.getItem('recordingName');
        this.recordingURL = '';
        this.selectedFile = undefined;
        this.started = false;
        this.fetching = false;
        this.urlIsValid = undefined;
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["makeObservable"])(this, {
            recording: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            recordingName: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            recordingURL: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            selectedFile: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            started: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            fetching: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            urlIsValid: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
            handleFileSelect: mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
            handleUrlChange: mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
            handleStart: mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
            handleStop: mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound
        });
        const channel = (this.channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__["default"]('vcr'));
        channel.on('request-recording', () => {
            channel.emit('recording', parseRecording(this.recording));
        });
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
                this.recording = text;
                this.fetching = false;
                this.urlIsValid = true;
            })
                .catch(err => {
                this.recording = undefined;
                this.fetching = false;
                this.urlIsValid = false;
            });
        }, {
            delay: 1000
        });
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.recording, localStore(this, 'recording'));
        Object(mobx__WEBPACK_IMPORTED_MODULE_0__["reaction"])(() => this.recordingName, localStore(this, 'recordingName'));
    }
    isEggBall() {
        return this.recording
            .split('\n')
            .filter(l => l.match(/^\[\d+,"eggBall",/))
            .length > 0;
    }
    handleFileSelect(ev) {
        this.recordingURL = '';
        this.selectedFile = ev.target.files[0];
    }
    handleUrlChange(ev) {
        this.recordingURL = ev.target.value;
        this.selectedFile = undefined;
        this.urlIsValid = undefined;
        this.fetching = false;
    }
    handleStart() {
        if (!this.recording) {
            return;
        }
        this.started = true;
    }
    handleStop() {
        this.started = false;
    }
}
function parseRecording(data) {
    return data
        .split('\n')
        .filter(l => l.trim().length > 0)
        .map(line => JSON.parse(line));
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



// Checkboxes:
function handleCheckboxChange(e) {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set(e.target.id, String(!e.target.checked));
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
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set('tileRespawnWarnings', selection.value);
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
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set('textures', selection.value);
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