import {c, ctx} from "./canvas.js";

//Environment.js
class Blood {
    constructor(x){
        this.x = x
        this.y = 450;
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.random = Math.random()
        if (this.random <= 0.25){
            this.frameX = 660
            this.frameY = 230
            this.frameW = 60
            this.frameH = 50
        }else {
            if (this.random <= 0.5){
                this.frameX = 630
                this.frameY = 240
                this.frameW = 30
                this.frameH = 40
            }else {
                if (this.random <= 0.75){
                    this.frameX = 590
                    this.frameY = 250
                    this.frameW = 30
                    this.frameH = 30
                }else {
                    this.frameX = 560
                    this.frameY = 260
                    this.frameW = 20
                    this.frameH = 20
                }
            }
        }
    }
    draw(speed){
        this.y -= speed
        ctx.drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
        //ctx.fillStyle = 'darkgreen'
        //ctx.fillRect(this.x, this.y, 50, 50);
    }
}
export {Blood};
