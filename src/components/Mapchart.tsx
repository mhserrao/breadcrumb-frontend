import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useRef, useState, useCallback } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type MapChartProps = {
  visitedCountries: string[];
  setVisitedCountries: React.Dispatch<React.SetStateAction<string[]>>;
};

const MapChart: React.FC<MapChartProps> = ({
  visitedCountries,
  setVisitedCountries,
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [user] = useAuthState(auth);

  const styleFeature = useCallback(
    (feature: any) => {
      const code = feature.properties["ISO3166-1-Alpha-2"];
      return {
        fillColor: visitedCountries.includes(code) ? "#60a5fa" : "#e5e7eb",
        weight: 1,
        color: "#ccc",
        fillOpacity: 0.7,
      };
    },
    [visitedCountries]
  );

  useEffect(() => {
    const loadMapAndVisitedCountries = async () => {
      try {
        const response = await fetch("/world.geo.json");
        const data = await response.json();
        setGeoData(data);

        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const savedData = docSnap.data();
            if (Array.isArray(savedData.visitedCountries)) {
              setVisitedCountries(savedData.visitedCountries);
            }
          }
        }
      } catch (error) {
        console.error("Error loading map or visited countries:", error);
      }
    };

    loadMapAndVisitedCountries();
  }, [user, setVisitedCountries]);

  const onEachCountry = (feature: any, layer: any) => {
    const code = feature.properties["ISO3166-1-Alpha-2"];
    if (!code) return;

    layer.on({
      click: () => {
        setVisitedCountries((prev) =>
          prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
      },
    });

    const name =
      feature.properties.ADMIN || feature.properties.name || "Unknown";
    layer.bindTooltip(name, {
      sticky: true,
      direction: "top",
      opacity: 0.9,
      className: "country-tooltip",
    });
  };

  useEffect(() => {
    console.log("Visited countries:", visitedCountries);
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const feature = layer.feature;
        layer.setStyle(styleFeature(feature));
      });
    }
  }, [visitedCountries, styleFeature]);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save your visited countries.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        visitedCountries,
      });
      alert("Visited countries saved successfully!");
    } catch (error) {
      console.error("Error saving visited countries:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-100 relative">
      <button
        onClick={handleSave}
        className="absolute top-4 right-4 z-[1000] bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
      >
        Save Countries
      </button>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
        worldCopyJump={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            onEachFeature={onEachCountry}
            style={styleFeature}
            ref={geoJsonRef}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapChart;
