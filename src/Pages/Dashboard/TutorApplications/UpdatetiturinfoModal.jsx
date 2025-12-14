import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const UpdatetiturinfoModal = ({ application, onClose, refetch }) => {
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
      Swal.fire("Error", "Update failed", "err");
      console.log(err)
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Application Info</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("qualifications")}
            className="input input-bordered w-full"
            placeholder="Qualifications"
            required
          />

          <input
            type="number"
            {...register("experience")}
            className="input input-bordered w-full"
            placeholder="Experience (years)"
            required
          />

          <input
            type="number"
            {...register("expectedSalary")}
            className="input input-bordered w-full"
            placeholder="Expected Salary"
            required
          />

          <div className="modal-action">
            <button className="btn btn-success">Update</button>
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdatetiturinfoModal;
