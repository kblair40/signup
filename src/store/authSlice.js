import { createSlice } from "@reduxjs/toolkit";

const validators = {
  usernameLength: (username) =>
    // must be at least 7 characters and no more than 15 characters
    username.length >= 7 && username.length <= 15,
  usernameChars: (username) => {
    const regex = /^[a-z0-9]+$/i;
    return regex.test(username);
  },
  emailChars: (email) => {
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
  PasswordsMatch: false,
  errorModalShowing: false,
  errorMessage: "",
  // isLoggedIn: false,
  isLoggedIn: Boolean(localStorage.getItem("token")),
  token: localStorage.getItem("token"),
  remainingTime: localStorage.getItem("expirationTime"),
  mode: "signup",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    handleUsernameChange(state, action) {
      const { username } = action.payload;
      const isInvalidLength = !validators.usernameLength(username);
      const hasInvalidChars = !validators.usernameChars(username);
      console.log("USERNAME");
      // console.log("usernameInput:", username);
      console.log("isInvalidLength:", isInvalidLength);
      console.log("hasInvalidChars:", hasInvalidChars, "\n\n");
      state.usernameInput = username;
      state.usernameHasInvalidChars = hasInvalidChars;
      state.usernameHasInvalidLength = isInvalidLength;
    },
    handleEmailChange(state, action) {
      const { email } = action.payload;
      const isValidFormat = validators.emailChars(email);
      console.log("Email");
      // console.log("emailInput:", email);
      console.log("isValidFormat:", isValidFormat, "\n\n");
      state.emailInput = email;
      state.emailHasError = isValidFormat;
    },
    handlePasswordChange(state, action) {
      const { password } = action.payload;
      const isInvalidLength = !validators.passwordLength(password);
      const hasInvalidChars = !validators.passwordChars(password);
      console.log("Password");
      // console.log("passwordInput:", password);
      console.log("isInvalidLength:", isInvalidLength);
      console.log("hasInvalidChars:", hasInvalidChars, "\n\n");
      state.passwordInput = password;
      state.passwordHasInvalidChars = hasInvalidChars;
      state.passwordHasInvalidLength = isInvalidLength;
    },
    handleConfirmPasswordChange(state, action) {
      const { confirmPassword } = action.payload;
      const passwordsMatch = validators.passwordsMatch(
        confirmPassword,
        state.passwordInput
      );
      console.log("confirmPassword:", confirmPassword);
      console.log("passwordsMatch:", passwordsMatch, "\n\n");
      state.confirmPasswordInput = confirmPassword;
      state.passwordsMatch = passwordsMatch;
    },
    clearForm(state) {
      state.usernameInput = "";
      state.emailInput = "";
      state.passwordInput = "";
      state.confirmPasswordInput = "";
      // I MAY ALSO NEED TO RESET ALL ERRORS TO FALSE
    },
    login(state, action) {
      const { token, expTime } = action.payload;
      console.log("token:", token, "\nexpTime:", expTime);

      state.token = token;
      state.remainingTime = expTime;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expTime);
    },
    logout(state) {
      state.token = null;
      state.expirationTime = 0;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },
    setError(state, action) {
      const { msg } = action.payload;
      console.log("SETTING ERROR MESSAGE TO", msg);
      state.errorMessage = msg;
      state.errorModalShowing = true;
    },
    closeErrorModal(state) {
      state.errorMessage = "";
      state.errorModalShowing = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
