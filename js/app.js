


var rewardsPic = ['images/Gem_Blue.png',
                'images/Gem_Green.png',
                'images/Gem_Orange.png',
                'images/Key.png',
                'images/Star.png'
];
var charPic = ['images/char-boy.png',
             'images/char-cat-girl.png',
             'images/char-horn-girl.png',
             'images/char-pink-girl.png',
             'images/char-princess-girl.png'
];
//setting global dimension objects for player, tile and canvas dimensions for better maneuvers
var DIMENSIONS = {
  TILE:{
    WIDTH:100,
    HEIGHT:70
  },CANVAS:{
    WIDTH:500,
    HEIGHT:606
  },
  PLAYER:{
    PADDING:50
  }
};
var Stopgame = false;
var enemyY = [60,145,225];
var speed = [100,150,200,250,300,350,400];
var gemX = [DIMENSIONS.TILE.WIDTH, DIMENSIONS.TILE.WIDTH * 2, DIMENSIONS.TILE.WIDTH * 3, DIMENSIONS.TILE.WIDTH * 4];
var gemY = [DIMENSIONS.TILE.HEIGHT, DIMENSIONS.TILE.HEIGHT * 2, DIMENSIONS.TILE.HEIGHT * 3, DIMENSIONS.TILE.HEIGHT * 4 ];
var life = 5;
var allEnemies = [];

//define the classes and RenderMixin to allow shared properties between classes
var Enemy = function() {
    this.x = -DIMENSIONS.TILE.WIDTH;
    this.y = enemyY[Math.floor(Math.random() * 3)];
    this.enemySpeed = speed[Math.floor(Math.random() * 7)];
    this.sprite = 'images/enemy-bug.png';
};
//custom Mixin object that is inherited and shared by Enemy, Player and Gem classes
var RenderMixin = {
  render : function(){
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 }
};
//score class keeps track of the number of points the player gets upon finishing the game
var Score = function() {
  this.sprite = 'images/Gem_Blue_small.png';
  this.score = 0;
};
Score.prototype.render = function() {
  this.x = 0;
  for (var i = 0; i < this.score; i++) {
    ctx.drawImage(Resources.get(this.sprite), this.x, -10);
    this.x = this.x + 30;
  }
};
// myLife class displays player's life with initial setting to 5 lives
var myLife = function() {
  this.sprite='images/Heart_small.png';
};
myLife.prototype.render = function() {
  this.x = 0;
  for (var i = 0; i < life; i++) {
    ctx.drawImage(Resources.get(this.sprite), this.x, 540);
    this.x = this.x + 50;
  }

};
//Enemy class inherits the Mixin Render object, so I don't re-write the exact same rendering code every time
Enemy.prototype = Object.create(RenderMixin);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.enemySpeed*dt;
    if (this.x > DIMENSIONS.CANVAS.WIDTH ){
      this.x = -DIMENSIONS.TILE.WIDTH;
      this.y = enemyY[Math.floor(Math.random() * 3)];
      this.enemySpeed = speed[Math.floor(Math.random() * 7)];
    }
};
// checkEnemyCollision makes sure enemy bugs don't bump into each other, if the one behind gets close to the enemy at the front, enemy speeds up
Enemy.prototype.checkEnemyCollision=function(){
  for (var i = 0; i < allEnemies.length; i+=2) {
    if (Math.abs(allEnemies[i].x - allEnemies[i+1].x) < 50 && Math.abs(allEnemies[i].y - allEnemies[i+1].y) < 50 ) {
      this.x = -DIMENSIONS.TILE.WIDTH;
      this.y = enemyY[Math.floor(Math.random() * 3)];
      this.enemySpeed = speed[Math.floor(Math.random() * 7)];
      allEnemies[i].enemySpeed += 30;
    }
  }
};
// Gem class displays randomly selected rewards, every time the player collects one, score gets increased by 1 point
//then as the player colleccts it, the reward gets reset --> the Gem.reset method will be called
var Gem = function(){
  this.sprite = rewardsPic[Math.floor(Math.random() * 5)];
  this.x = gemX[Math.floor(Math.random() * 4)];
  this.y = gemY[Math.floor(Math.random() * 4)];
};
Gem.prototype = Object.create(RenderMixin);
Gem.prototype.constructor = Gem;
Gem.prototype.update = function(dt){
  if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50 ) {
    //when player collects a gem, gem position resets
    this.reset();
    if (playerScore.score < 30) {
      playerScore.score ++;
    }
  }

};
//reset the Gem: randomly selected Gem will show up, updaing its X and Y positions
Gem.prototype.reset = function(){
  this.sprite = rewardsPic[Math.floor(Math.random() * 5)];
  this.x = gemX[Math.floor(Math.random() * 4)];
  this.y = gemY[Math.floor(Math.random() * 4)];
};
// This is the Player class with randomly selected player image. X and Y positions make sure the player appears at the center of the canvas
// I use the global Dimensions object to better picture the canvas visually
var Player = function() {
  this.sprite = charPic[Math.floor(Math.random() * 5)];
  this.x = DIMENSIONS.TILE.WIDTH * 2;
  this.y = DIMENSIONS.TILE.HEIGHT * 5 + DIMENSIONS.PLAYER.PADDING ;
};
//player inherits the Mixin Render object for the rendering purpose
Player.prototype = Object.create(RenderMixin);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {
// reduce player's life when reaches water
  if (this.y < DIMENSIONS.PLAYER.PADDING) {
    this.reset();
    life--;
  }
// when game over, which happens when player life == 0
// clearRect will clear the entire canvas and change the game-over element to the Game over message
// game over message will show the player the number of rewards he/she collects
  var msg=document.getElementById("game-over");
  if (life === 0) {
      ctx.clearRect(0,0,DIMENSIONS.CANVAS.WIDTH,DIMENSIONS.CANVAS.HEIGHT);
      msg.innerHTML="Game Over!" + "<br>" + "You've earned: " + playerScore.score + " rewards";
      reset();
      // calls the game reset function defined in the Engine.js
  }
};
//checkCollisions method checks to see if the player hits the enemy bug, if so, player life is deducted by 1
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (
      Math.abs(this.x - allEnemies[i].x) < 50 && Math.abs(this.y - allEnemies[i].y) < 50) {
        // after the player is hit, he/she gets reset back to the center of the canvas and life gets deducted
      this.reset();
      if (life > 0) {
        life--;
        document.getElementById('life').innerHTML = 'Life: ' + life;
      }
    }
  }
};
// player position is reset to the original position at the starting point
Player.prototype.reset=function() {
  this.x = DIMENSIONS.TILE.WIDTH * 2;
  this.y = DIMENSIONS.TILE.HEIGHT * 5 + DIMENSIONS.PLAYER.PADDING;
};
// this method checks if player life reaches the end, if so, the global StopGame is set to true
//gameStatus method gets called by statusEntities function in Engine.js to check the current status of the player
Player.prototype.gameStatus=function() {
  if (life == 0 ){
    Stopgame=true;
  }
};
Player.prototype.handleInput=function(e) {
   switch(e){
     case "left":
       if (this.x > 0)
         this.x -= DIMENSIONS.TILE.WIDTH/2;
       break;
     case "up":
        if (this.y > 0)
          this.y -= DIMENSIONS.TILE.WIDTH/2;
        break;
     case "right":
        if (this.x < 400)
          this.x += DIMENSIONS.TILE.WIDTH/2;
        break;
     case "down":
        if (this.y < 375)
          this.y += DIMENSIONS.TILE.WIDTH/2;
        break;
      case "13":
        location.reload();
        break;
     default:
        return;
   }
};
// Enemy creations to create 6 enemy bugs
for (var i = 0; i < 6; i++){
  var enemy = new Enemy();
  allEnemies.push(enemy);
}
// creating instances of the class constructors
var player = new Player();
var playerLife= new myLife();
var gem = new Gem();
var playerScore = new Score();
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
