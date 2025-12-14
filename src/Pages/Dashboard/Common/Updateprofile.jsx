import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Updateprofile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !photo) {
      toast.error('All fields are required');
      return;
    }

    updateUserProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        toast.success('Profile updated successfully!');
        navigate('/dashboard/profile');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to update profile');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleUpdate} className="card-body">
          <h1 className="text-2xl font-bold text-center">Update Your Account</h1>

          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input input-bordered"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral mt-4">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
