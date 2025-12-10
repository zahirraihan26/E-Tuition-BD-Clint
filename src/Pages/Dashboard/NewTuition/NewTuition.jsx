import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast';

const NewTuition = () => {
    const { user } = useAuth()

    // use mutation trans query 
    const {
        mutateAsync,
        reset: mutationReset, } = useMutation({
            mutationFn: async payload =>
                await axios.post(`${import.meta.env.VITE_API_URL}/tuitions`, payload),
            onSuccess: data => {
                console.log(data)
                toast.success('Tuition added successfully!');
                mutationReset()
                // queary key validation date
            },


        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm()



    const handelNewTuition = async (data) => {
        const { title, subject, description, location, budget, schedule, } = data;

        const Tuitionsdata = {
            title,
            subject,
            description,
            location,
            
            budget,
            schedule,
            student: {
                image: user?.photoURL,
                name: user?.displayName,
                email: user?.email,

            },
        };

        try {
            await mutateAsync(Tuitionsdata);
            reset(); // form reset after success
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong!");
        }

    };

    return (
        <div className='max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'> Add New Tuition</h2>

            <form onSubmit={handleSubmit(handelNewTuition)} className='space-y-5'>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title *</label>
                    <input
                        type="text"
                        {...register('title', { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Need help with Calculus"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Subject */}
                <div>
                    <label className="block font-semibold mb-1">Subject *</label>
                    <input
                        {...register('subject', { required: "Subject is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Physics"
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description *</label>
                    <textarea
                        {...register('description', { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Describe what you need help with..."
                        rows={4}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location *</label>
                    <input
                        type="text"
                        {...register('location', { required: "Location is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Online, Dhaka"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                {/* Budget */}
                <div>
                    <label className="block font-semibold mb-1">Budget ($/hr) *</label>
                    <input
                        type="number"
                        {...register('budget', { required: "Budget is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., 30"
                    />
                    {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
                </div>

                {/* Preferred Schedule */}
                <div>
                    <label className="block font-semibold mb-1">Preferred Schedule *</label>
                    <input
                        type="text"
                        {...register('schedule', { required: "Schedule is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Weekends, 3–5 PM"
                    />
                    {errors.schedule && <p className="text-red-500 text-sm">{errors.schedule.message}</p>}
                </div>

                {/* Submit Button */}
                <input
                    type="submit"
                    className='btn bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 w-full'
                    value="Add Tuition"
                />

            </form>
        </div>
    );
};

export default NewTuition;