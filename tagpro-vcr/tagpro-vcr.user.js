// ==UserScript==
// @name          TagPro VCR
// @description   Record TagPro socket data
// @version       1.0.0
// @author        Kera, bash#
// @icon          https://bash-tp.github.io/tagpro-vcr/images/vhs.png
// @namespace     https://github.com/bash-tp/
// @downloadUrl   https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.user.js
// @updateUrl     https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.meta.js
// @match         *://*.koalabeast.com/*
// @match         *://*.jukejuice.com/*
// @match         *://*.newcompte.fr/*
// @require       https://wzrd.in/standalone/debug@latest
// @require       https://unpkg.com/idb/build/iife/index-min.js
// ==/UserScript==

(function (createDebug, tagpro, idb, tagproConfig) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var createDebug__default = /*#__PURE__*/_interopDefaultLegacy(createDebug);
	var tagpro__default = /*#__PURE__*/_interopDefaultLegacy(tagpro);
	var tagproConfig__default = /*#__PURE__*/_interopDefaultLegacy(tagproConfig);

	const now = () => Date.now();
	function dateToString(d, filename = false) {
	    const dash = filename ? "" : "-";
	    const space = filename ? "" : " ";
	    const colon = filename ? "" : ":";
	    let str = d.getFullYear() + dash +
	        ("0" + (d.getMonth() + 1)).slice(-2) + dash +
	        ("0" + d.getDate()).slice(-2) + space +
	        ("0" + d.getHours()).slice(-2) + colon +
	        ("0" + d.getMinutes()).slice(-2);
	    if (filename) {
	        str += ("0" + d.getSeconds()).slice(-2);
	    }
	    return str;
	}
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

	// Copied from https://stackoverflow.com/a/48254637
	function stringify(obj, isP = false) {
	    const cache = new Set();
	    return JSON.stringify(obj, function (key, value) {
	        // Avoid incompatibility with the TagPro Player Monitor script
	        if (isP && (key === 'monitor')) {
	            return;
	        }
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
	        const packet = stringify([time - this.firstPacketTime, type, ...args], type === 'p');
	        this.packets.push(packet);
	    }
	    end() {
	        return Promise.resolve(this.packets.join('\n'));
	    }
	}

	const dbName = 'tagpro-vcr-db';
	const dbVersion = 1;
	const dbStore = 'games';
	class GameStorage {
	    constructor(maxGames) {
	        this.maxGames = maxGames;
	        this.init();
	    }
	    async init() {
	        this.db = await idb.openDB(dbName, dbVersion, {
	            upgrade(db) {
	                db.createObjectStore(dbStore);
	            }
	        });
	    }
	    async saveGame(key, game) {
	        await this.db.put(dbStore, game, key);
	        const saved = await this.db.getAllKeys(dbStore);
	        while (saved.length > this.maxGames) {
	            const oldest = saved.shift();
	            this.db.delete(dbStore, oldest);
	        }
	    }
	    async listGames() {
	        return await this.db.getAll(dbStore);
	    }
	}

	function isInGame(tagpro) {
	    return tagpro.state > 0;
	}
	function isTopLevelPage() {
	    return !!document.querySelector('#site-nav');
	}
	function readyAsync(tagpro) {
	    return new Promise(resolve => tagpro.ready(resolve));
	}

	const vcrEnabled = 'vcrEnabled';
	const vcrSkipSpectator = 'vcrSkipSpectator';
	const vcrSkipShort = 'vcrShort';
	const vcrDownload = 'vcrDownload';
	const vcrWelcome = 'vcrWelcome';
	class VcrSettings {
	    constructor() {
	        this._enabled = true;
	        this._skipSpectator = true;
	        this._skipShort = true;
	        this._download = false;
	        this._save = 10;
	        this._shortSeconds = 10;
	        this._welcome = '';
	        this._enabled = this.getCookieBoolean(vcrEnabled, this._enabled);
	        this._skipSpectator = this.getCookieBoolean(vcrSkipSpectator, this._skipSpectator);
	        this._skipShort = this.getCookieBoolean(vcrSkipShort, this._skipShort);
	        this._download = this.getCookieBoolean(vcrDownload, this._download);
	        this._welcome = this.getCookieString(vcrWelcome, this._welcome);
	    }
	    getCookieBoolean(name, dflt) {
	        const cookie = $.cookie(name);
	        return cookie === 'true' ? true : cookie === 'false' ? false : dflt;
	    }
	    getCookieString(name, dflt) {
	        const cookie = $.cookie(name);
	        return cookie !== null && cookie !== void 0 ? cookie : dflt;
	    }
	    setCookie(name, value) {
	        $.cookie(name, String(value), { expires: 36500, path: '/', domain: tagproConfig__default['default'].cookieHost });
	    }
	    get enabled() { return this._enabled; }
	    set enabled(enabled) { this.setCookie(vcrEnabled, enabled); this._enabled = enabled; }
	    get skipSpectator() { return this._skipSpectator; }
	    set skipSpectator(skipSpectator) { this.setCookie(vcrSkipSpectator, skipSpectator); this._skipSpectator = skipSpectator; }
	    get skipShort() { return this._skipShort; }
	    set skipShort(skipShort) { this.setCookie(vcrSkipShort, skipShort); this._skipShort = skipShort; }
	    get download() { return this._download; }
	    set download(download) { this.setCookie(vcrDownload, download); this._download = download; }
	    get save() { return this._save; }
	    get shortSeconds() { return this._shortSeconds; }
	    get welcome() { return this._welcome; }
	    set welcome(version) { this.setCookie(vcrWelcome, version); this._welcome = version; }
	}

	const version = '1.0.0';
	class VcrWindow {
	    constructor(settings, storage) {
	        this.settings = settings;
	        this.storage = storage;
	        this.done = false;
	    }
	    addVcrLink() {
	        const li = document.createElement('li');
	        const link = document.createElement('a');
	        link.href = '#';
	        link.innerText = 'VCR';
	        link.addEventListener('click', this.showVcrWindow.bind(this));
	        li.id = 'nav-vcr';
	        li.appendChild(link);
	        const nav = document.querySelector('#site-nav > ul');
	        nav.appendChild(li);
	    }
	    showVcrWelcomeIfNeeded() {
	        const previous = this.settings.welcome || 'Unknown';
	        if (previous === version)
	            return;
	        const container = document.querySelector('#userscript-top + .container');
	        container.innerHTML = `
			<h1>Hi there, TagPro VCR User!</h1>

			<p>
				Sorry to interrupt but you'll only see this message when the userscript is first installed
				or udpated. If you've used the TagPro VCR before, things might be a bit different.
			</p>

			<p>
				Click on the VCR tab to get started (in the navigation bar above, all the way to the right).
				Then click back on the TAGPRO tab to play. Have fun!
			</p>

			<h3 class="header-title">Changelog</h3>

			<p>
				Installed now: ${version}<br />
				Previous version: ${previous}
			</p>

			<p><u>Version 1.0.0</u></p>
			<ul class="bullet-list">
				<li>Games are now saved in the browser by default.</li>
				<li>Added the VCR tab with details and settings.</li>
				<li>Added this automatic welcome screen.</li>
			</ul>
		`;
	        this.settings.welcome = version;
	    }
	    async showVcrWindow() {
	        if (this.done)
	            return;
	        this.done = true;
	        const container = document.querySelector('#userscript-top + .container');
	        const activeTab = document.querySelector('.active-tab');
	        const vcrTab = document.querySelector('#nav-vcr');
	        let newHTML;
	        const vcrEnabledChecked = this.settings.enabled ? "checked" : "";
	        const vcrSkipSpectatorChecked = this.settings.skipSpectator ? "checked" : "";
	        const vcrSkipShortChecked = this.settings.skipShort ? "checked" : "";
	        const vcrDownloadChecked = this.settings.download ? "checked" : "";
	        const vcrSaveChecked = this.settings.download ? "" : "checked";
	        const settings = `
			<p>&nbsp;</p>
			<div class="row form-group">
				<h4 class="header-title">Settings</h4>

				<input id="vcrEnabled" type="checkbox" ${vcrEnabledChecked} /><label class="checkbox-inline" for="vcrEnabled">Recorder enabled (save new games)</label><br />
				<input id="vcrSkipSpectator" type="checkbox" ${vcrSkipSpectatorChecked} /><label class="checkbox-inline" for="vcrSkipSpectator">Don't save games where I am a spectator</label><br />
				<input id="vcrSkipShort" type="checkbox" ${vcrSkipShortChecked} /><label class="checkbox-inline" for="vcrSkipShort">Don't save short games (&lt; ${this.settings.shortSeconds} seconds)</label><br /><br />

				<input id="vcrSave" type="radio" name="vcrDownloadRadio" value="false" ${vcrSaveChecked} /><label class="radio-inline" for="vcrSave">Save game files here in the browser</label><br />
				<input id="vcrDownload" type="radio" name="vcrDownloadRadio" value="true" ${vcrDownloadChecked} /><label class="radio-inline" for="vcrDownload">Download game files after each game</label>
			</div>
		`;
	        const playButton = `
			<div class="row form-group">
				<a class="btn btn-primary" href="https://bash-tp.github.io/tagpro-vcr/" target="_blank">Play Your Recordings</a>
			</div>
		`;
	        if (this.storage) {
	            let table = `
				<table class="table table-stripped row form-group">
					<thead>
						<th>Start</th>
						<th>Map</th>
						<th>Group?</th>
						<th>Duration</th>
						<th>Team</th>
						<th>Name</th>
						<th>Winner?</th>
						<th>Download</th>
					</thead>
					<tbody>
			`;
	            this.games = (await this.storage.listGames()).reverse();
	            this.games.forEach((game, idx) => {
	                const duration = new Date(game.duration).toISOString().substr(14, 5);
	                table += `
						<tr>
							<td>${game.start}</td>
							<td>${game.map}</td>
							<td>${game.group ? "Yes" : "No"}</td>
							<td>${duration}</td>
							<td>${game.team}</td>
							<td>${game.name}</td>
							<td>${game.winner ? "Yes" : "No"}</td>
							<td>
								<a class="btn btn-secondary btn-tiny" href="#" id="vcrFile" data-idx="${idx}">Download</a>
							</td>
						</tr>
				`;
	            });
	            if (this.games.length === 0) {
	                table += `
						<tr>
							<td colspan="8"><i>No games saved yet</i></td>
						</tr>
				`;
	            }
	            table += `
					</tbody>
				</table>
			`;
	            newHTML = `
				<div class="row form-group">
					<h2>TagPro VCR</h2>
					<ul style="list-style: disc outside; margin-left: 2rem;">
						<li>Your ${this.storage.maxGames} most recent games will be stored in the browser.</li>
						<li>You can download a game file from the list.</li>
						<li>Then click the button below to visit the player website, and upload your game file to watch the replay.</li>
					</ul>
				</div>

				${playButton}
				${table}
				${settings}
			`;
	        }
	        else {
	            newHTML = `
				<div class="row form-group">
					<h2>TagPro VCR</h2>
					<ul style="list-style: disc outside; margin-left: 2rem;">
						<li>Game files will automatically be downloaded after each game.</li>
						<li>Click the button below to visit the player website, and upload a game file to watch the replay.</li>
					</ul>
				</div>

				${playButton}
				${settings}
			`;
	        }
	        container.innerHTML = newHTML;
	        document.querySelectorAll('#vcrFile').forEach(link => {
	            link.addEventListener('click', this.downloadFile.bind(this));
	        });
	        document.querySelector('#vcrEnabled').addEventListener('click', this.setEnabled.bind(this));
	        document.querySelector('#vcrSkipSpectator').addEventListener('click', this.setSkipSpectator.bind(this));
	        document.querySelector('#vcrSkipShort').addEventListener('click', this.setSkipShort.bind(this));
	        document.querySelector('#vcrDownload').addEventListener('click', this.setDownload.bind(this));
	        document.querySelector('#vcrSave').addEventListener('click', this.setDownload.bind(this));
	        activeTab.classList.remove('active-tab');
	        vcrTab.classList.add('active-tab');
	    }
	    downloadFile(ev) {
	        const target = ev.target;
	        const idx = +target.getAttribute("data-idx");
	        const game = this.games[idx];
	        const start = new Date(game.timestamp);
	        const timestamp = dateToString(start, true);
	        saveFile(game.data, `tagpro-recording-${timestamp}.ndjson`);
	    }
	    setEnabled(ev) {
	        const target = ev.target;
	        this.settings.enabled = target.checked;
	    }
	    setSkipSpectator(ev) {
	        const target = ev.target;
	        this.settings.skipSpectator = target.checked;
	    }
	    setSkipShort(ev) {
	        const target = ev.target;
	        this.settings.skipShort = target.checked;
	    }
	    setDownload(ev) {
	        const target = ev.target;
	        this.settings.download = (target.value === 'true');
	    }
	}

	const debug = createDebug__default['default']('vcr');
	debug.enabled = true;
	const settings = new VcrSettings();
	let storage;
	if (!settings.download) {
	    storage = new GameStorage(settings.save);
	}
	const vcrWindow = new VcrWindow(settings, storage);
	(async function () {
	    await readyAsync(tagpro__default['default']);
	    if (isInGame(tagpro__default['default']) && settings.enabled) {
	        debug('Recording.');
	        startRecording(tagpro__default['default']);
	    }
	    else if (isTopLevelPage()) {
	        debug('Injecting link to VCR.');
	        vcrWindow.addVcrLink();
	        vcrWindow.showVcrWelcomeIfNeeded();
	    }
	    else {
	        debug('Not in game.');
	    }
	})();
	function startRecording(tp) {
	    const recorder = new BasicRecorder();
	    let start = new Date();
	    const game = {
	        timestamp: start.valueOf(),
	        start: dateToString(start),
	        map: 'Unknown',
	        group: false,
	        duration: 0,
	        team: 'Unknown',
	        name: 'Unknown',
	        winner: false,
	        data: ''
	    };
	    const teams = {
	        red: "Red",
	        blue: "Blue"
	    };
	    const metadata = {
	        server: location.hostname,
	        port: location.port,
	        time: start.valueOf(),
	        tagproVersion: tp.version
	    };
	    const getPlayer = () => {
	        if (tp.playerId && !tp.spectator) {
	            return tp.players[tp.playerId];
	        }
	        return undefined;
	    };
	    recorder.record(now(), 'recorder-metadata', metadata);
	    // NOTE: removing $ prefix.
	    const events = Object.keys(tp.rawSocket['_callbacks']).map(e => (e.startsWith('$') ? e.substr(1) : e));
	    const listeners = addPacketListeners(tp.rawSocket, events, recorder.record.bind(recorder));
	    tp.rawSocket.on('time', (e) => {
	        if (e.state === 1) {
	            start = new Date();
	        }
	    });
	    tp.rawSocket.on('map', (e) => {
	        game.map = e.info.name;
	    });
	    tp.rawSocket.on('spectator', (e) => {
	        game.name = '[Spectator]';
	        game.team = 'Spectator';
	    });
	    tp.rawSocket.on('groupId', (e) => {
	        game.group = (e !== null);
	    });
	    tp.rawSocket.on('teamNames', (e) => {
	        teams.red = e.redTeamName;
	        teams.blue = e.blueTeamName;
	    });
	    tp.rawSocket.on('p', (e) => {
	        const me = getPlayer();
	        if (me) {
	            game.name = me.name;
	            game.team = me.team === 1 ? teams.red : me.team === 2 ? teams.blue : "Unknown";
	        }
	    });
	    tp.rawSocket.on('end', (e) => {
	        game.duration = now() - start.valueOf();
	        const me = getPlayer();
	        if (me) {
	            game.winner = (me.team === 1 && e.winner === "red") || (me.team === 2 && e.winner === "blue");
	        }
	    });
	    window.addEventListener('beforeunload', async function (ev) {
	        const end = now();
	        game.duration || (game.duration = end - start.valueOf());
	        debug('Getting ready to save');
	        listeners.cancel();
	        recorder.record(end, 'recorder-summary', game);
	        const data = await recorder.end();
	        if (settings.skipSpectator && (game.team === 'Spectator')) {
	            return;
	        }
	        if (settings.skipShort && (game.duration < (settings.shortSeconds * 1000))) {
	            return;
	        }
	        if (settings.download) {
	            const timestamp = dateToString(start, true);
	            saveFile(data, `tagpro-recording-${timestamp}.ndjson`);
	        }
	        else {
	            game.data = data;
	            storage.saveGame(game.timestamp, game);
	        }
	    });
	}

}(debug, tagpro, idb, tagproConfig));
