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
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">
        Reports & Analytics
      </h2>

      {/* ================= Summary Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-700">Total Earnings</h3>
          <p className="text-3xl font-bold mt-2">
            ৳ {summary.totalEarnings || 0}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-700">Total Transactions</h3>
          <p className="text-3xl font-bold mt-2">
            {summary.totalTransactions || 0}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-300 to-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-700">Average Payment</h3>
          <p className="text-3xl font-bold mt-2">
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
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Daily Earnings Overview
        </h3>

        {chartData.length ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                angle={-35}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip formatter={(value) => `৳ ${value}`} />
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
          <p className="text-gray-500 text-center py-10">
            No daily data available
          </p>
        )}
      </div>

      {/* ================= Transaction History ================= */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Transaction History
        </h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "#",
                  "Student Photo",
                  "Student",
                  "Tutor",
                  "Subject",
                  "Amount",
                  "Date",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-gray-700"
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
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2">
                    {pay.studentEmail}
                  </td>
                  <td className="px-4 py-2">
                    {pay.studentEmail}
                  </td>
                  <td className="px-4 py-2">
                    {pay.tutorEmail}
                  </td>
                  <td className="px-4 py-2">
                    {pay.subject}
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    ৳ {pay.price}
                  </td>
                  <td className="px-4 py-2">
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
        <div className="md:hidden flex flex-col gap-4">
          {payments.map((pay, index) => (
            <div
              key={pay._id}
              className="bg-white shadow rounded-xl p-4"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  #{index + 1}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(
                    pay.paidAt
                  ).toLocaleDateString()}
                </span>
              </div>
              <p>Student: {pay.studentEmail}</p>
              <p>Tutor: {pay.tutorEmail}</p>
              <p>Subject: {pay.subject}</p>
              <p className="font-semibold">
                Amount: ৳ {pay.price}
              </p>
            </div>
          ))}
        </div>

        {!payments.length && (
          <p className="text-center text-gray-500">
            No payment records found
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
