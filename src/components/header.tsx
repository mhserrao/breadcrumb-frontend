import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
        Breadcrumb <span role="img" aria-label="globe">🌍</span>
      </h1>

      {/* Navigation (placeholder for now) */}
      <nav className="space-x-4">
        <button className="text-indigo-700 hover:underline font-medium">Login</button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Header;