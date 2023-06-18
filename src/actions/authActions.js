import AuthService from "../services/AuthService";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  CLEAR_ERROR
} from "./constants";

const register = (username, password) => async (dispatch) => {
  try {
    await AuthService.register(username, password);
    dispatch({type: REGISTER_SUCCESS});
  } catch (err) {
    const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
    dispatch({type: REGISTER_FAILURE, payload: errorMessage});
  }
}

const login = (username, password) => async (dispatch) => {
  try {
    const response = await AuthService.login(username, password);
    console.log(response);
    dispatch({type: LOGIN_SUCCESS, payload: response.data});
  } catch (err) {
    const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
    dispatch({type: LOGIN_FAILURE, payload: errorMessage})
  }
}

const logout = (username, password) => async (dispatch) => {
  await AuthService.logout();
  dispatch({type: LOGOUT});
  console.log("Berhasil dispatch logout");
}

const clearError = () => (dispatch) => {
  dispatch({type: CLEAR_ERROR});
}

export {
  register,
  login,
  logout,
  clearError
};

