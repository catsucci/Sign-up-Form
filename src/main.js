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
      console.log(D_FIELD_S[name].d_input.value);
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsNameValid(event.target.value)) {
            D_FIELD_S[name].d_li.classList.remove("error");
            D_FIELD_S[name].d_li.classList.add("valid");
            D_FIELD_S[name].d_label.classList.remove("label-error");
            D_FIELD_S[name].d_label.classList.add("label-valid");
          } else {
            D_FIELD_S[name].d_li.classList.remove("valid");
            D_FIELD_S[name].d_li.classList.add("error");
            D_FIELD_S[name].d_label.classList.remove("label-valid");
            D_FIELD_S[name].d_label.classList.add("label-error");
          }
        } else {
          D_FIELD_S[name].d_li.classList.remove("valid", "error");
          D_FIELD_S[name].d_label.classList.remove("label-valid", "label-error");
        }
      });
      break;
    case "email":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsEmailValid(event.target.value)) {
            D_FIELD_S[name].d_li.classList.remove("error");
            D_FIELD_S[name].d_li.classList.add("valid");
            D_FIELD_S[name].d_label.classList.remove("label-error");
            D_FIELD_S[name].d_label.classList.add("label-valid");
          } else {
            D_FIELD_S[name].d_li.classList.remove("valid");
            D_FIELD_S[name].d_li.classList.add("error");
            D_FIELD_S[name].d_label.classList.remove("label-valid");
            D_FIELD_S[name].d_label.classList.add("label-error");
          }
        } else {
          D_FIELD_S[name].d_li.classList.remove("valid", "error");
          D_FIELD_S[name].d_label.classList.remove("label-valid", "label-error");
        }
      });
      break;
    case "phone_number":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsPhoneNumberValid(event.target.value)) {
            D_FIELD_S[name].d_li.classList.remove("error");
            D_FIELD_S[name].d_li.classList.add("valid");
            D_FIELD_S[name].d_label.classList.remove("label-error");
            D_FIELD_S[name].d_label.classList.add("label-valid");
          } else {
            D_FIELD_S[name].d_li.classList.remove("valid");
            D_FIELD_S[name].d_li.classList.add("error");
            D_FIELD_S[name].d_label.classList.remove("label-valid");
            D_FIELD_S[name].d_label.classList.add("label-error");
          }
        } else {
          D_FIELD_S[name].d_li.classList.remove("valid", "error");
          D_FIELD_S[name].d_label.classList.remove("label-valid", "label-error");
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
          D_FIELD_S["password"].d_label.classList.remove(
            "label-warning",
            "label-valid",
            "label-error",
          );
          D_FIELD_S["confirm_password"].d_label.classList.remove(
            "label-warning",
            "label-valid",
            "label-error",
          );
          D_FIELD_S["password"].d_li.classList.remove(
            "valid",
            "error",
            "warning",
          );
          D_FIELD_S["confirm_password"].d_li.classList.remove(
            "valid",
            "error",
            "warning",
          );
          D_FIELD_S["password"].d_label.innerText = "PASSWORD";
          D_FIELD_S["confirm_password"].d_label.innerText = "CONFIRM PASSWORD";
        } else if (IsEmpty(D_FIELD_S[name].d_input.value)) {
          D_FIELD_S[name].d_li.classList.remove("valid", "error", "warning");
          D_FIELD_S[name].d_label.classList.remove(
            "label-warning",
            "label-valid",
            "label-error",
          );
          D_FIELD_S[name].d_label.innerText =
            name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
        } else if (IsPasswordValid(event.target.value)) {
          D_FIELD_S[name].d_li.classList.remove("error");
          D_FIELD_S[name].d_label.classList.remove("label-error");
          D_FIELD_S[name].d_li.classList.add("valid");
          D_FIELD_S[name].d_label.classList.add("label-valid");
          D_FIELD_S[name].d_label.innerText =
            name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
        } else {
          D_FIELD_S[name].d_li.classList.remove("valid", "warning");
          D_FIELD_S[name].d_label.classList.remove("label-valid", "label-warning");
          D_FIELD_S[name].d_li.classList.add("error");
          D_FIELD_S[name].d_label.classList.add("label-error");
          D_FIELD_S[name].d_label.innerText =
            "PASSWORD (sample: P@ssw0rd)";
        }
        if (
          !(
            IsEmpty(D_FIELD_S["password"].d_input.value) ||
            IsEmpty(D_FIELD_S["confirm_password"].d_input.value)
          )
        ) {
          if (
            !IsPasswordsMatching(
              D_FIELD_S["password"].d_input.value,
              D_FIELD_S["confirm_password"].d_input.value,
            )
          ) {
            D_FIELD_S["password"].d_li.classList.remove("valid", "error");
            D_FIELD_S["confirm_password"].d_li.classList.remove(
              "valid",
              "error",
            );
            D_FIELD_S["password"].d_li.classList.add("warning");
            D_FIELD_S["confirm_password"].d_li.classList.add("warning");
            D_FIELD_S["password"].d_label.innerText = "PASSWORDS DO NOT MATCH";
            D_FIELD_S["confirm_password"].d_label.innerText =
              "PASSWORDS DO NOT MATCH";
            D_FIELD_S["password"].d_label.classList.add("label-warning");
            D_FIELD_S["confirm_password"].d_label.classList.add(
              "label-warning",
            );
          } else {
            D_FIELD_S["password"].d_li.classList.remove("error", "warning");
            D_FIELD_S["confirm_password"].d_li.classList.remove("error", "warning");
            D_FIELD_S["password"].d_li.classList.add("valid");
            D_FIELD_S["confirm_password"].d_li.classList.add("valid");
            D_FIELD_S["password"].d_label.innerText = "PASSWORD";
            D_FIELD_S["confirm_password"].d_label.innerText =
              "CONFIRM PASSWORD";
            D_FIELD_S["password"].d_label.classList.remove("label-warning");
            D_FIELD_S["confirm_password"].d_label.classList.remove(
              "label-warning",
            );
          }
        }
      });
      break;
  }
}
//
//D_INPUT_S.text_s.forEach((d_text) => {
//  d_text.addEventListener("input", (event) => {
//    let value = event.target.value;
//    if (!/\d/.test(value)) {
//      d_text.classList.remove("in-focus");
//      d_text.classList.add("error");
//      console.log("hmar");
//    }
//  });
//});
