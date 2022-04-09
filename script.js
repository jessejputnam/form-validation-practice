"use strict";

/* DOM VARIABLES */
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".user__input");
const submit = document.querySelector("#form__submit");
const inputCountry = document.querySelector("#country");
const inputZip = document.querySelector("#zip");
const inputMail = document.querySelector("#mail");
const inputPass = document.querySelector("#pass");
const inputCheck = document.querySelector("#pass-check");

// DRY FUNCTIONS
const chooseError = function (input) {
  if (input.id === "pass-check") {
    if (input.validity.valueMissing) return inputMsgs.missing;
    return inputMsgs.password;
  }
  if (input.validity.valueMissing) return inputMsgs.missing;
  if (input.validity.tooShort)
    return `${inputMsgs.short} ${input.minLength} characters`;
  if (input.validity.typeMismatch) return `${inputMsgs.type} ${input.name}`;
  if (input.validity.patternMismatch)
    return `${inputMsgs.pattern} ${input.name}`;

  return inputMsgs.invalid;
};

const delErrMsg = function (input) {
  if (input.nextElementSibling.classList.contains("err__container"))
    input.nextElementSibling.remove();
};

const addErrOutline = function (input) {
  input.classList.add("error--active");
};

const rmvErrOutline = function (input) {
  input.classList.remove("error--active");
};

const checkValid = function (input) {
  if (input.id === "pass-check") {
    if (!input.validity.valid) return false;
    return input.value === inputPass.value ? true : false;
  }

  if (input.id !== "pass-check") {
    return input.validity.valid ? true : false;
  }
};

const addError = function (input) {
  addErrOutline(input);

  const msg = chooseError(input);

  const html = `
        <div class="err__container">
          <div class="arrow-up"></div>
          <div class="err__txt">⚠️ ${msg}</div>
        </div>
      `;

  input.insertAdjacentHTML("afterend", html);
};

// ERROR MESSAGES
const inputMsgs = {
  missing: "Input cannot be left empty",
  pattern: "Input must match the specified pattern for",
  short: "Input needs to be at least",
  type: "Input needs to be a valid",
  invalid: "Input must be valid",
  password: "This must exactly match your password"
};

// REMOVE ERROR MESSAGE ON DOCUMENT CLICK
document.addEventListener("mousedown", () => {
  inputs.forEach((input) => {
    if (!input.nextElementSibling) return;

    delErrMsg(input);
  });
});

// REMOVE ERROR
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    rmvErrOutline(input);

    if (!input.nextElementSibling) return;
  });
});

// CHECK FOR ERROR ON BLUR
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    const valid = checkValid(input);

    if (input !== inputCheck) valid ? rmvErrOutline(input) : addError(input);
    else {
      if (valid) {
        if (inputCheck.value !== inputPass.value) {
          addError(input);
        } else rmvErrOutline(input);
      } else {
        addError(input);
      }
    }
  });
});

// CHECK FOR ERROR ON SUBMIT
submit.addEventListener("click", (e) => {
  let check = 0;

  inputs.forEach((input) => {
    if (input === inputCheck) {
      if (inputCheck.value !== inputPass.value) {
        check++;
        addErrOutline(input);
      }
    }

    const valid = checkValid(input);
    if (!valid) {
      check++;
      addErrOutline(input);
    }
  });

  if (check > 0) {
    e.preventDefault();
    setTimeout(
      () => alert("Please make sure you have correctly filled out all fields"),
      200
    );
  }
});
