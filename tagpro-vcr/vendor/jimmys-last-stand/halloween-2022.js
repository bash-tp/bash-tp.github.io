tagpro.loadAssets = () => {};

(function(){
    var normalTiles = null,
        customSplats = null,
        killedJimmys = [],
        chaseTargets = {
        };
        killedAtTime = {
        };
        killedAtCoords = {
        };
        lasers = {
        };
        stops = {

        };
        jumps = {

        };

    var localFlair = { };

    tagpro.ready(function() {
        normalTiles = $("#tiles").get(0);
        $("#options > table:first tr:first").append("<th>zombie?</th>");
        $("#options").find("th:nth-child(12)").text("Pumpkins");

        tagpro.spectatorGlobalSounds.push(
            "zombie1",
            "zombie2",
            "zombie3",
            "zombie4",
            "eventmusic",
            "fallland",
            "fire",
            "laserfinish",
            "magic",
            "lol",
            "fall",
            "win",
            "bling"
        );

        setTimeout(function() {
            tagpro.musicPlayer.disable();
        });

        tagpro.world.objectCreators["cannonBall"] = function(object, b2World) {
            if (object.rx == undefined || object.ry == undefined || object.lx == undefined || object.ly == undefined || object.a == undefined)
                return;

            var fixDef = new Box2D.Dynamics.b2FixtureDef(),
                bodyDef = new Box2D.Dynamics.b2BodyDef(),
                RADIUS = 0.20 / 2;

            fixDef.density = 0.0;
            fixDef.friction = 0.0;
            fixDef.restitution = 0.0;
            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(RADIUS);
            fixDef.isSensor = true;

            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            bodyDef.linearDamping = 0.0;
            bodyDef.angularDamping = 0.0;

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

        tagpro.socket.on("chasing", function(data) {
            chaseTargets[data.eyeId] = data;
            killedAtTime[data.eyeId] = false;
        });

        tagpro.socket.on("laser", function(data) {
            lasers[data.eyeId] = data;

            let state = 1;

            const maxSpread = data.maxSpread;
            const spreadOver = data.spreadOver;
            let alphaMod = 0.25;

            const spreadOverFrames = (spreadOver / 1000) * 60
            const angleStep = maxSpread / spreadOverFrames;

            const fromPoint = {
                x: (data.fromPoint.x * 100) + 15,
                y: (data.fromPoint.y * 100) + 15
            }

            const targetPoint = {
                x: (data.targetPoint.x * 100) + 15,
                y: (data.targetPoint.y * 100) + 15
            }

            const rotatedPoint1 = {
                x: (data.targetPoint.x * 100) + 15,
                y: (data.targetPoint.y * 100) + 15,
                angle: 0,
                angleStep: angleStep
            }

            const rotatedPoint2 = {
                x: (data.targetPoint.x * 100) + 15,
                y: (data.targetPoint.y * 100) + 15,
                angle: 0,
                angleStep: -angleStep
            }

            const sprite = new PIXI.Graphics();
            tagpro.renderer.layers.foreground.addChild(sprite);

            const draw = () => {
                sprite.clear();

                sprite.lineStyle(5, 0xFF0000, 1 * alphaMod);
                sprite.beginFill(0xFF0000, 0.25 * alphaMod);
                sprite.moveTo(fromPoint.x, fromPoint.y);
                sprite.lineTo(rotatedPoint1.x, rotatedPoint1.y);
                sprite.lineTo(rotatedPoint2.x, rotatedPoint2.y);
                sprite.lineTo(fromPoint.x, fromPoint.y);
                sprite.endFill();
            }

            draw();

            const rotate = (cx, cy, x, y, angle) => {
                var radians = (Math.PI / 180) * angle,
                    cos = Math.cos(radians),
                    sin = Math.sin(radians),
                    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
                return [nx, ny];
            }

            const widenInterval = setInterval(() => {
                if (state !== 1) {
                    return clearInterval(widenInterval);
                }

                for (let point of [rotatedPoint1, rotatedPoint2]) {
                    point.angle += point.angleStep;

                    let [x, y] = rotate(fromPoint.x, fromPoint.y, targetPoint.x, targetPoint.y, point.angle);

                    point.x = x;
                    point.y = y;
                }

                draw();
            }, 1000 / 60);

            setTimeout(() => {
                alphaMod = 1;

                setTimeout(() => {
                    tagpro.renderer.layers.foreground.removeChild(sprite);
                    state = 2;
                }, 150);
            }, spreadOver - 150);
        });

        tagpro.socket.on("stop", (data) => {
            stops[data.eyeId] = true;
        });

        let musicPlaying = false;

        function turnDownMusic() {
            const music = $("#eventmusic").get(0);
            const volume = music.volume;
            const turnDownTick = volume / 120;

            const turnDownForWhat = () => {
                let newVol = music.volume - turnDownTick;

                if (newVol <= 0) {
                    newVol = 0;
                    music.pause();
                    clearInterval(turnDownInterval);
                }

                music.volume = newVol;
            }

            const turnDownInterval = setInterval(turnDownForWhat, 1 / 60);
        }

        tagpro.socket.on("jump", (data) => {
            const jump = jumps[data.eyeId] = data;

            if (jump.start) {
                jump.scale = 1;

                if (jump.final) {
                    turnDownMusic();
                }

                const jumpInterval = setInterval(() => {
                    if (jump.end || jump.hide) {
                        clearInterval(jumpInterval);
                    }

                    if (jump.scale <= 10) {
                        jump.scale += 0.15;
                    }
                    else {
                        jump.hide = true;
                    }
                }, 1000 / 60);
            }

            if (jump.end) {
                jump.scale = 10;

                const fallInterval = setInterval(() => {
                    if (jump.scale >= 1) {
                        jump.scale -= 0.15;
                    }

                    if (jump.scale < 1) {
                        if (!jump.final) {
                            jump.scale = 1;

                            clearInterval(fallInterval);

                            if (!musicPlaying) {
                                var music = $("#eventmusic").get(0);
                                music.volume = tagpro.volumeCoefficient;
                                music.play();
                                musicPlaying = true;
                            }

                            delete jumps[data.eyeId];
                        }
                        else {
                            drawHole();

                            jump.scale -= 0.005;

                            if (jump.scale <= 0.05) {
                                jump.scale = 0;

                                clearInterval(fallInterval);
                            }
                        }
                    }

                    if (jump.scale <= 10) {
                        jump.hide = false;
                    }
                }, 1000 / 60);
            }
        });

        tagpro.socket.on("shoot", (data) => {
            return;

            for (const cannonBall of data.cannonBalls) {
                const sprite = new PIXI.Graphics();
                tagpro.renderer.layers.foreground.addChild(sprite);

                sprite.anchor = { x: 0.5, y: 0.5 };
                sprite.lineStyle(1, 0xFF0000, 1);
                sprite.beginFill(0xFF0000, 0.25);
                sprite.drawCircle(cannonBall.x * 100 + 20, cannonBall.y * 100 + 20, 10);
                sprite.endFill();

                setTimeout(() => {
                    tagpro.renderer.layers.foreground.removeChild(sprite);
                }, 2000);
            }
        });

        tagpro.socket.on("remove-cannonBall", function(id) {
            var objectBody = tagpro.world._objectBodies[id];

            if (!objectBody) return;

            tagpro.world._b2World.DestroyBody(objectBody);
            delete tagpro.world._objectBodies[id];

            if (tagpro.objects[id].sprite) {
                tagpro.objects[id].sprite.parent.removeChild(tagpro.objects[id].sprite);
            }

            delete tagpro.objects[id];
        });

        tagpro.socket.on("shake", function(id) {
            $("canvas").addClass("shake");

            setTimeout(() => {
                $("canvas").removeClass("shake");
            }, 250);
        });


        tagpro.socket.on("drawFinalLaser", function(data) {
            const sprite = new PIXI.Graphics();
            tagpro.renderer.layers.foreground.addChild(sprite);

            sprite.clear();

            sprite.lineStyle(5, 0xFFFF00, 1);
            sprite.beginFill(0xFFFF00, 0.25);
            sprite.moveTo(data[0][0] * 100 + 15, data[0][1] * 100 + 15);
            sprite.lineTo(data[1][0] * 100 + 15, data[1][1] * 100 + 15);
            sprite.lineTo(data[2][0] * 100 + 15, data[2][1] * 100 + 15);
            sprite.lineTo(data[0][0] * 100 + 15, data[0][1] * 100 + 15);
            sprite.endFill();

            setTimeout(() => {
                tagpro.renderer.layers.foreground.removeChild(sprite);
            }, 10000);
        });

        tagpro.socket.on("JimmyDying", function(data) {
            chaseTargets[data.eyeId] = null;
            killedAtTime[data.eyeId] = Date.now();
            killedAtCoords[data.eyeId] = {
                accurate: {
                    x: data.accurateCoords.x - 20,
                    y: data.accurateCoords.y - 20
                },
                tile: {
                    x: data.tileCoords.x + 20,
                    y: data.tileCoords.y + 20
                },
                diff: {
                    x: data.tileCoords.x + 40 - data.accurateCoords.x,
                    y: data.tileCoords.y + 40 - data.accurateCoords.y
                }
            };

        });

        tagpro.socket.on("killedJimmy", function(data) {
            chaseTargets[data.eyeId] = null;
        });

        var realUpdateMarsBall = tagpro.renderer.updateMarsBall;

        tagpro.renderer.updateMarsBall = function (object, position) {
            if (object.type === "cannonBall") {
                return updateCannonBall(object, position);
            }

            realUpdateMarsBall(object, position);

            object.sprite.anchor = { x: 0.5, y: 0.5 };
            object.sprite.x += 40;
            object.sprite.y += 40;

            const jump = jumps[object.id];

            if (jump) {
                const container = object.sprite.parent;
                const childLength = container.children.length;

                container.setChildIndex(object.sprite, childLength - 1);

                object.sprite.scale.x = jump.scale;
                object.sprite.scale.y = jump.scale;
                object.sprite.visible = !jump.hide;
                /*
                if (jump.start) {
                    if (object.sprite.scale.x >= 10) {
                        object.sprite.visible = false;
                    } else {
                        object.sprite.scale.x += 0.3;
                        object.sprite.scale.y += 0.3;
                    }
                }

                if (jump.end) {
                    object.sprite.visible = true;

                    if (object.sprite.scale.x <= 1) {
                        object.sprite.scale.x = 1;
                        object.sprite.scale.y = 1;
                        jump.end = false;
                    } else {
                        object.sprite.scale.x -= 0.3;
                        object.sprite.scale.y -= 0.3;
                    }
                }

                 */
            }

            /*
            if (!object.nameSprite) {
                object.nameSprite = tagpro.renderer.veryPrettyText("Jimmywise", "#BFFF00");
                tagpro.renderer.layers.overlay.addChild(object.nameSprite);

                //object.degreeSprite = tagpro.renderer.veryPrettyText("361°");
                //tagpro.renderer.layers.overlay.addChild(object.degreeSprite);
            }

            object.nameSprite.x = position.x - 15 + 45;
            object.nameSprite.y = position.y - 25;
            object.nameSprite.visible = object.sprite.visible;

            //object.degreeSprite.x = position.x + 40 + 45;
            //object.degreeSprite.y = position.y - 13;
            //object.degreeSprite.visible = object.sprite.visible;

             */

        };

        function updateCannonBall(object, position) {
            if (!object.sprite) {
                //const sprite = object.sprite = new PIXI.Sprite()
                const sprite = object.sprite = PIXI.Sprite.from('vendor/jimmys-last-stand/zombieball.png');
                //PIXI.Sprite.fromImage()

                tagpro.renderer.layers.foreground.addChild(sprite);

                sprite.anchor = { x: 0.5, y: 0.5 };
            }

            object.sprite.position.x = object.x + 20;
            object.sprite.position.y = object.y + 20;
            object.sprite.rotation += 0.01;

            /*
            object.sprite.clear();
            object.sprite.lineStyle(1, 0x000000, 1);
            object.sprite.beginFill(0xE0E0E0, 1.0);
            object.sprite.drawCircle(object.x + 20, object.y + 20, 10);
            object.sprite.endFill();
             */
        }

        let hole = null;

        function drawHole() {
            if (hole) {
                return;
            }

            const sprite = hole = PIXI.Sprite.from('vendor/jimmys-last-stand/hole.png');

            tagpro.renderer.layers.background.addChild(sprite);

            sprite.position.x = (21 * 40) - 120;
            sprite.position.y = (13 * 40) - 120;
        }

        var drawMatchFlair = function (matchFlair) {
            if (tagpro.renderer.layers.backgroundDrawn) {
                matchFlair.forEach(function (flair) {
                    var key = flair.pos.x + "," + flair.pos.y,
                        flairKey = "flair-" + flair.info.x + "," + flair.info.y,
                        local = localFlair[key];

                    if (!local) {
                        local = localFlair[key] = JSON.parse(JSON.stringify(flair));
                        local.sprite = new PIXI.Sprite(tagpro.renderer.getFlairTexture(flairKey, flair.info));
                        local.sprite.x = (flair.pos.x * 40) + 20;
                        local.sprite.y = (flair.pos.y * 40) + 20;
                        local.sprite.anchor.x = 0.5;
                        local.sprite.anchor.y = 0.5;
                        tagpro.renderer.layers.foreground.addChild(local.sprite);
                    }

                    local.sprite.visible = flair.visible;
                });
            } else {
                setTimeout(drawMatchFlair.bind(undefined, matchFlair));
            }
        };

        tagpro.socket.on("flair", drawMatchFlair);
    });

    tagpro.events.register({
        afterDrawPlayer: function(player, context, drawPos, TILESIZE) {
            player.tagpro = player.helpfulGhost;
            tagpro.renderer.updateTagpro(player)
        },
        sortPlayers: function(players) {
            players.sort(function(a, b){
                return b["s-powerups"] - a["s-powerups"];
            });
        },
        modifyScoreUI: function($table) {
            $table.find("th, td")
                .hide()
                .filter(":nth-child(1), :nth-child(14), :nth-child(12)").show();
            $table.find("tr:gt(0):not(.template)").each(function() {
                $this = $(this);
                var player = $this.data("model");
                if (player) {
                    $this.append("<td>" + (player.infected ? "zombie" : "") + "</td>");
                }
            });
        },
        objectUpdate: function(b2World, object, body) {
            const stop = stops[object.eyeId];

            if (stop) {
                stops[object.eyeId] = false;
                body.SetLinearVelocity({ x: 0, y: 0 });
                return;
            }

            const jump = jumps[object.eyeId];
            const chase = chaseTargets[object.id];

            if (!chase || !chase.id) {
                return;
            }

            var eyePos = body.GetPosition(),
                chasePlayer = tagpro.players[chase.id];

            if (!chasePlayer) {
                return;
            }

            var direction = new Box2D.Common.Math.b2Vec2(chasePlayer.rx, chasePlayer.ry);

            direction.Subtract(eyePos);
            direction.Normalize();
            direction.Multiply(chase.speed);

            body.ApplyImpulse(direction, body.GetWorldCenter());
        },
        playerUpdate: function(player, body) {
            if (player.isGhost && !player._initGhost) {
                player._initGhost = true;

                const fixture = body.GetFixtureList();
                const filter = fixture.GetFilterData();

                filter.categoryBits = 0;
                filter.maskBits = 0;

                fixture.SetFilterData(filter);
            }
        }
    });

    $(document).ready(function() {
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
        canvas.shake {
          animation: shake 0.5s;
          animation-iteration-count: infinite;
        }
        
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }    
    `;
        document.head.append(shakeStyle);
    });


})();

