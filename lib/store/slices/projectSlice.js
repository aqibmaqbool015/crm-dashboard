import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  meta: null,
  selectedProject: null,
  // New states for stages
  projectStages: [],
  stageLoading: false,
  stageError: null,
  stageEntries: [],
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

    // New reducers for stages
    setProjectStages: (state, action) => {
      state.projectStages = action.payload.stages || [];
    },
    setStageLoading: (state, action) => {
      state.stageLoading = action.payload;
    },
    setStageError: (state, action) => {
      state.stageError = action.payload;
    },
    setStageEntries: (state, action) => {
      state.stageEntries = action.payload;
    },
    addStageEntry: (state, action) => {
      const { stageId, entry } = action.payload;
      const stageIndex = state.projectStages.findIndex(
        (stage) => stage.project_stage_id === stageId
      );
      if (stageIndex !== -1) {
        if (!state.projectStages[stageIndex].stage_entries) {
          state.projectStages[stageIndex].stage_entries = [];
        }
        state.projectStages[stageIndex].stage_entries.unshift(entry);
      }
    },
    updateStageStatus: (state, action) => {
      const { stageId, status } = action.payload;
      const stageIndex = state.projectStages.findIndex(
        (stage) => stage.project_stage_id === stageId
      );
      if (stageIndex !== -1) {
        state.projectStages[stageIndex].status = status;
      }
    },
    clearProjectStages: (state) => {
      state.projectStages = [];
      state.stageLoading = false;
      state.stageError = null;
      state.stageEntries = [];
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
  // New actions
  setProjectStages,
  setStageLoading,
  setStageError,
  setStageEntries,
  addStageEntry,
  updateStageStatus,
  clearProjectStages,
} = projectSlice.actions;

export default projectSlice.reducer;
