import { initTheme, initThemeToggleAnimation } from './theme.js';
import { initI18n } from './i18n.js';
import { initGallery } from './modules/gallery.js';
import { initCalendar } from './modules/calendar.js';
import { initTicTacToe } from './modules/ticTacToe.js';
import { initLottery } from './modules/lottery.js';
import { initRegistration } from './modules/registration.js';
import { initSudoku } from './modules/sudoku.js';

const categoryTabs = document.querySelectorAll(".category-tab");
const categoryPanels = document.querySelectorAll(".category-panel");

function setActiveCategory(target) {
  categoryPanels.forEach(p => p.hidden = p.dataset.category !== target);
  categoryTabs.forEach(t => t.classList.toggle("is-active", t.dataset.categoryTarget === target));
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initThemeToggleAnimation();
  initI18n();
  initGallery();
  initCalendar();
  initTicTacToe();
  initLottery();
  initRegistration();
  initSudoku();

  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => setActiveCategory(tab.dataset.categoryTarget));
  });

  setActiveCategory("gallery");
});