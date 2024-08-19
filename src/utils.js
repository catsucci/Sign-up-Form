"use strict";

/**
 * utils.js
 * utility functions
 * Author: Catsucci
 * Created: 2024-08-19
 */

export const IsNameValid = (text) => {
  return !(/\d/.test(text) || text.length < 2);
};

export const IsEmailValid = (text) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
};

export const IsPhoneNumberValid = (text) => {
  return /^\d{10}$/.test(text);
};

export const IsPasswordValid = (text) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    text,
  );
};

export const IsEmpty = (text) => {
  return text === "";
};

export const IsPasswordsMatching = (
  first_password_instance,
  second_password_instance,
) => {
  return first_password_instance === second_password_instance;
};
