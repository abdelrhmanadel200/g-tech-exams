"use client"; // Add this line at the top
import Image from 'next/image'; 
import Link from 'next/link'; 
import { useState, useEffect } from 'react'; 
import { FiHome, FiInfo, FiDollarSign, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  let timeoutId: string | number | NodeJS.Timeout | undefined; 

  const handleLinkClick = () => {
    setMobileMenuOpen(false); 
  };

  const handleMouseEnterDropdown = () => {
    clearTimeout(timeoutId);
    setDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutId = setTimeout(() => setDropdownOpen(false), 150); 
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId); 
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`flex items-center justify-between shadow-md h-16 ${darkMode ? 'bg-gradient-to-r from-[#00454A] to-[#007C7E]' : 'bg-gradient-to-r from-teal-500 to-teal-700'}`}>
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/images/c186678f7cd589c185fff8baa189e685.png" alt="Logo" className="ml-10 h-10" width={100} height={100} />
        </Link>
      </div>

      {/* Hamburger Button */}
      <button 
        className={`mr-6 sm:hidden ${darkMode ? 'text-gray-300' : 'text-white'}`} 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={handleLinkClick}></div>
      )}

      {/* Main Navigation */}
      <nav 
        className={`${
          mobileMenuOpen ? 'flex' : 'hidden'
        } sm:flex flex-col sm:flex-row items-center absolute sm:static top-16 right-4 w-[60%] sm:w-auto bg-white sm:bg-transparent z-20 sm:z-auto transition-all duration-300 sm:ml-10`}
        role="navigation"
      >
        {/* Dark Mode Toggle */}
        <div className="flex items-center ml-4 mb-4 sm:mb-0">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={darkMode} onChange={toggleDarkMode} />
            <div className={`w-11 h-6 rounded-full shadow-inner ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            <div className={`dot absolute w-5 h-5 rounded-full shadow transition-transform ${darkMode ? 'translate-x-full bg-gray-300' : 'translate-x-1 bg-white'}`}></div>
          </label>
        </div>

        {/* Links */}
        <Link href="/" className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 sm:text-white hover:text-gray-200'} transition duration-200 mx-2 p-2 rounded-md`} onClick={handleLinkClick}>
          <FiHome className="mr-1" /> Home
        </Link>

        <Link href="https://gammal.tech" className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 sm:text-white hover:text-gray-200'} transition duration-200 mx-2 p-2 rounded-md`} onClick={handleLinkClick}>
          <FiInfo className="mr-1" /> About
        </Link>

        <Link href="/pricing" className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 sm:text-white hover:text-gray-200'} transition duration-200 mx-2 p-2 rounded-md`} onClick={handleLinkClick}>
          <FiDollarSign className="mr-1" /> Pricing
        </Link>

        {/* Dropdown */}
        <div 
          className="relative mb-4 sm:mb-0" 
          onMouseEnter={handleMouseEnterDropdown} 
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 sm:text-white hover:text-gray-200'} mx-2 p-2 rounded-md`}>
            <FiUser className="mr-1" /> User <FiChevronDown className="ml-1" />
          </button>
          {dropdownOpen && (
            <div className={`absolute right-0 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'} shadow-lg rounded-md mt-2`}>
              <Link href="/profile" className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} onClick={handleLinkClick}>Profile</Link>
              <Link href="/certifcate" className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} onClick={handleLinkClick}>Certificates</Link>
              <Link href="/logout" className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} onClick={handleLinkClick}>Logout</Link>
            </div>
          )}
        </div>

        {/* Link to Login Page */}
        <Link href="/login" className="flex items-center" onClick={handleLinkClick}>
          <span 
            className={`${
              darkMode ? 'bg-[#003545] text-white hover:bg-[#071E3D]' : 'bg-[#FCE09B] text-black hover:bg-[#FFEEA9]'
            } px-4 py-2 flex items-center justify-center hover:shadow-lg transition duration-200 rounded-full`} 
            style={{ minWidth: '94px', minHeight: '43px', fontWeight: '600', fontSize: '16px' }}
          >
            <FiUser className="mr-1" /> Sign In
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
