 var w=window.innerWidth;
 var h=window.innerHeight;
var gameRatio = innerWidth/innerHeight;	

 document.getElementById('game').style.width=w;
 document.getElementById('game').style.height=h;

var BootState={
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;  
      
    },
    preload:function(){
         //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			//game.scale.setScreenSize(true);
        this.load.image('background','Images/boot_background.png');
        this.load.image('button','Images/play_button.png');
        this.load.image('hill','Images/hill.png');
        this.load.image('cloud1','Images/cloud1.png');
        this.load.image('cloud2','Images/cloud2.png');
        //this.load.spritesheet('player','Images/player.png',28,30,5,1,1);
        this.load.spritesheet('player2','Images/player2.png',70,110,7,3,12);
        this.load.spritesheet('player2','Images/player2.png',82,118,7,3,12,12);
        this.load.image('pillar','Images/brick.jpg');
        //this.load.image('back','Images/background2.png');
        //this.load.image('platform','Images/platform.png');
        this.load.spritesheet('fire','Images/fire_spritesheet.png',22,22,0,0);
        game.load.image("powerbar", "Images/powerbar.png");
        game.load.image("star", "Images/10.png");

        
        game.load.audio('jump', 'Sounds/jump.wav');
        game.load.audio('game_over', 'Sounds/game_over.wav');
        
    },
    create:function(){
         game.input.addPointer();
        
        background= game.add.tileSprite(0,0, window.innerWidth* window.devicePixelRatio,
                                        window.innerHeight* window.devicePixelRatio, 'background');
        this.button= game.add.button(game.width/2,game.height/2,'button');
        this.left=game.add.sprite(game.width/2-200,game.height/2-350,'player2',2);
        this.right=game.add.sprite(game.width-700,game.height/2-350,'player2',2);
        this.highestScore= this.add.text(game.width/2,150,'Highest score : '+localStorage.getItem("highestScore"),
            {font:"50px Cambria",fill:"#ffffff",shadowOffsetX: 2,shadowOffsetY: 5,
            shadowBlur: 4,
            strokeThickness: 4});
        this.name= this.add.text(game.width/2,game.height/2-300,'SUPERGIRL!!',
            {font:"80px Cambria",fill:"#ffffff",shadowOffsetX: 2,
            shadowOffsetY: 5,
            shadowBlur: 4,
            strokeThickness: 4,
            strokeColor: "#000000",
            shadowColor: "#000000"});
        
        //this.game.state.start('Level1');
    },
    update:function(){
       
        game.input.onDown.add(this.begin,this);
            
    },
    begin:function()
    {
        this.game.state.start('Level1');
    },
};
    var endingScore=0;
var GameState={
    init:function(){        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y=1000;
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        //this.jumpBtn = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.world.setBounds(0,0,game.width+200,game.height);
        console.log(game.width);
        console.log(game.height);
        console.log("Window width: "+window.innerWidth);
        console.log("Window height: "+window.innerHeight);
    }, 
    preload:function(){
        //Assets loaded in BootState
        //this.load.image('background','Images/boot_background.png');
        this.load.image('button','Images/play_button.png');
        this.load.image('hill','Images/hill.png');
        this.load.image('cloud1','Images/cloud1.png');
        this.load.image('cloud2','Images/cloud2.png');
        //this.load.spritesheet('player','Images/player.png',28,30,5,1,1);
        this.load.spritesheet('player2','Images/player2.png',82,118,7,3,12,12);
        this.load.image('pillar','Images/brick.jpg');
        //this.load.image('back','Images/background2.png');
        //this.load.image('platform','Images/platform.png');
        this.load.spritesheet('fire','Images/fire_spritesheet.png',21,21,2,0,0);
        game.load.image("powerbar", "Images/powerbar.png");
         game.load.image("star", "Images/10.png");
        
        game.load.audio('jump', 'Sounds/jump.wav');
        game.load.audio('game_over', 'Sounds/game_over.wav');
    },
    create:function(){
         game.input.addPointer();
        //background = game.add.tileSprite(0, 0, window.innerWidth* window.devicePixelRatio,
        //                                 window.innerHeight*window.devicePixelRatio, 'back');
        
        this.stage.backgroundColor="#7ec0ee";
                                        
        game.input.onDown.add(this.prepareToJump, this);
        
        var hill=this.add.sprite(100,this.world.height,'hill');
        hill.scale.setTo(3);
        hill.anchor.setTo(0,1);
        hill.alpha=0.9;
        this.physics.arcade.enable(hill);
        hill.body.allowGravity=false;
        hill.body.immovable=true;
        hill.body.velocity.x=-150;
        
        var hill2=this.add.sprite(550,this.world.height,'hill');
        hill2.scale.setTo(2);
        hill2.anchor.setTo(0,1);
        hill2.alpha=0.5;          //for transparency
        this.physics.arcade.enable(hill2);
        hill2.body.allowGravity=false;
        hill2.body.immovable=true;
        hill2.body.velocity.x=-150;
        
        var cloud1=this.add.sprite(200,this.world.height-400,'cloud1');
        cloud1.scale.setTo(2);
        cloud1.anchor.setTo(0,1);
        this.physics.arcade.enable(cloud1);
        cloud1.body.allowGravity=false;
        cloud1.body.immovable=true;
        cloud1.body.velocity.x=-150;
        
        var cloud2=this.add.sprite(650,this.world.height-400,'cloud2');
        cloud2.anchor.setTo(0,1);
        cloud2.alpha=0.8;          //for transparency
        this.physics.arcade.enable(cloud2);
        cloud2.body.allowGravity=false;
        cloud2.body.immovable=true;
        cloud2.body.velocity.x=-150;
        
        this.hillGroup1 = this.add.group();
        this.hillGroup1.enableBody = true;
        
        this.hillGroup2 = this.add.group();
        this.hillGroup2.enableBody = true;
        
        this.cloudGroup1 = this.add.group();
        this.cloudGroup1.enableBody = true;
        
        this.cloudGroup2 = this.add.group();
        this.cloudGroup2.enableBody = true;
        
        this.hill1Maker = this.time.events.loop(8000,this.makehill1,this);
        
        this.hill2Maker = this.time.events.loop(5000,this.makehill2,this);
        
        this.cloud1Maker = this.time.events.loop(4500,this.makecloud1,this);
        
        this.cloud2Maker = this.time.events.loop(2900,this.makecloud2,this);
        
        //this.player=this.add.sprite(50,200,'player',3);
        //this.player.scale.setTo(2);  
        //this.player.frame=3;
        
        //this.player.animations.add('walking',[0,1,2,1],6,true);
        //this.player.anchor.x=.5;
        
        this.player=this.add.sprite(50,200,'player2',2);
        this.player.scale.setTo(0.7);
        this.player.frame=3;
        
        this.player.animations.add('walking',[3,6,8,11,1,2],20,true);
        this.player.anchor.x=.5;
        
        //this.android.animations.play('kick');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds=true;
        
        this.camera.follow(this.player);
        
        this.player.customParams={speed:230,
                                 //jump:-800,
                                 //bigJump:-1500,
                                 health:100,
                                 direction:"left",
                                 playerJumping:false};
                                             
        this.fireup=false;
        
        this.scoreBox= this.add.text(10,10,'Score :'+'0',{font:"35px Arial",fill:"#ff0044"});
        this.scoreBox.fixedToCamera=true;
        
        if(localStorage.getItem("highestScore")===null)
            localStorage.setItem("highestScore",0);
            
        this.highScoreBox= this.add.text(game.width-300,10,'High score :'+localStorage.getItem("highestScore"),
            {font:"35px Arial",fill:"#ff0044"});
        this.highScoreBox.fixedToCamera=true;

        this.pillarGroup1 = this.add.group();
        this.pillarGroup1.enableBody = true;
        
        //Create a pipe after every 1 seconds
        this.pillarMaker = this.time.events.loop(1400,this.makepillar,this);
        
       /* this.platform= this.add.sprite(0,500,'platform');
        this.physics.arcade.enable(this.platform);
        this.platform.body.allowGravity= false;
        this.platform.body.immovable=true;        */
        
        this.platform=this.add.tileSprite(0,this.world.height-100,this.world.width+13000,1000,'pillar');
        this.platform.scale.setTo(0.1);
        this.physics.arcade.enable(this.platform);
        this.platform.body.setSize(this.world.width+13000, 1000, 0, 0);
        this.platform.body.allowGravity=false;
        this.platform.body.immovable=true;
        this.platform.body.velocity.x=-200;

        
        endingScore = 0;
        
        this.player.body.collideWorldBounds=true;
        
        this.jump= game.add.audio('jump');
        this.game_over= game.add.audio('game_over');
       
    },
    update:function(){
        
        if(this.player.body.blocked.down === true)
           this.gameOver();
        
        this.player.body.velocity.x=0;
        
        this.physics.arcade.collide(this.player,this.platform,this.playerwalking,null,this);

        this.physics.arcade.collide(this.player,this.WorldBounds,this.gameOver,null,this);
        this.physics.arcade.collide(this.player,this.pillarGroup1,this.increaseScore,null,this);
        
        //this.physics.arcade.collide(this.player,[this.fire,this.fire2,this.fire3],this.decreaseScore,null,this);
       
        this.physics.arcade.overlap(this.player,this.star,this.star1Collision,null,this);
        this.physics.arcade.overlap(this.player,this.star2,this.star2Collision,null,this);

      
      this.physics.arcade.overlap(this.player,[this.hillGroup1,this.hillGroup2,this.cloudGroup1,this.cloudGroup2]);
      
      //input through left mouse click or touch of mobile
       // var ptr=game.input.pointer1;
      //game.input.onDown.add(this.prepareToJump, this);
        //if( game.input.pointer1.isDown)
            //{
          //     this.jumping();
        //    }
        
         game.input.onDown.add(this.prepareToJump, this);

        a=10;
        
        this.pillarGroup1.forEach(function(p){
            if(Math.abs(a.x-p.x)<50){
               // self.scored;
              p.kill();
            } 
        }); 

    },
    star1Collision : function(){	
        endingScore += 10;	  
        this.scoreBox.text = endingScore;   
        //this.scoreBox.setText("Score :"+this.score);
        this.star.kill();		
    },
    star2Collision : function(){	
        endingScore += 10;  
        this.scoreBox.text = endingScore;         
        //this.scoreBox.setText("Score :"+this.score);
        this.star2.kill();		
    },
    prepareToJump: function(){
        if(this.player.body.velocity.y===0){
	      powerBar = game.add.sprite(this.player.x,this.player.y-50,"powerbar");   //will remove powerbar later
	      powerBar.width = 0;
              powerTween = game.add.tween(powerBar).to({
                width:100
                }, 350, "Linear",true); 
	      game.input.onDown.remove(this.prepareToJump, this);
              game.input.onUp.add(this.jumping, this);
         
        }        	
    },
    jumping: function(){
        console.log('jumping');
          this.jump.play();
          this.player.body.velocity.x=0;
          this.player.animations.stop('walking');
          this.player.frame=0;
          //this.player.scale.setTo(-2,2);
          this.player.scale.setTo(0.7,0.7);
          var playerJumpPower= -powerBar.width*3.5-100;
          powerBar.destroy();
          game.tweens.removeAll();
          this.player.body.velocity.y = playerJumpPower*2;
          playerJumping = true;
          powerTween.stop();
          this.flag=0;                        //this needs to be changed
          this.player.body.velocity.x=150;
          game.input.onUp.remove(this.jumping, this);
          
    },
    gameOver: function(){
        this.header();
        this.game_over.play();
        //alert("Game Over");
        this.game.state.start('End');
    },
    makepillar: function(){
        var p1; 
        p1 = this.pillarGroup1.getFirstExists(false);
        
        self= this;
        
        x=[0.06,0.05,0.08];
        var rand = x[Math.floor(Math.random() * x.length)];
        
        y=[0,0.5,1];
        var randm = y[Math.floor(Math.random() * y.length)];
        
        if(!p1){
            var present = rand;

            if(present === 0.05)
            {
                p1 =this.pillarGroup1.create(game.width,game.height-70,'pillar');
            }
            else if(present === 0.06)
            {               
                p1=self.pillarGroup1.create(game.width,game.height-100,'pillar');
            }
            else if (present === 0.08){
                p1=self.pillarGroup1.create(game.width,game.height-130,'pillar');  
                
                var present2 = randm;
                
                if(present2 === 0){ 
                 this.star=this.add.sprite(p1.x,game.height-180,'star');
                 //this.fire2=this.add.sprite(p1.x+30,game.height-155,'star');
                }
                else if(present2 === 0.5){
                 this.star=this.add.sprite(p1.x+50,game.height-180,'star');
                 //this.fire2=this.add.sprite(p1.x+80,game.height-155,'fire');
                }
                else{
                 this.star=this.add.sprite(p1.x+100,game.height-180,'star');
                 //this.fire2=this.add.sprite(p1.x+130,game.height-155,'fire');
                }
                
                 this.star.scale.setTo(0.2);
                 this.physics.arcade.enable(this.star);
                 this.star.body.checkCollision.up = true;
                 this.star.body.checkCollision.left = true;
                 this.star.body.velocity.x= -230;
                 this.star.body.allowGravity=false;
                 this.star.body.immovable=true;
    
                //this.fire.animations.add('onfire',[0,1,0,1],2,true);
                //this.fire.animations.play('onfire');
                 
                 //this.fire2.scale.setTo(1.5);
                 //this.physics.arcade.enable(this.fire2);               
                 //this.fire2.body.velocity.x= -230;
                 //this.fire2.body.allowGravity=false;
                 //this.fire2.body.immovable=true;
    
                //this.fire2.animations.add('onfire',[0,1,0,1],2,true);
                //this.fire2.animations.play('onfire');
            }
            p1.scale.setTo(present);
            
        }
        else{
            var present = rand;

            if(present === 0.05)
            {
                p1.reset(game.width,this.world.height-70);
            }
            else if(present === 0.06)
            {
                p1.reset(game.width,this.world.height-100);
            }
            else if (present === 0.08){
                p1.reset(game.width,this.world.height-130);
                this.star2=this.add.sprite(p1.x+40,this.world.height-180,'star');
                this.star2.scale.setTo(0.2);
                this.physics.arcade.enable(this.star2);
                this.star2.body.checkCollision.up = true;
                this.star2.body.checkCollision.left = true;
                this.star2.body.velocity.x= -230;
                this.star2.body.allowGravity=false;
                this.star2.body.immovable=true;
                
                //this.fire3.animations.add('onfire',[0,1,0,1],2,true);
                //this.fire3.animations.play('onfire');
            }
            p1.scale.setTo(present);
        } 
        
        p1.body.velocity.x = -230;
        p1.body.allowGravity = false;
        p1.body.immovable=true;
        
    },

    makehill1: function(){
        var p1; 
        p1 = this.hillGroup1.getFirstExists(false);
        
        self= this;
        
        x=[3,3.5,2.8];
        var rand = x[Math.floor(Math.random() * x.length)];
        
         if(!p1){
            var present = rand;

            if(present === 3){
                p1 =this.pillarGroup1.create(game.width+150,game.height,'hill');
            }
            else if(present === 3.5){
                p1=self.pillarGroup1.create(game.width+175,game.height,'hill');
            }
            else if (present === 2.8){
                p1=self.pillarGroup1.create(game.width+200,game.height,'hill');  
                }
            p1.scale.setTo(present);
            
        }
        else{
            var present = rand;

            if(present === 3){
                p1.reset(game.width+25,this.world.height);
            }
            else if(present === 3.5){
                p1.reset(game.width+50,this.world.height);
            }
            else if (present === 2.8){
                p1.reset(game.width+100,this.world.height);
            }
            p1.scale.setTo(present);
        } 
        
        game.physics.arcade.overlap(this.player,p1);
        p1.body.checkCollision.up = false;
        p1.body.checkCollision.left = false;
        p1.body.velocity.x = -150;
        p1.body.allowGravity = false;
        p1.body.immovable=true;
        p1.anchor.setTo(0,1);
        p1.alpha=0.9;
    },
    makehill2: function(){
        var p1; 
        p1 = this.hillGroup2.getFirstExists(false);
        
        self= this;
        
        x=[2,1.5,1.8];
        var rand = x[Math.floor(Math.random() * x.length)];
        
         if(!p1){
            var present = rand;

            if(present === 2){
                p1 =this.hillGroup2.create(game.width+150,game.height,'hill');
            }
            else if(present === 1.5){
                p1=self.hillGroup2.create(game.width+175,game.height,'hill');
            }
            else if (present === 1.8){
                p1=self.hillGroup2.create(game.width+200,game.height,'hill');  
                }
            p1.scale.setTo(present);
            
        }
        else{
            var present = rand;

            if(present === 2){
                p1.reset(game.width+150,this.world.height);
            }
            else if(present === 1.5){
                p1.reset(game.width+175,this.world.height);
            }
            else if (present === 1.8){
                p1.reset(game.width+200,this.world.height);
            }
            p1.scale.setTo(present);
        } 
        
        game.physics.arcade.overlap(this.player,p1);
        p1.body.checkCollision.up = false;
        p1.body.checkCollision.left = false;
        p1.body.velocity.x = -150;
        p1.body.allowGravity = false;
        p1.body.immovable=true;
        p1.anchor.setTo(0,1);
        p1.alpha=0.5;
    },
    makecloud1: function(){
        var p1; 
        p1 = this.cloudGroup1.getFirstExists(false);
        
        self= this;
        
        x=[2,1.8,2.2];
        var rand = x[Math.floor(Math.random() * x.length)];
        
         if(!p1){
            var present = rand;

            if(present === 2){
                p1 =this.cloudGroup1.create(game.width+20,game.height-400,'cloud1');
            }
            else if(present === 1.8){
                p1=self.cloudGroup1.create(game.width+50,game.height-380,'cloud1');
            }
            else if (present === 2.2){
                p1=self.cloudGroup1.create(game.width+100,game.height-420,'cloud1');  
                }
            p1.scale.setTo(present);
            
        }
        else{
            var present = rand;

            if(present === 2){
                p1.reset(game.width+20,this.world.height-400);
            }
            else if(present === 1.8){
                p1.reset(game.width+50,this.world.height-380);
            }
            else if (present === 2.2){
                p1.reset(game.width+100,this.world.height-420);
            }
            p1.scale.setTo(present);
        } 
        
        game.physics.arcade.overlap(this.player,p1);
        p1.body.velocity.x = -150;
        p1.body.allowGravity = false;
        p1.body.immovable=true;
        p1.anchor.setTo(0,1);
    },
    makecloud2: function(){
        var p1; 
        p1 = this.cloudGroup2.getFirstExists(false);
        
        self= this;
        
        x=[1,1.8,1.2];
        var rand = x[Math.floor(Math.random() * x.length)];
        
         if(!p1){
            var present = rand;

            if(present === 1){
                p1 =this.cloudGroup2.create(game.width+20,game.height-400,'cloud2');
            }
            else if(present === 1.8){
                p1=self.cloudGroup2.create(game.width+50,game.height-450,'cloud2');
            }
            else if (present === 1.2){
                p1=self.cloudGroup2.create(game.width+100,game.height-420,'cloud2');  
                }
            p1.scale.setTo(present);
            
        }
        else{
            var present = rand;

            if(present === 1){
                p1.reset(game.width+20,this.world.height-400);
            }
            else if(present === 1.8){
                p1.reset(game.width+50,this.world.height-450);
            }
            else if (present === 1.2){
                p1.reset(game.width+100,this.world.height-420);
            }
            p1.scale.setTo(present);
        } 
        
        game.physics.arcade.overlap(this.player,p1);
        p1.body.velocity.x = -150;
        p1.body.allowGravity = false;
        p1.body.immovable=true;
        p1.anchor.setTo(0,1);
        p1.alpha=0.8;
    },
    playerwalking:function(){
        this.player.animations.play('walking');
        //this.player.scale.setTo(-2,2);
        this.player.scale.setTo(0.7,0.7);
       
       this.player.body.velocity.x=230;

    },
    increaseScore: function(){
       this.player.animations.play('walking');
       //this.player.scale.setTo(-2,2);
       this.player.scale.setTo(0.7,0.7);
       
       this.player.body.velocity.x=150;
       
       if(this.flag===0)
        {
            endingScore+=10;
            this.fadeScore(); 
        }
        this.scoreBox.setText("Score :"+endingScore);
               
        this.flag=1;
    },
    decreaseScore: function(){
        this.fireup=true;
        
        endingScore-=50;
        
        this.scoreBox.setText("Score :"+endingScore);
        
        if(endingScore < 100)
            this.gameOver();
        
        this.fireup=false;
    },
    header: function(){
        hsc = localStorage.getItem("highestScore");
        if (endingScore>hsc)
        {
            localStorage.highestScore=endingScore;
        }
        this.highScoreBox.setText('High score :'+localStorage.getItem("highestScore")); 
    },
    fadeScore: function(){
        
        var fontStyleTiny = {
            font: "40px gameFont",
            fill: "#ffffff",
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 4,
            strokeThickness: 3,
            strokeColor: "#000000",
            shadowColor: "#000000"
        };

        var txtCaption = "";

        txtCaption = "+10";  
        
        var bx,by;
        bx= this.player.x;
        by=this.player.y+20;
    
        var txtAddition = game.add.text(bx, by, txtCaption, fontStyleTiny);
        game.time.events.add(3000, function () {
            game.add.tween(txtAddition).to({ y: 0, alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);                
        }, this);

        game.time.events.add(1000, function () {
            txtAddition.destroy();
        }, this);
    
    },
    render:function(){
         game.debug.pointer(game.input.mousePointer);
         game.debug.pointer(game.input.pointer1);
    },
};

var EndState={
    preload: function(){
    this.load.image('background','Images/boot_background.png');
    this.load.image('home','Images/home.png');
    this.load.image('restart','Images/restart.png');
    this.load.image('gameOver','Images/GameOver.gif');

    },
    create: function(){
     background= game.add.tileSprite(0,0, window.innerWidth* window.devicePixelRatio,window.innerHeight* window.devicePixelRatio, 'background');
    this.restart= game.add.button(game.width/2-320,game.height/2,'restart',this.action1);
        this.restart.scale.setTo(0.7);
    this.home= game.add.button(game.width/2+260,game.height/2,'home',this.action2);
    
        
    this.endingScore= this.add.text(game.width/2-100,100,'Your Score :'+ endingScore ,{font:"35px Cambria",fill:"#ffffff"});
        
    this.highestScore= this.add.text(game.width/2-100,150,'Highest score :'+localStorage.getItem("highestScore"),
            {font:"35px Cambria",fill:"#ffffff"});

    this.over=this.add.sprite(game.width/2-220,game.height/2-20,'gameOver');
    },
    update: function(){
     
    },
    action1: function(){
    this.game.state.start('Level1');
    },
    action2: function(){
    this.game.state.start('Boot');
    }
};

var game = new Phaser.Game(window.innerWidth* window.devicePixelRatio,window.innerHeight*window.devicePixelRatio,Phaser.CANVAS,'game');

game.state.add('Level1',GameState);
game.state.add('Boot',BootState);
game.state.add('End',EndState);
game.state.start('Boot');