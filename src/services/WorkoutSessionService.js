import axios from 'axios';
import { authHeader } from './AuthHeader';

const getWorkoutSessionsList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout-session`, {
    headers: await authHeader()
  });

  return response.data;
}

const getWorkoutSessionByDate = async (date) => {
  // const parameterDate = date.toLocaleDateString().replaceAll("/", "-");
  const parameterDate = date.toISOString().substring(0, 10);
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout-session/${parameterDate}`, {
    headers: await authHeader()
  });

  return response.data;
}

const createWorkoutSession = async (workoutSession) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout-session`, workoutSession, {
    headers: await authHeader()
  });
  return response;
}

const updateWorkoutSession = async (updatedWorkoutSession) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/workout-session`, updatedWorkoutSession, {
    headers: await authHeader()
  });
  return response;
}


const WorkoutSessionService = {
  getWorkoutSessionsList,
  getWorkoutSessionByDate,
  createWorkoutSession,
  updateWorkoutSession
}

export default WorkoutSessionService;