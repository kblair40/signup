import { createSlice } from "@reduxjs/toolkit";

const validators = {
  usernameLength: (username) =>
    // must be at least 7 characters and no more than 15 characters
    username.length >= 7 && username.length <= 15,
  usernameCharacters: (username) => {
    const regex = /^[a-z0-9]$/i;
    return regex.test(username);
  },
  emailCharacters: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  passwordChars: (password) => {
    const regex = /^[a-z0-9?!@#$%^&*]$/i;
  },
  passwordLength: (password) =>
    // must be at least 8 characters and no more than 16 characters
    password.length >= 8 && password.length <= 16,
  passwordsMatch: (pwd1, pwd2) => pwd1 === pwd2,
};

const initialAuthState = {
  usernameInput: "",
  usernameHasInvalidLength: false,
  usernameHasInvalidChars: false,
  emailInput: "",
  emailHasError: false,
  passwordInput: "",
  passwordHasInvalidLength: false,
  passwordHasInvalidChars: false,
  confirmPasswordInput: "",
  confirmPasswordHasInvalidLength: false,
  confirmPasswordHasInvalidChars: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
