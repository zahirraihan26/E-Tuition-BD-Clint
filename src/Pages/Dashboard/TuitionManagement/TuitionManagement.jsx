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

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px] bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
            Tuition <span className="text-primary">Management</span>
          </h2>
          <p className="text-base-content/50 font-medium mt-1">Manage and moderate all tuition listings ({tuitions.length})</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
        <table className="w-full table-auto">
          <thead className="bg-base-300">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">#</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-base-content/60 uppercase tracking-widest">Photo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Student</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Subject</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Budget</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300/50">
            {tuitions.map((tuition, index) => (
              <tr key={tuition._id} className="hover:bg-base-200/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-primary/20 p-0.5">
                      <img
                        src={tuition.student?.image}
                        alt="student"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium truncate max-w-[150px]">{tuition.student?.email}</td>
                <td className="px-6 py-4 text-sm font-bold text-base-content truncate max-w-[150px]">{tuition.title}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{tuition.subject}</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium break-all">{tuition.location}</td>
                <td className="px-6 py-4 text-sm font-extrabold text-base-content">${tuition.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                    tuition.status === "approved" ? "bg-success/10 text-success border-success/20" :
                    tuition.status === "rejected" ? "bg-error/10 text-error border-error/20" : "bg-warning/10 text-warning border-warning/20"
                  }`}>
                    {tuition.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleApprove(tuition._id)}
                    className="btn btn-sm bg-success text-white font-bold hover:bg-success/90 transition-all rounded-xl shadow-lg border-none"
                  >
                    <IoMdCheckbox /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(tuition._id)}
                    className="btn btn-sm btn-square bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm"
                  >
                    <MdCancelPresentation />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-6">
        {tuitions.map((tuition, index) => (
          <div key={tuition._id} className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest"># {index + 1}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                tuition.status === "approved" ? "bg-success/10 text-success border-success/20" :
                tuition.status === "rejected" ? "bg-error/10 text-error border-error/20" : "bg-warning/10 text-warning border-warning/20"
              }`}>
                {tuition.status}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Email:</span> <span className="truncate ml-2">{tuition.student?.email}</span></p>
              <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Title:</span> {tuition.title}</p>
              <p className="text-base-content font-bold flex justify-between"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Subject:</span> <span className="text-primary">{tuition.subject}</span></p>
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Location:</span> {tuition.location}</p>
              <p className="text-base-content flex justify-between font-extrabold"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Budget:</span> ${tuition.budget}</p>
              <p className="text-base-content/80 text-sm flex justify-between font-medium"><span className="text-base-content/40 uppercase text-[10px] tracking-widest font-bold">Schedule:</span> {tuition.schedule}</p>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleApprove(tuition._id)}
                className="btn btn-sm flex-1 bg-success text-white font-extrabold hover:bg-success/90 transition-all rounded-xl border-none shadow-lg"
              >
                <IoMdCheckbox /> Approve
              </button>
              <button
                onClick={() => handleReject(tuition._id)}
                className="btn btn-sm flex-1 bg-error/10 text-error font-extrabold hover:bg-error hover:text-white transition-all rounded-xl border-none"
              >
                Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionManagement;
