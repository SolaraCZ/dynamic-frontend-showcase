const registrationForm = document.getElementById("registrationForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const addressInput = document.getElementById("addressInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const formStatus = document.getElementById("formStatus");
const submitRegistrationBtn = document.getElementById("submitRegistrationBtn");

// Renders the current state of the form, validating each field and updating hints and submit button state
function renderFormState() {
  if (!registrationForm) return;

  const emailValid = validateField(emailInput, /^\S+@\S+\.\S+$/, "Zadejte platný e-mail.");
  const passwordValid = validateField(passwordInput, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, getPasswordValidationMessage);
  const addressValid = validateField(addressInput, isAddressValid, getAddressValidationMessage);
  const postalCodeValid = validateField(postalCodeInput, /^\d{3}\s?\d{2}$/, "PSČ musí mít formát 12345 nebo 123 45.");

  const allValid = emailValid && passwordValid && addressValid && postalCodeValid;
  
  if (submitRegistrationBtn) {
    submitRegistrationBtn.disabled = !allValid;
  }

  if (formStatus) {
    formStatus.textContent = allValid
      ? "Všechna pole jsou validní a formulář je připravený k odeslání."
      : "Vyplňte všechny položky. Validace probíhá průběžně při psaní.";
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
      hint.textContent = hint.dataset.default || "";
    } else if (isValid) {
      hint.textContent = "V pořádku.";
    } else {
      hint.textContent = typeof invalidMessage === "function" ? invalidMessage(value) : invalidMessage;
    }
  }

  return isValid;
}

// Logic for password validation with detailed feedback on missing criteria
function getPasswordValidationMessage(value) {
  const missingParts = [];
  if (value.length < 8) missingParts.push(`alespoň ještě ${8 - value.length} znaků`);
  if (!/[a-z]/.test(value)) missingParts.push("malé písmeno");
  if (!/[A-Z]/.test(value)) missingParts.push("velké písmeno");
  if (!/\d/.test(value)) missingParts.push("číslice");
  if (!/[^A-Za-z\d]/.test(value)) missingParts.push("speciální znak");

  return missingParts.length === 0 ? "V pořádku." : `Chybí: ${missingParts.join(", ")}.`;
}

// Validates the address field with custom logic to check for street name, house number, and city
function isAddressValid(value) {
  return getAddressIssues(value).length === 0;
}

function getAddressValidationMessage(value) {
  const issues = getAddressIssues(value);
  return issues.length === 0 ? "V pořádku." : `Chybí: ${issues.join(", ")}.`;
}

function getAddressIssues(value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return ["ulice", "číslo domu", "město"];

  const parts = normalized.split(",").map((part) => part.trim()).filter(Boolean);
  const issues = [];

  if (parts.length < 2) {
    issues.push("oddělit adresu čárkou na část s ulicí a část s městem");
  }

  const streetPart = parts[0] || "";
  const cityPart = parts[1] || "";

  if (!/[A-Za-zÁ-ž]/u.test(streetPart)) issues.push("název ulice");
  if (!/\d/.test(streetPart)) issues.push("číslo domu");
  if (!/[A-Za-zÁ-ž]{2,}/u.test(cityPart)) issues.push("město");

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
    alert(`Registrace pro email ${email} byla úspěšně zpracována.`);
  });
  // Initial validation to set the correct state on page load
  renderFormState();
}