import React, { useState } from "react";
import { FaUser, FaSignInAlt, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky  z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-blue-900 text-white p-2 rounded-3xl mr-2">
              <FaGraduationCap />
            </div>
            <span className="font-bold text-xl text-black">
              Tuition<span className="text-yellow-500">Hub</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-yellow-500 font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 font-medium">
              Tuitions
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 font-medium">
              Tutors
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 font-medium">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 font-medium">
              Contact
            </a>
          </div>

          {/* Buttons & Hamburger */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-700 hover:text-yellow-500">
              <FaSignInAlt className="mr-1" /> Login
            </button>
            <button className="hidden md:flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
              <FaUser className="mr-2" /> register
            </button>

            {/* Mobile Hamburger */}
            <button className="md:hidden text-gray-700" onClick={toggleMenu}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
            <a href="#" className="block text-gray-700 hover:text-yellow-500 font-medium">
              Home
            </a>
            <a href="#" className="block text-gray-700 hover:text-yellow-500 font-medium">
              Tuitions
            </a>
            <a href="#" className="block text-gray-700 hover:text-yellow-500 font-medium">
              Tutors
            </a>
            <a href="#" className="block text-gray-700 hover:text-yellow-500 font-medium">
              About
            </a>
            <a href="#" className="block text-gray-700 hover:text-yellow-500 font-medium">
              Contact
            </a>
            <button className="w-full flex items-center justify-center text-gray-700 hover:text-yellow-500 mt-2">
              <FaSignInAlt className="mr-1" /> Login
            </button>
            <button className="w-full flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mt-2">
              <FaUser className="mr-2" /> Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
