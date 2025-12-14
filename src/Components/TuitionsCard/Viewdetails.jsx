import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaHeart } from 'react-icons/fa';
import { GiGraduateCap } from 'react-icons/gi';
import LoadingSpinner from '../LoadingSpinner';
import TutorApplyModal from '../TuitoApplyModal/TutorApplyModal';
import useRole from '../../hooks/useRole';
// import useAuth from '../../hooks/useAuth';

const fetchTuition = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuitions/${id}`);
    return res.data;
};

const ViewDetails = () => {
    const { id } = useParams();
    // const {user}=useAuth()
    // console.log(user)
    const {role, isRoleLoading} = useRole();
    console.log(role)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: tuition, isLoading, isError } = useQuery({
        queryKey: ['tuition', id],
        queryFn: () => fetchTuition(id),
    });

    if (isLoading || isRoleLoading  ) return <LoadingSpinner />;

    if (isError || !tuition) {
        return <div className="text-center text-red-500 mt-10">Tuition not Found</div>;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left: Student Image */}
                {tuition.student && (
                    <div className="md:w-1/2 flex justify-center items-center p-6 bg-gray-50">
                        <img
                            src={tuition.student?.image}
                            alt={tuition.student?.name}
                            className="w-48 h-48 rounded-xl object-cover border-2 border-gray-300"
                        />
                    </div>
                )}

                {/* Right: Details */}
                <div className="md:w-1/2 p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-indigo-600">{tuition.student?.name}</h2>

                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="font-medium">Location:</span>
                        <span>{tuition.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="font-medium">Budget:</span>
                        <span>{tuition.budget} BDT</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <GiGraduateCap className="text-yellow-500" />
                        <span className="font-medium">Lifestyle:</span>
                        <span>Student, Gamer</span>
                    </div>

                    <div>
                        <span className="font-medium">Description:</span>
                        <p>{tuition.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        <span className="font-medium">Schedule:</span>
                        <span>{tuition.schedule}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-medium">Availability:</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Available</span>
                    </div>

                    {/* Apply Button: Only for tutor */}
                    {role === 'tutor' && (
                        <div className="flex items-center justify-start mt-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-red-50 transition"
                            >
                                <FaHeart className="text-red-500" /> Apply
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tutor Apply Modal */}
            {isModalOpen && (
                <TutorApplyModal
                    tuition={tuition}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default ViewDetails;
