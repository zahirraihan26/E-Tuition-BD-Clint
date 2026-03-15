import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user-request');
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Role updated',
          text: 'User role updated successfully',
        });
        refetch();
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to update role',
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${userId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          refetch();
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to delete user',
        });
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px] bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  if (error) return (
    <div className="p-8 text-center bg-error/10 text-error rounded-2xl border border-error/20 font-bold m-6">
      Error: {error.message || "Failed to load users"}
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-base-200 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
            User <span className="text-primary">Management</span>
          </h2>
          <p className="text-base-content/50 font-medium mt-1">Manage all registered users in your platform ({users.length})</p>
        </div>
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-hidden bg-base-100 shadow-2xl rounded-2xl border border-base-300/50">
        <table className="w-full table-auto">
          <thead className="bg-base-300">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">#</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-base-content/60 uppercase tracking-widest">Photo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-base-content/60 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/50">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-200/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-primary/20 p-0.5">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-base-content">{user.name}</td>
                <td className="px-6 py-4 text-sm text-base-content/70 font-medium break-all">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered select-sm w-full max-w-[140px] bg-base-200 border-base-300 focus:border-primary font-bold transition-all"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-sm btn-square bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm"
                  >
                    <FaTrashAlt className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-6">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-base-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 border border-base-300/50"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">{index + 1}.</span>
              <div className="avatar">
                <div className="w-12 rounded-full border-2 border-primary/20 p-0.5">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-base-content truncate">{user.name}</p>
                <p className="text-base-content/50 text-xs truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-base-300/50">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="select select-bordered select-sm flex-1 bg-base-200 border-base-300 focus:border-primary font-bold"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="btn btn-sm btn-error text-white font-bold px-4 rounded-xl border-none shadow-lg"
              >
                <FaTrashAlt className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
