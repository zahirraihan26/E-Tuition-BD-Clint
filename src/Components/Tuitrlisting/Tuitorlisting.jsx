import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FaStar, FaEnvelope, FaPhone } from 'react-icons/fa';
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
    <div className="w-full mb-3">

      {/* Hero */}
      <div className="bg-[#0F1B36] py-20 text-center text-white mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">
          Browse <span className="text-yellow-400">Tutors</span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Find verified tutors based on experience and qualification
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4">
        {paginatedTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 opacity-20"></div>

            <div className="relative bg-white rounded-2xl p-6 flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={tutor.photoURL || 'https://i.ibb.co/2nFJYyZ/default-avatar.png'}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="mt-4 text-lg font-bold text-gray-800">
                {tutor.name}
              </h2>

              <p className="text-sm text-gray-600 mt-2 text-center">
                <span className="font-medium">Qualification:</span> {tutor.qualification}
              </p>
              <p className="text-sm text-gray-600 mt-1 text-center">
                <span className="font-medium">Experience:</span> {tutor.experience} yrs
              </p>

              <div className="flex items-center gap-2 mt-3">
                <FaStar className="text-yellow-500" />
                <span className="font-medium text-gray-700">4.8</span>
                <span className="text-gray-400 text-sm">(Trusted)</span>
              </div>

              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition">
                  <FaEnvelope /> Message
                </button>
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full transition">
                  <FaPhone /> Call
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Joined: {new Date(tutor.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded hover:bg-yellow-400 hover:text-white disabled:opacity-50"
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
                : 'bg-gray-100 hover:bg-yellow-200'}
            `}
          >
            {num + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4  py-2 border rounded hover:bg-yellow-400 hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Tuitorlisting;
