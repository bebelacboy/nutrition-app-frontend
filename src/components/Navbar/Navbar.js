import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route } from 'react-router-dom';
import { NavbarLoginForm } from './NavbarLoginForm';
import { NavbarLogoutButton } from './NavbarLogoutButton';
import { useSelector } from 'react-redux';


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return <nav className="bg-gray-800 md:fixed z-10 top-0 w-full">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo and Navigation */}
      <div className="flex-shrink-0 ">
        <a href="/" className=" text-yellow-400 text-2xl font-semibold">Workout</a>
        <div className="hidden ms-3 md:inline-block md:items-center">
          <Link className={`px-3 py-2 rounded-md text-md font-medium 
          ${location.pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white' }`} 
          to="/">Home</Link>
          { user && 
            <>
              <Link className={`px-3 py-2 rounded-md text-md font-medium 
              ${location.pathname.startsWith('/workout-plan') ? 'text-white' : 'text-gray-300 hover:text-white' }`}
              to="/workout-plan">Workout Plan</Link>
              <Link className={`px-3 py-2 rounded-md text-md font-medium 
              ${location.pathname.startsWith('/workout-history') ? 'text-white' : 'text-gray-300 hover:text-white' }`}
              to="/workout-history">Workout History</Link>
            </>
          }
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
        <Route path="/*" element={user ? (<NavbarLogoutButton />) : (<NavbarLoginForm />)}>  </Route>
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
      <Link className={`${location.pathname === "/" ? "bg-gray-400 text-black": "text-gray-300 hover:text-white hover:bg-gray-500"} block py-2 rounded text-base font-medium`} to="/">Home</Link>
      { user &&
        <>  
          <Link className={`${location.pathname.startsWith("/workout-plan") ? "bg-gray-400 text-black": "text-gray-300 hover:text-white hover:bg-gray-500"} block py-2 rounded text-base font-medium`} to="/workout-plan">Workout Plan</Link>
          <Link className={`${location.pathname.startsWith("/workout-history") ? "bg-gray-400 text-black": "text-gray-300 hover:text-white hover:bg-gray-500"} block py-2 rounded text-base font-medium`} to="/workout-history">Workout History</Link>
        </>
      }
      { !user &&
        <>  
          <Link className={`${location.pathname.startsWith("/login") ? "bg-gray-400 text-black": "text-gray-300 hover:text-white hover:bg-gray-500"} block py-2 rounded text-base font-medium`} to="/login">Login</Link>
        </>
      }
    </div>
  </div>
</nav>
}