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
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
        Tutor <span className="text-primary italic">Revenue</span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-8 rounded-[2rem] border border-amber-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Total Earnings</h3>
          <p className="text-4xl font-black mt-3 text-base-content">${totalEarnings}</p>
          <p className="text-xs font-bold text-primary mt-2 uppercase tracking-widest italic">
            Payments Received: {payments.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-8 rounded-[2rem] border border-emerald-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Total Students</h3>
          <p className="text-4xl font-black mt-3 text-base-content">
            {new Set(payments.map((p) => p.studentEmail)).size}
          </p>
          <p className="text-xs font-bold text-emerald-500 mt-2 uppercase tracking-widest italic">Unique Connections</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 p-8 rounded-[2rem] border border-indigo-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Completed Payments</h3>
          <p className="text-4xl font-black mt-3 text-base-content">
            {payments.filter((p) => p.paymentStatus === "paid").length}
          </p>
          <p className="text-xs font-bold text-indigo-500 mt-2 uppercase tracking-widest italic">Verified Transactions</p>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
        <table className="w-full table-auto">
          <thead className="bg-base-300">
            <tr>
              {["#", "Student", "Subject", "Amount", "Status", "Paid At"].map((head) => (
                <th key={head} className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/50">
            {payments.map((p, index) => (
              <tr key={p._id} className="hover:bg-base-200/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[200px]">{p.studentEmail}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{p.subject || "N/A"}</td>
                <td className="px-6 py-4 text-sm font-extrabold text-base-content">${p.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                      p.paymentStatus === "Completed"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-base-content/40 uppercase tracking-widest leading-tight">{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {payments.map((p, index) => (
          <div
            key={p._id}
            className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">#{index + 1}</span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                  p.paymentStatus === "Completed"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-warning/10 text-warning border-warning/20"
                }`}
              >
                {p.paymentStatus}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Student:</span> <span className="truncate ml-4">{p.studentEmail}</span></p>
              <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> <span className="text-primary">{p.subject || "N/A"}</span></p>
              <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Amount:</span> ${p.price}</p>
              <p className="text-base-content/80 text-[10px] flex justify-between font-bold uppercase tracking-widest italic pt-2 border-t border-base-300">
                <span className="text-base-content/40 not-italic">Paid At:</span>{" "}
                {new Date(p.paidAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorRevenue;
