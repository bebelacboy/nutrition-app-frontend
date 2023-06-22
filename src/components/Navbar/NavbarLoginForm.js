import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useSelector } from "react-redux";


export const NavbarLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginErrorMessage } = useSelector(state => state.auth);

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(login(username, password));
      navigate("/");
    } catch (err) {
      console.error(err)
    }
  }
  return <form onSubmit={onSubmit} method="post" className="hidden md:flex">
    <Link className=" w-36 my-auto text-white text-sm hover:text-gray-100 me-4 py-1" to="/register">Dont have account?</Link>
    {loginErrorMessage && <p className="bg-red-600 text-white rounded-lg me-4 px-2 my-auto">{loginErrorMessage}</p>}
  <div className="relative">
    <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
      <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faUser} />
    </div>
    <input type="text" 
    onChange={usernameChange}
    className="appearance-none pl-9 w-36 px-2 py-2 border focus:outline-none rounded focus:outline-blue-600 me-3" 
    placeholder="Username"/>
  </div>
  <div className="relative">
    <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
      <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faKey} />
    </div>
    <input type="password"
    onChange={passwordChange} 
    className="appearance-none w-36 pl-9 py-2 px-2 border rounded focus:outline-none focus:outline-blue-600 " 
    placeholder="Password"/>
  </div>
  <button type="submit" className=" bg-green-700 rounded font-bold text-white px-3 py-2 ms-3">{'>'}</button>
</form>
}