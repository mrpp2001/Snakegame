document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const cellSize = 20;
    const boardSize = 400;
    const snake = [{ x: 200, y: 200 }];
    let food = { x: 0, y: 0 };
    let direction = 'right';
    let intervalId;
  
    function draw() {
      gameBoard.innerHTML = '';
      snake.forEach((segment) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = segment.x + 'px';
        snakeElement.style.top = segment.y + 'px';
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
      });
  
      const foodElement = document.createElement('div');
      foodElement.style.left = food.x + 'px';
      foodElement.style.top = food.y + 'px';
      foodElement.classList.add('food');
      gameBoard.appendChild(foodElement);
    }
  
    function generateFood() {
      const maxPos = boardSize / cellSize;
      food.x = Math.floor(Math.random() * maxPos) * cellSize;
      food.y = Math.floor(Math.random() * maxPos) * cellSize;
    }
  
    function move() {
      const head = { x: snake[0].x, y: snake[0].y };
  
      switch (direction) {
        case 'up':
          head.y -= cellSize;
          break;
        case 'down':
          head.y += cellSize;
          break;
        case 'left':
          head.x -= cellSize;
          break;
        case 'right':
          head.x += cellSize;
          break;
      }
  
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        generateFood();
      } else {
        snake.pop();
      }
    }
  
    function handleKeyPress(event) {
      const keyPressed = event.key;
      switch (keyPressed) {
        case 'ArrowUp':
          if (direction !== 'down') {
            direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            direction = 'down';
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            direction = 'left';
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            direction = 'right';
          }
          break;
      }
    }
  
    function checkCollision() {
      const head = snake[0];
      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        snake.some((segment,segmentIndex) => segmentIndex !== 0 && segment.x === head.x && segment.y === head.y) ) { clearInterval(intervalId); alert('Game Over'); } }
    function startGame() { generateFood(); intervalId = setInterval(() => { move(); draw(); checkCollision(); }, 200); }
  
  document.addEventListener('keydown', handleKeyPress); startGame(); });