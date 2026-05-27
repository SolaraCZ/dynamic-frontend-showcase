const registrationForm = document.getElementById("registrationForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const addressInput = document.getElementById("addressInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const formStatus = document.getElementById("formStatus");
const submitRegistrationBtn = document.getElementById("submitRegistrationBtn");

import { t } from '../i18n.js';

// Renders the current state of the form, validating each field and updating hints and submit button state
function renderFormState() {
  if (!registrationForm) return;
  const emailValid = validateField(emailInput, /^\S+@\S+\.\S+$/, t('form.emailHint'));
  const passwordValid = validateField(passwordInput, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, getPasswordValidationMessage);
  const addressValid = validateField(addressInput, isAddressValid, getAddressValidationMessage);
  const postalCodeValid = validateField(postalCodeInput, /^\d{3}\s?\d{2}$/, t('form.postalPattern'));

  const allValid = emailValid && passwordValid && addressValid && postalCodeValid;
  
  if (submitRegistrationBtn) {
    submitRegistrationBtn.disabled = !allValid;
  }

  if (formStatus) {
    formStatus.textContent = allValid
      ? t('form.statusAllValid')
      : t('form.statusIncomplete');
  }
}

// Validates a single field based on a regex or custom function, updates UI accordingly, and returns validity
function validateField(input, validator, invalidMessage) {
  if (!input) return false;

  const value = input.value.trim();
  const field = input.closest(".form-field");
  if (!field) return false;

  const hint = field.querySelector(".field-hint");
  const isValid = typeof validator === "function" ? validator(value) : validator.test(value);

  field.classList.toggle("valid", isValid);
  field.classList.toggle("invalid", Boolean(value) && !isValid);

  if (hint) {
    if (!value) {
      const key = hint.getAttribute('data-i18n');
      hint.textContent = key ? t(key) : (hint.dataset.default || "");
    } else if (isValid) {
      hint.textContent = t('form.valid');
    } else {
      hint.textContent = typeof invalidMessage === "function" ? invalidMessage(value) : invalidMessage;
    }
  }

  return isValid;
}

// Logic for password validation with detailed feedback on missing criteria
function getPasswordValidationMessage(value) {
  const missingParts = [];
  if (value.length < 8) missingParts.push(t('form.password.needChars', { n: 8 - value.length }));
  if (!/[a-z]/.test(value)) missingParts.push(t('form.password.lower'));
  if (!/[A-Z]/.test(value)) missingParts.push(t('form.password.upper'));
  if (!/\d/.test(value)) missingParts.push(t('form.password.digit'));
  if (!/[^A-Za-z\d]/.test(value)) missingParts.push(t('form.password.special'));

  return missingParts.length === 0 ? t('form.password.ok') : t('form.password.missingPrefix', { list: missingParts.join(', ') });
}

// Validates the address field with custom logic to check for street name, house number, and city
function isAddressValid(value) {
  return getAddressIssues(value).length === 0;
}

function getAddressValidationMessage(value) {
  const issues = getAddressIssues(value);
  return issues.length === 0 ? t('form.valid') : t('form.missingPrefix', { list: issues.join(', ') });
}

function getAddressIssues(value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return [t('form.address.street'), t('form.address.houseNumber'), t('form.address.city')];

  const parts = normalized.split(",").map((part) => part.trim()).filter(Boolean);
  const issues = [];

  if (parts.length < 2) {
    issues.push(t('form.address.commaAdvice'));
  }

  const streetPart = parts[0] || "";
  const cityPart = parts[1] || "";

  if (!/[A-Za-zÁ-ž]/u.test(streetPart)) issues.push(t('form.address.street'));
  if (!/\d/.test(streetPart)) issues.push(t('form.address.houseNumber'));
  if (!/[A-Za-zÁ-ž]{2,}/u.test(cityPart)) issues.push(t('form.address.city'));

  return Array.from(new Set(issues));
}

// Initializes the registration form by attaching event listeners and performing an initial validation check
export function initRegistration() {
  if (!registrationForm) return;

  registrationForm.addEventListener("input", renderFormState);

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderFormState();
    
    const email = emailInput?.value;
    alert(t('form.submitSuccessWithEmail', { email: email || '' }));
  });
  // Initial validation to set the correct state on page load
  renderFormState();
}