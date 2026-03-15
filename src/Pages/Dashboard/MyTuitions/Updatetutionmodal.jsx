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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4 transition-all duration-300">
      <div className="bg-base-100 border border-base-300 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-lg p-10 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-base-content/40 hover:text-primary transition-all duration-300 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-3xl font-extrabold text-base-content mb-8 tracking-tight text-center md:text-left">
          Update <span className="text-primary">Tuition</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {["subject", "title", "location", "budget", "schedule"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-base-content/60 leading-none">{field} *</label>
              <input
                type={field === "budget" ? "number" : "text"}
                value={formData[field] ?? ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-3 bg-base-200/50 border border-base-300 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 font-medium placeholder:text-base-content/20"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl border border-base-300 text-base-content font-bold hover:bg-base-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-3 rounded-xl bg-primary text-black font-extrabold hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 active:scale-95"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updatetutionmodal;
