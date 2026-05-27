# Dynamic Frontend Showcase

A modern, interactive single-page application showcasing a collection of JavaScript-driven widgets and components.

## Live Demo
[link to the webpage](https://solaracz.github.io/dynamic-frontend-showcase/)

## Features
- **Photo Gallery**: Open images in a new window with a 1-second auto-slideshow.
- **Weekly Calendar**: Navigate between weeks with weekends and the current day highlighted.
- **Tic-Tac-Toe**: A two-player game with an optional bot opponent.
- **EuroJackpot Lottery Simulator**: Pick 5 out of 50 and 2 out of 11 numbers.
- **Registration Form**: Client-side validation using regular expressions.
- **Sudoku Generator**: Play with different difficulty levels (easy, medium, hard).

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6 Modules)

## How to Run Yourself
1.  Clone the repository: `git clone https://github.com/SolaraCZ/dynamic-frontend-showcase.git`
2.  Open the `index.html` file in your web browser.

## Modules Explained

### Photo Gallery
- Displays a set of thumbnail images.
- Clicking a thumbnail opens the full image in a modal overlay.
- When the overlay is active, a **1‑second slideshow** automatically cycles through all images.
- Navigation buttons allow manual control, and the slideshow pauses on hover.

### Weekly Calendar
- Shows a single week (Monday to Sunday) with the current day highlighted.
- Arrow buttons let you navigate to the previous or next week.
- Weekends (Saturday & Sunday) are visually distinct.

### Tic‑Tac‑Toe
- Two‑player mode: alternating X and O clicks on a 3×3 board.
- Win/draw detection with a status message.
- Includes a **bot opponent** option with basic move logic.
- Board resets automatically for a new round.

### EuroJackpot Simulator
- Generates random lottery numbers according to EuroJackpot rules:
  - 5 main numbers from 1 to 50 (sorted, no duplicates).
  - 2 extra numbers from 1 to 11.
- Numbers are displayed in a clear, visually separated layout.
- “Generate New” button re‑rolls all numbers instantly.

### Registration Form
- Client‑side validation with real‑time feedback.
- Validates:
  - Name (non‑empty, only letters)
  - Email (standard pattern)
  - Password (minimum length, must match confirmation)
  - Phone (Czech format, optional)
- Custom error messages appear next to each field.
- Submit button enables only when all fields are valid.

### Sudoku Generator
- Generates a complete, solvable Sudoku puzzle.
- Three difficulty levels: **easy**, **medium**, **hard** (hides more cells).
- Interactive grid lets you fill in numbers.
- Highlighting of invalid entries (duplicate in row, column, or 3×3 box).
- “New Game” button generates a fresh puzzle.

## License

[MIT License](https://github.com/SolaraCZ/dynamic-frontend-showcase/blob/main/LICENSE)