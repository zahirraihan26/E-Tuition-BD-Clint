import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-yellow-500 text-4xl" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="mt-4 text-gray-500">
          Oops! The page you are looking for doesn’t exist or may have been moved.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3  font-medium bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
          >
            <FaHome />
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
