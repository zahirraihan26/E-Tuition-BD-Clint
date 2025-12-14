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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

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
    <div className="p-4 md:p-6 space-y-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Applied Tutors</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any tutor yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  {["#", "Tutor Name", "Subject", "Qualifications", "Experience", "Salary", "Status", "Actions"].map(
                    (head) => (
                      <th key={head} className="px-4 py-3 text-left font-medium text-gray-700">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{app.tutorName}</td>
                    <td className="px-4 py-2">{app.subject}</td>
                    <td className="px-4 py-2">{app.qualifications}</td>
                    <td className="px-4 py-2">{app.experience} yrs</td>
                    <td className="px-4 py-2 font-semibold">${app.expectedSalary}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm capitalize ${
                          app.status === "pending"
                            ? "bg-yellow-600"
                            : app.status === "approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handlePayment(app)}
                        disabled={loadingPayment}
                        className="btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app._id)}
                        className="btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
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
          <div className="md:hidden flex flex-col gap-4">
            {applications.map((app, index) => (
              <div key={app._id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">#{index + 1}</span>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm capitalize ${
                      app.status === "pending"
                        ? "bg-yellow-600"
                        : app.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Tutor:</span> {app.tutorName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Subject:</span> {app.subject}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Qualifications:</span> {app.qualifications}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Experience:</span> {app.experience} yrs
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Salary:</span> ${app.expectedSalary}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handlePayment(app)}
                    disabled={loadingPayment}
                    className="flex-1 btn bg-green-500 text-white hover:bg-green-600 rounded-lg transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="flex-1 btn bg-red-500 text-white hover:bg-red-600 rounded-lg transition"
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
