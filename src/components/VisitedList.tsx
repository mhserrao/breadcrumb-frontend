import React from "react";
import countryNamesData from "../data/country_code_mapping.json";

const countryNames: Record<string, string> = countryNamesData;

type VisitedListProps = {
  visitedCountries: string[];
  savedCountries: string[];
};

const VisitedList: React.FC<VisitedListProps> = ({
  visitedCountries,
  savedCountries,
}) => {
  return (
    <div>
      <h2 className="font-bold mb-2">Visited Countries</h2>
      {visitedCountries.length === 0 ? (
        <p className="text-gray-400">No countries selected.</p>
      ) : (
        <ul className="space-y-1">
          {visitedCountries.map((code) => (
            <li
              key={code}
              className={`${
                savedCountries.includes(code)
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}
            >
              {countryNames[code] || code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VisitedList;
