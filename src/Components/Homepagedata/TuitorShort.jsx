import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { FaStar, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router';

const TuitorShort = () => {
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

  const shortTutors = tutors.slice(0, 4);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* 🔹 Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our <span className="text-orange-500">Top Tutors</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Learn from experienced & verified tutors near you
          </p>
        </div>

        {/* 🔹 Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {shortTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Top gradient */}
              <div className="h-24 bg-gradient-to-r from-[#0F1B36]  to-[#152447] "></div>

              <div className="relative p-6 flex flex-col items-center -mt-12">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition">
                  <img
                    src={tutor.photoURL}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {tutor.name}
                </h3>

                {/* Info */}
                <p className="text-sm text-gray-500 mt-1 text-center">
                  {tutor.qualification}
                </p>
                <p className="text-sm text-gray-500">
                  {tutor.experience}+ years experience
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-xs text-gray-400">(120+ reviews)</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                    <FaEnvelope />
                  </button>
                  <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition">
                    <FaPhone />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 CTA */}
        <div className="text-center mt-12">
          <Link
            to="/tutor-listing"
            className="inline-block px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          >
            View All Tutors
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TuitorShort;
