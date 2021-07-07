import { createSlice } from "@reduxjs/toolkit";

// taken from https://usbrandcolors.com/twitter-colors/
const colors = {
  twitter: {
    main: "#1DA1F2",
    black: "#14171A",
    darkGray: "#657786",
    lightGray: "#AAB8C2",
    red: "#E0245E",
  },
  google: {
    red: "#DB4437",
    main: "#4285F4",
    yellow: "#F4B400",
    green: "#0F9D58",
    black: "#1A1A1A",
    gray: "#808080",
  },
  github: {
    main: "#24292d",
    darkBlue: "#0366D6",
  },
};

const fonts = {
  twitter: "system-ui",
  google: "Roboto",
  github: "system-ui",
};

const providerSlice = createSlice({
  name: "provider",
  initialState: {
    authProvider: "email",
    colors: {},
    font: "",
  },
  reducers: {
    setProvider(state, action) {
      let { provider } = action.payload;
      provider = provider.split(".")[0];
      state.authProvider = provider;
      state.colors = colors[provider];
      state.font = fonts[provider];
    },
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice.reducer;