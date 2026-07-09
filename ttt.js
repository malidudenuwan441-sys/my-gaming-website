const cells = document.querySelectorAll('.cell');
const statusTurn = document.getElementById('status-turn');
const diffButtons = document.querySelectorAll('.diff-btn');
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true; let difficulty = "easy";
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

cells.forEach(c => c.addEventListener('click', handleCellClick));
function setDifficulty(level) { difficulty = level; diffButtons.forEach(b => b.classList.remove('active')); event.target.classList.add('active'); resetTTT(); }
function handleCellClick(e) {
    const idx = parseInt(e.target.getAttribute('data-index'));
    if (tttBoard[idx] !== "" || !isGameActive) return;
    makeMove(idx, "X");
    if (checkWin(tttBoard, "X")) { statusTurn.innerText = "💥 ඔයා දිනුවා!"; isGameActive = false; return; }
    if (tttBoard.every(c => c !== "")) { statusTurn.innerText = "🤝 Draw!"; isGameActive = false; return; }
    isGameActive = false; statusTurn.innerText = "🤖 AI හිතනවා...";
    setTimeout(aiMove, 400);
}
function makeMove(idx, p) { tttBoard[idx] = p; cells[idx].innerText = p; cells[idx].classList.add(p); }
function aiMove() {
    if (!tttBoard.includes("")) return;
    let move = difficulty === "easy" ? getRandomMove() : (difficulty === "medium" && Math.random() > 0.5 ? getRandomMove() : getBestMove());
    makeMove(move, "O");
    if (checkWin(tttBoard, "O")) { statusTurn.innerText = "💀 AI දිනුවා!"; isGameActive = false; return; }
    if (tttBoard.every(c => c !== "")) { statusTurn.innerText = "🤝 Draw!"; isGameActive = false; return; }
    statusTurn.innerText = "ඔයාගේ වාරය (X)"; isGameActive = true;
}
function getRandomMove() { let emp = []; tttBoard.forEach((v, i) => { if (v === "") emp.push(i); }); return emp[Math.floor(Math.random() * emp.length)]; }
function checkWin(b, p) { return winConditions.some(cond => cond.every(i => b[i] === p)); }
function getBestMove() {
    let bestScore = -Infinity; let move;
    for (let i = 0; i < 9; i++) {
        if (tttBoard[i] === "") {
            tttBoard[i] = "O"; let score = minimax(tttBoard, 0, false); tttBoard[i] = "";
            if (score > bestScore) { bestScore = score; move = i; }
        }
    }
    return move;
}
function minimax(b, d, isMax) {
    if (checkWin(b, "O")) return 10 - d; if (checkWin(b, "X")) return d - 10; if (b.every(c => c !== "")) return 0;
    if (isMax) {
        let s = -Infinity; for (let i = 0; i < 9; i++) { if (b[i] === "") { b[i] = "O"; s = Math.max(s, minimax(b, d + 1, false)); b[i] = ""; } } return s;
    } else {
        let s = Infinity; for (let i = 0; i < 9; i++) { if (b[i] === "") { b[i] = "X"; s = Math.min(s, minimax(b, d + 1, true)); b[i] = ""; } } return s;
    }
}
function resetTTT() { tttBoard = ["", "", "", "", "", "", "", "", ""]; isGameActive = true; statusTurn.innerText = "ඔයාගේ වාරය (X)"; cells.forEach(c => { c.innerText = ""; c.className = "cell"; }); }