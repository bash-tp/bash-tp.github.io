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


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./src/game.tsx":
/*!**********************!*\
  !*** ./src/game.tsx ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/BackgroundPlayer */ "./src/utils/BackgroundPlayer.ts");
/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventedChannel */ "./src/utils/EventedChannel.ts");
/* harmony import */ var _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/FakeSocket */ "./src/utils/FakeSocket.ts");



const save = {
    sound: null,
    time: null,
    uiTimer: null,
    worldUpdate: null,
    setTimeout: null
};
tagpro.ready(() => {
    tagproConfig.serverHost = "#";
    tagproConfig.musicHost = "#";
    tagpro.spectator = true;
    tagpro.ui.spectatorInfo = () => { };
    const performanceInfo = tagpro.ui.performanceInfo;
    tagpro.ui.performanceInfo = (e, t, n, r) => {
        tagpro.ping.avg = "Unknown";
        performanceInfo(e, t, n, 0);
    };
    // Note: $.cookie returns boolean values here rather than strings
    // because global-game sets $.cookie.json = true
    if (!!$.cookie("vcrHideFlair")) {
        tagpro.renderer.drawFlair = () => { };
    }
    if (!!$.cookie("vcrHideRaptors")) {
        tagpro.renderer.layers.ui.children.forEach(c => {
            if (c.texture && c.texture.baseTexture && c.texture.baseTexture.imageUrl &&
                c.texture.baseTexture.imageUrl.includes('raptor')) {
                c.renderable = false;
            }
        });
    }
    const doSettings = () => {
        tagpro.settings.ui.allChat = !$.cookie("vcrHideAllChat");
        tagpro.settings.ui.teamChat = !$.cookie("vcrHideTeamChat");
        tagpro.settings.ui.groupChat = !$.cookie("vcrHideGroupChat");
        tagpro.settings.ui.systemChat = !$.cookie("vcrHideSystemChat");
        tagpro.settings.ui.names = !$.cookie("vcrHideNames");
        tagpro.settings.ui.degrees = !$.cookie("vcrHideDegrees");
        tagpro.settings.ui.matchState = !$.cookie("vcrHideMatchState");
        tagpro.settings.ui.performanceInfo = !$.cookie("vcrHidePerformanceInfo");
        tagpro.settings.ui.teamNames = !!$.cookie("vcrHideTeamNames") ? "never" : "always";
    };
    tagpro.socket.on("connect", doSettings);
    tagpro.socket.on("settings", doSettings);
    tagpro.socket.on("time", e => {
        if (e.restore) {
            tagpro.sound = save.sound;
        }
    });
    tagpro.rawSocket.prependListener("end", e => {
        // Block setTimeout to prevent the default "end" handler
        // from trying to navigate back to the joiner
        save.setTimeout = window.setTimeout;
        window.setTimeout = (...args) => { return 0; };
    });
    tagpro.socket.on("vcr_end", e => {
        tagpro.state = 2 /* Ended */;
    });
});
const io = {
    connect() {
        const player = new _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_0__["default"]();
        // NOTE: For testing
        // player.worker.on('packet', (ts, type, data) => console.log(ts, type, data));
        // player.worker.on('end', ev => console.log('End!'));
        const playerIds = () => {
            return Object.keys(tagpro.players).map(Number);
        };
        const onEmit = (type, data) => {
            var _a;
            let target;
            switch (type) {
                case 'next':
                case 'prev':
                    const ids = type === 'next' ? playerIds().reverse() : playerIds();
                    const cur = ids.indexOf(tagpro.playerId);
                    target = (_a = ids[cur + 1]) !== null && _a !== void 0 ? _a : ids[0];
                    break;
                case 'redflagcarrier':
                case 'blueflagcarrier':
                    const flag = type === 'redflagcarrier' ? 2 : 1;
                    const team = type === 'redflagcarrier' ? 1 : 2;
                    target = playerIds().find(id => (tagpro.players[id].flag === flag) ||
                        (tagpro.players[id].flag === 3 && tagpro.players[id].team === team));
                    break;
            }
            if (target) {
                player.emit('id', target);
            }
        };
        const socket = new _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_2__["default"](player, onEmit);
        const channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_1__["default"]('vcr');
        channel.emit('request-recording');
        channel.on('recording', data => {
            player.load(data);
            player.play();
            channel.emit('show-controls');
            const timer = tagpro.ui.timer;
            tagpro.ui.timer = (...args) => {
                let time;
                if (tagpro.gameEndsAt && !tagpro.overtimeStartedAt) {
                    time = tagpro.gameEndsAt.valueOf() - Date.now();
                }
                else if (tagpro.overtimeStartedAt) {
                    time = Date.now() - tagpro.overtimeStartedAt.valueOf();
                }
                channel.emit('time-sync', { 'state': tagpro.state, 'time': time });
                timer(...args);
            };
        });
        channel.on('pause', () => {
            player.pause();
            if (tagpro.gameEndsAt && !tagpro.overtimeStartedAt) {
                save.time = tagpro.gameEndsAt.valueOf() - Date.now();
            }
            else if (tagpro.overtimeStartedAt) {
                save.time = Date.now() - tagpro.overtimeStartedAt.valueOf();
            }
            save.uiTimer = tagpro.ui.timer;
            save.worldUpdate = tagpro.world.update;
            tagpro.ui.timer = (...args) => { };
            tagpro.world.update = (...args) => { };
        });
        channel.on('unpause', () => {
            tagpro.ui.timer = save.uiTimer;
            tagpro.world.update = save.worldUpdate;
            if (tagpro.gameEndsAt && !tagpro.overtimeStartedAt) {
                tagpro.gameEndsAt = new Date(Date.now() + save.time);
            }
            else if (tagpro.overtimeStartedAt) {
                tagpro.overtimeStartedAt = new Date(Date.now() - save.time);
            }
            player.play();
        });
        channel.on('seek', to => {
            player.pause();
            save.sound = tagpro.sound;
            tagpro.sound = false;
            tagpro.gameEndsAt = null;
            tagpro.overtimeStartedAt = null;
            playerIds().forEach(id => {
                tagpro.players[id].lastSync = {};
                if (id !== tagpro.playerId) {
                    player.emit('playerLeft', id);
                }
            });
            for (let i = 0; i < 10; i++) {
                player.emit("chat", { from: null, to: "all", message: "\xa0" });
            }
            player.seek(to);
            player.play();
        });
        channel.on('reload', () => {
            location.reload();
        });
        return socket;
    }
};
window['io'] = io;
// NOTE: Testing.
// io.connect();


/***/ }),

/***/ "./src/utils/BackgroundPlayer.ts":
/*!***************************************!*\
  !*** ./src/utils/BackgroundPlayer.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackgroundPlayer; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventedWorker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventedWorker */ "./src/utils/EventedWorker.ts");


class BackgroundPlayer extends eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a {
    constructor(stringUrl = 'worker.js') {
        super();
        this.worker = new _EventedWorker__WEBPACK_IMPORTED_MODULE_1__["default"](stringUrl);
        this.worker.on('packet', (ts, type, ...args) => {
            this.emit(type, ...args);
        });
        this.worker.on('end', () => {
            this.emit('vcr_end');
        });
    }
    load(data) {
        this.worker.emit('load', data);
    }
    play() {
        this.worker.emit('play');
    }
    seek(to) {
        this.worker.emit('seek', to);
    }
    pause() {
        this.worker.emit('pause');
    }
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

/***/ "./src/utils/EventedWorker.ts":
/*!************************************!*\
  !*** ./src/utils/EventedWorker.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventedWorker; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);

class EventedWorker extends Worker {
    constructor(stringUrl) {
        super(stringUrl);
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

/***/ "./src/utils/FakeSocket.ts":
/*!*********************************!*\
  !*** ./src/utils/FakeSocket.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FakeSocket; });
class FakeSocket {
    constructor(player, onEmit) {
        this.player = player;
        this.onEmit = onEmit;
    }
    on(type, listener) {
        this.player.on(type, listener);
    }
    emit(type, data) {
        if (this.onEmit) {
            this.onEmit(type, data);
        }
        // this.player.worker.emit(type, data);
    }
    prependListener(type, listener) {
        const listeners = this.player.listeners(type);
        this.player.removeAllListeners(type);
        this.player.on(type, listener);
        listeners.forEach(l => this.player.on(type, l));
    }
    removeListener(type, listener) {
        this.player.removeListener(type, listener);
    }
    // NOTE: Fake io object
    get io() {
        return {
            engine: {
                transport: {
                    polling: false
                }
            }
        };
    }
}


/***/ })

/******/ });
//# sourceMappingURL=game.js.map