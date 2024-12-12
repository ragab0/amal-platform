import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cvsReducer from "./features/cvs/cvsSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";
import logger from "redux-logger";

// create a redux store INSTACE per each request INSTEAD of defining it as a global ONCE;
export function makeStore(preloadedState = {}) {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: {
      auth: authReducer,
      cvs: cvsReducer,
      reviews: reviewsReducer,
    },
    preloadedState,
    middleware: function (getDefaultMiddles) {
      return process.env.NODE_ENV === "development..........."
        ? getDefaultMiddles().concat(logger)
        : getDefaultMiddles();
    },
  });
}
