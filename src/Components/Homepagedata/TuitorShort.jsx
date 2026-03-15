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
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* 🔹 Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Top Tutors</span>
          </h2>
          <p className="mt-4 text-base-content/60 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Learn from experienced & verified educators dedicated to your success
          </p>
        </div>

        {/* 🔹 Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {shortTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="group bg-base-100/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 overflow-hidden hover:border-primary/30"
            >
              {/* Top background */}
              <div className="h-28 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"></div>

              <div className="relative p-6 flex flex-col items-center -mt-12">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-base-100 shadow-lg group-hover:scale-105 transition">
                  <img
                    src={tutor.photoURL}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-4 text-lg font-semibold text-base-content">
                  {tutor.name}
                </h3>

                {/* Info */}
                <p className="text-sm text-base-content/70 mt-1 text-center font-medium">
                  {tutor.qualification}
                </p>
                <p className="text-sm text-base-content/60">
                  {tutor.experience}+ years experience
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-bold text-base-content">4.8</span>
                  <span className="text-xs text-base-content/50">(120+ reviews)</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-5">
                  <button className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <FaEnvelope />
                  </button>
                  <button className="p-2.5 rounded-full bg-success/10 text-success hover:bg-success hover:text-success-content transition-all shadow-sm">
                    <FaPhone />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 CTA */}
        <div className="text-center mt-16">
          <Link
            to="/tutor-listing"
            className="inline-block px-12 py-4 bg-primary text-black font-extrabold rounded-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-105"
          >
            Explore All Tutors
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TuitorShort;
