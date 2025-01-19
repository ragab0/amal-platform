import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  logout,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
  generateVerificationCode,
} from "./authThunks";
import {
  updateProfileAccountInfo,
  updateProfileBasicInfo,
  updateProfileImage,
} from "../users/usersThunks";

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: () => initialState,
    setUserReview: (state, { payload }) => {
      console.log("############", payload);

      state.user.myReview = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 01 Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })

      // 02 Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.result || {};
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.error = payload.result?.message;
      })

      // 03 Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })

      // 04 Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.result || {};
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.error = payload.result?.message;
      })

      /** verifcations */
      // 01 Generate Verification Code
      .addCase(generateVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateVerificationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateVerificationCode.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })

      // 02 Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })

      // 02 Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })

      // 03 Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.isInitialized = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.isInitialized = true;
      })

      /** my profile */
      // basicInfo
      .addCase(updateProfileBasicInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileBasicInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.result || {};
      })
      .addCase(updateProfileBasicInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })
      // accountInfo
      .addCase(updateProfileAccountInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAccountInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.result || {};
      })
      .addCase(updateProfileAccountInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      })
      // image upload;
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.photo = payload.result.photo || "";
      })
      .addCase(updateProfileImage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result?.message;
      });
  },
});

export const { clearError, resetAuth, setUserReview } = authSlice.actions;
export default authSlice.reducer;
