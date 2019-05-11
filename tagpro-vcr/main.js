/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

/***/ "./node_modules/css-loader/index.js!./src/components/App.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader!./src/components/App.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".game-frame {\\r\\n\\twidth: 100%;\\r\\n\\tmin-width: 1280px;\\r\\n\\tmin-height: 800px;\\r\\n}\\r\\n\\r\\nhtml,\\r\\nbody,\\r\\n#root,\\r\\n#container {\\r\\n\\theight: 100%;\\r\\n}\\r\\n\\r\\n#container {\\r\\n\\tdisplay: flex;\\r\\n\\tflex-direction: column;\\r\\n}\\r\\n\\r\\n#file {\\r\\n\\tdisplay: none;\\r\\n}\\r\\n\\r\\n#header {\\r\\n\\tpadding: 0.4rem;\\r\\n\\twhite-space: nowrap;\\r\\n}\\r\\n\\r\\n#game-container {\\r\\n\\tmargin-top: 0.4rem;\\r\\n\\tflex: 10;\\r\\n\\toverflow: hidden;\\r\\n}\\r\\n\\r\\n#game-frame {\\r\\n\\twidth: 100%;\\r\\n\\theight: 100%;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/App.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/components/App.css":
/*!********************************!*\
  !*** ./src/components/App.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./App.css */ \"./node_modules/css-loader/index.js!./src/components/App.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/App.css?");

/***/ }),

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ \"./src/components/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\n\r\n\r\nlet App = class App extends react__WEBPACK_IMPORTED_MODULE_2__[\"Component\"] {\r\n    renderGame() {\r\n        return react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"iframe\", { id: \"game-frame\", src: \"game.html\", frameBorder: \"0\" });\r\n    }\r\n    renderInfo() {\r\n        const { appState } = this.props;\r\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"container grid-sm panel\" },\r\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-header\" },\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-title h5\" }, \"TagPro VCR\")),\r\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-body\" },\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"h6\", null, \"Usage\"),\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"ol\", null,\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\r\n                        \"Install the userscript:\",\r\n                        ' ',\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://keratagpro.github.io/tagpro-vcr/tagpro-vcr.user.js\" }, \"tagpro-vcr.user.js\"),\r\n                        \".\"),\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\r\n                        \"Play a game of \",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"http://tagpro.gg\" }, \"TagPro\"),\r\n                        \".\"),\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\r\n                        \"Upload the recorded game here (\",\r\n                        this.renderUploadLabel(),\r\n                        \") and click\",\r\n                        ' ',\r\n                        this.renderStartButton(),\r\n                        \".\")),\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"h6\", null, \"Notes\"),\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"ul\", null,\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\r\n                        \"To test your TagPro userscripts here, add this @include:\",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"br\", null),\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"// @include https://bash-tp.github.io/tagpro-vcr/game.html\")),\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\r\n                        \"The game is running in \\\"spectator\\\"-mode, so you can press \",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"C\"),\r\n                        \" to center the view,\",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"+\"),\r\n                        \"/\",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"-\"),\r\n                        \" to zoom in/out etc. (see \",\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://www.reddit.com/r/TagPro/wiki/gameplay#wiki_spectator\" }, \"wiki\"),\r\n                        \").\")))));\r\n    }\r\n    renderUploadLabel(label) {\r\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"label\", { htmlFor: \"file\", className: \"btn btn-link\" },\r\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"i\", { className: \"icon icon-upload\" }),\r\n            \" \",\r\n            label || 'Upload recording'));\r\n    }\r\n    renderStartButton() {\r\n        const { appState } = this.props;\r\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"button\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-success', {\r\n                disabled: appState.started || !appState.recording\r\n            }), onClick: appState.handleStart }, \"Start\"));\r\n    }\r\n    renderStopButton() {\r\n        const { appState } = this.props;\r\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"button\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-error', { disabled: !appState.started }), onClick: appState.handleStop }, \"Stop\"));\r\n    }\r\n    render() {\r\n        const { appState } = this.props;\r\n        const fetchClasses = classnames__WEBPACK_IMPORTED_MODULE_0___default()('form-icon', 'icon', {\r\n            'loading': appState.fetching,\r\n            'icon-check': appState.recordingURL && !appState.fetching && appState.urlIsValid === true,\r\n            'icon-stop': appState.recordingURL && appState.urlIsValid === false\r\n        });\r\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { id: \"container\" },\r\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"header\", { id: \"header\", className: \"navbar\" },\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-section\" },\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"span\", null, \"TagPro VCR\")),\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-center\" },\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"form-horizontal\" },\r\n                        this.renderUploadLabel(appState.recordingName),\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"span\", null, \" or \"),\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('input-group input-inline', { 'has-icon-right': !!appState.recordingURL }) },\r\n                            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"input\", { className: \"form-input\", type: \"text\", value: appState.recordingURL, onChange: appState.handleUrlChange, placeholder: \"Fetch from URL (http://...)\" }),\r\n                            appState.recordingURL && react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"i\", { className: fetchClasses })),\r\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"input\", { id: \"file\", type: \"file\", accept: \".ndjson,.jsonl\", onChange: appState.handleFileSelect }),\r\n                        ' ',\r\n                        this.renderStartButton(),\r\n                        ' ',\r\n                        this.renderStopButton())),\r\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-section\" },\r\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://github.com/keratagpro/tagpro-vcr\", className: \"btn\" }, \"GitHub\"))),\r\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { id: \"game-container\" }, appState.started ? this.renderGame() : this.renderInfo())));\r\n    }\r\n};\r\nApp = __decorate([\r\n    mobx_react__WEBPACK_IMPORTED_MODULE_1__[\"observer\"]\r\n], App);\r\n\r\n\n\n//# sourceURL=webpack:///./src/components/App.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.tsx\");\n/* harmony import */ var _stores_AppState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/AppState */ \"./src/stores/AppState.ts\");\n\r\n\r\n\r\n\r\nconst appState = new _stores_AppState__WEBPACK_IMPORTED_MODULE_3__[\"AppState\"]();\r\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_components_App__WEBPACK_IMPORTED_MODULE_2__[\"App\"], { appState: appState }), document.getElementById('root'));\r\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/stores/AppState.ts":
/*!********************************!*\
  !*** ./src/stores/AppState.ts ***!
  \********************************/
/*! exports provided: AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AppState\", function() { return AppState; });\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventedChannel */ \"./src/utils/EventedChannel.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\nclass AppState {\r\n    constructor() {\r\n        this.recording = localStorage.getItem('recording');\r\n        this.recordingName = localStorage.getItem('recordingName');\r\n        this.recordingURL = '';\r\n        this.selectedFile = undefined;\r\n        this.started = false;\r\n        this.fetching = false;\r\n        this.urlIsValid = undefined;\r\n        const channel = (this.channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('vcr'));\r\n        channel.on('request-recording', () => {\r\n            channel.emit('recording', parseRecording(this.recording));\r\n        });\r\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.selectedFile, file => {\r\n            if (!file) {\r\n                this.recordingName = undefined;\r\n                this.recording = undefined;\r\n                return;\r\n            }\r\n            const reader = new FileReader();\r\n            reader.addEventListener('load', () => {\r\n                this.recordingName = file.name;\r\n                this.recording = reader.result;\r\n            });\r\n            reader.readAsText(file);\r\n        });\r\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recordingURL, url => {\r\n            if (!this.recordingURL) {\r\n                return;\r\n            }\r\n            this.fetching = true;\r\n            fetch(url)\r\n                .then(r => {\r\n                if (!r.ok) {\r\n                    throw r;\r\n                }\r\n                else {\r\n                    return r.text();\r\n                }\r\n            })\r\n                .then(text => {\r\n                this.recording = text;\r\n                this.fetching = false;\r\n                this.urlIsValid = true;\r\n            })\r\n                .catch(err => {\r\n                this.recording = undefined;\r\n                this.fetching = false;\r\n                this.urlIsValid = false;\r\n            });\r\n        }, {\r\n            delay: 1000\r\n        });\r\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recording, localStore(this, 'recording'));\r\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recordingName, localStore(this, 'recordingName'));\r\n    }\r\n    handleFileSelect(ev) {\r\n        this.recordingURL = '';\r\n        this.selectedFile = ev.target.files[0];\r\n    }\r\n    handleUrlChange(ev) {\r\n        this.recordingURL = ev.target.value;\r\n        this.selectedFile = undefined;\r\n        this.urlIsValid = undefined;\r\n        this.fetching = false;\r\n    }\r\n    handleStart() {\r\n        if (!this.recording) {\r\n            return;\r\n        }\r\n        this.started = true;\r\n    }\r\n    handleStop() {\r\n        this.started = false;\r\n    }\r\n}\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"recording\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"recordingName\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"recordingURL\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"selectedFile\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"started\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"fetching\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppState.prototype, \"urlIsValid\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppState.prototype, \"handleFileSelect\", null);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppState.prototype, \"handleUrlChange\", null);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppState.prototype, \"handleStart\", null);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppState.prototype, \"handleStop\", null);\r\nfunction parseRecording(data) {\r\n    return data\r\n        .split('\\n')\r\n        .filter(l => l.trim().length > 0)\r\n        .map(line => JSON.parse(line));\r\n}\r\nfunction localStore(target, key) {\r\n    return function () {\r\n        if (target[key]) {\r\n            // console.log('setting', key);\r\n            localStorage.setItem(key, String(target[key]));\r\n        }\r\n        else {\r\n            // console.log('removing', key);\r\n            localStorage.removeItem(key);\r\n        }\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/stores/AppState.ts?");

/***/ }),

/***/ "./src/utils/EventedChannel.ts":
/*!*************************************!*\
  !*** ./src/utils/EventedChannel.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventedChannel; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass EventedChannel extends BroadcastChannel {\r\n    constructor(name) {\r\n        super(name);\r\n        const events = (this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a());\r\n        this.addEventListener('message', ev => {\r\n            const [type, ...args] = ev.data;\r\n            events.emit(type, ...args);\r\n        });\r\n    }\r\n    on(event, listener) {\r\n        this.events.on(event, listener);\r\n    }\r\n    emit(type, data) {\r\n        this.postMessage([type, data]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/EventedChannel.ts?");

/***/ })

/******/ });
