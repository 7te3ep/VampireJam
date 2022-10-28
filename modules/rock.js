import {c, ctx} from "./canvas.js";

//Environment.js
class Rock {
    constructor(){
        this.x = Math.random()*1000
        this.y = 1000;
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.random = Math.random()
        if (this.random <= 0.5){
            this.frameX = 30
            this.frameY = 370
            this.frameW = 80
            this.frameH = 80
        }else {
            this.frameX = 130
            this.frameY = 380
            this.frameW = 120
            this.frameH = 70
        }
    }
    draw(){
        this.y -= 10
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
        //ctx.fillStyle = 'darkgreen'
        //ctx.fillRect(this.x, this.y, 50, 50);
    }
}
export {Rock};
