import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import TuitionsCard from '../TuitionsCard/TuitionsCard';
import { FaSearch, FaBook, FaMapMarkerAlt, FaSortAmountDown } from 'react-icons/fa';
import { MdOutlineCastForEducation } from 'react-icons/md';
import { motion } from 'framer-motion';

const Tuitions = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const [searchText, setSearchText] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const { data: Tuitions = [], isLoading } = useQuery({
    queryKey: ['Tuitions'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  let processedTuitions = Tuitions.filter(t => t.status === 'approved');

  // Search by title or location
  if (searchText) {
    processedTuitions = processedTuitions.filter(t =>
      t.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      t.location?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Filter by subject
  if (filterSubject) {
    processedTuitions = processedTuitions.filter(t =>
      t.subject?.toLowerCase() === filterSubject.toLowerCase()
    );
  }

  // Filter by location
  if (filterLocation) {
    processedTuitions = processedTuitions.filter(t =>
      t.location?.toLowerCase().includes(filterLocation.toLowerCase())
    );
  }

  // Sorting
  if (sortBy === 'budgetLowHigh') processedTuitions.sort((a, b) => a.budget - b.budget);
  else if (sortBy === 'budgetHighLow') processedTuitions.sort((a, b) => b.budget - a.budget);
  else if (sortBy === 'latest') processedTuitions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination
  const totalPages = Math.ceil(processedTuitions.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTuitions = processedTuitions.slice(startIndex, startIndex + itemsPerPage);

  const subjects = [...new Set(Tuitions.map(t => t.subject).filter(Boolean))];
  const locations = [...new Set(Tuitions.map(t => t.location).filter(Boolean))];

  return (
    <div className="w-full font-sans bg-base-100">

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
              <span className="text-primary uppercase tracking-widest font-black">Explore Opportunities</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
              Browse{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">
                Tuitions
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
            >
              Connect with elite teaching opportunities and achieve your academic goals. <span className="text-white/80 italic font-bold">Personalized learning made simple.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Search */}
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchText}
              onChange={e => { setSearchText(e.target.value); setPage(1); }}
              className="w-full border border-base-300 bg-base-100 text-base-content rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
          </div>

          {/* Subject Filter */}
          <div className="relative w-full md:w-48">
            <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterSubject}
              onChange={e => { setFilterSubject(e.target.value); setPage(1); }}
              className="w-full border border-base-300 bg-base-100 text-base-content rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Subjects</option>
              {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative w-full md:w-48">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterLocation}
              onChange={e => { setFilterLocation(e.target.value); setPage(1); }}
              className="w-full border border-base-300 bg-base-100 text-base-content rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Locations</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          {/* Sorting */}
          <div className="relative w-full md:w-48">
            <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setPage(1); }}
              className="w-full border border-base-300 bg-base-100 text-base-content rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="latest">Most Recent</option>
              <option value="budgetLowHigh">Budget: Low → High</option>
              <option value="budgetHighLow">Budget: High → Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="mb-6 text-lg font-semibold text-base-content/70">
          Showing {paginatedTuitions.length} of {processedTuitions.length} tuitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {paginatedTuitions.map(tuition => (
            <TuitionsCard key={tuition._id} Tuitions={tuition} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-base-300 bg-base-100 text-base-content rounded shadow hover:bg-primary hover:text-primary-content disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 border border-base-300 rounded shadow hover:bg-primary hover:text-primary-content 
                ${page === num + 1 ? 'bg-primary text-primary-content' : 'bg-base-100'}`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-base-300 bg-base-100 text-base-content rounded shadow hover:bg-primary hover:text-primary-content disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tuitions;
