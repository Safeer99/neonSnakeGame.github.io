const moveSound = new Audio('move.mp3');
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const musicSound = new Audio('music.mp3');

let inputDir = {x:0, y:0};
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [{x:13 , y:16}];
let food = {x:9 , y:6};
let score = 0;
let a = 0, b = 0;

//Game Functions
function main(cTime){
    window.requestAnimationFrame(main);
    if((cTime - lastPaintTime)/1000  < 1/speed){
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function collide(snakeArr){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        } 
    }
    if(snakeArr[0].x > 20 || snakeArr[0].x <= 0 || snakeArr[0].y > 20 || snakeArr[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //snake collide
    if(collide(snakeArr)){
        b++;
        if(b===1){
            gameoverSound.play();
        }
        musicSound.pause();
        inputDir = {x:0 , y:0};
        let over = document.querySelector('.gOver');
        over.style.visibility = "visible";
    }

    //food eating
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        let scoreInc = document.querySelector('.score');
        scoreInc.innerHTML = score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 19;
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
    }

    //moving snake
    for (let i = snakeArr.length-2 ; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //snake displaying
    let gameArea = document.querySelector('.gameArea'); 
    gameArea.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        gameArea.appendChild(snakeElement);
    })
    //food displaying
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);

    a++;
    if(a === 1){
        let container = document.querySelector('.container');
        gameover = document.createElement('h2');
        gameover.innerHTML = "GAME OVER";
        gameover.classList.add('gOver');
        container.appendChild(gameover);
    }
}

//start
window.requestAnimationFrame(main);

const upBtn = document.querySelector('.upBtn');
const downBtn = document.querySelector('.downBtn');
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const start = document.querySelector('.startBtn');

start.addEventListener('click', () => {
    //start game
    b = 0;
    musicSound.play();
    let over = document.querySelector('.gOver');
    over.style.visibility = "hidden";
    let scoreInc = document.querySelector('.score');
    score = 0;
    scoreInc.innerHTML = score;
    snakeArr = [{x:13 , y:16}];
    inputDir = {x:0, y:-1};
    upBtn.addEventListener('click', () => {
        moveSound.play();
        if(inputDir.x === 0 && inputDir.y === 1)
            return;
        inputDir.x = 0;
        inputDir.y = -1;
    })
    downBtn.addEventListener('click', () => {
        moveSound.play();
        if(inputDir.x === 0 && inputDir.y === -1)
            return;
        inputDir.x = 0;
        inputDir.y = 1;
    })
    leftBtn.addEventListener('click', () => {
        moveSound.play();
        if(inputDir.x === 1 && inputDir.y === 0)
            return;
        inputDir.x = -1;
        inputDir.y = 0;
    })
    rightBtn.addEventListener('click', () => {
        moveSound.play();
        if(inputDir.x === -1 && inputDir.y === 0)
            return;
        inputDir.x = 1;
        inputDir.y = 0;
    })
    window.addEventListener('keydown' , e => {
        moveSound.play();
        switch(e.key){
            case "ArrowUp":
                if(inputDir.x === 0 && inputDir.y === 1)
                    return;
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                if(inputDir.x === 0 && inputDir.y === -1)
                    return;
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                if(inputDir.x === 1 && inputDir.y === 0)
                    return;
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                if(inputDir.x === -1 && inputDir.y === 0)
                    return;
                inputDir.x = 1;
                inputDir.y = 0;
                break;

            default:
                break;
        }
    })
})