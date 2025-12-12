import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { IoMdCheckbox } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const TutorApplications = () => {
  const { user } = useAuth(); // logged-in tutor

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["tutorApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/tutor/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applications Received</h2>

      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Email</th>
                <th>subject</th>
                <th>tuitionId</th>
                <th>Apply time</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>{app.studentEmail}</td>
                  <td>{app.subject}</td>
                  <td>{app.tuitionId}</td>
                  <td>{app.appliedAt}</td>
                  <td>${app.expectedSalary}</td>

                  <td className="font-semibold">
                    <span
                      className={`px-2 py-1 rounded text-white 
                          ${app.status === "pending"
                          ? "bg-yellow-600"
                          : app.status === "approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                    >
                      {app.status}
                    </span></td>

                  <td className="flex gap-3">

                    <button className="btn btn-square hover:bg-red-500 text-xl">
                      <MdCancelPresentation />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default TutorApplications;
