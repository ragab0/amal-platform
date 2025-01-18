import { createSlice } from "@reduxjs/toolkit";
import { templatesApi } from "@/assets/data/templatesData";
import {
  getCV,
  updateCV,
  getAllCVs,
  createCv,
  setMyCVOptions,
  updateFontOptions,
} from "./cvsThunks";

const initialState = {
  // User's personal CV
  myCV: {},
  myCVoptionsLoading: false,
  myCVOptions: {},
  myCVFontOptions: {
    fontFamily: "cairo",
    fontSize: 11,
    titleFontSize: 15,
  },
  loading: false,
  isInitialized: false,
  error: null,
  // Public CVs (NOT SET YET)
  publicCvs: {
    loading: false,
    isInitialized: false,
    error: null,
    // api coming data;
    cvs: [],
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
  },
};

const cvsSlice = createSlice({
  name: "cvs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCVs: () => initialState,
    setCurrentPage: (state, action) => {
      state.publicCvs.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get My CV
    builder
      .addCase(getCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCV.fulfilled, (state, action) => {
        state.loading = false;
        state.myCV = action.payload.result;
        state.isInitialized = true;
        if (templatesApi) {
          state.myCVOptions =
            templatesApi?.find(
              (template) =>
                template?.id === action?.payload?.result?.options?.templateId
            )?.customizeOptions || {};
        }
      })
      .addCase(getCV.rejected, (state, { payload }) => {
        state.loading = false;
        state.isInitialized = true;
        state.error = payload.result;
      })

      // Create new CV:
      .addCase(createCv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state, action) => {
        state.loading = false;
        state.myCV = action.payload.result;
      })
      .addCase(createCv.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result;
      })

      // Update My CV
      .addCase(updateCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCV.fulfilled, (state, action) => {
        const cv = action.payload.result || {};
        const [fieldName] = Object.keys(cv);
        state.loading = false;
        if (fieldName) {
          state.myCV[fieldName] = cv[fieldName];
        }
      })
      .addCase(updateCV.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.result;
      })

      // Admin: Get All CVs
      .addCase(getAllCVs.pending, (state) => {
        state.publicCvs.loading = true;
        state.publicCvs.error = null;
      })
      .addCase(getAllCVs.fulfilled, (state, action) => {
        state.publicCvs.loading = false;
        state.publicCvs.cvs = action.payload.results;
        state.publicCvs.totalPages = action.payload.totalPages;
        state.publicCvs.currentPage = action.payload.page;
        state.publicCvs.totalCount = action.payload.totalCount;
      })
      .addCase(getAllCVs.rejected, (state, { payload }) => {
        state.publicCvs.loading = false;
        state.publicCvs.error = payload.result;
      })

      .addCase(setMyCVOptions.pending, (state) => {
        state.myCVoptionsLoading = true;
      })
      .addCase(setMyCVOptions.fulfilled, (state, { payload }) => {
        const { sectionKey, fieldKey, isSelected } = payload;
        if (
          state.myCVOptions[sectionKey] &&
          state.myCVOptions[sectionKey].fields[fieldKey]
        ) {
          state.myCVOptions[sectionKey].fields[fieldKey].isSelected =
            isSelected;
        }
        state.myCVoptionsLoading = false;
      })
      .addCase(setMyCVOptions.rejected, (state) => {
        state.myCVoptionsLoading = false;
      })

      // Update Font Options
      .addCase(updateFontOptions.pending, (state) => {
        state.myCVoptionsLoading = true;
      })
      .addCase(updateFontOptions.fulfilled, (state, action) => {
        state.myCVFontOptions = action.payload;
        state.myCVoptionsLoading = false;
      })
      .addCase(updateFontOptions.rejected, (state) => {
        state.myCVoptionsLoading = false;
      });
  },
});

export const { clearError, resetCVs, setCurrentPage } = cvsSlice.actions;
export default cvsSlice.reducer;
