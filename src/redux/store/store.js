import { configureStore } from "@reduxjs/toolkit";

import launchReducer from "../slices/launchesSlice";

export const store = configureStore({
  reducer: {
    launches: launchReducer,
  },
});
