import { drawFood, drawSnake } from './view.js'
import { moveSnake } from './control.js'

let speed = 100
let snakeBody = [{ x: 10, y: 10 }]
let gameBox = document.getElementById('box')
let snakeLength = 3
let foodSpot = { x: 0, y: 0 }
initGame()


function initGame() {
  let snakeHead = snakeBody[snakeBody.length - 1];
  if (snakeDeath(snakeHead, snakeBody)) {
    alert('Game over')
  }
  else {
    moveSnake(snakeBody, snakeLength)
    gameBox.innerHTML = ''
    drawSnake(snakeBody, gameBox)
    foodSpot = drawFood(snakeBody, gameBox, foodSpot)
    eatFood(snakeHead)
    setTimeout(initGame, speed)
  }
}



function eatFood(snakeHead) {
  if (snakeHead.x == foodSpot.x && snakeHead.y == foodSpot.y) {
    snakeLength += 1;
    foodSpot = { x: 0, y: 0 };
    speed = speed - speed / 4;
  }
}

function snakeDeath(snakeHead, snakeBody) {
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

  return false
}

