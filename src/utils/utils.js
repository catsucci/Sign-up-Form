"use strict";

/**
 * utils.js
 * utility functions
 * Author: Catsucci
 * Created: 2024-08-19
 */

const IsNameValid = (text) => {
  return !(/\d/.test(text) || text.length < 2);
};

const IsEmailValid = (text) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
};

const IsPhoneNumberValid = (text) => {
  return /^\d{10}$/.test(text);
};

export const IsPasswordValid = (text) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    text,
  );
};

export const IsValid = (text, name) => {
  switch (name) {
    case "first_name":
    case "last_name":
      return IsNameValid(text);
    case "email":
      return IsEmailValid(text);
    case "phone_number":
      return IsPhoneNumberValid(text);
  }
};

export const IsEmpty = (text) => {
  return text === "";
};

export const IsPasswordsMatching = (
  first_password_instance,
  second_password_instance,
) => {
  if (first_password_instance === null || second_password_instance === null) {
    return false;
  }
  return first_password_instance === second_password_instance;
};
