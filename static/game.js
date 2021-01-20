import { drawFood, drawSnake, drawBomb } from './view.js'
import { moveSnake } from './control.js'

let speed = 100
let snakeBody = [{ x: 10, y: 10 }]
let gameBox = document.getElementById('box')
let scorepoints = document.getElementById('points')
let snakeLength = 3
let foodSpot = { x: 0, y: 0 }
let bombSpot = { x: 1, y: 1 }
let foodcounter = 0
initGame()


function initGame() {
  let snakeHead = snakeBody[snakeBody.length - 1];
  let choose;
  if (snakeDeath(snakeHead, snakeBody, bombSpot)) {
    if (confirm('Game over' +" Your score is: "+ foodcounter +" points\nPlay again?")) {
      window.location.reload(true);
    }
  }
  else {
    moveSnake(snakeBody, snakeLength)
    gameBox.innerHTML = ''
    scorepoints.innerHTML = points();
    drawSnake(snakeBody, gameBox)
    foodSpot = drawFood(snakeBody, gameBox, foodSpot)
    bombSpot = drawBomb(snakeBody, gameBox, foodSpot, bombSpot)
    eatFood(snakeHead)
    setTimeout(initGame, speed)
  }
}

function points(){
  console.log(foodcounter)
  return foodcounter
}


function eatFood(snakeHead) {
  if (snakeHead.x == foodSpot.x && snakeHead.y == foodSpot.y) {
    snakeLength += 1;
    foodSpot = { x: 0, y: 0 };
    speed = speed - speed / 10;
    foodcounter++
    // console.log("points", foodcounter)
    return foodcounter
  }

}

function snakeDeath(snakeHead, snakeBody, bombSpot) {
  if (snakeBody.length > 4) {
    let headlessSnake = snakeBody.slice(0, snakeBody.length - 1);
    for (let part of headlessSnake) {
      if (part.x == snakeHead.x && part.y == snakeHead.y) {
        return true
      }
    }
  }
  if (snakeHead.x < 1 || snakeHead.x > 25 || snakeHead.y < 1 || snakeHead.y > 25) {
    return true
  }

  if (snakeHead.x == bombSpot.x && snakeHead.y == bombSpot.y) {
    return true

  }

  return false
}

