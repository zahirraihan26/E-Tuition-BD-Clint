import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCastForEducation } from "react-icons/md";

const Banner = () => {
  return (
    <div className="bg-[#0F1B36] w-full py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-sm mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MdOutlineCastForEducation className="text-yellow-400" />
            <span>#1 Tuition Platform</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Find the Perfect <span className="text-yellow-400">Tutor</span>
            <br /> for Your Learning Journey
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-300 mt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Connect with qualified tutors, post tuition requests, and achieve
            your academic goals. Personalized learning made simple.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <IoSearch /> Find Tuitions
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white px-6 py-3 rounded-lg font-semibold"
            >
              Become a Tutor
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-10 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div>
              <h2 className="text-3xl font-bold">5000+</h2>
              <p className="text-gray-400 text-sm">Tuitions Posted</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">2500+</h2>
              <p className="text-gray-400 text-sm">Expert Tutors</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">98%</h2>
              <p className="text-gray-400 text-sm">Success Rate</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Tutor Card */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="bg-white text-black p-6 rounded-2xl shadow-xl w-[80%]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold">Mathematics Tutor</h3>
            <p className="text-gray-500 mt-1">Advanced Calculus • Online</p>

            <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg mt-4 w-fit">
              <FaUserGraduate className="text-green-500" />
              <span className="text-sm text-green-700">Verified Expert</span>
            </div>

            <div className="flex justify-between mt-6 items-center">
              <p className="text-yellow-500 font-bold text-lg">$50/hr</p>
              <div className="bg-yellow-500 text-black px-4 py-1 rounded-full flex items-center gap-2 text-sm">
                <FaUsers />
                125+ enrolled
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
