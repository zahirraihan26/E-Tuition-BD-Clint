import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';
import { IoMdCheckbox } from 'react-icons/io';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading, refetch } = useQuery({
    queryKey: ['tuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuitions');
      return res.data;
    }
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/tuitions/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Tuition has been approved successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/tuitions/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Tuition has been rejected successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Tuition Management <span className="text-gray-500">({tuitions.length})</span>
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Schedule</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((tuition, index) => (
              <tr key={tuition._id} className="hover:bg-gray-50  transition-colors">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={tuition.student?.image}
                    alt="student"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{tuition.student?.email}</td>
                <td className="px-4 py-2">{tuition.title}</td>
                <td className="px-4 py-2">{tuition.subject}</td>
                <td className="px-4 py-2">{tuition.location}</td>
                <td className="px-4 py-2">${tuition.budget}</td>
                <td className={`px-3 py-2    ${tuition.status === "approved" ? "text-green-600" :
                    tuition.status === "rejected" ? "text-red-600" : "text-orange-500"
                  }`}>{tuition.status}</td>
                <td className="px-4 py-2">{tuition.schedule}</td>
                <td className="px-4 py-2 flex gap-2">

                  <>
                    <button
                      onClick={() => handleApprove(tuition._id)}
                      className="btn btn-sm flex items-center gap-1 bg-green-500 text-white hover:bg-green-600"
                    >
                      <IoMdCheckbox /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(tuition._id)}
                      className="btn btn-sm flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
                    >
                      <MdCancelPresentation /> Reject
                    </button>
                  </>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-6">
        {tuitions.map((tuition, index) => (
          <div key={tuition._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold">#{index + 1}</span>
              <span className={`px-2 py-1  text-sm font-semibold ${tuition.status === "approved" ? "text-green-600" :
                  tuition.status === "rejected" ? "text-red-600" : "text-orange-500"
                }`}>
                {tuition.status}
              </span>
            </div>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {tuition.student?.email}</p>
            <p className="text-gray-700"><span className="font-medium">Title:</span> {tuition.title}</p>
            <p className="text-gray-700"><span className="font-medium">Subject:</span> {tuition.subject}</p>
            <p className="text-gray-700"><span className="font-medium">Location:</span> {tuition.location}</p>
            <p className="text-gray-700"><span className="font-medium">Budget:</span> ${tuition.budget}</p>
            <p className="text-gray-700"><span className="font-medium">Schedule:</span> {tuition.schedule}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleApprove(tuition._id)}
                className="btn btn-sm flex-1 bg-green-500 text-white hover:bg-green-600"
              >
                <IoMdCheckbox /> Approve
              </button>
              <button
                onClick={() => handleReject(tuition._id)}
                className="btn btn-sm flex-1 bg-red-500 text-white hover:bg-red-600"
              >
                <MdCancelPresentation /> Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionManagement;
