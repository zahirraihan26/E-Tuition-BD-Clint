import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg relative z-10"
      >
        {/* Icon */}
        <div className="flex justify-center mb-10">
          <motion.div 
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <FaExclamationTriangle className="text-primary text-5xl" />
          </motion.div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-none">
          404
        </h1>
        <h2 className="mt-6 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent tracking-tight">
          Lost in Space?
        </h2>

        {/* Message */}
        <p className="mt-6 text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
          Oops! The page you are looking for doesn’t exist or may have been moved. <span className="text-white/80 italic font-bold">Let's get you back on track.</span>
        </p>

        {/* Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-10 py-4 font-black bg-primary text-black rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest"
          >
            <FaHome className="text-xl" />
            Go Back Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Error;
