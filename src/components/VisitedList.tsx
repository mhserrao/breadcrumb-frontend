import React from "react";
import countryNamesData from "../data/country_code_mapping.json";

const countryNames: Record<string, string> = countryNamesData;

type VisitedListProps = {
  visitedCountries: string[];
};

const VisitedList: React.FC<VisitedListProps> = ({ visitedCountries }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Visited Countries</h2>
      <ul className="list-disc list-inside">
        {visitedCountries.length > 0 ? (
          visitedCountries.map((code) => (
            <li key={code}>{countryNames[code] || code}</li>
          ))
        ) : (
          <li className="text-gray-500 italic">No countries selected.</li>
        )}
      </ul>
    </div>
  );
};

export default VisitedList;
