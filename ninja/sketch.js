var PLAY=1;
var END=0;
var gameState=PLAY;
var ninja,ninja_running;
var ground,invisibleGround,groundImage;
var villan1,villan2;
var obstacle1,obstacle2;
var score;
var gameOverImg,restartImg;
var obstacle
var obstacleGroup,villanGroup,ninjaStarGroup;
var ninjaStar,ninjaStarImg;
function preload(){
ninja_running=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");

groundImage=loadImage("grass.png");

villan1=loadImage("enemy1.png");
villan2=loadImage("enemy2.png");

obstacle1=loadImage("ob1.png");
obstacle2=loadImage("ob2.png");

restartImg=loadImage("restart.png");
gameOverImg=loadImage("gameOver.png");
  
ninjaStarImg=loadImage("ninja_star.png");
}
function setup(){
createCanvas(750,490);

ninja=createSprite(70,380,20,50);
ninja.addAnimation("running",ninja_running);


ground=createSprite(200,450,800,20);
ground.addImage("ground",groundImage);
ground.x=ground.width/2;


gameOver=createSprite(300,100);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;

restart=createSprite(300,140);
restart.addImage(restartImg);
restart.scale=0.3;

invisibleGround=createSprite(200,400,400,10);
invisibleGround.visible=false;

obstacleGroup=new Group();
villanGroup=new Group();
ninjaStarGroup=new Group();
ninja.setCollider("circle",0,0,40);
ninja.debug=false;

score=0;
}
function draw(){
 background("pink"); 
 ninja.scale=0.4;
text("SCORE:"+score,500,50);
if(gameState===PLAY){
gameOver.visible=false;
restart.visible=false;
ground.velocityX=-4;
score=score+Math.round(frameCount/120);
if(ground.x<150){
  ground.x=ground.width/2;
  
  }

if(keyDown("space")&&ninja.y>=100){
ninja.velocityY=-15;
}
ninja.velocityY=ninja.velocityY+0.8;

spawnObstacles();
spawnVillan();
if(obstacleGroup.isTouching(ninja)){
  gameState=END;
  }
  
  if(villanGroup.isTouching(ninja)){
  gameState=END;
  }
  if(keyDown("s")){
    createNinjaStar();
    
  }
  ninja.collide(invisibleGround);
}




else if(gameState===END){
gameOver.visible=true;
restart.visible=true;

ground.velocityX=0;
ninja.velocityY=0;

obstacleGroup.setLifetimeEach(-1);
villanGroup.setLifetimeEach(-1);

obstacleGroup.setVelocityXEach(0);
villanGroup.setVelocityXEach(0);

ninja.collide(invisibleGround);
}




drawSprites();
}
function spawnObstacles(){
if(frameCount%300===0){
obstacle=createSprite(700,390,10,40);
obstacle.velocityX=-6;

var rand=Math.round(random(1,2));
switch(rand){
  case 1:obstacle.addImage(obstacle1);
         break;
  case 2:obstacle.addImage(obstacle2);
         break;
  default:break;
}
obstacle.scale=0.3;
obstacle.lifetime=120;

obstacleGroup.add(obstacle);
}
}
function spawnVillan(){
if(frameCount%220===0){
villan=createSprite(700,390,10,40);
villan.velocityX=-6;

var rand1=Math.round(random(1,2))

switch(rand1){
  case 1:villan.addImage(villan1);
        break;
  case 2:villan.addImage(villan2);
        break;
  default:break;
}
villan.scale=0.3;
villan.lifetime=120;
villanGroup.add(villan);
}
}
function createNinjaStar(){
  var ninjaStar=createSprite(100,100,60,10);
  ninjaStar.addImage(ninjaStarImg);
  ninjaStar.x=200;
  ninjaStar.y=200;
  ninjaStar.velocityX=-4;
  ninjaStar.lifetime=100;
  ninjaStar.scale=0.2;
  ninjaStarGroup.add(ninjaStar);
}
