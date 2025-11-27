import { createSlice } from "@reduxjs/toolkit";

const inspectionSlice = createSlice({
  name: "inspection",
  initialState: {
    inspections: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    pagination: {
      total: 0,
      per_page: 15,
      current_page: 1,
      last_page: 1,
    },
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSubmitting(state, action) {
      state.isSubmitting = action.payload;
    },
    setInspections(state, action) {
      state.inspections = action.payload.data || action.payload;
      state.pagination = action.payload.meta || state.pagination;
      state.error = null;
    },
    addInspection(state, action) {
      state.inspections.unshift(action.payload);
      state.pagination.total += 1;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSubmitting,
  setInspections,
  addInspection,
  setError,
  clearError,
} = inspectionSlice.actions;

export default inspectionSlice.reducer;
