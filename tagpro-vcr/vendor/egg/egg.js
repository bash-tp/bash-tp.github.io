"use strict";

tagpro.loadAssets({
    "tiles": "vendor/textures/musclescupgradients/tiles.png",
    "splats": "vendor/egg/splats.png"
});


tagpro.ready(function() {
    tagpro.renderer.options.disableViewportScaling = false;

    var stage = tagpro.renderer.stage;
    var container = tagpro.renderer.gameContainer;
    var lastMousePos = { x: 0, y: 0 };
    var gameState = null;
    var eggHolder = null;

    stage.interactive = true;

    stage.click = function(e) {
        var clickPos = {
            x: (e.data.global.x * (1 / container.scale.x)) - (container.position.x * (1 / container.scale.x)),
            y: (e.data.global.y * (1 / container.scale.y)) - (container.position.y * (1 / container.scale.y))
        };

        tagpro.socket.emit("click", clickPos);
    };

    stage.mousemove = function(e) {
        lastMousePos.x = e.data.global.x;
        lastMousePos.y = e.data.global.y;
    };

    tagpro.renderer.updateCameraPosition = function (player) {
        if (player.sprite.x !== -1000 && player.sprite.y !== -1000) {
            tagpro.renderer.centerContainerToPoint(player.sprite.x + 19, (10 * 40));
        }
    };

    tagpro.events.register({
        playerControls: function(player, body, velocity) {
            if (gameState !== "play") {
                return;
            }

            if (player.left && velocity.x > -player.ms) velocity.x -= player.ac;
            if (player.right && velocity.x < player.ms) velocity.x += player.ac;
            if (player.up && velocity.y > -player.ms) velocity.y -= player.ac;
            if (player.down && velocity.y < player.ms) velocity.y += player.ac;
        },
        modifyScoreUI: function($table) {
            $table.find("th, td")
                .hide()
                .filter(":nth-child(1), :nth-child(8), :nth-child(14)").show();
        },
    });

    var realUpdatePlayerPowerUps = tagpro.renderer.updatePlayerPowerUps;

    tagpro.renderer.updatePlayerPowerUps = function (player, context, drawPos) {
        realUpdatePlayerPowerUps(player, context, drawPos);

        if (!player.sprites.egg) {
            player.sprites.egg = new PIXI.Sprite.fromImage("vendor/egg/egg.png");
            player.sprites.egg.width = 23;
            player.sprites.egg.height = 23;
            player.sprites.egg.x = 8;
            player.sprites.egg.y = 8;

            player.sprite.addChild(player.sprites.egg);
        }

        player.sprites.egg.alpha = eggHolder === player ? 1 : 0;
    };

    const eggTeam = new PIXI.Sprite.fromImage("vendor/egg/egg.png");

    eggTeam.width = 23 * 1.25;
    eggTeam.height = 23 * 1.25 ;
    eggTeam.anchor.x = 0.5;
    eggTeam.anchor.y = 0.5;
    eggTeam.alpha = 0.75;

    eggTeam.visible = false;

    tagpro.renderer.layers.ui.addChild(eggTeam);

    tagpro.socket.on("eggBall", function(data) {
        gameState = data.state;
        eggHolder = tagpro.players[data.holder];
        updateTeamWithEgg();
    });

    function updateTeamWithEgg() {
        if (!tagpro.ui.sprites["yellowFlagTakenByRed"]) {
            return setTimeout(updateTeamWithEgg.bind(this), 50);
        }

        if (!eggHolder) {
            eggTeam.visible = false;
        }
        else {
            eggTeam.visible = true;

            if (eggHolder.team === 1) {
                const pos = tagpro.ui.sprites["yellowFlagTakenByRed"];
                eggTeam.x = pos.x;
                eggTeam.y = pos.y;
            }
            else {
                const pos = tagpro.ui.sprites["yellowFlagTakenByBlue"];
                eggTeam.x = pos.x;
                eggTeam.y = pos.y;
            }
        }
    }

    const raptorSprites = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(function(i) {
        var raptorSprite = new PIXI.Sprite.fromImage("vendor/egg/raptor" + i + ".png");

        raptorSprite.visible = false;

        tagpro.renderer.layers.ui.addChild(raptorSprite);

        return raptorSprite;
    });

    tagpro.renderer.afterDrawBackground = function() {
        const fieldSprite = new PIXI.Sprite.fromImage("vendor/egg/field.png");

        fieldSprite.x = 40;
        fieldSprite.y = 40;

        tagpro.renderer.layers.foreground.addChildAt(fieldSprite, 0);
    };

    tagpro.socket.on("boat", function(id) {
        var raptorSprite = raptorSprites[id];

        if (raptorSprite.visible) {
            return;
        }

        tagpro.renderer.layers.ui.removeChild(raptorSprite);
        tagpro.renderer.layers.ui.addChild(raptorSprite);

        raptorSprite.x = tagpro.renderer.renderer.width;
        raptorSprite.y = tagpro.renderer.renderer.height - raptorSprite.height;
        raptorSprite.visible = true;

        function moveRaptor() {
            raptorSprite.x -= 5;

            if (raptorSprite.x < -raptorSprite.width) {
                raptorSprite.visible = false;
                return;
            }

            setTimeout(moveRaptor, 1000 / 60);
        }

        moveRaptor();
    });

    tagpro.world.objectCreators["egg"] = function(object, b2World) {
        if (object.rx == undefined || object.ry == undefined || object.lx == undefined || object.ly == undefined || object.a == undefined)
            return;

        var fixDef = new Box2D.Dynamics.b2FixtureDef(),
            bodyDef = new Box2D.Dynamics.b2BodyDef(),
            RADIUS = 0.23 / 2;

        fixDef.density = 2.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.6;
        fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(RADIUS);
        fixDef.filter.categoryBits = 1 << 4;
        fixDef.filter.maskBits = 1 << 3;

        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.linearDamping = 0.75;
        bodyDef.angularDamping = 0.5;

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
        if (object.type == "egg") {
            position.x = position.x + 20;
            position.y = position.y + 20;
        }

        oldUpdateMarsball(object, position);
    };

    tagpro.renderer.drawMarsball = function (object, position) {
        if (object.type == "marsball") {
            return oldDrawMarsball(object, position);
        }

        if (object.type !== "egg") {
            return;
        }

        if (tagpro.spectator) {
            object.draw = true;
        }

        object.sprite = new PIXI.Sprite.fromImage("vendor/egg/egg.png");
        object.sprite.position.x = position.x;
        object.sprite.position.y = position.y;
        object.sprite.width = 23;
        object.sprite.height = 23;
        object.sprite.pivot.set(-8, -8);

        tagpro.renderer.layers.foreground.addChild(object.sprite);

        object.sprite.keep = true;
        if (!object.draw) {
            object.sprite.visible = false;
        }
    };

    //$("#chatHistory").css("pointer-events", "none");
    //$("<style type='text/css'>canvas{cursor: crosshair !important;}</style>").appendTo("head");

});

