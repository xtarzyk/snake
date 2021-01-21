import {drawFood, drawSnake, drawBomb, drawPoints} from './view.js'
import {moveSnake, snakeDeath} from './control.js'

let speed = 100;
let snakeBody = [{x: 10, y: 10}];
let gameBox = document.getElementById('box');
let snakeLength = 3;
let foodSpot = {x: 0, y: 0};
let bombSpot = {x: 1, y: 1};
let foodCounter = 0;
initGame()


function initGame() {
    let snakeHead = snakeBody[snakeBody.length - 1];
    if (snakeDeath(snakeHead, snakeBody, bombSpot)) {
        gameOver()
    } else {
        gameBox.innerHTML = '';
        moveSnake(snakeBody, snakeLength);
        drawPoints(foodCounter)
        drawSnake(snakeBody, gameBox);
        foodSpot = drawFood(snakeBody, gameBox, foodSpot);
        bombSpot = drawBomb(snakeBody, gameBox, foodSpot, bombSpot);
        eatFood(snakeHead);
        setTimeout(initGame, speed);
    }
}


function eatFood(snakeHead) {
    if (snakeHead.x === foodSpot.x && snakeHead.y === foodSpot.y) {
        snakeLength += 1;
        foodSpot = {x: 0, y: 0};
        speed = speed - speed / 6;
        foodCounter++
        return foodCounter
    }

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