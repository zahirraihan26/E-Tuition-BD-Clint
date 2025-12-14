import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const NewTuition = () => {
  const { user } = useAuth();

  const { mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axios.post(`${import.meta.env.VITE_API_URL}/tuitions`, payload),
    onSuccess: ( ) => {
      toast.success('Tuition added successfully!');
      mutationReset();
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handelNewTuition = async (data) => {
    const { title, subject, description, location, budget, schedule } = data;

    const Tuitionsdata = {
      title,
      subject,
      description,
      location,
      budget,
      schedule,
      status: "pending",
      createdAt: new Date(),
      student: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
      await mutateAsync(Tuitionsdata);
      reset();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">Add New Tuition</h2>

      <form onSubmit={handleSubmit(handelNewTuition)} className="space-y-6">
        {/* Title & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Title *</label>
            <input
              type="text"
              {...register('title', { required: "Title is required" })}
              className="input input-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
              placeholder="e.g., Need help with Calculus"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Subject *</label>
            <input
              {...register('subject', { required: "Subject is required" })}
              className="input input-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
              placeholder="e.g., Physics"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Description *</label>
          <textarea
            {...register('description', { required: "Description is required" })}
            className="textarea textarea-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
            placeholder="Describe what you need help with..."
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Location & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Location *</label>
            <input
              type="text"
              {...register('location', { required: "Location is required" })}
              className="input input-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
              placeholder="e.g., Online, Dhaka"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Budget ($/hr) *</label>
            <input
              type="number"
              {...register('budget', { required: "Budget is required" })}
              className="input input-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
              placeholder="e.g., 30"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Preferred Schedule *</label>
          <input
            type="text"
            {...register('schedule', { required: "Schedule is required" })}
            className="input input-bordered w-full border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 rounded-lg"
            placeholder="e.g., Weekends, 3–5 PM"
          />
          {errors.schedule && <p className="text-red-500 text-sm mt-1">{errors.schedule.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1"
        >
          Add Tuition
        </button>
      </form>
    </div>
  );
};

export default NewTuition;
