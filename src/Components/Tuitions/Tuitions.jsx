import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import TuitionsCard from '../TuitionsCard/TuitionsCard';
import { FaSearch } from 'react-icons/fa';


const Tuitions = () => {

  /* ---------------- STATES ---------------- */

  // pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // search / filter / sort
  const [searchText, setSearchText] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [sortBy, setSortBy] = useState('latest');


  const { data: Tuitions = [], isLoading } = useQuery({
    queryKey: ['Tuitions'],

    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/tuitions`
      );
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;


  let processedTuitions = Tuitions.filter(
    t => t.status === 'approved'
  );


  if (searchText) {
    processedTuitions = processedTuitions.filter(t =>
      t.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      t.location?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (filterSubject) {
    processedTuitions = processedTuitions.filter(t =>
      t.subject?.toLowerCase() === filterSubject.toLowerCase()
    );
  }

 
  if (sortBy === 'budgetLowHigh') {
    processedTuitions.sort((a, b) => a.budget - b.budget);
  }

  if (sortBy === 'budgetHighLow') {
    processedTuitions.sort((a, b) => b.budget - a.budget);
  }

  if (sortBy === 'latest') {
    processedTuitions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(
    processedTuitions.length / itemsPerPage
  );

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTuitions = processedTuitions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ---------------- SUBJECT LIST ---------------- */

  const subjects = [
    ...new Set(
      Tuitions.map(t => t.subject).filter(Boolean)
    )
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="bg-[#0F1B36] py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          Browse <span className="text-yellow-400">Tuitions</span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Find the perfect tutoring opportunity that matches your skills.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">

          {/* 🔍 Search */}
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-full px-5 py-3 pl-12 focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
          </div>

          {/* 📚 Subject Filter */}
          <select
            value={filterSubject}
            onChange={e => {
              setFilterSubject(e.target.value);
              setPage(1);
            }}
            className="border rounded-full px-5 py-3 w-full md:w-48"
          >
            <option value="">All Subjects</option>
            {subjects.map(sub => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>


          <select
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border rounded-full px-5 py-3 w-full md:w-48"
          >
            <option value="latest">Most Recent</option>
            <option value="budgetLowHigh">Budget: Low → High</option>
            <option value="budgetHighLow">Budget: High → Low</option>
          </select>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="mb-4 font-semibold">
          Showing {paginatedTuitions.length} of {processedTuitions.length} tuitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedTuitions.map(tuition => (
            <TuitionsCard
              key={tuition._id}
              Tuitions={tuition}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 border rounded
                ${page === num + 1
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-100'}
              `}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default Tuitions;
