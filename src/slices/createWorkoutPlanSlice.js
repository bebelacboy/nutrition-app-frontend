import { createSlice } from "@reduxjs/toolkit";

const createWorkoutPlanSlice = createSlice({
  name: "createWorkoutPlan",
  initialState: {
    workoutSessions: [
    {
      day: "monday",
      exercises: [
        {
          name: "",
          set: 0,
          reps: 0
        }
      ]
    }, 
    {
      day: "wednesday",
      exercises: [
        {
          name: "",
          set: 0,
          reps: 0
        }
      ]
    }, 
    {
      day: "friday",
      exercises: [
        {
          name: "",
          set: 0,
          reps: 0
        }
      ]
    }
  ],
    availableDays: ["tuesday", "thursday", "saturday", "sunday"]
  },
  reducers: {
    frequencyChange: (state, action) => {
      const { payload : newFrequency } = action;
      const oldFrequency = state.workoutSessions.length;
      if (newFrequency > oldFrequency) {
        const additionalSessionsFreq = newFrequency - oldFrequency;
        for (let i = 0; i < additionalSessionsFreq; i++) {
          state.workoutSessions.push({
            day: state.availableDays.shift(),
            exercises: [
              {
                name: "",
                set: 0,
                reps: 0
              }
            ]
          });
        }
      } else {
        const additionalSessionsFreq = oldFrequency - newFrequency;
        for (let i = 0; i < additionalSessionsFreq; i++) {
          const poppedSession = state.workoutSessions.pop();
          state.availableDays.push(poppedSession.day);
        }
      }
    },
    sessionDayChange: (state, action) => {
      const { newDay, oldDay } = action.payload;
      // Change day in specific session of workoutSession state
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (state.workoutSessions[i].day === oldDay) {
          state.workoutSessions[i].day = newDay;
          state.availableDays.push(oldDay);
        }
      }
      // Update the available days
      for (let i = 0; i < state.availableDays.length; i++) {
        if (newDay === state.availableDays[i]) {
          state.availableDays.splice(i, 1);
        }
      }
    },
    addSessionExercise: (state, action) => {
      const { payload: sessionDay } = action;
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (sessionDay === state.workoutSessions[i].day) {
          state.workoutSessions[i].exercises.push({
            name: "",
            set: 0,
            reps: 0
          });
          break;
        }
      }
    },
    selectExercise: (state, action) => {
      const { exercise, day, index: exerciseNumber } = action.payload;
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (state.workoutSessions[i].day === day) {
          state.workoutSessions[i].exercises[exerciseNumber].name = exercise;
          break;
        }
      }
    },
    setExerciseSet: (state, action) => {
      const { set, day, index: exerciseNumber } = action.payload;
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (state.workoutSessions[i].day === day) {
          state.workoutSessions[i].exercises[exerciseNumber].set = set;
          break;
        }
      }
    },
    setExerciseReps: (state, action) => {
      const { reps, day, index: exerciseNumber } = action.payload;
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (state.workoutSessions[i].day === day) {
          state.workoutSessions[i].exercises[exerciseNumber].reps = reps;
          break;
        }
      }
    },
    deleteExercise: (state, action) => {
      const { day, index: exerciseNumber } = action.payload;
      for (let i = 0; i < state.workoutSessions.length; i++) {
        if (state.workoutSessions[i].day === day) {
          state.workoutSessions[i].exercises.splice(exerciseNumber, 1);
          break;
        }
      }
    },
    resetPlan: (state, action) => {
      state.availableDays = ["tuesday", "thursday", "saturday", "sunday"];
      state.workoutSessions = [
        {
          day: "monday",
          exercises: [
            {
              name: "",
              set: 0,
              reps: 0
            }
          ]
        }, 
        {
          day: "wednesday",
          exercises: [
            {
              name: "",
              set: 0,
              reps: 0
            }
          ]
        }, 
        {
          day: "friday",
          exercises: [
            {
              name: "",
              set: 0,
              reps: 0
            }
          ]
        }
      ]
    }
  }
}

);
export const { 
  frequencyChange, 
  sessionDayChange, 
  addSessionExercise, 
  selectExercise,
  setExerciseSet,
  setExerciseReps,
  deleteExercise,
  resetPlan
} = createWorkoutPlanSlice.actions;
export default createWorkoutPlanSlice.reducer;
