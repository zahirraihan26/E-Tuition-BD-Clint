import React from 'react';
import { FaBookMedical, FaBookOpen, FaChalkboardTeacher, FaChartLine, FaGraduationCap, FaUser, FaUsers } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa6';
import { MdManageAccounts, MdOutlinePayments } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner';
import useAuth from '../hooks/useAuth';


const Dashboardlaouts = () => {
  const { user } = useAuth()
  const { role, isRoleLoading } = useRole()

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
       <nav className="navbar w-full bg-base-300">
  <div className="w-full flex justify-between items-center px-6">

    {/* ===== LEFT SIDE ===== */}
    <div className="flex items-center gap-3">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="size-5"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M9 4v16" />
          <path d="M14 10l2 2l-2 2" />
        </svg>
      </label>

      <div className="flex items-center">
        <div className="bg-blue-900 text-white p-3 rounded-full mr-3 shadow-lg">
          <FaGraduationCap size={20} />
        </div>
        <span className="font-bold text-xl text-gray-800">
          Tuition<span className="text-yellow-500">Hub</span>
        </span>
      </div>
    </div>

    {/* ===== RIGHT SIDE ===== */}
    <div className="flex items-center gap-3">

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full border-2  border-gray-400 shadow-md overflow-hidden flex hidden md:block items-center justify-center bg-blue-600 text-white font-semibold relative">
        {/* First Letter fallback */}
        {!user?.photoURL && (
          <span>
            {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        )}

        {/* Photo */}
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="User"
            className="w-full h-full object-cover absolute inset-0"
          />
        )}
      </div>

      {/* User Info */}
      <div className="leading-tight hidden md:block">
        <h3 className="text-sm font-medium text-gray-800">
          {user?.displayName || 'User'}
        </h3>
        <p className="text-xs text-gray-500">
          {user?.email}
        </p>
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
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            <li>


              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="profile" to="/dashboard">
                <FaUser />
                <span className="is-drawer-close:hidden">Profile</span></NavLink>
            </li>




            {/*  dashboard links */}
            {
              role === 'student' && <>
                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="MyTuition" to="/dashboard/my-tuitions"> <FaBookOpen />
                    <span className="is-drawer-close:hidden">My-Tuitions</span>

                  </NavLink>
                </li>
                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add-New-Tuition" to="/dashboard/new-tuition">
                    <FaBookMedical />
                    <span className="is-drawer-close:hidden">Add-New-Tuition</span></NavLink>
                </li>
                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Applied-tutors" to="/dashboard/applied-tutors">
                    <FaUserGraduate />
                    <span className="is-drawer-close:hidden">Applied-tutors</span></NavLink>
                </li>
                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="student-paymenthistory" to="/dashboard/student-paymenthistory">
                    <MdOutlinePayments />
                    <span className="is-drawer-close:hidden">student payment history</span></NavLink>
                </li>
              </>
            }

            {/* teacher  */}
            {
              role === 'tutor' && <>

                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tutor Applications" to="/dashboard/tutor-applications">
                    <FaChalkboardTeacher />
                    <span className="is-drawer-close:hidden">Tutor-Applications </span></NavLink>
                </li>

                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tutor-Revenue" to="/dashboard/tutor-revenue">
                    <MdOutlinePayments />
                    <span className="is-drawer-close:hidden">Tutor Revenue</span></NavLink>
                </li>

              </>
            }

            {/* Admin  */}

            {
              role === 'admin' && <>

                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reports & Analytics" to="/dashboard/reports-analytics">
                    <FaChartLine />
                    <span className="is-drawer-close:hidden">Reports & Analytics</span></NavLink>
                </li>
                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management" to="/dashboard/user-management">
                    <FaUsers />
                    <span className="is-drawer-close:hidden">User Management</span></NavLink>
                </li>

                <li>
                  <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tuition Management" to="/dashboard/tuition-management">
                    <MdManageAccounts />
                    <span className="is-drawer-close:hidden">Tuition Management</span></NavLink>
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
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlaouts;