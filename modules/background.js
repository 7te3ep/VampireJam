import {c, ctx} from "./canvas.js";

//Environment.js
class Background {
    constructor(y){
        this.x = 0
        this.y = y;
        this.background = new Image()
        this.background.src = ".././background.png"
    }
    draw(){
        if (this.y <= -1000){
            this.y = 1000
        }
        this.y -= 10
        ctx.drawImage(this.background, this.x, this.y, 1000, 1010);
    }
}
export {Background};
