import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  usernameInput: "",
  usernameHasError: false,
  emailInput: "",
  emailHasError: false,
  passwordInput: "",
  passwordHasError: false,
  confirmPasswordInput: "",
  confirmPasswordHasError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
