//scripts.js
//Main script for the page



let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Background} from "./modules/background.js";
import {Blood} from "./modules/blood.js";
import {Rock} from "./modules/rock.js";
import {Player} from "./modules/player.js";
import {Vampire} from "./modules/vampire.js";



// def var

let gameFrame = 1
var gameSpeed = 10
let player = new Player
let vampire = new Vampire
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
    for (let i = 0; i <bloodArray.length; i++){
        bloodArray[i].draw(gameSpeed)
        if (bloodArray[i].y <= -50){
            bloodArray.splice(i,1)
            i --
        }
    }
}


var randomRockSpawn = Math.ceil(Math.random()*100)

function handleRock(){
    if (gameFrame % randomRockSpawn == 0){
        randomRockSpawn = Math.ceil(Math.random()*100)
        rockArray.push(new Rock()) 
    }
    for (let i = 0; i<rockArray.length; i++){
        rockArray[i].draw(gameSpeed)
        if (rockArray[i].y <= -50){
            rockArray.splice(i,1)
            i --
        }
    }
}

function handleBackground(){
    background.draw(gameSpeed)
    background1.draw(gameSpeed)
}

function handlePlayer(){
    player.update()
    player.draw()
}

function handleVampire(){
    vampire.update(player.x)
    vampire.draw()
    console.log(vampire.x,vampire.y)
}
//animation loop

let gameloop = setInterval(function(){
    //clear 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // handle and draw all elements
    handleBackground()
    handleBlood()
    handlePlayer()
    handleRock()
    handleVampire()
    // add gameframe
    gameFrame ++

    // end condition
    //clearInterval(gameloop);
},32) 




