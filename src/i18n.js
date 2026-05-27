const translations = {
  cs: {
    gallery: {
      eyebrow: 'Fotogalerie',
      title: 'Otevření v novém okně a slideshow',
      shuffleBtn: 'Promíchat pořadí',
      desc: 'Kliknutí na fotku otevře samostatné okno s automatickým přepínáním po 1 sekundě a cyklickým návratem na začátek.'
    },
    calendar: {
      eyebrow: 'Kalendář',
      title: 'Měsíční přehled',
      todayBtn: 'Dnes',
      selected: 'Vybráno'
    },
    tictactoe: {
      eyebrow: 'Piškvorky',
      title: 'Piškvorky',
      newGame: 'Nová hra',
      mode2p: '2 Hráči',
      modeBot: 'Proti botovi',
      statusDefault: 'Tah hráče'
    },
    lottery: {
      eyebrow: 'EuroJackpot',
      title: 'Gamble',
      resetBtn: 'Nová hra',
      yourNumbers: 'Vaše tipovaná čísla',
      mainLabel: 'Hlavní čísla (5 z 50):',
      euroLabel: 'Euro čísla (2 z 11):',
      drawTitle: 'Vylosovaná čísla',
      drawDesc: 'Kliknutím na tlačítko níže se vylosují vítězná čísla a porovnají se s vašimi tipy.',
      drawBtn: 'Vylosovat vítězná čísla',
      yourTitle: 'Vaše čísla',
      winningTitle: 'Vítězná čísla'
    },
    form: {
      eyebrow: 'Registrační formulář',
      title: 'Validace pomocí regulárních výrazů',
      emailLabel: 'Email',
      emailHint: 'Zadejte platný e-mail.',
      passwordLabel: 'Heslo',
      passwordHint: 'Minimálně 8 znaků, velké i malé písmeno, číslice a speciální znak.',
      addressLabel: 'Adresa',
      addressHint: 'Ulice, číslo a město.',
      postalLabel: 'PSČ',
      postalHint: 'Formát 12345 nebo 123 45.',
      statusDefault: 'Formulář čeká na vyplnění.',
      submitBtn: 'Odeslat registraci'
    }
  },
  en: {
    gallery: {
      eyebrow: 'Gallery',
      title: 'Open in new window and slideshow',
      shuffleBtn: 'Shuffle order',
      desc: 'Clicking an image opens a separate window with auto-advance every 1s and loops back to start.'
    },
    calendar: {
      eyebrow: 'Calendar',
      title: 'Monthly overview',
      todayBtn: 'Today',
      selected: 'Selected'
    },
    tictactoe: {
      eyebrow: 'Tic Tac Toe',
      title: 'Tic Tac Toe',
      newGame: 'New game',
      mode2p: '2 Players',
      modeBot: 'Play vs Bot',
      statusDefault: "Player's turn"
    },
    lottery: {
      eyebrow: 'EuroJackpot',
      title: 'Lottery',
      resetBtn: 'New game',
      yourNumbers: 'Your picks',
      mainLabel: 'Main numbers (5 of 50):',
      euroLabel: 'Euro numbers (2 of 11):',
      drawTitle: 'Drawn numbers',
      drawDesc: 'Click the button below to draw winning numbers and compare with your picks.',
      drawBtn: 'Draw winning numbers',
      yourTitle: 'Your numbers',
      winningTitle: 'Winning numbers'
    },
    form: {
      eyebrow: 'Registration form',
      title: 'Regex-based validation',
      emailLabel: 'Email',
      emailHint: 'Enter a valid email.',
      passwordLabel: 'Password',
      passwordHint: 'At least 8 chars, upper+lower case, digit and special char.',
      addressLabel: 'Address',
      addressHint: 'Street, number and city.',
      postalLabel: 'Postal code',
      postalHint: 'Format 12345 or 123 45.',
      statusDefault: 'Form is waiting to be filled.',
      submitBtn: 'Submit registration'
    }
  }
};

// Sudoku translations
translations.cs.sudoku = {
  eyebrow: 'Sudoku',
  title: 'Sudoku s volbou obtížnosti',
  success: 'Gratulujeme! Sudoku je správně.',
  wrongOne: 'Máte chybu v 1 poli.',
  wrongMany: 'Máte chybu v {n} polích.',
  missing: 'Chybí doplnit {n} polí.',
  promptCheck: 'Hotovo? Klikněte na Zkontrolovat.',
  checkBtn: 'Zkontrolovat',
  generateBtn: 'Nové sudoku',
  checkBtn: 'Zkontrolovat',
  difficulty: { easy: 'Lehká', medium: 'Střední', hard: 'Těžká' }
};

translations.en.sudoku = {
  eyebrow: 'Sudoku',
  title: 'Sudoku with difficulty selection',
  success: 'Congratulations! Sudoku is correct.',
  wrongOne: 'You have an error in 1 cell.',
  wrongMany: 'You have errors in {n} cells.',
  missing: '{n} cells left to fill.',
  promptCheck: 'Done? Click Check.',
  checkBtn: 'Check',
  generateBtn: 'New sudoku',
  checkBtn: 'Check',
  difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
};

export function t(key, params = {}) {
  const lang = getCurrentLang();
  const dict = translations[lang] || translations.cs;
  const val = getNested(dict, key);
  if (val === undefined) return key;
  if (Object.keys(params).length === 0) return val;
  return String(val).replace(/\{(\w+)\}/g, (_, n) => params[n] ?? `{${n}}`);
}

function getNested(obj, key) {
  return key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : undefined, obj);
}

function translatePage(lang) {
  const dict = translations[lang] || translations.cs;

  // Elements using data-i18n (innerText or placeholder for inputs)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNested(dict, key);
    if (val === undefined) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Specific placeholders by id (common cases)
  const placeholders = {
    emailInput: { cs: 'jana@example.cz', en: 'jane@example.com' },
    passwordInput: { cs: 'Min. 8 znaků', en: 'Min. 8 chars' },
    addressInput: { cs: 'Ulice 12, Praha', en: 'Street 12, Prague' },
    postalCodeInput: { cs: '110 00', en: '110 00' }
  };
  Object.keys(placeholders).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const val = placeholders[id][lang] || placeholders[id].cs;
    el.placeholder = val;
  });

  // Update html lang attribute
  document.documentElement.lang = (lang === 'cs') ? 'cs' : 'en';
}

export function initI18n() {
  const stored = localStorage.getItem('site_lang') || 'cs';
  const select = document.getElementById('languageSelect');
  const btn = document.getElementById('languageBtn');
  const dropdown = document.getElementById('languageDropdown');
  const langNames = { cs: 'Česky', en: 'English' };

  if (select) {
    select.value = stored;
    select.addEventListener('change', () => {
      const v = select.value;
      localStorage.setItem('site_lang', v);
      translatePage(v);
      window.dispatchEvent(new Event('languagechange'));
    });
  }

  if (btn) {
    // initialize label
    const label = document.getElementById('languageBtnLabel');
    if (label) label.textContent = langNames[stored] || stored;

    btn.addEventListener('click', (e) => {
      const open = dropdown && !dropdown.hasAttribute('hidden');
      if (dropdown) {
        if (open) {
          dropdown.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          dropdown.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
        }
      }
      e.stopPropagation();
    });

    // option clicks
    dropdown?.querySelectorAll('.language-option').forEach(opt => {
      opt.addEventListener('click', (ev) => {
        const v = opt.dataset.lang;
        setLanguage(v);
        dropdown.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        const label2 = document.getElementById('languageBtnLabel');
        if (label2) label2.textContent = langNames[v] || v;
        ev.stopPropagation();
      });
    });

    // close on outside click
    document.addEventListener('click', () => {
      if (dropdown && !dropdown.hasAttribute('hidden')) {
        dropdown.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  translatePage(stored);
}

export function getCurrentLang() {
  return localStorage.getItem('site_lang') || 'cs';
}

export function setLanguage(lang) {
  localStorage.setItem('site_lang', lang);
  const select = document.getElementById('languageSelect');
  if (select) select.value = lang;
  const label = document.getElementById('languageBtnLabel');
  const langNames = { cs: 'Česky', en: 'English' };
  if (label) label.textContent = langNames[lang] || lang;
  translatePage(lang);
  window.dispatchEvent(new Event('languagechange'));
}

export default { initI18n, setLanguage, getCurrentLang };
