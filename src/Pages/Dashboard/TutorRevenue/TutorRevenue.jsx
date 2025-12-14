import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const TutorRevenue = () => {
  const { user } = useAuth();

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ["tutorRevenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/payments/tutor/${user.email}`
      );
      return res.data.payments || [];
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError)
    return <p className="text-center py-6 text-red-500">Error: {error.message}</p>;

  // Calculate total earnings
  const totalEarnings = payments.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tutor Revenue</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-200 to-yellow-100 border border-yellow-300">
          <h3 className="text-lg font-bold text-yellow-800">Total Earnings</h3>
          <p className="text-2xl font-bold text-yellow-900 mt-1">${totalEarnings}</p>
          <p className="text-sm text-yellow-700 mt-1">
            Payments Received: {payments.length}
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-green-200 to-green-100 border border-green-300">
          <h3 className="text-lg font-bold text-green-800">Total Students</h3>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {new Set(payments.map((p) => p.studentEmail)).size}
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-200 to-blue-100 border border-blue-300">
          <h3 className="text-lg font-bold text-blue-800">Completed Payments</h3>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            {payments.filter((p) => p.paymentStatus === "paid").length}
          </p>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Student Email</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 break-all">{p.studentEmail}</td>
                <td className="px-4 py-2">{p.subject || "N/A"}</td>
                <td className="px-4 py-2 font-semibold">${p.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      p.paymentStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {payments.map((p, index) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">#{index + 1}</span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  p.paymentStatus === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {p.paymentStatus}
              </span>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Student:</span> {p.studentEmail}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Subject:</span> {p.subject || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> ${p.price}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Paid At:</span>{" "}
              {new Date(p.paidAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorRevenue;
