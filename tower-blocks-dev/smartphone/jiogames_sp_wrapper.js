//#region "Variable"
var adSpotInterstitial = "zbjnq9gs";
var adSpotRewardedVideo = "81xnt9bw";
var packageName = "com.kaifoundry.towerblocksSP";
var isAdReady = false;
var isRVReady = false;
// Expose readiness globally
window.isAdReady = false;
window.isRVReady = false;

// Flag to prevent multiple interstitial calls
var isInterstitialShowing = false;

// Flag to prevent multiple cache calls
var isCachingAds = false;

var banner_ZoneKey = "l9mp2wfq";
var bannerPackageName = "com.kaifoundry.towerblocksSP";

//#endregion


console.log("Jiogames: Initialized SDK!");
function postScore(score) {
    console.log("Jiogames: postScore() ",score);
    if(!score){
            console.log("Jiogames: postScore() no value ",score);
    }
    // window.topScore is integer
    if  (window.DroidHandler) {
        window.DroidHandler.postScore(score);
    }
}

function cacheAdMidRoll(adKeyId, source) {
    if(!adKeyId || !source){
        adKeyId? null: (console.log("Jiogames: cacheAdMidRoll() no adKeyId to cacheAd ",adKeyId));
        source? null : (console.log("Jiogames: cacheAdMidRoll() no source to cacheAd ",source));
        return;
    }
    if (window.DroidHandler) {
        window.DroidHandler.cacheAd(adKeyId, source);
    }
}

function showAdMidRoll(adKeyId, source) {
    if(!adKeyId || !source){
        adKeyId? null: (console.log("Jiogames: showAdMidRoll() no adKeyId to showAd ",adKeyId));
        source? null : (console.log("Jiogames: showAdMidRoll() no source to showAd ",source));
        return;
    }
    if (window.DroidHandler) {
        window.DroidHandler.showAd(adKeyId, source);
    }
}

function cacheAdRewardedVideo(adKeyId, source) {
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: cacheAdRewardedVideo() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: cacheAdRewardedVideo() no source to cacheAd ", source));
        return;
    }
    if (window.DroidHandler) {
        window.DroidHandler.cacheAdRewarded(adKeyId, source);    
    }
}

function showAdRewardedVideo(adKeyId, source) {
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: showAdRewardedVideo() no adKeyId to showAd ", adKeyId));
        source ? null : (console.log("Jiogames: showAdRewardedVideo() no source to showAd ", source));
        return;
    }
    if (window.DroidHandler) {
        window.DroidHandler.showAdRewarded(adKeyId, source);
    }
}

function getUserProfile() {
    console.log("Jiogames: getUserProfile called");
    if (window.DroidHandler) {
        window.DroidHandler.getUserProfile();
    }
}


window.onAdPrepared = function (adSpotKey) {
    console.log("JioGames: onAdPrepared "+adSpotKey.toString());
    if (adSpotKey == adSpotInterstitial) { 
        isAdReady = true; 
        window.isAdReady = true; 
        isCachingAds = false; // Reset cache flag when ad is ready
        console.log("JioGames: onAdPrepared MidRoll " + isAdReady); 
    }
    if (adSpotKey == adSpotRewardedVideo) { 
        isRVReady = true; 
        window.isRVReady = true; 
        isCachingAds = false; // Reset cache flag when ad is ready
        console.log("JioGames: onAdPrepared RewardedVideo " + isRVReady); 
    }
};

window.onAdClosed = function (data, pIsVideoCompleted, pIsEligibleForReward) {
    var localData = data.split(",");
    var adSpotKey = data;
    var isVideoCompleted = pIsVideoCompleted;
    var isEligibleForReward = pIsEligibleForReward;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        isVideoCompleted = Boolean(localData[1].trim());
        isEligibleForReward = Boolean(localData[2].trim());
    }
    console.log("JioGames: onAdClosed " + data.toString(), "localData " + (localData && localData.length > 0 ? localData.join(" ") : "[]"));

    if (adSpotKey == adSpotInterstitial) { 
        isAdReady = false; 
        window.isAdReady = false; 
        isInterstitialShowing = false; // Reset flag when ad closes
        console.log("JioGames: onAdClose MidRoll " + isAdReady);
    }
    if (adSpotKey == adSpotRewardedVideo) { 
        isRVReady = false; 
        window.isRVReady = false; 
        console.log("JioGames: onAdClose RewardedVideo " + isRVReady);
    }

    if (adSpotKey == adSpotRewardedVideo && isEligibleForReward) {
        GratifyReward();
    }    
    // Note: gameCacheAd() is called only at start button click, not here
};

window.onAdFailedToLoad = function (data, pDescription){
    var localData = data.split(",");
    var adSpotKey = data;
    var description = pDescription;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        description = localData[1].trim();
    }

    console.log("JioGames: onAdFailedToLoad " + data.toString() + " localData " + (localData && localData.length > 0 ? localData.join(" ") : "[]"));
    
    if (adSpotKey == adSpotInterstitial) { 
        isAdReady = false; 
        window.isAdReady = false; 
        isInterstitialShowing = false; // Reset flag on failure
        console.log("JioGames: onAdFailedToLoad MidRoll " + isAdReady+" description "+description);
    }
    if (adSpotKey == adSpotRewardedVideo) { 
        isRVReady = false; 
        window.isRVReady = false; 
        console.log("JioGames: onAdFailedToLoad RewardedVideo " + isRVReady+" description "+description);
    }   
    // Note: gameCacheAd() is called only at start button click, not here
};


window.onAdClick = function (adSpotKey) {};
window.onAdMediaCollapse = function (adSpotKey) {};
window.onAdMediaExpand = function (adSpotKey) {};
window.onAdMediaStart = function (adSpotKey) {};
window.onAdRefresh = function (adSpotKey) {};
window.onAdRender = function (adSpotKey) {};
window.onAdRender = function (adSpotKey) {};
window.onAdReceived = function (adSpotKey) {};
window.onAdSkippable = function (adSpotKey) {};
window.onAdView = function (adSpotKey) {};

window.onUserProfileResponse = function(message)
{
// Sample JSON which will receive in response to getUserProfile()
// {gamer_id: 'T9EMNU++dbtW0sdadgo83m795flags/8WaOZjdJa4x8=', gamer_name: 'Player19998', gamer_avatar_url: 'https://jiogames.net/profile_images', device_type: 'sp', dob: null}
    const obj = JSON.parse(message);
    console.log("gamer_id "+obj.gamer_id);
    console.log("gamer_name "+obj.gamer_name);
    console.log("gamer_avatar_url "+obj.gamer_avatar_url);
    console.log("device_type "+obj.device_type);
    console.log("dob "+obj.dob);
    // console.log("JioGames: onUserProfileResponse "+[JSON.stringify(message)]);
};

window.onClientPause = function () {
    console.log("JioGames: onClientPause called");
     window.pauseMusic();
};

window.onClientResume = function () {
    console.log("JioGames: onClientResume called");
     window.resumeMusic();
};


function GratifyReward() {
    console.log("JioGames: GratifyReward Game user here");
    try {
        if (typeof window.tbResumeFromReward === 'function') {
            var resumeScore = (typeof window.tbLastScore === 'number') ? window.tbLastScore : undefined;
            window.tbResumeFromReward(resumeScore);
        }
    } catch (e) {
        console.log("JioGames: Failed to resume game after reward", e);
    }
};

function cacheAd() {
    console.log("JioGames: cacheAd called. isAdReady=", isAdReady, "isCachingAds=", isCachingAds);
    
    // Prevent multiple cache calls
    if (isCachingAds) {
        console.warn("JioGames: cacheAd skipped - already caching ads, preventing duplicate call");
        return;
    }
    
    // Block cache during gameplay
    try {
        var container = document.getElementById('container');
        if (container && container.classList.contains('playing')) {
            console.warn("JioGames: cacheAd blocked - game is in PLAYING state, no caching during gameplay");
            return;
        }
    } catch (e) {
        // If check fails, continue (don't block)
    }
    
    if (!isAdReady) {
        isCachingAds = true; // Mark as caching
        cacheAdMidRoll(adSpotInterstitial, packageName);
        // Flag will be reset when onAdPrepared is called
    } else {
        console.log("JioGames: cacheAd skipped - ad already ready");
    }
}
function cacheAdRewarded() {
    console.log("JioGames: cacheAdRewarded called");
    if (!isRVReady) {
        cacheAdRewardedVideo(adSpotRewardedVideo, packageName);
    }    
}
function showAd() {
    console.log("JioGames: showAd (Show Ads) called. isAdReady=", isAdReady, "isInterstitialShowing=", isInterstitialShowing);
    
    // Prevent multiple calls - if already showing, skip
    if (isInterstitialShowing) {
        console.warn("JioGames: showAd skipped - interstitial already showing, preventing duplicate call");
        return;
    }
    
    // Block ads during gameplay - check game state
    try {
        var container = document.getElementById('container');
        if (container && container.classList.contains('playing')) {
            console.warn("JioGames: showAd blocked - game is in PLAYING state, no mid-roll ads during gameplay");
            return;
        }
    } catch (e) {
        // If check fails, continue (don't block)
    }
    
    if (isAdReady) {
        // Mark as showing to prevent duplicate calls
        isInterstitialShowing = true;
        console.log("JioGames: calling showAdMidRoll('" + adSpotInterstitial + "', '" + packageName + "')");
        showAdMidRoll(adSpotInterstitial, packageName);
    } else {
        console.warn("JioGames: showAd skipped - show ads not ready yet. Ensure cacheAd() ran and onAdPrepared fired.");
    }
}
function showAdRewarded() {
    console.log("JioGames: showAdRewarded called. isRVReady=", isRVReady);
    if (isRVReady) {
        showAdRewardedVideo(adSpotRewardedVideo, packageName);
        
        /******* CHEAT *******/
//         window.onAdMediaEnd(adSpotRewardedVideo, true, 1);
//         window.onAdClosed(adSpotRewardedVideo, true, true);
        /******* CHEAT *******/
    } else {
        console.warn("JioGames: showAdRewarded skipped - rewarded ad not ready yet. Ensure cacheAdRewarded() ran and onAdPrepared fired.");
    }
}

function gameCacheAd() {
    console.log("JioGames: gameCacheAd called. isCachingAds=", isCachingAds);
    
    // Prevent multiple cache calls
    if (isCachingAds) {
        console.warn("JioGames: gameCacheAd skipped - already caching ads, preventing duplicate call");
        return;
    }
    
    // Block cache during gameplay
    try {
        var container = document.getElementById('container');
        if (container && container.classList.contains('playing')) {
            console.warn("JioGames: gameCacheAd blocked - game is in PLAYING state, no caching during gameplay");
            return;
        }
    } catch (e) {
        // If check fails, continue (don't block)
    }
    
    isCachingAds = true; // Mark as caching
    cacheAd();
    cacheAdRewarded(); // Direct call - no timeout
    // Flag will be reset when onAdPrepared is called for both ads
}


// Banner ad impliment code
function loadBanner() {
    console.log("JioGames: loadBanner called");
	if (window.DroidHandler) {
        window.DroidHandler.postMessage('{"key":"getUserProperties"}');
    }
    else{
        window.onUserPropertiesResponse(JSON.parse('{"detail":{"uid":"","ifa":""}}'));
    }
}

window.onUserPropertiesResponse = function(message)
{
    console.log("JioGames: onUserPropertiesResponse "+[JSON.stringify(message)]);
    const obj = JSON.parse(JSON.stringify(message));

    var element = document.createElement("div");
    element.id = 'bannercontainer';
    element.style.position = 'absolute';
    element.style.width = 'fit-content';
    element.style.height = 'fit-content';
    element.style.left = 'center';
    element.style.bottom = '0%';
    element.style.backgroundPosition = 'center center';
    element.style.backgroundRepeat = 'no-repeat';
    
    document.body.appendChild(element);
    
    var script = document.createElement('script');
    script.src = 'https://jioadsweb.akamaized.net/jioads/websdk/default/stable/v2/jioAds.js';

    script.onload = () => {
        callback_Banner();
        banner_Configuration(obj);
    };

    script.onerror = () => {
        console.log('Error occurred while loading script');
    };

    document.body.appendChild(script);
}

function setTopBanner(){
    console.log("JioGames: setTopBanner");
    var element = document.getElementById('bannercontainer');
    element.style.removeProperty('bottom');
    element.style.top = '0%';
}

function setBottomBanner(){
    console.log("JioGames: setBottomBanner");
    var element = document.getElementById('bannercontainer');
    element.style.removeProperty('top');
    element.style.bottom = '0%'
}

function banner_Configuration(obj){
    console.log("JioGames: banner_Configuration IFA : " , obj.detail.ifa);
    console.log("JioGames: banner_Configuration UID : " , obj.detail.uid);
    JioAds.setConfiguration({
        endpoint: "jioads",
        clkSelf: true,
        reqType: "prod", //stg, prod
        logLevel: 1,
		ifa: obj.detail.ifa,
		uid: obj.detail.uid,
        adRequestTimeout: 6000,
        adRenderingTimeout: 5000
    });
}

function showBanner() {
    console.log("JioGames: showBanner");
    document.getElementById("bannercontainer").innerHTML = `<ins id="uid1" data-adspot-key=${banner_ZoneKey} data-source=${bannerPackageName} data-ad-sizes="320x50"></ins>`;
    setBottomBanner();
}

function showNativeBanner() {
    console.log("JioGames: showNativeBanner");
    document.getElementById("bannercontainer").innerHTML = `<ins id="uid1" data-adspot-key=${banner_ZoneKey} data-source=${bannerPackageName} data-ad-sizes="300x250"></ins>`;
    
    var element = document.getElementById('bannercontainer');
    element.style.removeProperty('top');
    element.style.removeProperty('bottom');
}

function hideBanner() {
    console.log("JioGames: hideBanner");
    document.getElementById("bannercontainer").innerHTML = '';
}

function callback_Banner(){
    JioAds.onAdFailedToLoad = function(placementId, options) {
        console.log ("JioGames: onAdFailedToLoad "+placementId+" options "+JSON.stringify(options));
    };
    JioAds.onAdPrepared = function(placementId, adUxType) {
        console.log ("JioGames: onAdPrepared "+placemenId);
    };
    JioAds.onAdRender = function(placementId) {
        console.log ("JioGames: onAdRender "+placementId);
    };
    JioAds.onAdChange = function(placementId, options) {
        console.log ("JioGames: onAdChange "+placementId);
    };
    JioAds.onAdClosed = function(placementId, isVideoCompleted, reward) {
        console.log ("JioGames: onAdClosed "+placementId);
    };
    JioAds.onAdClicked = function(placementId, url) {
        console.log ("JioGames: onAdClicked "+placementId + " URL : " +url);
        window.DroidHandler.postMessage('{"key":"openLink","value":{"url":"' + url + '"}}');
    };
    JioAds.onAdMediaStart = function(placementId) {
        console.log ("JioGames: onAdMediaStart "+placementId);
    };
    JioAds.onAdProgress = function(placementId, quartileInfo) {
        console.log ("JioGames: onAdProgress "+placementId);
    };
    JioAds.onAdMediaEnd = function(placementId, reward) {
        console.log ("JioGames: onAdMediaEnd "+placementId);
    };
    JioAds.onAdRefresh = function(placementId, options) {
        console.log ("JioGames: onAdRefresh "+placementId);
    };
    JioAds.onAdSkippable = function(placementId, options) {
        console.log ("JioGames: onAdSkippable "+placementId);
    };
    JioAds.onAdsReceived = function(placementId, ads) {
        console.log ("JioGames: onAdsReceived "+placementId);
    };
    JioAds.onAdDuration = function(placementId, adDuration) {
        console.log ("JioGames: onAdDuration "+placementId);
    };
}
