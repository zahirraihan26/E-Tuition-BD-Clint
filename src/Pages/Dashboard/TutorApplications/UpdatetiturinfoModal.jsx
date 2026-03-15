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
    <dialog className="modal modal-open px-4">
      <div className="modal-box relative bg-base-100 border border-base-300 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-lg p-10 animate-fadeIn overflow-visible">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 btn btn-circle btn-primary shadow-lg border-4 border-base-100 hover:rotate-90 transition-all duration-300"
        >
          ✕
        </button>

        <h3 className="text-3xl font-extrabold mb-8 text-base-content tracking-tight">
          Update <span className="text-primary italic">Information</span>
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-base-content/60 leading-none ml-1">
              Qualifications *
            </label>
            <textarea
              {...register("qualifications")}
              className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-base-300 focus:border-primary focus:outline-none transition-all duration-300 font-medium placeholder:text-base-content/20 min-h-[100px]"
              placeholder="Tell them about your expertise..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/60 leading-none ml-1">
                Exp. (Years) *
              </label>
              <input
                type="number"
                {...register("experience")}
                className="input input-bordered w-full rounded-xl bg-base-200/50 border-base-300 focus:border-primary focus:outline-none transition-all duration-300 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/60 leading-none ml-1">
                Salary (৳) *
              </label>
              <input
                type="number"
                {...register("expectedSalary")}
                className="input input-bordered w-full rounded-xl bg-base-200/50 border-base-300 focus:border-primary focus:outline-none transition-all duration-300 font-medium"
                required
              />
            </div>
          </div>

          <div className="modal-action flex justify-end gap-4 pt-6 border-t border-base-300/50 mt-8">
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
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateTutorInfoModal;
