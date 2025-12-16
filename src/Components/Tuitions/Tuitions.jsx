import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import TuitionsCard from '../TuitionsCard/TuitionsCard';
import { FaSearch, FaBook, FaMapMarkerAlt, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

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
    <div className="w-full font-sans">

      {/* Hero */}
      <div className="bg-[#0F1B36]   py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          Browse <span className="text-yellow-400">Tuitions</span>
        </h1>
        <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
          Find the perfect tutoring opportunity that matches your skills and schedule.
        </p>
      </div>

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
              className="w-full border rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
              className="w-full border rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
              className="w-full border rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
              className="w-full border rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
        <h2 className="mb-6 text-lg font-semibold text-gray-700">
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
            className="px-4 py-2 border rounded shadow hover:bg-yellow-400 hover:text-white disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 border rounded shadow hover:bg-yellow-400 hover:text-white 
                ${page === num + 1 ? 'bg-yellow-400 text-white' : 'bg-gray-100'}`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded shadow hover:bg-yellow-400 hover:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tuitions;
