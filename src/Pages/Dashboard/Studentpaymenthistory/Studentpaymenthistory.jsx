import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const StudentPaymentHistory = () => {
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["studentPayments", user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/student/${user.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading payment history...</p>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {["#", "Subject", "Tutor Email", "Price", "Status", "Paid At"].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left text-gray-700 font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr
                key={pay._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{pay.subject}</td>
                <td className="px-4 py-2">{pay.tutorEmail}</td>
                <td className="px-4 py-2 font-semibold">${pay.price}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                    pay.paymentStatus.toLowerCase() === "paid" ? "bg-green-600" : "bg-yellow-500"
                  }`}>
                    {pay.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(pay.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-4">
        {payments.map((pay, index) => (
          <div
            key={pay._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">#{index + 1}</span>
              <span
                className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                  pay.paymentStatus.toLowerCase() === "completed" ? "bg-green-600" : "bg-yellow-500"
                }`}
              >
                {pay.paymentStatus}
              </span>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Subject:</span> {pay.subject}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Tutor Email:</span> {pay.tutorEmail}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Price:</span> ${pay.price}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Paid At:</span>{" "}
              {new Date(pay.paidAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* No payments message */}
      {payments.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No payment history found.
        </p>
      )}
    </div>
  );
};

export default StudentPaymentHistory;
