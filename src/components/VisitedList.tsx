import React from "react";

type VisitedListProps = {
  visitedCountries: string[];
};

const VisitedList: React.FC<VisitedListProps> = ({ visitedCountries }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Visited Countries</h2>
      <ul className="list-disc list-inside">
        {visitedCountries.length > 0 ? (
          visitedCountries.map((code) => <li key={code}>{code}</li>)
        ) : (
          <li className="text-gray-500 italic">No countries selected.</li>
        )}
      </ul>
    </div>
  );
};

export default VisitedList;
