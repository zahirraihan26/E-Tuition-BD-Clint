import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCastForEducation } from 'react-icons/md';
import { IoRocketOutline } from 'react-icons/io5';

const BeATutor = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#020617] py-24 text-white">
                {/* Premium Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Tag */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] mx-auto"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <MdOutlineCastForEducation className="text-primary text-sm" />
                            <span className="text-primary uppercase tracking-widest font-black">Become A Tutor</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                            Join Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">Expert Team</span>
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
                        >
                            Share your knowledge, inspire students, and build a rewarding career. <span className="text-white/80 italic font-bold">Your expertise deserves the best platform.</span>
                        </motion.p>

                        <motion.div
                            className="flex justify-center mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <button className="bg-primary hover:bg-amber-400 text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl text-base uppercase tracking-widest">
                                <IoRocketOutline className="text-xl font-black" /> Register Now
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section Placeholder */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <p className="text-slate-500 font-medium">Application details and process coming soon...</p>
            </div>
        </div>
    );
};

export default BeATutor;