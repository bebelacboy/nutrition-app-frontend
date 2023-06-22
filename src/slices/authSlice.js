import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import Cookies from "universal-cookie";
import WorkoutPlanService from "../services/WorkoutPlanService";

const cookies = new Cookies();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: await cookies.get("user"),
    currentPlanId: await cookies.get("currentPlanId"),
    loginErrorMessage: "",
    registerErrorMessage: ""
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { userData, currentPlanId } = action.payload;
      state.user = userData;
      state.currentPlanId = currentPlanId; 
    },
    loginFailure: (state, action) => {
      state.loginErrorMessage = action.payload;
    },
    registerFailure: (state, action) => {
      state.registerErrorMessage = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.currentPlanId = null;
    },
    clearError: (state, action) => {
      state.loginErrorMessage = "";
      state.registerErrorMessage = "";
    } 
  }
});

const register = (username, password) => async (dispatch) => {
  try {
    await AuthService.register(username, password);
  } catch (err) {
    const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
   dispatch(authSlice.actions.registerFailure(errorMessage));
  }
}

const login = (username, password) => async (dispatch) => {
  try {
    const response = await AuthService.login(username, password);
    const currentPlanId = await WorkoutPlanService.getUserCurrentPlanId();
    dispatch(authSlice.actions.loginSuccess({
      userData: response.data,
      currentPlanId: currentPlanId
    }));
  } catch (err) {
    const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
    dispatch(authSlice.actions.loginFailure(errorMessage));
  }
}

const logout = () => async (dispatch) => {
  await AuthService.logout();
  dispatch(authSlice.actions.logout());
}

export { register, login, logout };
export const { clearError } = authSlice.actions;
export default authSlice.reducer;