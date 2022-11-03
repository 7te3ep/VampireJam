import {c, ctx} from "./canvas.js";

//Environment.js
class Rock {
    constructor(x){
        this.x = x
        this.y = 1000;
        this.iDie = false
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.random = Math.random()
        if (this.random <= 0.165){
            // rock pilar
            this.frameX = 30
            this.frameY = 370
            this.frameW = 80
            this.frameH = 80
        }else {
            if (this.random <= 0.330){
                // longer rock
                this.frameX = 120
                this.frameY = 260
                this.frameW = 120
                this.frameH = 70
            }else {
                if (this.random <= 0.495){
                    // log first
                    this.frameX = 850
                    this.frameY = 260
                    this.frameW = 140
                    this.frameH = 100
                }
                else {
                    if (this.random <= 0.660){
                        // new buisson
                        this.frameX = 470
                        this.frameY = 390
                        this.frameW = 120
                        this.frameH = 60
                    }else {
                        if (this.random <= 0.825){
                            // second log
                            this.frameX = 850
                            this.frameY = 420
                            this.frameW = 130
                            this.frameH = 90
                        }else{
                        // buisson 1
                            this.frameX = 660
                            this.frameY = 370
                            this.frameW = 110
                            this.frameH = 90
                        }

                    }
                }
            }
        }
        if (this.x <= this.frameW){
            this.x += Math.ceil(this.frameW/2.5)
        }
        if (this.x >= 1000-this.frameW){
            this.x -= this.frameW
        }
    }
    draw(speed,pickaxe,playerPos,gameFrame){
        if (pickaxe && this.y < 800){
            if (this.x < playerPos){
                this.x -= 30
            }else {
                this.x += 30
            }
        }
        this.y -= speed
        c.getContext('2d').drawImage(this.spriteSheet,420,280,80,80,this.x+ this.frameW/2, this.y-10, 80,80);
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
    }
}
export {Rock};
