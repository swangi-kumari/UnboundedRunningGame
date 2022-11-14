import {Sitting, Running, Jumping, Falling, Rolling} from './playerStates.js';

//Job of this class is to draw and update our superdog chracter 
export class Player{
    constructor(game) {  //constructor will take the entire game object as an argument, through it we will have access to some thind we will need such as width & height of the game area and so on
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;  //x and y are position here
        this.y = this.game.height - this.height -this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20; //can change
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game) ];
        
    }
    update(input, deltaTime){ //move it around based on user input and it will cycle through the sprite frames
        this.checkCollision(); //----> here
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animate
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        
    }
    draw(context ){ //draw method will take those values and it will draw currently active frames and the current coordinates
         //context argument to specify which convas element we want to draw on

        // context.fillStyle = 'red'; //determine what the player looks like //red rectangle
        // context.fillRect(this.x, this.y, this.width, this.height);

        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height); //strokeRect()-method of canvas 2D API draws a rectangle
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){   //state of player
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy=>{
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y 

            ){
                //collision
                enemy.markedForDeletion = true;
                this.game.score++;

            }
            else{

            }

        });
    }
}