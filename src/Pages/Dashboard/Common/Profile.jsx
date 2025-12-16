import React, { useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaUserClock, FaIdBadge, FaEdit } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import UpdateProfileForm from './Updateprofile';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accountCreated = '12/14/2025';
  const createdFull = '12/14/2025, 11:33:58 PM';
  const userId = 'uSwx7dlYg3ZRCkygsMf6lSwStxD3';

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg mb-8 p-6 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Your account details at a glance.</p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Dark Header Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden shadow-xl">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500">
                  {isRoleLoading ? 'Loading...' : role || 'Student'}
                </span>
                <h2 className="text-3xl font-bold">{user?.displayName || 'Zahir Raihan'}</h2>
              </div>
              <p className="text-gray-300 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </p>
              <p className="mt-1 text-lg">{user?.email || 'mdzahirraihanbakul@gmail.com'}</p>
            </div>
            {/* Edit Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-auto px-4 py-2 bg-yellow-400 text-white rounded-full flex items-center gap-2 hover:bg-yellow-500 transition"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* Details Cards */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Full Name</p>
              <p className="text-xl font-semibold text-gray-800 mt-2">{user?.displayName || 'Zahir Raihan'}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Email</p>
              <p className="text-xl font-semibold text-gray-800 mt-2 break-all">{user?.email}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Account Created</p>
              <p className="text-xl font-semibold text-gray-800 mt-2">{accountCreated}</p>
            </motion.div>
          </div>

          {/* Account Info */}
          <div className="px-8 pb-8 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <FaUserClock className="text-3xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-xl font-semibold text-gray-800">{role || 'Student'}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-xl font-semibold text-green-600">Active</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <FaCalendarAlt className="text-3xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Created (Full)</p>
                  <p className="text-lg font-medium text-gray-800">{createdFull}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <FaIdBadge className="text-3xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-lg font-medium text-gray-800 break-all">{user?.uid || userId}</p>
                </div>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.8 }} 
              className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                &times;
              </button>
              <UpdateProfileForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
