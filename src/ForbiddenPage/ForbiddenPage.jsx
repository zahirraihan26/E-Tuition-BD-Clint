import React from "react";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router";


const ForbiddenPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
            <MdBlock className="text-red-600 w-24 h-24 mb-4" />
            <h1 className="text-6xl font-bold text-gray-800 mb-2">403</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
                Access Forbidden
            </h2>
            <p className="text-gray-500 mb-6">
                Sorry, you don’t have permission to view this page.
            </p>
            <Link
                to="/"
                className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ForbiddenPage;
