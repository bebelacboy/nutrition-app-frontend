import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
  await cookies.set("user", JSON.stringify(response.data), {
    path: '/'
  })
  return response;
}


const logout = async () => {
  await cookies.remove("user");
}

const AuthService = {
  register,
  login,
  logout
}

export default AuthService;