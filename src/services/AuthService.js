import axios from 'axios';

const register = async (username, password) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
    username,
    password
  });
  return response;
}

const login = async (username, password) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
    username,
    password
  });
  await localStorage.setItem("user", JSON.stringify(response.data));
  return response;
}


const logout = async () => {
  await localStorage.removeItem("user");
}

const AuthService = {
  register,
  login,
  logout
}

export default AuthService;