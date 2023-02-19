import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./reducers/billReducer";

export const store = configureStore({
  reducer: {
    bills: billReducer,
  },
});
