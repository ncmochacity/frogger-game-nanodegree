var rewardsPic=['images/Gem_Blue.png',
                'images/Gem_Green.png',
                'images/Gem_Orange.png'
];
var charPic=['images/char-boy.png',
             'images/char-cat-girl.png',
             'images/char-horn-girl.png',
             'images/char-pink-girl.png',
             'images/char-princess-girl.png'
];
var enemyY=[60,145,230,300];
var speed=[100,150,200,250,300,350,400];
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=-100;
    this.y=enemyY[Math.floor(Math.random()*enemyY.length)];
    this.enemySpeed=speed[Math.floor(Math.random()*speed.length)];
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=this.speed*dt;
    if(this.x > 500){
      this.x=-100;
      this.enemySpeed=speed[Math.floor(Math.random()*speed.length)];
      this.y=enemyY
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player=function(){
  this.sprite=charPic[Math.floor(Math.random()*charPic.length)];
  this.x=200;
  this.y=400;
};
Player.prototype.update=function(dt){
  this.x*dt;
  this.y*dt;
};
Player.prototype.render=function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(){

};
var enemy1=new Enemy();
var enemy2=new Enemy();
var enemy3=new Enemy();
var enemy4=new Enemy();
var allEnemies=[enemy1,enemy2,enemy3,enemy4];
var player=new Player();

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
