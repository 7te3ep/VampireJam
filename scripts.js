//scripts.js
//Main script for the page



let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Background} from "./modules/background.js";
import {Energy} from "./modules/energy.js";
import {Blood} from "./modules/blood.js";
import {Rock} from "./modules/rock.js";
import {Player} from "./modules/player.js";
import {Vampire} from "./modules/vampire.js";



// def var

let gameFrame = 1
var gameSpeed = 10
var baseSpeed = 10
let player = new Player
let vampire = new Vampire
let background = new Background(0)
let background1 = new Background(1000)
var bloodArray = []
var rockArray = []
var energyArray = []
var effectCouter = 0
var playerPreviousPos = []

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

var randomEnergySpawn = Math.ceil(Math.random()*100)*6

function handleEnergy(){
    if (gameFrame % randomEnergySpawn == 0){
        randomEnergySpawn = Math.ceil(Math.random()*100)*6
        energyArray.push(new Energy()) 
    }
    for (let i = 0; i<energyArray.length; i++){
        energyArray[i].draw(gameSpeed)
        if (energyArray[i].y <= -50){
            energyArray.splice(i,1)
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
    var rockCollision = false 
    for (let i = 0; i<rockArray.length; i++){
        if (player.x > rockArray[i].x + rockArray[i].frameW ||
            player.x + player.width < rockArray[i].x ||
            player.y > rockArray[i].y + rockArray[i].frameH ||
            player.y + player.height < rockArray[i].y){
        }else {
            rockCollision = true
        }
    }
    if (rockCollision){
        gameSpeed =3
    }
    
    var energyCollision = false

    if (effectCouter != 0){
        effectCouter ++
        if (effectCouter <=20){
            energyCollision = true
        }else{
            effectCouter =0
        }
    }

    for (let i = 0; i<energyArray.length; i++){
        if (player.x > energyArray[i].x + energyArray[i].frameW ||
            player.x + player.width < energyArray[i].x ||
            player.y > energyArray[i].y + energyArray[i].frameH ||
            player.y + player.height < energyArray[i].y){
        }else {
            energyCollision = true
            energyArray.splice(i--,1)
            effectCouter ++
        }
    }
    if (energyCollision){
        gameSpeed =15
    }

    if (!energyCollision && !rockCollision){
        gameSpeed = baseSpeed
    }
}

function handleVampire(){
    vampire.update(player.x,gameSpeed)
    vampire.draw()
}
//animation loop

let gameloop = setInterval(function(){
    //clear 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // handle and draw all elements
    handleBackground()
    handleBlood()
    handleRock()
    handleEnergy()
    handlePlayer()
    handleVampire()
    // add gameframe
    gameFrame ++

    // end condition
    //clearInterval(gameloop);
},32) 




