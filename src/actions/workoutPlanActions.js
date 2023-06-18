import { ADD_SESSION_EXERCISE, FREQUENCY_CHANGE, SESSION_DAY_CHANGE } from "./constants";

const frequencyChange = (newFrequency, workoutSessions, availableDays) => (dispatch) => {
  const frequency = workoutSessions.length;
  if (newFrequency > frequency) {
    const newAvailableDays = [...availableDays];
    const additionalSessionsFreq = newFrequency - frequency;
    const additionalSessions = Array(additionalSessionsFreq);
    for (let i = 0; i < additionalSessions.length; i++) {
      additionalSessions[i] = {
        day: newAvailableDays.shift(),
        exercises: []
      }
    }
    const newWorkoutSessions = [...workoutSessions, ...additionalSessions];
    console.log(newWorkoutSessions);
    console.log(newAvailableDays);
    dispatch({type: FREQUENCY_CHANGE, payload: {
      newWorkoutSessions: newWorkoutSessions,
      newAvailableDays: newAvailableDays
    }});
  } else {
    const additionalSessionsFreq = frequency - newFrequency;
    const newAvailableDays = [...availableDays];
    const newWorkoutSessions = [...workoutSessions];
    for (let i = 0; i < additionalSessionsFreq; i++) {
      const poppedSession = newWorkoutSessions.pop();
      newAvailableDays.push(poppedSession.day);
    }
    dispatch({type: FREQUENCY_CHANGE, payload: {
      newWorkoutSessions,
      newAvailableDays
    }})
  }
}

const sessionDayChange = (newDay, session, workoutSessions, availableDays) => (dispatch) => {
  // Deep Copy
  const newAvailableDays = JSON.parse(JSON.stringify(availableDays));
  const newWorkoutSessions = JSON.parse(JSON.stringify(workoutSessions));
  console.log(session);
  // Change day in specific session of workoutSession state
  for (let i = 0; i < newWorkoutSessions.length; i++) {
    if (newWorkoutSessions[i].day === session.day) {
      newWorkoutSessions[i].day = newDay;
      newAvailableDays.push(session.day);
    }
  }
  // Update the available days
  for (let i = 0; i < newAvailableDays.length; i++) {
    if (newDay === newAvailableDays[i]) {
      newAvailableDays.splice(i, 1);
    }
  }
  dispatch({type: SESSION_DAY_CHANGE, payload: {
    newWorkoutSessions,
    newAvailableDays
  }});
}

const addSessionExercise = (session, workoutSessions) => (dispatch) => {
  // Deep Copy
  const newWorkoutSessions = JSON.parse(JSON.stringify(workoutSessions));
  for (let i = 0; i < newWorkoutSessions.length; i++) {
    if (session.day === newWorkoutSessions[i].day) {
      newWorkoutSessions[i].exercises.push({
        name: "",
        set: 0,
        reps: 0
      });
      break;
    }
  }
  dispatch({
    type: ADD_SESSION_EXERCISE,
    payload: newWorkoutSessions
  });
}

export {
  frequencyChange,
  sessionDayChange,
  addSessionExercise
}
