/* i18n.js - consolidated and cleaned */
const translations = {
  cs: {
    nav: {
      switcher: 'Přepínač kategorií',
      gallery: 'Fotogalerie',
      calendar: 'Kalendář',
      tictactoe: 'Piškvorky',
      lottery: 'EuroJackpot',
      form: 'Formulář',
      sudoku: 'Sudoku',
      language: 'Jazyk / Language'
    },
    gallery: {
      eyebrow: 'Fotogalerie',
      title: 'Otevření v novém okně a slideshow',
      shuffleBtn: 'Promíchat pořadí',
      desc: 'Kliknutí na fotku otevře samostatné okno s automatickým přepínáním po 1 sekundě a cyklickým návratem na začátek.'
    },
    calendar: {
      eyebrow: 'Kalendář',
      title: 'Měsíční přehled',
      prevMonth: 'Předchozí měsíc',
      nextMonth: 'Další měsíc',
      grid: 'Měsíční kalendář',
      todayBtn: 'Dnes',
      selected: 'Vybráno'
    },
    tictactoe: {
      eyebrow: 'Piškvorky',
      title: 'Piškvorky',
      newGame: 'Nová hra',
      mode2p: '2 Hráči',
      modeBot: 'Proti botovi',
      statusDefault: 'Tah hráče',
      statusTurn: 'Na tahu je hráč {player}.',
      botThinking: 'Bot přemýšlí...',
      botWins: 'Vyhrává bot (O).',
      draw: 'Remíza. Pole je plné.',
      playerWins: 'Vyhrává hráč {winner}.'
    },
    lottery: {
      eyebrow: 'EuroJackpot',
      title: 'EuroJackpot',
      lockInBtn: 'Potvrdit tipovaná čísla',
      resetBtn: 'Nová hra',
      yourNumbers: 'Vaše tipovaná čísla',
      mainLabel: 'Hlavní čísla (5 z 50):',
      euroLabel: 'Euro čísla (2 z 11):',
      drawTitle: 'Vylosovaná čísla',
      drawDesc: 'Kliknutím na tlačítko níže se vylosují vítězná čísla a porovnají se s vašimi tipy.',
      drawBtn: 'Vylosovat vítězná čísla',
      yourTitle: 'Vaše čísla',
      winningTitle: 'Vítězná čísla',
      result: {
        jackpot: 'JACKPOT! Uhodli jste všechna čísla!',
        fiveMainOneEuro: 'Skvělé! Uhodli jste 5 hlavních a 1 euro číslo!',
        fiveMain: 'Gratulace! Uhodli jste všech 5 hlavních čísel!',
        matchSummary: 'Shoda: {main} hlavní a {euro} euro čísla.',
        tryAgain: 'Bohužel, shoda pouze {main} + {euro}. Zkuste to znovu!'
      }
    },
    form: {
      eyebrow: 'Registrační formulář',
      title: 'Validace pomocí regulárních výrazů',
      emailLabel: 'Email',
      emailHint: 'Zadejte platný e-mail.',
      passwordLabel: 'Heslo',
      passwordHint: 'Minimálně 8 znaků, velké i malé písmeno, číslice a speciální znak.',
      valid: 'V pořádku.',
      statusAllValid: 'Všechna pole jsou validní a formulář je připravený k odeslání.',
      statusIncomplete: 'Vyplňte všechny položky. Validace probíhá průběžně při psaní.',
      postalPattern: 'PSČ musí mít formát 12345 nebo 123 45.',
      address: {
        commaAdvice: 'oddělit adresu čárkou na část s ulicí a část s městem',
        street: 'název ulice',
        houseNumber: 'číslo domu',
        city: 'město'
      },
      password: {
        needChars: 'alespoň ještě {n} znaků',
        lower: 'malé písmeno',
        upper: 'velké písmeno',
        digit: 'číslice',
        special: 'speciální znak',
        missingPrefix: 'Chybí: {list}.',
        ok: 'V pořádku.'
      },
      missingPrefix: 'Chybí: {list}.',
      addressLabel: 'Adresa',
      addressHint: 'Ulice, číslo a město.',
      postalLabel: 'PSČ',
      postalHint: 'Formát 12345 nebo 123 45.',
      statusDefault: 'Formulář čeká na vyplnění.',
      submitBtn: 'Odeslat registraci',
      submitSuccess: 'Registrace byla úspěšně zpracována.',
      submitSuccessWithEmail: 'Registrace pro email {email} byla úspěšně zpracována.'
    },
    sudoku: {
      eyebrow: 'Sudoku',
      title: 'Sudoku s volbou obtížnosti',
      difficultyLabel: 'Obtížnost sudoku',
      success: 'Gratulujeme! Sudoku je správně.',
      wrongOne: 'Máte chybu v 1 poli.',
      wrongMany: 'Máte chybu v {n} polích.',
      missing: 'Chybí doplnit {n} polí.',
      promptCheck: 'Hotovo? Klikněte na Zkontrolovat.',
      checkBtn: 'Zkontrolovat',
      generateBtn: 'Nové sudoku',
      difficulty: { easy: 'Lehká', medium: 'Střední', hard: 'Těžká' }
    },
    theme: {
      switchToLight: 'Přepnout na světlý motiv',
      switchToDark: 'Přepnout na tmavý motiv',
      toggle: 'Přepnout motiv'
    }
  },
  en: {
    nav: {
      switcher: 'Category switcher',
      gallery: 'Gallery',
      calendar: 'Calendar',
      tictactoe: 'Tic Tac Toe',
      lottery: 'EuroJackpot',
      form: 'Form',
      sudoku: 'Sudoku',
      language: 'Language'
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Open in new window and slideshow',
      shuffleBtn: 'Shuffle order',
      desc: 'Clicking an image opens a separate window with auto-advance every 1s and loops back to start.'
    },
    calendar: {
      eyebrow: 'Calendar',
      title: 'Monthly overview',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      grid: 'Monthly calendar',
      todayBtn: 'Today',
      selected: 'Selected'
    },
    tictactoe: {
      eyebrow: 'Tic Tac Toe',
      title: 'Tic Tac Toe',
      newGame: 'New game',
      mode2p: '2 Players',
      modeBot: 'Play vs Bot',
      statusDefault: "Player's turn",
      statusTurn: "Player {player}'s turn.",
      botThinking: 'Bot is thinking...',
      botWins: 'Bot wins (O).',
      draw: 'Draw. Board is full.',
      playerWins: 'Player {winner} wins.'
    },
    lottery: {
      eyebrow: 'EuroJackpot',
      title: 'Lottery',
      lockInBtn: 'Lock in picks',
      resetBtn: 'New game',
      yourNumbers: 'Your picks',
      mainLabel: 'Main numbers (5 of 50):',
      euroLabel: 'Euro numbers (2 of 11):',
      drawTitle: 'Drawn numbers',
      drawDesc: 'Click the button below to draw winning numbers and compare with your picks.',
      drawBtn: 'Draw winning numbers',
      yourTitle: 'Your numbers',
      winningTitle: 'Winning numbers',
      result: {
        jackpot: 'JACKPOT! You matched all numbers!',
        fiveMainOneEuro: 'Great! You matched 5 main and 1 euro number!',
        fiveMain: 'Congrats! You matched all 5 main numbers!',
        matchSummary: 'Match: {main} main and {euro} euro numbers.',
        tryAgain: 'Unfortunately, only {main} + {euro} match. Try again!'
      }
    },
    form: {
      eyebrow: 'Registration form',
      title: 'Regex-based validation',
      emailLabel: 'Email',
      emailHint: 'Enter a valid email.',
      passwordLabel: 'Password',
      passwordHint: 'At least 8 chars, upper+lower case, digit and special char.',
      valid: 'OK.',
      statusAllValid: 'All fields are valid and the form is ready to submit.',
      statusIncomplete: 'Fill out all fields. Validation runs live while typing.',
      postalPattern: 'Postal code must be 12345 or 123 45.',
      address: {
        commaAdvice: 'separate address parts with a comma: street, city',
        street: 'street name',
        houseNumber: 'house number',
        city: 'city'
      },
      password: {
        needChars: 'at least {n} more characters',
        lower: 'lowercase letter',
        upper: 'uppercase letter',
        digit: 'digit',
        special: 'special character',
        missingPrefix: 'Missing: {list}.',
        ok: 'OK.'
      },
      missingPrefix: 'Missing: {list}.',
      addressLabel: 'Address',
      addressHint: 'Street, number and city.',
      postalLabel: 'Postal code',
      postalHint: 'Format 12345 or 123 45.',
      statusDefault: 'Form is waiting to be filled.',
      submitBtn: 'Submit registration',
      submitSuccess: 'Registration processed successfully.',
      submitSuccessWithEmail: 'Registration for email {email} was processed successfully.'
    },
    sudoku: {
      eyebrow: 'Sudoku',
      title: 'Sudoku with difficulty selection',
      difficultyLabel: 'Sudoku difficulty',
      success: 'Congratulations! Sudoku is correct.',
      wrongOne: 'You have an error in 1 cell.',
      wrongMany: 'You have errors in {n} cells.',
      missing: '{n} cells left to fill.',
      promptCheck: 'Done? Click Check.',
      checkBtn: 'Check',
      generateBtn: 'New sudoku',
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
    },
    theme: {
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme',
      toggle: 'Toggle theme'
    }
  }
};

export function t(key, params = {}) {
  const lang = getCurrentLang();
  const dict = translations[lang] || translations.cs;
  const val = getNested(dict, key);
  if (val === undefined) return key;
  if (Object.keys(params).length === 0) return val;
  return String(val).replace(/\{(\w+)\}/g, (_, n) => (params[n] !== undefined ? params[n] : `{${n}}`));
}

function getNested(obj, key) {
  return key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : undefined, obj);
}

export function translatePage(lang) {
  const dict = translations[lang] || translations.cs;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNested(dict, key);
    if (val === undefined) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.textContent = val;
  });

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

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const map = el.getAttribute('data-i18n-attr');
    if (!map) return;
    map.split(';').map(s => s.trim()).filter(Boolean).forEach(pair => {
      const parts = pair.split(':');
      if (parts.length < 2) return;
      const attr = parts[0].trim();
      const key = parts.slice(1).join(':').trim();
      const val = getNested(dict, key);
      if (val !== undefined) el.setAttribute(attr, val);
    });
  });

  document.documentElement.lang = (lang === 'cs') ? 'cs' : 'en';
}

export function initI18n() {
  const stored = localStorage.getItem('site_lang') || 'cs';
  const btn = document.getElementById('languageBtn');
  const dropdown = document.getElementById('languageDropdown');
  const langNames = { cs: 'Česky', en: 'English' };

  const label = document.getElementById('languageBtnLabel');
  if (label) label.textContent = langNames[stored] || stored;

  dropdown?.querySelectorAll('.language-option').forEach(opt => {
    opt.addEventListener('click', (ev) => {
      const v = opt.dataset.lang;
      setLanguage(v);
      dropdown.setAttribute('hidden', '');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      ev.stopPropagation();
    });
  });

  if (btn && dropdown) {
    btn.addEventListener('click', (e) => {
      const open = !dropdown.hasAttribute('hidden');
      if (open) {
        dropdown.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        dropdown.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      if (!dropdown.hasAttribute('hidden')) {
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
  const label = document.getElementById('languageBtnLabel');
  const langNames = { cs: 'Česky', en: 'English' };
  if (label) label.textContent = langNames[lang] || lang;
  translatePage(lang);
  window.dispatchEvent(new Event('languagechange'));
}

export default { initI18n, setLanguage, getCurrentLang };
