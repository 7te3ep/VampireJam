//scripts.js
//Main script for the page

import { menuShow } from "./modules/menu.js";

let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Background} from "./modules/background.js";
import {Energy} from "./modules/energy.js";
import {Blood} from "./modules/blood.js";
import {Rock} from "./modules/rock.js";
import {Player} from "./modules/player.js";
import {Vampire} from "./modules/vampire.js";
import {Score} from "./modules/score.js";

var audio = new Audio('./pickupCoin.wav');
var music = new Audio('./8-bit-space-123218.mp3');

// def var

let isPlaying = false

let gameFrame = 1
var gameSpeed = 10
var baseSpeed = 10
let player = new Player
let vampire = new Vampire
let background = new Background(0)
let background1 = new Background(1000)
let score = new Score()
let scoreNumber = 0
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
        randomRockSpawn = Math.ceil(50-(Math.random()*100)/2)
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


function handleEnergy(){
    if (gameFrame % 100 == 0){
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
        if (playerPreviousPos.length <= 5){
            playerPreviousPos.push(player.x)
        }else {
            playerPreviousPos.splice(0,1)
            playerPreviousPos.push(player.x)
        }
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
        gameSpeed =baseSpeed/3
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
            audio.play();
            effectCouter ++
        }
    }
    if (energyCollision){
        gameSpeed = baseSpeed*2
    }

    if (!energyCollision && !rockCollision){
        gameSpeed = baseSpeed
    }
}

function handleVampire(){
    vampire.update(playerPreviousPos[0],gameSpeed,baseSpeed)
    vampire.draw(baseSpeed)
}
//animation loop

function handleScore(){
    score.draw(scoreNumber.toString())
}

menuShow(false)
window.addEventListener("keydown", function(event) {
    if (event.code == "Space" && !isPlaying){
        music.play();
        isPlaying = true
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
            handleScore()
        
            // add gameframe
            gameFrame ++
            if (gameFrame % 100 == 0 && baseSpeed < 30){
                baseSpeed = baseSpeed + 1
                console.log(baseSpeed)
            }
            scoreNumber = Math.ceil(gameFrame/10)
            // end condition
            if (player.x > vampire.x + vampire.width ||
                player.x + player.width < vampire.x ||
                player.y > vampire.y + vampire.height ||
                player.y + player.height < vampire.y){
            }else {
                isPlaying =false
                clearInterval(gameloop);
                menuShow(scoreNumber)
                gameSpeed = 10
                baseSpeed = 10
                player = new Player
                vampire = new Vampire
                background = new Background(0)
                background1 = new Background(1000)
                score = new Score()
                scoreNumber = 0
                bloodArray = []
                rockArray = []
                energyArray = []
                effectCouter = 0
                playerPreviousPos = []
                gameFrame = 0
            }
        },32) 
    }
});


// GAMELOOP






