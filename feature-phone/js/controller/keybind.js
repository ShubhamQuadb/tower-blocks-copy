define(["mousetrap", "controller/action", "model/character", "model/game", "controller/gameRunner", "controller/gameLogic", "model/sounds"], function (Mousetrap, Action, Character, Game, GameRunner, GameLogic, Sounds) {
    console.log("=== Keybind initialized - KaiOS Support ===");
    
    //shooting and menu actions - SPACE and 5 (KaiOS)
    Mousetrap.bind(['space', '5', 'enter'], function () {
        console.log("ACTION keydown (space/5/enter) - Screen:", Game.screen);
        
        // Main menu - start game directly (no mouse needed!)
        if (Game.screen === "main_menu") {
            console.log("✓ Starting game from main menu (5 button pressed)");
            if (!Game.muteSFX) {
                Sounds.select.play();
            }
            Game.screen = "game";
            Action.resetVariables();
            GameLogic.level.start();
            console.log("✓ Game started successfully!");
        } 
        // Game over - return to main menu
        else if (Game.screen === "game_over") {
            console.log("✓ Returning to main menu from game over (5 button pressed)");
            if (!Game.muteSFX) {
                Sounds.select.play();
            }
            Action.resetVariables();
            Game.screen = "main_menu";
            Game.gameOver = false;
            console.log("✓ Returned to main menu!");
        }
        // In game - shoot
        else {
            Action.mouseClicked(true, true);
            Game.keyboard.use = true;
        }
    }, 'keydown');
    Mousetrap.bind(['space', '5', 'enter'], function () {
        console.log("ACTION keyup (space/5/enter)");
        // Only handle keyup for shooting in game
        if (Game.screen === "game") {
            Action.mouseClicked(false, true);
            Game.keyboard.use = true;
        }
    }, 'keyup');
    
    //directions - ARROW KEYS and NUMPAD (KaiOS - REVERSED: 2=UP, 8=DOWN)
    // UP - Arrow Up and 2 (reversed for KaiOS)
    Mousetrap.bind(['up', '2'], function () {
        console.log("UP pressed (arrow/2)");
        Game.keyboard.up = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind(['up', '2'], function () {
        Game.keyboard.up = false;
        Game.keyboard.use = true;
    }, 'keyup');
    
    // DOWN - Arrow Down and 8 (reversed for KaiOS)
    Mousetrap.bind(['down', '8'], function () {
        console.log("DOWN pressed (arrow/8)");
        Game.keyboard.down = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind(['down', '8'], function () {
        Game.keyboard.down = false;
        Game.keyboard.use = true;
    }, 'keyup');
    
    // LEFT - Arrow Left and 4
    Mousetrap.bind(['left', '4'], function () {
        console.log("LEFT pressed (arrow/4)");
        Game.keyboard.left = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind(['left', '4'], function () {
        Game.keyboard.left = false;
        Game.keyboard.use = true;
    }, 'keyup');
    
    // RIGHT - Arrow Right and 6
    Mousetrap.bind(['right', '6'], function () {
        console.log("RIGHT pressed (arrow/6)");
        Game.keyboard.right = true;
        Game.keyboard.use = true;
    }, 'keydown');
    Mousetrap.bind(['right', '6'], function () {
        Game.keyboard.right = false;
        Game.keyboard.use = true;
    }, 'keyup');
    
    //other
    Mousetrap.bind('p', function () {
        GameRunner.pauseGame();
        Game.screenTooSmall = false;
    });
    
    console.log("=== Keybind ready - Controls: 2=UP, 8=DOWN, 4=LEFT, 6=RIGHT, 5=SHOOT ===");
});