import React from "react";

const VisitedList: React.FC = () => {
  const visitedCountries = ["Canada", "Japan", "France"]; // This will eventually come from user state

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-indigo-600">
        Visited Countries
      </h2>
      <ul className="space-y-2">
        {visitedCountries.map((country, index) => (
          <li key={index} className="text-gray-800">
            • {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitedList;
