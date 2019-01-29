let row = 5, column = 5;
let checkRun = null;
let motionSnake = null;
let firstStepSnake = 2;
let snake = ['f55',];
let checkUnfinishedMovement = true;
let checkOppositeMovement = null;
let checkEatAnApple = true;

let masIdField = [];
for (let i = 0; i < 10; i++) {
    masIdField[i] = [];
    for (let j = 0; j < 10; j++) {
        masIdField[i][j] = 0;
    }
}

function buildField(id) {
    document.getElementById('clickMe').remove();
    let tbody = document.getElementById(id).getElementsByTagName('TBODY')[0];
    for (let i = 0; i < 10; i++) {
        let row = document.createElement("tr");
        tbody.appendChild(row);
        for (let j = 0; j < 10; j++) {
            masIdField[i][j] =  "f" + (i * 10 + j);
            let field = document.createElement("td");
            field.id = masIdField[i][j];
            row.appendChild(field);
        }
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

function runSnake() {
    document.onkeydown = function (event) {
        setInterval(checkAppleOnSnake, 100);
        if (checkRun !== event.code)
            switch (event.code) {
                case "ArrowDown":
                    pushProcessingDU(moveDown);
                    break;
                case "ArrowUp":
                    pushProcessingDU(moveUp);
                    break;
                case "ArrowRight":
                    pushProcessingLR(moveRight);
                    break;
                case "ArrowLeft":
                    pushProcessingLR(moveLeft);
                    break;
            }
    };
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

