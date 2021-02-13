/******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack:///./node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./src/game.tsx":
/*!**********************!*\
  !*** ./src/game.tsx ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/BackgroundPlayer */ \"./src/utils/BackgroundPlayer.ts\");\n/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventedChannel */ \"./src/utils/EventedChannel.ts\");\n/* harmony import */ var _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/FakeSocket */ \"./src/utils/FakeSocket.ts\");\n\n\n\nconst io = {\n    connect() {\n        const player = new _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        window['player'] = player;\n        // NOTE: For testing\n        // player.worker.on('packet', (ts, type, data) => console.log(ts, type, data));\n        // player.worker.on('end', ev => console.log('End!'));\n        const socket = new _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_2__[\"default\"](player);\n        const channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('vcr');\n        channel.emit('request-recording');\n        channel.on('recording', data => {\n            player.load(data);\n            player.play();\n        });\n        window['seek'] = function (to) {\n            player.pause();\n            window['restore_sound'] = window.tagpro.sound;\n            window.tagpro.sound = false;\n            window.tagpro.gameEndsAt = null;\n            window.tagpro.overtimeStartedAt = null;\n            const players = window.tagpro.players;\n            for (const id in players) {\n                if (players.hasOwnProperty(id)) {\n                    players[id].lastSync = {};\n                    if (Number(id) != window.tagpro.playerId) {\n                        player.emit(\"playerLeft\", id);\n                    }\n                }\n            }\n            for (var i = 0; i < 10; i++) {\n                player.emit(\"chat\", { from: null, to: \"all\", message: \"\\xa0\" });\n            }\n            player.seek(to);\n            player.play();\n        };\n        return socket;\n    }\n};\nwindow['io'] = io;\n// NOTE: Testing.\n// io.connect();\n\n\n//# sourceURL=webpack:///./src/game.tsx?");

/***/ }),

/***/ "./src/utils/BackgroundPlayer.ts":
/*!***************************************!*\
  !*** ./src/utils/BackgroundPlayer.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BackgroundPlayer; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _EventedWorker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventedWorker */ \"./src/utils/EventedWorker.ts\");\n\n\nclass BackgroundPlayer extends eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a {\n    constructor(stringUrl = 'worker.js') {\n        super();\n        this.worker = new _EventedWorker__WEBPACK_IMPORTED_MODULE_1__[\"default\"](stringUrl);\n        this.worker.on('packet', (ts, type, ...args) => {\n            this.emit(type, ...args);\n        });\n        this.worker.on('end', () => {\n            this.emit('vcr_end');\n        });\n    }\n    load(data) {\n        this.worker.emit('load', data);\n    }\n    play() {\n        this.worker.emit('play');\n    }\n    seek(to) {\n        this.worker.emit('seek', to);\n    }\n    pause() {\n        this.worker.emit('pause');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/BackgroundPlayer.ts?");

/***/ }),

/***/ "./src/utils/EventedChannel.ts":
/*!*************************************!*\
  !*** ./src/utils/EventedChannel.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventedChannel; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n\nclass EventedChannel extends BroadcastChannel {\n    constructor(name) {\n        super(name);\n        const events = (this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a());\n        this.addEventListener('message', ev => {\n            const [type, ...args] = ev.data;\n            events.emit(type, ...args);\n        });\n    }\n    on(event, listener) {\n        this.events.on(event, listener);\n    }\n    emit(type, data) {\n        this.postMessage([type, data]);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/EventedChannel.ts?");

/***/ }),

/***/ "./src/utils/EventedWorker.ts":
/*!************************************!*\
  !*** ./src/utils/EventedWorker.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventedWorker; });\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n\nclass EventedWorker extends Worker {\n    constructor(stringUrl) {\n        super(stringUrl);\n        const events = (this.events = new eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a());\n        this.addEventListener('message', ev => {\n            const [type, ...args] = ev.data;\n            events.emit(type, ...args);\n        });\n    }\n    on(event, listener) {\n        this.events.on(event, listener);\n    }\n    emit(type, data) {\n        this.postMessage([type, data]);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/EventedWorker.ts?");

/***/ }),

/***/ "./src/utils/FakeSocket.ts":
/*!*********************************!*\
  !*** ./src/utils/FakeSocket.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FakeSocket; });\nclass FakeSocket {\n    constructor(player) {\n        this.player = player;\n    }\n    on(type, listener) {\n        this.player.on(type, listener);\n    }\n    emit(type, data) {\n        // this.player.worker.emit(type, data);\n    }\n    removeListener(type, listener) {\n        this.player.removeListener(type, listener);\n    }\n    // NOTE: Fake io object\n    get io() {\n        return {\n            engine: {\n                transport: {\n                    polling: false\n                }\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///./src/utils/FakeSocket.ts?");

/***/ })

/******/ });