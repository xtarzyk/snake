import {getRandomPosition} from './util.js'


let direction = {x: 0, y: 0};
let lastDirection = {x: 5, y: 5};


function getDirection() {
    window.addEventListener('keydown', press => {
        switch (press.key) {
            case 'ArrowUp':
                if (lastDirection.y !== 0) {
                    break
                } else {
                    direction = {x: 0, y: -1}
                    break
                }
            case 'ArrowDown':
                if (lastDirection.y !== 0) {
                    break
                } else {
                    direction = {x: 0, y: 1}
                    break
                }
            case 'ArrowLeft':
                if (lastDirection.x !== 0) {
                    break
                } else {
                    direction = {x: -1, y: 0}
                    break
                }
            case 'ArrowRight':
                if (lastDirection.x !== 0) {
                    break
                } else {
                    direction = {x: 1, y: 0}
                    break
                }
        }
    })

    lastDirection = direction
}


export function moveSnake(snakeBody, snakeLength) {
    getDirection()
    if (snakeBody.length > snakeLength) {
        snakeBody.shift();
    } else {
        let newSnakePart = {
            x: snakeBody[snakeBody.length - 1].x + direction.x, y: snakeBody[snakeBody.length - 1].y
                + direction.y
        }
        snakeBody.push(newSnakePart)
        return snakeBody
    }
}


export function snakeDeath(snakeHead, snakeBody, bombSpot) {
    if (deathByBombs(snakeHead, snakeBody, bombSpot) || deathByEdges(snakeHead, snakeBody, bombSpot) ||
        deathByUroboros(snakeHead, snakeBody, bombSpot)) {
        return true
    } else {
        return false
    }
}

function deathByUroboros(snakeHead, snakeBody) {
    if (snakeBody.length > 4) {
        let headlessSnake = snakeBody.slice(0, snakeBody.length - 1);
        for (let part of headlessSnake) {
            if (part.x === snakeHead.x && part.y === snakeHead.y) {
                return true
            }
        }
    }
}

function deathByEdges(snakeHead, snakeBody) {
    if (snakeHead.x < 1 || snakeHead.x > 25 || snakeHead.y < 1 || snakeHead.y > 25) {
        return true
    }
}

function deathByBombs(snakeHead, snakeBody, bombSpot) {
    for (let bomb of bombSpot) {
        if (snakeHead.x === bomb.x && snakeHead.y === bomb.y) {
            return true
        }
    }
}

export function getElementPosition(elementSpots, bannedSpots) {
    elementSpots.forEach(function (spot, index) {
            if (spot.x == 0 && spot.y == 0) {
                elementSpots[index] = getRandomPosition()
                for (let bannedSpot of bannedSpots) {
                    if (spot.x == bannedSpot.x && spot.y == bannedSpot.y) {
                        elementSpots[index] = getRandomPosition();
                    }
                }
            }
        }
    )


    return elementSpots
}


function banThese(spots, bannedSpots) {
    for (let spot of spots) {
        bannedSpots.push(spot)
    }
    return bannedSpots
}


export function getBannedSpots(bannedSpots, snakeBody, foodSpot, bombSpot) {
    bannedSpots = []
    banThese(snakeBody, bannedSpots)
    banThese(foodSpot, bannedSpots)
    banThese(bombSpot, bannedSpots)
    return bannedSpots
}





