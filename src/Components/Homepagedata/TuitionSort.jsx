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
    <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* 🔹 Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Latest Approved Tuitions
        </h2>
        <p className="text-gray-500 mt-2">
          Find the best tuition opportunities for you
        </p>
      </motion.div>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approvedTuitions.map((tuition, index) => (
          <motion.div
            key={tuition._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          >
            <TuitionsCard Tuitions={tuition} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TuitionSort;
