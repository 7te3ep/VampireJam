import {c, ctx} from "./canvas.js";

//Environment.js
class Energy {
    constructor(){
        this.x = Math.random()*1000
        if (this.x <= 50){
            this.x += 50
        }
        if (this.x >= 450){
            this.x -= 50
        }
        this.y = 1000;
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 390
        this.frameY = 510
        this.frameW = 50
        this.frameH = 70
    }
    draw(speed){
        this.y -= speed
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
    }
}
export {Energy};
