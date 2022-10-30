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
import {Bible} from "./modules/protection.js";

var audio = new Audio('./pickupCoin.wav');
var sonMort = new Audio('./explosion.wav');
var music = new Audio('./lefond.mp3');
var fin = new Image()
fin.src = "./fin.png"

var dead = new Image()
dead.src = "./dead.png"

var shader = new Image()
shader.src = "./shader.png"
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
var bibleArray = []
var energyArray = []
var effectCouter = 0
var bibleCounter = 0
var playerPreviousPos = []
var randomEnergy= 270
var randomBible= 220

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
        randomRockSpawn = Math.ceil(25-(Math.random()*100)/10)
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
    if (gameFrame % randomEnergy == 0){
        randomEnergy = 270
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
function handleBible(){
    if (gameFrame % randomBible == 0){
        randomBible = 220
        bibleArray.push(new Bible()) 
    }
    for (let i = 0; i<bibleArray.length; i++){
        bibleArray[i].draw(gameSpeed)
        if (bibleArray[i].y <= -50){
            bibleArray.splice(i,1)
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
    player.draw(bibleCounter!=0)
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
        gameSpeed =baseSpeed/2
    }
    
    var energyCollision = false

    if (effectCouter != 0){
        effectCouter ++
        if (effectCouter <=15){
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

    if (bibleCounter != 0){
        bibleCounter ++
        if (bibleCounter >=60){
            bibleCounter = 0
        }
    }

    for (let i = 0; i<bibleArray.length; i++){
        if (player.x > bibleArray[i].x + bibleArray[i].frameW ||
            player.x + player.width < bibleArray[i].x ||
            player.y > bibleArray[i].y + bibleArray[i].frameH ||
            player.y + player.height < bibleArray[i].y){
        }else {
            bibleArray.splice(i--,1)
            audio.play();
            bibleCounter ++
        }
    }
}

function handleVampire(){
    vampire.update(playerPreviousPos[0],gameSpeed,baseSpeed,bibleCounter!=0)
    vampire.draw(baseSpeed)
}
//animation loop

function handleScore(){
    score.draw(scoreNumber.toString())
}

menuShow(scoreNumber)

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
            c.getContext('2d').drawImage(shader, 0, 0, 1000, 1010);
            handleEnergy()
            handleBible()
            handlePlayer()
            handleVampire()
            handleScore()
            // add gameframe
            gameFrame ++
            if (gameFrame % 100 == 0 && baseSpeed < 25){
                baseSpeed = baseSpeed + 1
            }
            scoreNumber = Math.ceil(gameFrame/10)
            // end condition
            if (player.x > vampire.x + vampire.width ||
                player.x + player.width < vampire.x ||
                player.y > vampire.y + vampire.height ||
                player.y + player.height < vampire.y){
                    if (scoreNumber>300){
                        isPlaying =false
                        clearInterval(gameloop);
                        c.getContext('2d').drawImage(fin, 0, 0, 1000, 1010);
                        setTimeout(function(){
                            menuShow(scoreNumber)
                            scoreNumber = 0
                        },5000) 
                        music.pause();
                        music.currentTime = 0;
                        gameSpeed = 10
                        baseSpeed = 10
                        player = new Player
                        vampire = new Vampire
                        background = new Background(0)
                        background1 = new Background(1000)
                        score = new Score()
                        bloodArray = []
                        rockArray = []
                        energyArray = []
                        bibleCounter = 0
                        bibleArray = []
                        effectCouter = 0
                        playerPreviousPos = []
                        gameFrame = 0
                        randomEnergy= 270
                        randomBible= 220
                    }
            }else {
                isPlaying =false
                sonMort.play()
                clearInterval(gameloop);
                c.getContext('2d').drawImage(dead, 0, 0, 1000, 1010);
                setTimeout(function(){
                    menuShow(scoreNumber)
                    scoreNumber = 0
                },5000) 
                gameSpeed = 10
                baseSpeed = 10
                player = new Player
                vampire = new Vampire
                background = new Background(0)
                background1 = new Background(1000)
                score = new Score()
                bloodArray = []
                rockArray = []
                energyArray = []
                bibleCounter = 0
                bibleArray = []
                effectCouter = 0
                playerPreviousPos = []
                gameFrame = 0
                randomEnergy= 270
                randomBible= 220
            }
        },32) 
    }
});
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

// GAMELOOP







