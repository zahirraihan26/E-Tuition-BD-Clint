import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const TutorApplications = () => {
  const { user } = useAuth(); // logged-in tutor

 const { data: applications = [], isLoading } = useQuery({
  queryKey: ["tutorApplications", user?.email],
  enabled: !!user?.email, // user.email থাকলে fetch হবে
  queryFn: async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/applications/tutor/${user.email}`
    );
    return res.data;
  },
});


  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {applications.length === 0 && <p>You haven't applied to any tuition yet.</p>}
      {applications.map((app) => (
        <div key={app._id} className="card bg-base-100 shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg">Tuition ID: {app.tuitionId}</h3>
            <p>Student: {app.studentEmail}</p>
            <p>Qualifications: {app.qualifications}</p>
            <p>Experience: {app.experience} years</p>
            <p>Expected Salary: ${app.expectedSalary}</p>
            <p className="text-sm">Status: {app.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorApplications;
