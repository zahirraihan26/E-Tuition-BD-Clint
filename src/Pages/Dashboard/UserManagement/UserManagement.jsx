import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

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
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );
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

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        All Users ({users.length})
      </h2>

      {/* Table responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[600px]">
          <thead>
            <tr>
              <th>#</th>
              <th className="hidden sm:table-cell">Photo</th> {/* Hide on xs */}
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="hidden sm:table-cell">
                  <img
                    src={user.photoURL }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td className="break-all">{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
