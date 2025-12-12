// ===== GET THE ELEMENT ===== //
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const queryTypeInputs  = document.querySelectorAll(".form__option input");
const messageTextarea = document.getElementById("msg-input");
const agreementCheckbox  = document.getElementById("agreement");
const form = document.getElementById("form");
const successMsg = document.getElementById("success-msg");

// ===== FORM SUBMIT EVENT HANDLER ===== //
form.addEventListener("submit", (event) => {
    let isFormValid = false;
    
    // Validate each field and store the result
    const email = checkTextInput(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const firstname = checkTextInput(firstName, /^[a-zA-Z\\s]+$/);
    const lastname = checkTextInput(lastName, /^[a-zA-Z\\s]+$/);
    const message = checkTextInput(messageTextarea, /^[\s\S]{1,}$/);
    const selection = selectionControls();
    
    // If ALL fields are valid, set form as valid
    if (email && firstname && lastname && message && selection) {
        isFormValid = true;
        successMsg.classList.add("show-success-msg");
        setTimeout(() => {
            successMsg.classList.remove("show-success-msg");
        }, 2000,);
    }
    
    // Prevent form submission if validation fails
    if (!isFormValid) event.preventDefault();
});

// ===== MINI FUNCTIONS ===== //

/**
 * Removes error class when user starts typing (live validation feedback)
 * @param {HTMLElement} inp - Input element to attach event to
 * @param {string} event - Event type (e.g., "input", "change")
 * @param {HTMLElement} target - Element to remove error class from
 */

const setupLiveValidation = (inp, event, target) => {
    inp.addEventListener(event, () => target.classList.remove("error"))
}

/**
 * Checks if a selection (radio or checkbox) is made and updates UI
 * @param {boolean} inp - Whether input is selected (true/false)
 * @param {HTMLElement} target - Container element to show/hide error
 * @returns {boolean} - Returns true if input is selected, false otherwise
 */
const checkAndUpdateSelectionUI = (inp, target) => {
    if (!inp) {
        target.classList.add("error");
        return false;
    } else {
        target.classList.remove("error");
        return true;
    }
}

// ===== TEXT INPUTS VERIFICATION FUNCTION ===== //

/**
 * Validates text input fields against a regex pattern
 * @param {HTMLInputElement} input - The input element to validate
 * @param {RegExp} regex - Regular expression pattern to test against
 * @returns {boolean} - Returns true if input is valid, false otherwise
 */
const checkTextInput = (input, regex) => {
    let valid = false;
    setupLiveValidation(input, "input", input.parentElement);
    
    // Check if input is empty OR doesn't match regex pattern
    if (input.value === "" || !regex.test(input.value)) {
        input.parentElement.classList.add("error");
        valid = false;
    } else {
        input.parentElement.classList.remove("error");
        valid = true;
    }
    
    return valid;
}

// ==== SELECTION CONTROLS CHECK ==== //

/**
 * Validates all selection controls (radio buttons and checkbox)
 * @returns {boolean} - Returns true if all selections are valid, false otherwise
 */


const selectionControls = () => {
    // === QUERY TYPE VALIDATION (Radio buttons) ===
    const queryContainer = document.getElementById("query-container");
    const queryTypes = Array.from(queryTypeInputs );
    let selected = queryTypes.some(inp => inp.checked); // Check if any radio is selected
    
    // Validate query type and add live feedback
    const queryValid = checkAndUpdateSelectionUI(selected, queryContainer);
    queryTypes.forEach(type => setupLiveValidation(type, "input", queryContainer));
    
    // === AGREEMENT VALIDATION (Checkbox) ===
    const formAgreement = document.querySelector(".form__agreement")
    let agree = agreementCheckbox.checked; // Check if checkbox is checked
    
    // Validate agreement and add live feedback
    const agreementValid = checkAndUpdateSelectionUI(agree, formAgreement);
    setupLiveValidation(agreementCheckbox , "input", formAgreement);
    
    // Return true only if BOTH query type AND agreement are valid
    if (agreementValid && queryValid) {
        return true;
    } else {
        return false;
    }
}