# Tower Blocks - KaiOS Setup & Testing Guide

Complete guide for setting up and testing Tower Blocks on KaiOS/Jio Phone.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [KaiOS Simulator Setup](#kaios-simulator-setup)
3. [Testing on Simulator](#testing-on-simulator)
4. [Testing on Real Device](#testing-on-real-device)
5. [Manifest Configuration](#manifest-configuration)
6. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Software:
- **Firefox Browser** (Latest version)
- **WebIDE** or **KaiOS Simulator**
- **Node.js** (Optional, for local server)

### For Real Device Testing:
- Jio Phone or KaiOS device
- USB Cable
- ADB (Android Debug Bridge)

## 🖥️ KaiOS Simulator Setup

### Method 1: Using Firefox WebIDE (Recommended)

1. **Install Firefox Developer Edition**
   - Download from: https://www.mozilla.org/firefox/developer/
   
2. **Enable WebIDE**
   - Open Firefox
   - Press `Shift + F8` or go to `Tools > Web Developer > WebIDE`

3. **Install KaiOS Simulator**
   - In WebIDE, click "Select Runtime" dropdown
   - Click "Install Simulator"
   - Select "KaiOS 2.5" or "KaiOS 3.0"
   - Click "Install"

4. **Start Simulator**
   - Click "Select Runtime"
   - Choose the installed KaiOS simulator
   - Wait for simulator to boot up

### Method 2: Using Standalone KaiOS Simulator

1. **Download KaiOS Simulator**
   - Visit: https://developer.kaiostech.com/
   - Download the standalone simulator for your OS

2. **Install and Launch**
   - Extract the downloaded file
   - Run the simulator executable
   - Wait for KaiOS environment to load

## 🧪 Testing on Simulator

### Step 1: Prepare the App

1. Navigate to the feature-phone folder:
   ```bash
   cd tower-blocks/feature-phone
   ```

2. Verify the manifest.webapp file exists and is properly formatted

### Step 2: Load App in Simulator

#### Using WebIDE:
1. Click "Open App" in WebIDE
2. Select "Open Packaged App"
3. Navigate to `tower-blocks/feature-phone` folder
4. Click "Select Folder"
5. WebIDE will validate the manifest
6. Click the "Play" button (▶️) to install and run

#### Using Standalone Simulator:
1. In simulator, press D-Pad CENTER or use mouse
2. Navigate to "Settings" > "Developer" > "Debugger"
3. Enable "Remote Debugging"
4. Use WebIDE to connect (same as above)

### Step 3: Test Controls

**Keyboard Controls (Simulator):**
- `5` or `Enter` - Place block / Start game / Restart
- `ArrowUp` - Navigate up (if menu)
- `ArrowDown` - Navigate down (if menu)
- `ArrowLeft` - Navigate left (if menu)
- `ArrowRight` - Navigate right (if menu)
- `Backspace` - Back/Exit

**Mouse Controls (For Testing):**
- Click anywhere to place block

### Step 4: Debug Console

1. In WebIDE, click "Console" tab
2. Check for any JavaScript errors
3. View console.log outputs
4. Monitor performance

## 📱 Testing on Real Device (Jio Phone)

### Step 1: Enable Developer Mode on Jio Phone

1. Open Jio Phone settings
2. Go to `Device > Device Information`
3. Scroll to `Software`
4. Press `*#*#33284#*#*` to enable developer menu
5. Go back to Settings
6. Find "Developer" menu
7. Enable "Debugger" and set to "ADB and DevTools"

### Step 2: Connect via USB

1. Connect Jio Phone to computer via USB
2. On computer, install ADB tools:
   ```bash
   # Windows (using Chocolatey)
   choco install adb
   
   # macOS (using Homebrew)
   brew install android-platform-tools
   
   # Linux (Ubuntu/Debian)
   sudo apt-get install adb
   ```

3. Verify connection:
   ```bash
   adb devices
   ```
   You should see your device listed

### Step 3: Deploy App

#### Using WebIDE:
1. Open WebIDE in Firefox
2. Click "Select Runtime"
3. Your Jio Phone should appear under "USB Devices"
4. Select your device
5. Load and run the app (same as simulator)

#### Manual Installation via ADB:
1. Package your app:
   ```bash
   cd tower-blocks/feature-phone
   zip -r tower-blocks.zip *
   ```

2. Install via ADB:
   ```bash
   adb push tower-blocks.zip /data/local/tmp/
   ```

3. Install from phone's file manager

### Step 4: Test on Device

1. Launch the app from Jio Phone app menu
2. Test all controls with physical buttons
3. Check performance and responsiveness
4. Verify screen fits 240x320 resolution

## ⚙️ Manifest Configuration

### Current manifest.webapp:

```json
{
  "version": "1.0.0",
  "name": "Tower Blocks",
  "short_name": "TowerBlocks",
  "description": "Stack blocks to build the tallest tower",
  "launch_path": "/index.html",
  "icons": {
    "56": "/icons/icon-56.png",
    "112": "/icons/icon-112.png"
  },
  "developer": {
    "name": "Tower Blocks Dev",
    "url": "https://example.com"
  },
  "type": "web",
  "default_locale": "en-US",
  "orientation": "portrait-primary",
  "display": "fullscreen",
  "permissions": {},
  "cursor": {
    "mode": "tab"
  }
}
```

### Key Manifest Fields:

- **version**: App version number
- **name**: Full app name (displayed in launcher)
- **short_name**: Short name for UI
- **launch_path**: Entry point HTML file
- **icons**: App icons (56x56 and 112x112 for KaiOS)
- **orientation**: Lock to portrait mode
- **display**: Fullscreen mode
- **type**: "web" for web apps, "privileged" for system access

### Optional: Add Icons

Create icons folder:
```bash
mkdir feature-phone/icons
```

Add icons:
- `icon-56.png` - 56x56 pixels
- `icon-112.png` - 112x112 pixels

## 🔍 Troubleshooting

### Issue: App won't load in simulator

**Solution:**
- Check manifest.webapp syntax (must be valid JSON)
- Verify all file paths are correct
- Check browser console for errors
- Try restarting the simulator

### Issue: Controls not working

**Solution:**
- Ensure JavaScript is enabled
- Check event listeners in app.js
- Test with both keyboard and mouse
- Verify key codes (13 for Enter, 53 for 5)

### Issue: Display issues (wrong size)

**Solution:**
- Verify viewport meta tag: `width=240, height=320`
- Check CSS fixed dimensions
- Ensure no responsive media queries in feature phone version
- Test canvas size in console: `document.querySelector('canvas')`

### Issue: Device not detected via ADB

**Solution:**
- Install proper USB drivers for Jio Phone
- Enable USB debugging on device
- Try different USB cable
- Run `adb kill-server` then `adb start-server`
- On Windows, install Jio Phone ADB drivers

### Issue: Performance problems

**Solution:**
- Reduce THREE.js rendering quality
- Disable antialiasing (already done in feature-phone version)
- Lower animation frame rate
- Optimize textures and geometries
- Reduce number of objects in scene

### Issue: App crashes on launch

**Solution:**
- Check console for JavaScript errors
- Verify all CDN links are accessible
- Test internet connection
- Reduce memory usage
- Check KaiOS version compatibility

## 📊 Performance Tips

### Optimize for KaiOS:

1. **Reduce Graphics Quality**
   - Disable antialiasing ✅ (already done)
   - Use simpler geometries
   - Limit shadow effects

2. **Memory Management**
   - Clean up unused objects
   - Dispose of Three.js geometries
   - Limit number of visible blocks

3. **Network Optimization**
   - Cache external libraries locally
   - Minimize HTTP requests
   - Use CDN with good KaiOS support

4. **Code Optimization**
   - Minimize JavaScript bundle
   - Remove console.logs in production
   - Use efficient algorithms

## 🎮 Testing Checklist

- [ ] App loads successfully in simulator
- [ ] Manifest is valid and recognized
- [ ] All controls work (5, Enter, D-Pad)
- [ ] Game starts correctly
- [ ] Score displays properly
- [ ] Game over screen appears
- [ ] Restart function works
- [ ] No console errors
- [ ] Performance is smooth (30+ FPS)
- [ ] UI fits 240x320 screen perfectly
- [ ] Softkeys display correctly
- [ ] App icon shows in launcher
- [ ] App can be exited properly
- [ ] Works on real device (if available)

## 📚 Additional Resources

- **KaiOS Developer Portal**: https://developer.kaiostech.com/
- **KaiOS Documentation**: https://developer.kaiostech.com/docs
- **WebIDE Guide**: https://developer.mozilla.org/en-US/docs/Tools/WebIDE
- **Three.js Documentation**: https://threejs.org/docs/
- **ADB Documentation**: https://developer.android.com/studio/command-line/adb

## 🆘 Support

If you encounter issues not covered here:
1. Check KaiOS developer forums
2. Review Three.js compatibility with older browsers
3. Test on KaiOS 2.5 vs 3.0 (different capabilities)
4. Verify all external dependencies load properly

---

**Good luck with your Tower Blocks game on KaiOS! 🎮📱**
