var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obstacleGroup;
var score;
var SurvivalTime=0;
var ground;
var gameOver,gameOverImage;
var ball,ballImage;

function preload(){
  
  obstacleImage=loadImage("obstacle.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  ballImage=loadImage("ball.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImage=loadImage("gameOverImage.png")
}



function setup() {
createCanvas(400,400)  

monkey=createSprite(80,315,20,20)  
monkey.addAnimation("moving",monkey_running)
monkey.scale=0.1
  
obstacleGroup = createGroup(); 
FoodGroup = createGroup();
  
ground=createSprite(400,400,900,120) 
ground.shapeColor=(rgb(57,255,20))
  
  
  
ball=createSprite(200,200,1,1)
ball.addImage=(ballImage)  
}


function draw() {
background("lightblue");

 if(gameState === PLAY){
 if (monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
}    
  
if (keyDown("space")&& monkey.y >= 200){
  monkey.velocityY=-17; 
}
  
if (monkey.isTouching(obstacleGroup)){
gameOver=createSprite(200,200)  
gameOver.addImage(gameOverImage) 
gameOver.scale=0.6
gameState=END
ground.visible=false  
monkey.collide(obstacleGroup) 

}  
  
monkey.velocityY = monkey.velocityY + 0.8  
  
fill("black");  
stroke("white")
textSize(20)
SurvivalTime=Math.ceil(frameCount/frameRate())   
text("Survival Time:"+SurvivalTime,100,50);  
monkey.collide(ground) 
   
spawnObstacle();    
spawnBanana();
     
 }  
else if (gameState === END) {
    
SurvivalTime=0    
monkey.visible=false
  
} 

drawSprites();  
}

function spawnObstacle() {
  
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(400,305,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -7;
    obstacle.lifetime = 200
    obstacleGroup.add(obstacle)
    obstacle.debug=false
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height)
  }
}

function spawnBanana() {
  
  if (frameCount % 100 === 0) {
    var banana = createSprite(400,150,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime = 200
    FoodGroup.add(banana)

  }
}