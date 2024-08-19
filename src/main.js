("use strict");

/**
 * main.js
 * Main JavaScript file for the project
 * Author: Catsucci
 * Created: 2024-08-19
 */

import {
  IsNameValid,
  IsEmailValid,
  IsPhoneNumberValid,
  IsPasswordValid,
  IsEmpty,
  IsPasswordsMatching,
} from "./utils.js";

const STATES = {
  VALID: "valid",
  ERROR: "error",
  WARNING: "warning",
  NILL: null,
};

let D_FIELD_S = {};
document.querySelectorAll("li").forEach((d_li) => {
  let name = d_li.querySelector("input").getAttribute("name");
  D_FIELD_S[name] = {
    d_li: d_li,
    d_label: d_li.querySelector("label"),
    d_input: d_li.querySelector("input"),
  };
});

for (const name in D_FIELD_S) {
  D_FIELD_S[name].d_input.addEventListener("focus", () => {
    D_FIELD_S[name].d_li.classList.add("in-focus");
  });

  D_FIELD_S[name].d_input.addEventListener("blur", () => {
    D_FIELD_S[name].d_li.classList.remove("in-focus");
  });

  switch (name) {
    case "first_name":
    case "last_name":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsNameValid(event.target.value)) {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
          } else {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
          }
        } else {
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
        }
      });
      break;
    case "email":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsEmailValid(event.target.value)) {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
          } else {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
          }
        } else {
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
        }
      });
      break;
    case "phone_number":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsPhoneNumberValid(event.target.value)) {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
          } else {
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
          }
        } else {
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
        }
      });
      break;
    case "password":
    case "confirm_password":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (
          IsEmpty(D_FIELD_S["password"].d_input.value) &&
          IsEmpty(D_FIELD_S["confirm_password"].d_input.value)
        ) {
          HandleNodeStates(D_FIELD_S["password"].d_li, STATES.NILL);
          HandleNodeStates(D_FIELD_S["password"].d_label, STATES.NILL);
          HandleNodeStates(D_FIELD_S["confirm_password"].d_li, STATES.NILL);
          HandleNodeStates(D_FIELD_S["confirm_password"].d_label, STATES.NILL);
          D_FIELD_S["password"].d_label.innerText = "PASSWORD";
          D_FIELD_S["confirm_password"].d_label.innerText = "CONFIRM PASSWORD";
        } else if (IsPasswordValid(event.target.value)) {
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
          D_FIELD_S[name].d_label.innerText =
            name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
        } else {
          // if password format is not valid
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
          D_FIELD_S[name].d_label.innerText = "PASSWORD (sample: P@ssw0rd)";
        }
        if (
          // if both password inputs are not empty
          !(
            IsEmpty(D_FIELD_S["password"].d_input.value) ||
            IsEmpty(D_FIELD_S["confirm_password"].d_input.value)
          )
        ) {
          if (
            !IsPasswordsMatching(
              D_FIELD_S["password"].d_input.value,
              D_FIELD_S["confirm_password"].d_input.value,
            ) &&
            (IsPasswordValid(D_FIELD_S["password"].d_input.value) ||
              IsPasswordValid(D_FIELD_S["confirm_password"].d_input.value))
          ) {
            HandleNodeStates(D_FIELD_S["password"].d_li, STATES.WARNING);
            HandleNodeStates(D_FIELD_S["password"].d_label, STATES.WARNING);
            HandleNodeStates(
              D_FIELD_S["confirm_password"].d_li,
              STATES.WARNING,
            );
            HandleNodeStates(
              D_FIELD_S["confirm_password"].d_label,
              STATES.WARNING,
            );
            D_FIELD_S["password"].d_label.innerText = "PASSWORDS DO NOT MATCH";
            D_FIELD_S["confirm_password"].d_label.innerText =
              "PASSWORDS DO NOT MATCH";
          } else if (
            IsPasswordValid(D_FIELD_S["password"].d_input.value) &&
            IsPasswordValid(D_FIELD_S["confirm_password"].d_input.value)
          ) {
            // if both password inputs are NOT not matching (yup not twice to be precise)
            HandleNodeStates(D_FIELD_S["password"].d_li, STATES.VALID);
            HandleNodeStates(D_FIELD_S["password"].d_label, STATES.VALID);
            HandleNodeStates(D_FIELD_S["confirm_password"].d_li, STATES.VALID);
            HandleNodeStates(
              D_FIELD_S["confirm_password"].d_label,
              STATES.VALID,
            );
            D_FIELD_S["password"].d_label.innerText = "PASSWORD";
            D_FIELD_S["confirm_password"].d_label.innerText =
              "CONFIRM PASSWORD";
          }
        } else if (IsEmpty(D_FIELD_S[name].d_input.value)) {
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
          D_FIELD_S[name].d_label.innerText =
            name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
          if (name === "password") {
            if (IsPasswordValid(D_FIELD_S["confirm_password"].d_input.value)) {
              console.log("Doha");
              HandleNodeStates(
                D_FIELD_S["confirm_password"].d_li,
                STATES.VALID,
              );
              HandleNodeStates(
                D_FIELD_S["confirm_password"].d_label,
                STATES.VALID,
              );
              D_FIELD_S["confirm_password"].d_label.innerText =
                "CONFIRM PASSWORD";
              D_FIELD_S["password"].d_label.innerText = "PASSWORD";
            } else if (!IsEmpty(D_FIELD_S["confirm_password"].d_input.value)){
              HandleNodeStates(
                D_FIELD_S["confirm_password"].d_li,
                STATES.ERROR,
              );
              HandleNodeStates(
                D_FIELD_S["confirm_password"].d_label,
                STATES.ERROR,
              );
              D_FIELD_S["confirm_password"].d_label.innerText =
                "PASSWORD (sample: P@ssw0rd)";
            } else {

            }
          } else {
            if (IsPasswordValid(D_FIELD_S["password"].d_input.value)) {
              HandleNodeStates(D_FIELD_S["password"].d_li, STATES.VALID);
              HandleNodeStates(D_FIELD_S["password"].d_label, STATES.VALID);
              D_FIELD_S["password"].d_label.innerText = "PASSWORD";
              D_FIELD_S["password"].d_label.innerText = "CONFIRM PASSWORD";
            } else {
              HandleNodeStates(D_FIELD_S["password"].d_li, STATES.ERROR);
              HandleNodeStates(D_FIELD_S["password"].d_label, STATES.ERROR);
              D_FIELD_S["password"].d_label.innerText =
                "PASSWORD (sample: P@ssw0rd)";
            }
          }
        }
      });
      break;
  }
}

const HandleNodeStates = (d_node, state) => {
  for (const key in STATES) {
    if (STATES.hasOwnProperty(key)) {
      d_node.classList.remove(STATES[key]);
    }
  }
  d_node.classList.add(state);
};
