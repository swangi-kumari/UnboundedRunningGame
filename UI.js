export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.color = 'rgba(1,10,0.2,0.2)';
    }
    draw(context) {
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time*0.001).toFixed(1), 20, 80);
        // game over messages
            if (this.game.gameOver) {
                context.textAlign = 'center';
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                if(this.game.score>30){
                context.fillText('You Won!', this.game.width * 0.5, this.game.height * 0.5-20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('What are the creatures of the night are afraid of ???  YOU !!!', this.game.width * 0.5, this.game.height * 0.5+20);
             
            } else {
                context.textAlign = 'center';
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                context.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5-20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Nope, Better luck next time !', this.game.width * 0.5, this.game.height * 0.5+20);
            }
        }
        context.restore();
        }
        
        
    }