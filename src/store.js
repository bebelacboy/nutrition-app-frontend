import { configureStore } from "@reduxjs/toolkit";
import createWorkoutPlanReducer from "./slices/createWorkoutPlanSlice";
import listWorkoutPlanReducer from "./slices/listWorkoutPlanSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createWorkoutPlan: createWorkoutPlanReducer,
    listWorkoutPlan: listWorkoutPlanReducer
  }
})