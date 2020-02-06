let locationSnake = [55];
let directionSnake = 'up';
let sizeSnake = 3;
const sizeField = 10;
let locationApple;
let appleIsExist = false;
let counterCreateApple = 0
const speed = 300;
let queueEatApple = [];

function buildGameField(id) {
    document.getElementById('clickMe').style.display = 'none';
    let gameField = document.getElementsByClassName(id)[0];

    for (let i = 0; i < sizeField; i++) {
        let columnCells = document.createElement("div");
        columnCells.setAttribute('class', 'columnCells');

        for (let j = 0; j < sizeField; j++) {
            let cell = document.createElement("div");
            cell.setAttribute('cellnumber', i * sizeField + j + 1);
            cell.setAttribute('class', 'cell');
            columnCells.appendChild(cell);
        }

        gameField.appendChild(columnCells);
    }
}

function runSnakeDown() {
    const lastStepSnake = locationSnake[locationSnake.length - 1];
    const borderDown = Math.ceil(lastStepSnake / sizeField) * sizeField;

    return lastStepSnake + 1 > borderDown ? lastStepSnake - sizeField + 1 : lastStepSnake + 1
}

function runSnakeUp() {
    const lastStepSnake = locationSnake[locationSnake.length - 1];
    const borderUp = Math.floor((lastStepSnake - 1) / sizeField) * sizeField + 1;

    return lastStepSnake - 1 < borderUp ? lastStepSnake + sizeField - 1 : lastStepSnake - 1;
}

function runSnakeLeft() {
    const lastStepSnake = locationSnake[locationSnake.length - 1];
    const borderLeft = lastStepSnake % sizeField || sizeField;
    
    return lastStepSnake - sizeField < borderLeft ? (sizeField - 1) * 10 + borderLeft : lastStepSnake - sizeField;
}

function runSnakeRight() {
    const lastStepSnake = locationSnake[locationSnake.length - 1];
    const borderRight = (lastStepSnake % sizeField || sizeField) + (sizeField - 1) * 10;

    return lastStepSnake + sizeField > borderRight ? (lastStepSnake % sizeField || sizeField) : lastStepSnake + sizeField;
}

function calculateLocationApple() {
    do {
        locationApple = Math.floor(Math.random() * (sizeField * sizeField - 1)) + 1;
    } while(locationSnake.includes(locationApple))
}

function createApple() {

    if(counterCreateApple === Math.ceil(speed * 3 / 100)) {
        changeColorCell(locationApple, 'transparent');
        counterCreateApple = 0;
    }

    calculateLocationApple();
    changeColorCell(locationApple, 'red');

    appleIsExist = true;
}


function changeColorCell(location, color) {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const cell = cells.find(cell => cell.getAttribute('cellnumber') == location);

    cell.style.backgroundColor = color;
}

function calculateLocationStep() {
    switch(directionSnake) {
        case 'up':
            return runSnakeUp();
        case 'down':
            return runSnakeDown();
        case 'right':
            return runSnakeRight();
        case 'left':
            return runSnakeLeft();
        default:
            break;
    }
}

function checkAppleEaten(cell) {
    return locationSnake[locationSnake.length - 1] === locationApple;
} 

function checkIsFinishGame(cell) {
    return locationSnake.includes(cell);
}

function deleteLastStep(step) {
    changeColorCell(locationSnake[0], 'transparent');
    locationSnake = locationSnake.filter((location, index) => index !== 0);
}

function increaseSnake() {
    changeColorCell(queueEatApple[0].step, 'green');

    locationSnake = [queueEatApple[0].step, ...locationSnake];

    queueEatApple = queueEatApple.filter((location, index) => index !== 0);
}

function moveSnake() {
    const cell = calculateLocationStep();
    
    if(checkIsFinishGame(cell)) {
        alert(`Конец игры!!! Ваш счет ${locationSnake.length}`);
        location.reload(false);
    }

    locationSnake.push(cell);
    
    if(locationSnake.length > sizeSnake) {
        deleteLastStep();
    }

    if(queueEatApple.length) {

        queueEatApple.forEach(cell => {
            cell.counter--;
        })

        if(!queueEatApple[0].counter) {
            increaseSnake();
        }
    }

    changeColorCell(cell, 'green');
    
    if(checkAppleEaten(cell)) {
        appleIsExist = false;
        counterCreateApple = 0;
        queueEatApple.push({step: cell, counter: locationSnake.length});
    }

}

function runSnake() {

    canTakeStep = true;
    
    if(!appleIsExist || counterCreateApple === Math.ceil(speed * 3 / 100)) {
        createApple();
    }

    moveSnake();

    counterCreateApple++;

    return setTimeout(runSnake, speed);
}

let canTakeStep = true;

function beginGame() {

    document.addEventListener('keydown', function(event) {
        if(canTakeStep) {
            canTakeStep = false;
            switch (event.code) {
                case "ArrowDown":
                    directionSnake = directionSnake !== 'up' ? 'down' : 'up';
                    break;
                case "ArrowUp":
                    directionSnake = directionSnake !== 'down' ? 'up' : 'down';
                    break;
                case "ArrowRight":
                    directionSnake = directionSnake !== 'left' ? 'right' : 'left';
                    break;
                case "ArrowLeft":
                    directionSnake = directionSnake !== 'right' ? 'left' : 'right';
                    break;
                default:
                    break;
            }
        }
      });

      runSnake();

      locationSnake.shift();
}