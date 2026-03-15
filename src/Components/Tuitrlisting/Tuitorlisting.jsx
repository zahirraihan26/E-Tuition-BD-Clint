import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FaStar, FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdOutlineCastForEducation } from 'react-icons/md';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

const Tuitorlisting = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/tutors`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (tutors.length === 0)
    return <p className="text-center mt-10 text-gray-500">No tutors found</p>;

  /* ---------------- PAGINATION LOGIC ---------------- */
  const totalPages = Math.ceil(tutors.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTutors = tutors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full mb-12">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#020617] py-24 text-white mb-12">
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
              <span className="text-primary uppercase tracking-widest font-black">Explore Tutors</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
              Browse{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">
                Tutors
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
            >
              Connect with verified experts based on experience and qualification. <span className="text-white/80 italic font-bold">Your academic success starts here.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4 max-w-7xl mx-auto">
        {paginatedTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-base-100 rounded-2xl p-6 flex flex-col items-center border border-base-300 shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-base-200 shadow-inner relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={tutor.photoURL || 'https://i.ibb.co/2nFJYyZ/default-avatar.png'}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="mt-5 text-xl font-black text-base-content tracking-tight">
                {tutor.name}
              </h2>

              <div className="mt-4 space-y-1 text-center">
                <p className="text-sm text-base-content/70">
                  <span className="font-bold text-primary/80 uppercase text-[10px] tracking-widest block mb-0.5">Qualification</span> 
                  {tutor.qualification}
                </p>
                <p className="text-sm text-base-content/70">
                  <span className="font-bold text-primary/80 uppercase text-[10px] tracking-widest block mb-0.5">Experience</span> 
                  {tutor.experience} yrs
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 bg-base-200 px-3 py-1.5 rounded-full border border-base-300">
                <FaStar className="text-amber-400" />
                <span className="font-bold text-sm text-base-content">4.8</span>
                <span className="text-base-content/40 text-[11px] font-bold uppercase tracking-wider">(Trusted)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                <button className="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-xl text-[11px] font-bold uppercase tracking-tighter">
                  <FaEnvelope /> Message
                </button>
                <button className="btn btn-sm btn-primary rounded-xl text-[11px] font-bold uppercase tracking-tighter shadow-lg shadow-primary/20">
                  <FaPhone /> Call
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-base-200 w-full text-center">
                <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest">
                  Joined {new Date(tutor.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="btn btn-square btn-outline border-base-300 disabled:opacity-50 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn btn-square transition-all duration-300 border-base-300
                ${page === num + 1
                  ? 'btn-primary shadow-lg shadow-primary/20 text-black'
                  : 'btn-ghost hover:bg-base-300 text-base-content/60'}
              `}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-square btn-outline border-base-300 disabled:opacity-50 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Tuitorlisting;
