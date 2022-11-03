//scripts.js
//Main script for the page

import { menuShow } from "./modules/menu.js";

let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Background} from "./modules/background.js";
import {Pickaxe} from "./modules/pickaxe.js";
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
var pickaxeArray = []
var pickaxeCounter = 0
var randomPickaxe= 10
var energyArray = []
var effectCouter = 0
var bibleCounter = 430
var playerPreviousPos = []
var randomEnergy= 270
var randomBible= 220
var fivePreviousSpawnX = []
var randomSpawnX = ""
var backgroundFrame = 0

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
        randomSpawnX = Math.random()*1000
        fivePreviousSpawnX.push(randomSpawnX)
        if(fivePreviousSpawnX.length==2){
            fivePreviousSpawnX.shift()
        }
        for (let i = 0; i < fivePreviousSpawnX.length;i++){
            if (randomSpawnX < fivePreviousSpawnX[i]-50 || randomSpawnX > fivePreviousSpawnX[i]+50){
                randomSpawnX = Math.random()*1000
            }
        }
        
        rockArray.push(new Rock(randomSpawnX)) 
    }
    for (let i = 0; i<rockArray.length; i++){
        rockArray[i].draw(gameSpeed,pickaxeCounter!=0,player.x)
        if (rockArray[i].y <= -50){
            rockArray.splice(i,1)
            i --
        }
    }
}

function handleEnergy(){
    if (gameFrame % randomEnergy == 0){
        randomEnergy = 270
        randomSpawnX = Math.random()*1000
        fivePreviousSpawnX.push(randomSpawnX)
        if(fivePreviousSpawnX.length==2){
            fivePreviousSpawnX.shift()
        }
        for (let i = 0; i < fivePreviousSpawnX.length;i++){
            if (randomSpawnX < fivePreviousSpawnX[i]-50 || randomSpawnX > fivePreviousSpawnX[i]+50){
                randomSpawnX = Math.random()*1000
            }
        }
        
        energyArray.push(new Energy(randomSpawnX)) 
    }
    for (let i = 0; i<energyArray.length; i++){
        energyArray[i].draw(gameSpeed,gameFrame)
        if (energyArray[i].y <= -50){
            energyArray.splice(i,1)
            i --
        }
    }
}

function handleBible(){
    if (gameFrame % randomBible == 0){
        randomBible = 220
        randomSpawnX = Math.random()*1000
        fivePreviousSpawnX.push(randomSpawnX)
        if(fivePreviousSpawnX.length==2){
            fivePreviousSpawnX.shift()
        }
        for (let i = 0; i < fivePreviousSpawnX.length;i++){
            if (randomSpawnX < fivePreviousSpawnX[i]-50 || randomSpawnX > fivePreviousSpawnX[i]+50){
                randomSpawnX = Math.random()*1000
            }
        }
        
        bibleArray.push(new Bible(randomSpawnX)) 
    }
    for (let i = 0; i<bibleArray.length; i++){
        bibleArray[i].draw(gameSpeed,gameFrame)
        if (bibleArray[i].y <= -50){
            bibleArray.splice(i,1)
            i --
        }
    }
}

function handlePickaxe(){
    if (gameFrame % randomPickaxe == 0){
        randomPickaxe = 430
        randomSpawnX = Math.random()*1000
        fivePreviousSpawnX.push(randomSpawnX)
        if(fivePreviousSpawnX.length==2){
            fivePreviousSpawnX.shift()
        }
        for (let i = 0; i < fivePreviousSpawnX.length;i++){
            if (randomSpawnX < fivePreviousSpawnX[i]-50 || randomSpawnX > fivePreviousSpawnX[i]+50){
                randomSpawnX = Math.random()*1000
            }
        }
        
        pickaxeArray.push(new Pickaxe(randomSpawnX)) 
    }
    for (let i = 0; i<pickaxeArray.length; i++){
        pickaxeArray[i].draw(gameSpeed,gameFrame)
        if (pickaxeArray[i].y <= -50){
            pickaxeArray.splice(i,1)
            i --
        }
    }
}

function handleBackground(){
    background.draw(gameSpeed,background1.x,backgroundFrame)
    background1.draw(gameSpeed,background.x,backgroundFrame)
}

function handlePlayer(){
        if (playerPreviousPos.length <= 5){
            playerPreviousPos.push(player.x)
        }else {
            playerPreviousPos.splice(0,1)
            playerPreviousPos.push(player.x)
        }
    player.update()
    player.draw(bibleCounter!=0,effectCouter!=0,pickaxeCounter!=0,gameFrame%5==0,)
    var rockCollision = false 
    for (let i = 0; i<rockArray.length; i++){
        if (player.x -10> rockArray[i].x + rockArray[i].frameW ||
            player.x + player.width -10< rockArray[i].x ||
            player.y -10> rockArray[i].y + rockArray[i].frameH ||
            player.y + player.height -10< rockArray[i].y){
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
        if (effectCouter <=70){
            energyCollision = true
        }else{
            effectCouter =0
        }
    }

    for (let i = 0; i<energyArray.length; i++){
        if (player.x -10> energyArray[i].x + energyArray[i].frameW ||
            player.x + player.width -10< energyArray[i].x ||
            player.y -10> energyArray[i].y + energyArray[i].frameH ||
            player.y + player.height -10< energyArray[i].y){
        }else {
            energyCollision = true
            energyArray.splice(i--,1)
            audio.play();
            effectCouter ++
        }
    }
    if (energyCollision && !rockCollision){
            gameSpeed = baseSpeed*1.8
    }

    if (!energyCollision && !rockCollision){
        gameSpeed = baseSpeed
    }
    bibleCounter = counter(bibleCounter,60)

    for (let i = 0; i<bibleArray.length; i++){
        if (player.x -10> bibleArray[i].x + bibleArray[i].frameW ||
            player.x + player.width -10< bibleArray[i].x ||
            player.y -10> bibleArray[i].y + bibleArray[i].frameH ||
            player.y + player.height -10< bibleArray[i].y){
        }else {
            bibleArray.splice(i--,1)
            audio.play();
            bibleCounter ++
        }
    }
    pickaxeCounter = counter(pickaxeCounter,150)

    for (let i = 0; i<pickaxeArray.length; i++){
        if (player.x -10> pickaxeArray[i].x + pickaxeArray[i].frameW ||
            player.x + player.width -10< pickaxeArray[i].x ||
            player.y -10> pickaxeArray[i].y + pickaxeArray[i].frameH ||
            player.y + player.height -10< pickaxeArray[i].y){
        }else {
            pickaxeArray.splice(i--,1)
            audio.play();
            pickaxeCounter ++
        }
    }
}

function handleVampire(){
    vampire.update(playerPreviousPos[0],gameSpeed,baseSpeed,bibleCounter!=0)
    vampire.draw(baseSpeed)
}

function handleScore(){
    score.draw(scoreNumber.toString())
}

function counter(counterVariable,maxCounter){
    if (counterVariable != 0){
        counterVariable ++
        if (counterVariable >= maxCounter){
            counterVariable = 0
        }
    }
    return counterVariable
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
            handlePickaxe()
            handlePlayer()
            handleVampire()
            handleScore()
            // add gameframe
            gameFrame ++
            backgroundFrame --
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
                        reset()
                    }
            }else {
                isPlaying =false
                sonMort.play()
                clearInterval(gameloop);
                c.getContext('2d').drawImage(dead, 0, 0, 1000, 1010);
                setTimeout(function(){
                    menuShow(scoreNumber)
                    scoreNumber = 0
                },2500) 
                reset()
            }
        },32) 
    }
});
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function reset(){
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
    pickaxeArray = []
    pickaxeCounter = 0
    randomPickaxe= 430
}







