# Tower Blocks - Jio STB 4K Edition

## 📺 Jio Set-Top Box Optimized Version

This version of Tower Blocks is specifically optimized for **Jio Set-Top Box** running **Android TV 9+** with full **4K support** and adaptive scaling.

---

## 🎯 Platform Specifications

### Target Platform
- **Device**: Jio Set-Top Box (Android TV)
- **Operating System**: Android TV 9 and above
- **Maximum Resolution**: 4K (3840 x 2160 pixels)
- **Target Frame Rate**: 60 FPS
- **Graphics API**: OpenGL ES 2.0/3.0
- **Aspect Ratio**: 16:9 (flexible)

### Supported Resolutions
✅ **4K Ultra HD**: 3840 x 2160 @ 60fps  
✅ **Full HD (1080p)**: 1920 x 1080 @ 60fps  
✅ **HD (720p)**: 1280 x 720 @ 60fps  
✅ **SD (480p)**: 854 x 480 @ 60fps  
✅ **Low (360p)**: 640 x 360 @ 60fps  

### Supported Devices
✅ **Jio Set-Top Box (STB)** - All resolutions  
✅ **Smart TV** - 4K, Full HD, HD  
✅ **Desktop PC** - All resolutions (16:9, 16:10, 21:9)  
✅ **Laptop** - Full HD, HD, 480p  

**Automatic Scaling**: The game automatically detects and adapts to your screen's native resolution and aspect ratio.

---

## 🕹️ Multi-Input Controls

### 1. Jio Remote Control (Primary)
- **OK Button** → Place block
- **ENTER Button** → Place block  
- **BACK Button** → Exit game
- **D-Pad** → Menu navigation (when applicable)

### 2. Bluetooth Game Controllers
Supported Controllers:
- ✅ PlayStation 4 (PS4) Controller
- ✅ Xbox Controller
- ✅ Generic Bluetooth Gamepads

**Controller Mapping:**
- **A Button (Xbox) / X Button (PS4)** → Place block
- **B Button (Xbox) / Circle (PS4)** → Back/Exit
- **Start Button** → Pause/Menu

### 3. Smartphone as Controller
- **Touch/Tap** → Place block
- Use your smartphone as a touchpad controller

---

## 📦 Package Information

```json
{
  "package": "com.kaifoundry.towerblocksSTB",
  "name": "Tower Blocks",
  "version": "1.0.0",
  "platform": "Android TV 9+",
  "device_type": "Set-Top Box (STB)",
  "max_resolution": "3840x2160",
  "target_fps": 60
}
```

---

## 🎨 Responsive UI Features

### Adaptive Scaling
- **CSS `clamp()`** functions for responsive text sizing
- **Viewport units** (vw, vh) for flexible layouts
- **Media queries** for resolution-specific optimizations
- **Safe area margins** (5% padding) for TV overscan

### Resolution-Specific Optimizations

#### 4K (3840x2160)
```css
- Font sizes scale up to 160px
- Tighter safe area (4% margins)
- Maximum quality assets
- Enhanced text shadows
```

#### Full HD (1920x1080)
```css
- Standard font sizes (120px score)
- 5% safe area margins
- Balanced quality/performance
```

#### HD (1280x720)
```css
- Smaller fonts (optimized for readability)
- Larger safe area (6% margins)
- Performance-optimized rendering
```

#### SD/480p (854x480)
```css
- Compact UI elements
- Font sizes: 40-80px (score)
- 3% safe area margins
- Optimized for older TVs/monitors
```

#### Low/360p (640x360)
```css
- Minimal UI footprint
- Font sizes: 32-64px (score)
- 2% safe area margins
- Maximum readability on small screens
- Scrollable content where needed
```

#### Desktop PC
```css
- Mouse hover effects
- Enhanced cursor interactions
- Optimized text rendering
- Support for ultrawide (21:9) monitors
- Max container: 2560x1440px
```

---

## 🚀 Performance Optimizations

### 60 FPS Target
- **GPU Acceleration**: `transform: translateZ(0)`
- **Hardware Rendering**: CSS `will-change` properties
- **Efficient Animations**: GSAP/TweenMax
- **Canvas Optimization**: Three.js WebGL renderer

### Memory Management
- **Optimized for 1-2GB RAM**
- **Texture compression**
- **Efficient garbage collection**
- **Asset preloading**

### System Requirements
- **Minimum RAM**: 1GB
- **Recommended RAM**: 2GB
- **Storage**: 8GB internal (minimal footprint)
- **Internet**: Optional (for SDK features)

---

## 🎮 How to Run

### Local Testing (Browser)
1. Open `index.html` in Chrome/Firefox
2. Press **F11** for fullscreen
3. Use **ENTER** or **SPACEBAR** to play
4. Connect a game controller for testing

### On Jio Set-Top Box
1. Deploy to Jio STB platform
2. Install via Android TV package manager
3. Launch from Android TV home screen
4. Use Jio remote or Bluetooth controller

### Performance Monitoring
- Open browser console (F12)
- Check FPS counter in console logs
- Monitor resolution detection
- View active input devices

---

## 📁 File Structure

```
STB/
├── index.html              # 4K-optimized HTML
├── app.js                  # Game logic (Three.js)
├── style.css               # Responsive CSS (4K/1080p/720p)
├── jiogames_stb.js         # JioGames SDK wrapper
├── manifest.json           # Android TV app manifest
├── manifest.webapp         # WebApp manifest
└── README.md              # This file
```

---

## 🎨 Technical Features

### Graphics
- **3D Engine**: Three.js (WebGL)
- **Shaders**: OpenGL ES 2.0/3.0 compatible
- **Rendering**: Hardware-accelerated
- **Anti-aliasing**: Enabled
- **Textures**: High-resolution (4K ready)

### CSS Features
- **Flexbox** for adaptive layouts
- **CSS Grid** for menu systems
- **Clamp()** for responsive sizing
- **Custom properties** for theming
- **Media queries** for breakpoints

### JavaScript Features
- **Gamepad API** for controller support
- **Performance API** for FPS monitoring
- **Screen Detection** for resolution adapting
- **Event handling** for multiple inputs

---

## 🔧 Customization

### Adjust Safe Areas
Edit `style.css`:
```css
#container {
    padding: 5vh 5vw; /* Change percentage for safe area */
}
```

### Change Target FPS
Edit `index.html`:
```javascript
if (fps < 55) {  // Change threshold
    console.warn("⚠ Performance below target");
}
```

### Add Custom Controls
Edit `index.html` gamepad section to map additional buttons.

---

## 📊 Debug Information

Console logs display:
- ✓ Detected screen resolution
- ✓ Pixel ratio (DPI)
- ✓ Active input devices
- ✓ Current FPS
- ✓ Connected controllers
- ✓ Performance warnings

---

## 🐛 Troubleshooting

### Low FPS (<60)
- Reduce resolution in browser settings
- Close background apps
- Check STB RAM usage
- Disable browser extensions

### Controller Not Detected
- Ensure Bluetooth is enabled
- Re-pair the controller
- Check battery level
- Try a different controller

### UI Too Large/Small
- Check TV resolution settings
- Verify aspect ratio (16:9)
- Adjust TV zoom/overscan settings

---

## 📝 Notes

- **Orientation**: Landscape only (enforced)
- **Internet**: Optional (offline playable)
- **Storage**: <50MB total size
- **Updates**: Check for SDK updates periodically

---

## 🏆 Credits

**Developed for**: Jio Set-Top Box Platform  
**Package**: com.kaifoundry.towerblocksSTB
**Platform**: Android TV 9+  
**Graphics**: Three.js + OpenGL ES  
**Optimized**: 4K @ 60 FPS  

---

**Enjoy Tower Blocks on your Jio STB in stunning 4K!** 🎮📺✨
