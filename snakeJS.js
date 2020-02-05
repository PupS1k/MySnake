let row = 5, column = 5;
let checkRun = null;
let motionSnake = null;
let firstStepSnake = 2;
let snake = ['f55',];
let checkUnfinishedMovement = true;
let checkOppositeMovement = null;
let checkEatAnApple = true;

const locationSnake = [[5, 5]];
const sizeField = 10;
const locationApple = [];


let masIdField = [];
for (let i = 0; i < 10; i++) {
    masIdField[i] = [];
    for (let j = 0; j < 10; j++) {
        masIdField[i][j] = 0;
    }
}

function buildGameField(id) {
    document.getElementById('clickMe').style.display = 'none';
    let gameField = document.getElementsByClassName(id)[0];

    for (let i = 0; i < sizeField; i++) {
        let rowCells = document.createElement("div");
        rowCells.setAttribute('class', 'rowCells');

        for (let i = 0; i < sizeField; i++) {
            let cell = document.createElement("div");
            cell.setAttribute('cellNumber', i+1);
            cell.setAttribute('class', 'cell');
            rowCells.appendChild(cell);
        }

        gameField.appendChild(rowCells);
    }
}

function arrowMotionProcessing(){
    if (firstStepSnake > 0) {
        firstStepSnake--;
    }
    else {
        if (document.getElementById(masIdField[row][column]).style.backgroundColor === 'red') {
            alert("Конец игры!!!   \n Ваш счет: " + snake.length);
            location.reload(false);
        }
        if (document.getElementById(masIdField[row][column]).style.backgroundColor === 'purple') {
            firstStepSnake++;
            checkEatAnApple = true;
        }
        document.getElementById(snake[0]).style.backgroundColor = 'green';
        snake.shift();
    }
    document.getElementById(masIdField[row][column]).style.backgroundColor = 'red';
    snake.push(masIdField[row][column]);
    checkUnfinishedMovement = true;
}


function moveRight() {
    column === 9 ? column = 0 : column++;
    arrowMotionProcessing();
}

function moveUp() {
    row === 0 ? row = 9 : row--;
    arrowMotionProcessing();
}

function moveLeft() {
    column === 0 ? column = 9 : column--;
    arrowMotionProcessing();
}

function moveDown() {
    row === 9 ? row = 0: row++;
    arrowMotionProcessing();
}
function pushProcessingDU(run) {
    if (checkUnfinishedMovement) {
        if (!checkOppositeMovement || checkOppositeMovement === null) {
            checkOppositeMovement = true;
            checkUnfinishedMovement = false;
            clearInterval(motionSnake);
            checkRun = event.code;
            motionSnake = setInterval(run, 300);
        }
    }
}
function pushProcessingLR(run) {
    if (checkUnfinishedMovement) {
        if (checkOppositeMovement || checkOppositeMovement === null) {
            checkOppositeMovement = false;
            checkUnfinishedMovement = false;
            clearInterval(motionSnake);
            checkRun = event.code;
            motionSnake = setInterval(run, 300);
        }
    }
}


function calculateLocationApple() {
    const row = Math.floor(Math.random() * (sizeField - 1)) + 1;
    const column = Math.floor(Math.random() * (sizeField - 1)) + 1;

    locationApple[0] = row;
    locationApple[1] = column;

    return setTimeout(calculateLocationApple, 5000);
}

function runSnake() {
    document.addEventListener('keydown', function(event) {

        calculateLocationApple();

        switch(event.code) {
            case 'ArrowLeft':
                console.log('left');
                break;
            case 'ArrowUp':
                console.log('up');
                break;
            case 'ArrowRight':
                console.log('right');
                break;
            case 'ArrowDown':
                console.log('down');
                break;
            default:
                break;
        }
      });
    // document.onkeydown = function (event) {
    //     setInterval(checkAppleOnSnake, 100);
    //     if (checkRun !== event.code)
    //         switch (event.code) {
    //             case "ArrowDown":
    //                 pushProcessingDU(moveDown);
    //                 break;
    //             case "ArrowUp":
    //                 pushProcessingDU(moveUp);
    //                 break;
    //             case "ArrowRight":
    //                 pushProcessingLR(moveRight);
    //                 break;
    //             case "ArrowLeft":
    //                 pushProcessingLR(moveLeft);
    //                 break;
    //         }
    // };
}

function checkAppleOnSnake() {
    if (checkEatAnApple) {
        let idApple = null;
        do {

            idApple = appleIdGeneration();
        } while (idApple === null);
        let td = document.getElementById(idApple);
        td.style.backgroundColor = 'purple';
        checkEatAnApple = false;
    }
}

function appleIdGeneration() {
    let appleRow = Math.floor(Math.random() * 10), appleColumn = Math.floor(Math.random() * 10);
    let appleId = masIdField[appleRow][appleColumn];
    snake.forEach(sn => {
        if (appleId === sn) appleId = null;
    });
    return appleId;
}

