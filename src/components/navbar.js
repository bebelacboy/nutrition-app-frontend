import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faKey, faUser } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <form method="post" className="hidden md:flex">
        <div className="relative">
          <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
            <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faUser} />
          </div>
          <input type="text" 
          className="appearance-none pl-9 w-36 px-2 py-2 border focus:outline-none rounded focus:outline-blue-600 me-3" 
          placeholder="Username"/>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 pl-3 py-2 left-0 pointer-events-none">
            <FontAwesomeIcon aria-hidden className=" text-gray-400" icon={faKey} />
          </div>
          <input type="password" 
          className="appearance-none w-36 pl-9 py-2 px-2 border rounded focus:outline-none focus:outline-blue-600 " 
          placeholder="Password"/>
        </div>
        <button type="submit" className=" bg-green-700 rounded font-bold text-white px-3 py-2 ms-3">{'>'}</button>
        
      </form>
      
      
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