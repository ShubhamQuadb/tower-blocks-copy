var self = this;
this.version = "1.0";
var firstAdDelay = false;

var adSpotInterstitial = "gc8hyeq3";
var isAdReady = false;
var adSpotRewardedVideo = "h36s70u1";
var isRVReady = false;
var isRewardUser = false;
var packageName = "com.kaifoundry.towerblocksSTB";

// Banner config (STB)
var banner_ZoneKey = "l9mp2wfq";
var bannerPackageName = "com.kaifoundry.towerblocksSTB";

function postScore(score)  {
    if (!score) {
        console.log("Jiogames: postScore() no value ", score);
    }
    if(window.DroidHandler){
        console.log("Jiogames: postScore() "+score);
        window.DroidHandler.postScore(score);
    }
}

function cacheAdMidRoll(adKeyId, source) {
    console.log("Jiogames: cacheAdMidRoll() adkeyId: "+adKeyId+" source: "+source+" DroidHandler "+window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: cacheAdMidRoll() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: cacheAdMidRoll() no source to cacheAd ", source));
        return;
    }
    if(window.DroidHandler && !isAdReady){
        window.DroidHandler.cacheAd(adKeyId, source);
    }
    if (!firstAdDelay) {
        setTimeout(function(){ 
            firstAdDelay = true;
        }, 20000);
    }
}

function cacheRewardedVideo(adKeyId, source) {
    console.log("Jiogames: cacheRewardedVideo() for ", adKeyId +" source: "+source+" DroidHandler "+window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: cacheRewardedVideo() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: cacheRewardedVideo() no source to cacheAd ", source));
        return;
    }

    if(window.DroidHandler && !isRVReady){
        window.DroidHandler.cacheAdRewardedVideo(adKeyId, source);
    }
}

function showAdMidRoll(adKeyId, source)  {
    console.log("Jiogames: showAdMidRoll() adKeyId: "+adKeyId+" source "+source+" firstAdDelay "+firstAdDelay+" DroidHandler "+window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: showAdMidRoll() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: showAdMidRoll() no source to cacheAd ", source));
        return;
    }
    if(window.DroidHandler && firstAdDelay && isAdReady){
        window.DroidHandler.showAd(adKeyId, source);
    }
}

function showRewardedVideo(adKeyId, source) {
    console.log("Jiogames: showRewardedVideo() adKeyId: "+adKeyId+" source "+source+" DroidHandler "+window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: showRewardedVideo() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: showRewardedVideo() no source to cacheAd ", source));
        return;
    }
    if(window.DroidHandler && isRVReady){
        isRewardUser = false;
        window.DroidHandler.ShowRewardedVideo(adKeyId, source);
    }
}

document.addEventListener("visibilitychange", onVisibilityChanged, false);    
function onVisibilityChanged() {
    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden) {
        //Pause Game
        console.log("Jiogames: Pause Game");
    } else {		
        //Resume Game	
        console.log("Jiogames: Resume Game");
    }
};

function getUserProfile() {
    if (window.DroidHandler) {
        window.DroidHandler.getUserProfile();
    }
}

window.onUserProfileResponse = function(message)
{
   console.log("onUserProfileResponse"+[JSON.stringify(message)]);  
};


window.onAdReady = function (adSpotKey) {
    adSpotKey == adSpotInterstitial && (isAdReady = true, console.log("JioGames: onAdReady MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = true, console.log("JioGames: onAdReady RewardedVideo " + isRVReady));   
};
window.onAdClose = function (adSpotKey) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdClose MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdClose RewardedVideo " + isRVReady));
    if (adSpotKey == adSpotRewardedVideo && isRewardUser) {
        //Gratify User
    }
};
window.onAdError = function (adSpotKey, errorMessage) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdError MidRoll " + isAdReady+" errorMessage "+errorMessage));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdError RewardedVideo " + isRVReady+" errorMessage "+errorMessage));
};
window.OnAdError = function (adSpotKey, errorMessage) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: OnAdError MidRoll " + isAdReady+" errorMessage "+errorMessage));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: OnAdError RewardedVideo " + isRVReady+" errorMessage "+errorMessage));
};
window.onAdMediaEnd = function (adSpotKey, success, value) {
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, isRewardUser = true, console.log("JioGames: onAdMediaEnd RewardedVideo " + isRVReady));
};

window.onAdPrepared = function (adSpotKey) {
    console.log("JioGames: onAdPrepared "+adSpotKey.toString());
    adSpotKey == adSpotInterstitial && (isAdReady = true, console.log("JioGames: onAdPrepared MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = true, console.log("JioGames: onAdPrepared RewardedVideo " + isRVReady));   
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
    

    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdClose MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdClose RewardedVideo " + isRVReady));

    if (adSpotKey == adSpotRewardedVideo && isVideoCompleted) {
        isRewardUser = isEligibleForReward;
        GratifyReward();
        //Gratify User
    }    
    console.log("JioGames: onAdClosed "+data.toString(), "localData "+localData[0]+" "+localData[1]+" "+localData[2]);    
};
window.onAdFailedToLoad = function (data, pDescription){
    var localData = data.split(",");
    var adSpotKey = data;
    var description = pDescription;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        description = localData[1].trim();
    }

    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdFailedToLoad MidRoll " + isAdReady+" description "+description));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdFailedToLoad RewardedVideo " + isRVReady+" description "+description));    
    console.log("JioGames: onAdFailedToLoad "+data.toString()+" localData "+localData[0]+" "+localData[1]);
};

window.onAdClick = function (adSpotKey) {};
window.onAdMediaCollapse = function (adSpotKey) {};
window.onAdMediaExpand = function (adSpotKey) {};
window.onAdMediaStart = function (adSpotKey) {};
window.onAdRefresh = function (adSpotKey) {};
window.onAdRender = function (adSpotKey) {};
window.onAdSkippable = function (adSpotKey) {};
window.onAdView = function (adSpotKey) {};



function GratifyReward() {
    console.log("GratifyReward Game user here");
};

function gratifyUser() {
    return isRewardUser;
};

function cacheAd() {
     if (!isAdReady) {
        cacheAdMidRoll(adSpotInterstitial, packageName);
    }
}
function cacheAdRewarded() {
    if (!isRVReady) {
        cacheRewardedVideo(adSpotRewardedVideo, packageName);
    }    
}
function showAd() {
    if (isAdReady) {
        showAdMidRoll(adSpotInterstitial, packageName);
    }
}
function showAdRewarded() {
    if (isRVReady) {
        showRewardedVideo(adSpotRewardedVideo, packageName);
    }
}

function gameCacheAd() {
    console.log("JioGames: gameCacheAd called");
    cacheAd();
	setTimeout(function(){
		cacheAdRewarded();
	}, 5000);
}

// ===== Banner Ad (STB) =====
function loadBanner() {
    console.log("JioGames: loadBanner called (STB)");
    if (window.DroidHandler) {
        window.DroidHandler.postMessage('{"key":"getUserProperties"}');
    } else {
        window.onUserPropertiesResponse(JSON.parse('{"detail":{"uid":"","ifa":""}}'));
    }
}

window.onUserPropertiesResponse = function(message)
{
    console.log("JioGames: onUserPropertiesResponse "+[JSON.stringify(message)]);
    var obj = JSON.parse(JSON.stringify(message));

    var element = document.getElementById("bannercontainer");
    if (!element) {
        element = document.createElement("div");
        element.id = 'bannercontainer';
        element.style.position = 'absolute';
        element.style.width = 'fit-content';
        element.style.height = 'fit-content';
        element.style.left = 'center';
        element.style.bottom = '0%';
        element.style.backgroundPosition = 'center center';
        element.style.backgroundRepeat = 'no-repeat';
        document.body.appendChild(element);
    }

    var script = document.createElement('script');
    script.src = 'https://jioadsweb.akamaized.net/jioads/websdk/default/stable/v2/jioAds.js';
    script.onload = function () {
        callback_Banner();
        banner_Configuration(obj);
    };
    script.onerror = function () { console.log('Error occurred while loading banner SDK'); };
    document.body.appendChild(script);
}

function setBottomBanner(){
    console.log("JioGames: setBottomBanner (STB)");
    var element = document.getElementById('bannercontainer');
    if (!element) return;
    element.style.removeProperty('top');
    element.style.bottom = '0%'
}

function banner_Configuration(obj){
    try{
        console.log("JioGames: banner_Configuration (STB) IFA : ", obj.detail.ifa);
        console.log("JioGames: banner_Configuration (STB) UID : ", obj.detail.uid);
        JioAds.setConfiguration({
            endpoint: "jioads",
            clkSelf: true,
            reqType: "prod",
            logLevel: 1,
            ifa: obj.detail.ifa,
            uid: obj.detail.uid,
            adRequestTimeout: 6000,
            adRenderingTimeout: 5000
        });
    }catch(e){ console.log(e); }
}

function showBanner() {
    console.log("JioGames: showBanner (STB)");
    var c = document.getElementById("bannercontainer");
    if (!c) return;
    c.innerHTML = '<ins id="uid1" data-adspot-key='+banner_ZoneKey+' data-source='+bannerPackageName+' data-ad-sizes="320x50"></ins>';
    setBottomBanner();
}

function hideBanner() {
    console.log("JioGames: hideBanner (STB)");
    var c = document.getElementById("bannercontainer");
    if (c) { c.innerHTML = ''; }
}

function callback_Banner(){
    if (typeof JioAds === 'undefined') return;
    JioAds.onAdFailedToLoad = function(placementId, options) { console.log ("JioGames: onAdFailedToLoad "+placementId+" options "+JSON.stringify(options)); };
    JioAds.onAdPrepared = function(placementId, adUxType) { console.log ("JioGames: onAdPrepared "+placementId); };
    JioAds.onAdRender = function(placementId) { console.log ("JioGames: onAdRender "+placementId); };
    JioAds.onAdClosed = function(placementId, isVideoCompleted, reward) { console.log ("JioGames: onAdClosed "+placementId); };
    JioAds.onAdClicked = function(placementId, url) {
        console.log ("JioGames: onAdClicked "+placementId + " URL : " +url);
        if (window.DroidHandler && url) { window.DroidHandler.postMessage('{"key":"openLink","value":{"url":"' + url + '"}}'); }
    };
}
