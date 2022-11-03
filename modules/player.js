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


class Player {
    constructor(){
        this.count = 0
        this.width = 50
        this.height = 130 
        this.y = 600 - this.height
        this.x = 500 - this.width/2
        this.dy = ""
        this.dx = ""
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 260
        this.frameY = 320
        this.shadowX = 760
        this.shadowY = 220
        this.animationSpeed = 10
        this.particulArray = []
    }
    update(){
        this.dx = 0

        if (rightPressed){
            this.dx =30
        }
        if (leftPressed){
            this.dx = -30
        }
        if (this.x + this.dx <= 950 - this.width/2 && this.x + this.dx >= 50 ){
            this.x = this.x + this.dx
        }

        
    }

    draw(bible,pots,pickaxe,canSpawn){
        if (pots ||bible || pickaxe){
            if (canSpawn){
                this.particulArray.push({x:this.x+((50-Math.random()*100)+this.width/2),y:this.y,yellow:bible,violet:pickaxe,green:pots,dx:2-(Math.random()*100)/20})
            }
        }
        if (this.particulArray.length != 0){
            var randomDepop = 250- Math.random()*100/2
            for (let i = 0; i<this.particulArray.length;i++){
                this.particulArray[i].y -= 8
                this.particulArray[i].x += this.particulArray[i].dx
                if (this.particulArray[i].green){
                    c.getContext('2d').drawImage(this.spriteSheet,820,710,30,30,this.particulArray[i].x,this.particulArray[i].y, 30,30);
                }else if (this.particulArray[i].violet) {
                    c.getContext('2d').drawImage(this.spriteSheet,820,750,30,30,this.particulArray[i].x,this.particulArray[i].y, 30,30);
                }else if (this.particulArray[i].yellow) {
                    c.getContext('2d').drawImage(this.spriteSheet,860,750,30,30,this.particulArray[i].x,this.particulArray[i].y, 30,30);
                }
                if (this.particulArray[i].y <randomDepop){
                    this.particulArray.splice(i,1)
                    i -= 1
                }
            }
        }
        //shadow
        c.getContext('2d').drawImage(this.spriteSheet,this.shadowX,this.shadowY,80,100,this.x+30, this.y, 80,100);
        if (bible){
            if (this.frameX == 260){
                c.getContext('2d').drawImage(this.spriteSheet,590,20,190,180,this.x-70, this.y-30, 190,180);
            }else {
                c.getContext('2d').drawImage(this.spriteSheet,820,30,170,170,this.x-60, this.y-20, 170,170);
            }
        }
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,50,140,this.x, this.y, 50,140);
        if (this.count == this.animationSpeed){
            if (this.frameX == 260){
                this.frameX =  320
                this.shadowX = 760
                this.shadowY = 220
            }else {
                this.frameX =  260
                this.shadowX = 870
                this.shadowY = 560
            }
            this.count = 0
        }
        this.count ++
    }
}
export {Player};
