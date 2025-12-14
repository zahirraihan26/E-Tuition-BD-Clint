import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const Updatetutionmodal = ({ tuitionId, isOpen, onClose, refetch }) => {
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

  if (!isOpen || isLoading) return null;

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
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Tuition</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {["subject", "title", "location", "budget", "schedule"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
              <input
                type={field === "budget" ? "number" : "text"}
                value={formData[field] ?? ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-200"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
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
