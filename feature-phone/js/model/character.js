define(["model/images"], function (Images) {
    var player = {
        name: "player1",
        sprite: Images.playerShip,
        width: 40,
        height: 55,
        frame: 0,
        score: 0,
        damage: 10,
        guns: 1,
        fireRate: 3,
		hasShot: false,
        hp: 100,
        lives: 3,
        pos: pos = {
            x: 20,
            y: 160
        }
    };
    var enemy = {
        scout: scout = {
            name: "scout",
            ship: Images.scout,
            width: 45,
            height: 50,
            hp: 10,
            alive: true,
            damage: 0,
            fireRate: 0,
            hasShot: false,
            score: 100,
            x: 0,
            y: 0,
            time: 0,
            speed: 7
        },
        fighter: fighter = {
            name: "fighter",
            ship: Images.fighter,
            width: 45,
            height: 55,
            hp: 30,
            alive: true,
            damage: 10,
            fireRate: 3,
            hasShot: false,
            score: 200,
            x: 100,
            y: 100,
            time: 0,
            speed: 3
        },
        interceptor: interceptor = {
            name: "interceptor",
            ship: Images.interceptor,
            width: 45,
            height: 55,
            hp: 30,
            alive: true,
            damage: 10,
            fireRate: 4,
            hasShot: false,
            score: 300,
            x: 100,
            y: 100,
            time: 0,
            speed: 2.5
        },
        tank: tank = {
            name: "tank",
            ship: Images.tank,
            width: 45,
            height: 44,
            hp: 60,
            alive: true,
            damage: 0,
            fireRate: 0,
            hasShot: false,
            score: 300,
            x: 100,
            y: 100,
            time: 0,
            speed: 2
        },
        transport: transport = {
            name: "transport",
            ship: Images.transport,
            width: 45,
            height: 52,
            hp: 30,
            alive: true,
            damage: 0,
            fireRate: 0,
            hasShot: false,
            score: 400,
            x: 100,
            y: 100,
            time: 0,
            speed: 3
        }

    };
    var ship = {
        enemy: enemy,
        player: player
    };
    var Character = {
        ship: ship
    };
    return Character;
});