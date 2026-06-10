var JOGAR = 1;
var ENCERRAR = 0;
var state = JOGAR;

var trex,runTrex;
var ground,groundimg;
var cloud,cloudImg; 
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var cactus,groupCactus;
var groupCloud;
var restart,gameover;
function preload(){
    runTrex = loadAnimation("trex1.png","trex2.png","trex3.png");
    collideTrex = loadImage("trex_collided.png")
    groundimg = loadImage("ground2.png");
    cloudImg = loadImage ("cloud (1).png");
    cactus1  = loadImage ("obstacle1.png");
    cactus2  = loadImage ("obstacle2.png");
    cactus3  = loadImage ("obstacle3.png");
    cactus4  = loadImage ("obstacle4.png");
    cactus5  = loadImage ("obstacle5.png"); 
    cactus6  = loadImage ("obstacle6.png");
    Restart = loadImage ("restart.png");
    gameOver = loadImage("gameOver.png")        
}

function setup (){
 createCanvas(600,200);
 
 //==================================
 //TREX
 //==================================
 trex = createSprite(50,175,20,20);
 trex.addAnimation("running",runTrex); 
 trex.addAnimation("Collided",collideTrex)
 trex.scale = 0.5;
 //trex.debug = true
 trex.setCollider("rectangle",0,0,100,100);
 //==========================
 //chão
 //==========================
 ground = createSprite(200,180,400,5);
 ground.addImage(groundimg)
 ground.x = ground.width/2; 
 ground.velocityX = -2;
 //===============================
 //SOLO INVISÍVEL
 //===============================
 invGround = createSprite(200,185,400,5);
 invGround.visible = false;

 groupCactus = new Group();
 groupCloud = new Group();

 //============================
 //GAMEOver and RESTART
 //============================
gameover = createSprite(width/2,40);
gameover.addImage(gameOver);
restart = createSprite(width/2,160);
restart.addImage (Restart);
restart.visible = false;
gameover.visible = false;

}

function draw (){  
 background (240);

 if (state==JOGAR){
   if(keyDown("space")){
     trex.velocityY = -10;
   } 
   trex.velocityY = trex.velocityY+0.8;
   if(ground.x <0){
    ground.x = ground.width/2;  
   }
   generateCactus();
   generateClouds();
   if (groupCactus.isTouching(trex)){
    state = ENCERRAR;      
   }

 }else if(state==ENCERRAR){   
   ground.velocityX = 0;
   groupCactus.setVelocityXEach(0);
   groupCloud.setVelocityXEach(0);
   groupCactus.setLifetimeEach(-1);
   groupCloud.setLifetimeEach(-1);
   trex.changeAnimation("Collided");
   trex.velocityX = 0;

   
 }
 
 
 //========================
 //COLISÃO
 //========================
 trex.collide(invGround); 
 
 


 
 drawSprites();
}

function generateClouds(){
   if (frameCount%160===0){
    cloud = createSprite(600,15,20,20);
    cloud.velocityX = -2;
    cloud.y = Math.round(random(20,90));
    cloud.addImage(cloudImg);

    cloud.depth = trex.depth;
    trex.depth = trex.depth+1; 

    cloud.lifetime = 322;
    groupCloud.add(cloud)
   }
}

function generateCactus(){
   if(frameCount%120===0){
      cactus = createSprite(600,160,20,20);
      cactus.velocityX = -6;
     //cactus.debug = true;
      var num = Math.round(random(1,6));
      switch(num){
         case 1: cactus.addImage(cactus1);
          break;
          case 2: cactus.addImage(cactus2);
          break;
         case 3: cactus.addImage(cactus3);
          break;
         case 4: cactus.addImage(cactus4);
          break;
         case 5: cactus.addImage(cactus5)
          break;
         case 6: cactus.addImage(cactus6) 
          break;
         default: break;  
      }
      cactus.scale = 0.6;
      cactus.lifetime = 322;
      groupCactus.add(cactus)
   }
}
