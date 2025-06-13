import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        🌍 Welcome to Breadcrumb
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8">
        Track your travels by selecting countries you've visited. Visualize your
        journey on an interactive map and share your adventures with ease.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
