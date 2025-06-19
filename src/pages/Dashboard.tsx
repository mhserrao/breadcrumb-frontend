import React, { useEffect, useState } from "react";
import MapChart from "../components/Mapchart";
import VisitedList from "../components/VisitedList";

const Dashboard: React.FC = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  return (
    <div className="w-full min-h-screen flex">
      {/* Map section - 80% */}
      <div className="w-4/5 p-4">
        <MapChart
          visitedCountries={visitedCountries}
          setVisitedCountries={setVisitedCountries}
        />
      </div>

      {/* Visited countries list - 20% */}
      <div className="w-1/5 p-4 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        <VisitedList visitedCountries={visitedCountries} />
      </div>
    </div>
  );
};

export default Dashboard;
