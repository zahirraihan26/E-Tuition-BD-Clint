import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCastForEducation } from 'react-icons/md';
const Aboutbanner = () => {
    return (
        <section className="relative overflow-hidden bg-[#020617] py-24 text-white border-b border-white/5">
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
                        <span className="text-primary uppercase tracking-widest font-black">Our Mission</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-white uppercase">
                        About{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">
                            E Tuition
                        </span>
                    </h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto max-w-3xl text-slate-400 text-lg md:text-xl leading-relaxed font-medium"
                    >
                        We're on a mission to transform education by making personalized tutoring accessible,
                        affordable, and effective for students everywhere. <span className="text-white/80 italic font-bold">Personalized learning made simple.</span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Aboutbanner;