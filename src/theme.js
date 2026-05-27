import { t } from './i18n.js';

let themeToggleAnimation = null;
let themeToggleAnimationReady = false;

// fallback svg when Lottie animation fails
const moonFallbackIcon = `<svg class="theme-fallback-icon" viewBox="0 0 24 24" fill="none" style="width:24px;height:24px;"><path d="M20.3 14.9a8.9 8.9 0 1 1-8.5-11.2 7.1 7.1 0 0 0 8.5 11.2Z" fill="currentColor"/></svg>`;
const sunFallbackIcon = `<svg class="theme-fallback-icon" viewBox="0 0 24 24" fill="none" style="width:24px;height:24px;"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.9v2.2M12 18.9v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.9 12h2.2M18.9 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

// applies theme and updates toggle button state, optionally with animation
export function applyTheme(theme, options = {}) {
  const animate = options.animate === true;
  const skipStore = options.skipStore === true;
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleLottie = document.getElementById("themeToggleLottie");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn?.setAttribute("aria-label", t('theme.switchToLight'));
    themeToggleBtn?.setAttribute("title", t('theme.switchToLight'));
    
    if (themeToggleAnimation && themeToggleAnimationReady) {
      // Dark mode segment: 0 -> 14
      animate ? themeToggleAnimation.playSegments([0, 14], true) : themeToggleAnimation.goToAndStop(14, true);
    } else if (themeToggleLottie && !themeToggleAnimation) {
      themeToggleLottie.innerHTML = moonFallbackIcon;
    }
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggleBtn?.setAttribute("aria-label", t('theme.switchToDark'));
    themeToggleBtn?.setAttribute("title", t('theme.switchToDark'));
    
    if (themeToggleAnimation && themeToggleAnimationReady) {
      // Light mode segment: 14 -> 27
      animate ? themeToggleAnimation.playSegments([14, 27], true) : themeToggleAnimation.goToAndStop(0, true);
    } else if (themeToggleLottie && !themeToggleAnimation) {
      themeToggleLottie.innerHTML = sunFallbackIcon;
    }
    document.documentElement.style.colorScheme = "light";
  }

  if (!skipStore) {
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }
}

// Initializes Lottie animation for theme toggle button and sets it to the correct frame based on current theme
export function initThemeToggleAnimation() {
  const themeToggleLottie = document.getElementById("themeToggleLottie");
  if (!themeToggleLottie || !window.lottie) return;

  // feletes fallback icon
  themeToggleLottie.innerHTML = "";

  themeToggleAnimation = window.lottie.loadAnimation({
    container: themeToggleLottie,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "./dark_light_mode.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });

  themeToggleAnimation.addEventListener("DOMLoaded", () => {
    themeToggleAnimationReady = true;
    // when the animation is ready, we need to set it to the correct frame based on the current theme
    const isDark = document.body.classList.contains("dark-mode");
    applyTheme(isDark ? "dark" : "light", { skipStore: true, animate: false });
  });

  themeToggleAnimation.addEventListener("data_failed", () => {
    themeToggleAnimationReady = false;
    themeToggleAnimation = null;
    const isDark = document.body.classList.contains("dark-mode");
    applyTheme(isDark ? "dark" : "light", { skipStore: true });
  });
}

// Initializes theme based on saved preference or system setting, and sets up toggle button listener
export function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  
  // Saved theme from localStorage or system preference
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  
  if (!saved) {
    saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Applies the css classes and updates the toggle button state without animation on initial load
  applyTheme(saved, { skipStore: true });

  // Set up toggle button listener
  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyTheme(isDark ? 'light' : 'dark', { animate: true });
  });

  // update labels when language changes
  window.addEventListener('languagechange', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyTheme(isDark ? 'dark' : 'light', { skipStore: true, animate: false });
  });
}