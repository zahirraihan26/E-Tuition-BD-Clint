import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log("Role:", role, "Loading:", isRoleLoading)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl w-full max-w-2xl p-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="rounded-full h-28 w-28 border-4 border-white shadow-md object-cover"
          />

          {/* Role Badge */}
          <span className="mt-3 bg-green-600 text-white text-xs px-4 py-1 rounded-full shadow">
            {isRoleLoading ? "Loading..." : role}
          </span>

          {/* User UID */}
          <p className="mt-3 text-gray-700 text-sm">
            <span className="font-semibold">User ID:</span> {user?.uid}
          </p>
        </div>

        {/* Details Section */}
        <div className="mt-8 bg-white shadow-inner p-6 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">

            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-lg">{user?.displayName}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{user?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg shadow">
              Update Profile
            </button>

            <button className="flex-1 bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg shadow">
              Change Password
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
