import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const Updatetutionmodal = ({ tuitionId, isOpen, onClose, refetch }) => {
  // Fetch tuition by ID
  const { data: tuition, isLoading } = useQuery({
    queryKey: ['tuition', tuitionId],
    queryFn: async () => {
      if (!tuitionId) return null;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuitions/${tuitionId}`);
      return res.data;
    },
    enabled: !!tuitionId,
  });

  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    location: '',
    budget: '',
    schedule: ''
  });

  useEffect(() => {
    if (tuition) {
      setFormData({
        subject: tuition.subject || '',
        title: tuition.title || '',
        location: tuition.location || '',
        budget: tuition.budget || '',
        schedule: tuition.schedule || ''
      });
    }
  }, [tuition]);

  if (!isOpen || !tuition || isLoading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/tuitions/${tuitionId}`,
        formData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        onClose();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Tuition has been successfully updated.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Could not update tuition. Try again.',
      });
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">Update Tuition</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["subject","title","location","budget","schedule"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
              <input
                type={field === "budget" ? "number" : "text"}
                value={formData[field] ?? ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-lg hover:bg-yellow-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updatetutionmodal;
