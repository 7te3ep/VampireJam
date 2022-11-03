import {c, ctx} from "./canvas.js";

//Environment.js
class Pickaxe {
    constructor(x){
        this.x = x
        if (this.x <= 50){
            this.x += 50
        }
        if (this.x >= 450){
            this.x -= 50
        }
        this.y = 1000;
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 70
        this.frameY = 480
        this.frameW = 110
        this.frameH = 90
        this.animationCount = 0
        this.animationUp = true
    }
    draw(speed,gameFrame){
        this.y -= speed
        if (this.animationCount == 30){
            this.animationUp = false
        }if (this.animationCount == 0){
            this.animationUp = true
        }
        if (this.animationUp){
            this.animationCount += 2
        }else {
            this.animationCount -= 2
        }
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y+(15-this.animationCount), this.frameW,this.frameH);
    }
}
export {Pickaxe};
