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

  if (isLoading) return <p className="text-center py-6">Loading users...</p>;
  if (error) return <p className="text-center py-6 text-red-500">Error loading users</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">User Management</h2>
        <p className="text-gray-500">Manage all registered users in your platform ({users.length})</p>
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm min-w-[700px]">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-700">{user.name}</td>
                <td className="px-4 py-2 break-all text-gray-600">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered select-sm w-full max-w-[140px]"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="flex items-center gap-1 btn btn-error btn-sm hover:bg-red-600 transition-colors duration-150"
                  >
                    <FaTrashAlt className="w-3 h-3" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold">{index + 1}.</span>
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-700">{user.name}</p>
                <p className="text-gray-500 text-sm break-all">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 sm:mt-0">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="select select-bordered select-sm w-full max-w-[120px]"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="flex items-center gap-1 btn btn-error btn-sm hover:bg-red-600 transition-colors duration-150"
              >
                <FaTrashAlt className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
