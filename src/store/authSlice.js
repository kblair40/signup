import { createSlice } from "@reduxjs/toolkit";

const validators = {
  usernameLength: (username) =>
    // must be at least 7 characters and no more than 15 characters
    username.length >= 7 && username.length <= 15,
  usernameCharacters: (username) => {
    const regex = /^[a-z0-9]+$/i;
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
  reducers: {
    handleUsernameChange(state, action) {
      const { username } = action.payload;
      const isInvalidLength = !validators.usernameLength(username);
      const hasInvalidChars = !validators.usernameCharacters(username);
      console.log("USERNAME");
      console.log("usernameInput:", username);
      console.log("isInvalidLength:", isInvalidLength);
      console.log("hasInvalidChars:", hasInvalidChars, "\n\n");
      state.usernameInput = username;
      state.usernameHasInvalidChars = hasInvalidChars;
      state.usernameHasInvalidLength = isInvalidLength;
    },
    handleEmailChange(state, action) {
      const { email } = action.payload;
      const isValidFormat = validators.emailCharacters(email);
      console.log("Email");
      console.log("emailInput:", email);
      console.log("isValidFormat:", isValidFormat, "\n\n");
      state.emailInput = email;
      state.emailHasError = isValidFormat;
    },
    clearForm(state) {
      state.usernameInput = "";
      state.emailInput = "";
      state.passwordInput = "";
      state.confirmPasswordInput = "";
      // I MAY ALSO NEED TO RESET ALL ERRORS TO FALSE
    },
    // emailInput: "",
    // emailHasError: false,
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
