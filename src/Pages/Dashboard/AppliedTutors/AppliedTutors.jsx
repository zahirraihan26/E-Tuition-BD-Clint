import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { MdCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const { user } = useAuth();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { data: applications = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["appliedTutors", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/student/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  if (isError) return (
    <div className="p-8 text-center bg-error/10 text-error rounded-2xl border border-error/20 font-bold">
      Error: {error.message}
    </div>
  );

  // Payment
  const handlePayment = (app) => {
    if (loadingPayment) return;
    setLoadingPayment(true);

    const paymentInfo = {
      applicationId: app._id,
      name: user.displayName,
      subject: app.subject,
      tutorEmail: app.tutorEmail,
      studentEmail: user.email,
      price: app.expectedSalary,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo)
      .then(({ data }) => {
        window.location.href = data.url;
      })
      .catch((err) => {
        console.error(err);
        setLoadingPayment(false);
      });
  };

  // Reject
  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this tutor application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(`${import.meta.env.VITE_API_URL}/applications/reject/${id}`);
        refetch();
        Swal.fire({
          title: "Rejected!",
          text: "Tutor application has been rejected.",
          icon: "success",
          confirmButtonColor: "#f59e0b",
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
        My <span className="text-primary">Applied Tutors</span>
      </h2>

      {applications.length === 0 ? (
        <div className="p-12 text-center bg-base-100 rounded-[2rem] shadow-xl border border-base-300/50">
          <p className="text-base-content/50 font-medium text-lg">You haven't applied to any tutor yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
            <table className="w-full table-auto">
              <thead className="bg-base-300">
                <tr>
                  {["#", "Tutor Name", "Subject", "Qualifications", "Experience", "Salary", "Status", "Actions"].map(
                    (head) => (
                      <th key={head} className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300/50">
                {applications.map((app, index) => (
                  <tr key={app._id} className="hover:bg-base-200/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-bold text-base-content">{app.tutorName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{app.subject}</td>
                    <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[200px]">{app.qualifications}</td>
                    <td className="px-6 py-4 text-sm text-base-content/70 font-medium">{app.experience} yrs</td>
                    <td className="px-6 py-4 text-sm font-extrabold text-base-content">${app.expectedSalary}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                          app.status === "pending"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : app.status === "approved"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-error/10 text-error border-error/20"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handlePayment(app)}
                        disabled={loadingPayment}
                        className="btn btn-sm bg-success text-white font-bold hover:bg-success/90 transition-all rounded-xl shadow-lg border-none"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app._id)}
                        className="btn btn-sm btn-square bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm"
                      >
                        <MdCancelPresentation />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-6">
            {applications.map((app, index) => (
              <div key={app._id} className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest"># {index + 1}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                      app.status === "pending"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : app.status === "approved"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-error/10 text-error border-error/20"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Tutor:</span> {app.tutorName}</p>
                  <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> {app.subject}</p>
                  <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Experience:</span> {app.experience} yrs</p>
                  <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Salary:</span> ${app.expectedSalary}</p>
                  <div className="pt-2">
                    <p className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold mb-1">Qualifications:</p>
                    <p className="text-base-content/70 text-xs font-medium">{app.qualifications}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handlePayment(app)}
                    disabled={loadingPayment}
                    className="flex-1 btn btn-md bg-success text-white font-extrabold hover:bg-success/90 transition-all rounded-xl border-none shadow-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="flex-1 btn btn-md bg-error/10 text-error font-extrabold hover:bg-error hover:text-white transition-all rounded-xl border-none"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedTutors;
