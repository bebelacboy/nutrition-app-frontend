import axios from 'axios';
import { authHeader } from './AuthHeader';
// import { authHeader } from './authHeader';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const createWorkoutPlan = async (workoutPlan) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout-plan`, workoutPlan, {
    headers: await authHeader()
  });
  return response;
}

const updateWorkoutPlan = async (updatedWorkoutPlan) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/workout-plan`, updatedWorkoutPlan, {
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

const setUserCurrentPlanId = async (id) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/current-plan`, {planId: id} , {
    headers: await authHeader()
  });
  console.log("ini di workoutplanservice");
  console.log(response);
  cookies.set("currentPlanId", response.data.currentPlan._id, {
    path: '/'
  })
  return response.data;
}

const removeUserCurrentPlanId = async () => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/current-plan`, {
    headers: await authHeader()
  });
  cookies.remove("currentPlanId", {
    path: '/'
  })
  return response.data;
}

const WorkoutPlanService = {
  createWorkoutPlan,
  updateWorkoutPlan,
  getWorkoutPlansList,
  getWorkoutPlanById,
  deleteWorkoutPlanById,
  getUserCurrentPlanId,
  setUserCurrentPlanId,
  removeUserCurrentPlanId
}

export default WorkoutPlanService;