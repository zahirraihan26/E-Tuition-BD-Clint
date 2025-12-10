import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';

const MyTuitions = () => {

    const { user } = useAuth();

    const {
        data: Tuitions = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['tuitions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios(
                `${import.meta.env.VITE_API_URL}/tuitions?email=${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const handeldelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Tuitions has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">
                All of My Tuitions: {Tuitions.length}
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Subject</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Budget</th>
                            <th>schedule</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Tuitions.map((tuition, index) => (
                            <tr key={tuition._id}>
                                <th>{index + 1}</th>
                                <td>{tuition.subject}</td>
                                <td>{tuition.title}</td>

                                <td>{tuition.location}</td>

                                <td>${tuition.budget}/hr</td>
                                <td>{tuition.schedule}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-yellow-500 mx-2'>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handeldelete(tuition._id)} className='btn btn-square hover:bg-yellow-500'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTuitions;
