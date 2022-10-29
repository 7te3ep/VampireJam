import {c, ctx} from "./canvas.js";

//Vampire.js

let canvasPosition = canvas.getBoundingClientRect()

class Vampire {
    constructor(){
        this.count = 0
        this.width = 270
        this.height = 80
        this.y = 50
        this.x = 500 - this.width/2
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 280
        this.frameY = 170
        this.animationSpeed = 10
    }
    update(x,speed,baseSpeed,protection){
        this.x = x
        this.y += 1
        if (this.y >= -20 || baseSpeed >= speed && protection == false){
        this.y += Math.ceil((baseSpeed - speed)/1.5)
        }
        if (protection && this.y >= 50){
            this.y -= 30
        }
    }

    draw(){
        ctx.fillStyle = "black"; 
        if (this.count == this.animationSpeed){
            if (this.frameX == 280){
                this.frameX =  300
                this.frameY =  30
                this.width = 230
                this.height = 80
            }else {
                this.frameX =  280
                this.frameY = 170
                this.width = 270
                this.height = 80
            }
            this.count = 0
        }
        if (this.frameX == 280) {
            c.getContext('2d').drawImage(this.spriteSheet,20,170,210,80,this.x-50, this.y+80, 210,80);
        }else {
            c.getContext('2d').drawImage(this.spriteSheet,10,80,250,70,this.x-50, this.y+80, 250,70);
        }
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.width,this.height,this.x-this.width/2.3, this.y, this.width,this.height);

        this.count ++
    }
}
export {Vampire};
