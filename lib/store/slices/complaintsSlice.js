// lib/store/slices/complaintsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    complaints: [],
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
    // Loading states
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSubmitting(state, action) {
      state.isSubmitting = action.payload;
    },

    // Fetch complaints
    setComplaints(state, action) {
      state.complaints = action.payload.complaints || action.payload;
      state.pagination = action.payload.pagination || state.pagination;
      state.error = null;
    },

    // Add new complaint
    addComplaint(state, action) {
      state.complaints.unshift(action.payload);
      state.pagination.total += 1;
    },

    // Update complaint
    updateComplaint(state, action) {
      const index = state.complaints.findIndex(
        (complaint) => complaint.id === action.payload.id
      );
      if (index !== -1) {
        state.complaints[index] = {
          ...state.complaints[index],
          ...action.payload,
        };
      }
    },

    // Delete complaint
    deleteComplaint(state, action) {
      state.complaints = state.complaints.filter(
        (complaint) => complaint.id !== action.payload
      );
      state.pagination.total -= 1;
    },

    // Error handling
    setError(state, action) {
      state.error = action.payload;
    },

    // Clear errors
    clearError(state) {
      state.error = null;
    },

    // Reset state
    resetComplaints(state) {
      state.complaints = [];
      state.isLoading = false;
      state.isSubmitting = false;
      state.error = null;
      state.pagination = {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 1,
      };
    },
  },
});

export const {
  setLoading,
  setSubmitting,
  setComplaints,
  addComplaint,
  updateComplaint,
  deleteComplaint,
  setError,
  clearError,
  resetComplaints,
} = complaintsSlice.actions;

export default complaintsSlice.reducer;
