import { FaUser, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";
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
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-gray-700 hover:text-yellow-500 transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tuitions"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-gray-700 hover:text-yellow-500 transition"
          }
        >
          Tuitions
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Tutor-listing"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-gray-700 hover:text-yellow-500 transition"
          }
        >
          Tutor Listing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-gray-700 hover:text-yellow-500 transition"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-gray-700 hover:text-yellow-500 transition"
          }
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-gray-700 hover:text-yellow-500 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="  bg-blue-900 text-white p-3 rounded-full mr-3 shadow-lg">
              <FaGraduationCap size={20} />
            </div>
            <span className="font-bold text-xl text-gray-800">
              Tuition<span className="text-yellow-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 font-medium">{links}</ul>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={handelLogout}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition"
                >
                  Logout
                </button>

                <Link>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
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
          <div className="lg:hidden mt-2 bg-white rounded-lg shadow-md p-4 animate-slide-down">
            <ul className="flex flex-col space-y-3 font-medium">{links}</ul>

            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <button
                    onClick={handelLogout}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition"
                  >
                    Logout
                  </button>

                  <Link>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md">
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
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
