function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomPosition() {
    return {x: getRandomIntInclusive(1, 25), y: getRandomIntInclusive(1, 25)}
}