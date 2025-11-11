#  Block Tower Game

This is a simple game called Block Tower where the objective is to stack blocks as high as possible. The game is built using JavaScript, HTML, and CSS.

## 📱 Multi-Platform Support

This project now includes optimized versions for both **Feature Phones (KaiOS/Jio Phone)** and **Smartphones**!

### 🗂️ Project Structure

```
tower-blocks/
├── feature-phone/          # KaiOS/Jio Phone version (240x320)
│   ├── manifest.webapp     # KaiOS manifest for simulator
│   ├── index.html
│   ├── style.css
│   └── app.js
├── smartphone/             # Smartphone version (responsive)
│   ├── index.html
│   ├── style.css
│   └── app.js
├── README.md
└── Tower-Blocks-Setup-Guide.md
```

## 📱 Feature Phone Version (KaiOS/Jio Phone)

### Features:
- ✅ Optimized for 240x320 resolution
- ✅ D-Pad navigation support (Press 5 or Enter to place blocks)
- ✅ KaiOS softkey UI
- ✅ Reduced antialiasing for better performance
- ✅ Fixed viewport (no resize)
- ✅ Includes `manifest.webapp` for KaiOS simulator testing

### Controls:
- **5 Key** or **Enter**: Place block / Start game / Restart
- **Click/Touch**: Also supported for testing

### Testing on KaiOS Simulator:
1. Install KaiOS Simulator or use WebIDE
2. Open the `feature-phone` folder in the simulator
3. The `manifest.webapp` file will be automatically detected
4. Launch the app and test with keyboard controls

## 📱 Smartphone Version

### Features:
- ✅ Full responsive design
- ✅ Touch and click support
- ✅ Spacebar support for desktop
- ✅ Full antialiasing for better graphics
- ✅ Adaptive viewport

### Controls:
- **Click/Tap**: Place block
- **Spacebar**: Place block (desktop)

## Game Overview

Block Tower is a fun and addictive game where players aim to stack blocks as high as they can without toppling the tower. The game features simple gameplay where players click or tap to drop each block onto the tower. The tower's stability is affected by the positioning and alignment of the blocks, adding a physics simulation aspect to the game.

## Installation

To run the Block Tower game locally, follow these steps:

1. Clone the repository or download the source code.
   ```bash
   git clone https://github.com/TomNgo03/Tower-Block.git
   ```

2. Open the project directory in your preferred code editor.

## Usage

### For Smartphones:
1. Navigate to the `smartphone` folder
2. Open `index.html` in your web browser
3. Click or tap to place blocks
4. Press spacebar (desktop) to place blocks

### For Feature Phones (KaiOS):
1. Navigate to the `feature-phone` folder
2. Open in KaiOS Simulator or WebIDE
3. Use 5 key or Enter to place blocks
4. Test on Jio Phone or KaiOS device

## Testing

### KaiOS Simulator Testing:
```bash
# Navigate to feature-phone directory
cd feature-phone

# The manifest.webapp file is already configured for:
# - App name: Tower Blocks
# - Resolution: 240x320
# - Orientation: Portrait
# - Type: Web app
```

### Browser Testing:
- **Smartphone version**: Open `smartphone/index.html` in any modern browser
- **Feature phone version**: Open `feature-phone/index.html` in browser (simulates 240x320 viewport)

## Customization

The Block Tower game is highly customizable:

- **Styling**: Modify the CSS styles in `style.css` to customize appearance
- **Game Rules**: Adjust game logic in `app.js` for gameplay mechanics
- **Resolution**: Feature phone version is optimized for 240x320, smartphone version is responsive
- **Controls**: Both versions support their respective platform controls

## Technical Details

### Feature Phone Optimizations:
- Fixed canvas size (240x240 for game area)
- Disabled antialiasing for performance
- Optimized UI elements for small screen
- KaiOS D-Pad navigation
- Reduced font sizes and spacing

### Smartphone Optimizations:
- Responsive canvas that adapts to screen size
- Full antialiasing for smooth graphics
- Touch and mouse support
- Larger UI elements
- Flexible viewport

## Contributing

Contributions to this project are welcome! If you have suggestions for improvements, new features, or encounter any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. You can find the full license text in the LICENSE file.

## Credits

Original game concept and code structure inspired by Tower Block games.
Adapted for multi-platform support with KaiOS optimization.

---

**Live Demo**: [https://kaios.quadbtech.com/tower-blocks/](https://kaios.quadbtech.com/tower-blocks/)
