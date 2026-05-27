import { startOfDay, addDays, sameDay } from '../utils.js';
import { getCurrentLang, t } from '../i18n.js';

const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarPrevBtn = document.getElementById("calendarPrevBtn");
const calendarNextBtn = document.getElementById("calendarNextBtn");
const calendarTodayBtn = document.getElementById("calendarTodayBtn");

let monthFormatter = null;
let dayNameFormatter = null;
const today = startOfDay(new Date());

let calendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = new Date(today);

export function renderCalendar() {
  if (!calendarGrid) return;
  calendarGrid.innerHTML = "";
  // update formatters based on current language
  const lang = getCurrentLang();
  const locale = (lang === 'cs') ? 'cs-CZ' : 'en-GB';
  monthFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  dayNameFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  calendarMonthLabel.textContent = monthFormatter.format(calendarDate);

  const refMonday = new Date(2021, 2, 1);
  for (let i = 0; i < 7; i++) {
    const th = document.createElement("div");
    th.className = "calendar-weekday";
    th.textContent = dayNameFormatter.format(addDays(refMonday, i));
    calendarGrid.appendChild(th);
  }

  const month = calendarDate.getMonth();
  const year = calendarDate.getFullYear();
  const firstOfMonth = new Date(year, month, 1);
  const startDay = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = addDays(firstOfMonth, -startDay);

  for (let i = 0; i < 42; i++) {
    const day = addDays(gridStart, i);
    const cell = document.createElement("div");
    cell.className = "calendar-day" + (day.getMonth() !== month ? " other-month" : "") + (sameDay(day, today) ? " today" : "");
    cell.innerHTML = `<span class="day-number">${day.getDate()}</span><div class="day-spot"></div>`;
    
    if (sameDay(day, selectedDate)) {
      cell.querySelector(".day-spot").textContent = t('calendar.selected');
      cell.style.background = "var(--surface-soft)";
    }
    cell.onclick = () => { selectedDate = new Date(day); renderCalendar(); };
    calendarGrid.appendChild(cell);
  }
}

export function initCalendar() {
  renderCalendar();
  window.addEventListener('languagechange', () => renderCalendar());
  calendarPrevBtn?.addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); });
  calendarNextBtn?.addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });
  calendarTodayBtn?.addEventListener("click", () => {
    calendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
    selectedDate = new Date(today);
    renderCalendar();
  });
}