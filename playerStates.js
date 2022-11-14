import {Dust, Fire} from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}

class State{      //Parent Class(super Class)
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State{ //Child Class (sub class)
    constructor(game){
        super('SITTING', game);
        // this.player = player;
    }
    enter(){  //run once when this state is entered
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        
    }
    handleInput(input){ //keep checking if the correct key is pressed and switch game.player to diff state
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1 );
        } else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2 );
        }
    }
}

export class Running extends State{ //Child Class (sub class)
    constructor(game){
        super('RUNNING', game);
        // this.player = player;
    }
    enter(){  //run once when this state is entered
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }
    handleInput(input){ //keep checking if the correct key is pressed and switch game.player to diff state
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width*0.6, this.game.player.y + this.game.player.height));
        if(input.includes('ArrowDown') ){
            this.game.player.setState(states.SITTING, 0);
        } else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2 );
        }
    }
}

export class Jumping extends State{ //Child Class (sub class)
    constructor(game){
        super('JUMMPING', game);
        // this.player = player;
    }
    enter(){  //run once when this state is entered
        if(this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 1;
    }
    handleInput(input){ //keep checking if the correct key is pressed and switch game.player to diff state
        if(this.game.player.vy > this.game.player.weight ){
            this.game.player.setState(states.FALLING,1);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2 );
        }
    }
}

export class Falling extends State{ //Child Class (sub class)
    constructor(game){
        super('FALLING', game);
        // this.player = player;
    }
    enter(){  //run once when this state is entered
        // if(this.player.onGround()) this.player.vy -= 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 2;
    }
    handleInput(input){ //keep checking if the correct key is pressed and switch game.player to diff state
        if(this.game.player.onGround() ){
            this.game.player.setState(states.RUNNING,1);
        }
    }
}

export class Rolling extends State{ //Child Class (sub class)
    constructor(game){
        super('ROLLING', game);
        // this.player = player;
    }
    enter(){  //run once when this state is entered
        // if(this.player.onGround()) this.player.vy -= 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    handleInput(input){ //keep checking if the correct key is pressed and switch game.player to diff state
        this.game.particles.push(new Fire(this.game, this.game.player.x + this.game.player.width*0.5, this.game.player.y + this.game.player.height * 0.5));
        if(!input.includes('Enter') && this.game.player.onGround() ){
            this.game.player.setState(states.RUNNING,1);
        }else if(!input.includes('Enter') && !this.game.player.onGround() ){
            this.game.player.setState(states.FALLING,1);
        }else if(input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 27;
        }
    }
}



