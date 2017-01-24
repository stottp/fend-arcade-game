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

    this.collisionCheck(); //check for bug collision

    this.collisionGemCheck(); //check for gem collision

    if (this.y < 39) {
        this.playerReset();
        this.playerWins();
        console.log('player wins');
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20px Arial";
    ctx.fillText("Level " + player.level, 5, 580); //Adds level to game
    ctx.fillText("Score " + player.score, 210, 580);
    ctx.fillText("Lives " + player.life, 410, 580);
};

Player.prototype.handleInput = function(direction) {
    if (direction === "up") {
        this.y -= 85;
    }
    if (direction === "down") {
        this.y += 85;
    }
    if (direction === "left") {
        this.x -= 101;
    }
    if (direction === "right") {
        this.x += 101;
    }
    console.log(player.y, gem.y);


};

//Player-Enemy Collision Function
Player.prototype.collisionCheck = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) < 60 && Math.abs(player.y - allEnemies[i].y) < 60) {
            console.log('colision detected');
            this.playerReset();
            this.life = this.life - 1;
            if (this.life === 0) {
                this.gameOver();
                console.log('Game Over');
            }
        }
    }
};


//Player-Gem Collision Function
Player.prototype.collisionGemCheck = function() {
    if (Math.abs(player.x - gem.x) <= 60 && Math.abs(player.y - gem.y) <= 60) {
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
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//////questions to ask at next 1-1/////////
//1. Avoid enemy overlapping:
//	a. I tried predetermining the y values in an array but is this efficient?
//	b. How can I easily access the y values in the console as console.table(allEnemies) shows Array[1]
//	c. It would be better if bugs could have same y value but couldn't overtake each other
//2. Enemy.update function seems like it could be improved
//3. For random functions it could be better to assign lower and upper limits for x, y and speed in a function, can't return a tuple?:
//	a. var GenerateEnemyValues = function() return [x=GenerateEnemyValues[0], yGenerateEnemyValues[1], speedGenerateEnemyValues[2]]
//4. Scoring system
//5. Player selection 
//6. Collectables
//7. Understand prototypes better
//8. Reset the game on game over
//9. Toggle gems on a timeer

//Items I implemented where I wanted to see if there was a better way to implement.
//1. Reset the game, choose a new random starting position for the player (is the best way to do it)
//2. Introduce a level and counter to display. Also increases the speed of the game 1.075^level
//3. Collision check




/////old code//////


//dynamically create enemies

//allEnemies.push(new Enemy(100, 200, 5));

//for (var i = 0; i < 5; i++) {	
//allEnemies.push(new Enemy(-100, (Math.floor(Math.random() * 100) + 1) * i, Math.floor(Math.random() * 50) + 25 ));
//}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// manual code

//var enemy1 = new Enemy(0,200,5);
//var enemy2 = new Enemy(0,100,7);
//var enemy3 = new Enemy(0,50,10);

//var allEnemies = [enemy1, enemy2, enemy3];


///// collision check
//var CollisionCheck = function(player, enemy) {
//	if (player.x < enemy.x + enemy.width &&
// player.x + player.width > enemy.x &&
// player.y < enemy.y + enemy.height &&
// player.height + player.y > enemy.y) {
//   console.log('collision detected')
//}	
//}