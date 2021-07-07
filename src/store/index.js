import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import providerReducer from "./providerSlice";

const store = configureStore({
  reducer: { auth: authReducer, provider: providerReducer },
});

export default store;
