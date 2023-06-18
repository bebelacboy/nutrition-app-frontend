import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { register, clearError } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";


export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const { registerErrorMessage } = useSelector(state => state.auth);

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError("Please fill in the username!");
    }
    if (!password) {
      setPasswordError("Please fill in the password!");
    }
    if (!password || !username) {
      return;
    }
    dispatch(register(username, password));
  }

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return <div className="flex justify-center items-center h-screen">
    <div className="bg-gray-200 hover:shadow-lg hover:transition-transform w-4/5 md:w-3/5 lg:w-2/5 h-4/6 rounded-xl">
      <h2 className="text-3xl font-bold mt-12">Create Account</h2>
      <form method="post" onSubmit={onSubmit} className="block mt-12">
        <label className="font-semibold text-lg" htmlFor="usernameInput">Username</label>
        <div className="relative w-fit mx-auto">
          <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
            <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faUser} />
          </div>
          <input id="usernameInput" type="text" 
          className="appearance-none sm:w-80 md:w-80 lg:w-96 pl-9 px-2 py-2 border focus:outline-none rounded focus:outline-blue-600 me-3"
          onChange={usernameChange}
          value={username}
          placeholder="Username"/>
        </div>
        <p className="mt-2 text-red-600">{usernameError}</p>
        <label htmlFor="passwordInput" className="font-semibold text-lg">Password</label>
        <br />
        <div className="relative w-fit mx-auto">
          <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
            <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faKey} />
          </div>
          <input id="passwordInput" type="password" 
          className="appearance-none sm:w-80 md:w-80 lg:w-96 pl-9 px-2 py-2 border focus:outline-none rounded focus:outline-blue-600 me-3" 
          onChange={passwordChange}
          value={password}
          placeholder="Password"/>
        </div>     
        <p className="mt-2 text-red-600">{passwordError}</p>   
        <button className="bg-blue-600 hover:bg-blue-900 rounded mt-2 py-3 px-5 text-white" type="submit">Register</button>
        <p className="mt-2 text-red-600">{registerErrorMessage}</p>
      </form>
    </div>
    
  </div>
}