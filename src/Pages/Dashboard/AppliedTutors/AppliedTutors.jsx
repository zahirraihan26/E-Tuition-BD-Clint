import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { MdCancelPresentation } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import Swal from "sweetalert2";

const AppliedTutors = () => {
    const { user } = useAuth(); // student email
    const [loadingPayment, setLoadingPayment] = useState(false);

    const { data: applications = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["appliedTutors", user?.email],
        enabled: !!user?.email, // only fetch if email exists
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/applications/student/${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;



    // payment 

    const handlePayment =  (app) => {
        if (loadingPayment) return; // prevent double click
        setLoadingPayment(true);
        const paymentInfo = {
            applicationId: app._id,
            name: user.displayName,
            subject: app.subject,
            tutorEmail: app.tutorEmail,
            studentEmail: user.email,
            price: app.expectedSalary,
        };

         axios.post(
            `${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo)
            .then(({ data }) => {
                // Redirect to Stripe checkout
                window.location.href = data.url;
            })
            .catch((err) => {
                console.error(err);
                setLoadingPayment(false); // enable button again
            });
    }

    // reject 

    const handleReject = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this tutor application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject",
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axios.patch(
                    `${import.meta.env.VITE_API_URL}/applications/reject/${id}`
                );

                refetch();

                Swal.fire({
                    title: "Rejected!",
                    text: "Tutor application has been rejected.",
                    icon: "success",
                    confirmButtonColor: "#f59e0b",
                });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Applied Tutors</h2>

            {applications.length === 0 ? (
                <p>You haven't applied to any tutor yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tutor Name</th>
                                <th>subject </th>
                                <th>Qualifications</th>
                                <th>Experience</th>
                                <th>Expected Salary</th>
                                <th>status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    <td>{app.tutorName}</td>
                                    <td>{app.subject}</td>
                                    <td>{app.qualifications}</td>
                                    <td>{app.experience} yrs</td>
                                    <td>${app.expectedSalary}</td>
                                    <td>  <span
                                        className={`px-2 py-1 rounded text-white 
                                                ${app.status === "pending"
                                                ? "bg-yellow-600"
                                                : app.status === "approved"
                                                    ? "bg-green-600"
                                                    : "bg-red-600"
                                            }`} >
                                        {app.status}
                                    </span></td>

                                    <td>
                                        <button onClick={() => handlePayment(app)}
                                            className='btn  hover:bg-yellow-500 mx-6'>
                                            <span> Approve</span>

                                        </button>
                                        <button onClick={() => handleReject(app._id)} className='btn btn-square hover:bg-yellow-500'>
                                            <MdCancelPresentation />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            )}
        </div>
    );
};

export default AppliedTutors;
