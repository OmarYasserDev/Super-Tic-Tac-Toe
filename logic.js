const cells = document.querySelectorAll(".cell");
let board = Array(81).fill("");
let currentPlayer = "X";

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "") {
            return;
        }
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
        console.log(board);
    });
});