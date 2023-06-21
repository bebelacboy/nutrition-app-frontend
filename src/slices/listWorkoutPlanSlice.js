import { createSlice } from "@reduxjs/toolkit";

const listWorkoutPlanSlice = createSlice({
  name: "listWorkoutPlanSlice",
  initialState: {
    planToDeleteId: ""
  },
  reducers: {
    selectPlanToDelete: (state, action) => {
      const { payload: planId } = action;
      state.planToDeleteId = planId;
    },
    cancelDelete: (state, action) => {
      state.planToDeleteId = "";
    }
  }
});

export const { selectPlanToDelete, cancelDelete } = listWorkoutPlanSlice.actions;
export default listWorkoutPlanSlice.reducer;