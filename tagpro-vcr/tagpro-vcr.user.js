// ==UserScript==
// @name          TagPro VCR
// @description   Record TagPro socket data
// @version       1.1.1
// @author        Kera, bash#
// @icon          https://bash-tp.github.io/tagpro-vcr/images/vhs.png
// @namespace     https://github.com/bash-tp/
// @downloadUrl   https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.user.js
// @updateUrl     https://bash-tp.github.io/tagpro-vcr/tagpro-vcr.meta.js
// @match         *://*.koalabeast.com/*
// @match         *://*.jukejuice.com/*
// @match         *://*.newcompte.fr/*
// @require       https://unpkg.com/idb@7/build/umd.js
// @require       https://unpkg.com/penpal@6/dist/penpal.min.js
// ==/UserScript==

(function (tagpro, idb, tagproConfig, Penpal) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

	function cookieName(name) {
	    return 'vcr' + name.charAt(0).toUpperCase() + name.slice(1);
	}
	class VcrSettings {
	    constructor() {
	        this.settings = {
	            enabled: true,
	            skipSpectator: true,
	            skipShort: true,
	            download: false,
	            save: 10,
	            shortSeconds: 10,
	            welcome: ''
	        };
	        Object.keys(this.settings).forEach(name => {
	            // Note: $.cookie returns only string values because
	            // the homepage doesn't set $.cookie.json
	            const cookie = $.cookie(cookieName(name));
	            if (typeof cookie !== 'undefined') {
	                try {
	                    this.settings[name] = JSON.parse(cookie);
	                }
	                catch (_a) {
	                    this.settings[name] = cookie;
	                }
	            }
	        });
	    }
	    get(name) {
	        return this.settings[name];
	    }
	    set(name, value) {
	        $.cookie(cookieName(name), String(value), { expires: 36500, path: '/', domain: tagproConfig__default['default'].cookieHost });
	        this.settings[name] = value;
	    }
	    checkbox(name, label, actionList) {
	        const checked = this.get(name) ? "checked" : "";
	        const id = `vcrCheckbox_${name}`;
	        actionList.push(() => {
	            document.querySelector(`#${id}`).addEventListener('click', this.checkboxHandler.bind(this));
	        });
	        return /*html*/ `
			<input id="${id}" type="checkbox" name="${name}" ${checked} /><label class="checkbox-inline" for="${id}">${label}</label>
		`;
	    }
	    checkboxHandler(ev) {
	        const target = ev.target;
	        const name = target.name;
	        this.set(name, target.checked);
	    }
	    radio(name, label, value, actionList) {
	        const checked = this.get(name) === value ? "checked" : "";
	        const id = `vcrRadio_${name}_${value}`;
	        actionList.push(() => {
	            document.querySelector(`#${id}`).addEventListener('click', this.radioHandler.bind(this));
	        });
	        return /*html*/ `
			<input id="${id}" type="radio" name="${name}" value="${value}" ${checked} /><label class="radio-inline" for="${id}">${label}</label>
		`;
	    }
	    radioHandler(ev) {
	        const target = ev.target;
	        const name = target.name;
	        const value = target.value;
	        this.set(name, value);
	    }
	    select(name, values, actionList) {
	        const value = this.get(name);
	        const id = `vcrSelect_${name}`;
	        actionList.push(() => {
	            document.querySelector(`#${id}`).addEventListener('change', this.selectHandler.bind(this));
	        });
	        let select = /*html*/ `
			<select id="${id}" name="${name}" class="vcr-select">
		`;
	        values.forEach(v => {
	            const selected = v === value ? "selected" : "";
	            select += /*html*/ `
				<option value="${v}" ${selected}>${v}</option>
			`;
	        });
	        select += /*html*/ `
			</select>
		`;
	        return select;
	    }
	    selectHandler(ev) {
	        const target = ev.target;
	        const name = target.name;
	        const value = target.selectedOptions[0].value;
	        this.set(name, value);
	    }
	}

	var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

	var css = "ul.vcr-list {\n\tlist-style: disc outside;\n\tmargin-left: 2rem;\n}\n\n.vcr-button {\n\tfont-size: 1.8em;\n\tborder: none;\n\tbox-shadow: none;\n\tbackground-color: #ffff00;\n\tmargin-bottom: inherit;\n\tfilter: invert(27%) sepia(48%) saturate(3292%) hue-rotate(183deg) brightness(99%) contrast(98%);\n}\n\n.vcr-button:hover, .vcr-button:focus, .vcr-button:active {\n\tbackground-color: #ffff00;\n\topacity: 0.5;\n}\n\n.vcr-button-play, .vcr-button-play:hover, .vcr-button-play:focus, .vcr-button-play:active {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M300 0H0v300h300V0zm-94.2 158.3-86.6 50c-1.3.8-2.8 1.1-4.3 1.1-4.7 0-8.5-3.8-8.5-8.5V101c0-3.1 1.6-5.9 4.3-7.4 2.6-1.5 5.9-1.5 8.6 0l86.6 50c2.6 1.5 4.3 4.3 4.3 7.4-.1 2.9-1.7 5.7-4.4 7.3z'/%3E%3C/svg%3E\");\n}\n\n.vcr-button-download, .vcr-button-download:hover, .vcr-button-download:focus, .vcr-button-download:active {\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' style='enable-background:new 0 0 300 300' xml:space='preserve'%3E%3Cpath d='M0 0v300h300V0H0zm126.4 133h12.7V93.5s-.5-1.9 2.4-1.9h17.8c2.1 0 2 1.6 2 1.6v39H173c4.5 0 1.1 3.4 1.1 3.4s-19.1 25.4-21.8 28c-1.9 1.9-3.8-.2-3.8-.2L126 136.2c.1 0-3.3-3.2.4-3.2zm80.2 67.6c0 4.3-3.5 7.8-7.9 7.8h-97.4c-4.4 0-7.9-3.5-7.9-7.8V166h15.7v26.7h81.7V166h15.7v34.6z'/%3E%3C/svg%3E\");\n}\n\n.vcr-hidden {\n\tdisplay: none;\n}\n\n.vcr-select {\n\tbackground: #212121;\n\tborder-color: #5f5f5f;\n}\n\n.vcr-mask {\n\tposition: fixed;\n\tleft: 50%;\n\ttop: 50%;\n\theight: 100px;\n\twidth: 100px;\n\tmargin: auto;\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0;\n\tright: 0;\n}\n\n.vcr-mask:before {\n\tcontent: \"\";\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0;\n\tright: 0;\n\topacity: 0.8;\n\tbackground-color: #000000;\n}\n\n.vcr-mask-inside {\n\tposition: relative;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.vcr-mask-inside::after {\n\tcontent: \"\";\n\tposition: absolute;\n\tborder-width: 3px;\n\tborder-style: solid;\n\tborder-color: transparent rgb(255, 255, 255) rgb(255, 255, 255);\n\tborder-radius: 50%;\n\twidth: 24px;\n\theight: 24px;\n\ttop: calc(50% - 12px);\n\tleft: calc(50% - 12px);\n\tanimation: 2s linear 0s normal none infinite running vcr-spin;\n\t/* filter: drop-shadow(0 0 2 rgba(0, 0, 0, 0.33)); */\n}\n\n@keyframes vcr-spin {\n\tfrom {\n\t\ttransform: rotate(0deg);\n\t}\n\tto {\n\t\ttransform: rotate(359deg);\n\t}\n}\n";
	n(css,{});

	const version = '1.1.1';
	const vcrUrl = 'https://bash-tp.github.io/tagpro-vcr/';
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
	        const previous = this.settings.get('welcome') || 'Unknown';
	        if (previous === version)
	            return;
	        const container = document.querySelector('#userscript-top + .container');
	        container.innerHTML = /*html*/ `
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

			<p><u>Version 1.1.1</u></p>
			<ul class="bullet-list">
				<li>Update dependencies due to upstream library changes.</li>
			</ul>

			<p><u>Version 1.1.0</u></p>
			<ul class="bullet-list">
				<li>Add the ability to launch replays directly from the browser.</li>
				<li>Make the number of saved games and the "short game" limit configurable.</li>
			</ul>

			<p><u>Version 1.0.1</u></p>
			<ul class="bullet-list">
				<li>Eliminate a dependency on a debugging library which isn't loading correctly.</li>
			</ul>

			<p><u>Version 1.0.0</u></p>
			<ul class="bullet-list">
				<li>Games are now saved in the browser by default.</li>
				<li>Added the VCR tab with details and settings.</li>
				<li>Added this automatic welcome screen.</li>
			</ul>
		`;
	        this.settings.set('welcome', version);
	    }
	    async showVcrWindow() {
	        if (this.done)
	            return;
	        this.done = true;
	        const container = document.querySelector('#userscript-top + .container');
	        const activeTab = document.querySelector('.active-tab');
	        const vcrTab = document.querySelector('#nav-vcr');
	        let newHTML;
	        const actions = [];
	        const selectSave = this.settings.select('save', [10, 20, 30, 40, 50], actions);
	        const selectShortSeconds = this.settings.select('shortSeconds', [10, 20, 30, 40, 50, 60], actions);
	        const checkboxEnabled = this.settings.checkbox('enabled', `Recorder enabled (save new games)`, actions);
	        const checkboxSkipSpectator = this.settings.checkbox('skipSpectator', `Don't save games where I am a spectator`, actions);
	        const checkboxSkipShort = this.settings.checkbox('skipShort', `Don't save short games (&lt; ${selectShortSeconds} seconds)`, actions);
	        const radioSave = this.settings.radio('download', `Save ${selectSave} most recent game files here in the browser`, false, actions);
	        const radioDownload = this.settings.radio('download', `Download game files after each game`, true, actions);
	        const settings = /*html*/ `
			<p>&nbsp;</p>
			<div class="row form-group">
				<h4 class="header-title">Settings</h4>

				${checkboxEnabled}<br />
				${checkboxSkipSpectator}<br />
				${checkboxSkipShort}<br /><br />

				${radioSave}<br />
				${radioDownload}
			</div>
		`;
	        const playButton = /*html*/ `
			<div class="row form-group">
				<button class="btn btn-primary" id="openPlayer">Play Saved Recordings</button>
			</div>
		`;
	        if (this.storage) {
	            let table = /*html*/ `
				<table class="table table-stripped row form-group">
					<thead>
						<th>Start</th>
						<th>Map</th>
						<th>Group?</th>
						<th>Duration</th>
						<th>Team</th>
						<th>Name</th>
						<th>Winner?</th>
						<th>Action</th>
					</thead>
					<tbody>
			`;
	            this.games = (await this.storage.listGames()).reverse();
	            this.games.forEach((game, idx) => {
	                const duration = new Date(game.duration).toISOString().substr(14, 5);
	                table += /*html*/ `
						<tr>
							<td>${game.start}</td>
							<td>${game.map}</td>
							<td>${game.group ? "Yes" : "No"}</td>
							<td>${duration}</td>
							<td>${game.team}</td>
							<td>${game.name}</td>
							<td>${game.winner ? "Yes" : "No"}</td>
							<td>
								<a type="button" id="vcrFile" data-idx="${idx}" class="btn vcr-button vcr-button-download" title="Download"></a>&nbsp;
								<a type="button" id="vcrPlay" data-idx="${idx}" class="btn vcr-button vcr-button-play" title="Play"></a>
							</td>
						</tr>
				`;
	            });
	            if (this.games.length === 0) {
	                table += /*html*/ `
						<tr>
							<td colspan="8"><i>No games saved yet</i></td>
						</tr>
				`;
	            }
	            table += /*html*/ `
					</tbody>
				</table>
			`;
	            const spinner = /*html*/ `
				<div class="vcr-mask vcr-hidden" id="vcrMask"><div class="vcr-mask-inside"></div></div>
			`;
	            newHTML = /*html*/ `
				<div class="row form-group">
					<h2>TagPro VCR</h2>
					<ul class="vcr-list">
						<li>Your ${this.storage.maxGames} most recent games will be stored in the browser.</li>
						<li>You can download a game file to save it forever, or launch the player directly from the list.</li>
						<li>Click the button below to visit the player website, and upload a saved game file to watch the replay.</li>
					</ul>
				</div>

				${playButton}
				${table}
				${settings}
				${spinner}
			`;
	        }
	        else {
	            newHTML = /*html*/ `
				<div class="row form-group">
					<h2>TagPro VCR</h2>
					<ul class="vcr-list">
						<li>Game files will automatically be downloaded after each game.</li>
						<li>Click the button below to visit the player website, and upload a game file to watch the replay.</li>
					</ul>
				</div>

				${playButton}
				${settings}
			`;
	        }
	        container.innerHTML = newHTML;
	        document.querySelector('#openPlayer').addEventListener('click', this.openPlayer.bind(this));
	        document.querySelectorAll('#vcrFile').forEach(link => link.addEventListener('click', this.downloadFile.bind(this)));
	        document.querySelectorAll('#vcrPlay').forEach(link => link.addEventListener('click', this.launchPlayer.bind(this)));
	        actions.forEach(action => action());
	        if (activeTab)
	            activeTab.classList.remove('active-tab');
	        vcrTab.classList.add('active-tab');
	    }
	    openPlayer(ev, extraUrl) {
	        const url = vcrUrl + (extraUrl !== null && extraUrl !== void 0 ? extraUrl : '');
	        if (this.playerWindow && this.playerWindow.window) {
	            this.playerWindow.focus();
	            this.playerWindow.location.href = url;
	        }
	        else {
	            this.playerWindow = window.open(url, '_blank');
	        }
	    }
	    onClickData(ev) {
	        const target = ev.target;
	        const idx = +target.getAttribute("data-idx");
	        const game = this.games[idx];
	        const start = new Date(game.timestamp);
	        const timestamp = dateToString(start, true);
	        const filename = `tagpro-recording-${timestamp}.ndjson`;
	        return {
	            'data': game.data,
	            'filename': filename
	        };
	    }
	    downloadFile(ev) {
	        const game = this.onClickData(ev);
	        saveFile(game.data, game.filename);
	    }
	    launchPlayer(ev) {
	        const game = this.onClickData(ev);
	        $('#vcrMask').removeClass('vcr-hidden');
	        const iframe = document.createElement('iframe');
	        iframe.src = vcrUrl + 'launcher.html';
	        iframe.setAttribute('style', 'display: none');
	        document.body.appendChild(iframe);
	        const connection = Penpal.connectToChild({ iframe, timeout: 30000 });
	        const handleError = reason => {
	            alert('Failed to launch player. Please try downloading your game file ' +
	                'and uploading it to the player website. Reason: ' + reason);
	            $('#vcrMask').addClass('vcr-hidden');
	            document.body.removeChild(iframe);
	        };
	        connection.promise.then(child => {
	            child.game(game.data, game.filename)
	                .then(result => {
	                document.body.removeChild(iframe);
	                $('#vcrMask').addClass('vcr-hidden');
	                this.openPlayer(undefined, '#launch');
	            })
	                .catch(reason => handleError(reason));
	        }, reason => handleError(reason))
	            .catch(reason => handleError(reason));
	    }
	}

	function debug(...args) {
	    console.log("TagPro VCR:", ...args);
	}
	const settings = new VcrSettings();
	let storage;
	if (!settings.get('download')) {
	    storage = new GameStorage(settings.get('save'));
	}
	const vcrWindow = new VcrWindow(settings, storage);
	(async function () {
	    await readyAsync(tagpro__default['default']);
	    if (isInGame(tagpro__default['default']) && settings.get('enabled')) {
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
	        if (settings.get('skipSpectator') && (game.team === 'Spectator')) {
	            return;
	        }
	        if (settings.get('skipShort') && (game.duration < (settings.get('shortSeconds') * 1000))) {
	            return;
	        }
	        if (settings.get('download')) {
	            const timestamp = dateToString(start, true);
	            saveFile(data, `tagpro-recording-${timestamp}.ndjson`);
	        }
	        else {
	            game.data = data;
	            storage.saveGame(game.timestamp, game);
	        }
	    });
	}

}(tagpro, idb, tagproConfig, Penpal));
