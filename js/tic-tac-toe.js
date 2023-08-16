const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Function to check if the board is full
function isBoardFull(board) {
  return board.every((cell) => cell !== " ");
}

// Function to check if a player has won
function isWinner(board, player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === player);
  });
}

// Function to make the computer's move
function computerMove() {
  const bestMove = minimax(board, "O").index;
  board[bestMove] = "O";
  setTimeout(updateBoard, 400);

  if (isWinner(board, "O")) {
    endGame("won");
  } else if (isBoardFull(board)) {
    endGame("tie");
  }
}

// Minimax algorithm for optimal move selection
function minimax(board, player) {
  if (isWinner(board, "X")) {
    return { score: -1 };
  } else if (isWinner(board, "O")) {
    return { score: 1 };
  } else if (isBoardFull(board)) {
    return { score: 0 };
  }

  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      availableMoves.push(i);
    }
  }

  const moves = [];
  for (let i = 0; i < availableMoves.length; i++) {
    const move = {};
    move.index = availableMoves[i];
    board[availableMoves[i]] = player;

    if (player === "O") {
      const result = minimax(board, "X");
      move.score = result.score;
    } else {
      const result = minimax(board, "O");
      move.score = result.score;
    }

    board[availableMoves[i]] = " ";
    moves.push(move);
  }

  let bestMove;
  if (player === "O") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// Function to handle the user's move
function handleMove(index) {
  if (board[index] === " ") {
    board[index] = "X";
    updateBoard();

    if (isWinner(board, "X")) {
      endGame("Congratulations! You won!");
    } else if (isBoardFull(board)) {
      endGame("It's a tie!");
    } else {
      computerMove();
    }
  }
}

// Function to update the board display
function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Function to initialize the game
function startGame() {
  let btn = document.querySelector(".restart-btn");
  btn.hidden = true;
  let exit = document.querySelector(".ext");
  exit.hidden = true;
  board.fill(" ");
  updateBoard();
}

// Function to end the game and display the result
function endGame(message) {
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let mess1, mess2;
  if (message == "won") {
    mess1 = document.createTextNode("Better Luck Next Time!! ");
    mess2 = document.createTextNode("It's Me who Won!!😎");
  } else {
    mess1 = document.createTextNode("Ohhh i missed it!!");
    mess2 = document.createTextNode("It's a Tie!!😐");
  }
  para1.appendChild(mess1);
  para2.appendChild(mess2);
  let result = document.querySelector(".end-game");
  result.innerText = "";
  result.appendChild(para1);
  result.appendChild(para2);
  result.hidden = false;

  let btn = document.querySelector(".restart-btn");
  btn.hidden = false;
  let exit = document.querySelector(".ext");
  exit.hidden = false;
  btn.addEventListener("click", () => {
    result.hidden = true;
    startGame();
  });
}

// Create the game board in the DOM
const boardContainer = document.querySelector(".board");
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleMove(i));
  boardContainer.appendChild(cell);
}
