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
    const endRegex = /net|com|org|info|biz|pro|cat|edu$/i;
    return generalRegex.test(email) && endRegex.test(email);
  },
  passwordChars: (password) => {
    console.log("password received:", password);
    const regex = /^[a-zA-Z0-9_!@$&*]{1,20}$/i;
    console.log("returning", regex.test(password));
    return regex.test(password);
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
      const { token, expTime } = action.payload;

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
