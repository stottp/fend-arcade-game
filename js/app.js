var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

//reuse code for Enemy and Player
var Character = function(x, y, sprite, speed, type) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.speed = speed;
	this.type = type;
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// manual code
var allEnemies = [];

// define y positions
var enemyY = [120, 200, 290];

//dynamically create enemies
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy((Math.floor(Math.random() * -150) - 50), enemyY.splice(Math.floor(Math.random() * enemyY.length), 1), Math.floor(Math.random() * 100) + 25));
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
	
	this.collisionCheckEnemy();

    if (this.x > 505) {
        this.x = (Math.floor(Math.random() * -100) - 50);
        this.y = this.y;
        this.speed = (Math.floor(Math.random() * (100 * Math.pow(1.1, player.level)) + (25 * Math.pow(1.1, player.level))));
    }

};

// Get enemy reset to work
Enemy.prototype.reset = function(dt) {
    for (var i = 0; i < allEnemies.length; i++) {
        this.x = (Math.floor(Math.random() * -100) - 50);
        this.y = this.y;
        this.speed = (Math.floor(Math.random() * (100 * Math.pow(1.1, player.level)) + (25 * Math.pow(1.1, player.level))));
    }
};


//Enemy-Player Collision Function
Enemy.prototype.collisionCheckEnemy = function() {
        if (Math.abs(player.x - this.x) < 60 && Math.abs(player.y - this.y) < 60) {
            console.log('enemy colision detected');
            player.playerReset();
            player.life = player.life - 1;
            if (player.life === 0) {
                player.gameOver();
                console.log('Game Over');
            }
        }
    
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.life = 3;
    this.level = 1;
    this.score = 0;
};

Player.prototype.update = function(dt) {
    //Keep the Player on the canvas
    if (this.x < 40 || this.x > 400) {
        if (this.x < 40) { // Left canvas
            this.x = 0;
        } else {
            this.x = 400; // Right canvas
        }
    }
    if (this.y < -10 || this.y > 400) { //prevents up and down twice on one square
        if (this.y < -10)
            this.y = -10; // Top Canvas
        else {
            this.y = 460; // Bottom Canvas
        }
    }

    Enemy.collisionCheckEnemy; //check for bug collision

    this.collisionGemCheck(); //check for gem collision

    if (this.y <= 45) {
        this.playerReset();
        this.playerWins();
        console.log('player wins');
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20px Arial";
    ctx.fillText("Level " + this.level, 5, 580); //Adds level to game
    ctx.fillText("Score " + this.score, 210, 580);
    ctx.fillText("Lives " + this.life, 410, 580);
};

Player.prototype.handleInput = function(direction) {
    if (direction === "up") {
        this.y -= TILE_HEIGHT;
    }
    if (direction === "down") {
        this.y += TILE_HEIGHT;
    }
    if (direction === "left") {
        this.x -= TILE_WIDTH;
    }
    if (direction === "right") {
        this.x += TILE_WIDTH;
    }
    if (direction === "esc") {
        this.gameOver();
    }
    console.log(this.y, gem.y);
};





//Player-Gem Collision Function
Player.prototype.collisionGemCheck = function() {
    if (Math.abs(this.x - gem.x) <= 60 && Math.abs(this.y - gem.y) <= 60) {
        console.log('grabbed jewel');
        console.log(gem.sprite);
        if (gem.sprite === 'images/heart-small.png') {
            this.life = this.life + 1;
        } else {
            this.score = this.score + 5;
        }
        gem.gemReset();
    }
};

//Player Wins
Player.prototype.playerWins = function() {
    this.level = this.level + 1;
    this.score = this.score + 10;
};

//Player Reset
Player.prototype.playerReset = function() {
    this.x = playerX[Math.floor(Math.random() * playerX.length)];
    this.y = 460;
};

//Player Game Over
Player.prototype.gameOver = function() {
    this.level = 1;
    this.life = 3;
	this.score = 0;
};

//random start positions for Player
var playerX = [0, 100, 200, 300, 400];

// Place the player object in a variable called player
var player = new Player(playerX[Math.floor(Math.random() * playerX.length)], 460);

var gems = ['images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/gem-blue-small.png', 'images/gem-green-small.png', 'images/gem-orange-small.png',
    'images/heart-small.png'
];

var gemx = [20, 120, 220, 320, 420];
var gemy = [130, 220, 300];

// Gems
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = gems[Math.floor(Math.random() * gems.length)];
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var gem = new Gem(gemx[Math.floor(Math.random() * gemx.length)], gemy[Math.floor(Math.random() * gemy.length)]);

//Gem Reset
Gem.prototype.gemReset = function() {
    gem.x = gemx[Math.floor(Math.random() * gemx.length)];
    gem.y = gemy[Math.floor(Math.random() * gemy.length)];
    gem.sprite = gems[Math.floor(Math.random() * gems.length)];
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        27: 'esc',
		37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




