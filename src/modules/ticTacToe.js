import { t } from '../i18n.js';

const ticTacToeBoard = document.getElementById("ticTacToeBoard");
const ticTacToeStatus = document.getElementById("ticTacToeStatus");
const ticTacToeResetBtn = document.getElementById("ticTacToeResetBtn");
const ticTacToeTwoPlayerBtn = document.getElementById("ticTacToeTwoPlayerBtn");
const ticTacToeBotBtn = document.getElementById("ticTacToeBotBtn");

// State of the game
let state = Array(9).fill("");
let currentPlayer = "X";
let finished = false;
let mode = "2player"; // either "2player" or "bot"
let botThinking = false;

// checks if there's a winner and returns "X", "O" or null
function getWinner(board) {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];

  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// logic for bot move - simple algorithm that tries to win, block, take center, take corners, or take any free space
function getBotBestMove(board) {
  // Can the bot win in the next move?
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = "O";
      if (getWinner(testBoard) === "O") return i;
    }
  }

  // Does the bot need to block the player from winning?
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = "X";
      if (getWinner(testBoard) === "X") return i;
    }
  }

  // Take the center if possible
  if (!board[4]) return 4;

  // Take the corners if possible
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !board[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any free space
  const available = board.map((v, i) => v === "" ? i : -1).filter(i => i !== -1);
  return available[Math.floor(Math.random() * available.length)];
}

function makeBotMove() {
  if (finished) return;

  const move = getBotBestMove(state);
  if (move !== undefined && move !== -1) {
    state[move] = "O";
    
    const winner = getWinner(state);
    if (winner) {
      finished = true;
      ticTacToeStatus.textContent = t('tictactoe.botWins');
    } else if (state.every(Boolean)) {
      finished = true;
      ticTacToeStatus.textContent = t('tictactoe.draw');
    } else {
      currentPlayer = "X";
      ticTacToeStatus.textContent = t('tictactoe.statusTurn', { player: currentPlayer });
    }
  }
  
  botThinking = false;
  render();
}

export function render() {
  if (!ticTacToeBoard) return;
  ticTacToeBoard.innerHTML = "";

  state.forEach((val, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `tic-cell ${val ? val.toLowerCase() : ""}`;
    btn.textContent = val;
    btn.disabled = finished || val !== "" || botThinking;
    
    btn.onclick = () => {
      if (finished || val !== "" || botThinking) return;

      // Who is playing and what happens when they click
      state[i] = currentPlayer;
      
      const winner = getWinner(state);
      if (winner) {
        finished = true;
        ticTacToeStatus.textContent = t('tictactoe.playerWins', { winner });
      } else if (state.every(Boolean)) {
        finished = true;
        ticTacToeStatus.textContent = t('tictactoe.draw');
      } else {
        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        ticTacToeStatus.textContent = t('tictactoe.statusTurn', { player: currentPlayer });

        // If it's bot mode and it's bot's turn, make the bot move after a short delay
        if (mode === "bot" && currentPlayer === "O") {
          botThinking = true;
          ticTacToeStatus.textContent = t('tictactoe.botThinking');
          render(); // rerender to disable buttons while bot is thinking
          setTimeout(makeBotMove, 600);
          return;
        }
      }
      render();
    };
    
    ticTacToeBoard.appendChild(btn);
  });
}

function updateModeButtons() {
  ticTacToeTwoPlayerBtn?.classList.toggle("is-active", mode === "2player");
  ticTacToeBotBtn?.classList.toggle("is-active", mode === "bot");
}

export function initTicTacToe() {
  if (!ticTacToeBoard) return;

  ticTacToeResetBtn?.addEventListener("click", () => {
    state = Array(9).fill("");
    currentPlayer = "X";
    finished = false;
    botThinking = false;
    ticTacToeStatus.textContent = t('tictactoe.statusTurn', { player: currentPlayer });
    render();
  });

  ticTacToeTwoPlayerBtn?.addEventListener("click", () => {
    mode = "2player";
    updateModeButtons();
    ticTacToeResetBtn.click();
  });

  ticTacToeBotBtn?.addEventListener("click", () => {
    mode = "bot";
    updateModeButtons();
    ticTacToeResetBtn.click();
  });

  // First render
  ticTacToeStatus.textContent = t('tictactoe.statusTurn', { player: currentPlayer });
  updateModeButtons();
  render();
}