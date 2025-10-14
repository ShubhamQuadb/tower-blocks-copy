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
            var w = Canvas.canvasWidth;
            var h = Canvas.canvasHeight;
            
            try {
                // Deep space gradient background
                var bgGradient = ctx.createLinearGradient(0, 0, 0, h);
                bgGradient.addColorStop(0, "#000814");
                bgGradient.addColorStop(0.5, "#001d3d");
                bgGradient.addColorStop(1, "#003566");
                ctx.fillStyle = bgGradient;
                ctx.fillRect(0, 0, w, h);
                
                // Animated starfield with different layers
                var time = Date.now();
                for (var i = 0; i < 40; i++) {
                    var layer = i % 3;
                    var speed = layer === 0 ? 30 : layer === 1 ? 50 : 80;
                    var starX = (i * 23 + time / speed) % w;
                    var starY = (i * 31) % h;
                    var starSize = layer + 1;
                    var brightness = 0.3 + (layer * 0.2) + Math.random() * 0.3;
                    ctx.fillStyle = "rgba(255, 255, 255, " + brightness + ")";
                    ctx.fillRect(starX, starY, starSize, starSize);
                }
                
                // Distant planets/circles
                ctx.fillStyle = "rgba(255, 200, 100, 0.1)";
                ctx.beginPath();
                ctx.arc(40, 80, 25, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = "rgba(100, 150, 255, 0.08)";
                ctx.beginPath();
                ctx.arc(200, 280, 30, 0, Math.PI * 2);
                ctx.fill();
            } catch(e) {
                ctx.fillStyle = "#001d3d";
                ctx.fillRect(0, 0, w, h);
            }
            
            // Glowing game title with modern design
            var pulse = 1 + Math.sin(Date.now() / 300) * 0.1;
            
            // Title background glow
            ctx.shadowBlur = 25 * pulse;
            ctx.shadowColor = "#ffd60a";
            ctx.fillStyle = "rgba(255, 214, 10, 0.15)";
            ctx.fillRect(20, 25, w-40, 65);
            
            // Main title - SPACE
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ffd60a";
            ctx.fillStyle = "#ffd60a";
            ctx.font = "bold 28px Arial";
            ctx.textAlign = "center";
            ctx.fillText("SPACE", w/2, 52);
            
            // Subtitle - BATTLE
            ctx.shadowColor = "#ffc300";
            ctx.fillStyle = "#ffc300";
            ctx.font = "bold 22px Arial";
            ctx.fillText("BATTLE", w/2, 75);
            ctx.shadowBlur = 0;
            
            // Version tag
            ctx.fillStyle = "#adb5bd";
            ctx.font = "8px Arial";
            ctx.fillText("v1.0 | KAIOS EDITION", w/2, 88);
            
            // Start instruction (no button - direct start with 5)
            ctx.fillStyle = "#ffd60a";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Press 5 to Start", w/2, 125);
            
            // Quick controls guide - compact
            ctx.fillStyle = "#8ecae6";
            ctx.font = "bold 10px Arial";
            ctx.fillText("CONTROLS", w/2, 195);
            
            // Control icons in a row
            ctx.fillStyle = "rgba(0, 180, 216, 0.2)";
            ctx.fillRect(30, 205, w-60, 45);
            ctx.strokeStyle = "#0096c7";
            ctx.lineWidth = 1;
            ctx.strokeRect(30, 205, w-60, 45);
            
            // Movement (2=UP, 8=DOWN, 4=LEFT, 6=RIGHT)
            ctx.fillStyle = "#caf0f8";
            ctx.font = "9px Arial";
            ctx.fillText("MOVE", 65, 220);
            ctx.fillStyle = "#90e0ef";
            ctx.font = "bold 12px Arial";
            ctx.fillText("2846", 65, 235);
            
            // Divider
            ctx.strokeStyle = "#0096c7";
            ctx.beginPath();
            ctx.moveTo(120, 210);
            ctx.lineTo(120, 245);
            ctx.stroke();
            
            // Fire
            ctx.fillStyle = "#caf0f8";
            ctx.font = "9px Arial";
            ctx.fillText("FIRE", 175, 220);
            ctx.fillStyle = "#ffd60a";
            ctx.font = "bold 16px Arial";
            ctx.fillText("5", 175, 237);
            
            // Mission briefing
            ctx.fillStyle = "#adb5bd";
            ctx.font = "9px Arial";
            ctx.fillText("⚡ Defend against alien invasion", w/2, 270);
            ctx.fillText("💎 Collect power-ups", w/2, 285);
            ctx.fillText("🏆 Beat your high score", w/2, 300);
        };

        var drawOptions = function drawOptions() {
            var part1, part2, muteMusic, muteSFX, mainMenu;
            part1 = Canvas.canvasWidth / 4;
            part2 = Canvas.canvasHeight / 4;
            var mouseX = Game.mouse.pos.x;
            var mouseY = Game.mouse.pos.y;
            //Button animation
            if (Game.muteMusic) {
                muteMusic = Images.muteMusic1;
            } else {
                muteMusic = Images.muteMusic0;
            }
            if (Game.muteSFX) {
                muteSFX = Images.muteSFX1;
            } else {
                muteSFX = Images.muteSFX0;
            }

            if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
                mainMenu = Images.mainMenu1;
            } else {
                mainMenu = Images.mainMenu0;
            }
            //drawing button
            Canvas.context.drawImage(Images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
            Canvas.context.drawImage(Images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
            Canvas.context.drawImage(muteMusic, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(muteSFX, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
            Canvas.context.drawImage(mainMenu, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
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
            var ctx = Canvas.context;
            var x = Character.ship.player.pos.x;
            var y = Character.ship.player.pos.y;
            var frame = Character.ship.player.frame;
            
            if (Character.ship.player.hp > 0) {
                try {
                    ctx.save();
                    
                    // Engine Glow (animated with circles instead of ellipse)
                    var engineGlow = Math.sin(Date.now() / 100) * 0.5 + 0.5;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = "#00FFFF";
                    ctx.fillStyle = "rgba(0, 255, 255, " + (0.6 + engineGlow * 0.4) + ")";
                    ctx.beginPath();
                    ctx.arc(x - 2, y - 10, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(x - 2, y + 10, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    
                    // Main Body (futuristic design)
                    var shipGradient = ctx.createLinearGradient(x, y - 20, x + 35, y);
                    shipGradient.addColorStop(0, "#1a4d7a");
                    shipGradient.addColorStop(0.5, "#2a6fab");
                    shipGradient.addColorStop(1, "#00AAFF");
                    ctx.fillStyle = shipGradient;
                    
                    // Ship body path
                    ctx.beginPath();
                    ctx.moveTo(x, y - 18);      // Top left
                    ctx.lineTo(x + 28, y - 8);  // Top right
                    ctx.lineTo(x + 35, y);      // Nose tip
                    ctx.lineTo(x + 28, y + 8);  // Bottom right
                    ctx.lineTo(x, y + 18);      // Bottom left
                    ctx.lineTo(x + 8, y);       // Back center
                    ctx.closePath();
                    ctx.fill();
                    
                    // Ship outline
                    ctx.strokeStyle = "#00FFFF";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    // Cockpit window (circle instead of ellipse)
                    ctx.fillStyle = "#00FFFF";
                    ctx.beginPath();
                    ctx.arc(x + 12, y, 4, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Wing details
                    ctx.fillStyle = "#FFD700";
                    ctx.fillRect(x + 6, y - 15, 3, 6);
                    ctx.fillRect(x + 6, y + 9, 3, 6);
                    
                    // Weapon Hardpoints
                    ctx.fillStyle = "#FF4444";
                    ctx.fillRect(x + 25, y - 3, 4, 2);
                    ctx.fillRect(x + 25, y + 1, 4, 2);
                    
                    ctx.restore();
                    
                    Character.ship.player.frame = (frame + 1) % 4;
                } catch(e) {
                    // Fallback simple rectangle if drawing fails
                    ctx.fillStyle = "#00AAFF";
                    ctx.fillRect(x, y - 18, 35, 36);
                }
            } else {
                // Explosion Animation
                try {
                    ctx.save();
                    var explosionRadius = 15 + frame * 3;
                    var explosionAlpha = 1 - (frame / 10);
                    
                    if (explosionAlpha > 0) {
                        // Outer explosion
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = "#FF4400";
                        ctx.fillStyle = "rgba(255, 100, 0, " + explosionAlpha + ")";
                        ctx.beginPath();
                        ctx.arc(x + 20, y, explosionRadius, 0, Math.PI * 2);
                        ctx.fill();
                        
                        // Inner explosion
                        ctx.fillStyle = "rgba(255, 200, 0, " + explosionAlpha + ")";
                        ctx.beginPath();
                        ctx.arc(x + 20, y, explosionRadius * 0.6, 0, Math.PI * 2);
                        ctx.fill();
                        
                        // Core
                        ctx.fillStyle = "rgba(255, 255, 255, " + explosionAlpha + ")";
                        ctx.beginPath();
                        ctx.arc(x + 20, y, explosionRadius * 0.3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                    
                    Character.ship.player.frame += 0.3;
                } catch(e) {
                    // Do nothing on error
                }
            }
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
            var ctx = Canvas.context;
            
            for (i = 0; i < enemies.length; i += 1) {
                if (enemies[i].alive) {
                    relativeTime = Game.timer - GameLogic.level.startTime;
                    if (relativeTime > enemies[i].time) {
                        var ex = enemies[i].x;
                        var ey = enemies[i].y;
                        var type = enemies[i].name;
                        
                        try {
                            ctx.save();
                            
                            // Draw different ship designs based on type
                            if (type === "scout") {
                            // Scout - Fast & Small (Green)
                            ctx.fillStyle = "#00FF00";
                            ctx.beginPath();
                            ctx.moveTo(ex, ey + 25);
                            ctx.lineTo(ex + 15, ey + 15);
                            ctx.lineTo(ex + 20, ey + 25);
                            ctx.lineTo(ex + 45, ey + 25);
                            ctx.lineTo(ex + 40, ey + 35);
                            ctx.lineTo(ex, ey + 35);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#66FF66";
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                        } else if (type === "fighter") {
                            // Fighter - Balanced (Red)
                            ctx.fillStyle = "#FF0000";
                            ctx.beginPath();
                            ctx.moveTo(ex, ey + 20);
                            ctx.lineTo(ex + 10, ey + 10);
                            ctx.lineTo(ex + 25, ey + 22);
                            ctx.lineTo(ex + 45, ey + 22);
                            ctx.lineTo(ex + 45, ey + 32);
                            ctx.lineTo(ex + 25, ey + 32);
                            ctx.lineTo(ex + 10, ey + 44);
                            ctx.lineTo(ex, ey + 34);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#FF6666";
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                        } else if (type === "interceptor") {
                            // Interceptor - Agile (Purple)
                            ctx.fillStyle = "#AA00FF";
                            ctx.beginPath();
                            ctx.moveTo(ex, ey + 27);
                            ctx.lineTo(ex + 15, ey + 15);
                            ctx.lineTo(ex + 30, ey + 22);
                            ctx.lineTo(ex + 45, ey + 20);
                            ctx.lineTo(ex + 45, ey + 34);
                            ctx.lineTo(ex + 30, ey + 32);
                            ctx.lineTo(ex + 15, ey + 39);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#DD66FF";
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                        } else if (type === "tank") {
                            // Tank - Heavy (Orange)
                            ctx.fillStyle = "#FF6600";
                            ctx.beginPath();
                            ctx.moveTo(ex, ey + 22);
                            ctx.lineTo(ex + 8, ey + 15);
                            ctx.lineTo(ex + 25, ey + 15);
                            ctx.lineTo(ex + 45, ey + 22);
                            ctx.lineTo(ex + 45, ey + 30);
                            ctx.lineTo(ex + 25, ey + 37);
                            ctx.lineTo(ex + 8, ey + 37);
                            ctx.lineTo(ex, ey + 30);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#FFAA66";
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                        } else if (type === "transport") {
                            // Transport - Cargo (Yellow)
                            ctx.fillStyle = "#FFAA00";
                            ctx.beginPath();
                            ctx.moveTo(ex, ey + 25);
                            ctx.lineTo(ex + 15, ey + 18);
                            ctx.lineTo(ex + 35, ey + 18);
                            ctx.lineTo(ex + 45, ey + 25);
                            ctx.lineTo(ex + 45, ey + 32);
                            ctx.lineTo(ex + 35, ey + 39);
                            ctx.lineTo(ex + 15, ey + 39);
                            ctx.lineTo(ex, ey + 32);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#FFDD66";
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                            // Cargo box
                            ctx.fillStyle = "#666666";
                            ctx.fillRect(ex + 10, ey + 24, 10, 8);
                        }
                        
                        ctx.restore();
                        
                        } catch(e) {
                            // Fallback simple rectangle if drawing fails
                            ctx.fillStyle = "#FF0000";
                            ctx.fillRect(ex, ey + 20, 45, 20);
                        }
                        
                        if (enemies[i].x <= -50) {
                            enemies[i].alive = false;
                            Character.ship.player.score -= enemies[i].score * 1.4;
                        } else {
                            enemies[i].x -= enemies[i].speed;
                            if (enemies[i].name === "interceptor") {
								if (enemies[i].x > Canvas.canvasWidth/2) {
									if (enemies[i].y + 2 < Character.ship.player.pos.y - 27) {
										enemies[i].y += 2;
									} else if (enemies[i].y - 2 > Character.ship.player.pos.y - 27) {
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
            var i, ctx = Canvas.context;
            var playerBullets = InPlay.playerBullets;
            var enemyBullets = InPlay.enemyBullets;
            
            // Draw player bullets - Simple & Reliable
            ctx.save();
            for (i = 0; i < playerBullets.length; i += 1) {
                if (playerBullets[i].alive) {
                    var x = playerBullets[i].x;
                    var y = playerBullets[i].y;
                    
                    // Trail effect (3 rectangles)
                    ctx.fillStyle = "rgba(0, 200, 255, 0.2)";
                    ctx.fillRect(x - 6, y + 1, 6, 4);
                    ctx.fillStyle = "rgba(0, 220, 255, 0.4)";
                    ctx.fillRect(x - 3, y + 1, 6, 4);
                    
                    // Main rocket body
                    ctx.fillStyle = "#00BFFF";
                    ctx.fillRect(x, y + 1, 14, 4);
                    
                    // Bright tip
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(x + 12, y + 2, 3, 2);
                    
                    // Center glow line
                    ctx.fillStyle = "#00FFFF";
                    ctx.fillRect(x + 2, y + 2, 11, 1);
                    
                    if (playerBullets[i].x >= Canvas.canvasWidth) {
                        playerBullets.shift();
                    } else {
                        playerBullets[i].x += 25;
                    }
                }
            }
            
            // Draw enemy bullets - Simple & Reliable
            for (i = 0; i < enemyBullets.length; i += 1) {
                if (enemyBullets[i].alive) {
                    var x = enemyBullets[i].x;
                    var y = enemyBullets[i].y;
                    
                    // Trail effect (3 rectangles)
                    ctx.fillStyle = "rgba(255, 50, 0, 0.2)";
                    ctx.fillRect(x, y + 1, 6, 4);
                    ctx.fillStyle = "rgba(255, 80, 0, 0.4)";
                    ctx.fillRect(x - 3, y + 1, 6, 4);
                    
                    // Main rocket body
                    ctx.fillStyle = "#FF4444";
                    ctx.fillRect(x - 14, y + 1, 14, 4);
                    
                    // Bright tip
                    ctx.fillStyle = "#FFAA00";
                    ctx.fillRect(x - 15, y + 2, 3, 2);
                    
                    // Center glow line
                    ctx.fillStyle = "#FF0000";
                    ctx.fillRect(x - 13, y + 2, 11, 1);
                    
                    if (enemyBullets[i].x <= 0) {
                        enemyBullets.shift();
                    } else {
                        enemyBullets[i].x -= 8;
                    }
                }
            }
            ctx.restore();
        };

        var drawScore = function drawScore() {
            var score = Character.ship.player.score;
            var ctx = Canvas.context;
            var w = Canvas.canvasWidth;
            
            // Score panel - top right
            ctx.fillStyle = "rgba(0, 53, 102, 0.7)";
            ctx.fillRect(w - 95, 5, 90, 28);
            ctx.strokeStyle = "#00b4d8";
            ctx.lineWidth = 1;
            ctx.strokeRect(w - 95, 5, 90, 28);
            
            // Score label
            ctx.fillStyle = "#90e0ef";
            ctx.font = "bold 9px Arial";
            ctx.textAlign = "left";
            ctx.fillText("SCORE", w - 90, 15);
            
            // Score value
            ctx.fillStyle = "#ffd60a";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "right";
            ctx.fillText(score, w - 10, 28);
        };

        var drawHP = function drawHP() {
            var hp = Character.ship.player.hp;
            var ctx = Canvas.context;
            
            // HP panel - top left
            ctx.fillStyle = "rgba(0, 53, 102, 0.7)";
            ctx.fillRect(5, 5, 85, 28);
            ctx.strokeStyle = "#00b4d8";
            ctx.lineWidth = 1;
            ctx.strokeRect(5, 5, 85, 28);
            
            // HP label
            ctx.fillStyle = "#90e0ef";
            ctx.font = "bold 9px Arial";
            ctx.textAlign = "left";
            ctx.fillText("HEALTH", 10, 15);
            
            // HP bar background
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(10, 19, 75, 10);
            
            // HP bar - color based on health
            var hpWidth = (hp / 100) * 75;
            var hpColor = hp > 60 ? "#00ff41" : hp > 30 ? "#ffd60a" : "#dc2f02";
            ctx.fillStyle = hpColor;
            ctx.fillRect(10, 19, hpWidth, 10);
            
            // HP percentage
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 9px Arial";
            ctx.textAlign = "center";
            ctx.fillText(hp + "%", 47.5, 27);
        };

        var drawGameOver = function drawGameOver() {
            var ctx = Canvas.context;
            var w = Canvas.canvasWidth;
            var h = Canvas.canvasHeight;
            
            try {
                // Deep space background with gradient
                var bgGradient = ctx.createLinearGradient(0, 0, 0, h);
                bgGradient.addColorStop(0, "#03071e");
                bgGradient.addColorStop(0.5, "#370617");
                bgGradient.addColorStop(1, "#6a040f");
                ctx.fillStyle = bgGradient;
                ctx.fillRect(0, 0, w, h);
                
                // Overlay dark vignette
                var vignette = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, h);
                vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
                vignette.addColorStop(1, "rgba(0, 0, 0, 0.7)");
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, w, h);
            } catch(e) {
                ctx.fillStyle = "#370617";
                ctx.fillRect(0, 0, w, h);
            }
            
            try {
                // Title with dramatic effect
                var pulse = 1 + Math.sin(Date.now() / 250) * 0.08;
                ctx.save();
                ctx.translate(w/2, 55);
                ctx.scale(pulse, pulse);
            
                // Bold title
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#dc2f02";
                ctx.fillStyle = "#dc2f02";
                ctx.font = "bold 26px Arial";
                ctx.textAlign = "center";
                ctx.fillText("MISSION", 0, -8);
                
                ctx.fillStyle = "#e85d04";
                ctx.font = "bold 24px Arial";
                ctx.fillText("TERMINATED", 0, 18);
                ctx.restore();
                ctx.shadowBlur = 0;
                
                // Divider line
                ctx.strokeStyle = "#dc2f02";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(40, 85);
                ctx.lineTo(w-40, 85);
                ctx.stroke();
                
                // Stats panel with modern design
                ctx.fillStyle = "rgba(55, 6, 23, 0.8)";
                ctx.fillRect(25, 100, w-50, 115);
                ctx.strokeStyle = "#9d0208";
                ctx.lineWidth = 2;
                ctx.strokeRect(25, 100, w-50, 115);
                
                // Stats header
                ctx.fillStyle = "#f48c06";
                ctx.font = "bold 11px Arial";
                ctx.textAlign = "center";
                ctx.fillText("═ MISSION REPORT ═", w/2, 118);
                
                // Wave/Level display
                ctx.fillStyle = "#adb5bd";
                ctx.font = "10px Arial";
                ctx.fillText("WAVE REACHED", w/2, 138);
                ctx.fillStyle = "#90e0ef";
                ctx.font = "bold 22px Arial";
                ctx.fillText(Game.level, w/2, 162);
                
                // Score display
                ctx.fillStyle = "#adb5bd";
                ctx.font = "10px Arial";
                ctx.fillText("FINAL SCORE", w/2, 182);
                ctx.fillStyle = "#ffd60a";
                ctx.font = "bold 22px Arial";
                ctx.fillText(Character.ship.player.score, w/2, 206);
                
                // High score badge
                if (Game.isHighscore) {
                    ctx.fillStyle = "rgba(255, 214, 10, 0.3)";
                    ctx.fillRect(30, 213, w-60, 18);
                    ctx.fillStyle = "#ffd60a";
                    ctx.font = "bold 10px Arial";
                    ctx.fillText("★ NEW HIGH SCORE ★", w/2, 225);
                }
                
                // Continue button
                var btnY = 230;
                ctx.shadowBlur = 15;
                ctx.shadowColor = "#0096c7";
                
                var btnGradient = ctx.createLinearGradient(w/2, btnY, w/2, btnY + 50);
                btnGradient.addColorStop(0, "#0077b6");
                btnGradient.addColorStop(1, "#00b4d8");
                ctx.fillStyle = btnGradient;
                ctx.fillRect(30, btnY, w-60, 50);
                
                ctx.strokeStyle = "#90e0ef";
                ctx.lineWidth = 2;
                ctx.strokeRect(30, btnY, w-60, 50);
                ctx.shadowBlur = 0;
                
                // Button content
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "bold 15px Arial";
                ctx.fillText("RETURN TO BASE", w/2, btnY + 25);
                
                ctx.fillStyle = "#caf0f8";
                ctx.font = "10px Arial";
                ctx.fillText("Press 5 or OK", w/2, btnY + 42);
                
                // Footer
                ctx.fillStyle = "#6c757d";
                ctx.font = "9px Arial";
                ctx.fillText("Your sacrifice will not be forgotten", w/2, h - 12);
                
            } catch(e) {
                // Fallback simple game over
                ctx.fillStyle = "#FF0000";
                ctx.font = "bold 28px Arial";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", w/2, 80);
                
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "bold 14px Arial";
                ctx.fillText("Level: " + Game.level, w/2, 140);
                ctx.fillStyle = "#FFD700";
                ctx.font = "bold 18px Arial";
                ctx.fillText("Score: " + Character.ship.player.score, w/2, 170);
                
                ctx.fillStyle = "#00FF00";
                ctx.font = "bold 14px Arial";
                ctx.fillText("Press 5 or OK", w/2, 240);
                ctx.font = "12px Arial";
                ctx.fillText("to Play Again", w/2, 260);
            }
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
            var ctx = Canvas.context;
            var w = Canvas.canvasWidth;
            var h = Canvas.canvasHeight;
            
            if (Game.levelStarted) {
                Draw.drawScore();
                Draw.drawHP();
            } else {
                try {
                    // Modern level start screen
                    var pulse = 1 + Math.sin(Date.now() / 180) * 0.12;
                    
                    // Animated background bars
                    ctx.fillStyle = "rgba(0, 180, 216, 0.15)";
                    ctx.fillRect(0, h/2 - 60, w, 4);
                    ctx.fillRect(0, h/2 + 60, w, 4);
                    
                    // Central focus box
                    ctx.fillStyle = "rgba(0, 53, 102, 0.6)";
                    ctx.fillRect(30, h/2 - 55, w-60, 110);
                    ctx.strokeStyle = "#00b4d8";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(30, h/2 - 55, w-60, 110);
                    
                    // Wave indicator
                    ctx.fillStyle = "#adb5bd";
                    ctx.font = "bold 11px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("═══ WAVE ═══", w/2, h/2 - 35);
                    
                    // Level number - large and animated
                    ctx.save();
                    ctx.translate(w/2, h/2);
                    ctx.scale(pulse, pulse);
                    
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = "#ffd60a";
                    ctx.fillStyle = "#ffd60a";
                    ctx.font = "bold 42px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(Game.level, 0, 12);
                    ctx.restore();
                    ctx.shadowBlur = 0;
                    
                    // Status message with warning
                    ctx.fillStyle = "#ffc300";
                    ctx.font = "bold 12px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("⚠ INCOMING THREAT ⚠", w/2, h/2 + 35);
                    
                    // Loading bar animation - matches 5 second delay
                    var loadWidth = (Date.now() % 5000) / 5000 * (w - 80);
                    ctx.fillStyle = "rgba(0, 180, 216, 0.3)";
                    ctx.fillRect(40, h/2 + 45, w-80, 4);
                    ctx.fillStyle = "#00b4d8";
                    ctx.fillRect(40, h/2 + 45, loadWidth, 4);
                    
                    // Progress percentage
                    var progress = Math.floor(loadWidth / (w - 80) * 100);
                    ctx.fillStyle = "#90e0ef";
                    ctx.font = "bold 10px Arial";
                    ctx.fillText(progress + "%", w/2, h/2 + 57);
                    
                    // Get ready message
                    ctx.fillStyle = "#6c757d";
                    ctx.font = "11px Arial";
                    ctx.fillText("Get Ready...", w/2, h/2 + 72);
                    
                } catch(e) {
                    ctx.fillStyle = "#FFD700";
                    ctx.font = "bold 20px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("Level " + Game.level, w/2, h/2);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.font = "12px Arial";
                    ctx.fillText("Get Ready!", w/2, h/2 + 30);
                }
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