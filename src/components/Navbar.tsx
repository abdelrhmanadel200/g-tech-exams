import Link from 'next/link'; 
import { useState } from 'react';
import { FiHome, FiInfo, FiDollarSign, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false); 
  };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-teal-700 shadow-md" style={{ height: '62.078px' }}>
      <div>
        <img src="images/c186678f7cd589c185fff8baa189e685.png" alt="Logo" className="ml-2 h-10" />
      </div>

      
      <button 
        className="md:hidden text-white" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      
      <nav className={`relative flex items-center ${mobileMenuOpen ? 'flex-col absolute top-16 left-0 w-full bg-gradient-to-r from-teal-500 to-teal-700 md:static md:flex-row' : 'hidden md:flex'}`}>
        <Link href="/" className="flex items-center text-white hover:text-gray-200 transition duration-200 mx-2 p-2" onClick={handleLinkClick}>
          <FiHome className="mr-1" /> Home
        </Link>
        <Link href="https://www.gammal.tech/" className="flex items-center text-white hover:text-gray-300 transition duration-200 mx-2 p-2" onClick={handleLinkClick}>
          <FiInfo className="mr-1" /> About
        </Link>
        <Link href="/pricing" className="flex items-center text-white hover:text-gray-300 transition duration-200 mx-2 p-2" onClick={handleLinkClick}>
          <FiDollarSign className="mr-1" /> Pricing
        </Link>
        <Link href="/signin" className="flex items-center" onClick={handleLinkClick}>
          <span 
            className="bg-[#FCE09B] text-black px-4 py-2 flex items-center justify-center hover:bg-[#FFEEA9] transition duration-200 mr-6" 
            style={{ borderRadius: '30px', minWidth: '94px', minHeight: '43px' }}
          >
            <FiUser className="mr-1" /> Sign In
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
