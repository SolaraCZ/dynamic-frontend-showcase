import { shuffleArray, shuffleGroupedIndices } from '../utils.js';

// DOM elements
const sudokuBoard = document.getElementById("sudokuBoard");
const sudokuGenerateBtn = document.getElementById("sudokuGenerateBtn");
const sudokuCheckBtn = document.getElementById("sudokuCheckBtn");
const sudokuStatus = document.getElementById("sudokuStatus");
const sudokuDifficultyButtons = Array.from(document.querySelectorAll(".sudoku-difficulty-btn"));

// State variables
let difficulty = "easy";
let puzzle = null;
let solution = null;
let hasBeenChecked = false;

// Generates a complete, valid Sudoku board using a known pattern and shuffling
function generateSudokuBoard() {
  const base = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, column) => ((row * 3 + Math.floor(row / 3) + column) % 9) + 1)
  );

  const shuffledRows = shuffleGroupedIndices(3, 3);
  const shuffledColumns = shuffleGroupedIndices(3, 3);
  const digitMap = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return shuffledRows.map((rowIndex) =>
    shuffledColumns.map((columnIndex) => digitMap[base[rowIndex][columnIndex] - 1])
  );
}

// Deletes numbers from the full solution to create a puzzle of the desired difficulty
function createSudokuPuzzle(fullSolution, diff) {
  const removalsByDifficulty = { easy: 36, medium: 46, hard: 54 };
  const removals = removalsByDifficulty[diff] || 36;
  const puz = fullSolution.map((row) => [...row]);
  const positions = shuffleArray(Array.from({ length: 81 }, (_, i) => i));

  positions.slice(0, removals).forEach((pos) => {
    puz[Math.floor(pos / 9)][pos % 9] = null;
  });
  return puz;
}

// Renders the Sudoku board based on the current puzzle state, optionally generating a new one
export function renderSudoku(generateFresh = false) {
  if (!sudokuBoard) return;

  if (generateFresh || !puzzle || !solution) {
    solution = generateSudokuBoard();
    puzzle = createSudokuPuzzle(solution, difficulty);
  }

  hasBeenChecked = false;
  sudokuBoard.innerHTML = "";

  puzzle.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      const cell = document.createElement("div");
      const isGiven = value !== null;
      
      cell.className = "sudoku-cell";
      if (isGiven) cell.classList.add("is-given");
      else cell.classList.add("is-editable");
      
      // Visual grid styling: add thicker borders for 3x3 blocks
      if (rowIndex % 3 === 2 && rowIndex !== 8) cell.classList.add("band-edge");
      if (columnIndex % 3 === 2 && columnIndex !== 8) cell.classList.add("stack-edge");
      if ((Math.floor(rowIndex / 3) + Math.floor(columnIndex / 3)) % 2 === 0) cell.classList.add("block");

      if (isGiven) {
        cell.textContent = String(value);
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.inputMode = "numeric";
        input.maxLength = 1;
        input.dataset.row = rowIndex;
        input.dataset.column = columnIndex;
        input.dataset.solution = solution[rowIndex][columnIndex];
        cell.appendChild(input);
      }
      sudokuBoard.appendChild(cell);
    });
  });

  updateStatus();
}

function handleInput(e) {
  const input = e.target;
  if (!input.dataset.row) return;
  
  input.value = input.value.replace(/[^1-9]/g, "");
  hasBeenChecked = false;
  updateStatus();
}

function handleKeydown(e) {
  const input = e.target;
  if (!input.dataset.row) return;

  const r = Number(input.dataset.row);
  const c = Number(input.dataset.column);
  
  const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
  const move = moves[e.key];
  
  if (move) {
    e.preventDefault();
    const target = sudokuBoard.querySelector(`input[data-row="${r + move[0]}"][data-column="${c + move[1]}"]`);
    if (target) {
      target.focus();
      target.select();
    }
  }
}

function updateStatus() {
  if (!sudokuStatus) return;
  const inputs = Array.from(sudokuBoard.querySelectorAll("input"));
  const empty = inputs.filter(i => !i.value).length;

  if (hasBeenChecked) {
    const wrong = inputs.filter(i => i.value && i.value !== i.dataset.solution).length;
    if (empty === 0 && wrong === 0) sudokuStatus.textContent = "Gratulujeme! Sudoku je správně.";
    else if (wrong > 0) sudokuStatus.textContent = `Máte chybu v ${wrong} ${wrong === 1 ? 'poli' : 'polích'}.`;
    else sudokuStatus.textContent = `Chybí doplnit ${empty} polí.`;
  } else {
    sudokuStatus.textContent = empty === 0 ? "Hotovo? Klikněte na Zkontrolovat." : `Chybí doplnit ${empty} polí.`;
  }
}

function handleFocus(e) {
  const input = e.target;
  const cell = input.closest(".sudoku-cell");
  if (cell) cell.classList.add("is-focused");
}

function handleBlur(e) {
  const input = e.target;
  const cell = input.closest(".sudoku-cell");
  if (cell) cell.classList.remove("is-focused");
}

export function initSudoku() {
  renderSudoku(true);

  sudokuBoard?.addEventListener("input", handleInput);
  sudokuBoard?.addEventListener("keydown", handleKeydown);
  sudokuBoard?.addEventListener("focus", handleFocus, true);
  sudokuBoard?.addEventListener("blur", handleBlur, true);
  
  sudokuGenerateBtn?.addEventListener("click", () => renderSudoku(true));
  
  sudokuCheckBtn?.addEventListener("click", () => {
    hasBeenChecked = true;
    const inputs = sudokuBoard.querySelectorAll("input");
    inputs.forEach(input => {
      const cell = input.closest(".sudoku-cell");
      const isCorrect = input.value === input.dataset.solution;
      cell.classList.toggle("is-correct", input.value && isCorrect);
      cell.classList.toggle("is-wrong", input.value && !isCorrect);
    });
    updateStatus();
  });

  sudokuDifficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      difficulty = btn.dataset.difficulty;
      sudokuDifficultyButtons.forEach(b => b.classList.toggle("is-active", b === btn));
      renderSudoku(true);
    });
  });
}