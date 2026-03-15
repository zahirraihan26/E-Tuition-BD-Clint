import { FaUser, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../../Components/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handelLogout = () => {
    logOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
            }`
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
            `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
            }`
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
            `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
            }`
          }
        >
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
            }`
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
            `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
            }`
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
              `relative px-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-primary ${isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-base-content/80"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-base-100/70 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-primary text-black p-2.5 rounded-2xl mr-3 shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-300">
              <FaGraduationCap size={24} />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-base-content">
              E <span className="text-primary">Tuition</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 font-medium">{links}</ul>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <button
                  onClick={handelLogout}
                  className="px-5 py-2.5 rounded-xl border border-base-content/10 text-sm font-bold text-base-content/70 hover:text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Logout
                </button>

                <Link to="/dashboard">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform duration-300">
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
                  className="px-5 py-2.5 rounded-xl border border-base-content/10 text-sm font-bold text-base-content/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="flex items-center bg-primary text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
                  to="/register"
                >
                  <FaUser className="mr-2" /> Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <div className="flex items-center gap-2">
              <div className="md:hidden">
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-base-content focus:outline-none"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 bg-base-100 rounded-lg shadow-md p-4 animate-slide-down">
            <ul className="flex flex-col space-y-3 font-medium">{links}</ul>

            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <button
                    onClick={handelLogout}
                    className="px-4 py-2 rounded-lg border border-base-300 text-base-content hover:text-yellow-500 hover:border-yellow-500 transition"
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
                    className="px-4 py-2 rounded-lg border border-base-300 text-base-content hover:text-yellow-500 hover:border-yellow-500 transition"
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
