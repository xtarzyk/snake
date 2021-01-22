import {drawSnake, drawPoints, drawElement} from './view.js'
import {moveSnake, snakeDeath, getElementPosition, getBannedSpots, slow} from './control.js'


let speed = 100;
let snakeBody = [{x: 10, y: 10}];
let gameBox = document.getElementById('box');
let snakeLength = 3;
let foodSpot = [{x: 0, y: 0}];
let bombSpot = [{x: 0, y: 0}];
let slowSpot = [{x: 0, y: 0}];
let foodCounter = 0;
let bannedSpots = []
initGame()


function initGame() {
    let snakeHead = snakeBody[snakeBody.length - 1];
    if (snakeDeath(snakeHead, snakeBody, bombSpot)) {
        gameOver()
    } else {
        getPositions()
        gameBox.innerHTML = '';
        draw()
        eatFood(snakeHead);
        speed = slow(snakeHead, slowSpot, speed)
        bannedSpots = getBannedSpots(bannedSpots, snakeBody, foodSpot, bombSpot, slowSpot)
        setTimeout(initGame, speed);
    }
}


function getPositions() {
    moveSnake(snakeBody, snakeLength);
    foodSpot = getElementPosition(foodSpot, bannedSpots);
    bombSpot = getElementPosition(bombSpot, bannedSpots);
    slowSpot = getElementPosition(slowSpot, bannedSpots)
}


function draw() {
    drawSnake(snakeBody, gameBox);
    drawElement('food', foodSpot, gameBox)
    drawElement('bomb', bombSpot, gameBox)
    drawElement('slow', slowSpot, gameBox)
    drawPoints(foodCounter)
}


function eatFood(snakeHead) {
    foodSpot.forEach(function (food, index) {
        if (snakeHead.x === food.x && snakeHead.y === food.y) {
            snakeLength += 1;
            foodSpot[index] = {x: 0, y: 0};
            speed = speed - speed / 10;
            foodCounter++
            bombSpot.forEach(function (bomb, index){
                bombSpot[index] = {x: 0, y: 0};
            })
        }
    })
    return foodCounter
}


function gameOver() {
    let nickName = prompt('Your score is ' + foodCounter + '. Enter your nickname:', 'Anonim');
    if (nickName == null || nickName === '') {
        window.location.reload(true);
    } else {
        let msg = document.getElementById('msg');
        let msgTxt = document.getElementById('msg-text');
        msgTxt.innerText = nickName + " you scored " + foodCounter + " points. Do you want to save your result?";
        msg.style.display = 'flex';
        document.cookie = 'nickname =' + nickName;
        document.cookie = 'score =' + foodCounter;
    }
}