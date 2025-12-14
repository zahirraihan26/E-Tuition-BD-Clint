import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTutorInfoModal = ({ application, onClose, refetch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      qualifications: application?.qualifications,
      experience: application?.experience,
      expectedSalary: application?.expectedSalary,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/update/${application._id}`,
        data
      );

      Swal.fire("Updated!", "Application updated successfully", "success");
      refetch();
      onClose();
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
      console.log(err);
    }
  };

  return (
    <dialog className="modal modal-open max-w-md w-full p-0">
      <div className="modal-box relative bg-white rounded-lg shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Update Application Info
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Qualifications
            </label>
            <input
              {...register("qualifications")}
              className="input input-bordered w-full rounded-md border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200"
              placeholder="Qualifications"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Experience (years)
            </label>
            <input
              type="number"
              {...register("experience")}
              className="input input-bordered w-full rounded-md border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200"
              placeholder="Experience"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Expected Salary
            </label>
            <input
              type="number"
              {...register("expectedSalary")}
              className="input input-bordered w-full rounded-md border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200"
              placeholder="Expected Salary"
              required
            />
          </div>

          <div className="modal-action flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="btn btn-success bg-gradient-to-r from-green-400 to-green-500 border-0 hover:from-green-500 hover:to-green-600 text-white shadow-md"
            >
              Update
            </button>
            <button
              type="button"
              
              onClick={onClose}
              className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 border-0 shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateTutorInfoModal;
