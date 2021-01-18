
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
        foodSpot = { x: getRandomIntInclusive(1, 25), y: getRandomIntInclusive(1, 25) };
    }
    else {
        if (!(foodSpot in snakeBody)) {
            let food = document.createElement('div');
            food.style.gridRowStart = foodSpot.y;
            food.style.gridColumnStart = foodSpot.x;
            food.classList.add('food');
            gameBox.appendChild(food);
        }

        else {
            drawFood();
        }
    }
    return foodSpot;
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}