import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
  fetchStats,
} from "./adminThunks";

const initialState = {
  users: {
    results: [],
    stats: {
      total: 0,
      active: 0,
      experts: 0,
      admins: 0,
    },
    isInitialized: null,
    loading: false,
    error: null,
  },
  jobs: {
    results: [],
    isInitialized: null,
    loading: false,
    error: null,
  },
  reviews: {
    results: [],
    isInitialized: null,
    loading: false,
    error: null,
  },
  stats: {
    apiData: {
      users: { total: 0, normal: 0, admin: 0 },
      jobs: { total: 0, active: 0, inactive: 0 },
      reviews: { total: 0 },
    },
    isInitialized: null,
    loading: false,
    error: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    // Users
    builder
      // 00
      .addCase(fetchStats.pending, (state) => {
        state.stats.loading = true;
        state.stats.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, { payload }) => {
        state.stats.loading = false;
        state.stats.isInitialized = true;
        state.stats.apiData = payload.result;
      })
      .addCase(fetchStats.rejected, (state, { payload }) => {
        state.stats.loading = false;
        state.stats.isInitialized = true;
        state.stats.error = payload.result?.message;
      })

      // 01
      .addCase(fetchUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users.isInitialized = true;
        state.users.loading = false;
        state.users.results = payload.results;
        // state.users.stats = payload.result?.stats;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.users.isInitialized = true;
        state.users.loading = false;
        state.users.error = payload.result?.message;
      })
      // 02
      .addCase(updateUser.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.users.loading = false;
        state.users.results = payload.result?.list;
        // // state.users.stats = payload.result?.stats;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.users.loading = false;
        state.users.error = payload.result?.message;
      })
      // 03
      .addCase(deleteUser.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users.loading = false;
        state.users.results = payload.result?.list;
        // // state.users.stats = payload.result?.stats;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.users.loading = false;
        state.users.error = payload.result?.message;
      });

    // Jobs
    builder
      // 01
      .addCase(fetchJobs.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, { payload }) => {
        state.jobs.isInitialized = true;
        state.jobs.loading = false;
        state.jobs.results = payload.results;
      })
      .addCase(fetchJobs.rejected, (state, { payload }) => {
        state.jobs.isInitialized = true;
        state.jobs.loading = false;
        state.jobs.error = payload.result?.message;
      })
      // 02
      .addCase(createJob.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.results = payload.results;
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.error = payload.result?.message;
      })
      // 03
      .addCase(updateJob.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(updateJob.fulfilled, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.results = payload.results;
      })
      .addCase(updateJob.rejected, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.error = payload.result?.message;
      })
      // 04
      .addCase(deleteJob.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.results = payload.results;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.jobs.loading = false;
        state.jobs.error = payload.result?.message;
      });

    // Reviews
    builder
      // 01
      .addCase(fetchReviews.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.reviews.isInitialized = true;
        state.reviews.loading = false;
        state.reviews.results = payload.results;
      })
      .addCase(fetchReviews.rejected, (state, { payload }) => {
        state.reviews.isInitialized = true;
        state.reviews.loading = false;
        state.reviews.error = payload.result?.message;
      })
      // 02
      .addCase(createReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.results = payload.results;
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.error = payload.result?.message;
      })
      // 03
      .addCase(updateReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.results = payload.results;
      })
      .addCase(updateReview.rejected, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.error = payload.result?.message;
      })
      // 04
      .addCase(deleteReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.results = payload.results;
      })
      .addCase(deleteReview.rejected, (state, { payload }) => {
        state.reviews.loading = false;
        state.reviews.error = payload.result?.message;
      });
  },
});

export default adminSlice.reducer;
