import {c, ctx} from "./canvas.js";

//Vampire.js

let canvasPosition = canvas.getBoundingClientRect()

class Vampire {
    constructor(){
        this.count = 0
        this.width = 270
        this.height = 80
        this.y = 100
        this.x = 500 - this.width/2
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 280
        this.frameY = 170
        this.animationSpeed = 10
    }
    update(x){
        this.x = x
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
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.width,this.height,this.x-this.width/2.5, this.y, this.width,this.height);

        this.count ++
    }
}
export {Vampire};
