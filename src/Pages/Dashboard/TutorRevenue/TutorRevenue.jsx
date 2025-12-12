import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

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
    }
});


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    // Calculate total earnings
    const totalEarnings = payments.reduce(
        (sum, p) => sum + (p.price || 0),
        0
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tutor Revenue History</h2>

            <div className="mb-4 p-4 rounded-lg bg-yellow-100 border border-yellow-300">
                <h3 className="text-lg font-bold text-yellow-700">
                    Total Earnings: ${totalEarnings}
                </h3>
                <p className="text-sm text-yellow-600">
                    Total Payments Received: {payments.length}
                </p>
            </div>

            {payments.length === 0 ? (
                <p>No payments received yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Email</th>
                                <th>Subject</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, index) => (
                                <tr key={p._id}>
                                    <th>{index + 1}</th>
                                    <td>{p.studentEmail}</td>
                                    <td>{p.subject || "N/A"}</td>
                                    <td>${p.price}</td>
                                    <td className="text-green-600 font-bold">
                                        {p.paymentStatus}
                                    </td>
                                    <td>{new Date(p.paidAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TutorRevenue;
