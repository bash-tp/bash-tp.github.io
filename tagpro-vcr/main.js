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

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".game-frame {\\n\\twidth: 100%;\\n\\tmin-width: 1280px;\\n\\tmin-height: 800px;\\n}\\n\\nhtml,\\nbody,\\n#root,\\n#container {\\n\\theight: 100%;\\n}\\n\\n#container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n}\\n\\n#file {\\n\\tdisplay: none;\\n}\\n\\n#header {\\n\\tpadding: 0.4rem;\\n\\twhite-space: nowrap;\\n}\\n\\n#game-container {\\n\\tmargin-top: 0.4rem;\\n\\tflex: 10;\\n\\toverflow: hidden;\\n}\\n\\n#game-frame {\\n\\twidth: 100%;\\n\\theight: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/App.css?./node_modules/css-loader");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ \"./src/components/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\nlet App = class App extends react__WEBPACK_IMPORTED_MODULE_2__[\"Component\"] {\n    renderGame() {\n        const { appState } = this.props;\n        var eggBall = appState.isEggBall();\n        var gameSrc = eggBall ? \"game-egg.html\" : \"game.html\";\n        return react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"iframe\", { id: \"game-frame\", src: gameSrc, frameBorder: \"0\" });\n    }\n    renderInfo() {\n        const { appState } = this.props;\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"container grid-sm panel\" },\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-header\" },\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-title h5\" }, \"TagPro VCR\")),\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"panel-body\" },\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"h6\", null, \"Usage\"),\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"ol\", null,\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\n                        \"Install the userscript:\",\n                        ' ',\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.user.js\" }, \"tagpro-vcr.user.js\"),\n                        \".\"),\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\n                        \"Play a game of \",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"http://tagpro.gg\" }, \"TagPro\"),\n                        \".\"),\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\n                        \"Upload the recorded game here (\",\n                        this.renderUploadLabel(),\n                        \") and click\",\n                        ' ',\n                        this.renderStartButton(),\n                        \".\")),\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"h6\", null, \"Notes\"),\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"ul\", null,\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\n                        \"To test your TagPro userscripts here, add this @include:\",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"br\", null),\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"// @include https://bash-tp.github.io/tagpro-vcr/game*.html\")),\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"li\", null,\n                        \"The game is running in \\\"spectator\\\"-mode, so you can press \",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"C\"),\n                        \" to center the view,\",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"+\"),\n                        \"/\",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"code\", null, \"-\"),\n                        \" to zoom in/out etc. (see \",\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://www.reddit.com/r/TagPro/wiki/gameplay#wiki_spectator\" }, \"wiki\"),\n                        \").\")))));\n    }\n    renderUploadLabel(label) {\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"label\", { htmlFor: \"file\", className: \"btn btn-link\" },\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"i\", { className: \"icon icon-upload\" }),\n            \" \",\n            label || 'Upload recording'));\n    }\n    renderStartButton() {\n        const { appState } = this.props;\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"button\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-success', {\n                disabled: appState.started || !appState.recording\n            }), onClick: appState.handleStart }, \"Start\"));\n    }\n    renderStopButton() {\n        const { appState } = this.props;\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"button\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('btn btn-error', { disabled: !appState.started }), onClick: appState.handleStop }, \"Stop\"));\n    }\n    render() {\n        const { appState } = this.props;\n        const fetchClasses = classnames__WEBPACK_IMPORTED_MODULE_0___default()('form-icon', 'icon', {\n            'loading': appState.fetching,\n            'icon-check': appState.recordingURL && !appState.fetching && appState.urlIsValid === true,\n            'icon-stop': appState.recordingURL && appState.urlIsValid === false\n        });\n        return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { id: \"container\" },\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"header\", { id: \"header\", className: \"navbar\" },\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-section\" },\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"span\", null, \"TagPro VCR\")),\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-center\" },\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: \"form-horizontal\" },\n                        this.renderUploadLabel(appState.recordingName),\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"span\", null, \" or \"),\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('input-group input-inline', { 'has-icon-right': !!appState.recordingURL }) },\n                            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"input\", { className: \"form-input\", type: \"text\", value: appState.recordingURL, onChange: appState.handleUrlChange, placeholder: \"Fetch from URL (http://...)\" }),\n                            appState.recordingURL && react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"i\", { className: fetchClasses })),\n                        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"input\", { id: \"file\", type: \"file\", accept: \".ndjson,.jsonl\", onChange: appState.handleFileSelect }),\n                        ' ',\n                        this.renderStartButton(),\n                        ' ',\n                        this.renderStopButton())),\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"section\", { className: \"navbar-section\" },\n                    react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"a\", { href: \"https://github.com/bash-tp/tagpro-vcr\", className: \"btn\" }, \"GitHub\"))),\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", { id: \"game-container\" }, appState.started ? this.renderGame() : this.renderInfo())));\n    }\n};\nApp = __decorate([\n    mobx_react__WEBPACK_IMPORTED_MODULE_1__[\"observer\"]\n], App);\n\n\n\n//# sourceURL=webpack:///./src/components/App.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.tsx\");\n/* harmony import */ var _stores_AppState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/AppState */ \"./src/stores/AppState.ts\");\n\n\n\n\nconst appState = new _stores_AppState__WEBPACK_IMPORTED_MODULE_3__[\"AppState\"]();\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_components_App__WEBPACK_IMPORTED_MODULE_2__[\"App\"], { appState: appState }), document.getElementById('root'));\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/stores/AppState.ts":
/*!********************************!*\
  !*** ./src/stores/AppState.ts ***!
  \********************************/
/*! exports provided: AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AppState\", function() { return AppState; });\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventedChannel */ \"./src/utils/EventedChannel.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\nclass AppState {\n    constructor() {\n        this.recording = localStorage.getItem('recording');\n        this.recordingName = localStorage.getItem('recordingName');\n        this.recordingURL = '';\n        this.selectedFile = undefined;\n        this.started = false;\n        this.fetching = false;\n        this.urlIsValid = undefined;\n        const channel = (this.channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('vcr'));\n        channel.on('request-recording', () => {\n            channel.emit('recording', parseRecording(this.recording));\n        });\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.selectedFile, file => {\n            if (!file) {\n                this.recordingName = undefined;\n                this.recording = undefined;\n                return;\n            }\n            const reader = new FileReader();\n            reader.addEventListener('load', () => {\n                this.recordingName = file.name;\n                this.recording = reader.result;\n            });\n            reader.readAsText(file);\n        });\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recordingURL, url => {\n            if (!this.recordingURL) {\n                return;\n            }\n            this.fetching = true;\n            fetch(url)\n                .then(r => {\n                if (!r.ok) {\n                    throw r;\n                }\n                else {\n                    return r.text();\n                }\n            })\n                .then(text => {\n                this.recording = text;\n                this.fetching = false;\n                this.urlIsValid = true;\n            })\n                .catch(err => {\n                this.recording = undefined;\n                this.fetching = false;\n                this.urlIsValid = false;\n            });\n        }, {\n            delay: 1000\n        });\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recording, localStore(this, 'recording'));\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"reaction\"])(() => this.recordingName, localStore(this, 'recordingName'));\n    }\n    isEggBall() {\n        return this.recording\n            .split('\\n')\n            .filter(l => l.match(/^\\[\\d+,\"eggBall\",/))\n            .length > 0;\n    }\n    handleFileSelect(ev) {\n        this.recordingURL = '';\n        this.selectedFile = ev.target.files[0];\n    }\n    handleUrlChange(ev) {\n        this.recordingURL = ev.target.value;\n        this.selectedFile = undefined;\n        this.urlIsValid = undefined;\n        this.fetching = false;\n    }\n    handleStart() {\n        if (!this.recording) {\n            return;\n        }\n        this.started = true;\n    }\n    handleStop() {\n        this.started = false;\n    }\n}\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"recording\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"recordingName\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"recordingURL\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"selectedFile\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"started\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"fetching\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\n], AppState.prototype, \"urlIsValid\", void 0);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\n], AppState.prototype, \"handleFileSelect\", null);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\n], AppState.prototype, \"handleUrlChange\", null);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\n], AppState.prototype, \"handleStart\", null);\n__decorate([\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\n], AppState.prototype, \"handleStop\", null);\nfunction parseRecording(data) {\n    return data\n        .split('\\n')\n        .filter(l => l.trim().length > 0)\n        .map(line => JSON.parse(line));\n}\nfunction localStore(target, key) {\n    return function () {\n        if (target[key]) {\n            // console.log('setting', key);\n            localStorage.setItem(key, String(target[key]));\n        }\n        else {\n            // console.log('removing', key);\n            localStorage.removeItem(key);\n        }\n    };\n}\n\n\n//# sourceURL=webpack:///./src/stores/AppState.ts?");

/***/ }),

/***/ "./src/utils/EventedChannel.ts":
/*!*************************************!*\
  !*** ./src/utils/EventedChannel.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventedChannel; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n\nclass EventedChannel extends BroadcastChannel {\n    constructor(name) {\n        super(name);\n        const events = (this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a());\n        this.addEventListener('message', ev => {\n            const [type, ...args] = ev.data;\n            events.emit(type, ...args);\n        });\n    }\n    on(event, listener) {\n        this.events.on(event, listener);\n    }\n    emit(type, data) {\n        this.postMessage([type, data]);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/EventedChannel.ts?");

/***/ })

/******/ });