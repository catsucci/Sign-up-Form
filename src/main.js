("use strict");

/**
 * main.js
 * Main JavaScript file for the project
 * Note on variable naming:
 * full uppercase names are for constants,
 * d_/D_ stands for DOM element,
 * _S/_s stands for multiple instances.
 * Author: Catsucci
 * Created: 2024-08-19
 */

import {
  IsPasswordValid,
  IsEmpty,
  IsPasswordsMatching,
  IsValid,
} from "./utils/utils.js";

const STATES = {
  VALID: "valid",
  ERROR: "error",
  WARNING: "warning",
  NILL: null,
};

let d_fields_s = {};

let passwords_matching = null;
document.querySelectorAll("li").forEach((d_li) => {
  let name = d_li.querySelector("input").getAttribute("name");
  d_fields_s[name] = {
    d_li: d_li,
    d_label: d_li.querySelector("label"),
    d_input: d_li.querySelector("input"),
  };
});

for (const name in d_fields_s) {
  d_fields_s[name].d_input.addEventListener("focus", () => {
    d_fields_s[name].d_li.classList.add("in-focus");
  });

  d_fields_s[name].d_input.addEventListener("blur", () => {
    d_fields_s[name].d_li.classList.remove("in-focus");
  });

  switch (name) {
    case "first_name":
    case "last_name":
    case "email":
    case "phone_number":
      d_fields_s[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsValid(event.target.value, name)) {
            HandleNodeStates(d_fields_s[name].d_li, STATES.VALID);
            HandleNodeStates(d_fields_s[name].d_label, STATES.VALID);
          } else {
            HandleNodeStates(d_fields_s[name].d_li, STATES.ERROR);
            HandleNodeStates(d_fields_s[name].d_label, STATES.ERROR);
          }
        } else {
          HandleNodeStates(d_fields_s[name].d_li, STATES.NILL);
          HandleNodeStates(d_fields_s[name].d_label, STATES.NILL);
        }
      });
      break;
    case "password":
    case "confirm_password":
      d_fields_s[name].state = STATES.NILL;
      d_fields_s[name].d_input.addEventListener("input", (event) => {
        if (IsEmpty(event.target.value)) {
          d_fields_s[name].state = STATES.NILL;
        } else if (IsPasswordValid(event.target.value)) {
          d_fields_s[name].state = STATES.VALID;
        } else {
          d_fields_s[name].state = STATES.ERROR;
        }

        if (
          !(d_fields_s[name].state === STATES.NILL) &&
          d_fields_s[GetCorrespondingField(name)].state === STATES.VALID
        ) {
          passwords_matching = IsPasswordsMatching(
            d_fields_s[name].d_input.value,
            d_fields_s[GetCorrespondingField(name)].d_input.value,
          );
        }

        if (
          !passwords_matching &&
          ((!(d_fields_s[name].state === STATES.NILL) &&
            d_fields_s[GetCorrespondingField(name)].state === STATES.VALID) ||
            (!(d_fields_s[GetCorrespondingField(name)].state === STATES.NILL) &&
              d_fields_s[name].state === STATES.VALID))
        ) {
          HandleNodeStates(d_fields_s[name].d_li, STATES.WARNING);
          HandleNodeStates(d_fields_s[name].d_label, STATES.WARNING);
          HandleNodeStates(
            d_fields_s[GetCorrespondingField(name)].d_li,
            STATES.WARNING,
          );
          HandleNodeStates(
            d_fields_s[GetCorrespondingField(name)].d_label,
            STATES.WARNING,
          );
          d_fields_s[name].d_label.childNodes[0].nodeValue =
            "PASSWORDS DO NOT MATCH";
          d_fields_s[
            GetCorrespondingField(name)
          ].d_label.childNodes[0].nodeValue = "PASSWORDS DO NOT MATCH";
          return;
        }

        switch (d_fields_s[name].state) {
          case STATES.VALID:
            HandleNodeStates(d_fields_s[name].d_li, STATES.VALID);
            HandleNodeStates(d_fields_s[name].d_label, STATES.VALID);
            d_fields_s[name].d_label.childNodes[0].nodeValue =
              name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
            break;
          case STATES.ERROR:
            HandleNodeStates(d_fields_s[name].d_li, STATES.ERROR);
            HandleNodeStates(d_fields_s[name].d_label, STATES.ERROR);
            d_fields_s[name].d_label.childNodes[0].nodeValue =
              "PASSWORD (sample: P@ssw0rd)";
            break;
          case STATES.NILL:
            HandleNodeStates(d_fields_s[name].d_li, STATES.NILL);
            HandleNodeStates(d_fields_s[name].d_label, STATES.NILL);
            d_fields_s[name].d_label.childNodes[0].nodeValue =
              name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
            break;
        }

        switch (d_fields_s[GetCorrespondingField(name)].state) {
          case STATES.VALID:
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_li,
              STATES.VALID,
            );
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_label,
              STATES.VALID,
            );
            d_fields_s[
              GetCorrespondingField(name)
            ].d_label.childNodes[0].nodeValue =
              GetCorrespondingField(name) === "password"
                ? "PASSWORD"
                : "CONFIRM PASSWORD";
            break;
          case STATES.ERROR:
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_li,
              STATES.ERROR,
            );
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_label,
              STATES.ERROR,
            );
            d_fields_s[
              GetCorrespondingField(name)
            ].d_label.childNodes[0].nodeValue = "PASSWORD (sample: P@ssw0rd)";
            break;
          case STATES.NILL:
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_li,
              STATES.NILL,
            );
            HandleNodeStates(
              d_fields_s[GetCorrespondingField(name)].d_label,
              STATES.NILL,
            );
            d_fields_s[
              GetCorrespondingField(name)
            ].d_label.childNodes[0].nodeValue =
              GetCorrespondingField(name) === "password"
                ? "PASSWORD"
                : "CONFIRM PASSWORD";
            break;
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

const GetCorrespondingField = (field_name) => {
  const field_map = {
    password: "confirm_password",
    confirm_password: "password",
  };

  return field_map[field_name];
};
