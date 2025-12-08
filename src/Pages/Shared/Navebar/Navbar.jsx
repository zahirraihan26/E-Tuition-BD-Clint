
import { FaUser, FaSignInAlt, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {

  const { user , logOut } = useAuth()


  const handelLogout =()=>{
        logOut()
        .then()
        .catch(error=>{
            console.log(error)
        })
    }

  const links = <>
    <li><NavLink to="/"> Home</NavLink></li>
    <li><NavLink to="/tuitions"> Tuitions</NavLink></li>
    <li><NavLink to="/tutors"> Tutors</NavLink></li>
    <li><NavLink to="/about"> About</NavLink></li>
    <li><NavLink to="/contact">  Contact</NavLink></li>

    


  </>

  return (
    <div className="navbar bg-base-100  shadow-sm sticky  z-50 top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">

          <div className="flex-shrink-0 flex items-center">
            <div className="bg-blue-900 text-white p-2 rounded-3xl mr-2">
              <FaGraduationCap />
            </div>
            <span className="font-bold text-xl text-black">
              Tuition<span className="text-yellow-500">Hub</span>
            </span>
          </div>


        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end mx-3 gap-4">
        
     
          
            {
              user?
                <button onClick={handelLogout} className='btn hidden md:flex items-center text-gray-700 hover:text-yellow-500'>Logout</button>
                
                :<>
                <Link className='btn hidden md:flex items-center text-gray-700 hover:text-yellow-500' to="/login">Login</Link>
             <Link className='btn  justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600' to="/register"><FaUser className="mr-2" />Register</Link>
              </>
            }
       
      
        
      </div>
    </div>
  );
};

export default Navbar;
