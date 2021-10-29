tagpro.loadAssets = () => { };

(function(){
    var normalTiles = null,
        customSplats = null,
        killedJimmys = [],
        chaseTargets = {
        };
        lifeStatuses = {
        };
        killedAtTime = {
        };
        killedAtCoords = {
        };


    tagpro.ready(function() {
        normalTiles = $("#tiles").get(0);
        $("#options > table:first tr:first").append("<th>zombie?</th>");
        $("#options").find("th:nth-child(12)").text("Pumpkins");
        $("div#musicInfo")
            .removeClass("hide")
            .text("Music: Evening of Chaos by Kevin MacLeod")
            .attr("id", "disableHidding");
        setTimeout(function() {
            tagpro.musicPlayer.disable();
            var music = $("#eventmusic").get(0);
            music.volume = tagpro.volumeCoefficient;
            music.play();
            tagpro.musicPlayer.refreshVolume = function () {
                music.volume = tagpro.volumeCoefficient;
            };
        });

        tagpro.socket.on("chasing", function(data) {
            chaseTargets[data.eyeId] = data;
            lifeStatuses[data.eyeId] = "alive";
            killedAtTime[data.eyeId] = false;
        });

        tagpro.socket.on("JimmyDying", function(data) {
            chaseTargets[data.eyeId] = null;
            lifeStatuses[data.eyeId] = "dying";
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
            lifeStatuses[data.eyeId] = "dead";
        });

        var realUpdateMarsBall = tagpro.renderer.updateMarsBall;

        tagpro.renderer.updateMarsBall = function (object, position) {
            if (lifeStatuses[object.id] === "alive") {
                realUpdateMarsBall(object, position);

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
            }
            else if (lifeStatuses[object.id] === "dying") {
                var objectBody = tagpro.world._objectBodies[object.id];
                var scale = 1.5 - 1.5*(Date.now() - killedAtTime[object.id])/ 3100;
                var posFactor = - 0.5 + (1.5*(Date.now() - killedAtTime[object.id])/ 3000);
                var newPos = {
                    x: killedAtCoords[object.id].accurate.x + killedAtCoords[object.id].diff.x*posFactor,
                    y: killedAtCoords[object.id].accurate.y + killedAtCoords[object.id].diff.y*posFactor
                }
                if (scale < 1) {
                    tagpro.objects[object.id].sprite.scale.x = scale;
                    tagpro.objects[object.id].sprite.scale.y = scale;
                }
                if (posFactor > 0) {
                    tagpro.objects[object.id].sprite.x = newPos.x
                    tagpro.objects[object.id].sprite.y = newPos.y
                }

            }
            else if (lifeStatuses[object.id] === "dead") {
                if (!killedJimmys.includes(object.id)) {
                    killedJimmys.push(object.id);
                    // var grav = {x: object.x, y: object.y};
                    // tagpro.world.createGravityWell(grav.x, grav.y);
                    // tagpro.renderer.createGravityWellEmitter(grav.x + 20, grav.y + 20);

                    // Destroy object
                    tagpro.renderer.layers.overlay.removeChild(object.nameSprite);
                    delete object.nameSprite;
                    var objectBody = tagpro.world._objectBodies[object.id];

                    if (!objectBody) return;
            
                    tagpro.world._b2World.DestroyBody(objectBody);
                    delete tagpro.world._objectBodies[object.id];
            
                    if (tagpro.objects[object.id].sprite) {
                        tagpro.objects[object.id].sprite.parent.removeChild(tagpro.objects[object.id].sprite);
                    }
            
                    delete tagpro.objects[object.id];
                }
            }
        };
    });

    tagpro.events.register({
        drawPlayer: function(player, context, drawPos, TILESIZE) {
            if (!player.infected) {
                var drawWidth = 40 * (1 / tagpro.zoom),
                    drawHeight = 40 * (1 / tagpro.zoom);

                context.drawImage(normalTiles, 40 * 14, 0, 40, 40, drawPos.x, drawPos.y, drawWidth, drawHeight);
            }
            else
                tagpro.tiles.drawWithZoom(context, player.team == 1 ? "redball" : "blueball", drawPos);

            if (player.bomb && Math.round(Math.random() * 4) == 1) {
                context.fillStyle = "rgba(255, 255, 0, .50)";
                context.beginPath();
                context.arc(drawPos.x + (TILESIZE / 2) * (1 / tagpro.zoom), drawPos.y + (TILESIZE / 2) * (1 / tagpro.zoom), 20  * (1 / tagpro.zoom), 0, Math.PI*2, true);
                context.closePath();
                context.fill();
            };

            if (player.tagpro) {
                context.strokeStyle = "#00FF00";
                context.fillStyle = "rgba(0, 255, 0, .25)";
                context.lineWidth = 3 * (1 / tagpro.zoom);
                context.beginPath();
                context.arc(drawPos.x + (TILESIZE / 2) * (1 / tagpro.zoom), drawPos.y + (TILESIZE / 2) * (1 / tagpro.zoom), 20  * (1 / tagpro.zoom), 0, Math.PI*2, true);
                context.closePath();
                if (!player.bomb)
                    context.fill();
                context.stroke();
            }
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
        }
    });


})();

