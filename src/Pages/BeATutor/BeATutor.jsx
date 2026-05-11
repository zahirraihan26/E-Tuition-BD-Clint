import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCastForEducation, MdAttachMoney, MdSecurity } from 'react-icons/md';
import { IoRocketOutline, IoTimeOutline, IoGlobeOutline } from 'react-icons/io5';
import { FaUserTie, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router';

const BeATutor = () => {
    const benefits = [
        {
            id: 1,
            icon: <IoTimeOutline className="text-4xl text-primary" />,
            title: "Flexible Schedule",
            description: "Teach on your own terms. Choose the hours that fit your lifestyle and maintain a perfect work-life balance."
        },
        {
            id: 2,
            icon: <MdAttachMoney className="text-4xl text-emerald-400" />,
            title: "Competitive Earnings",
            description: "Set your own rates based on your expertise. Get paid securely and consistently without any hidden fees."
        },
        {
            id: 3,
            icon: <IoGlobeOutline className="text-4xl text-blue-400" />,
            title: "Global Reach",
            description: "Connect with a vast network of students not just locally, but across the country. Expand your impact."
        },
        {
            id: 4,
            icon: <FaUserTie className="text-4xl text-purple-400" />,
            title: "Professional Growth",
            description: "Build your reputation, gain valuable teaching experience, and access exclusive resources to refine your skills."
        },
        {
            id: 5,
            icon: <FaHeadset className="text-4xl text-amber-400" />,
            title: "Dedicated Support",
            description: "Our 24/7 support team is always here to assist you with any questions or technical issues you might encounter."
        },
        {
            id: 6,
            icon: <MdSecurity className="text-4xl text-rose-400" />,
            title: "Secure Platform",
            description: "Enjoy peace of mind with our robust security measures, reliable payment processing, and safe communication channels."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="w-full bg-[#020617] min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 text-white">
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
                            <Link to="/register">
                                <button className="bg-primary hover:bg-amber-400 text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl text-base uppercase tracking-widest">
                                    <IoRocketOutline className="text-xl font-black" /> Register Now
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative z-10 py-24 bg-slate-900/50 border-t border-white/5 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                        >
                            Why Join As A <span className="text-primary">Tutor?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto"
                        >
                            We provide everything you need to succeed. Focus on what you do best — teaching.
                        </motion.p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {benefits.map((benefit) => (
                            <motion.div 
                                key={benefit.id}
                                 variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-[#020617] border border-white/10 hover:border-primary/40 rounded-[2rem] p-8 shadow-2xl transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
                                
                                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-primary/30">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BeATutor;