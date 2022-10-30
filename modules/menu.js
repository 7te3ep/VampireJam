import {Score} from "./score.js";
import {c, ctx} from "./canvas.js";
let score = new Score
let spriteSheet = new Image()
spriteSheet.src = "pixil-frame-0.png"
let background = new Image()
background.src = "image.jpg"
export function menuShow(scoreNumber){
    ctx.clearRect(0, 0, 1000,1000)
    background.onload = function() {
        c.getContext('2d').drawImage(background, 0, 0, 1000, 1010);
        c.getContext('2d').drawImage(spriteSheet,500,360,390,300,500-(390/2),450, 390,300);
        c.getContext('2d').drawImage(spriteSheet,10,590,520,210,500-(480/2),100, 520,210);
        c.getContext('2d').drawImage(spriteSheet,330,960,670,30,180,930, 670,30);
        c.getContext('2d').drawImage(spriteSheet,50,820,490,30,260,830, 490,30);
        score.draw(scoreNumber.toString())
    }   
    c.getContext('2d').drawImage(background, 0, 0, 1000, 1010); 
    spriteSheet.onload = function() {
        c.getContext('2d').drawImage(spriteSheet,500,360,390,300,500-(390/2),450, 390,300);
        c.getContext('2d').drawImage(spriteSheet,10,590,520,210,500-(480/2),100, 520,210);
        c.getContext('2d').drawImage(spriteSheet,330,960,670,30,180,930, 670,30);
        c.getContext('2d').drawImage(spriteSheet,50,820,490,30,260,830, 490,30);
        score.draw(scoreNumber.toString())
    }
    c.getContext('2d').drawImage(spriteSheet,500,360,390,300,500-(390/2),450, 390,300);
    c.getContext('2d').drawImage(spriteSheet,10,590,520,210,500-(480/2),100, 520,210);
    c.getContext('2d').drawImage(spriteSheet,330,960,670,30,180,930, 670,30);
    c.getContext('2d').drawImage(spriteSheet,50,820,490,30,260,830, 490,30);
    score.draw(scoreNumber.toString())
}
