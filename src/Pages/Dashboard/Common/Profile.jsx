
import { Outlet } from 'react-router';

import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { FaUser, FaEnvelope, FaIdBadge } from 'react-icons/fa';

import { useState } from 'react';
import UpdateProfileForm from './Updateprofile';

const Profile = () => {
  const { user, refetchUser } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [showUpdateForm, setShowUpdateForm] = useState(false); // 🔹 state

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">

        {/* Left Panel */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-6 md:w-1/3 relative">
          <div className="w-36 h-36 rounded-full border-4 border-yellow-400 overflow-hidden shadow-xl mb-4 transform transition duration-500 hover:scale-105">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">{user?.displayName || "Anonymous"}</h2>

          <span className="mt-2 px-4 py-1 rounded-full text-sm font-semibold text-white bg-green-500 shadow-md">
            {isRoleLoading ? "Loading..." : role || "N/A"}
          </span>

          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center gap-3 bg-yellow-50 rounded-xl p-3 shadow-sm hover:shadow-md transition">
              <FaEnvelope className="text-yellow-400" />
              <span className="text-gray-700 break-words">{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 bg-yellow-50 rounded-xl p-3 shadow-sm hover:shadow-md transition">
              <FaIdBadge className="text-yellow-400" />
              <span className="text-gray-700">{user?.uid || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white shadow-lg rounded-3xl p-8 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition">
              <FaUser className="text-yellow-400 text-3xl mb-2" />
              <span className="text-gray-500 text-sm">Total Applications</span>
              <p className="text-gray-800 font-bold text-xl mt-1">23</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition">
              <FaUser className="text-yellow-400 text-3xl mb-2" />
              <span className="text-gray-500 text-sm">Completed Transactions</span>
              <p className="text-gray-800 font-bold text-xl mt-1">15</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-3xl shadow-md hover:shadow-lg transition transform duration-300"
            >
              {showUpdateForm ? "Close Form" : "Update Profile"}
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-3xl shadow-md hover:shadow-lg transition transform duration-300">
              Change Password
            </button>
          </div>

          {/* Update Form */}
          {showUpdateForm && (
            <div className="mt-6">
              <UpdateProfileForm
                user={user}
                onUpdate={() => {
                  refetchUser();
                  setShowUpdateForm(false);
                }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
