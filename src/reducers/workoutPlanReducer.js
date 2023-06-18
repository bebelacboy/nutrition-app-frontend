import { ADD_SESSION_EXERCISE, FREQUENCY_CHANGE, SESSION_DAY_CHANGE } from "../actions/constants";

const initialState = {
  workoutSessions: [
  {
    day: "monday",
    exercises: []
  }, 
  {
    day: "wednesday",
    exercises: []
  }, 
  {
    day: "friday",
    exercises: []
  }
],
  availableDays: ["tuesday", "thursday", "saturday", "sunday"]
}

export const createWorkoutPlanReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case FREQUENCY_CHANGE:
      return {
        ...state,
        workoutSessions: payload.newWorkoutSessions,
        availableDays: payload.newAvailableDays
      }
    case SESSION_DAY_CHANGE:
      return {
        ...state,
        workoutSessions: payload.newWorkoutSessions,
        availableDays: payload.newAvailableDays
      }
    case ADD_SESSION_EXERCISE:
      return {
        ...state,
        workoutSessions: payload
      }
    default:
      return { ...state }
  }
}