/**
 * JioGames SDK Wrapper for HTML5 Games
 * Version: 1.0.0
 * Optimized for JioPhone and KaiOS devices
 */

console.log("=== JioGames SDK Loading... ===");

//#region "Configuration Variables"
var adSpotInterstitial = "zbjnq9gs";
var adSpotRewardedVideo = "81xnt9bw";
var packageName = "com.kaifoundry.spacebattle";
var isAdReady = false;
var isRVReady = false;

var banner_ZoneKey = "l9mp2wfq";
var bannerPackageName = "com.kaifoundry.spacebattle";
//#endregion

console.log("JioGames SDK: Configuration loaded");
console.log("JioGames SDK: Package Name:", packageName);
console.log("JioGames SDK: Interstitial Ad Spot:", adSpotInterstitial);
console.log("JioGames SDK: Rewarded Video Ad Spot:", adSpotRewardedVideo);

//#region "Core SDK Functions"

/**
 * Post player score to JioGames leaderboard
 */
function postScore(score) {
    console.log("=== JioGames: postScore() ===");
    console.log("Score value:", score);
    
    if (!score) {
        console.warn("JioGames: postScore() - No score value provided");
        return;
    }
    
    if (window.DroidHandler) {
        console.log("JioGames: DroidHandler found, posting score...");
        window.DroidHandler.postScore(score);
        console.log("JioGames: Score posted successfully!");
    } else {
        console.warn("JioGames: DroidHandler not available (running in browser)");
    }
}

/**
 * Cache MidRoll Interstitial Ad
 */
function cacheAdMidRoll(adKeyId, source) {
    console.log("=== JioGames: cacheAdMidRoll() ===");
    console.log("Ad Key ID:", adKeyId);
    console.log("Source:", source);
    
    if (!adKeyId || !source) {
        if (!adKeyId) console.error("JioGames: No adKeyId provided for cacheAdMidRoll");
        if (!source) console.error("JioGames: No source provided for cacheAdMidRoll");
        return;
    }
    
    if (window.DroidHandler) {
        console.log("JioGames: Caching MidRoll ad...");
        window.DroidHandler.cacheAd(adKeyId, source);
        console.log("JioGames: MidRoll ad cache requested");
    } else {
        console.warn("JioGames: DroidHandler not available - simulating ad cache");
        // Simulate ad ready for testing
        setTimeout(function() {
            window.onAdPrepared(adKeyId);
        }, 1000);
    }
}

/**
 * Show MidRoll Interstitial Ad
 */
function showAdMidRoll(adKeyId, source) {
    console.log("=== JioGames: showAdMidRoll() ===");
    console.log("Ad Key ID:", adKeyId);
    console.log("Source:", source);
    console.log("Is Ad Ready:", isAdReady);
    
    if (!adKeyId || !source) {
        if (!adKeyId) console.error("JioGames: No adKeyId provided for showAdMidRoll");
        if (!source) console.error("JioGames: No source provided for showAdMidRoll");
        return;
    }
    
    if (window.DroidHandler) {
        console.log("JioGames: Showing MidRoll ad...");
        window.DroidHandler.showAd(adKeyId, source);
    } else {
        console.warn("JioGames: DroidHandler not available - simulating ad show");
        // Simulate ad close for testing
        setTimeout(function() {
            window.onAdClosed(adKeyId, true, false);
        }, 2000);
    }
}

/**
 * Cache Rewarded Video Ad
 */
function cacheAdRewardedVideo(adKeyId, source) {
    console.log("=== JioGames: cacheAdRewardedVideo() ===");
    console.log("Ad Key ID:", adKeyId);
    console.log("Source:", source);
    
    if (!adKeyId || !source) {
        if (!adKeyId) console.error("JioGames: No adKeyId for cacheAdRewardedVideo");
        if (!source) console.error("JioGames: No source for cacheAdRewardedVideo");
        return;
    }
    
    if (window.DroidHandler) {
        console.log("JioGames: Caching Rewarded Video ad...");
        window.DroidHandler.cacheAdRewarded(adKeyId, source);
        console.log("JioGames: Rewarded Video cache requested");
    } else {
        console.warn("JioGames: DroidHandler not available - simulating ad cache");
        // Simulate ad ready for testing
        setTimeout(function() {
            window.onAdPrepared(adKeyId);
        }, 1500);
    }
}

/**
 * Show Rewarded Video Ad
 */
function showAdRewardedVideo(adKeyId, source) {
    console.log("=== JioGames: showAdRewardedVideo() ===");
    console.log("Ad Key ID:", adKeyId);
    console.log("Source:", source);
    console.log("Is Rewarded Ad Ready:", isRVReady);
    
    if (!adKeyId || !source) {
        if (!adKeyId) console.error("JioGames: No adKeyId for showAdRewardedVideo");
        if (!source) console.error("JioGames: No source for showAdRewardedVideo");
        return;
    }
    
    if (window.DroidHandler) {
        console.log("JioGames: Showing Rewarded Video ad...");
        window.DroidHandler.showAdRewarded(adKeyId, source);
    } else {
        console.warn("JioGames: DroidHandler not available - simulating rewarded ad");
        // Simulate rewarded ad for testing
        setTimeout(function() {
            window.onAdClosed(adKeyId, true, true);
        }, 3000);
    }
}

/**
 * Get User Profile Information
 */
function getUserProfile() {
    console.log("=== JioGames: getUserProfile() ===");
    
    if (window.DroidHandler) {
        console.log("JioGames: Requesting user profile from DroidHandler...");
        window.DroidHandler.getUserProfile();
    } else {
        console.warn("JioGames: DroidHandler not available - using dummy profile");
        // Simulate user profile for testing
        var dummyProfile = {
            gamer_id: "test_gamer_123",
            gamer_name: "Test Player",
            gamer_avatar_url: "https://jiogames.net/profile_images/default.png",
            device_type: "feature_phone",
            dob: null
        };
        setTimeout(function() {
            window.onUserProfileResponse(JSON.stringify(dummyProfile));
        }, 500);
    }
}

//#endregion

//#region "Game Helper Functions"

/**
 * Cache Interstitial Ad (wrapper function)
 */
function cacheAd() {
    console.log("=== JioGames: cacheAd() called ===");
    console.log("Current isAdReady state:", isAdReady);
    
    if (!isAdReady) {
        console.log("JioGames: Initiating MidRoll ad cache...");
        cacheAdMidRoll(adSpotInterstitial, packageName);
    } else {
        console.log("JioGames: MidRoll ad already cached");
    }
}

/**
 * Cache Rewarded Video Ad (wrapper function)
 */
function cacheAdRewarded() {
    console.log("=== JioGames: cacheAdRewarded() called ===");
    console.log("Current isRVReady state:", isRVReady);
    
    if (!isRVReady) {
        console.log("JioGames: Initiating Rewarded Video cache...");
        cacheAdRewardedVideo(adSpotRewardedVideo, packageName);
    } else {
        console.log("JioGames: Rewarded Video already cached");
    }
}

/**
 * Show Interstitial Ad (wrapper function)
 */
function showAd() {
    console.log("=== JioGames: showAd() called ===");
    console.log("Is Ad Ready:", isAdReady);
    
    if (isAdReady) {
        console.log("JioGames: Showing MidRoll ad...");
        showAdMidRoll(adSpotInterstitial, packageName);
    } else {
        console.warn("JioGames: MidRoll ad not ready yet!");
    }
}

/**
 * Show Rewarded Video Ad (wrapper function)
 */
function showAdRewarded() {
    console.log("=== JioGames: showAdRewarded() called ===");
    console.log("Is Rewarded Ad Ready:", isRVReady);
    
    if (isRVReady) {
        console.log("JioGames: Showing Rewarded Video ad...");
        showAdRewardedVideo(adSpotRewardedVideo, packageName);
    } else {
        console.warn("JioGames: Rewarded Video not ready yet!");
    }
}

/**
 * Cache both ads with delay (recommended method)
 */
function gameCacheAd() {
    console.log("=== JioGames: gameCacheAd() called ===");
    console.log("JioGames: Caching MidRoll ad first...");
    cacheAd();
    
    setTimeout(function() {
        console.log("JioGames: Caching Rewarded Video after 5s delay...");
        cacheAdRewarded();
    }, 5000);
}

/**
 * Gratify reward to player
 */
function GratifyReward() {
    console.log("=== JioGames: GratifyReward() ===");
    console.log("JioGames: Player earned reward!");
    // Add your reward logic here
    // Example: Give extra life, coins, etc.
}

//#endregion

//#region "SDK Callbacks"

/**
 * Called when ad is prepared and ready to show
 */
window.onAdPrepared = function(adSpotKey) {
    console.log("=== JioGames: onAdPrepared Callback ===");
    console.log("Ad Spot Key:", adSpotKey);
    
    if (adSpotKey == adSpotInterstitial) {
        isAdReady = true;
        console.log("JioGames: MidRoll ad is ready!");
        console.log("Current isAdReady:", isAdReady);
    }
    
    if (adSpotKey == adSpotRewardedVideo) {
        isRVReady = true;
        console.log("JioGames: Rewarded Video is ready!");
        console.log("Current isRVReady:", isRVReady);
    }
};

/**
 * Called when ad is closed
 */
window.onAdClosed = function(data, pIsVideoCompleted, pIsEligibleForReward) {
    console.log("=== JioGames: onAdClosed Callback ===");
    console.log("Raw data:", data);
    console.log("Is Video Completed:", pIsVideoCompleted);
    console.log("Is Eligible For Reward:", pIsEligibleForReward);
    
    var localData = data.split(",");
    var adSpotKey = data;
    var isVideoCompleted = pIsVideoCompleted;
    var isEligibleForReward = pIsEligibleForReward;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        isVideoCompleted = Boolean(localData[1].trim());
        isEligibleForReward = Boolean(localData[2].trim());
        console.log("JioGames: Parsed data:", adSpotKey, isVideoCompleted, isEligibleForReward);
    }

    if (adSpotKey == adSpotInterstitial) {
        isAdReady = false;
        console.log("JioGames: MidRoll ad closed");
        console.log("Current isAdReady:", isAdReady);
    }
    
    if (adSpotKey == adSpotRewardedVideo) {
        isRVReady = false;
        console.log("JioGames: Rewarded Video closed");
        console.log("Current isRVReady:", isRVReady);
        
        if (isEligibleForReward) {
            console.log("JioGames: Player is eligible for reward!");
            GratifyReward();
        }
    }
};

/**
 * Called when ad fails to load
 */
window.onAdFailedToLoad = function(data, pDescription) {
    console.log("=== JioGames: onAdFailedToLoad Callback ===");
    console.error("Ad failed to load!");
    console.error("Data:", data);
    console.error("Description:", pDescription);
    
    var localData = data.split(",");
    var adSpotKey = data;
    var description = pDescription;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        description = localData[1].trim();
    }

    if (adSpotKey == adSpotInterstitial) {
        isAdReady = false;
        console.error("JioGames: MidRoll ad failed to load");
        console.error("Description:", description);
    }
    
    if (adSpotKey == adSpotRewardedVideo) {
        isRVReady = false;
        console.error("JioGames: Rewarded Video failed to load");
        console.error("Description:", description);
    }
};

/**
 * Called when user profile data is received
 */
window.onUserProfileResponse = function(message) {
    console.log("=== JioGames: onUserProfileResponse Callback ===");
    console.log("Raw message:", message);
    
    try {
        const obj = JSON.parse(message);
        console.log("=== User Profile Data ===");
        console.log("Gamer ID:", obj.gamer_id);
        console.log("Gamer Name:", obj.gamer_name);
        console.log("Avatar URL:", obj.gamer_avatar_url);
        console.log("Device Type:", obj.device_type);
        console.log("Date of Birth:", obj.dob);
        console.log("=========================");
        
        // Store user data globally
        window.jioGamesUserProfile = obj;
    } catch(e) {
        console.error("JioGames: Error parsing user profile:", e);
    }
};

/**
 * Called when game should pause
 */
window.onClientPause = function() {
    console.log("=== JioGames: onClientPause Callback ===");
    console.log("JioGames: Game should pause now");
    
    if (window.pauseMusic) {
        window.pauseMusic();
        console.log("JioGames: Music paused");
    }
    
    if (window.pauseGame) {
        window.pauseGame();
        console.log("JioGames: Game paused");
    }
};

/**
 * Called when game should resume
 */
window.onClientResume = function() {
    console.log("=== JioGames: onClientResume Callback ===");
    console.log("JioGames: Game should resume now");
    
    if (window.resumeMusic) {
        window.resumeMusic();
        console.log("JioGames: Music resumed");
    }
    
    if (window.resumeGame) {
        window.resumeGame();
        console.log("JioGames: Game resumed");
    }
};

// Additional callbacks (for completeness)
window.onAdClick = function(adSpotKey) {
    console.log("JioGames: onAdClick -", adSpotKey);
};

window.onAdMediaStart = function(adSpotKey) {
    console.log("JioGames: onAdMediaStart -", adSpotKey);
};

window.onAdMediaEnd = function(adSpotKey, reward) {
    console.log("JioGames: onAdMediaEnd -", adSpotKey, "Reward:", reward);
};

//#endregion

//#region "SDK Initialization"

// Export all SDK functions as global JioGames object
window.JioGames = {
    postScore: postScore,
    cacheAdMidRoll: cacheAdMidRoll,
    showAdMidRoll: showAdMidRoll,
    cacheAdRewardedVideo: cacheAdRewardedVideo,
    showAdRewardedVideo: showAdRewardedVideo,
    getUserProfile: getUserProfile,
    cacheAd: cacheAd,
    cacheAdRewarded: cacheAdRewarded,
    showAd: showAd,
    showAdRewarded: showAdRewarded,
    gameCacheAd: gameCacheAd,
    GratifyReward: GratifyReward,
    // Configuration
    config: {
        packageName: packageName,
        adSpotInterstitial: adSpotInterstitial,
        adSpotRewardedVideo: adSpotRewardedVideo,
        banner_ZoneKey: banner_ZoneKey,
        bannerPackageName: bannerPackageName
    },
    // State
    state: {
        isAdReady: function() { return isAdReady; },
        isRVReady: function() { return isRVReady; }
    },
    version: "1.0.0"
};

console.log("=== JioGames SDK Initialized Successfully! ===");
console.log("SDK Version: 1.0.0");
console.log("Platform: KaiOS/JioPhone");
console.log("Package:", packageName);
console.log("JioGames Object:", window.JioGames);
console.log("===========================================");

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== JioGames: DOM Content Loaded ===");
    console.log("JioGames: Fetching user profile...");
    getUserProfile();
    
    console.log("JioGames: Caching ads...");
    gameCacheAd();
});

//#endregion


