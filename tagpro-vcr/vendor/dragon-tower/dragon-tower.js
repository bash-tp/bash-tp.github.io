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
            return (tagpro.state == 2) ? (b["s-returns"] - a["s-returns"]) : (b["s-captures"] - a["s-captures"]); // if game is finished, max altitude, otherwise altitude
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
            .append($("<source>", { src : "./vendor/dragon-tower/"+filename+".mp3", type : "audio/mp3"}))
            .append($("<source>", { src : "./vendor/dragon-tower/"+filename+".ogg", type : "audio/ogg"}))
            .append($("<source>", { src : "./vendor/dragon-tower/"+filename+".m4a", type : "audio/m4a"})));
    };
    let completedSounds = ["jump", "explosion", "powerup", "burst", "pop", "teleport"];
    for (let i = 0; i < completedSounds.length; i++) {
        let sound = completedSounds[i];
        createBirthdayAudio(sound);
    }
    assets.find("#particle").attr("src", "./vendor/dragon-tower/particle.png");
    assets.find("#particleFire").attr("src", "./vendor/dragon-tower/particle.png");
    $("div#musicInfo")
     .removeClass("hide")
     .text("Music: Ascension")
     .attr("id", "disableHidding");
});

tagpro.ready(function () {
    tagpro.ui.scoreXOffset = 80;
    tagpro.particleDefinitions.gravityWell.color.start = "#ffffff";
    tagpro.particleDefinitions.gravityWell.color.end = "#ffffff";
    let music = $("#eventmusic").get(0);

    setTimeout(function() {
        tagpro.musicPlayer.disable();
        music = $("#eventmusic").get(0);
        music.volume = tagpro.volumeCoefficient * 0.8;
        music.currentTime = calculateMusicSeek();
        music.play();
        tagpro.musicPlayer.refreshVolume = function () {
            music.volume = tagpro.volumeCoefficient * 0.8;
        };

        setTimeout(() => {
            music = $("#eventmusic").get(0);
            music.currentTime = calculateMusicSeek();
            music.play();
            handleMuteToggle();
        }, 300);
        handleMuteToggle();
    }, 100);

    $("#soundMusic").click(handleMuteToggle);

    function handleMuteToggle() {
        let mute = $("#soundMusic").hasClass("off");

        if(mute) {
            music.pause();
        } else {
            music.play();
        }
    }

    tagpro.renderer.updateCameraPosition = function (player) {
        if (player.sprite.x !== -1000 && player.sprite.y !== -1000) {
            let x = player.sprite.x + 19, y = player.sprite.y + 19;
            let maxY = tagpro.map[0].length * 40;

            if (y > maxY) {
                y = maxY ;
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

        if (tileId == 6) { //don't draw glow if empty pup
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
            if (tileId == 6.11 || tileId == 6.21 || tileId == 6.31 || tileId == 6.41) { //respawning
                drawPos.x = drawPos.x - 20;
                drawPos.y = drawPos.y - 20;
            }

            sprite = tagpro.renderer.drawAnimation(tile, drawPos);

        } else if (tile.dynamic) {
            if (tileId == 6 || tileId == 6.1 || tileId == 6.2 || tileId == 6.3 || tileId == 6.4 || tileId == 9.1) {
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

    let drawMatchFlair = function (matchFlair) {
        // console.log(matchFlair);
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

    requestAnimationFrame(renderFlairs);

    function renderFlairs() {
        requestAnimationFrame(renderFlairs);
        Object.keys(localFlair).forEach(key => {
            let local = localFlair[key];

            local.sprite.x = lerp(local.sprite.x, (local.pos.x * 40) + 20, 0.75);
            local.sprite.y = lerp(local.sprite.y, (local.pos.y * 40) + 20, 0.75);
        });
    }
});

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
