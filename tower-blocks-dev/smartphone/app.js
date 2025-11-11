console.clear();
var Stage = /** @class */ (function () {
    function Stage() {
        // container
        var _this = this;
        this.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        this.add = function (elem) {
            this.scene.add(elem);
        };
        this.remove = function (elem) {
            this.scene.remove(elem);
        };
        this.container = document.getElementById('game');
        // renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('#D0CBC7', 1);
        this.container.appendChild(this.renderer.domElement);
        // scene
        this.scene = new THREE.Scene();
        // camera
        var aspect = window.innerWidth / window.innerHeight;
        var d = 20;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
        this.camera.position.x = 2;
        this.camera.position.y = 2;
        this.camera.position.z = 2;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        //light
        this.light = new THREE.DirectionalLight(0xffffff, 0.5);
        this.light.position.set(0, 499, 0);
        this.scene.add(this.light);
        this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.softLight);
        window.addEventListener('resize', function () { return _this.onResize(); });
        this.onResize();
    }
    Stage.prototype.setCamera = function (y, speed) {
        if (speed === void 0) { speed = 0.3; }
        TweenLite.to(this.camera.position, speed, { y: y + 4, ease: Power1.easeInOut });
        TweenLite.to(this.camera.lookAt, speed, { y: y, ease: Power1.easeInOut });
    };
    Stage.prototype.onResize = function () {
        var viewSize = 30;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.left = window.innerWidth / -viewSize;
        this.camera.right = window.innerWidth / viewSize;
        this.camera.top = window.innerHeight / viewSize;
        this.camera.bottom = window.innerHeight / -viewSize;
        this.camera.updateProjectionMatrix();
    };
    return Stage;
}());
var Block = /** @class */ (function () {
    function Block(block) {
        // set size and position
        this.STATES = { ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed' };
        this.MOVE_AMOUNT = 12;
        this.dimension = { width: 0, height: 0, depth: 0 };
        this.position = { x: 0, y: 0, z: 0 };
        this.targetBlock = block;
        this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
        this.workingPlane = this.index % 2 ? 'x' : 'z';
        this.workingDimension = this.index % 2 ? 'width' : 'depth';
        // set the dimensions from the target block, or defaults.
        this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10;
        this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2;
        this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10;
        this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
        this.position.y = this.dimension.height * this.index;
        this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
        this.colorOffset = this.targetBlock ? this.targetBlock.colorOffset : Math.round(Math.random() * 100);
        // set color
        if (!this.targetBlock) {
            this.color = 0x333344;
        }
        else {
            var offset = this.index + this.colorOffset;
            var r = Math.sin(0.3 * offset) * 55 + 200;
            var g = Math.sin(0.3 * offset + 2) * 55 + 200;
            var b = Math.sin(0.3 * offset + 4) * 55 + 200;
            this.color = new THREE.Color(r / 255, g / 255, b / 255);
        }
        // state
        this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
        // set direction
        this.speed = -0.1 - (this.index * 0.005);
        if (this.speed < -4)
            this.speed = -4;
        this.direction = this.speed;
        // create block
        var geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
        this.material = new THREE.MeshToonMaterial({ color: this.color, shading: THREE.FlatShading });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y + (this.state == this.STATES.ACTIVE ? 0 : 0), this.position.z);
        if (this.state == this.STATES.ACTIVE) {
            this.position[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
        }
    }
    Block.prototype.reverseDirection = function () {
        this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
    };
    Block.prototype.place = function () {
        this.state = this.STATES.STOPPED;
        var overlap = this.targetBlock.dimension[this.workingDimension] - Math.abs(this.position[this.workingPlane] - this.targetBlock.position[this.workingPlane]);
        var blocksToReturn = {
            plane: this.workingPlane,
            direction: this.direction
        };
        if (this.dimension[this.workingDimension] - overlap < 0.3) {
            overlap = this.dimension[this.workingDimension];
            blocksToReturn.bonus = true;
            this.position.x = this.targetBlock.position.x;
            this.position.z = this.targetBlock.position.z;
            this.dimension.width = this.targetBlock.dimension.width;
            this.dimension.depth = this.targetBlock.dimension.depth;
        }
        if (overlap > 0) {
            var choppedDimensions = { width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth };
            choppedDimensions[this.workingDimension] -= overlap;
            this.dimension[this.workingDimension] = overlap;
            var placedGeometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
            placedGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
            var placedMesh = new THREE.Mesh(placedGeometry, this.material);
            var choppedGeometry = new THREE.BoxGeometry(choppedDimensions.width, choppedDimensions.height, choppedDimensions.depth);
            choppedGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(choppedDimensions.width / 2, choppedDimensions.height / 2, choppedDimensions.depth / 2));
            var choppedMesh = new THREE.Mesh(choppedGeometry, this.material);
            var choppedPosition = {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            };
            if (this.position[this.workingPlane] < this.targetBlock.position[this.workingPlane]) {
                this.position[this.workingPlane] = this.targetBlock.position[this.workingPlane];
            }
            else {
                choppedPosition[this.workingPlane] += overlap;
            }
            placedMesh.position.set(this.position.x, this.position.y, this.position.z);
            choppedMesh.position.set(choppedPosition.x, choppedPosition.y, choppedPosition.z);
            blocksToReturn.placed = placedMesh;
            if (!blocksToReturn.bonus)
                blocksToReturn.chopped = choppedMesh;
        }
        else {
            this.state = this.STATES.MISSED;
        }
        this.dimension[this.workingDimension] = overlap;
        return blocksToReturn;
    };
    Block.prototype.tick = function () {
        if (this.state == this.STATES.ACTIVE) {
            var value = this.position[this.workingPlane];
            if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT)
                this.reverseDirection();
            this.position[this.workingPlane] += this.direction;
            this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
        }
    };
    return Block;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.STATES = {
            'LOADING': 'loading',
            'PLAYING': 'playing',
            'READY': 'ready',
            'ENDED': 'ended',
            'RESETTING': 'resetting'
        };
        this.blocks = [];
        this.state = this.STATES.LOADING;
        this.stage = new Stage();
        this.mainContainer = document.getElementById('container');
        this.scoreContainer = document.getElementById('score');
        this.startButton = document.getElementById('start-button');
        this.instructions = document.getElementById('instructions');
        this.currentScore = 0;
        this._lastScore = 0;
        this._resumeScore = 0;
        this._pendingResume = false;
        this._rewardedAdShown = false; // Flag to prevent multiple rewarded ad calls
        this._interstitialShown = false; // Flag to prevent multiple interstitial calls during gameplay
        this.scoreContainer.innerHTML = '0';
        this.newBlocks = new THREE.Group();
        this.placedBlocks = new THREE.Group();
        this.choppedBlocks = new THREE.Group();
        this.stage.add(this.newBlocks);
        this.stage.add(this.placedBlocks);
        this.stage.add(this.choppedBlocks);
        this.addBlock();
        this.tick();
        this.updateState(this.STATES.READY);
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 32)
                _this.onAction();
        });
        document.addEventListener('click', function (e) {
            // Only handle clicks if not on the start button
            if (!e.target.classList.contains('main-start-btn') && e.target.id !== 'start-button') {
                _this.onAction();
            }
        });
        
        // Handle start button click specifically
        document.addEventListener('click', function (e) {
            if (e.target && (e.target.classList.contains('main-start-btn') || e.target.id === 'start-button')) {
                e.preventDefault();
                e.stopPropagation();
                _this.onAction();
            }
        });
        // Touch event removed to prevent drag notifications
    }
    Game.prototype.updateState = function (newState) {
        for (var key in this.STATES)
            this.mainContainer.classList.remove(this.STATES[key]);
        this.mainContainer.classList.add(newState);
        this.state = newState;
    };
    Game.prototype.onAction = function () {
        switch (this.state) {
            case this.STATES.READY:
                this.startGame();
                break;
            case this.STATES.PLAYING:
                this.placeBlock();
                break;
            case this.STATES.ENDED:
                this.restartGame();
                break;
        }
    };
    Game.prototype.startGame = function () {
        if (this.state != this.STATES.PLAYING) {
            console.log("Tower Blocks: Game Started");
            var wasResume = this._pendingResume;
            var startScore = 0;
            if (this._pendingResume) {
                startScore = Math.max(0, parseInt(this._resumeScore, 10) || 0);
            }
            this.currentScore = startScore;
            this._rewardedAdShown = false; // Reset flag when starting new game
            this._interstitialShown = false; // Reset flag when starting new game
            // Note: gameCacheAd() is called on start button click, not here (like Space Battle)
            this.scoreContainer.innerHTML = String(this.currentScore);
            this._resumeScore = 0;
            this._pendingResume = false;
            this.updateState(this.STATES.PLAYING);
            this.mainContainer.classList.add('game-started');
            this.mainContainer.style.pointerEvents = 'auto';
            this.addBlock();
        }
    };
    Game.prototype.restartGame = function () {
        var _this = this;
        console.log("Tower Blocks: Restarting game...");
        
        // Cache ads at restart game (like Space Battle)
        try {
            if (typeof gameCacheAd === 'function') {
                gameCacheAd();
                console.log("Tower Blocks: Ads caching at game restart (mid-roll + rewarded)");
            }
        } catch (e) {
            console.log("Tower Blocks: Failed to cache ads at restart", e);
        }
        
        this.updateState(this.STATES.RESETTING);
        var oldBlocks = this.placedBlocks.children;
        var removeSpeed = 0.2;
        var delayAmount = 0.02;
        var _loop_1 = function (i) {
            TweenLite.to(oldBlocks[i].scale, removeSpeed, { x: 0, y: 0, z: 0, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn, onComplete: function () { return _this.placedBlocks.remove(oldBlocks[i]); } });
            TweenLite.to(oldBlocks[i].rotation, removeSpeed, { y: 0.5, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn });
        };
        for (var i = 0; i < oldBlocks.length; i++) {
            _loop_1(i);
        }
        var cameraMoveSpeed = removeSpeed * 2 + (oldBlocks.length * delayAmount);
        this.stage.setCamera(2, cameraMoveSpeed);
        var countdown = { value: this.blocks.length - 1 };
        TweenLite.to(countdown, cameraMoveSpeed, { value: 0, onUpdate: function () { _this.scoreContainer.innerHTML = String(Math.round(countdown.value)); } });
        this.blocks = this.blocks.slice(0, 1);
        setTimeout(function () {
            _this.startGame();
        }, cameraMoveSpeed * 1000);
    };
    Game.prototype.resetToReady = function () {
        this.updateState(this.STATES.RESETTING);
        while (this.placedBlocks.children.length) {
            this.placedBlocks.remove(this.placedBlocks.children[0]);
        }
        while (this.choppedBlocks.children.length) {
            this.choppedBlocks.remove(this.choppedBlocks.children[0]);
        }
        while (this.newBlocks.children.length) {
            this.newBlocks.remove(this.newBlocks.children[0]);
        }
        this.blocks = [];
        this.addBlock();
        this.stage.setCamera(2, 0.3);
        this.currentScore = 0;
        this._resumeScore = 0;
        this._pendingResume = false;
        this._lastScore = 0;
        this._rewardedAdShown = false; // Reset flag when resetting game
        this._interstitialShown = false; // Reset flag when resetting game
        window.tbLastScore = 0;
        this.scoreContainer.innerHTML = '0';
        if (this.instructions) {
            this.instructions.classList.remove('hide');
        }
        if (this.mainContainer) {
            this.mainContainer.classList.remove('game-started');
            this.mainContainer.style.pointerEvents = 'none';
        }
        this.updateState(this.STATES.READY);
    };
    Game.prototype.placeBlock = function () {
        var _this = this;
        var currentBlock = this.blocks[this.blocks.length - 1];
        var newBlocks = currentBlock.place();
        this.newBlocks.remove(currentBlock.mesh);
        if (newBlocks.placed)
            this.placedBlocks.add(newBlocks.placed);
        if (newBlocks.chopped) {
            this.choppedBlocks.add(newBlocks.chopped);
            var positionParams = { y: '-=30', ease: Power1.easeIn, onComplete: function () { return _this.choppedBlocks.remove(newBlocks.chopped); } };
            var rotateRandomness = 10;
            var rotationParams = {
                delay: 0.05,
                x: newBlocks.plane == 'z' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
                z: newBlocks.plane == 'x' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
                y: Math.random() * 0.1,
            };
            if (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane]) {
                positionParams[newBlocks.plane] = '+=' + (40 * Math.abs(newBlocks.direction));
            }
            else {
                positionParams[newBlocks.plane] = '-=' + (40 * Math.abs(newBlocks.direction));
            }
            TweenLite.to(newBlocks.chopped.position, 1, positionParams);
            TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
        }
        if (currentBlock.state !== currentBlock.STATES.MISSED) {
            this.currentScore += 1;
            this.scoreContainer.innerHTML = String(this.currentScore);
            // Mid-roll ads removed - no ads during gameplay
        }
        this.addBlock();
    };
    Game.prototype.addBlock = function (options) {
        if (options === void 0) { options = {}; }
        var lastBlock = this.blocks[this.blocks.length - 1];
        if (lastBlock && lastBlock.state == lastBlock.STATES.MISSED) {
            return this.endGame();
        }
        this.scoreContainer.innerHTML = String(this.currentScore);
        var newKidOnTheBlock = new Block(lastBlock);
        this.newBlocks.add(newKidOnTheBlock.mesh);
        this.blocks.push(newKidOnTheBlock);
        this.stage.setCamera(this.blocks.length * 2);
        if (this.blocks.length >= 5 && !options.skipInstructions)
            this.instructions.classList.add('hide');
    };
    Game.prototype.endGame = function () {
        // Calculate final score: blocks.length - 1 (subtract 1 for the missed block)
        var finalScore = this.blocks.length - 1;
        console.log("Tower Blocks: Game Over - Score: " + finalScore);
        
        // Set the final score in the new UI
        var finalScoreElement = document.getElementById('final-score');
        if (finalScoreElement) {
            finalScoreElement.textContent = finalScore;
        }
        
        // Also update the current score display to match
        this.currentScore = finalScore;
        this.scoreContainer.innerHTML = String(finalScore);
        this._lastScore = finalScore;
        window.tbLastScore = finalScore;
        try {
            if (typeof postScore === 'function') {
                postScore(finalScore);
            }
        } catch (e) {
            console.log("Tower Blocks: Failed to post score", e);
        }
        
        // Show ad at game over - rewarded if ready, else interstitial, else skip
        if (!this._rewardedAdShown) {
            this._rewardedAdShown = true;
            var _this = this; // Store reference for setTimeout
            try {
                // Check if ads are ready
                var isRewardedReady = (typeof window !== 'undefined' && window.isRVReady === true);
                var isInterstitialReady = (typeof window !== 'undefined' && window.isAdReady === true);
                
                if (isRewardedReady) {
                    // Show rewarded ad if ready - Direct call
                    if (typeof showAdRewarded === 'function') {
                        console.log("Tower Blocks: Showing rewarded ad on game over (ad ready)");
                        showAdRewarded();
                    } else {
                        console.log("Tower Blocks: showAdRewarded function not available");
                    }
                } else if (isInterstitialReady) {
                    // Show interstitial if rewarded ad not ready but interstitial is ready - Direct call
                    if (typeof showAd === 'function') {
                        console.log("Tower Blocks: Showing interstitial on game over (rewarded ad not ready, but interstitial ready)");
                        // Mark interstitial as shown to prevent duplicate calls
                        _this._interstitialShown = true;
                        // Direct call to Jio wrapper
                        showAd();
                    } else {
                        console.log("Tower Blocks: showAd function not available");
                    }
                } else {
                    // Both ads not ready - skip showing ads
                    console.log("Tower Blocks: Both rewarded and interstitial ads not ready - skipping ad display on game over");
                    console.log("Tower Blocks: isRVReady =", isRewardedReady, ", isAdReady =", isInterstitialReady);
                }
            } catch (e) {
                console.log("Tower Blocks: Failed to show ad on game over", e);
            }
        }
        
        // Note: Ads are cached at start button click via gameCacheAd()
        // Will be cached automatically via onAdClosed() after any ad
        
        this.updateState(this.STATES.ENDED);
    };
    Game.prototype.resumeFromReward = function (scoreSnapshot) {
        var resumeScore = Math.max(0, parseInt(scoreSnapshot, 10) || this._lastScore || 0);
        console.log("Tower Blocks: Resume from rewarded ad at score", resumeScore);
        
        // Reset game over state
        this._rewardedAdShown = false; // Reset flag so ads can show again if needed
        this._interstitialShown = false; // Reset flag so ads can show again if needed
        
        // Set resume score
        this.currentScore = resumeScore;
        this._resumeScore = resumeScore;
        this._pendingResume = true;
        this.scoreContainer.innerHTML = String(this.currentScore);
        
        // Clear all blocks
        while (this.placedBlocks.children.length) {
            this.placedBlocks.remove(this.placedBlocks.children[0]);
        }
        while (this.choppedBlocks.children.length) {
            this.choppedBlocks.remove(this.choppedBlocks.children[0]);
        }
        while (this.newBlocks.children.length) {
            this.newBlocks.remove(this.newBlocks.children[0]);
        }
        this.blocks = [];
        
        // Reset camera and add first block
        this.addBlock({ skipInstructions: true });
        this.stage.setCamera(2, 0.3);
        
        // Enable game interactions
        this.mainContainer.classList.add('game-started');
        this.mainContainer.style.pointerEvents = 'auto';
        
        // Hide instructions
        if (this.instructions) {
            this.instructions.classList.add('hide');
        }
        
        // Update state to READY and start game with resume score
        this.updateState(this.STATES.READY);
        this.startGame(); // This will use _pendingResume to continue from resumeScore
    };
    Game.prototype.tick = function () {
        var _this = this;
        this.blocks[this.blocks.length - 1].tick();
        this.stage.render();
        requestAnimationFrame(function () { _this.tick(); });
    };
    return Game;
}());
var game = new Game();
window.tbLastScore = 0;


window.tbResetGameToReady = function() {
    try {
        if (game && typeof game.resetToReady === 'function') {
            game.resetToReady();
        }
    } catch (e) {
        console.log('Tower Blocks: Failed to reset game to ready state', e);
    }
};

window.tbResumeFromReward = function(scoreSnapshot) {
    try {
        if (game && typeof game.resumeFromReward === 'function') {
            game.resumeFromReward(scoreSnapshot);
        }
    } catch (e) {
        console.log('Tower Blocks: Failed to resume game after reward', e);
    }
};

// JioGames SDK Integration - Initialize
console.log("Tower Blocks: Initializing JioGames SDK...");

// Get user profile on game initialization

// Load banner on init
try { if (typeof loadBanner === 'function') { loadBanner(); } } catch(e) {}

