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
    const generalRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const endRegex = /net|com|org|info|biz|pro|cat|gov|edu$/i;
    return generalRegex.test(email) && endRegex.test(email);
  },
  passwordChars: (password) => {
    const regex = /^[a-zA-Z0-9_!@$&*]{1,20}$/i;
    return regex.test(password);
  },
  passwordLength: (password) =>
    // must be at least 8 characters and no more than 16 characters
    password.length >= 8 && password.length <= 16,
  passwordsMatch: (pwd1, pwd2) => pwd1 === pwd2,
};

const initialAuthState = {
  usernameInput: "",
  usernameHasInvalidLength: true,
  usernameHasInvalidChars: true,
  emailInput: "",
  emailHasError: false,
  passwordInput: "",
  passwordHasInvalidLength: true,
  passwordHasInvalidChars: true,
  passwordHasDigit: false,
  confirmPasswordInput: "",
  PasswordsMatch: false,
  errorModalShowing: false,
  errorMessage: "",
  isLoggedIn: Boolean(localStorage.getItem("token")),
  token: localStorage.getItem("token"),
  mode: "signup",
  formIsValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    handleUsernameChange(state, action) {
      const { username } = action.payload;
      const isInvalidLength = !validators.usernameLength(username);
      const hasInvalidChars = !validators.usernameChars(username);

      state.usernameInput = username;
      state.usernameHasInvalidChars = hasInvalidChars;
      state.usernameHasInvalidLength = isInvalidLength;
    },
    handleEmailChange(state, action) {
      const { email } = action.payload;
      const isValidFormat = validators.emailChars(email);
      const validEmailEnd = (state.emailInput = email);
      state.emailHasError = isValidFormat && validEmailEnd;
    },
    handlePasswordChange(state, action) {
      const { password } = action.payload;
      const isInvalidLength = !validators.passwordLength(password);
      const hasInvalidChars = !validators.passwordChars(password);
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
      state.confirmPasswordInput = confirmPassword;
      state.passwordsMatch = passwordsMatch;
    },
    clearForm(state) {
      state.usernameInput = "";
      state.emailInput = "";
      state.passwordInput = "";
      state.confirmPasswordInput = "";
    },
    login(state, action) {
      const { token } = action.payload;
      state.token = token;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "colors",
        JSON.stringify({
          main: "#212121",
          black: "#0c0c0d",
          red: "#ff4244",
        })
      );
      localStorage.setItem("provider", "email");
    },
    logout(state) {
      state.token = null;
      state.expirationTime = 0;
      state.isLoggedIn = false;
      localStorage.removeItem("colors");
      localStorage.removeItem("font");
      localStorage.removeItem("mainColor");
      localStorage.removeItem("token");
      localStorage.removeItem("provider");
    },
    setError(state, action) {
      const { msg } = action.payload;

      state.errorMessage = msg;
      state.errorModalShowing = true;
    },
    closeErrorModal(state) {
      state.errorMessage = "";
      state.errorModalShowing = false;
    },
    setPasswordHasDigit(state) {
      state.passwordHasDigit = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
