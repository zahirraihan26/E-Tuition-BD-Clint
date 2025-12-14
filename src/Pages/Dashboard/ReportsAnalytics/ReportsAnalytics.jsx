import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* 🔹 Weekly Earnings Calculator */
const getWeeklyEarnings = (payments) => {
  const weeklyMap = {};

  payments.forEach((payment) => {
    const date = new Date(payment.paidAt);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date - startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    const weekNumber = Math.ceil(
      diff / oneWeek + startOfYear.getDay() / 7
    );

    const weekKey = `Week ${weekNumber}`;
    weeklyMap[weekKey] = (weeklyMap[weekKey] || 0) + payment.price;
  });

  return Object.keys(weeklyMap).map((week) => ({
    week,
    earnings: weeklyMap[week],
  }));
};

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  /* 🔹 Summary */
  const { data: summary = {}, isLoading: summaryLoading } = useQuery({
    queryKey: ["payment-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/summary");
      return res.data;
    },
  });

  /* 🔹 All payments */
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const chartData = React.useMemo(
    () => getWeeklyEarnings(payments),
    [payments]
  );

  if (summaryLoading || paymentsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Reports & Analytics</h2>

      {/* 1️⃣ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Earnings</h3>
          <p className="text-3xl font-bold mt-2">
            ৳ {summary.totalEarnings || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Transactions</h3>
          <p className="text-3xl font-bold mt-2">
            {summary.totalTransactions || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Average Payment</h3>
          <p className="text-3xl font-bold mt-2">
            ৳{" "}
            {summary.totalTransactions
              ? Math.round(
                  summary.totalEarnings / summary.totalTransactions
                )
              : 0}
          </p>
        </div>
      </div>

      {/* 2️⃣ Weekly Earnings Chart */}
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">
          Weekly Earnings Overview
        </h3>

        {chartData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No weekly data available</p>
        )}
      </div>

      {/* 3️⃣ Transaction History */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Transaction History
        </h3>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td>{pay.studentEmail}</td>
                  <td>{pay.tutorEmail}</td>
                  <td>{pay.subject}</td>
                  <td>৳ {pay.price}</td>
                  <td>
                    {new Date(pay.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!payments.length && (
            <p className="text-center text-gray-500 mt-4">
              No payment records found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
