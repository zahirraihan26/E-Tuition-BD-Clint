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
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
        Applications <span className="text-primary italic">Received</span>
      </h2>

      {applications.length === 0 ? (
        <div className="p-12 text-center bg-base-100 rounded-[2rem] shadow-xl border border-base-300/50">
          <p className="text-base-content/50 font-medium text-lg">No applications received yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
            <table className="w-full table-auto">
              <thead className="bg-base-300">
                <tr>
                  {["#", "Student", "Subject", "Tuition ID", "Applied At", "Qualifications", "Experience", "Budget", "Status", "Actions"].map((head) => (
                    <th key={head} className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300/50">
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="hover:bg-base-200/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[150px]">{app.studentEmail}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{app.subject}</td>
                    <td className="px-6 py-4 text-xs font-mono text-base-content/40">{app.tuitionId}</td>
                    <td className="px-6 py-4 text-xs font-bold text-base-content/40 uppercase tracking-widest leading-tight">{new Date(app.appliedAt).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[150px]">{app.qualifications}</td>
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
                        disabled={app.status !== "pending"}
                        onClick={() => setSelectedApplication(app)}
                        className="btn btn-sm btn-square bg-primary/10 text-primary border-none hover:bg-primary hover:text-black transition-all shadow-sm disabled:bg-base-300 disabled:text-base-content/20"
                      >
                        <FaEdit />
                      </button>
                      <button
                        disabled={app.status !== "pending"}
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-sm btn-square bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm disabled:bg-base-300 disabled:text-base-content/20"
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
          <div className="md:hidden flex flex-col gap-6">
            {applications.map((app, index) => (
              <div
                key={app._id}
                className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50"
              >
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
                  <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Student:</span> <span className="truncate ml-4">{app.studentEmail}</span></p>
                  <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> <span className="text-primary">{app.subject}</span></p>
                  <p className="text-base-content/40 text-[10px] font-mono flex justify-between"><span className="uppercase tracking-widest font-bold">Tuition ID:</span> {app.tuitionId}</p>
                  <p className="text-base-content/80 text-[10px] flex justify-between font-bold uppercase tracking-widest italic"><span className="text-base-content/40 not-italic">Applied At:</span> {new Date(app.appliedAt).toLocaleString()}</p>
                  <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Experience:</span> {app.experience} yrs</p>
                  <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Budget:</span> ${app.expectedSalary}</p>
                  <div className="pt-2 border-t border-base-300 shadow-inner p-2 rounded-xl bg-base-200/50">
                    <p className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold mb-1">Qualifications:</p>
                    <p className="text-base-content/70 text-xs font-medium leading-relaxed">{app.qualifications}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    disabled={app.status !== "pending"}
                    onClick={() => setSelectedApplication(app)}
                    className="flex-1 btn btn-md bg-primary text-black font-extrabold hover:bg-primary/90 transition-all rounded-xl border-none shadow-lg disabled:bg-base-300 disabled:text-base-content/20"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    disabled={app.status !== "pending"}
                    onClick={() => handleDelete(app._id)}
                    className="flex-1 btn btn-md bg-error/10 text-error font-extrabold hover:bg-error hover:text-white transition-all rounded-xl border-none disabled:bg-base-300 disabled:text-base-content/20"
                  >
                    <MdCancelPresentation className="mr-2" /> Delete
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
