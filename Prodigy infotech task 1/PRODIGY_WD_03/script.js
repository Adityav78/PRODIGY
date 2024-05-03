
let xTurn = true;
let moves = 0;
let gameEnded = false;


const cells = document.querySelectorAll('.cell');
const symbols = document.querySelectorAll('.symbol');
const turnDisplay = document.querySelector('.turn');
const winnerDisplay = document.querySelector('.winner');

symbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
        if (!gameEnded) {
            if (symbol.id === 'x') {
                xTurn = true;
                turnDisplay.textContent = 'Turn: X';
            } else {
                xTurn = false;
                turnDisplay.textContent = 'Turn: O';
            }
        }
    });
});

function playMove(cellNum) {
    if (!cells[cellNum].textContent && !gameEnded) {
        if (xTurn) {
            cells[cellNum].textContent = 'X';
        } else {
            cells[cellNum].textContent = 'O';
        }
        moves++;
        checkWin();
        if (moves === 9 && !gameEnded) {
            winnerDisplay.textContent = 'It\'s a draw!';
            gameEnded = true;
        }
        xTurn = !xTurn;
        if (!gameEnded) {
            if (xTurn) {
                turnDisplay.textContent = 'Turn: X';
            } else {
                turnDisplay.textContent = 'Turn: O';
            }
        }
    }
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winnerDisplay.textContent = `${cells[a].textContent} wins!`;
            gameEnded = true;
            break;
        }
    }
}


function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerDisplay.textContent = '';
    gameEnded = false;
    moves = 0;
    xTurn = true;
    turnDisplay.textContent = 'Turn: X';
}
