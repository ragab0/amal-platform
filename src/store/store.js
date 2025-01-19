import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cvsReducer from "./features/cvs/cvsSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";
import adminReducer from "./features/admin/adminSlice";
import aiReducer from "./features/ai/aiSlice";
import supportReducer from "./features/support/supportSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import servicesReducer from "./features/services/servicesSlice";
import paymentReducer from "./features/payment/paymentSlice";
import logger from "redux-logger";

// create a redux store INSTACE per each request INSTEAD of defining it as a global ONCE;
export function makeStore(preloadedState = {}) {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: {
      auth: authReducer,
      cvs: cvsReducer,
      reviews: reviewsReducer,
      admin: adminReducer,
      ai: aiReducer,
      notifications: notificationsReducer,
      support: supportReducer,
      services: servicesReducer,
      payment: paymentReducer,
    },
    preloadedState,
    middleware: function (getDefaultMiddles) {
      const middlewares = getDefaultMiddles();
      if (process.env.NODE_ENV === "development") {
        middlewares.push(logger);
      }
      return middlewares;
    },
  });
}
