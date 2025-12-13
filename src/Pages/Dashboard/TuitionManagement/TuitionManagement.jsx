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
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Tuition Management: {tuitions.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Subject</th>
              <th>Location</th>
              <th>Budget</th>
              <th>status</th>
              <th>Schedule</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((tuition, index) => (
              <tr key={tuition._id}>
                <th>{index + 1}</th>
                <td>{tuition.title}</td>
                <td>{tuition.subject}</td>
                <td>{tuition.location}</td>
                <td>${tuition.budget}</td>
                <td className={
                  tuition.status === "approved" ? "text-green-500" :
                    tuition.status === "rejected" ? "text-red-500" :
                      "text-orange-500"
                }>
                  {tuition.status}
                </td>
                <td>{tuition.schedule}</td>
                {/* Approve */}
                <td>
                  {tuition.status === "pending" && (
                    <button
                      onClick={() => handleApprove(tuition._id)}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                    >
                      <IoMdCheckbox /> Approve
                    </button>
                  )}
                </td>

                {/* Reject */}
                <td>
                  {tuition.status === "pending" && (
                    <button
                      onClick={() => handleReject(tuition._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      <MdCancelPresentation /> Reject
                    </button>
                  )}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TuitionManagement;
