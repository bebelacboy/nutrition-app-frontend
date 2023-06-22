import { createSlice } from "@reduxjs/toolkit";
import WorkoutPlanService from "../services/WorkoutPlanService";

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
    },
    confirmDelete: (state, action) => {
      state.planToDeleteId = "";
    }
  }
});

const deleteWorkoutPlan = (workoutPlanId) => async (dispatch) => {
  await WorkoutPlanService.deleteWorkoutPlanById(workoutPlanId);
  dispatch(listWorkoutPlanSlice.actions.confirmDelete());
}

export { deleteWorkoutPlan };
export const { selectPlanToDelete, cancelDelete } = listWorkoutPlanSlice.actions;
export default listWorkoutPlanSlice.reducer;