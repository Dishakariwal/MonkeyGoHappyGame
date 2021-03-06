
var monkey , monkey_running,monkeycollide
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground
var survivalTime=0
var score=0; 
var PLAY=1;    
var gameState=PLAY
var END=0



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  FoodGroup=new Group();
  obstacleGroup =new Group()
}



function setup() {
  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
 
  ground=createSprite(70,350,800,20)
  ground.velocityX=-3
  ground.x=ground.width /2;
  
 
}


function draw() {
  
  createCanvas(400,400)
background("green")
  
   monkey.collide(ground)
  
  if (ground.x < 0){
      ground.x = ground.width/2;
       }
  textSize(20);
  fill("black")
  text("Score:"+score, 20,75)
  
  
  textSize(20)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,20,50)
  
   if (gameState===PLAY) { 
  if(keyDown("space")&& monkey.y>=159){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
     
      banana();
  obstacles();
  
     if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
    score=score+1
  }
     if (monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
}
  
  if (gameState===END){
    //monkey
    monkey.velocityY=0;
    //Food group
    FoodGroup.setLifetimeEach(-1)
    FoodGroup.destroyEach();
    FoodGroup.setVelocityEach(0,0)
    
    //obstacles
    obstacleGroup.setLifetimeEach(-1)
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityEach(0,0)
    
    fill("purple")
     text ("GAME OVER", 150, height/2)
    
    fill("black")
    textSize(16)
    text ("Try again by pressing 'R'", 120,230)
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      survivalTime = 0;
      gameState = PLAY; 
      
    }
    
  }
  
  drawSprites();
}


function banana(){
  if(frameCount % 200 === 0){
    var banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
      
    FoodGroup.add(banana);
    
    
  }
  
  if(frameCount % 700 === 0){
    var banana1 = createSprite(400,350,40,10);
    banana1.addImage(bananaImage);
    banana1.y = Math.round(random(120,200));
    banana1.scale = 0.1;
    
    banana1.velocityX = -3;
    banana1.lifetime = 200;
      
    FoodGroup.add(banana1);
    
    
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
  }

}

