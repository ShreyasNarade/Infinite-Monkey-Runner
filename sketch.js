var END = 0, PLAY = 1;
var monkey , monkey_running ;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground ;

var bananaEaten = 0 , timeSurvived = 0;
var gameState = PLAY;
var gameOver,gameOverImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameover.png");
  

}



function setup() {
   createCanvas(700,400);

monkey = createSprite(65,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
 

   gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  
  console.log(ground.x);

  score=0;
  

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}

function draw() {
  background("lightblue");
  
   monkey.setCollider("circle",0,0,265);
  monkey.debug = false;
  
   


  if(gameState===PLAY){
    timeSurvived += Math.round(frameCount % 50 ===0);
     monkey.velocityY = monkey.velocityY + 0.8;
    gameOver.visible = false;


    spawnObstacle();
    spawnfood();
    
    var survivalTime = 0;
   ground.x=ground.width/2;
    
    fill("blue");
  textSize(20);
  text("Time Survived: "+ timeSurvived,500,50);
  fill("blue");
  textSize(20);
  text("Banana Eaten: "+ bananaEaten,100,50);
  
  }
   
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -20;
        
    }
  if(monkey.isTouching(FoodGroup)){
    bananaEaten = score+ 1;
    FoodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  
  
  else if(gameState===END){
 obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.destroy();
   ground.visible = false;
        gameOver.visible = true;

    
  }
  
  

  monkey.collide(ground);
  

  drawSprites();
  
  
}
function spawnfood() {
  //write code here to spawn the clouds
 if (frameCount % 150 === 0) {
    banana = createSprite(600,310,40,10);
    banana.y = Math.round(random(180,340));
    banana.addImage(bananaImage);
   banana.x=700;
    banana.scale = 0.1;
    banana.velocityX = ground.velocityX;
    
    banana.lifetime = 200;
    
    banana.setCollider("circle",0,0,155)
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(600,310,40,10);
    obstacle.x = 700;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = ground.velocityX;
    
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    obstacle.setCollider("circle",0,0,250)
    obstacle.debug = false;
   
    obstacleGroup.add(obstacle);
  }
}


