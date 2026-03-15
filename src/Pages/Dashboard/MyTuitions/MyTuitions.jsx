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
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
          My <span className="text-primary">Tuitions</span>{" "}
          <span className="text-lg font-medium text-base-content/50 ml-2">({Tuitions.length})</span>
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
        <table className="w-full table-auto">
          <thead className="bg-base-300">
            <tr>
              {["#", "Subject", "Title", "Location", "Budget", "Schedule", "Status", "Actions"].map(head => (
                <th key={head} className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/50">
            {Tuitions.map((tuition, index) => (
              <tr key={tuition._id} className="hover:bg-base-200/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{tuition.subject}</td>
                <td className="px-6 py-4 text-sm font-medium truncate max-w-[150px]">{tuition.title}</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium">{tuition.location}</td>
                <td className="px-6 py-4 text-sm font-extrabold text-base-content">${tuition.budget}/hr</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium">{tuition.schedule}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                    tuition.status === 'approved' ? 'bg-success/10 text-success border-success/20' : 
                    tuition.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' : 
                    'bg-error/10 text-error border-error/20'
                  }`}>
                    {tuition.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(tuition._id)}
                    className='btn btn-sm btn-square bg-primary/10 text-primary border-none hover:bg-primary hover:text-black transition-all shadow-sm'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handeldelete(tuition._id)}
                    className='btn btn-sm btn-square bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm'
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
      <div className="md:hidden flex flex-col gap-6">
        {Tuitions.map((tuition, index) => (
          <div key={tuition._id} className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest"># {index + 1}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                tuition.status === 'approved' ? 'bg-success/10 text-success border-success/20' : 
                tuition.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' : 
                'bg-error/10 text-error border-error/20'
              }`}>
                {tuition.status}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> {tuition.subject}</p>
              <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Title:</span> {tuition.title}</p>
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Location:</span> {tuition.location}</p>
              <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Budget:</span> ${tuition.budget}/hr</p>
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Schedule:</span> {tuition.schedule}</p>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEdit(tuition._id)}
                className="flex-1 btn btn-md bg-primary text-black font-extrabold hover:bg-primary/90 transition-all rounded-xl border-none shadow-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handeldelete(tuition._id)}
                className="flex-1 btn btn-md bg-error/10 text-error font-extrabold hover:bg-error hover:text-white transition-all rounded-xl border-none"
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
