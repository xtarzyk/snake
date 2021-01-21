let scorePoints = document.getElementById('points');


export function drawSnake(snakeBody, gameBox) {
    for (let part of snakeBody) {
        let snakePart = document.createElement('div')
        snakePart.style.gridRowStart = part.y
        snakePart.style.gridColumnStart = part.x
        snakePart.classList.add('snake')
        gameBox.appendChild(snakePart)

    }
}


export function drawFood(snakeBody, gameBox, foodSpot) {
    if (foodSpot.x == 0 && foodSpot.y == 0) {
        foodSpot = getRandomPosition();
    } else {
        if (!(foodSpot in snakeBody)) {
            let food = document.createElement('div');
            food.style.gridRowStart = foodSpot.y;
            food.style.gridColumnStart = foodSpot.x;
            food.classList.add('food');
            gameBox.appendChild(food);
        } else {
            foodSpot = getRandomPosition()
            drawFood();
        }
    }
    return foodSpot;
}


export function drawBomb(snakeBody, gameBox, foodSpot, bombSpot) {
    if (bombSpot.x == 0 && bombSpot.y == 0) {
        bombSpot = getRandomPosition();
    } else {
        if (!(bombSpot in snakeBody || bombSpot in foodSpot)) {
            let bomb = document.createElement('div');
            bomb.style.gridRowStart = bombSpot.y;
            bomb.style.gridColumnStart = bombSpot.x;
            bomb.classList.add('bomb');
            gameBox.appendChild(bomb);
        } else {
            bombSpot = getRandomPosition()
            drawBomb();
        }
    }
    return bombSpot;
}


export function drawPoints(foodCounter) {
    scorePoints.innerHTML = 'Points: ' + foodCounter;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomPosition() {
    return {x: getRandomIntInclusive(1, 25), y: getRandomIntInclusive(1, 25)}
}