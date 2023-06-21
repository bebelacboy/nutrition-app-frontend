import axios from 'axios';
import { authHeader } from './authHeader';

const createWorkoutPlan = async (workoutPlan) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout-plan`, workoutPlan, {
    headers: await authHeader()
  });
  return response;
}

const getWorkoutPlansList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout-plan`, {
    headers: await authHeader()
  });

  return response.data;
}

const getWorkoutPlanById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout-plan/${id}`, {
    headers: await authHeader()
  });

  return response.data;
}

const WorkoutPlanService = {
  createWorkoutPlan,
  getWorkoutPlansList,
  getWorkoutPlanById
}

export default WorkoutPlanService;