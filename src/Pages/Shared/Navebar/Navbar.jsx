import { FaUser, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router"; // fixed import
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handelLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={() => setIsOpen(false)}>   Home  </NavLink>
      </li>
      <li>
        <NavLink to="/tuitions" onClick={() => setIsOpen(false)}>    Tuitions </NavLink>
      </li>
      <li>
        <NavLink to="/Tutor-listing" onClick={() => setIsOpen(false)}>  Tutor Listing </NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={() => setIsOpen(false)}> About  </NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={() => setIsOpen(false)}>   Contact </NavLink>
      </li>
      {
        user && <>
         <li>
        <NavLink to="/dashboard/my-tuitions" onClick={() => setIsOpen(false)}>  My Tuitions </NavLink>
      </li>
        </>
      }
    </>
  );

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-blue-900 text-white p-2 rounded-3xl mr-2">
              <FaGraduationCap />
            </div>
            <span className="font-bold text-xl text-black">
              Tuition<span className="text-yellow-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-4 font-medium">{links}</ul>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <button onClick={handelLogout}
                className="btn text-gray-700 hover:text-yellow-500"
              >  Logout
              </button>
            ) : (
              <>
                <Link
                  className="btn text-gray-700 hover:text-yellow-500"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  to="/register"
                >
                  <FaUser className="mr-2" /> Register
                </Link>
              </>
            )}

           
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2">
            <ul className="space-y-2 font-medium">{links}</ul>

            <div className="mt-4 flex flex-col gap-2">
              {user ? (
                <button
                  onClick={handelLogout}
                  className="btn text-gray-700 hover:text-yellow-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    className="btn text-gray-700 hover:text-yellow-500"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    to="/register"
                  >
                    <FaUser className="mr-2" /> Register
                  </Link>
                </>
              )}
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
