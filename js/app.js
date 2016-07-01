var rewardsPic=['images/Gem_Blue.png',
                'images/Gem_Green.png',
                'images/Gem_Orange.png',
                'images/Key.png',
                'images/Star.png'
];
var charPic=['images/char-boy.png',
             'images/char-cat-girl.png',
             'images/char-horn-girl.png',
             'images/char-pink-girl.png',
             'images/char-princess-girl.png'
];
var DIMENSIONS = {
  TILE:{
    WIDTH:100,
    HEIGHT:70
  },CANVAS:{
    WIDTH:505,
    HEIGHT:606
  },
  PLAYER:{
    PADDING:50
  }
};
var enemyY=[60,145,225];
var speed=[100,150,200,250,300,350,400];
var Enemy = function() {
    this.x = -DIMENSIONS.TILE.WIDTH;
    this.y = DIMENSIONS.TILE.HEIGHT;
    this.enemySpeed=speed[Math.floor(Math.random() * 7)];
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.enemySpeed*dt;
    if (this.x > DIMENSIONS.CANVAS.WIDTH ){
      this.x = -DIMENSIONS.TILE.WIDTH;
      this.y=enemyY[Math.floor(Math.random() * 3)];
      this.enemySpeed=speed[Math.floor(Math.random() * 7)];
      if (this.y > 225){
        this.y = 60;
      }
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
var Gem=function(){
  this.x=DIMENSIONS.TILE.WIDTH;
  this.y=DIMENSIONS.TILE.HEIGHT;
  this.sprite=rewardsPic[Math.floor(Math.random() * 5)];
};
Gem.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

var Player=function(){
  this.sprite = charPic[Math.floor(Math.random()*charPic.length)];
  this.x = DIMENSIONS.TILE.WIDTH * 2;
  this.y = DIMENSIONS.TILE.HEIGHT * 5 + DIMENSIONS.PLAYER.PADDING ;
};
Player.prototype.update=function(dt){
  this.x*dt;
  this.y*dt;
};
Player.prototype.reset=function(){
  this.x = DIMENSIONS.TILE.WIDTH;
  this.y = DIMENSIONS.TILE.HEIGHT * 5 + DIMENSIONS.PLAYER.PADDING;
}
Player.prototype.render=function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(e){
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
     default:
        return;
   };
};
var enemy1=new Enemy();
var enemy2=new Enemy();
var enemy3=new Enemy();
var enemy4=new Enemy();
var allEnemies=[enemy1,enemy2,enemy3,enemy4];
var player=new Player();
var gem=new Gem();

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
