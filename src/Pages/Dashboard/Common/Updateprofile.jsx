import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const UpdateProfileForm = () => {
  const { user, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setSuccess('');
    try {
      await updateUserProfile({ displayName, photoURL });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md mt-6 max-w-lg mx-auto">
      <h3 className="text-lg font-semibold mb-4">Update Profile</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Photo URL</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Fancy Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-yellow-400  text-white font-semibold shadow-lg hover:bg-yellow-500  hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
            </svg>
            Updating...
          </>
        ) : (
          'Update Profile'
        )}
      </button>

      {success && <p className="text-green-600 mt-3 text-center font-medium">{success}</p>}
    </form>
  );
};

export default UpdateProfileForm;
