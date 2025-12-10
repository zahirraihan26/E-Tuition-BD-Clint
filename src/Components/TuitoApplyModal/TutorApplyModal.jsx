import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const TutorApplyModal = ({ tuition, closeModal }) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      tuitionId: tuition._id,
      studentEmail: tuition.student.email,
      tutorEmail: user.email,
      tutorName: user.displayName,
      tutorImage: user.photoURL,
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: parseInt(data.expectedSalary),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        applicationData
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Applied Successfully!",
          text: "Your application has been sent to the student.",
        });
        reset();
        closeModal();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Try again!",
      });
      console.log(error)
    }
  };

  return (
    <dialog id="applyModal" className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Apply for this Tuition</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Email */}
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Qualifications */}
          <input
            type="text"
            placeholder="Your Qualifications"
            {...register("qualifications", { required: true })}
            className="input input-bordered w-full"
          />

          {/* Experience */}
          <input
            type="number"
            placeholder="Experience (years)"
            {...register("experience", { required: true })}
            className="input input-bordered w-full"
          />

          {/* Expected Salary */}
          <input
            type="number"
            placeholder="Expected Salary"
            {...register("expectedSalary", { required: true })}
            className="input input-bordered w-full"
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Submit Application
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default TutorApplyModal;
