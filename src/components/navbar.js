import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";

const NavbarLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password
      });
      await setCookies("access_token", response.data.token);
      await window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err)
    }
  }
  return <form onSubmit={onSubmit} method="post" className="hidden md:flex">
    <Link className=" w-36 my-auto text-white text-sm hover:text-gray-100 me-4 py-1" to="/register">Dont have account?</Link>
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

const NavbarLogoutButton = () => {
  const [ , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onClick = async () => {
    await setCookies("access_token", "");
    await window.localStorage.removeItem("userId");
    navigate("/");
  };

  return <button className="bg-red-700 hover:bg-red-800 text-white rounded-md px-3 py-1"
          onClick={onClick}>Logout</button>
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cookies , ] = useCookies(["access_token"]);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return <nav className="bg-gray-800 md:fixed z-10 top-0 w-full">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo and Navigation */}
      <div className="flex-shrink-0 ">
        <a href="/" className=" text-yellow-600 text-2xl font-semibold">Workout</a>
        <div className="hidden ms-3 md:inline-block md:items-center">
          <Link className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium" to="/">Home</Link>
          <Link className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium" to="/workout-plan">Workout Plan</Link>
        </div>
      </div>
      
      {/* Menu Button (for mobile) */}
      <div className="flex md:hidden">
        <button type="button" className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
          aria-label="Toggle menu" onClick={toggleMobileMenu}>
          <FontAwesomeIcon fontSize={20} icon={faBars}></FontAwesomeIcon>
        </button>

      </div>

      {/* Login Form */}
      <Routes>
        <Route path="/*" element={cookies.access_token ? (<NavbarLogoutButton />) : (<NavbarLoginForm />)}>  </Route>
        <Route exact path="/register" 
        element={
          <Link className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-3 py-1" to="/login">Login</Link>
        }></Route>
        <Route exact path="/login" element={<Link className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-3 py-1" to="/register">Create Account</Link>}></Route>
      </Routes>
      
      
    </div>
  </div>
  
  {/* Mobile Menu (hidden by default) */}
  <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <Link className="text-gray-300 hover:text-white hover:bg-gray-500 block py-2 rounded text-base font-medium" to="/workout-plan">Home</Link>
      <Link className="text-gray-300 hover:text-white hover:bg-gray-500 block py-2 rounded text-base font-medium" to="/workout-plan">Workout Plan</Link>
    </div>
  </div>
</nav>
}