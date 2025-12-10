import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth'; // তোমার auth hook

const AppliedTutors = () => {
    const { user } = useAuth(); // student email
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`${import.meta.env.VITE_API_URL}/applications/student/${user.email}`)
            .then(res => {
                console.log("API Response:", res.data);
                setApplications(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Applied Tutors</h2>

            {applications.length === 0 ? (
                <p>You haven't applied to any tutor yet.</p>
            ) : (
                <div className="">
                    {applications.map(app => (
                        <div
                            key={app._id}
                            className="border rounded-xl p-4 shadow hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-bold text-yellow-500">
                                {app.tutorName}
                            </h3>

                            <p><strong>Subject:</strong> {app.qualifications}</p>
                            <p><strong>Schedule:</strong> {app.experience}</p>
                            <p><strong>Budget:</strong> ${app.expectedSalary}/hr</p>
                            <p>
                                <strong>Status:</strong>
                                <span className={`font-semibold ml-2 ${app.status === 'Accepted' ? 'text-green-500' :
                                        app.status === 'Rejected' ? 'text-red-500' :
                                            'text-yellow-500'
                                    }`}>
                                    {app.status || 'Pending'}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default AppliedTutors;
