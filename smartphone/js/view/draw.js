define(["model/images", "model/canvas", "model/game", "model/character", "controller/gameLogic", "model/inPlay", "controller/action"],
    function (Images, Canvas, Game, Character, GameLogic, InPlay, Action) {
        var drawStars = function drawStars() {
            var i, size, x, y;
            for (i = 0; i < Game.stars.length; i += 1) {
                if (Game.stars[i].x < 0) {
                    Game.stars[i] = Game.generateStar(true);
                }
                size = Game.stars[i].speed / 2;
                x = Game.stars[i].x;
                y = Game.stars[i].y;
                Canvas.context.fillStyle = "rgba(255,255,255,0.5)";
                Canvas.context.fillRect(x, y, size, size);
                Game.stars[i].x -= Game.stars[i].speed;
            }
        };

        var drawBackground = function drawBackground() {
            var mousex, mousey;
            mousex = Game.mouse.pos.x;
            mousey = Game.mouse.pos.Y;
            //Black space
            Canvas.context.fillStyle = "#000000";
            Canvas.context.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
            //Debris/Stars
            drawStars();
        };
        var drawMainMenu = function drawMainMenu() {
            var ctx = Canvas.context;
            var cw = Canvas.canvasWidth;
            var ch = Canvas.canvasHeight;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            
            // Modern gradient background panel
            var panelWidth = cw * 0.5;
            var panelHeight = ch * 0.7;
            var panelX = (cw - panelWidth) / 2;
            var panelY = (ch - panelHeight) / 2;
            
            // Semi-transparent panel with glow
            ctx.shadowColor = "rgba(0, 150, 255, 0.5)";
            ctx.shadowBlur = 30;
            var gradient = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelHeight);
            gradient.addColorStop(0, "rgba(10, 25, 47, 0.95)");
            gradient.addColorStop(1, "rgba(15, 35, 70, 0.95)");
            ctx.fillStyle = gradient;
            ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            ctx.shadowBlur = 0;
            
            // Border glow
            ctx.strokeStyle = "rgba(0, 180, 255, 0.8)";
            ctx.lineWidth = 3;
            ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            
            // Title: SPACE BATTLE
            ctx.save();
            ctx.shadowColor = "rgba(255, 200, 0, 0.8)";
            ctx.shadowBlur = 20;
            ctx.font = "bold " + Math.floor(cw / 15) + "px Arial";
            ctx.fillStyle = "#FFD700";
            ctx.textAlign = "center";
            ctx.fillText("SPACE BATTLE", cw / 2, panelY + ch * 0.1);
            ctx.restore();
            
            // Subtitle
            ctx.font = Math.floor(cw / 45) + "px Arial";
            ctx.fillStyle = "rgba(200, 220, 255, 0.9)";
            ctx.textAlign = "center";
            ctx.fillText("THE ULTIMATE SPACE COMBAT EXPERIENCE", cw / 2, panelY + ch * 0.15);
            
            // Button definitions
            var buttonWidth = panelWidth * 0.7;
            var buttonHeight = ch * 0.08;
            var buttonX = cw / 2 - buttonWidth / 2;
            var startY = panelY + ch * 0.25;
            var buttonSpacing = ch * 0.12;
            
            var buttons = [
                {label: "START GAME", y: startY, action: "start", color: "#00ff88"},
                {label: "OPTIONS", y: startY + buttonSpacing, action: "options", color: "#ffaa00"},
                {label: "STATISTICS", y: startY + buttonSpacing * 2, action: "stats", color: "#00aaff"},
                {label: "HELP", y: startY + buttonSpacing * 3, action: "help", color: "#ff00ff"}
            ];
            
            // Draw buttons
            buttons.forEach(function(btn) {
                var isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                               mouseY >= btn.y && mouseY <= btn.y + buttonHeight;
                
                // Button background
                if (isHovered) {
                    ctx.shadowColor = btn.color;
                    ctx.shadowBlur = 20;
                    var btnGradient = ctx.createLinearGradient(buttonX, btn.y, buttonX, btn.y + buttonHeight);
                    btnGradient.addColorStop(0, btn.color);
                    btnGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
                    ctx.fillStyle = btnGradient;
                } else {
                    ctx.fillStyle = "rgba(30, 50, 80, 0.6)";
                }
                
                ctx.fillRect(buttonX, btn.y, buttonWidth, buttonHeight);
                ctx.shadowBlur = 0;
                
                // Button border
                ctx.strokeStyle = isHovered ? btn.color : "rgba(100, 150, 200, 0.5)";
                ctx.lineWidth = isHovered ? 3 : 2;
                ctx.strokeRect(buttonX, btn.y, buttonWidth, buttonHeight);
                
                // Button text
                ctx.font = "bold " + Math.floor(cw / 35) + "px Arial";
                ctx.fillStyle = isHovered ? "#fff" : "rgba(200, 220, 255, 0.9)";
                ctx.textAlign = "center";
                ctx.fillText(btn.label, cw / 2, btn.y + buttonHeight / 2 + buttonHeight * 0.12);
            });
            
            // Footer text
            ctx.font = Math.floor(cw / 60) + "px Arial";
            ctx.fillStyle = "rgba(150, 170, 200, 0.7)";
            ctx.textAlign = "center";
            ctx.fillText("Click to select | ESC to exit", cw / 2, panelY + panelHeight - ch * 0.04);
        };

        var drawOptions = function drawOptions() {
            var ctx = Canvas.context;
            var cw = Canvas.canvasWidth;
            var ch = Canvas.canvasHeight;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            
            // Modern gradient background panel
            var panelWidth = cw * 0.5;
            var panelHeight = ch * 0.6;
            var panelX = (cw - panelWidth) / 2;
            var panelY = (ch - panelHeight) / 2;
            
            // Semi-transparent panel with glow
            ctx.shadowColor = "rgba(255, 150, 0, 0.5)";
            ctx.shadowBlur = 30;
            var gradient = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelHeight);
            gradient.addColorStop(0, "rgba(10, 25, 47, 0.95)");
            gradient.addColorStop(1, "rgba(15, 35, 70, 0.95)");
            ctx.fillStyle = gradient;
            ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            ctx.shadowBlur = 0;
            
            // Border glow
            ctx.strokeStyle = "rgba(255, 150, 0, 0.8)";
            ctx.lineWidth = 3;
            ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            
            // Title: OPTIONS
            ctx.save();
            ctx.shadowColor = "rgba(255, 150, 0, 0.8)";
            ctx.shadowBlur = 20;
            ctx.font = "bold " + Math.floor(cw / 18) + "px Arial";
            ctx.fillStyle = "#ffaa00";
            ctx.textAlign = "center";
            ctx.fillText("OPTIONS", cw / 2, panelY + ch * 0.1);
            ctx.restore();
            
            // Toggle buttons
            var buttonWidth = panelWidth * 0.7;
            var buttonHeight = ch * 0.08;
            var buttonX = cw / 2 - buttonWidth / 2;
            var startY = panelY + ch * 0.18;
            var buttonSpacing = ch * 0.11;
            
            var musicLabel = Game.muteMusic ? "MUSIC: OFF" : "MUSIC: ON";
            var sfxLabel = Game.muteSFX ? "SFX: OFF" : "SFX: ON";
            
            var buttons = [
                {label: musicLabel, y: startY, color: Game.muteMusic ? "#ff4444" : "#44ff44"},
                {label: sfxLabel, y: startY + buttonSpacing, color: Game.muteSFX ? "#ff4444" : "#44ff44"},
                {label: "BACK TO MENU", y: startY + buttonSpacing * 2.5, color: "#00aaff"}
            ];
            
            // Draw buttons
            buttons.forEach(function(btn) {
                var isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                               mouseY >= btn.y && mouseY <= btn.y + buttonHeight;
                
                // Button background
                if (isHovered) {
                    ctx.shadowColor = btn.color;
                    ctx.shadowBlur = 20;
                    var btnGradient = ctx.createLinearGradient(buttonX, btn.y, buttonX, btn.y + buttonHeight);
                    btnGradient.addColorStop(0, btn.color);
                    btnGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
                    ctx.fillStyle = btnGradient;
                } else {
                    ctx.fillStyle = "rgba(30, 50, 80, 0.6)";
                }
                
                ctx.fillRect(buttonX, btn.y, buttonWidth, buttonHeight);
                ctx.shadowBlur = 0;
                
                // Button border
                ctx.strokeStyle = isHovered ? btn.color : "rgba(100, 150, 200, 0.5)";
                ctx.lineWidth = isHovered ? 3 : 2;
                ctx.strokeRect(buttonX, btn.y, buttonWidth, buttonHeight);
                
                // Button text
                ctx.font = "bold " + Math.floor(cw / 35) + "px Arial";
                ctx.fillStyle = isHovered ? "#fff" : "rgba(200, 220, 255, 0.9)";
                ctx.textAlign = "center";
                ctx.fillText(btn.label, cw / 2, btn.y + buttonHeight / 2 + buttonHeight * 0.12);
            });
        };

        var drawMenu = function drawMenu() {
            switch (Game.screen) {
            case "main_menu":
                Draw.drawMainMenu();
                break;
            case "game_over":
                Draw.drawGameOver();
                break;
            case "options":
                Draw.drawOptions();
                break;
            case "stats":
                Draw.drawStats();
                break;
            case "paused":
                Draw.drawPause();
                break;
            default:
                break;
            }
        };

        var drawPlayerShip = function drawPlayerShip() {
            var sprite, sx, sy, width, height, x, y, frame;
			frame = Character.ship.player.frame;
            x = Character.ship.player.pos.x;
            y = Character.ship.player.pos.y;
            sprite = Character.ship.player.sprite;
            width = Character.ship.player.width;
            height = Character.ship.player.height;
            sy = 0;
            if (Character.ship.player.hp > 0) {
                Canvas.context.drawImage(Images.gun0, x + 55, y - 8.5);
                if (frame === 0) {
                    sx = 0;
                } else if (frame === 1) {
                    sx = 75;
                } else if (frame === 2) {
                    sx = 150;
                } else if (frame === 3) {
                    sx = 225;
                }
                Character.ship.player.frame += 1;
                if (Character.ship.player.frame >= 4) {
                    Character.ship.player.frame = 0;
                }
            } else {
				width = 192;
				height = 192;
				sprite = Images.explosion;
				if (frame === 0) {
                    sx = 0;
                } else if (frame <= 1) {
                    sx = 192;
                } else if (frame <= 2) {
                    sx = 384;
                } else if (frame <= 3) {
                    sx = 576;
                } else if (frame <= 4) {
                    sx = 768;
                } else if (frame <= 5) {
                    sx = 960;
                } else if (frame <= 6) {
                    sx = 0;
					sy = 192;
                } else if (frame <= 7) {
                    sx = 192;
					sy = 192;
                }
                Character.ship.player.frame += 0.2;
			}
			Canvas.context.drawImage(sprite, sx, sy, width, height, x, y - (height / 2), width, height);
        };

        var drawPowerups = function drawPowerups() {
            var i;
            var powerUps = InPlay.powerUps;
            for (i = 0; i < powerUps.length; i += 1) {
                if (powerUps[i].alive) {
                    Canvas.context.drawImage(powerUps[i].icon, powerUps[i].x, powerUps[i].y);
                    if (powerUps[i].x <= -10) {
                        powerUps[i].alive = false;
                    } else {
                        powerUps[i].x -= 4;
                    }
                }
            }
        };

        var drawEnemies = function drawEnemies() {
            var i, relativeTime;
            var enemies = InPlay.enemies;
            for (i = 0; i < enemies.length; i += 1) {
                if (enemies[i].alive) {
                    relativeTime = Game.timer - GameLogic.level.startTime;
                    if (relativeTime > enemies[i].time) {
                        Canvas.context.drawImage(enemies[i].ship, enemies[i].x, enemies[i].y);
                        if (enemies[i].x <= -140) {
                            enemies[i].alive = false;
                            Character.ship.player.score -= enemies[i].score * 1.4;
                        } else {
                            enemies[i].x -= enemies[i].speed;
                            if (enemies[i].name === "interceptor") {
								if (enemies[i].x > Canvas.canvasWidth/2) {
									if (enemies[i].y + 2 < Character.ship.player.pos.y - 49.5) {
										enemies[i].y += 2;
									} else if (enemies[i].y - 2 > Character.ship.player.pos.y - 49.5) {
										enemies[i].y -= 2;
									}
								}
                            }
                            if (enemies[i].fireRate > 0) {
                                if ((relativeTime-enemies[i].time) % enemies[i].fireRate <= 0.02) {
                                    enemies[i].hasShot = true;
                                    Action.enemyShoot(enemies[i].x, enemies[i].y, enemies[i].damage);
                                }
                            }
                        }
                    }
                }
            }
        };

        var drawBullets = function drawBullets() {
            var i;
            var playerBullets = InPlay.playerBullets;
            var enemyBullets = InPlay.enemyBullets;
            for (i = 0; i < playerBullets.length; i += 1) {
                if (playerBullets[i].alive) {
                    Canvas.context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
                    if (playerBullets[i].x >= Canvas.canvasWidth) {
                        playerBullets.shift();
                    } else {
                        playerBullets[i].x += 40;
                    }
                }
            }
            for (i = 0; i < enemyBullets.length; i += 1) {
                if (enemyBullets[i].alive) {
                    Canvas.context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
                    if (enemyBullets[i].x <= 0) {
                        enemyBullets.shift();
                    } else {
                        enemyBullets[i].x -= 10;
                    }
                }
            }
        };

        var drawScore = function drawScore() {
            var score = Character.ship.player.score;
            Canvas.context.fillStyle = ("yellow");
            Canvas.context.fillText("Score: " + score, Canvas.canvasWidth * 0.6, 40);
        };

        var drawHP = function drawHP() {
            var hp = Character.ship.player.hp;
            Canvas.context.fillStyle = ("yellow");
            Canvas.context.fillText("Health: " + hp, 0, 40);
        };

        var drawGameOver = function drawGameOver() {
            var ctx = Canvas.context;
            var cw = Canvas.canvasWidth;
            var ch = Canvas.canvasHeight;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            
            Draw.drawPlayerShip();
            
            // Modern gradient background panel
            var panelWidth = cw * 0.5;
            var panelHeight = ch * 0.65;
            var panelX = (cw - panelWidth) / 2;
            var panelY = (ch - panelHeight) / 2;
            
            // Semi-transparent panel with red glow
            ctx.shadowColor = "rgba(255, 50, 50, 0.6)";
            ctx.shadowBlur = 40;
            var gradient = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelHeight);
            gradient.addColorStop(0, "rgba(25, 10, 10, 0.95)");
            gradient.addColorStop(1, "rgba(50, 15, 15, 0.95)");
            ctx.fillStyle = gradient;
            ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            ctx.shadowBlur = 0;
            
            // Border glow
            ctx.strokeStyle = "rgba(255, 50, 50, 0.9)";
            ctx.lineWidth = 4;
            ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            
            // Title: GAME OVER
            ctx.save();
            ctx.shadowColor = "rgba(255, 0, 0, 0.9)";
            ctx.shadowBlur = 30;
            ctx.font = "bold " + Math.floor(cw / 14) + "px Arial";
            ctx.fillStyle = "#ff3333";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", cw / 2, panelY + ch * 0.1);
            ctx.restore();
            
            // High Score badge
            if (Game.isHighscore) {
                ctx.save();
                ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
                ctx.shadowBlur = 20;
                ctx.font = "bold " + Math.floor(cw / 30) + "px Arial";
                ctx.fillStyle = "#FFD700";
                ctx.textAlign = "center";
                ctx.fillText("★ NEW HIGH SCORE ★", cw / 2, panelY + ch * 0.17);
                ctx.restore();
            }
            
            // Stats display
            ctx.font = "bold " + Math.floor(cw / 35) + "px Arial";
            ctx.fillStyle = "rgba(200, 220, 255, 0.9)";
            ctx.textAlign = "center";
            ctx.fillText("LEVEL: " + Game.level, cw / 2, panelY + ch * 0.25);
            
            ctx.font = "bold " + Math.floor(cw / 28) + "px Arial";
            ctx.fillStyle = "#ffaa00";
            ctx.fillText("SCORE: " + Math.floor(Character.ship.player.score), cw / 2, panelY + ch * 0.32);
            
            // Button definitions
            var buttonWidth = panelWidth * 0.7;
            var buttonHeight = ch * 0.08;
            var buttonX = cw / 2 - buttonWidth / 2;
            var startY = panelY + ch * 0.4;
            var buttonSpacing = ch * 0.12;
            
            var buttons = [
                {label: "RESTART", y: startY, color: "#44ff44"},
                {label: "MAIN MENU", y: startY + buttonSpacing, color: "#00aaff"}
            ];
            
            // Draw buttons
            buttons.forEach(function(btn) {
                var isHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                               mouseY >= btn.y && mouseY <= btn.y + buttonHeight;
                
                // Button background
                if (isHovered) {
                    ctx.shadowColor = btn.color;
                    ctx.shadowBlur = 20;
                    var btnGradient = ctx.createLinearGradient(buttonX, btn.y, buttonX, btn.y + buttonHeight);
                    btnGradient.addColorStop(0, btn.color);
                    btnGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
                    ctx.fillStyle = btnGradient;
                } else {
                    ctx.fillStyle = "rgba(30, 50, 80, 0.6)";
                }
                
                ctx.fillRect(buttonX, btn.y, buttonWidth, buttonHeight);
                ctx.shadowBlur = 0;
                
                // Button border
                ctx.strokeStyle = isHovered ? btn.color : "rgba(100, 150, 200, 0.5)";
                ctx.lineWidth = isHovered ? 3 : 2;
                ctx.strokeRect(buttonX, btn.y, buttonWidth, buttonHeight);
                
                // Button text
                ctx.font = "bold " + Math.floor(cw / 35) + "px Arial";
                ctx.fillStyle = isHovered ? "#fff" : "rgba(200, 220, 255, 0.9)";
                ctx.textAlign = "center";
                ctx.fillText(btn.label, cw / 2, btn.y + buttonHeight / 2 + buttonHeight * 0.12);
            });
        };

        var drawStats = function drawStats() {
            var part1, part2, mainMenu, resetStats, mouseX, mouseY;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            mouseX = Game.mouse.pos.x;
            mouseY = Game.mouse.pos.y;
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
                mainMenu = Images.mainMenu1;
            } else {
                mainMenu = Images.mainMenu0;
            }
            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                resetStats = Images.resetStats1;
            } else {
                resetStats = Images.resetStats0;
            }
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.fillStyle = 'rgba(0,0,0,0.5)';
            Canvas.context.fillRect(part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.fillStyle = 'yellow';
            Canvas.context.drawImage(mainMenu, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(resetStats, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
            Canvas.context.fillText("Highscore: " + Game.highscore, part1 * 1.1, part2 * 0.5);
            Canvas.context.fillText("Enemies killed", part1 * 1.1, part2);
            Canvas.context.fillText("Scout: " + Game.scout, part1 * 1.1, part2 * 1.40);
            Canvas.context.fillText("Fighter: " + Game.fighter, part1 * 1.1, part2 * 1.70);
            Canvas.context.fillText("Interceptor: " + Game.interceptor, part1 * 1.1, part2 * 2);
            Canvas.context.fillText("Tank: " + Game.tank, part1 * 1.1, part2 * 2.30);
            Canvas.context.fillText("Transporter: " + Game.transport, part1 * 1.1, part2 * 2.60);
        };

        var drawPause = function drawPause() {
            Canvas.context.drawImage(Images.pauseScreen, 0, 0, Canvas.canvasWidth, Canvas.canvasHeight);
        };

        var drawGame = function drawGame() {
            if (Game.levelStarted) {
                Draw.drawScore();
                Draw.drawHP();
            } else {
                Canvas.context.fillStyle = ("yellow");
                Canvas.context.fillText("Level: " + Game.level, (Canvas.canvasWidth / 2) - 80, Canvas.canvasHeight / 2);
            }
            Draw.drawBullets();
            Draw.drawPlayerShip();
            Draw.drawEnemies();
            Draw.drawPowerups();
        };

        var Draw = {
            //functions

            drawStars: drawStars,
            drawBackground: drawBackground,
            drawHP: drawHP,
            drawScore: drawScore,
            drawPlayerShip: drawPlayerShip,
            drawEnemies: drawEnemies,
            drawPowerups: drawPowerups,
            drawBullets: drawBullets,
            drawGame: drawGame,
            drawMainMenu: drawMainMenu,
            drawOptions: drawOptions,
            drawMenu: drawMenu,
            drawStats: drawStats,
            drawPause: drawPause,
            drawGameOver: drawGameOver
        };

        return Draw;
    });