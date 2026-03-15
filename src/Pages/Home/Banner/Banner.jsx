import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCastForEducation } from "react-icons/md";

const Banner = () => {
  return (
    <div className="relative w-full py-24 overflow-hidden bg-[#020617] text-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MdOutlineCastForEducation className="text-primary text-sm" />
            <span className="text-primary uppercase tracking-widest font-black">#1 Tuition Platform</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Find the Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">Tutor</span>
            <br /> for Your Journey
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-slate-400 mt-6 text-xl max-w-lg leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Connect with qualified tutors, post tuition requests, and achieve
            your academic goals. <span className="text-white/80 italic font-bold">Personalized learning made simple.</span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-5 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-amber-400 text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl text-base uppercase tracking-widest"
            >
              <IoSearch className="text-xl font-black" /> Find Tuitions
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/10 px-10 py-4 rounded-2xl font-black hover:border-primary transition-all backdrop-blur-md text-base uppercase tracking-widest"
            >
              Become a Tutor
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-12 mt-16 border-t border-white/5 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div>
              <h2 className="text-4xl font-black text-white">5000+</h2>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Tuitions Posted</p>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white">2500+</h2>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Expert Tutors</p>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-4xl font-black text-white">98%</h2>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Success Rate</p>
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
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>

          <motion.div
            className="bg-slate-900/40 backdrop-blur-3xl text-white p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] w-full max-w-sm border border-white/10 hover:border-primary/40 transition-all duration-500 group"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-3xl font-black tracking-tighter">Mathematics Tutor</h3>
            <p className="text-slate-400 mt-2 font-black uppercase text-xs tracking-widest">Advanced Calculus • <span className="text-primary italic">Online</span></p>

            <div className="flex items-center gap-2 bg-emerald-500/10 p-3 rounded-2xl mt-6 w-fit border border-emerald-500/20">
              <FaUserGraduate className="text-emerald-400" />
              <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">Verified Expert</span>
            </div>

            <div className="flex justify-between mt-12 items-end border-t border-white/5 pt-8">
              <div>
                <p className="text-primary font-black text-4xl">$50<span className="text-sm font-bold text-slate-500 uppercase ml-1">/hr</span></p>
              </div>
              <div className="bg-white/5 text-white/40 border border-white/10 px-5 py-2 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
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
