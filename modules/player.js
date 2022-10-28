import {c, ctx} from "./canvas.js";

//Player.js
let leftPressed = ''
let rightPressed = ''
let canvasPosition = canvas.getBoundingClientRect()

/* CONTROL */
window.addEventListener("keydown", function(event) {
    switch(event.key){
        case "ArrowLeft":
            leftPressed = true
            break
        case "ArrowRight":
            rightPressed = true
            break
    }
});

window.addEventListener("keyup", function(event) {
    switch(event.key){
        case "ArrowLeft":
            leftPressed = false
            break
        case "ArrowRight":
            rightPressed = false
            break
    }
});
/*                                                      */


class Player {
    constructor(){
        this.count = 0
        this.width = 5 * 10
        this.height = 13 *10
        this.y = 500 - this.height
        this.x = 500 - this.width/2
        this.dy = ""
        this.dx = ""
        this.spriteSheet = new Image()
        this.spriteSheet.src = "../pixil-frame-0.png"
        this.frameX = 260
        this.frameY = 320
        this.animationSpeed = 10
    }
    update(){
        this.dx = 0

        if (rightPressed){
            this.dx = 10
        }
        if (leftPressed){
            this.dx = -10
        }
        if (this.x + this.dx <= 950 - this.width/2 && this.x + this.dx >= 50 ){
            this.x = this.x + this.dx
        }
    }

    draw(){
        ctx.fillStyle = "black";
        ctx.drawImage(this.spriteSheet,this.frameX,this.frameY,50,140,this.x, this.y, 50,140);
        if (this.count == this.animationSpeed){
            if (this.frameX == 260){
                this.frameX =  320
            }else {
                this.frameX =  260
            }
            this.count = 0
        }
        this.count ++
    }
}
export {Player};
