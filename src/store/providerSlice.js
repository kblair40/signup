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
    main: "#4285F4",
    red: "#DB4437",
    yellow: "#F4B400",
    green: "#0F9D58",
    black: "#1A1A1A",
    gray: "#808080",
  },
  github: {
    main: "#24292d",
    darkBlue: "#0366D6",
    red: "#CB2532",
  },
  email: {
    main: "#212121",
    black: "#0c0c0d",
    red: "#ff4244",
  },
};

const fonts = {
  twitter: "system-ui",
  google: "Roboto",
  github: "system-ui",
  email: "Montserrat",
};

const providerSlice = createSlice({
  name: "provider",
  initialState: {
    authProvider: localStorage.getItem("provider"),
    colors: localStorage.getItem("colors") || {},
    font: localStorage.getItem("font"),
  },
  reducers: {
    setProvider(state, action) {
      let { provider } = action.payload;
      provider = provider.split(".")[0];
      state.authProvider = provider;
      state.colors = colors[provider];
      state.font = fonts[provider];
      localStorage.setItem("colors", JSON.stringify(colors[provider]));
      localStorage.setItem("font", JSON.stringify(fonts[provider]));
      localStorage.setItem("provider", provider);
      localStorage.setItem("mainColor", colors[provider].main);
    },
    clearStyles(state) {
      state.colors = {};
      state.font = undefined;
      state.authProvider = "email";
    },
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice.reducer;
