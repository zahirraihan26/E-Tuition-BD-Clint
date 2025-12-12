import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; 

const Studentpaymenthistory = () => {
  const { user } = useAuth(); // logged-in student info

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["studentPayments", user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/student/${user.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center py-10">Loading payment history...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Subject</th>
              <th>Tutor Email</th>
              <th>Price</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td>{pay.subject}</td>
                <td>{pay.tutorEmail}</td>
                <td>${pay.price}</td>
                <td className="text-green-600 font-semibold">{pay.paymentStatus}</td>
                <td>{new Date(pay.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No payment history found.
        </p>
      )}
    </div>
  );
};

export default Studentpaymenthistory;
