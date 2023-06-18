import {
  CLEAR_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from "../actions/constants";

const initialState = {
  user: await JSON.parse(localStorage.getItem("user")),
  loginErrorMessage: "",
  registerErrorMessage: ""
}

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_FAILURE:
      return {
        ...state,
        registerErrorMessage: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loginErrorMessage: payload 
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case CLEAR_ERROR:
      return {
        ...state,
        registerErrorMessage: "",
        loginErrorMessage: ""
      }
    default:
      return {
        ...state
      }

  }
}