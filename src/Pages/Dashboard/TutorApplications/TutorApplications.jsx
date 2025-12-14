import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import UpdatetiturinfoModal from "./UpdatetiturinfoModal";

const TutorApplications = () => {
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["tutorApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/tutor/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/applications/${id}`);
      refetch();
      Swal.fire("Deleted!", "Application removed.", "success");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Applications Received</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications received yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Student Email</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Tuition ID</th>
                  <th className="px-4 py-2">Applied At</th>
                  <th className="px-4 py-2">Qualifications</th>
                  <th className="px-4 py-2">Experience</th>
                  <th className="px-4 py-2">Budget</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 break-all">{app.studentEmail}</td>
                    <td className="px-4 py-2">{app.subject}</td>
                    <td className="px-4 py-2">{app.tuitionId}</td>
                    <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleString()}</td>
                    <td className="px-4 py-2">{app.qualifications}</td>
                    <td className="px-4 py-2">{app.experience}</td>
                    <td className="px-4 py-2">${app.expectedSalary}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white font-semibold text-sm ${
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
                        disabled={app.status !== "pending"}
                        onClick={() => setSelectedApplication(app)}
                        className="btn btn-square btn-sm hover:bg-amber-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        disabled={app.status !== "pending"}
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-square btn-sm hover:bg-red-500"
                      >
                        <MdCancelPresentation />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {applications.map((app, index) => (
              <div
                key={app._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">#{index + 1}</span>
                  <span
                    className={`px-2 py-1 rounded text-white font-semibold text-sm ${
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
                  <span className="font-medium">Student:</span> {app.studentEmail}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Subject:</span> {app.subject}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Tuition ID:</span> {app.tuitionId}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Applied At:</span>{" "}
                  {new Date(app.appliedAt).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Qualifications:</span> {app.qualifications}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Experience:</span> {app.experience}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Budget:</span> ${app.expectedSalary}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    disabled={app.status !== "pending"}
                    onClick={() => setSelectedApplication(app)}
                    className="btn btn-sm btn-success flex-1 hover:bg-amber-300"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    disabled={app.status !== "pending"}
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-sm btn-error flex-1 hover:bg-red-500"
                  >
                    <MdCancelPresentation className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedApplication && (
        <UpdatetiturinfoModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default TutorApplications;
