import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { createWorkoutPlanReducer } from "./reducers/workoutPlanReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createWorkoutPlan: createWorkoutPlanReducer
  }
})