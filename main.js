import { Player } from './player.js';
import { InputHandler } from './input.js';
import {Background} from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import {UI} from './UI.js';


const musicSound = new Audio('music.mp3');


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500; //can change late acc to background
    canvas.height = 500;

// main brain of this project- "Game Class"
    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;
            this.maxSpeed = 4;
            this.background = new Background(this);
            this.player = new Player(this); //instance of player class
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score =0;
            this.fontColor = 'black';
            this.time=0;
            this.maxTime=30000;
            this.gameOver=false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime){    //will rum for evry animation frame and trigger all cal. that needs to happen
            musicSound.play();
            this.time+=deltaTime;
            if(this.time>this.maxTime) this.gameOver=true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handleEnemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);   //.splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
            });
            //Handle Particles
            this.particles.forEach((particle, index)=>{
                particle.update();
                if(particle.markedForDeletion) this.particles.splice(index, 1);
            })

        }
        draw(context){    //draw our images score and so on
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random()< 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }
    const game = new Game(canvas.width, canvas.height);
    // console.log(game);
    let lastTime = 0;

    function animate(timeStamp){ //update and draw over 60 times per second // create custom function
        musicSound.play();
        const deltaTime = timeStamp - lastTime;
        // console.log(deltaTime)
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas each time we update and draw 
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    } 
    animate(0);
    
});

