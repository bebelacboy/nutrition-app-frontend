import axios from 'axios';
import { authHeader } from './authHeader';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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

const deleteWorkoutPlanById = async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/workout-plan/${id}`, {
    headers: await authHeader()
  })
}

const getUserCurrentPlanId = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/current-plan`, {
    headers: await authHeader()
  });
  cookies.set("currentPlanId", response.data.currentPlanId,  {
    path: '/'
  });
  return response.data;
}

const WorkoutPlanService = {
  createWorkoutPlan,
  getWorkoutPlansList,
  getWorkoutPlanById,
  deleteWorkoutPlanById,
  getUserCurrentPlanId
}

export default WorkoutPlanService;