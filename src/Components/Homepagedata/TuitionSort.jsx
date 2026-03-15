import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import TuitionsCard from '../TuitionsCard/TuitionsCard';

const TuitionSort = () => {
  const { data: Tuitions = [], isLoading } = useQuery({
    queryKey: ['Tuitions'],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/tuitions`
      );
      return result.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  const approvedTuitions = Tuitions
    .filter(t => t.status === "approved")
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Approved Tuitions</span>
        </h2>
        <p className="text-base-content/60 mt-4 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Discover the perfect teaching opportunities tailored for your expertise and schedule
        </p>
      </motion.div>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {approvedTuitions.map((tuition, index) => (
          <motion.div
            key={tuition._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 border border-white/5 hover:border-primary/20 bg-base-100/40 backdrop-blur-2xl"
          >
            <TuitionsCard Tuitions={tuition} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TuitionSort;
