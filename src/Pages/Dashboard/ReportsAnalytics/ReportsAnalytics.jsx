import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

/* =======================
   Daily Earnings Calculator
======================= */
const getDailyEarnings = (payments) => {
  const dailyMap = {};

  payments.forEach((payment) => {
    const dateKey = new Date(payment.paidAt).toLocaleDateString();

    dailyMap[dateKey] =
      (dailyMap[dateKey] || 0) + payment.price;
  });

  return Object.keys(dailyMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((day) => ({
      day,
      earnings: dailyMap[day],
    }));
};

/* =======================
   Bar Color Logic
======================= */
const getBarColor = (value) => {
  if (value < 100) return "#ef4444"; // red
  if (value < 500) return "#facc15"; // yellow
  return "#22c55e"; // green
};

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  /* ===== Summary ===== */
  const { data: summary = {}, isLoading: summaryLoading } = useQuery({
    queryKey: ["payment-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/summary");
      return res.data;
    },
  });

  /* ===== Payments ===== */
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const chartData = React.useMemo(
    () => getDailyEarnings(payments),
    [payments]
  );

  if (summaryLoading || paymentsLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
        Reports & <span className="text-primary">Analytics</span>
      </h2>

      {/* ================= Summary Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-8 rounded-[2rem] border border-amber-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Total Earnings</h3>
          <p className="text-4xl font-black mt-3 text-base-content">
            ৳ {summary.totalEarnings || 0}
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 p-8 rounded-[2rem] border border-indigo-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Total Transactions</h3>
          <p className="text-4xl font-black mt-3 text-base-content">
            {summary.totalTransactions || 0}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-8 rounded-[2rem] border border-emerald-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <h3 className="text-base-content/60 font-bold uppercase tracking-widest text-xs">Average Payment</h3>
          <p className="text-4xl font-black mt-3 text-base-content">
            ৳{" "}
            {summary.totalTransactions
              ? Math.round(
                  summary.totalEarnings /
                    summary.totalTransactions
                )
              : 0}
          </p>
        </div>
      </div>

      {/* ================= Daily Earnings Chart ================= */}
      <div className="bg-base-100 shadow-2xl rounded-[2.5rem] p-10 border border-base-300/50">
        <h3 className="text-2xl font-black mb-8 text-base-content tracking-tight">
          Daily Earnings <span className="text-primary italic">Overview</span>
        </h3>

        {chartData.length ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-base-content/10" />
              <XAxis
                dataKey="day"
                angle={-35}
                textAnchor="end"
                height={70}
                stroke="currentColor"
                className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest"
              />
              <YAxis stroke="currentColor" className="text-[10px] font-bold text-base-content/40" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--fallback-b1,oklch(var(--b1)))', 
                  borderColor: 'var(--fallback-b3,oklch(var(--b3)))',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  border: '1px solid var(--fallback-b3,oklch(var(--b3)))'
                }}
                itemStyle={{ color: 'var(--fallback-bc,oklch(var(--bc)))', fontWeight: 'bold' }}
                cursor={{ fill: 'var(--fallback-b2,oklch(var(--b2)))', opacity: 0.5 }}
                formatter={(value) => `৳ ${value}`} 
              />
              <Bar dataKey="earnings" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={getBarColor(entry.earnings)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="p-20 text-center bg-base-200/50 rounded-3xl border border-dashed border-base-300">
            <p className="text-base-content/30 font-bold uppercase tracking-widest text-sm">
              No daily data available
            </p>
          </div>
        )}
      </div>

      {/* ================= Transaction History ================= */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-base-content tracking-tight">
          Transaction <span className="text-primary italic">History</span>
        </h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
          <table className="w-full table-auto">
            <thead className="bg-base-300">
              <tr>
                {[
                  "#",
                  "Student",
                  "Tutor",
                  "Subject",
                  "Amount",
                  "Date",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300/50">
              {payments.map((pay, index) => (
                <tr
                  key={pay._id}
                  className="hover:bg-base-200/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[200px]">
                    {pay.studentEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[200px]">
                    {pay.tutorEmail}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">
                    {pay.subject}
                  </td>
                  <td className="px-6 py-4 text-sm font-extrabold text-base-content">
                    ৳ {pay.price}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-base-content/40 uppercase tracking-widest">
                    {new Date(
                      pay.paidAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-6">
          {payments.map((pay, index) => (
            <div
              key={pay._id}
              className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
                  #{index + 1}
                </span>
                <span className="text-[10px] font-extrabold text-base-content/30 uppercase tracking-widest">
                  {new Date(
                    pay.paidAt
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Student:</span> <span className="truncate ml-4">{pay.studentEmail}</span></p>
                <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Tutor:</span> <span className="truncate ml-4">{pay.tutorEmail}</span></p>
                <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> <span className="text-primary">{pay.subject}</span></p>
                <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Amount:</span> ৳ {pay.price}</p>
              </div>
            </div>
          ))}
        </div>

        {!payments.length && (
          <p className="text-center text-base-content/30 font-bold uppercase tracking-widest py-10">
            No payment records found
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
