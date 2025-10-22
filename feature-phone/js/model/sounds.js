define(["howler"], function (Howler) {
    // Safe sound wrapper to prevent errors
    function createSafeSound(config) {
        try {
            var sound = new Howl(config);
            var originalPlay = sound.play.bind(sound);
            var originalPause = sound.pause.bind(sound);
            var originalMute = sound.mute.bind(sound);
            var originalUnmute = sound.unmute.bind(sound);
            
            sound.play = function() {
                try {
                    var playPromise = originalPlay();
                    
                    // Handle Promise properly (as recommended by Google)
                    if (playPromise !== undefined) {
                        playPromise.then(function() {
                            // Playback started successfully
                        }).catch(function(error) {
                            // Auto-play was prevented or interrupted
                            // Silently ignore (expected in local testing due to CORS)
                            if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                                console.log("Sound play error:", error.name);
                            }
                        });
                    }
                    
                    return playPromise;
                } catch(e) {
                    console.log("Sound play failed (expected in local testing):", e.message);
                    return Promise.resolve();
                }
            };
            
            sound.pause = function() {
                try {
                    return originalPause();
                } catch(e) {
                    return null;
                }
            };
            
            sound.mute = function() {
                try {
                    return originalMute();
                } catch(e) {
                    return null;
                }
            };
            
            sound.unmute = function() {
                try {
                    return originalUnmute();
                } catch(e) {
                    return null;
                }
            };
            
            return sound;
        } catch(e) {
            console.log("Sound creation failed (expected in local testing)");
            return {
                play: function() {},
                pause: function() {},
                mute: function() {},
                unmute: function() {}
            };
        }
    }

    var bgMusic = createSafeSound({
        urls: ["./sound/music/DST-DasElectron.mp3"],
        buffer: true,
        loop: true
    });

    var laser1 = createSafeSound({
        urls: ["./sound/sfx/sfx_laser1.ogg", "./sound/sfx/sfx_laser1.mp3"]
    });

    var explosion = createSafeSound({
        urls: ["./sound/sfx/explosion.ogg", "./sound/sfx/explosion.mp3"]
    });

    var laser2 = createSafeSound({
        urls: ["./sound/sfx/sfx_laser2.ogg", "./sound/sfx/sfx_laser2.mp3"]
    });

    var playerHit = createSafeSound({
        urls: ["./sound/sfx/sfx_shieldDown.ogg", "./sound/sfx/sfx_shieldDown.mp3"]
    });

    var pause = createSafeSound({
        urls: ["./sound/sfx/pause.wav"]
    });

    var select = createSafeSound({
        urls: ["./sound/sfx/select.mp3", "./sound/sfx/select.wav"]
    });

    var death = createSafeSound({
        urls: ["./sound/sfx/death.mp3", "./sound/sfx/death.wav"]
    });

    var levelUp = createSafeSound({
        urls: ["./sound/sfx/levelUp.mp3", "./sound/sfx/levelUp.wav"]
    });

    var powerUp = createSafeSound({
        urls: ["./sound/sfx/levelUp.mp3"]
    });
    
    var Sounds = {
        levelUp: levelUp,
        powerUp: powerUp,
        explosion: explosion,
        death: death,
        bgMusic: bgMusic,
        playerHit: playerHit,
        pause: pause,
        select: select,
        laser1: laser1,
        laser2: laser2
    };

    console.log("=== Sounds Module Loaded (with safe wrappers) ===");
    return Sounds;
});
