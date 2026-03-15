import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaHeart, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { GiGraduateCap } from 'react-icons/gi';
import { MdOutlineCastForEducation } from 'react-icons/md';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import TutorApplyModal from '../TuitoApplyModal/TutorApplyModal';
import useRole from '../../hooks/useRole';

const fetchTuition = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuitions/${id}`);
    return res.data;
};

const ViewDetails = () => {
    const { id } = useParams();
    const { role, isRoleLoading } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: tuition, isLoading, isError } = useQuery({
        queryKey: ['tuition', id],
        queryFn: () => fetchTuition(id),
    });

    if (isLoading || isRoleLoading) return <LoadingSpinner />;

    if (isError || !tuition) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <div className="text-center text-red-500 font-bold text-2xl px-6 py-4 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-md">
                    Tuition not Found
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="w-full pb-32 bg-base-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 text-white">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-primary/20 backdrop-blur-md"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <MdOutlineCastForEducation className="text-primary text-sm" />
                            <span className="text-primary uppercase tracking-widest">Tuition Details</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4 uppercase italic">
                            Tuition{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">
                                Overview
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Card */}
            <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="bg-base-100 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-base-200 overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Profile Section */}
                        <div className="lg:w-1/3 bg-base-200/50 p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-base-300">
                            <motion.div 
                                variants={itemVariants}
                                className="relative group"
                            >
                                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <img
                                    src={tuition.student?.image || 'https://i.ibb.co/2nFJYyZ/default-avatar.png'}
                                    alt={tuition.student?.name}
                                    className="w-56 h-56 rounded-3xl object-cover border-4 border-white shadow-2xl relative z-10 transform group-hover:scale-105 transition duration-500"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="text-center mt-8">
                                <h2 className="text-3xl font-black tracking-tight text-base-content uppercase">{tuition.student?.name}</h2>
                                <div className="inline-flex items-center gap-2 mt-2 py-1 px-4 bg-base-300 rounded-full text-xs font-black tracking-widest uppercase text-base-content/60">
                                    <FaUserTie className="text-primary" /> Student Profile
                                </div>
                            </motion.div>
                        </div>

                        {/* Details Grid */}
                        <div className="lg:w-2/3 p-12">
                            <motion.h3 
                                variants={itemVariants}
                                className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8"
                            >
                                Tuition Information
                            </motion.h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {/* Info Box: Budget */}
                                <motion.div variants={itemVariants} className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-primary/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition duration-300">
                                            <FaMoneyBillWave size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-base-content/40">Budget</p>
                                            <p className="text-xl font-black text-base-content uppercase tracking-tight">{tuition.budget} BDT</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Info Box: Location */}
                                <motion.div variants={itemVariants} className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-red-500/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 group-hover:scale-110 transition duration-300">
                                            <FaMapMarkerAlt size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-base-content/40">Location</p>
                                            <p className="text-xl font-black text-base-content uppercase tracking-tight">{tuition.location}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Info Box: Schedule */}
                                <motion.div variants={itemVariants} className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-blue-500/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition duration-300">
                                            <FaClock size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-base-content/40">Schedule</p>
                                            <p className="text-xl font-black text-base-content uppercase tracking-tight">{tuition.schedule}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Info Box: Subject */}
                                <motion.div variants={itemVariants} className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-amber-500/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition duration-300">
                                            <FaCalendarAlt size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-base-content/40">Subject</p>
                                            <p className="text-xl font-black text-base-content uppercase tracking-tight italic">{tuition.subject}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Description */}
                            <motion.div variants={itemVariants} className="mb-12">
                                <h4 className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-4">Detailed Requirements</h4>
                                <div className="bg-base-200 p-8 rounded-[2rem] border border-base-300 text-base-content/70 leading-relaxed text-lg font-medium italic">
                                    "{tuition.description}"
                                </div>
                            </motion.div>

                            {/* Action Area */}
                            {role === 'tutor' && (
                                <motion.div variants={itemVariants} className="flex justify-end pr-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-primary hover:bg-amber-400 text-black px-12 py-5 rounded-2xl font-black flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all uppercase tracking-widest text-base"
                                    >
                                        <FaHeart className="text-xl" /> Apply For This Tuition
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tutor Apply Modal */}
            {isModalOpen && (
                <TutorApplyModal
                    tuition={tuition}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ViewDetails;
