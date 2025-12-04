import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  meta: null,
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload.data || [];
      state.meta = action.payload.meta || null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    updateProject: (state, action) => {
      const updatedProject = action.payload;
      const index = state.projects.findIndex((p) => p.id === updatedProject.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    deleteProject: (state, action) => {
      const id = action.payload;
      state.projects = state.projects.filter((p) => p.id !== id);
    },
    clearProjects: (state) => {
      state.projects = [];
      state.loading = false;
      state.error = null;
      state.meta = null;
      state.selectedProject = null;
    },
  },
});

export const {
  setProjects,
  setLoading,
  setError,
  setSelectedProject,
  updateProject,
  addProject,
  deleteProject,
  clearProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
