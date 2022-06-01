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
/******/ 		"game": 0
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
/******/ 	deferredModules.push(["./src/game.tsx","vendors~game"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.tsx":
/*!**********************!*\
  !*** ./src/game.tsx ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var detect_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! detect-browser */ "./node_modules/detect-browser/es/index.js");
/* harmony import */ var _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/BackgroundPlayer */ "./src/utils/BackgroundPlayer.ts");
/* harmony import */ var _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/EventedChannel */ "./src/utils/EventedChannel.ts");
/* harmony import */ var _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/FakeSocket */ "./src/utils/FakeSocket.ts");
/* harmony import */ var _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/PauseableTimeout */ "./src/utils/PauseableTimeout.ts");





__webpack_require__(/*! ./utils/whammy */ "./src/utils/whammy.js");
const viewport = document.querySelector('#viewport');
const save = {
    performanceInfo: null,
    seeking: false,
    render: null,
    sound: null,
    time: null,
    uiTimer: null,
    worldUpdate: null,
    map: null
};
const browser = Object(detect_browser__WEBPACK_IMPORTED_MODULE_0__["detect"])();
const isChrome = browser && browser.name === "chrome";
const hasWebp = viewport.toDataURL("image/webp").substring(0, 15) === "data:image/webp";
const forceCanvas = $.cookie("forceCanvasRenderer") === "true";
const couldCapture = isChrome && hasWebp;
const canCapture = couldCapture && forceCanvas;
const whammy = {
    enabled: canCapture,
    minFrameDuration: 30,
    capturing: false,
    encoder: null,
    lastFrame: null,
    docHTML: null,
    observer: null
};
_utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].hookSetTimeout();
tagpro.ready(() => {
    $('#volumeSlider').blur();
    tagproConfig.serverHost = "#";
    tagproConfig.musicHost = "#";
    save.performanceInfo = tagpro.ui.performanceInfo;
    tagpro.ui.performanceInfo = (e, t, n, r) => {
        tagpro.ping.avg = "N/A";
        save.performanceInfo(e, t, n, 0);
    };
    // The default "end" handler uses setTimeout to navigate back to
    // the joiner, then calls sendPingStatistics right after. We'll
    // override sendPingStatistics to cancel the timer and prevent
    // navigating away.
    tagpro.sendPingStatistics = () => {
        const id = window.setTimeout(() => { });
        clearTimeout(id - 1);
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
    tagpro.socket.on("settings", doSettings);
    tagpro.socket.on("connect", e => {
        doSettings();
        if (!e.isSpectator) {
            tagpro.spectator = true;
            tagpro.ui.spectatorInfo = () => { };
        }
    });
    tagpro.socket.on("map", e => {
        save.map = JSON.parse(JSON.stringify(e.tiles));
    });
    tagpro.socket.on("vcr_time", e => {
        if (save.seeking) {
            _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].setBase(e.time);
        }
    });
    tagpro.socket.on("vcr_end", e => {
        tagpro.state = 2 /* Ended */;
    });
    tagpro.socket.on("vcr_seek", e => {
        tagpro.sound = save.sound;
        save.seeking = false;
        _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].setBase(0);
        _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].shiftAll(e.to);
    });
});
const io = {
    connect() {
        const player = new _utils_BackgroundPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
        const socket = new _utils_FakeSocket__WEBPACK_IMPORTED_MODULE_3__["default"](player, onEmit);
        const channel = new _utils_EventedChannel__WEBPACK_IMPORTED_MODULE_2__["default"]('vcr');
        channel.emit('request-recording');
        channel.on('recording', data => {
            player.load(data);
            player.play();
            channel.emit('show-controls', { canCapture, couldCapture });
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
        let paused = false;
        const pause = () => {
            player.pause();
            _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].pauseAll();
            paused = true;
            const now = Date.now();
            if (tagpro.gameEndsAt && !tagpro.overtimeStartedAt) {
                save.time = tagpro.gameEndsAt.valueOf() - now;
            }
            else if (tagpro.overtimeStartedAt) {
                save.time = now - tagpro.overtimeStartedAt.valueOf();
            }
            save.uiTimer = tagpro.ui.timer;
            save.worldUpdate = tagpro.world.update;
            tagpro.ui.timer = (...args) => { };
            tagpro.world.update = (...args) => { };
        };
        const unpause = () => {
            tagpro.ui.timer = save.uiTimer;
            tagpro.world.update = save.worldUpdate;
            const now = Date.now();
            if (tagpro.gameEndsAt && !tagpro.overtimeStartedAt) {
                tagpro.gameEndsAt = now + save.time;
            }
            else if (tagpro.overtimeStartedAt) {
                tagpro.overtimeStartedAt = now - save.time;
            }
            _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].resumeAll();
            player.play();
            paused = false;
        };
        channel.on('pause', pause);
        channel.on('unpause', unpause);
        channel.on('seek', to => {
            if (!paused) {
                player.pause();
            }
            save.seeking = true;
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
            // Fire any pending timers now
            // After the seek is complete, any new timers will be time-shifted
            _utils_PauseableTimeout__WEBPACK_IMPORTED_MODULE_4__["default"].shiftAll(-1);
            const update = tagpro.world.update;
            tagpro.world.update = (...args) => {
                tagpro.renderer.layers.splats.removeChildren();
                for (let x = 0; x < save.map.length; x++) {
                    for (let y = 0; y < save.map[x].length; y++) {
                        tagpro.renderer.updateDynamicTile({ x, y, v: save.map[x][y] });
                    }
                }
                tagpro.world.update = update;
                update(...args);
            };
            player.seek(to);
            player.play();
        });
        channel.on('reload', () => {
            location.reload();
        });
        channel.on('start-capture', () => {
            // The Whammy recorder works by capturing frames and assembling
            // them into a webm video. To work correctly, each frame must be
            // captured in the same event in which it's drawn. We'll hook the
            // render function which is already called every tick, and use it
            // to capture a frame when necessary.
            const doc = document.documentElement;
            const domW = doc.offsetWidth;
            const domH = doc.offsetHeight;
            const domX = viewport.offsetLeft;
            const domY = viewport.offsetTop;
            whammy.encoder = new Whammy.Video(undefined, 0.92, domW, domH, domX, domY);
            whammy.lastFrame = null;
            whammy.capturing = true;
            whammy.docHTML = doc.outerHTML;
            whammy.observer = new MutationObserver(mutations => {
                whammy.docHTML = doc.outerHTML;
            });
            whammy.observer.observe(document.documentElement, {
                subtree: true,
                childList: true,
                attributes: true,
                characterData: true
            });
            // Remove all script nodes from the document, to prevent
            // spurious error messages from rasterizeHTML during encoding.
            // All of the scripts are loaded by now anyway.
            $('script').remove();
            if (!save.render) {
                save.render = tagpro.renderer.render;
                tagpro.renderer.render = (...args) => {
                    save.render(...args);
                    if (whammy.capturing) {
                        const now = performance.now();
                        const elapsed = whammy.lastFrame ? (now - whammy.lastFrame) : whammy.minFrameDuration;
                        if (elapsed >= whammy.minFrameDuration) {
                            whammy.encoder.add(viewport, elapsed, whammy.docHTML);
                            whammy.lastFrame = now;
                        }
                    }
                };
            }
            if (paused) {
                setTimeout(unpause, 1);
            }
        });
        channel.on('stop-capture', filename => {
            // The Whammy encoder now needs to render each frame and
            // assemble the final video, so we'll show a progress meter.
            // Errors can sometimes happen during rendering but are
            // very difficult to catch because Whammy does a lot of
            // asynchronous work in setTimeout.
            whammy.capturing = false;
            whammy.observer.disconnect();
            whammy.observer = null;
            channel.emit('rendering', { rendering: true, percent: 0 });
            if (!paused) {
                pause();
            }
            const callback = blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                channel.emit('rendering', { rendering: false });
                whammy.encoder = null;
            };
            const progressCallback = pct => channel.emit('rendering', { rendering: true, percent: pct * 100 });
            whammy.encoder.compile(false, callback, progressCallback);
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
            this.emit('vcr_time', { time: ts });
            this.emit(type, ...args);
        });
        this.worker.on('end', () => {
            this.emit('vcr_end');
        });
        this.worker.on('seek', to => {
            this.emit('vcr_seek', { to });
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
    listeners(type) {
        return this.player.listeners(type);
    }
    prependListener(type, listener) {
        this.listeners(type).unshift(listener);
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


/***/ }),

/***/ "./src/utils/PauseableTimeout.ts":
/*!***************************************!*\
  !*** ./src/utils/PauseableTimeout.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PauseableTimeouts; });
// Class to make all timers pauseable. We do this by intercepting every call
// to setTimeout and scheduling our own timer instead. To pause, we cancel all
// outstanding timers and make a note of how much time was left on each. Then
// when resuming, we reschedule each timer to run after its remaining time.
//
// We also need to make clearTimeout work, which means storing the original
// interval id assigned for each timer. A new interval id is generated each
// time we pause/resume, so if the caller uses clearTimeout with the original
// id, we need to map it to the current id for that timer.
const _setTimeout = window.setTimeout;
const _clearTimeout = window.clearTimeout;
class PauseableTimer {
    constructor(onExecute, handler, remaining, ...args) {
        this.onExecute = onExecute;
        this.handler = handler;
        this.remaining = remaining;
        this.args = args;
        this.resume();
    }
    pause() {
        _clearTimeout(this.timerId);
        this.timerId = null;
        this.remaining -= Date.now() - this.start;
    }
    resume() {
        var _a;
        const handler = () => {
            if (this.handler instanceof Function) {
                this.handler(...this.args);
            }
            else {
                // tslint:disable-next-line: no-eval
                eval(this.handler);
            }
            this.onExecute(this);
        };
        this.start = Date.now();
        if (this.timerId)
            _clearTimeout(this.timerId);
        this.timerId = _setTimeout(handler.bind(this), this.remaining);
        (_a = this.originalId) !== null && _a !== void 0 ? _a : (this.originalId = this.timerId);
    }
    shift(delta) {
        this.pause();
        this.remaining = delta < 0 ? 0 : Math.max(this.remaining - delta, 0);
        this.resume();
    }
}
const timers = {};
let timeBase = 0;
class PauseableTimeouts {
    static hookSetTimeout() {
        window.setTimeout = (handler, timeout, ...args) => {
            // If the timeout is small, we're probably looking at use of
            // setTimeout to escape the event loop rather than a real
            // deferred action, so we'll bypass the special handling
            if (timeout && (timeout > 10)) {
                const onExecute = (timer) => {
                    delete timers[timer.originalId];
                };
                const newTimer = new PauseableTimer(onExecute, handler, timeout + timeBase, ...args);
                const id = newTimer.timerId;
                timers[id] = newTimer;
                return id;
            }
            else {
                return _setTimeout(handler, timeout, ...args);
            }
        };
        window.clearTimeout = (handle) => {
            if (handle && (handle in timers)) {
                const timerId = timers[handle].timerId;
                if (timerId)
                    _clearTimeout(timerId);
                delete timers[handle];
            }
            else {
                _clearTimeout(handle);
            }
        };
    }
    static pauseAll() {
        Object.values(timers).forEach(timer => timer.pause());
    }
    static resumeAll() {
        Object.values(timers).forEach(timer => timer.resume());
    }
    static shiftAll(delta) {
        Object.values(timers).forEach(timer => timer.shift(delta));
    }
    static setBase(base) {
        timeBase = base;
    }
}


/***/ }),

/***/ "./src/utils/whammy.js":
/*!*****************************!*\
  !*** ./src/utils/whammy.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rasterizehtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasterizehtml */ "./node_modules/rasterizehtml/dist/rasterizeHTML.js");
/* harmony import */ var rasterizehtml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rasterizehtml__WEBPACK_IMPORTED_MODULE_0__);
// https://github.com/antimatter15/whammy/blob/f592519d48b1a79882711d3a1de9ecddb3bf9b81/whammy.js
// with added support for:
// - progress callback
// - dom overlay
// - bug fix: https://github.com/antimatter15/whammy/issues/43
//
/* tslint:disable */

/*
	var vid = new Whammy.Video();
	vid.add(canvas or data url)
	vid.compile()
*/



window.Whammy = (function(){
	// in this case, frames has a very specific meaning, which will be
	// detailed once i finish writing the code

	function toWebM(frames, outputAsArray){
		var info = checkFrames(frames);

		//max duration by cluster in milliseconds
		var CLUSTER_MAX_DURATION = 30000;

		var EBML = [
			{
				"id": 0x1a45dfa3, // EBML
				"data": [
					{
						"data": 1,
						"id": 0x4286 // EBMLVersion
					},
					{
						"data": 1,
						"id": 0x42f7 // EBMLReadVersion
					},
					{
						"data": 4,
						"id": 0x42f2 // EBMLMaxIDLength
					},
					{
						"data": 8,
						"id": 0x42f3 // EBMLMaxSizeLength
					},
					{
						"data": "webm",
						"id": 0x4282 // DocType
					},
					{
						"data": 2,
						"id": 0x4287 // DocTypeVersion
					},
					{
						"data": 2,
						"id": 0x4285 // DocTypeReadVersion
					}
				]
			},
			{
				"id": 0x18538067, // Segment
				"data": [
					{
						"id": 0x1549a966, // Info
						"data": [
							{
								"data": 1e6, //do things in millisecs (num of nanosecs for duration scale)
								"id": 0x2ad7b1 // TimecodeScale
							},
							{
								"data": "whammy",
								"id": 0x4d80 // MuxingApp
							},
							{
								"data": "whammy",
								"id": 0x5741 // WritingApp
							},
							{
								"data": doubleToString(info.duration),
								"id": 0x4489 // Duration
							}
						]
					},
					{
						"id": 0x1654ae6b, // Tracks
						"data": [
							{
								"id": 0xae, // TrackEntry
								"data": [
									{
										"data": 1,
										"id": 0xd7 // TrackNumber
									},
									{
										"data": 1,
										"id": 0x73c5 // TrackUID
									},
									{
										"data": 0,
										"id": 0x9c // FlagLacing
									},
									{
										"data": "und",
										"id": 0x22b59c // Language
									},
									{
										"data": "V_VP8",
										"id": 0x86 // CodecID
									},
									{
										"data": "VP8",
										"id": 0x258688 // CodecName
									},
									{
										"data": 1,
										"id": 0x83 // TrackType
									},
									{
										"id": 0xe0,  // Video
										"data": [
											{
												"data": info.width,
												"id": 0xb0 // PixelWidth
											},
											{
												"data": info.height,
												"id": 0xba // PixelHeight
											}
										]
									}
								]
							}
						]
					},
					{
						"id": 0x1c53bb6b, // Cues
						"data": [
							//cue insertion point
						]
					}

					//cluster insertion point
				]
			}
		 ];


		var segment = EBML[1];
		var cues = segment.data[2];

		//Generate clusters (max duration)
		var frameNumber = 0;
		var clusterTimecode = 0;
		while(frameNumber < frames.length){

			var cuePoint = {
					"id": 0xbb, // CuePoint
					"data": [
						{
							"data": Math.round(clusterTimecode),
							"id": 0xb3 // CueTime
						},
						{
							"id": 0xb7, // CueTrackPositions
							"data": [
								{
									"data": 1,
									"id": 0xf7 // CueTrack
								},
								{
									"data": 0, // to be filled in when we know it
									"size": 8,
									"id": 0xf1 // CueClusterPosition
								}
							]
						}
					]
				};

			cues.data.push(cuePoint);

			var clusterFrames = [];
			var clusterDuration = 0;
			do {
				clusterFrames.push(frames[frameNumber]);
				clusterDuration += frames[frameNumber].duration;
				frameNumber++;
			}while(frameNumber < frames.length && clusterDuration < CLUSTER_MAX_DURATION);

			var clusterCounter = 0;
			var cluster = {
					"id": 0x1f43b675, // Cluster
					"data": [
						{
							"data": Math.round(clusterTimecode),
							"id": 0xe7 // Timecode
						}
					].concat(clusterFrames.map(function(webp){
						var block = makeSimpleBlock({
							discardable: 0,
							frame: webp.data.slice(webp.data.indexOf('\x9d\x01\x2a') - 3),
							invisible: 0,
							keyframe: 1,
							lacing: 0,
							trackNum: 1,
							timecode: Math.round(clusterCounter)
						});
						clusterCounter += webp.duration;
						return {
							data: block,
							id: 0xa3
						};
					}))
				}

			//Add cluster to segment
			segment.data.push(cluster);
			clusterTimecode += clusterDuration;
		}

		//First pass to compute cluster positions
		var position = 0;
		for(var i = 0; i < segment.data.length; i++){
			if (i >= 3) {
				cues.data[i-3].data[1].data[1].data = position;
			}
			var data = generateEBML([segment.data[i]], outputAsArray);
			position += data.size || data.byteLength || data.length;
			if (i != 2) { // not cues
				//Save results to avoid having to encode everything twice
				segment.data[i] = data;
			}
		}

		return generateEBML(EBML, outputAsArray)
	}

	// sums the lengths of all the frames and gets the duration, woo

	function checkFrames(frames){
		var width = frames[0].width,
			height = frames[0].height,
			duration = frames[0].duration;
		for(var i = 1; i < frames.length; i++){
			if(frames[i].width != width) throw "Frame " + (i + 1) + " has a different width";
			if(frames[i].height != height) throw "Frame " + (i + 1) + " has a different height";
			if(frames[i].duration < 0 || frames[i].duration > 0x7fff) throw "Frame " + (i + 1) + " has a weird duration (must be between 0 and 32767)";
			duration += frames[i].duration;
		}
		return {
			duration: duration,
			width: width,
			height: height
		};
	}


	function numToBuffer(num){
		var parts = [];
		while(num > 0){
			parts.push(num & 0xff)
			num = num >> 8
		}
		return new Uint8Array(parts.reverse());
	}

	function numToFixedBuffer(num, size){
		var parts = new Uint8Array(size);
		for(var i = size - 1; i >= 0; i--){
			parts[i] = num & 0xff;
			num = num >> 8;
		}
		return parts;
	}

	function strToBuffer(str){
		// return new Blob([str]);

		var arr = new Uint8Array(str.length);
		for(var i = 0; i < str.length; i++){
			arr[i] = str.charCodeAt(i)
		}
		return arr;
		// this is slower
		// return new Uint8Array(str.split('').map(function(e){
		// 	return e.charCodeAt(0)
		// }))
	}


	//sorry this is ugly, and sort of hard to understand exactly why this was done
	// at all really, but the reason is that there's some code below that i dont really
	// feel like understanding, and this is easier than using my brain.

	function bitsToBuffer(bits){
		var data = [];
		var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
		bits = pad + bits;
		for(var i = 0; i < bits.length; i+= 8){
			data.push(parseInt(bits.substr(i,8),2))
		}
		return new Uint8Array(data);
	}

	function generateEBML(json, outputAsArray){
		var ebml = [];
		for(var i = 0; i < json.length; i++){
			if (!('id' in json[i])){
				//already encoded blob or byteArray
				ebml.push(json[i]);
				continue;
			}

			var data = json[i].data;
			if(typeof data == 'object') data = generateEBML(data, outputAsArray);
			if(typeof data == 'number') data = ('size' in json[i]) ? numToFixedBuffer(data, json[i].size) : bitsToBuffer(data.toString(2));
			if(typeof data == 'string') data = strToBuffer(data);

			if(data.length){
				var z = z;
			}

			var len = data.size || data.byteLength || data.length;
			var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
			var size_str = len.toString(2);
			var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
			var size = (new Array(zeroes)).join('0') + '1' + padded;

			//i actually dont quite understand what went on up there, so I'm not really
			//going to fix this, i'm probably just going to write some hacky thing which
			//converts that string into a buffer-esque thing

			ebml.push(numToBuffer(json[i].id));
			ebml.push(bitsToBuffer(size));
			ebml.push(data)


		}

		//output as blob or byteArray
		if(outputAsArray){
			//convert ebml to an array
			var buffer = toFlatArray(ebml)
			return new Uint8Array(buffer);
		}else{
			return new Blob(ebml, {type: "video/webm"});
		}
	}

	function toFlatArray(arr, outBuffer){
		if(outBuffer == null){
			outBuffer = [];
		}
		for(var i = 0; i < arr.length; i++){
			if(typeof arr[i] == 'object'){
				//an array
				toFlatArray(arr[i], outBuffer)
			}else{
				//a simple element
				outBuffer.push(arr[i]);
			}
		}
		return outBuffer;
	}

	//OKAY, so the following two functions are the string-based old stuff, the reason they're
	//still sort of in here, is that they're actually faster than the new blob stuff because
	//getAsFile isn't widely implemented, or at least, it doesn't work in chrome, which is the
	// only browser which supports get as webp

	//Converting between a string of 0010101001's and binary back and forth is probably inefficient
	//TODO: get rid of this function
	function toBinStr_old(bits){
		var data = '';
		var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
		bits = pad + bits;
		for(var i = 0; i < bits.length; i+= 8){
			data += String.fromCharCode(parseInt(bits.substr(i,8),2))
		}
		return data;
	}

	function generateEBML_old(json){
		var ebml = '';
		for(var i = 0; i < json.length; i++){
			var data = json[i].data;
			if(typeof data == 'object') data = generateEBML_old(data);
			if(typeof data == 'number') data = toBinStr_old(data.toString(2));

			var len = data.length;
			var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
			var size_str = len.toString(2);
			var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
			var size = (new Array(zeroes)).join('0') + '1' + padded;

			ebml += toBinStr_old(json[i].id.toString(2)) + toBinStr_old(size) + data;

		}
		return ebml;
	}

	//woot, a function that's actually written for this project!
	//this parses some json markup and makes it into that binary magic
	//which can then get shoved into the matroska comtainer (peaceably)

	function makeSimpleBlock(data){
		var flags = 0;
		if (data.keyframe) flags |= 128;
		if (data.invisible) flags |= 8;
		if (data.lacing) flags |= (data.lacing << 1);
		if (data.discardable) flags |= 1;
		if (data.trackNum > 127) {
			throw "TrackNumber > 127 not supported";
		}
		var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e){
			return String.fromCharCode(e)
		}).join('') + data.frame;

		return out;
	}

	// here's something else taken verbatim from weppy, awesome rite?

	function parseWebP(riff){
		var VP8 = riff.RIFF[0].WEBP[0];

		var frame_start = VP8.indexOf('\x9d\x01\x2a'); //A VP8 keyframe starts with the 0x9d012a header
		for(var i = 0, c = []; i < 4; i++) c[i] = VP8.charCodeAt(frame_start + 3 + i);

		var width, horizontal_scale, height, vertical_scale, tmp;

		//the code below is literally copied verbatim from the bitstream spec
		tmp = (c[1] << 8) | c[0];
		width = tmp & 0x3FFF;
		horizontal_scale = tmp >> 14;
		tmp = (c[3] << 8) | c[2];
		height = tmp & 0x3FFF;
		vertical_scale = tmp >> 14;
		return {
			width: width,
			height: height,
			data: VP8,
			riff: riff
		}
	}

	// i think i'm going off on a riff by pretending this is some known
	// idiom which i'm making a casual and brilliant pun about, but since
	// i can't find anything on google which conforms to this idiomatic
	// usage, I'm assuming this is just a consequence of some psychotic
	// break which makes me make up puns. well, enough riff-raff (aha a
	// rescue of sorts), this function was ripped wholesale from weppy

	function parseRIFF(string){
		var offset = 0;
		var chunks = {};

		while (offset < string.length) {
			var id = string.substr(offset, 4);
			chunks[id] = chunks[id] || [];
			if (id == 'RIFF' || id == 'LIST') {
				var len = parseInt(string.substr(offset + 4, 4).split('').map(function(i){
					var unpadded = i.charCodeAt(0).toString(2);
					return (new Array(8 - unpadded.length + 1)).join('0') + unpadded
				}).join(''),2);
				var data = string.substr(offset + 4 + 4, len);
				offset += 4 + 4 + len;
				chunks[id].push(parseRIFF(data));
			} else if (id == 'WEBP') {
				// Use (offset + 8) to skip past "VP8 "/"VP8L"/"VP8X" field after "WEBP"
				chunks[id].push(string.substr(offset + 8));
				offset = string.length;
			} else {
				// Unknown chunk type; push entire payload
				chunks[id].push(string.substr(offset + 4));
				offset = string.length;
			}
		}
		return chunks;
	}

	// here's a little utility function that acts as a utility for other functions
	// basically, the only purpose is for encoding "Duration", which is encoded as
	// a double (considerably more difficult to encode than an integer)
	function doubleToString(num){
		return [].slice.call(
			new Uint8Array(
				(
					new Float64Array([num]) //create a float64 array
				).buffer) //extract the array buffer
			, 0) // convert the Uint8Array into a regular array
			.map(function(e){ //since it's a regular array, we can now use map
				return String.fromCharCode(e) // encode all the bytes individually
			})
			.reverse() //correct the byte endianness (assume it's little endian for now)
			.join('') // join the bytes in holy matrimony as a string
	}

	function WhammyVideo(speed, quality, domWidth, domHeight, domX, domY){ // a more abstract-ish API
		this.frames = [];
		this.duration = 1000 / speed;
		this.quality = quality || 0.8;
		this.domWidth = domWidth;
		this.domHeight = domHeight;
		this.domX = domX;
		this.domY = domY;
	}

	WhammyVideo.prototype.add = function(frame, duration, html){
		if(typeof duration != 'undefined' && this.duration) throw "you can't pass a duration if the fps is set";
		if(typeof duration == 'undefined' && !this.duration) throw "if you don't have the fps set, you need to have durations here.";
		if(frame.canvas){ //CanvasRenderingContext2D
			frame = frame.canvas;
		}
		if(frame.toDataURL){
			// frame = frame.toDataURL('image/webp', this.quality);
			// quickly store image data so we don't block cpu. encode in compile method.
			frame = frame.getContext('2d').getImageData(0, 0, frame.width, frame.height);
		}else if(typeof frame != "string"){
			throw "frame must be a a HTMLCanvasElement, a CanvasRenderingContext2D or a DataURI formatted string"
		}
		if (typeof frame === "string" && !(/^data:image\/webp;base64,/ig).test(frame)) {
			throw "Input must be formatted properly as a base64 encoded DataURI of type image/webp";
		}
		this.frames.push({
			image: frame,
			duration: duration || this.duration,
			html: html
		});
	};

	// deferred webp encoding. Draws image data to canvas, then encodes as dataUrl
	WhammyVideo.prototype.encodeFrames = function(callback, progressCallback){

		if(this.frames[0].image instanceof ImageData){

			var frames = this.frames;
			var tmpCanvas = document.createElement('canvas');
			var tmpContext = tmpCanvas.getContext('2d');
			tmpCanvas.width = this.frames[0].image.width;
			tmpCanvas.height = this.frames[0].image.height;

			var domCanvas;
			var domContext;
			var prevHTML;
			if (this.domWidth) {
				domCanvas = document.createElement('canvas');
				domContext = domCanvas.getContext('2d');
				domCanvas.width = this.domWidth;
				domCanvas.height = this.domHeight;
			}

			var encodeFrame = function(index){
				// console.log('encodeFrame', index);
				progressCallback(index / this.frames.length);
				var frame = frames[index];
				tmpContext.putImageData(frame.image, 0, 0);

				if (frame.html) {
					if (frame.html !== prevHTML) {
						domContext.clearRect(0, 0, domCanvas.width, domCanvas.height);
						prevHTML = frame.html;

						rasterizehtml__WEBPACK_IMPORTED_MODULE_0__["drawHTML"](frame.html, domCanvas, { executeJs: false }).then(() => {
							// rasterizeHTML uses promises, but whammy uses
							// a setTimeout loop. We need a way to get back
							// into the loop once the promise resolves. To
							// make this work, we'll jump back to encodeFrame
							// on the same index. The canvas has alredy been
							// converted to an image and the DOM rendering
							// is cached so this doesn't add any extra work.

							encodeFrame(index);
						});
						return;
					}

					tmpContext.drawImage(domCanvas, this.domX, this.domY, tmpCanvas.width, tmpCanvas.height, 0, 0, tmpCanvas.width, tmpCanvas.height);
				}

				frame.image = tmpCanvas.toDataURL('image/webp', this.quality);
				if(index < frames.length-1){
					setTimeout(function(){ encodeFrame(index + 1); }, 1);
				}else{
					progressCallback(1.0);
					callback();
				}
			}.bind(this);

			encodeFrame(0);
		}else{
			callback();
		}
	};

	WhammyVideo.prototype.compile = function(outputAsArray, callback, progressCallback){

		this.encodeFrames(function(){

			var webm = new toWebM(this.frames.map(function(frame){
				var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
				webp.duration = frame.duration;
				return webp;
			}), outputAsArray);
			callback(webm);
			
		}.bind(this), progressCallback);
	};

	return {
		Video: WhammyVideo,
		fromImageArray: function(images, fps, outputAsArray){
			return toWebM(images.map(function(image){
				var webp = parseWebP(parseRIFF(atob(image.slice(23))))
				webp.duration = 1000 / fps;
				return webp;
			}), outputAsArray)
		},
		toWebM: toWebM
		// expose methods of madness
	}
})()


/***/ })

/******/ });
//# sourceMappingURL=game.js.map