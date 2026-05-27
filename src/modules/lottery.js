import { drawUniqueNumbers } from '../utils.js';
import { t } from '../i18n.js';

// DOM elements - number selection
const lotteryMainInput = document.getElementById("lotteryMainInput");
const lotteryEuroInput = document.getElementById("lotteryEuroInput");
const lotteryLockInBtn = document.getElementById("lotteryLockInBtn");
const lotteryResetBtn = document.getElementById("lotteryResetBtn");

// DOM elements - sections
const lotteryDrawSection = document.getElementById("lotteryDrawSection");
const lotteryDrawBtn = document.getElementById("lotteryDrawBtn");
const lotteryResultsSection = document.getElementById("lotteryResultsSection");

// DOM elements - results
const lotteryYourMainTable = document.getElementById("lotteryYourMainTable");
const lotteryYourEuroTable = document.getElementById("lotteryYourEuroTable");
const lotteryWinMainTable = document.getElementById("lotteryWinMainTable");
const lotteryWinEuroTable = document.getElementById("lotteryWinEuroTable");
const lotteryResultMessage = document.getElementById("lotteryResultMessage");

// State variables
let guessedMain = [];
let guessedEuro = [];
let winMain = null;
let winEuro = null;
let gameStarted = false;

// renders the number selection buttons based on current guesses and game state
function renderInputs() {
  if (!lotteryMainInput || !lotteryEuroInput) return;

  // Main numbers (1-50)
  lotteryMainInput.innerHTML = "";
  for (let i = 1; i <= 50; i++) {
    const btn = document.createElement("button");
    btn.className = `number-btn ${guessedMain.includes(i) ? "selected" : ""}`;
    btn.type = "button";
    btn.textContent = i;
    btn.disabled = gameStarted;
    btn.onclick = () => toggleNumber(i, "main");
    lotteryMainInput.appendChild(btn);
  }

  // Euro numbers (1-11)
  lotteryEuroInput.innerHTML = "";
  for (let i = 1; i <= 11; i++) {
    const btn = document.createElement("button");
    btn.className = `number-btn ${guessedEuro.includes(i) ? "selected" : ""}`;
    btn.type = "button";
    btn.textContent = i;
    btn.disabled = gameStarted;
    btn.onclick = () => toggleNumber(i, "euro");
    lotteryEuroInput.appendChild(btn);
  }

  updateLockInBtn();
}

// adds or removes a number from the guesses based on user
function toggleNumber(num, type) {
  if (gameStarted) return;

  if (type === "main") {
    if (guessedMain.includes(num)) {
      guessedMain = guessedMain.filter(n => n !== num);
    } else if (guessedMain.length < 5) {
      guessedMain.push(num);
    }
  } else {
    if (guessedEuro.includes(num)) {
      guessedEuro = guessedEuro.filter(n => n !== num);
    } else if (guessedEuro.length < 2) {
      guessedEuro.push(num);
    }
  }
  renderInputs();
}

// Enables the lock-in button only when the correct number of guesses has been made
function updateLockInBtn() {
  if (lotteryLockInBtn) {
    lotteryLockInBtn.disabled = !(guessedMain.length === 5 && guessedEuro.length === 2);
  }
}

// Locks in the user's guesses, preventing further changes and showing the draw section
function lockInGuess() {
  gameStarted = true;
  renderInputs(); // rerender to disable buttons and show selected state

  if (lotteryLockInBtn) lotteryLockInBtn.style.display = "none";
  if (lotteryDrawSection) lotteryDrawSection.style.display = "block";
  
  // visual feedback that inputs are now locked
  lotteryMainInput.style.opacity = "0.5";
  lotteryEuroInput.style.opacity = "0.5";
}

// Draws the winning numbers, hides the draw section, shows the results section, and renders the results
function drawNumbers() {
  winMain = drawUniqueNumbers(5, 50).sort((a, b) => a - b);
  winEuro = drawUniqueNumbers(2, 11).sort((a, b) => a - b);

  if (lotteryDrawSection) lotteryDrawSection.style.display = "none";
  if (lotteryResultsSection) lotteryResultsSection.style.display = "block";

  showResults();
}

// Compares the user's guesses with the winning numbers, renders the tables with highlights, and calculates the final result message
function showResults() {
  const matchedMain = new Set(guessedMain.filter(n => winMain.includes(n)));
  const matchedEuro = new Set(guessedEuro.filter(n => winEuro.includes(n)));

  renderTable(lotteryYourMainTable, [...guessedMain].sort((a, b) => a - b), matchedMain);
  renderTable(lotteryYourEuroTable, [...guessedEuro].sort((a, b) => a - b), matchedEuro);
  renderTable(lotteryWinMainTable, winMain, matchedMain);
  renderTable(lotteryWinEuroTable, winEuro, matchedEuro);

  calculateResult(matchedMain.size, matchedEuro.size);
}

// Renders a single row table with numbers, highlighting those that are in the highlights set
function renderTable(tableEl, numbers, highlights) {
  if (!tableEl) return;
  tableEl.innerHTML = "";
  const row = document.createElement("tr");
  numbers.forEach(num => {
    const cell = document.createElement("td");
    const isMatch = highlights.has(num);
    cell.innerHTML = `<div class="lottery-ball ${isMatch ? "is-match" : ""}">${num}</div>`;
    row.appendChild(cell);
  });
  tableEl.appendChild(row);
}

// Determines the result message based on how many main and euro numbers were matched, and applies appropriate styling
function calculateResult(mainCount, euroCount) {
  if (!lotteryResultMessage) return;

  let msg = "";
  let cls = "loss";

  if (mainCount === 5 && euroCount === 2) {
    msg = t('lottery.result.jackpot');
    cls = "win";
  } else if (mainCount === 5 && euroCount === 1) {
    msg = t('lottery.result.fiveMainOneEuro');
    cls = "win";
  } else if (mainCount === 5) {
    msg = t('lottery.result.fiveMain');
    cls = "win";
  } else if (mainCount >= 2 || (mainCount >= 1 && euroCount === 2)) {
    msg = t('lottery.result.matchSummary', { main: mainCount, euro: euroCount });
    cls = "win";
  } else {
    msg = t('lottery.result.tryAgain', { main: mainCount, euro: euroCount });
    cls = "loss";
  }

  lotteryResultMessage.textContent = msg;
  lotteryResultMessage.className = `lottery-result-message ${cls}`;
}

// resets the game state to allow for a new round of guessing and drawing, and updates the UI accordingly
function resetGame() {
  guessedMain = [];
  guessedEuro = [];
  winMain = null;
  winEuro = null;
  gameStarted = false;

  if (lotteryMainInput) lotteryMainInput.style.opacity = "1";
  if (lotteryEuroInput) lotteryEuroInput.style.opacity = "1";
  if (lotteryLockInBtn) {
    lotteryLockInBtn.style.display = "inline-block";
    lotteryLockInBtn.disabled = true;
  }
  if (lotteryDrawSection) lotteryDrawSection.style.display = "none";
  if (lotteryResultsSection) lotteryResultsSection.style.display = "none";

  renderInputs();
}

// Initializes the lottery module by rendering the inputs and attaching event listeners to buttons
export function initLottery() {
  renderInputs();

  lotteryLockInBtn?.addEventListener("click", lockInGuess);
  lotteryDrawBtn?.addEventListener("click", drawNumbers);
  lotteryResetBtn?.addEventListener("click", resetGame);
}