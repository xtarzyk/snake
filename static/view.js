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


export function drawElement(elementName, elementSpots, gameBox) {
    for (let elementSpot of elementSpots) {
        let newElement = document.createElement('div');
        newElement.style.gridRowStart = elementSpot.y;
        newElement.style.gridColumnStart = elementSpot.x;
        newElement.classList.add(elementName);
        gameBox.appendChild(newElement);
    }
}


export function drawPoints(foodCounter) {
    scorePoints.innerHTML = 'Points: ' + foodCounter;
}

