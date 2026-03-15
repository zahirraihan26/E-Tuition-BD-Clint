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

  const accountCreated = user?.metadata?.creationTime
  ? new Date(user.metadata.creationTime).toLocaleDateString()
  : 'N/A';
  const createdFull =user?.metadata?.creationTime
  ? new Date(user.metadata.creationTime).toLocaleString()
  : 'N/A';
  const userId = 'uSwx7dlYg3ZRCkygsMf6lSwStxD3';

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 rounded-2xl shadow-lg mb-8 p-6 text-center border border-base-300/50"
        >
          <h1 className="text-2xl font-bold text-base-content tracking-tight">My Profile</h1>
          <p className="text-base-content/60 mt-1">Your account details at a glance.</p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300/50"
        >
          {/* Dark Header Section */}
          <div className="bg-neutral text-neutral-content p-8 flex items-center gap-6 border-b border-white/5">
            <div className="w-24 h-24 rounded-full bg-base-200 border-4 border-base-100 overflow-hidden shadow-xl">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-black uppercase tracking-wider">
                  {isRoleLoading ? 'Loading...' : role || 'Student'}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight">{user?.displayName || 'Zahir Raihan'}</h2>
              </div>
              <p className="text-neutral-content/60 mt-2 flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Active Account
              </p>
              <p className="mt-1 text-lg text-neutral-content/80 font-medium">{user?.email || 'mdzahirraihanbakul@gmail.com'}</p>
            </div>
            {/* Edit Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-auto px-6 py-2.5 bg-primary text-black font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* Details Cards */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 shadow-sm border border-base-300/50 transition-all">
              <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest leading-none">Full Name</p>
              <p className="text-xl font-bold text-base-content mt-2">{user?.displayName || 'Zahir Raihan'}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 shadow-sm border border-base-300/50 transition-all">
              <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest leading-none">Email</p>
              <p className="text-xl font-bold text-base-content mt-2 break-all">{user?.email}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 shadow-sm border border-base-300/50 transition-all">
              <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest leading-none">Account Created</p>
              <p className="text-xl font-bold text-base-content mt-2">{accountCreated}</p>
            </motion.div>
          </div>

          {/* Account Info */}
          <div className="px-8 pb-10 mt-4">
            <h3 className="text-lg font-bold text-base-content mb-6 tracking-tight">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-base-300/50 transition-all">
                <FaUserClock className="text-3xl text-primary" />
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Role</p>
                  <p className="text-xl font-bold text-base-content">{role || 'Student'}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-base-300/50 transition-all">
                <div className="w-4 h-4 bg-success rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Status</p>
                  <p className="text-xl font-bold text-success">Active</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-base-300/50 transition-all">
                <FaCalendarAlt className="text-3xl text-primary" />
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Created (Full)</p>
                  <p className="text-lg font-bold text-base-content">{createdFull}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-base-300/50 transition-all">
                <FaIdBadge className="text-3xl text-primary" />
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">User ID</p>
                  <p className="text-lg font-bold text-base-content break-all leading-tight">{user?.uid || userId}</p>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-2xl w-full max-w-md relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 text-base-content/50 hover:text-primary transition-colors text-2xl font-bold"
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
