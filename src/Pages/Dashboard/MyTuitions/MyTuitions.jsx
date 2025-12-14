import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Updatetutionmodal from './Updatetutionmodal';

const MyTuitions = () => {
  const { user } = useAuth();
  const [selectedTuitionId, setSelectedTuitionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all tuitions of the user
  const { data: Tuitions = [], isLoading, refetch } = useQuery({
    queryKey: ['tuitions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuitions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Delete tuition
  const handeldelete = (id) => {
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
              refetch();
              Swal.fire("Deleted!", "Tuition has been deleted.", "success");
            }
          });
      }
    });
  };

  // Open modal
  const handleEdit = (id) => {
    setSelectedTuitionId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        My Tuitions ({Tuitions.length})
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {["#", "Subject", "Title", "Location", "Budget", "Schedule", "Status", "Actions"].map(head => (
                <th key={head} className="px-4 py-3 text-left font-medium text-gray-700">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Tuitions.map((tuition, index) => (
              <tr key={tuition._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{tuition.subject}</td>
                <td className="px-4 py-2">{tuition.title}</td>
                <td className="px-4 py-2">{tuition.location}</td>
                <td className="px-4 py-2 font-semibold">${tuition.budget}/hr</td>
                <td className="px-4 py-2">{tuition.schedule}</td>
                <td className="px-4 py-2 capitalize font-medium">{tuition.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(tuition._id)}
                    className='btn btn-square hover:bg-yellow-500 transition'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handeldelete(tuition._id)}
                    className='btn btn-square hover:bg-red-500 transition'
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {Tuitions.map((tuition, index) => (
          <div key={tuition._id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">#{index + 1}</span>
              <span className="text-sm text-gray-500 capitalize">{tuition.status}</span>
            </div>
            <p className="text-gray-700"><span className="font-medium">Subject:</span> {tuition.subject}</p>
            <p className="text-gray-700"><span className="font-medium">Title:</span> {tuition.title}</p>
            <p className="text-gray-700"><span className="font-medium">Location:</span> {tuition.location}</p>
            <p className="text-gray-700"><span className="font-medium">Budget:</span> ${tuition.budget}/hr</p>
            <p className="text-gray-700"><span className="font-medium">Schedule:</span> {tuition.schedule}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(tuition._id)}
                className="flex-1 btn bg-yellow-500 text-white hover:bg-yellow-600 transition rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handeldelete(tuition._id)}
                className="flex-1 btn bg-red-500 text-white hover:bg-red-600 transition rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      <Updatetutionmodal
        tuitionId={selectedTuitionId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default MyTuitions;
