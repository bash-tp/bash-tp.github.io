// ==UserScript==
// @name          TagPro VCR
// @description   Record TagPro socket data
// @version       0.2.0
// @author        Kera, bash#
// @icon          https://bash-tp.github.io/tagpro-vcr/images/vhs.png
// @namespace     https://github.com/bash-tp/
// @downloadUrl   https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.user.js
// @updateUrl     https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.meta.js
// @match         *://*.koalabeast.com/*
// @match         *://*.jukejuice.com/*
// @match         *://*.newcompte.fr/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_listValues
// @grant         GM_deleteValue
// @require       https://wzrd.in/standalone/debug@latest
// ==/UserScript==

(function (createDebug,tagpro) {
	'use strict';

	createDebug = createDebug && createDebug.hasOwnProperty('default') ? createDebug['default'] : createDebug;
	tagpro = tagpro && tagpro.hasOwnProperty('default') ? tagpro['default'] : tagpro;

	const now = () => Date.now();
	function addPacketListeners(socket, events, onPacket) {
	    const packetListeners = new Map();
	    for (const type of events) {
	        const cb = function (data) {
	            onPacket(now(), type, data);
	        };
	        packetListeners.set(type, cb);
	        socket.on(type, cb);
	    }
	    function cancel() {
	        for (const [type, callback] of packetListeners) {
	            socket.removeListener(type, callback);
	        }
	        packetListeners.clear();
	    }
	    return { cancel };
	}
	function saveFile(data, filename, type = 'application/x-ndjson') {
	    const blob = new Blob([data], { type });
	    const url = URL.createObjectURL(blob);
	    const a = document.createElement('a');
	    a.href = url;
	    a.download = filename;
	    a.click();
	    // window.open(url, '_blank');
	    URL.revokeObjectURL(url);
	}
	function addLinkToVcr() {
	    const li = document.createElement('li');
	    const link = document.createElement('a');
	    link.href = 'https://bash-tp.github.io/tagpro-vcr/';
	    link.target = '_blank';
	    link.innerText = 'VCR';
	    li.appendChild(link);
	    const nav = document.querySelector('#site-nav > ul');
	    nav.appendChild(li);
	}

	// Copied from https://stackoverflow.com/a/48254637

	function stringify(obj) {
		const cache = new Set();

		return JSON.stringify(obj, function (key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.has(value)) {
					// Circular reference found
					try {
						// If this value does not reference a parent it can be deduped
						return JSON.parse(JSON.stringify(value));
					}
					catch (err) {
						// discard key if value cannot be deduped
						return;
					}
				}
				// Store value in our set
				cache.add(value);
			}
			return value;
	        });
	}

	// ---

	class BasicRecorder {
	    constructor() {
	        this.started = false;
	        this.packets = [];
	    }
	    record(time, type, ...args) {
	        if (!this.started) {
	            this.started = true;
	            this.firstPacketTime = time;
	        }
	        // NOTE: Have to stringify, since the TagPro game modifies the packets and adds circular references.
	        const packet = stringify([time - this.firstPacketTime, type, ...args]);
	        this.packets.push(packet);
	    }
	    end() {
	        return Promise.resolve(this.packets.join('\n'));
	    }
	}

	function isInGame(tagpro$$1) {
	    return tagpro$$1.state > 0;
	}
	function isFrontPage() {
	    return !!document.querySelector('#userscript-home');
	}
	function readyAsync(tagpro$$1) {
	    return new Promise(resolve => tagpro$$1.ready(resolve));
	}

	const debug = createDebug('vcr');
	debug.enabled = true;
	(async function () {
	    await readyAsync(tagpro);
	    if (isInGame(tagpro)) {
	        debug('Recording.');
	        startRecording(tagpro);
	    }
	    else if (isFrontPage()) {
	        debug('Injecting link to VCR.');
	        addLinkToVcr();
	    }
	    else {
	        debug('Not in game.');
	    }
	})();
	function startRecording(tp) {
	    const recorder = new BasicRecorder();
	    const metadata = {
	        server: location.hostname,
	        port: location.port,
	        time: Date.now(),
	        tagproVersion: tp.version
	    };
	    recorder.record(now(), 'recorder-metadata', metadata);
	    // NOTE: removing $ prefix.
	    const events = Object.keys(tp.rawSocket['_callbacks']).map(e => (e.startsWith('$') ? e.substr(1) : e));
	    const listeners = addPacketListeners(tp.rawSocket, events, recorder.record.bind(recorder));
	    window.addEventListener('beforeunload', async function (ev) {
	        listeners.cancel();
	        const data = await recorder.end();
	        saveFile(data, `tagpro-recording-${Date.now()}.ndjson`);
	    });
	}

}(debug,tagpro));
