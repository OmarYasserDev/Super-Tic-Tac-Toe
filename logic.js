const smallBoardsDOM = document.querySelectorAll('.small-board');
let currentPlayer = 'X';
let gameActive = true;
let activeBoardIndex = -1;
const smallBoardsData = Array.from({ length: 9 }, () => Array(9).fill(''));
const mainBoardData = Array(9).fill('');
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
smallBoardsDOM.forEach((boardDOM, bIndex) => {
    const cells = boardDOM.querySelectorAll('.cell');
    cells.forEach((cell, cIndex) => {
        cell.addEventListener('click', () => handleMove(bIndex, cIndex, cell));
    });
});
function handleMove(bIndex, cIndex, cell) {
    if (!gameActive) return;
    if (smallBoardsData[bIndex][cIndex] !== '') return;
    if (mainBoardData[bIndex] !== '') return;
    if (activeBoardIndex !== -1 && activeBoardIndex !== bIndex) return;
    smallBoardsData[bIndex][cIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? 'red' : 'blue';
    if (checkWin(smallBoardsData[bIndex])) {
        mainBoardData[bIndex] = currentPlayer;
        smallBoardsDOM[bIndex].classList.add('won');
        smallBoardsDOM[bIndex].innerHTML = `
            <div class="big-winner"
            style="
                font-size:80px;
                display:flex;
                justify-content:center;
                align-items:center;
                width:100%;
                height:100%;
                color:${currentPlayer === 'X' ? 'red' : 'blue'};
            ">
                ${currentPlayer}
            </div>
        `;
    } else if (!smallBoardsData[bIndex].includes('')) {
        mainBoardData[bIndex] = 'Draw';
        smallBoardsDOM[bIndex].classList.add('draw');
    }
    if (checkWin(mainBoardData)) {
        gameActive = false;
        showWinner(currentPlayer);
        updateActiveBoards(-2);
        return;
    }
    if (mainBoardData[cIndex] !== '') {
        activeBoardIndex = -1;
    } else {
        activeBoardIndex = cIndex;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateActiveBoards(activeBoardIndex);
}
function checkWin(board) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            board[a] &&
            board[a] !== 'Draw' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }
    return false;
}
function updateActiveBoards(activeIndex) {
    smallBoardsDOM.forEach((board, index) => {
        board.style.border = "2px solid transparent";
        board.style.opacity = "0.5";
        if (activeIndex === -2) {
            board.style.opacity = "1";
            return;
        }
        if (activeIndex === -1 && mainBoardData[index] === '') {
            board.style.border = "3px solid #28a745";
            board.style.opacity = "1";
        } else if (index === activeIndex && mainBoardData[index] === '') {
            board.style.border = "3px solid #28a745";
            board.style.opacity = "1";
        } else if (mainBoardData[index] !== '') {
            board.style.opacity = "1";
        }
    });
}
updateActiveBoards(-1);
const winnerModal = document.getElementById("winnerModal");
const winnerTitle = document.getElementById("winnerTitle");
const restartBtn = document.getElementById("restartBtn");
function showWinner(player) {
    winnerTitle.innerHTML =
        `🎉 Player <span style="color:${player === 'X' ? '#ff3b3b' : '#3b82f6'}">${player}</span> Wins!`;
    winnerModal.classList.add("show");
}
restartBtn.addEventListener("click", () => {
    location.reload();
});