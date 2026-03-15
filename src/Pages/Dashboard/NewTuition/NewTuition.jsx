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
    <div className="max-w-4xl mx-auto m-10 p-10 bg-base-100 shadow-2xl rounded-[2.5rem] border border-base-300/50">
      <h2 className="text-4xl font-extrabold mb-10 text-base-content tracking-tight text-center md:text-left">
        Add New <span className="text-primary">Tuition</span>
      </h2>

      <form onSubmit={handleSubmit(handelNewTuition)} className="space-y-6">
        {/* Title & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Title *</label>
            <input
              type="text"
              {...register('title', { required: "Title is required" })}
              className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
              placeholder="e.g., Need help with Calculus"
            />
            {errors.title && <p className="text-error text-xs mt-2 font-medium">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Subject *</label>
            <input
              {...register('subject', { required: "Subject is required" })}
              className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
              placeholder="e.g., Physics"
            />
            {errors.subject && <p className="text-error text-xs mt-2 font-medium">{errors.subject.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Description *</label>
          <textarea
            {...register('description', { required: "Description is required" })}
            className="textarea textarea-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
            placeholder="Describe what you need help with..."
            rows={4}
          />
          {errors.description && <p className="text-error text-xs mt-2 font-medium">{errors.description.message}</p>}
        </div>

        {/* Location & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Location *</label>
            <input
              type="text"
              {...register('location', { required: "Location is required" })}
              className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
              placeholder="e.g., Online, Dhaka"
            />
            {errors.location && <p className="text-error text-xs mt-2 font-medium">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Budget ($/hr) *</label>
            <input
              type="number"
              {...register('budget', { required: "Budget is required" })}
              className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
              placeholder="e.g., 30"
            />
            {errors.budget && <p className="text-error text-xs mt-2 font-medium">{errors.budget.message}</p>}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60">Preferred Schedule *</label>
          <input
            type="text"
            {...register('schedule', { required: "Schedule is required" })}
            className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all"
            placeholder="e.g., Weekends, 3–5 PM"
          />
          {errors.schedule && <p className="text-error text-xs mt-2 font-medium">{errors.schedule.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto bg-primary text-black font-extrabold py-4 px-10 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Post Tuition Order
        </button>
      </form>
    </div>
  );
};

export default NewTuition;
