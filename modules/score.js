import {c, ctx} from "./canvas.js";

//Environment.js
class Score {
    constructor(){
        this.x = 10
        this.y = 10;
        this.spriteSheet = new Image()
        this.spriteSheet.src = "pixil-frame-0.png"
        this.frameX = 430
        this.frameY = 870
        this.frameW = 190
        this.frameH = 30
    }
    draw(score){
        c.getContext('2d').drawImage(this.spriteSheet,this.frameX,this.frameY,this.frameW,this.frameH,this.x, this.y, this.frameW,this.frameH);
        for (let i = 0; i < score.length;i++){
            switch (score[i]){
                case "1":
                    c.getContext('2d').drawImage(this.spriteSheet,430,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "2":
                    c.getContext('2d').drawImage(this.spriteSheet,470,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "3":
                    c.getContext('2d').drawImage(this.spriteSheet,510,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "4":
                    c.getContext('2d').drawImage(this.spriteSheet,550,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "5":
                    c.getContext('2d').drawImage(this.spriteSheet,590,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "6":
                    c.getContext('2d').drawImage(this.spriteSheet,630,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "7":
                    c.getContext('2d').drawImage(this.spriteSheet,670,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "8":
                    c.getContext('2d').drawImage(this.spriteSheet,710,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "9":
                    c.getContext('2d').drawImage(this.spriteSheet,750,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
                case "0":
                    c.getContext('2d').drawImage(this.spriteSheet,790,910,30,30,this.x+(i*40), this.y+50, 30,30);
                    break
            }
        }
    }
}
export {Score};
