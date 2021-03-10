var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_jumping;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;
var score, coins, coinsGroup, coinsImage;

function preload(){
  mario_running = loadAnimation("M1.png" , "M2.png", "M3.png");
  
  groundImage = loadImage("bg.png");

  coinsImage = loadAnimation("C1.png","C2.png", "C3.png", "C4.png", "C5.png", "C6.png");
  
  obstacle1 = loadImage("KingBoo.png");
  obstacle2 = loadImage("Koopa.png");
  obstacle3 = loadImage("KoopaTroopa.pmg");
  obstacle4 = loadImage("Bowser.png");
  obstacle5 = loadImage("Wario.png");
  obstacle6 = loadImage("OBS1.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
 
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  mario = createSprite(50,160,20,50);
  mario.addAnimation("running", mario_running);
 
  

  mario.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and coins Groups
  obstaclesGroup = createGroup();
  coinsGroup = createGroup();

  
  mario.setCollider("rectangle",0,0,mario.width,mario.height);
 // mario.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)

    //scoring
    if(Mario.isTouching(coinsGroup)){
      score = score + 3
    }
     
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& mario.y >= 131) {
        mario.velocityY = -12;
        
    }
    
    //add gravity
    mario.velocityY = mario.velocityY + 0.8
  
    
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnCoins();
    if(obstaclesGroup.isTouching(mario)){
        //mario.velocityY = -12;
       
        gameState = END;
       
      
    
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
      ground.velocityX = 0;
      mario.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
     
     obstaclesGroup.setVelocityXEach(0);  
     
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop mario from falling down
  mario.collide(invisibleGround)


  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visble=false;
  obstaclesGroup.destroyEach();
  mario.changeAnimation("running", mario_running);
  score=0;

}
function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var coins = createSprite(600,120,40,10);
    coins.y = Math.round(random(50,100));
    coins.addAnimation("coin",coin);
    coins.scale = 0.1;
    coins.velocityX = -3;

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }