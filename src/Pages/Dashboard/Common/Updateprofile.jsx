import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProfileForm = ({ user, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // User ID বা email check
    if (!user?._id && !user?.email) {
      Swal.fire("Error", "User information missing", "error");
      return;
    }

    setLoading(true);
    try {
      // Backend route check: prefer _id if available, else email
      const endpoint = `/user/update-profile/${user._id}`;
      const res = await axiosSecure.patch(endpoint, { displayName, photoURL });

      if (res.data.success) {
        Swal.fire("Success", "Profile updated!", "success");
        if (onUpdate) onUpdate(); // parent থেকে state refresh
      } else {
        Swal.fire("Error", res.data.message || "Update failed", "error");
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600">Full Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border rounded-lg w-full p-2 mt-1"
          placeholder="Enter full name"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Photo URL</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="border rounded-lg w-full p-2 mt-1"
          placeholder="Enter photo URL"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-xl w-full"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
