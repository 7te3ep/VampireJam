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
        this.frameX = 690
        this.frameY = 780
        this.frameW = 60
        this.frameH = 80
    }
    draw(speed){
        this.y -= speed
        c.getContext('2d').drawImage(this.spriteSheet,580,740,60,90,this.x+20, this.y, 60,90);
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
    }
}
export {Energy};
