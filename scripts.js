//scripts.js
//Main script for the page



let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Background} from "./modules/background.js";
import {Blood} from "./modules/blood.js";
import {Rock} from "./modules/rock.js";
import {Player} from "./modules/player.js";



// def var

let gameFrame = 1

let player = new Player
let background = new Background(0)
let background1 = new Background(1000)
var bloodArray = []
var rockArray = []


// handle
var randomBloodSpawn = Math.ceil(Math.random()*100/4)

function handleBlood(){
    if (gameFrame % randomBloodSpawn == 0){
        randomBloodSpawn = Math.ceil(Math.random()*100/4)
        bloodArray.push( new Blood(player.x)) 
    }
    for (let i = 0; i<bloodArray.length; i++){
        if (bloodArray[i].y>= -50){
            bloodArray[i].draw()
        }else {
            bloodArray.splice(i,1)
        }
    }
}


var randomRockSpawn = Math.ceil(Math.random()*100)

function handleRock(){
    if (gameFrame % randomRockSpawn == 0){
        randomRockSpawn = Math.ceil(Math.random()*100)
        rockArray.push( new Rock()) 
    }
    for (let i = 0; i<rockArray.length; i++){
        if (rockArray[i].y>= -50){
            rockArray[i].draw()
        }else {
            rockArray.splice(i,1)
        }
    }
}

//animation loop

let gameloop = setInterval(function(){
    //clear 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // handle and draw all elements
    background.draw()
    background1.draw()
    handleBlood()
    player.update()
    player.draw()
    handleRock()

    // add gameframe
    gameFrame ++

    // end condition
    //clearInterval(gameloop);
},32) 




