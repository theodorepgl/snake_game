document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const gridSize = 20;
    const gridCount = gridSize * gridSize;
    const cells = [];

    let snake = [2, 1, 0];
    let direction = 1;
    let foodIndex = 0;
    let score = 0
    let intervalTime = 500;
    let interval = null;

    function createGameBoard() {
        for (let i = 0; i < gridCount; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
    }

    function drawSnake() {
        snake.forEach((index) => {
            cells[index].classList.add('snake-body');
        });
        cells[snake[0]].classList.add('snake-head');
    }

    function eraseSnake() {
        cells.forEach((cell) => {
            cell.classList.remove('snake-body', 'snake-head');
        });
    }

    function moveSnake() {
        const tail = snake.pop();
        cells[tail].classList.remove('snake-body');
        const head = snake[0];

        switch (direction) {
            case 1:
                if (head % gridSize === gridSize - 1) {
                    snake.unshift(head - gridSize + 1);
                } else {
                    snake.unshift(head + 1);
                }
                break;
            case -1:
                if (head % gridSize === 0) {
                    snake.unshift(head + gridSize - 1);
                } else {
                    snake.unshift(head - 1);
                }
                break;
            case gridSize:
                if (head >= gridCount - gridSize) {
                    snake.unshift(head - gridCount + gridSize);
                } else {
                    snake.unshift(head + gridSize);
                }
                break;
            case -gridSize:
                if (head < gridSize) {
                    snake.unshift(head + gridCount - gridSize);
                } else {
                    snake.unshift(head - gridSize);
                }
                break;
        }

        drawSnake();

        if (snake[0] === foodIndex) {
            cells[foodIndex].classList.remove('food');
            snake.push(tail);
            generateFood();
            increaseSpeed();
            updateScore();
        }

        if (checkCollision()) {
            clearInterval(interval);
            alert('Game Over! Final Score ' + score);
        }
    }

    function generateFood() {
        foodIndex = Math.floor(Math.random() * gridCount);
        cells[foodIndex].classList.add('food');
    }

    function changeDirection(event) {
        const keyPressed = event.keyCode;

        switch (keyPressed) {
            case 37:
                if (direction !== 1) {
                    direction = -1;
                }
                break;
            case 38:
                if (direction !== gridSize) {
                    direction = -gridSize;
                }
                break;
            case 39:
                if (direction !== -1) {
                    direction = 1;
                }
                break;
            case 40:
                if (direction !== -gridSize) {
                    direction = gridSize;
                }
                break;
        }
    }

    function checkCollision() {
        const head = snake[0];
        return (
            snake.slice(1).includes(head) ||
            head < 0 ||
            head >= gridCount ||
            (direction === 1 && head % gridSize === 0) ||
            (direction === -1 && head % gridSize === gridSize - 1)
        );
    }

    function increaseSpeed() {
        intervalTime *= 0.9;
        clearInterval(interval);
        interval = setInterval(moveSnake, intervalTime);
    }

    function updateScore() {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }

    createGameBoard();
    drawSnake();
    generateFood();
    interval = setInterval(moveSnake, intervalTime);
    document.addEventListener('keydown', changeDirection);
});