# JioGames SDK Integration Guide

## ✅ SDK Integration Complete!

JioGames SDK has been successfully integrated into the Tower Blocks game for feature phones.

## 📁 Files Added

1. **`jiogames_sp_wrapper.js`** - JioGames SDK wrapper file
2. **`index.html`** - Updated with SDK script tag
3. **`app.js`** - Integrated SDK calls at appropriate places

## 🎮 SDK Integration Points

### 1. **Game Initialization (On Load)**
```javascript
// When game loads
getUserProfile(); // Fetches player profile
```
**Console Output:**
```
=== JioGames SDK: Initializing ===
JioGames SDK: Getting user profile
Jiogames: getUserProfile called
```

### 2. **Game Start (When Player Starts Game)**
```javascript
// When "Start" button is clicked or Enter/5 is pressed
gameCacheAd(); // Caches both Interstitial and Rewarded Video ads
```
**Console Output:**
```
JioGames SDK: Game started, caching ads
JioGames: gameCacheAd called
JioGames: cacheAd called
JioGames: cacheAdRewarded called (after 5 seconds)
```

### 3. **Game Over (When Player Loses)**
```javascript
// When game ends
postScore(finalScore);  // Posts score to leaderboard
showAd();              // Shows interstitial ad after 1.5 seconds
```
**Console Output:**
```
JioGames SDK: Game ended, final score: X
JioGames SDK: Posting score: X
Jiogames: postScore() X
JioGames SDK: Showing interstitial ad
JioGames: showAd called
```

## 📊 SDK Callbacks Implemented

### Ad Callbacks:
- ✅ `onAdPrepared` - When ad is cached and ready
- ✅ `onAdClosed` - When ad is closed
- ✅ `onAdFailedToLoad` - When ad fails to load

### User Profile Callback:
- ✅ `onUserProfileResponse` - Receives player profile info
  - gamer_id
  - gamer_name
  - gamer_avatar_url
  - device_type (sp/stb/desktop)
  - dob

### Game Pause/Resume:
- ✅ `onClientPause` - Game pauses when needed
- ✅ `onClientResume` - Game resumes

## 🔧 Configuration

Current test configuration in `jiogames_sp_wrapper.js`:

```javascript
var adSpotInterstitial = "zbjnq9gs";      // Test Interstitial ad spot
var adSpotRewardedVideo = "81xnt9bw";     // Test Rewarded Video ad spot
var packageName = "com.jiogames.testsp";  // Test package name
var banner_ZoneKey = "l9mp2wfq";          // Test Banner ad spot
var bannerPackageName = "com.jiogames.test";
```

**⚠️ IMPORTANT:** Replace these with your actual ad spot keys and package name from JioAds dashboard before submission!

## 🧪 Testing in Browser

1. Open `index.html` in browser
2. Press **F12** to open DevTools Console
3. Look for console logs:

```
Jiogames: Initialized SDK!
=== JioGames SDK: Initializing ===
JioGames SDK: Getting user profile
Jiogames: getUserProfile called
=== Tower Blocks with JioGames SDK Ready ===
```

4. Start the game - you should see:
```
JioGames SDK: Game started, caching ads
JioGames: gameCacheAd called
JioGames: cacheAd called
```

5. Play and lose - you should see:
```
JioGames SDK: Game ended, final score: X
JioGames SDK: Posting score: X
Jiogames: postScore() X
JioGames SDK: Showing interstitial ad
JioGames: showAd called
```

## 📱 Testing on JioGames App

When testing on actual JioGames app:

1. **`window.DroidHandler`** will be available
2. Ads will actually show
3. Score will post to leaderboard
4. User profile will contain real data

## 🎯 Ad Placement Strategy

### Interstitial Ads (MidRoll):
- **Cache:** On game start
- **Show:** On game over (after 1.5 second delay)
- **Frequency:** Once per game session

### Rewarded Video:
- **Cache:** On game start (5 seconds after interstitial)
- **Show:** On demand (can be triggered by reward button)
- **Reward:** Call `GratifyReward()` in wrapper to implement

### Banner Ads (Optional):
- Can be added using `loadBanner()` and `showBanner()`
- Recommended for long session games
- Currently not implemented in Tower Blocks

## 🔍 Debug Mode

All SDK calls have console.log statements for debugging:

```javascript
console.log("JioGames SDK: ...");  // Our integration logs
console.log("JioGames: ...");      // SDK wrapper logs
console.log("Jiogames: ...");      // SDK internal logs
```

## 📝 Before Submission

### Update Configuration:
1. Get your ad spots from JioAds dashboard
2. Update `jiogames_sp_wrapper.js`:
   ```javascript
   var adSpotInterstitial = "YOUR_INTERSTITIAL_KEY";
   var adSpotRewardedVideo = "YOUR_REWARDED_VIDEO_KEY";
   var packageName = "YOUR_PACKAGE_NAME";
   ```

### Test Checklist:
- [ ] User profile loads on game start
- [ ] Ads cache when game starts
- [ ] Score posts on game over
- [ ] Interstitial ad shows after game over
- [ ] All console logs appear correctly
- [ ] No JavaScript errors in console
- [ ] Works on KaiOS simulator
- [ ] Tested on actual JioGames app

## 🚀 Submission Flow

1. **Register:** publish.jiogames.com
2. **Get Ad Spots:** Create on JioAds dashboard
3. **Update Config:** Replace test keys with real ones
4. **Test:** In JioGames app
5. **Submit:** Via developer console
6. **Review:** Wait for JioGames team approval

## 📞 Support

For SDK integration issues:
- JioGames Developer Portal: developer.jiogames.com
- JioAds Dashboard: ads.jio.com

## ✨ Features Implemented

✅ Interstitial ads (Mandatory)
✅ Rewarded video ads (Mandatory)
✅ Score posting to leaderboard
✅ User profile fetching
✅ Pause/Resume handlers
✅ Ad state management
✅ Error handling
✅ Console logging for debugging
✅ KaiOS keyboard support (5 key, Enter)
✅ 240x320 viewport optimization

---

**Status:** ✅ Ready for testing and submission!
**Version:** 1.0.0
**Last Updated:** October 13, 2025

