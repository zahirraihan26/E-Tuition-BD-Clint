import React from 'react';
import { FaBookMedical, FaBookOpen, FaChalkboardTeacher, FaChartLine, FaGraduationCap, FaUser, FaUsers } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa6';
import { MdManageAccounts, MdOutlinePayments } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../Context/ThemeContext/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';


const Dashboardlaouts = () => {
  const { user } = useAuth()
  const { role, isRoleLoading } = useRole()
  const { theme, toggleTheme } = useTheme()

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 border-b border-base-300/50 shadow-sm px-6 py-4">
          <div className="w-full flex justify-between items-center">

            {/* ===== LEFT SIDE ===== */}
            <div className="flex items-center gap-4">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-ghost btn-circle lg:hidden shadow-sm border border-base-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              </label>

              <div className="flex items-center group cursor-pointer">
                <div className="bg-primary text-black p-2 rounded-xl mr-3 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-300">
                  <FaGraduationCap size={22} />
                </div>
                <span className="font-black text-2xl text-base-content tracking-tighter">
                  E <span className="text-primary italic">Tuition</span>
                </span>
              </div>
            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle shadow-sm border border-base-300 hover:bg-base-300 transition-all duration-300"
              >
                {theme === 'light' ? (
                  <FaMoon className="size-5 text-indigo-600" />
                ) : (
                  <FaSun className="size-5 text-amber-500" />
                )}
              </button>

              {/* User Info */}
              <div className="text-right hidden md:block">
                <h3 className="text-sm font-black text-base-content uppercase tracking-widest leading-none">
                  {user?.displayName || 'User'}
                </h3>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 opacity-70">
                  {role || 'Member'}
                </p>
              </div>

              {/* Avatar */}
              <div className="avatar ring-offset-2 ring-2 ring-primary/20 rounded-full hover:ring-primary/50 transition-all duration-300 cursor-pointer">
                <div className="w-10 rounded-full bg-base-300">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-base-content font-bold">
                      {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>


        {/* Page content here */}
        <Outlet></Outlet>

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            <li>
              <Link to='/' className="flex items-center gap-4 p-4 rounded-xl hover:bg-base-300 transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" className="size-5 text-base-content/40 group-hover:text-primary transition-colors"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="font-bold text-sm text-base-content group-hover:translate-x-1 transition-transform is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            <li className="menu-title mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 ml-2 is-drawer-close:hidden">
              Personal
            </li>

            <li>
              <NavLink end className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Profile" to="/dashboard">
                <FaUser className="size-4" />
                <span className="font-bold text-sm is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>




            {/*  dashboard links */}
            {
              role === 'student' && <>
                <li className="menu-title mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 ml-2 is-drawer-close:hidden">
                  Learning
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="My Tuitions" to="/dashboard/my-tuitions">
                    <FaBookOpen className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">My Tuitions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Post Tuition" to="/dashboard/new-tuition">
                    <FaBookMedical className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Post Tuition</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Applied Tutors" to="/dashboard/applied-tutors">
                    <FaUserGraduate className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Applied Tutors</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Payments" to="/dashboard/student-paymenthistory">
                    <MdOutlinePayments className="size-5" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Payments</span>
                  </NavLink>
                </li>
              </>
            }

            {/* teacher  */}
            {
              role === 'tutor' && <>
                <li className="menu-title mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 ml-2 is-drawer-close:hidden">
                  Teaching
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Applications" to="/dashboard/tutor-applications">
                    <FaChalkboardTeacher className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Applications</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Revenue" to="/dashboard/tutor-revenue">
                    <MdOutlinePayments className="size-5" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Revenue</span>
                  </NavLink>
                </li>
              </>
            }

            {/* Admin  */}
            {
              role === 'admin' && <>
                <li className="menu-title mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 ml-2 is-drawer-close:hidden">
                  Administration
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Analytics" to="/dashboard/reports-analytics">
                    <FaChartLine className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Analytics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Users" to="/dashboard/user-management">
                    <FaUsers className="size-4" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'bg-primary text-black' : 'hover:bg-base-300 text-base-content/60 hover:text-base-content'}`} data-tip="Tuitions" to="/dashboard/tuition-management">
                    <MdManageAccounts className="size-5" />
                    <span className="font-bold text-sm is-drawer-close:hidden">Tuitions</span>
                  </NavLink>
                </li>
              </>
            }



          </ul>
          <ul className="menu w-full mt-auto border-t border-base-300 pt-2">
            {/* List item */}
            {/* <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="profile" to="/dashboard/profile">
                <FaUser />
                <span className="is-drawer-close:hidden">Profile</span></NavLink>
            </li> */}
            <li>
              <button className="flex items-center gap-4 p-4 rounded-xl hover:bg-base-300 transition-all duration-300 group w-full is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" className="size-5 text-base-content/40 group-hover:text-primary transition-colors"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="font-bold text-sm text-base-content group-hover:translate-x-1 transition-transform is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlaouts;