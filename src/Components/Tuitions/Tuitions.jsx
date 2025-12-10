import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import TuitionsCard from '../TuitionsCard/TuitionsCard';


const Tuitions = () => {

  const { data: Tuitions = [], isLoading, } = useQuery({

    queryKey: ['Tuitions'],

    queryFn: async () => {

      const result = await axios(`${import.meta.env.VITE_API_URL}/tuitions`)

      return result.data
    }
  })

  console.log(Tuitions)

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="bg-[#0F1B36] py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          Browse <span className="text-yellow-400">Tuitions</span>
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Find the perfect tutoring opportunity that matches your skills and availability.
        </p>
      </div>

      {/* Content Section (later use) */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {Tuitions.length > 0 && (
          <div>
            <h2 className="mb-4 font-semibold">
              Showing: {Tuitions.length} tuitions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Tuitions.map(tuition => (
                <TuitionsCard
                  key={tuition._id}
                  Tuitions={tuition}
                />
              ))}
            </div>
          </div>
        )}

      </div>




    </div>
  );
};

export default Tuitions;