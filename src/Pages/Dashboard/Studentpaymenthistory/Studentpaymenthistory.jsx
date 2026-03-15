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
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
        Payment <span className="text-primary italic">History</span>
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
        <table className="w-full table-auto">
          <thead className="bg-base-300">
            <tr>
              {["#", "Subject", "Tutor", "Price", "Status", "Paid At"].map((head) => (
                <th key={head} className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/50">
            {payments.map((pay, index) => (
              <tr key={pay._id} className="hover:bg-base-200/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{pay.subject}</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[200px]">{pay.tutorEmail}</td>
                <td className="px-6 py-4 text-sm font-extrabold text-base-content">${pay.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                    pay.paymentStatus.toLowerCase() === "paid" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                  }`}>
                    {pay.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-base-content/40 uppercase tracking-widest leading-tight">{new Date(pay.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-6">
        {payments.map((pay, index) => (
          <div
            key={pay._id}
            className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">#{index + 1}</span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                  pay.paymentStatus.toLowerCase() === "completed" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                }`}
              >
                {pay.paymentStatus}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> <span className="text-primary">{pay.subject}</span></p>
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Tutor:</span> <span className="truncate ml-4">{pay.tutorEmail}</span></p>
              <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Price:</span> ${pay.price}</p>
              <p className="text-base-content/80 text-[10px] flex justify-between font-bold uppercase tracking-widest italic pt-2 border-t border-base-300">
                <span className="text-base-content/40 not-italic">Paid At:</span>{" "}
                {new Date(pay.paidAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No payments message */}
      {payments.length === 0 && (
        <div className="p-12 text-center bg-base-100 rounded-[2rem] shadow-xl border border-base-300/50 mt-6">
          <p className="text-base-content/50 font-medium text-lg">No payment history found.</p>
        </div>
      )}
    </div>
  );
};

export default StudentPaymentHistory;
