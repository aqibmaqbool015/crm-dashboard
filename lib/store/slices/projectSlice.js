// projectSlice.js mein ye changes karo
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  meta: null,
  selectedProject: null,

  // Stages related states
  projectStages: [],
  stageLoading: false,
  stageError: null,

  // Notes related states
  projectNotes: [],
  notesLoading: false,
  notesError: null,

  // Request update states
  requestUpdateLoading: false,
  requestUpdateError: null,
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

    // Stages reducers
    setProjectStages: (state, action) => {
      state.projectStages = action.payload.stages || [];
    },
    setStageLoading: (state, action) => {
      state.stageLoading = action.payload;
    },
    setStageError: (state, action) => {
      state.stageError = action.payload;
    },
    addStageEntry: (state, action) => {
      const { stageId, entry } = action.payload;
      const stageIndex = state.projectStages.findIndex(
        (stage) => stage.stage_id === stageId
      );
      if (stageIndex !== -1) {
        if (!state.projectStages[stageIndex].stage_entries) {
          state.projectStages[stageIndex].stage_entries = [];
        }
        state.projectStages[stageIndex].stage_entries.unshift(entry);
        state.projectStages[stageIndex].entries_count += 1;
      }
    },
    updateStageEntry: (state, action) => {
      const { stageId, entryId, content } = action.payload;
      const stageIndex = state.projectStages.findIndex(
        (stage) => stage.stage_id === stageId
      );
      if (stageIndex !== -1 && state.projectStages[stageIndex].stage_entries) {
        const entryIndex = state.projectStages[
          stageIndex
        ].stage_entries.findIndex((entry) => entry.id === entryId);
        if (entryIndex !== -1) {
          state.projectStages[stageIndex].stage_entries[entryIndex].content =
            content;
        }
      }
    },

    // projectSlice.js mein setProjectNotes reducer update karo:
    setProjectNotes: (state, action) => {
      // Check multiple possible response structures
      const payload = action.payload;

      if (Array.isArray(payload)) {
        // If payload is directly an array
        state.projectNotes = payload;
      } else if (payload && Array.isArray(payload.data)) {
        // If payload has data property that is an array
        state.projectNotes = payload.data;
      } else if (payload && Array.isArray(payload.notes)) {
        // If payload has notes property that is an array
        state.projectNotes = payload.notes;
      } else {
        // Default to empty array
        state.projectNotes = [];
      }
    },
    setNotesLoading: (state, action) => {
      state.notesLoading = action.payload;
    },
    setNotesError: (state, action) => {
      state.notesError = action.payload;
    },
    addProjectNote: (state, action) => {
      state.projectNotes.unshift(action.payload);
    },

    // Request update reducers
    setRequestUpdateLoading: (state, action) => {
      state.requestUpdateLoading = action.payload;
    },
    setRequestUpdateError: (state, action) => {
      state.requestUpdateError = action.payload;
    },

    clearProjectStages: (state) => {
      state.projectStages = [];
      state.stageLoading = false;
      state.stageError = null;
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

  // Stages actions
  setProjectStages,
  setStageLoading,
  setStageError,
  addStageEntry,
  updateStageEntry,

  // Notes actions
  setProjectNotes,
  setNotesLoading,
  setNotesError,
  addProjectNote,

  // Request update actions
  setRequestUpdateLoading,
  setRequestUpdateError,

  clearProjectStages,
} = projectSlice.actions;

export default projectSlice.reducer;
