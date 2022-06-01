var eventMapJSON = {
    bossRadius: 1
};
tagpro.loadAssets = () => { };

tagpro.events.register({
    gravity: {x: 0, y: 9.8 / 2},
    setPlayerPhysics : function(box2d, bodyDef, fixDef) {
        fixDef.friction = 0.0;
        fixDef.restitution = 0.3;
    },
    setWallPhysics: function(box2d, bodyDef, fixDef) {
        fixDef.friction = 0.0;
        fixDef.restitution = 0.3;
    },
    sortPlayers: function(players) {
        players.sort(function(a, b){
            return (tagpro.state === 2) ? (b["s-returns"] - a["s-returns"]) : (b["s-captures"] - a["s-captures"]); // if game is finished, max altitude, otherwise altitude
        });
    },
    modifyScoreUI: function($table) {
        $table.find("th, td")
            .hide()
            .filter(":nth-child(1), :nth-child(3), :nth-child(4), :nth-child(8), :nth-child(10), :nth-child(6), :nth-child(13)").show();
        $table.find("th:nth-child(10)").text("Max Altitude");
        $table.find("td:nth-child(10)").append("m");
        $table.find("th:nth-child(8)").text("Current Altitude");
        $table.find("td:nth-child(8)").append("m");
        $table.find("th:nth-child(6)").text("Falls");
        $table.find("th:nth-child(12)").text("Coins");
    },
    playerUpdate: function(player, body) {
        if (player.floating) {
            body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -0.01), body.GetWorldCenter());
        }
    }
});

$(document).ready(function () {
    let assets = $("#assets");

    let createBirthdayAudio = function (filename) {
        assets.find("#"+filename).remove();
        assets.append($("<audio>", { id : filename, preload : "auto" })
            .append($("<source>", { src : "./vendor/pirates/"+filename+".mp3", type : "audio/mp3"}))
            .append($("<source>", { src : "./vendor/pirates/"+filename+".ogg", type : "audio/ogg"}))
            .append($("<source>", { src : "./vendor/pirates/"+filename+".m4a", type : "audio/m4a"})));
    };
    let completedSounds = ["jump", "explosion", "powerup", "burst", "pop", "teleport"];
    for (let i = 0; i < completedSounds.length; i++) {
        let sound = completedSounds[i];
        createBirthdayAudio(sound);
    }
    assets.find("#particle").attr("src", "./vendor/pirates/particle.png");
    assets.find("#particleFire").attr("src", "./vendor/pirates/particle.png");

    assets.find("#alertlong").remove();
    $("div#musicInfo")
     .removeClass("hide")
     .text("Music: Plunderin'")
     .attr("id", "disableHidding");
});

tagpro.ready(function () {
    tagpro.ui.scoreXOffset = 80;
    tagpro.particleDefinitions.gravityWell.color.start = "#ffffff";
    tagpro.particleDefinitions.gravityWell.color.end = "#ffffff";
    let music = $("#eventmusic").get(0);
    let ocean = document.querySelector('#ocean');

    tagpro.musicPlayer.disable();
    function interactionHandler() {
        music = $("#eventmusic").get(0);
        music.volume = tagpro.volumeCoefficient * 0.8;
        // music.currentTime = calculateMusicSeek();
        music.play();
        tagpro.musicPlayer.refreshVolume = function () {
            music.volume = tagpro.volumeCoefficient * 0.8;
        };

        setTimeout(() => {
            music = $("#eventmusic").get(0);
            // music.currentTime = calculateMusicSeek();
            music.play();
            handleMuteToggle();
        }, 300);
        handleMuteToggle();

        ocean.volume = tagpro.volumeCoefficient * 0.9;
        ocean.play();

        document.removeEventListener('click', interactionHandler);
    }

    $("#soundMusic").click(handleMuteToggle);
    $("#soundEffects").click(handleMuteToggle);

    ocean.oncanplaythrough = function(){
        ocean.loop = true;
        document.addEventListener('click', interactionHandler);
    };

    function handleMuteToggle() {
        let mute = $("#soundMusic").hasClass("off");
        let effectMute = $("#soundEffects").hasClass("off");

        music[mute ? 'pause' : 'play']();
        ocean[effectMute ? 'pause' : 'play']();
    }

    tagpro.renderer.updateCameraPosition = function (player) {
        if (player.sprite.x !== -1000 && player.sprite.y !== -1000) {
            let x = player.sprite.x + 19, y = player.sprite.y + 19;
            let maxY = (tagpro.map[0].length - 10) * 40;

            let altitudeDelta = Math.max(Math.min(1, player.sprite.y / (tagpro.map[0].length * 40)), 0);
            altitudeDelta = isNaN(altitudeDelta) ? 0 : altitudeDelta;

            ocean.volume = altitudeDelta * tagpro.volumeCoefficient;

            if (y > maxY) {
                y = maxY;
            }

            let mapWidth = tagpro.map.length * 40;

            if (x > mapWidth + 200) {
                x = mapWidth + 200;
            } else if (x < -200) {
                x = -200;
            }

            tagpro.renderer.centerContainerToPoint(x, y);
        }
    };

    let imageCache = {};

    let drawGlowTile = function(tileId) {
        let spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = 80;
        spriteCanvas.height = 80;
        let spriteCtx = spriteCanvas.getContext('2d');

        spriteCtx.translate(20, 20);

        if (tileId === 6) { //don't draw glow if empty pup
           spriteCtx.drawImage(tagpro.tiles.image, tagpro.tiles[tileId].x*40, tagpro.tiles[tileId].y*40, 40, 40,  0, 0, 40, 40);

        } else {
            let glowColor;

            if      (tileId === 6.1) glowColor = '#49dfff'; //jj
            else if (tileId === 6.2) glowColor = '#ff9a63'; //rb
            else if (tileId === 6.3) glowColor = '#40ff40'; //tp
            else if (tileId === 9.1) glowColor = '#40ffb0'; //green gate
            else glowColor = '#ffffff';

            spriteCtx.filter = 'brightness(200%) drop-shadow(0px 0px 8px ' + hexToRgbA(glowColor, 0.4) + ') drop-shadow(0px 0px 2px ' + hexToRgbA(glowColor, 0.8) + ')';
            spriteCtx.drawImage(tagpro.tiles.image, tagpro.tiles[tileId].x*40, tagpro.tiles[tileId].y*40, 40, 40,  0, 0, 40, 40);
        }

        spriteCtx.translate(-20, -20);

        imageCache[tileId] = PIXI.Texture.fromCanvas(spriteCanvas);
        PIXI.utils.TextureCache[tileId] = imageCache[tileId];
    };

    drawGlowTile(6.1);
    drawGlowTile(6.2);
    drawGlowTile(6.3);
    drawGlowTile(9.1);

    let drawGlowDynamicTile = function(tileId, xPos, yPos) {
        if (!imageCache[tileId]) {
            drawGlowTile(tileId);
        }

        let sprite = new PIXI.Sprite(imageCache[tileId]);
        sprite.position.x = xPos;
        sprite.position.y = yPos;
        tagpro.renderer.layers.midground.addChild(sprite);

        return sprite;
    };
    
    tagpro.renderer.drawDynamicTile = function(x, y) {
        let tileId = tagpro.map[x][y];
        let tile = tagpro.tiles[tileId];

        if (!tile || tileId <= 2) {
            return;
        }

        let drawPos = { x:x * 40, y:y * 40 };
        let sprite;

        if (tile instanceof PIXI.extras.AnimatedSprite || tile.frameTiles) {
            if (tileId === 6.11 || tileId === 6.21 || tileId === 6.31 || tileId === 6.41) { //respawning
                drawPos.x = drawPos.x - 20;
                drawPos.y = drawPos.y - 20;
            }

            sprite = tagpro.renderer.drawAnimation(tile, drawPos);

        } else if (tile.dynamic) {
            if (tileId === 6 || tileId === 6.1 || tileId === 6.2 || tileId === 6.3 || tileId === 6.4 || tileId === 9.1) {
                sprite = drawGlowDynamicTile(tileId, drawPos.x - 20, drawPos.y - 20);

            } else {
                sprite = tagpro.tiles.draw(tagpro.renderer.layers.midground, tileId, drawPos, 40, 40);
            }

        } else {
            return;
        }

        if (!tagpro.renderer.dynamicSprites[x]) tagpro.renderer.dynamicSprites[x] = {};
        tagpro.renderer.dynamicSprites[x][y] = sprite;
    };

    let tp = tagpro.renderer.particleDefinitions.tagproSparks;
    tp.scale = {
        "start": 0,
        "end": 1.25,
        "minimumScaleMultiplier": 1
    };
    tp.alpha.end = 0.25;
    tp.lifetime.min = 0.15;

    let jukejuice = tagpro.particleDefinitions.playerEmitter;
    jukejuice.scale.start *= 8;
    jukejuice.scale.end *= 8;
    jukejuice.alpha.start = 1;
    jukejuice.alpha.end = 0.5;
    jukejuice.frequency = 0.05;

    let localFlair = { };
    let bossSprite = new PIXI.Sprite.fromImage("./vendor/pirates/chest.png");
    bossSprite.targetPos = {x: 0, y: 0};
    bossSprite.anchor.set(0.5, 0.5);
    bossSprite.pivot.set(0.5, 0.5);

    tagpro.renderer.layers.foreground.addChild(bossSprite);

    let drawMatchFlair = function (matchFlair) {
        if (tagpro.renderer.layers.backgroundDrawn) {
            matchFlair.forEach(function (rawFlair) {
                let flair = decodeFlair(rawFlair);

                let key = flair.id;
                if(!localFlair[key]) localFlair[key] = flair;

                if(!localFlair[key].sprite && !flair.dynamic){
                    let flairKey = "flair-" + flair.info.x + "," + flair.info.y;

                    localFlair[key].sprite = new PIXI.Sprite(tagpro.renderer.getFlairTexture(flairKey, flair.info));
                    localFlair[key].sprite.x = (flair.pos.x * 40) + 20;
                    localFlair[key].sprite.y = (flair.pos.y * 40) + 20;
                    localFlair[key].sprite.anchor.x = 0.5;
                    localFlair[key].sprite.anchor.y = 0.5;

                    if(flair.key === "dragon") {
                        localFlair[key].sprite.scale.x = flair.scale;
                        localFlair[key].sprite.scale.y = flair.scale;
                    }
                    
                    tagpro.renderer.layers.foreground.addChild(localFlair[key].sprite);
                }

                if(localFlair[key].sprite){
                    localFlair[key].pos.x = flair.pos.x;
                    localFlair[key].pos.y = flair.pos.y;

                    localFlair[key].sprite.visible = flair.visible;
                }
            });
        } else {
            setTimeout(drawMatchFlair.bind(undefined, matchFlair), 10);
        }
    };
    tagpro.socket.on("fr", drawMatchFlair);
    tagpro.socket.on("bss", position => {
        const [bossX, bossY] = position;
        bossSprite.targetPos.x = (bossX * 100) + ((bossSprite.width / 2) * eventMapJSON.bossRadius);
        bossSprite.targetPos.y = (bossY * 100) + ((bossSprite.height / 2) * eventMapJSON.bossRadius);
    });

    requestAnimationFrame(renderEventObjects);

    function renderEventObjects() {
        requestAnimationFrame(renderEventObjects);
        Object.keys(localFlair).forEach(key => {
            let local = localFlair[key];

            if(local.sprite){
                local.sprite.x = lerp(local.sprite.x, (local.pos.x * 40) + 20, 0.75);
                local.sprite.y = lerp(local.sprite.y, (local.pos.y * 40) + 20, 0.75);
            }
        });

        bossSprite.x = lerp(bossSprite.x, bossSprite.targetPos.x, 0.6);
        bossSprite.y = lerp(bossSprite.y, bossSprite.targetPos.y, 0.6);

        Object.keys(tagpro.objects).forEach(key => {
            if(!tagpro.objects[key].sprite || tagpro.objects[key].type !== 'marsball') return;
            tagpro.objects[key].sprite.rotation = lerp(
                tagpro.objects[key].sprite.rotation,
                tagpro.objects[key].angle,
                0.04
            );
        });
    }

    eggBallScope();

    tagpro.socket.on("ej", function(json){
        eventMapJSON = json;
    });
});

function eggBallScope() {
    var canvas = tagpro.renderer.canvas;
    var stage = tagpro.renderer.stage;
    var container = tagpro.renderer.gameContainer;
    var lastMousePos = { x: 0, y: 0 };

    stage.interactive = true;

    var stageClick = function(e) {
        var clickPos = {
            x: (e.offsetX * (1 / container.scale.x)) - (container.position.x * (1 / container.scale.x)),
            y: (e.offsetY * (1 / container.scale.y)) - (container.position.y * (1 / container.scale.y))
        };

        tagpro.socket.emit("click", clickPos);
    };

    canvas.addEventListener("click", stageClick);
    stage.on("mousemove", function(e) {
        lastMousePos.x = e.data.global.x;
        lastMousePos.y = e.data.global.y;
    });

    tagpro.events.register({
        keyDown: function(key) {
            if (key !== "space") {
                return;
            }

            stageClick({data: { global: lastMousePos}});
        }
    });

    var getSetting = function(setting) {
        return typeof setting === 'undefined' ? 1 : setting;
    }

    tagpro.world.objectCreators["egg"] = function(object, b2World) {
        if (object.rx === undefined || object.ry === undefined || object.lx === undefined || object.ly === undefined || object.a === undefined)
            return;

        var fixDef = new Box2D.Dynamics.b2FixtureDef(),
            bodyDef = new Box2D.Dynamics.b2BodyDef(),
            RADIUS = 0.23 / 2;

        fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(RADIUS);
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

        fixDef.density = 2.0 * getSetting(eventMapJSON.eggDensity);
        fixDef.friction = 0.5 * getSetting(eventMapJSON.eggFriction);
        fixDef.restitution = 0.6 * getSetting(eventMapJSON.eggBounciness);
        bodyDef.linearDamping = 0.5 * getSetting(eventMapJSON.eggLinearDamping);
        bodyDef.angularDamping = 0.5 * getSetting(eventMapJSON.angularDamping);

        if (object.sensor) {
            fixDef.isSensor = true;
        }

        var body = b2World.CreateBody(bodyDef),
            fixture = body.CreateFixture(fixDef);

        body.SetPosition(new Box2D.Common.Math.b2Vec2(object.rx, object.ry))

        object.x = object.rx * 100;
        object.y = object.ry * 100;

        body.object = object;

        return body;
    };

    tagpro.socket.on("remove-egg", function(id) {
        var objectBody = tagpro.world._objectBodies[id];

        if (!objectBody) return;

        tagpro.world._b2World.DestroyBody(objectBody);
        delete tagpro.world._objectBodies[id];

        if (tagpro.objects[id].sprite) {
            tagpro.objects[id].sprite.parent.removeChild(tagpro.objects[id].sprite);
        }

        delete tagpro.objects[id];
    });

    var oldUpdateMarsball = tagpro.renderer.updateMarsBall.bind(tagpro.updateMarsBall);
    var oldDrawMarsball = tagpro.renderer.drawMarsball.bind(tagpro.renderer);
    var oldcreatePlayerSprite = tagpro.renderer.createPlayerSprite.bind(tagpro.renderer);

    tagpro.renderer.createPlayerSprite = function(player) {
        oldcreatePlayerSprite(player);

        player.sprite.click = function() { };
    };

    tagpro.renderer.updateMarsBall = function(object, position) {
        if (object.type === "egg") {
            position.x = position.x + 15;
            position.y = position.y + 15;
        } else if(object.sprite && object.type === "marsball"){
            position.x = position.x + 40;
            position.y = position.y + 40;
            object.sprite.anchor.set(0.5, 0.5);
        }

        oldUpdateMarsball(object, position);
    };

    tagpro.renderer.drawMarsball = function (object, position) {
        if (object.type === "marsball") {
            return oldDrawMarsball(object, position);
        }

        if (object.type !== "egg") {
            return;
        }

        if (tagpro.spectator) {
            object.draw = true;
        }

        if (object.team === "Red") {
            object.sprite = new PIXI.Sprite.fromImage("./vendor/pirates/cannonball.png");
        }
        else {
            object.sprite = new PIXI.Sprite.fromImage("./vendor/pirates/cannonball.png");
        }

        object.sprite.position.x = position.x;
        object.sprite.position.y = position.y;
        object.sprite.pivot.set(-8, -4);

        tagpro.renderer.layers.foreground.addChild(object.sprite);

        object.sprite.keep = true;
        if (!object.draw) {
            object.sprite.visible = false;
        }
    };

    $("#chatHistory").css("pointer-events", "none");

    $("<style type='text/css'>canvas{cursor: crosshair !important;}</style>").appendTo("head");

    var fireKeys = {
        up: { x: 0, y: -1},
        down: { x: 0, y: 1},
        left: { x: -1, y: 0},
        right: { x: 1, y: 0}
    };

    if(tagpro.keys.space[1] === 8) {
        fireKeys[tagpro.keys.left[1]] = fireKeys.left;
        fireKeys[tagpro.keys.right[1]] = fireKeys.right;
        fireKeys[tagpro.keys.up[1]] = fireKeys.up;
        fireKeys[tagpro.keys.down[1]] = fireKeys.down;

        tagpro.keys.left[1] = 0;
        tagpro.keys.right[1] = 0;
        tagpro.keys.up[1] = 0;
        tagpro.keys.down[1] = 0;
    }

    $(document).keyup(function(e) {
        if (tagpro.disableControls) return;

        var key = fireKeys[e.keyCode];

        if (!key) {
            return;
        }

        tagpro.socket.emit("fire", key);
    });
}

function decodeFlair(flairData) {
    if(flairData[0]){
        return {
            dynamic: true,
            id: flairData[1],
            pos: {
                x: flairData[2],
                y: flairData[3]
            },
            visible: Boolean(flairData[4])
        };
    } else {
        return {
            dynamic: false,
            id: flairData[1],
            pos: {
                x: flairData[2],
                y: flairData[3]
            },
            info: flairData[4],
            visible: Boolean(flairData[5]),
            key: flairData[6],
            scale: flairData[7]
        };
    }
}

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function calculateMusicSeek(){
    let seekValue = Math.max((((3.5 * 60000) - ((tagpro.gameEndsAt - Date.now()))) / 1000) - 2, 0);
    if(tagpro.state === 3) seekValue = 0;

    return seekValue > 220 ? 0 : seekValue;
}

function hexToRgbA(hex, alpha=1) {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        var c = hex.substring(1).split('');
        if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        c = '0x' + c.join('');
        if (!$.isNumeric(alpha) || (alpha < 0) || (alpha > 1)) alpha = 1;
        return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(', ') + ', ' + alpha + ')';
    }
}
