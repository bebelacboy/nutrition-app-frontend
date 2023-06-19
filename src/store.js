import { configureStore } from "@reduxjs/toolkit";
import createWorkoutPlanReducer from "./slices/workoutPlanSlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createWorkoutPlan: createWorkoutPlanReducer
  }
})