("use strict");

/**
 * main.js
 * Main JavaScript file for the project
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

let D_FIELD_S = {};

let passwords_matching = null;
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
    case "email":
    case "phone_number":
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (!IsEmpty(event.target.value)) {
          if (IsValid(event.target.value, name)) {
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
    //case "email":
    //  D_FIELD_S[name].d_input.addEventListener("input", (event) => {
    //    if (!IsEmpty(event.target.value)) {
    //      if (IsEmailValid(event.target.value)) {
    //        HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
    //        HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
    //      } else {
    //        HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
    //        HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
    //      }
    //    } else {
    //      HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
    //      HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
    //    }
    //  });
    //  break;
    //case "phone_number":
    //  D_FIELD_S[name].d_input.addEventListener("input", (event) => {
    //    if (!IsEmpty(event.target.value)) {
    //      if (IsPhoneNumberValid(event.target.value)) {
    //        HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
    //        HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
    //      } else {
    //        HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
    //        HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
    //      }
    //    } else {
    //      HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
    //      HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
    //    }
    //  });
    //break;
    case "password":
    case "confirm_password":
      D_FIELD_S[name].state = STATES.NILL;
      D_FIELD_S[name].d_input.addEventListener("input", (event) => {
        if (IsEmpty(event.target.value)) {
          D_FIELD_S[name].state = STATES.NILL;
        } else if (IsPasswordValid(event.target.value)) {
          D_FIELD_S[name].state = STATES.VALID;
        } else {
          D_FIELD_S[name].state = STATES.ERROR;
        }

        if (
          !(D_FIELD_S[name].state === STATES.NILL) &&
          D_FIELD_S[GetCorrespondingField(name)].state === STATES.VALID
        ) {
          passwords_matching = IsPasswordsMatching(
            D_FIELD_S[name].d_input.value,
            D_FIELD_S[GetCorrespondingField(name)].d_input.value,
          );
        }

        if (
          !passwords_matching &&
          ((!(D_FIELD_S[name].state === STATES.NILL) &&
            D_FIELD_S[GetCorrespondingField(name)].state === STATES.VALID) ||
            (!(D_FIELD_S[GetCorrespondingField(name)].state === STATES.NILL) &&
              D_FIELD_S[name].state === STATES.VALID))
        ) {
          HandleNodeStates(D_FIELD_S[name].d_li, STATES.WARNING);
          HandleNodeStates(D_FIELD_S[name].d_label, STATES.WARNING);
          HandleNodeStates(
            D_FIELD_S[GetCorrespondingField(name)].d_li,
            STATES.WARNING,
          );
          HandleNodeStates(
            D_FIELD_S[GetCorrespondingField(name)].d_label,
            STATES.WARNING,
          );
          D_FIELD_S[name].d_label.childNodes[0].nodeValue =
            "PASSWORDS DO NOT MATCH";
          D_FIELD_S[
            GetCorrespondingField(name)
          ].d_label.childNodes[0].nodeValue = "PASSWORDS DO NOT MATCH";
          return;
        }

        switch (D_FIELD_S[name].state) {
          case STATES.VALID:
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.VALID);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.VALID);
            D_FIELD_S[name].d_label.childNodes[0].nodeValue =
              name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
            break;
          case STATES.ERROR:
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.ERROR);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.ERROR);
            D_FIELD_S[name].d_label.childNodes[0].nodeValue =
              "PASSWORD (sample: P@ssw0rd)";
            break;
          case STATES.NILL:
            HandleNodeStates(D_FIELD_S[name].d_li, STATES.NILL);
            HandleNodeStates(D_FIELD_S[name].d_label, STATES.NILL);
            D_FIELD_S[name].d_label.childNodes[0].nodeValue =
              name === "password" ? "PASSWORD" : "CONFIRM PASSWORD";
            break;
        }

        switch (D_FIELD_S[GetCorrespondingField(name)].state) {
          case STATES.VALID:
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_li,
              STATES.VALID,
            );
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_label,
              STATES.VALID,
            );
            D_FIELD_S[
              GetCorrespondingField(name)
            ].d_label.childNodes[0].nodeValue =
              GetCorrespondingField(name) === "password"
                ? "PASSWORD"
                : "CONFIRM PASSWORD";
            break;
          case STATES.ERROR:
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_li,
              STATES.ERROR,
            );
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_label,
              STATES.ERROR,
            );
            D_FIELD_S[
              GetCorrespondingField(name)
            ].d_label.childNodes[0].nodeValue = "PASSWORD (sample: P@ssw0rd)";
            break;
          case STATES.NILL:
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_li,
              STATES.NILL,
            );
            HandleNodeStates(
              D_FIELD_S[GetCorrespondingField(name)].d_label,
              STATES.NILL,
            );
            D_FIELD_S[
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
