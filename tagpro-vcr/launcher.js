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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/launcher.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/penpal/lib/child/connectToParent.js":
/*!**********************************************************!*\
  !*** ./node_modules/penpal/lib/child/connectToParent.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createDestructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createDestructor */ \"./node_modules/penpal/lib/createDestructor.js\");\n/* harmony import */ var _createLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../createLogger */ \"./node_modules/penpal/lib/createLogger.js\");\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n/* harmony import */ var _validateWindowIsIframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validateWindowIsIframe */ \"./node_modules/penpal/lib/child/validateWindowIsIframe.js\");\n/* harmony import */ var _handleSynAckMessageFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handleSynAckMessageFactory */ \"./node_modules/penpal/lib/child/handleSynAckMessageFactory.js\");\n/* harmony import */ var _startConnectionTimeout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../startConnectionTimeout */ \"./node_modules/penpal/lib/startConnectionTimeout.js\");\n\n\n\n\n\n\nconst areGlobalsAccessible = () => {\n    try {\n        clearTimeout();\n    }\n    catch (e) {\n        return false;\n    }\n    return true;\n};\n/**\n * Attempts to establish communication with the parent window.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((options = {}) => {\n    const { parentOrigin = '*', methods = {}, timeout, debug = false } = options;\n    const log = Object(_createLogger__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(debug);\n    const destructor = Object(_createDestructor__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    const { destroy, onDestroy } = destructor;\n    Object(_validateWindowIsIframe__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    const handleSynAckMessage = Object(_handleSynAckMessageFactory__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(parentOrigin, methods, destructor, log);\n    const sendSynMessage = () => {\n        log('Child: Handshake - Sending SYN');\n        const synMessage = { penpal: _enums__WEBPACK_IMPORTED_MODULE_2__[\"MessageType\"].Syn };\n        const parentOriginForSyn = parentOrigin instanceof RegExp ? '*' : parentOrigin;\n        window.parent.postMessage(synMessage, parentOriginForSyn);\n    };\n    const promise = new Promise((resolve, reject) => {\n        const stopConnectionTimeout = Object(_startConnectionTimeout__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(timeout, destroy);\n        const handleMessage = (event) => {\n            // Under niche scenarios, we get into this function after\n            // the iframe has been removed from the DOM. In Edge, this\n            // results in \"Object expected\" errors being thrown when we\n            // try to access properties on window (global properties).\n            // For this reason, we try to access a global up front (clearTimeout)\n            // and if it fails we can assume the iframe has been removed\n            // and we ignore the message event.\n            if (!areGlobalsAccessible()) {\n                return;\n            }\n            if (event.source !== parent || !event.data) {\n                return;\n            }\n            if (event.data.penpal === _enums__WEBPACK_IMPORTED_MODULE_2__[\"MessageType\"].SynAck) {\n                const callSender = handleSynAckMessage(event);\n                if (callSender) {\n                    window.removeEventListener(_enums__WEBPACK_IMPORTED_MODULE_2__[\"NativeEventType\"].Message, handleMessage);\n                    stopConnectionTimeout();\n                    resolve(callSender);\n                }\n            }\n        };\n        window.addEventListener(_enums__WEBPACK_IMPORTED_MODULE_2__[\"NativeEventType\"].Message, handleMessage);\n        sendSynMessage();\n        onDestroy((error) => {\n            window.removeEventListener(_enums__WEBPACK_IMPORTED_MODULE_2__[\"NativeEventType\"].Message, handleMessage);\n            if (!error) {\n                error = new Error('Connection destroyed');\n                error.code = _enums__WEBPACK_IMPORTED_MODULE_2__[\"ErrorCode\"].ConnectionDestroyed;\n            }\n            reject(error);\n        });\n    });\n    return {\n        promise,\n        destroy() {\n            // Don't allow consumer to pass an error into destroy.\n            destroy();\n        }\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/child/connectToParent.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/child/handleSynAckMessageFactory.js":
/*!*********************************************************************!*\
  !*** ./node_modules/penpal/lib/child/handleSynAckMessageFactory.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n/* harmony import */ var _connectCallReceiver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../connectCallReceiver */ \"./node_modules/penpal/lib/connectCallReceiver.js\");\n/* harmony import */ var _connectCallSender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../connectCallSender */ \"./node_modules/penpal/lib/connectCallSender.js\");\n\n\n\n/**\n * Handles a SYN-ACK handshake message.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((parentOrigin, methods, destructor, log) => {\n    const { destroy, onDestroy } = destructor;\n    return (event) => {\n        let originQualifies = parentOrigin instanceof RegExp\n            ? parentOrigin.test(event.origin)\n            : parentOrigin === '*' || parentOrigin === event.origin;\n        if (!originQualifies) {\n            log(`Child: Handshake - Received SYN-ACK from origin ${event.origin} which did not match expected origin ${parentOrigin}`);\n            return;\n        }\n        log('Child: Handshake - Received SYN-ACK, responding with ACK');\n        // If event.origin is \"null\", the remote protocol is file: or data: and we\n        // must post messages with \"*\" as targetOrigin when sending messages.\n        // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Using_window.postMessage_in_extensions\n        const originForSending = event.origin === 'null' ? '*' : event.origin;\n        const ackMessage = {\n            penpal: _enums__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].Ack,\n            methodNames: Object.keys(methods)\n        };\n        window.parent.postMessage(ackMessage, originForSending);\n        const info = {\n            localName: 'Child',\n            local: window,\n            remote: window.parent,\n            originForSending,\n            originForReceiving: event.origin\n        };\n        const destroyCallReceiver = Object(_connectCallReceiver__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(info, methods, log);\n        onDestroy(destroyCallReceiver);\n        const callSender = {};\n        const destroyCallSender = Object(_connectCallSender__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(callSender, info, event.data.methodNames, destroy, log);\n        onDestroy(destroyCallSender);\n        return callSender;\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/child/handleSynAckMessageFactory.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/child/validateWindowIsIframe.js":
/*!*****************************************************************!*\
  !*** ./node_modules/penpal/lib/child/validateWindowIsIframe.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    if (window === window.top) {\n        const error = new Error('connectToParent() must be called within an iframe');\n        error.code = _enums__WEBPACK_IMPORTED_MODULE_0__[\"ErrorCode\"].NotInIframe;\n        throw error;\n    }\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/child/validateWindowIsIframe.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/connectCallReceiver.js":
/*!********************************************************!*\
  !*** ./node_modules/penpal/lib/connectCallReceiver.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _errorSerialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorSerialization */ \"./node_modules/penpal/lib/errorSerialization.js\");\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ \"./node_modules/penpal/lib/enums.js\");\n\n\n/**\n * Listens for \"call\" messages coming from the remote, executes the corresponding method, and\n * responds with the return value.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((info, methods, log) => {\n    const { localName, local, remote, originForSending, originForReceiving } = info;\n    let destroyed = false;\n    const handleMessageEvent = (event) => {\n        if (event.source !== remote || event.data.penpal !== _enums__WEBPACK_IMPORTED_MODULE_1__[\"MessageType\"].Call) {\n            return;\n        }\n        if (event.origin !== originForReceiving) {\n            log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);\n            return;\n        }\n        const callMessage = event.data;\n        const { methodName, args, id } = callMessage;\n        log(`${localName}: Received ${methodName}() call`);\n        const createPromiseHandler = (resolution) => {\n            return (returnValue) => {\n                log(`${localName}: Sending ${methodName}() reply`);\n                if (destroyed) {\n                    // It's possible to throw an error here, but it would need to be thrown asynchronously\n                    // and would only be catchable using window.onerror. This is because the consumer\n                    // is merely returning a value from their method and not calling any function\n                    // that they could wrap in a try-catch. Even if the consumer were to catch the error,\n                    // the value of doing so is questionable. Instead, we'll just log a message.\n                    log(`${localName}: Unable to send ${methodName}() reply due to destroyed connection`);\n                    return;\n                }\n                const message = {\n                    penpal: _enums__WEBPACK_IMPORTED_MODULE_1__[\"MessageType\"].Reply,\n                    id,\n                    resolution,\n                    returnValue\n                };\n                if (resolution === _enums__WEBPACK_IMPORTED_MODULE_1__[\"Resolution\"].Rejected &&\n                    returnValue instanceof Error) {\n                    message.returnValue = Object(_errorSerialization__WEBPACK_IMPORTED_MODULE_0__[\"serializeError\"])(returnValue);\n                    message.returnValueIsError = true;\n                }\n                try {\n                    remote.postMessage(message, originForSending);\n                }\n                catch (err) {\n                    // If a consumer attempts to send an object that's not cloneable (e.g., window),\n                    // we want to ensure the receiver's promise gets rejected.\n                    if (err.name === _enums__WEBPACK_IMPORTED_MODULE_1__[\"NativeErrorName\"].DataCloneError) {\n                        const errorReplyMessage = {\n                            penpal: _enums__WEBPACK_IMPORTED_MODULE_1__[\"MessageType\"].Reply,\n                            id,\n                            resolution: _enums__WEBPACK_IMPORTED_MODULE_1__[\"Resolution\"].Rejected,\n                            returnValue: Object(_errorSerialization__WEBPACK_IMPORTED_MODULE_0__[\"serializeError\"])(err),\n                            returnValueIsError: true\n                        };\n                        remote.postMessage(errorReplyMessage, originForSending);\n                    }\n                    throw err;\n                }\n            };\n        };\n        new Promise(resolve => resolve(methods[methodName].apply(methods, args))).then(createPromiseHandler(_enums__WEBPACK_IMPORTED_MODULE_1__[\"Resolution\"].Fulfilled), createPromiseHandler(_enums__WEBPACK_IMPORTED_MODULE_1__[\"Resolution\"].Rejected));\n    };\n    local.addEventListener(_enums__WEBPACK_IMPORTED_MODULE_1__[\"NativeEventType\"].Message, handleMessageEvent);\n    return () => {\n        destroyed = true;\n        local.removeEventListener(_enums__WEBPACK_IMPORTED_MODULE_1__[\"NativeEventType\"].Message, handleMessageEvent);\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/connectCallReceiver.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/connectCallSender.js":
/*!******************************************************!*\
  !*** ./node_modules/penpal/lib/connectCallSender.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _generateId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateId */ \"./node_modules/penpal/lib/generateId.js\");\n/* harmony import */ var _errorSerialization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorSerialization */ \"./node_modules/penpal/lib/errorSerialization.js\");\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums */ \"./node_modules/penpal/lib/enums.js\");\n\n\n\n/**\n * Augments an object with methods that match those defined by the remote. When these methods are\n * called, a \"call\" message will be sent to the remote, the remote's corresponding method will be\n * executed, and the method's return value will be returned via a message.\n * @param {Object} callSender Sender object that should be augmented with methods.\n * @param {Object} info Information about the local and remote windows.\n * @param {Array} methodNames Names of methods available to be called on the remote.\n * @param {Promise} destructionPromise A promise resolved when destroy() is called on the penpal\n * connection.\n * @returns {Object} The call sender object with methods that may be called.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((callSender, info, methodNames, destroyConnection, log) => {\n    const { localName, local, remote, originForSending, originForReceiving } = info;\n    let destroyed = false;\n    log(`${localName}: Connecting call sender`);\n    const createMethodProxy = (methodName) => {\n        return (...args) => {\n            log(`${localName}: Sending ${methodName}() call`);\n            // This handles the case where the iframe has been removed from the DOM\n            // (and therefore its window closed), the consumer has not yet\n            // called destroy(), and the user calls a method exposed by\n            // the remote. We detect the iframe has been removed and force\n            // a destroy() immediately so that the consumer sees the error saying\n            // the connection has been destroyed. We wrap this check in a try catch\n            // because Edge throws an \"Object expected\" error when accessing\n            // contentWindow.closed on a contentWindow from an iframe that's been\n            // removed from the DOM.\n            let iframeRemoved;\n            try {\n                if (remote.closed) {\n                    iframeRemoved = true;\n                }\n            }\n            catch (e) {\n                iframeRemoved = true;\n            }\n            if (iframeRemoved) {\n                destroyConnection();\n            }\n            if (destroyed) {\n                const error = new Error(`Unable to send ${methodName}() call due ` + `to destroyed connection`);\n                error.code = _enums__WEBPACK_IMPORTED_MODULE_2__[\"ErrorCode\"].ConnectionDestroyed;\n                throw error;\n            }\n            return new Promise((resolve, reject) => {\n                const id = Object(_generateId__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n                const handleMessageEvent = (event) => {\n                    if (event.source !== remote ||\n                        event.data.penpal !== _enums__WEBPACK_IMPORTED_MODULE_2__[\"MessageType\"].Reply ||\n                        event.data.id !== id) {\n                        return;\n                    }\n                    if (event.origin !== originForReceiving) {\n                        log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);\n                        return;\n                    }\n                    const replyMessage = event.data;\n                    log(`${localName}: Received ${methodName}() reply`);\n                    local.removeEventListener(_enums__WEBPACK_IMPORTED_MODULE_2__[\"NativeEventType\"].Message, handleMessageEvent);\n                    let returnValue = replyMessage.returnValue;\n                    if (replyMessage.returnValueIsError) {\n                        returnValue = Object(_errorSerialization__WEBPACK_IMPORTED_MODULE_1__[\"deserializeError\"])(returnValue);\n                    }\n                    (replyMessage.resolution === _enums__WEBPACK_IMPORTED_MODULE_2__[\"Resolution\"].Fulfilled ? resolve : reject)(returnValue);\n                };\n                local.addEventListener(_enums__WEBPACK_IMPORTED_MODULE_2__[\"NativeEventType\"].Message, handleMessageEvent);\n                const callMessage = {\n                    penpal: _enums__WEBPACK_IMPORTED_MODULE_2__[\"MessageType\"].Call,\n                    id,\n                    methodName,\n                    args\n                };\n                remote.postMessage(callMessage, originForSending);\n            });\n        };\n    };\n    methodNames.reduce((api, methodName) => {\n        api[methodName] = createMethodProxy(methodName);\n        return api;\n    }, callSender);\n    return () => {\n        destroyed = true;\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/connectCallSender.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/createDestructor.js":
/*!*****************************************************!*\
  !*** ./node_modules/penpal/lib/createDestructor.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const callbacks = [];\n    let destroyed = false;\n    return {\n        destroy(error) {\n            destroyed = true;\n            callbacks.forEach(callback => {\n                callback(error);\n            });\n        },\n        onDestroy(callback) {\n            destroyed ? callback() : callbacks.push(callback);\n        }\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/createDestructor.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/createLogger.js":
/*!*************************************************!*\
  !*** ./node_modules/penpal/lib/createLogger.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((debug) => {\n    /**\n     * Logs a message if debug is enabled.\n     */\n    return (...args) => {\n        if (debug) {\n            console.log('[Penpal]', ...args); // eslint-disable-line no-console\n        }\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/createLogger.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/enums.js":
/*!******************************************!*\
  !*** ./node_modules/penpal/lib/enums.js ***!
  \******************************************/
/*! exports provided: MessageType, Resolution, ErrorCode, NativeErrorName, NativeEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MessageType\", function() { return MessageType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Resolution\", function() { return Resolution; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ErrorCode\", function() { return ErrorCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NativeErrorName\", function() { return NativeErrorName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NativeEventType\", function() { return NativeEventType; });\nvar MessageType;\n(function (MessageType) {\n    MessageType[\"Call\"] = \"call\";\n    MessageType[\"Reply\"] = \"reply\";\n    MessageType[\"Syn\"] = \"syn\";\n    MessageType[\"SynAck\"] = \"synAck\";\n    MessageType[\"Ack\"] = \"ack\";\n})(MessageType || (MessageType = {}));\nvar Resolution;\n(function (Resolution) {\n    Resolution[\"Fulfilled\"] = \"fulfilled\";\n    Resolution[\"Rejected\"] = \"rejected\";\n})(Resolution || (Resolution = {}));\nvar ErrorCode;\n(function (ErrorCode) {\n    ErrorCode[\"ConnectionDestroyed\"] = \"ConnectionDestroyed\";\n    ErrorCode[\"ConnectionTimeout\"] = \"ConnectionTimeout\";\n    ErrorCode[\"NotInIframe\"] = \"NotInIframe\";\n    ErrorCode[\"NoIframeSrc\"] = \"NoIframeSrc\";\n})(ErrorCode || (ErrorCode = {}));\nvar NativeErrorName;\n(function (NativeErrorName) {\n    NativeErrorName[\"DataCloneError\"] = \"DataCloneError\";\n})(NativeErrorName || (NativeErrorName = {}));\nvar NativeEventType;\n(function (NativeEventType) {\n    NativeEventType[\"Message\"] = \"message\";\n})(NativeEventType || (NativeEventType = {}));\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/enums.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/errorSerialization.js":
/*!*******************************************************!*\
  !*** ./node_modules/penpal/lib/errorSerialization.js ***!
  \*******************************************************/
/*! exports provided: serializeError, deserializeError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serializeError\", function() { return serializeError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deserializeError\", function() { return deserializeError; });\n/**\n * Converts an error object into a plain object.\n */\nconst serializeError = ({ name, message, stack }) => ({\n    name,\n    message,\n    stack\n});\n/**\n * Converts a plain object into an error object.\n */\nconst deserializeError = (obj) => {\n    const deserializedError = new Error();\n    // @ts-ignore\n    Object.keys(obj).forEach(key => (deserializedError[key] = obj[key]));\n    return deserializedError;\n};\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/errorSerialization.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/generateId.js":
/*!***********************************************!*\
  !*** ./node_modules/penpal/lib/generateId.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet id = 0;\n/**\n * @return {number} A unique ID (not universally unique)\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => ++id);\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/generateId.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/penpal/lib/index.js ***!
  \******************************************/
/*! exports provided: connectToChild, connectToParent, ErrorCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parent_connectToChild__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent/connectToChild */ \"./node_modules/penpal/lib/parent/connectToChild.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"connectToChild\", function() { return _parent_connectToChild__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _child_connectToParent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./child/connectToParent */ \"./node_modules/penpal/lib/child/connectToParent.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"connectToParent\", function() { return _child_connectToParent__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums */ \"./node_modules/penpal/lib/enums.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ErrorCode\", function() { return _enums__WEBPACK_IMPORTED_MODULE_2__[\"ErrorCode\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/index.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/connectToChild.js":
/*!**********************************************************!*\
  !*** ./node_modules/penpal/lib/parent/connectToChild.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n/* harmony import */ var _createDestructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../createDestructor */ \"./node_modules/penpal/lib/createDestructor.js\");\n/* harmony import */ var _createLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../createLogger */ \"./node_modules/penpal/lib/createLogger.js\");\n/* harmony import */ var _getOriginFromSrc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getOriginFromSrc */ \"./node_modules/penpal/lib/parent/getOriginFromSrc.js\");\n/* harmony import */ var _handleAckMessageFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handleAckMessageFactory */ \"./node_modules/penpal/lib/parent/handleAckMessageFactory.js\");\n/* harmony import */ var _handleSynMessageFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handleSynMessageFactory */ \"./node_modules/penpal/lib/parent/handleSynMessageFactory.js\");\n/* harmony import */ var _monitorIframeRemoval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./monitorIframeRemoval */ \"./node_modules/penpal/lib/parent/monitorIframeRemoval.js\");\n/* harmony import */ var _startConnectionTimeout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../startConnectionTimeout */ \"./node_modules/penpal/lib/startConnectionTimeout.js\");\n/* harmony import */ var _validateIframeHasSrcOrSrcDoc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./validateIframeHasSrcOrSrcDoc */ \"./node_modules/penpal/lib/parent/validateIframeHasSrcOrSrcDoc.js\");\n\n\n\n\n\n\n\n\n\n/**\n * Attempts to establish communication with an iframe.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((options) => {\n    let { iframe, methods = {}, childOrigin, timeout, debug = false } = options;\n    const log = Object(_createLogger__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(debug);\n    const destructor = Object(_createDestructor__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    const { onDestroy, destroy } = destructor;\n    if (!childOrigin) {\n        Object(_validateIframeHasSrcOrSrcDoc__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(iframe);\n        childOrigin = Object(_getOriginFromSrc__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(iframe.src);\n    }\n    // If event.origin is \"null\", the remote protocol is file: or data: and we\n    // must post messages with \"*\" as targetOrigin when sending messages.\n    // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Using_window.postMessage_in_extensions\n    const originForSending = childOrigin === 'null' ? '*' : childOrigin;\n    const handleSynMessage = Object(_handleSynMessageFactory__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(log, methods, childOrigin, originForSending);\n    const handleAckMessage = Object(_handleAckMessageFactory__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(methods, childOrigin, originForSending, destructor, log);\n    const promise = new Promise((resolve, reject) => {\n        const stopConnectionTimeout = Object(_startConnectionTimeout__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(timeout, destroy);\n        const handleMessage = (event) => {\n            if (event.source !== iframe.contentWindow || !event.data) {\n                return;\n            }\n            if (event.data.penpal === _enums__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].Syn) {\n                handleSynMessage(event);\n                return;\n            }\n            if (event.data.penpal === _enums__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].Ack) {\n                const callSender = handleAckMessage(event);\n                if (callSender) {\n                    stopConnectionTimeout();\n                    resolve(callSender);\n                }\n                return;\n            }\n        };\n        window.addEventListener(_enums__WEBPACK_IMPORTED_MODULE_0__[\"NativeEventType\"].Message, handleMessage);\n        log('Parent: Awaiting handshake');\n        Object(_monitorIframeRemoval__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(iframe, destructor);\n        onDestroy((error) => {\n            window.removeEventListener(_enums__WEBPACK_IMPORTED_MODULE_0__[\"NativeEventType\"].Message, handleMessage);\n            if (!error) {\n                error = new Error('Connection destroyed');\n                error.code = _enums__WEBPACK_IMPORTED_MODULE_0__[\"ErrorCode\"].ConnectionDestroyed;\n            }\n            reject(error);\n        });\n    });\n    return {\n        promise,\n        destroy() {\n            // Don't allow consumer to pass an error into destroy.\n            destroy();\n        }\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/connectToChild.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/getOriginFromSrc.js":
/*!************************************************************!*\
  !*** ./node_modules/penpal/lib/parent/getOriginFromSrc.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst DEFAULT_PORT_BY_PROTOCOL = {\n    'http:': '80',\n    'https:': '443'\n};\nconst URL_REGEX = /^(https?:)?\\/\\/([^/:]+)?(:(\\d+))?/;\nconst opaqueOriginSchemes = ['file:', 'data:'];\n/**\n * Converts a src value into an origin.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((src) => {\n    if (src && opaqueOriginSchemes.find(scheme => src.startsWith(scheme))) {\n        // The origin of the child document is an opaque origin and its\n        // serialization is \"null\"\n        // https://html.spec.whatwg.org/multipage/origin.html#origin\n        return 'null';\n    }\n    // Note that if src is undefined, then srcdoc is being used instead of src\n    // and we can follow this same logic below to get the origin of the parent,\n    // which is the origin that we will need to use.\n    const location = document.location;\n    const regexResult = URL_REGEX.exec(src);\n    let protocol;\n    let hostname;\n    let port;\n    if (regexResult) {\n        // It's an absolute URL. Use the parsed info.\n        // regexResult[1] will be undefined if the URL starts with //\n        protocol = (regexResult[1] ? regexResult[1] : location.protocol);\n        hostname = regexResult[2];\n        port = regexResult[4];\n    }\n    else {\n        // It's a relative path. Use the current location's info.\n        protocol = location.protocol;\n        hostname = location.hostname;\n        port = location.port;\n    }\n    // If the port is the default for the protocol, we don't want to add it to the origin string\n    // or it won't match the message's event.origin.\n    const portSuffix = port && port !== DEFAULT_PORT_BY_PROTOCOL[protocol] ? `:${port}` : '';\n    return `${protocol}//${hostname}${portSuffix}`;\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/getOriginFromSrc.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/handleAckMessageFactory.js":
/*!*******************************************************************!*\
  !*** ./node_modules/penpal/lib/parent/handleAckMessageFactory.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _connectCallReceiver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../connectCallReceiver */ \"./node_modules/penpal/lib/connectCallReceiver.js\");\n/* harmony import */ var _connectCallSender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../connectCallSender */ \"./node_modules/penpal/lib/connectCallSender.js\");\n\n\n/**\n * Handles an ACK handshake message.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((methods, childOrigin, originForSending, destructor, log) => {\n    const { destroy, onDestroy } = destructor;\n    let destroyCallReceiver;\n    let receiverMethodNames;\n    // We resolve the promise with the call sender. If the child reconnects\n    // (for example, after refreshing or navigating to another page that\n    // uses Penpal, we'll update the call sender with methods that match the\n    // latest provided by the child.\n    const callSender = {};\n    return (event) => {\n        if (event.origin !== childOrigin) {\n            log(`Parent: Handshake - Received ACK message from origin ${event.origin} which did not match expected origin ${childOrigin}`);\n            return;\n        }\n        log('Parent: Handshake - Received ACK');\n        const info = {\n            localName: 'Parent',\n            local: window,\n            remote: event.source,\n            originForSending: originForSending,\n            originForReceiving: childOrigin\n        };\n        // If the child reconnected, we need to destroy the prior call receiver\n        // before setting up a new one.\n        if (destroyCallReceiver) {\n            destroyCallReceiver();\n        }\n        destroyCallReceiver = Object(_connectCallReceiver__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(info, methods, log);\n        onDestroy(destroyCallReceiver);\n        // If the child reconnected, we need to remove the methods from the\n        // previous call receiver off the sender.\n        if (receiverMethodNames) {\n            receiverMethodNames.forEach(receiverMethodName => {\n                delete callSender[receiverMethodName];\n            });\n        }\n        receiverMethodNames = event.data.methodNames;\n        const destroyCallSender = Object(_connectCallSender__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(callSender, info, receiverMethodNames, destroy, log);\n        onDestroy(destroyCallSender);\n        return callSender;\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/handleAckMessageFactory.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/handleSynMessageFactory.js":
/*!*******************************************************************!*\
  !*** ./node_modules/penpal/lib/parent/handleSynMessageFactory.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n\n/**\n * Handles a SYN handshake message.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((log, methods, childOrigin, originForSending) => {\n    return (event) => {\n        if (event.origin !== childOrigin) {\n            log(`Parent: Handshake - Received SYN message from origin ${event.origin} which did not match expected origin ${childOrigin}`);\n            return;\n        }\n        log('Parent: Handshake - Received SYN, responding with SYN-ACK');\n        const synAckMessage = {\n            penpal: _enums__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].SynAck,\n            methodNames: Object.keys(methods)\n        };\n        event.source.postMessage(synAckMessage, originForSending);\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/handleSynMessageFactory.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/monitorIframeRemoval.js":
/*!****************************************************************!*\
  !*** ./node_modules/penpal/lib/parent/monitorIframeRemoval.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst CHECK_IFRAME_IN_DOC_INTERVAL = 60000;\n/**\n * Monitors for iframe removal and destroys connection if iframe\n * is found to have been removed from DOM. This is to prevent memory\n * leaks when the iframe is removed from the document and the consumer\n * hasn't called destroy(). Without this, event listeners attached to\n * the window would stick around and since the event handlers have a\n * reference to the iframe in their closures, the iframe would stick\n * around too.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((iframe, destructor) => {\n    const { destroy, onDestroy } = destructor;\n    const checkIframeInDocIntervalId = setInterval(() => {\n        if (!iframe.isConnected) {\n            clearInterval(checkIframeInDocIntervalId);\n            destroy();\n        }\n    }, CHECK_IFRAME_IN_DOC_INTERVAL);\n    onDestroy(() => {\n        clearInterval(checkIframeInDocIntervalId);\n    });\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/monitorIframeRemoval.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/parent/validateIframeHasSrcOrSrcDoc.js":
/*!************************************************************************!*\
  !*** ./node_modules/penpal/lib/parent/validateIframeHasSrcOrSrcDoc.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ \"./node_modules/penpal/lib/enums.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((iframe) => {\n    if (!iframe.src && !iframe.srcdoc) {\n        const error = new Error('Iframe must have src or srcdoc property defined.');\n        error.code = _enums__WEBPACK_IMPORTED_MODULE_0__[\"ErrorCode\"].NoIframeSrc;\n        throw error;\n    }\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/parent/validateIframeHasSrcOrSrcDoc.js?");

/***/ }),

/***/ "./node_modules/penpal/lib/startConnectionTimeout.js":
/*!***********************************************************!*\
  !*** ./node_modules/penpal/lib/startConnectionTimeout.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ \"./node_modules/penpal/lib/enums.js\");\n\n/**\n * Starts a timeout and calls the callback with an error\n * if the timeout completes before the stop function is called.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((timeout, callback) => {\n    let timeoutId;\n    if (timeout !== undefined) {\n        timeoutId = window.setTimeout(() => {\n            const error = new Error(`Connection timed out after ${timeout}ms`);\n            error.code = _enums__WEBPACK_IMPORTED_MODULE_0__[\"ErrorCode\"].ConnectionTimeout;\n            callback(error);\n        }, timeout);\n    }\n    return () => {\n        clearTimeout(timeoutId);\n    };\n});\n\n\n//# sourceURL=webpack:///./node_modules/penpal/lib/startConnectionTimeout.js?");

/***/ }),

/***/ "./src/launcher.ts":
/*!*************************!*\
  !*** ./src/launcher.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var penpal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! penpal */ \"./node_modules/penpal/lib/index.js\");\n\nconst allowedDomains = [\n    'koalabeast.com',\n    'jukejuice.com',\n    'newcompte.fr'\n]\n    .join('|');\nconst connection = Object(penpal__WEBPACK_IMPORTED_MODULE_0__[\"connectToParent\"])({\n    methods: {\n        game(data, filename) {\n            localStorage.setItem('recording', data);\n            localStorage.setItem('recordingName', filename);\n            return true;\n        }\n    },\n    parentOrigin: new RegExp(`^https?://(.+\\\\.)?(${allowedDomains})(:[0-9]+)?$`)\n});\n\n\n//# sourceURL=webpack:///./src/launcher.ts?");

/***/ })

/******/ });