const sCanvas = document.getElementById("snakeGame"); const sCtx = sCanvas.getContext("2d");
let grid = 10; let sCount = 0; let score = 0;
let snake = { x: 130, y: 130, dx: grid, dy: 0, cells: [], maxCells: 4 };
let apple = { x: 60, y: 60 };
function sLoop() {
    requestAnimationFrame(sLoop); if (++sCount < 5) return; sCount = 0;
    sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
    snake.x += snake.dx; snake.y += snake.dy;
    if (snake.x < 0) snake.x = sCanvas.width - grid; else if (snake.x >= sCanvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = sCanvas.height - grid; else if (snake.y >= sCanvas.height) snake.y = 0;
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    sCtx.fillStyle = '#ff3333'; sCtx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    snake.cells.forEach((cell, idx) => {
        sCtx.fillStyle = idx === 0 ? '#ff5555' : '#ffffff';
        sCtx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) { snake.maxCells++; score += 10; document.getElementById('score').innerText = score; apple.x = Math.floor(Math.random() * (sCanvas.width / grid)) * grid; apple.y = Math.floor(Math.random() * (sCanvas.height / grid)) * grid; }
        for (let i = idx + 1; i < snake.cells.length; i++) { if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) { snake.x = 130; snake.y = 130; snake.cells = []; snake.maxCells = 4; snake.dx = grid; snake.dy = 0; score = 0; document.getElementById('score').innerText = score; } }
    });
}
document.addEventListener('keydown', e => {
    if ((e.which === 37 || e.which === 65) && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if ((e.which === 38 || e.which === 87) && snake.dy === 0) { snake.dx = 0; snake.dy = -grid; }
    else if ((e.which === 39 || e.which === 68) && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if ((e.which === 40 || e.which === 83) && snake.dy === 0) { snake.dx = 0; snake.dy = grid; }
});
requestAnimationFrame(sLoop);