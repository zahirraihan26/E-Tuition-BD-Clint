import { Outlet } from 'react-router';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl w-full max-w-2xl p-8">
        
        {/* Profile Photo & Role */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-full h-28 w-28 border-4 border-white shadow-md object-cover"
          />
          <span className="mt-3 bg-green-600 text-white text-xs px-4 py-1 rounded-full shadow">
            {isRoleLoading ? "Loading..." : role || "N/A"}
          </span>
          <p className="mt-3 text-gray-700 text-sm">
            <span className="font-semibold">User ID:</span> {user?.uid || "N/A"}
          </p>
        </div>

        {/* Profile Details */}
        <div className="bg-white shadow-inner p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Profile Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-lg">{user?.displayName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Link
            
            className="flex-1 max-w-xs text-center bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg shadow transition-colors duration-300"
          >
            Update Profile
          </Link>
        </div>

        {/* Nested Routes */}
        
      </div>
    </div>
  );
};

export default Profile;
