define(["model/sounds", "model/images", "model/canvas", "model/character", "model/game", "view/draw", "controller/listener", "controller/action", "controller/keybind", "controller/gameRunner", "controller/localStorageManager"],
    function (Sounds, Images, Canvas, Character, Game, Draw, Listener, Action, Keybind, GameRunner, LSM) {
        // Make Game and Sounds globally accessible for MenuUI
        window.Game = Game;
        window.Sounds = Sounds;
        
        // JioGames SDK Integration
        console.log("Space Battle: Initializing JioGames SDK...");
        
        // Get user profile on game initialization
        // if (typeof getUserProfile === 'function') {
        //     getUserProfile();
        //     console.log("Space Battle: getUserProfile() called");
        // }
        
        // Cache ads on game initialization
        // if (typeof gameCacheAd === 'function') {
        //     gameCacheAd();
        //     console.log("Space Battle: gameCacheAd() called - Ads caching started");
        // }
        
        LSM.init();
        LSM.load();
        if (!Game.muteMusic && window.requestAnimationFrame !== undefined) {
            Game.musicCreated = true;
            Sounds.bgMusic.play();
        }
        Game.getScreen();
        Game.addStars();
        GameRunner.gameLoop();
    });