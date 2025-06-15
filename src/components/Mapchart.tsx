import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapChart = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    fetch("/world.geo.json")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data); // ❌ Removed setting visited on each feature
      });
  }, []);

  const styleFeature = (feature: any) => {
    const code = feature.properties["ISO3166-1-Alpha-2"];
    return {
      fillColor: visitedCountries.includes(code) ? "#60a5fa" : "#e5e7eb",
      weight: 1,
      color: "#ccc",
      fillOpacity: 0.7,
    };
  };

  const onEachCountry = (feature: any, layer: any) => {
    const code = feature.properties["ISO3166-1-Alpha-2"];
    if (!code) return;

    layer.on({
      click: () => {
        setVisitedCountries((prev) => {
          const isVisited = prev.includes(code);
          const updated = isVisited
            ? prev.filter((c) => c !== code)
            : [...prev, code];
          return updated;
        });
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

  // 👇 Refresh map styles on visitedCountries change
  useEffect(() => {
    console.log("Visited countries:", visitedCountries);
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const feature = layer.feature;
        layer.setStyle(styleFeature(feature));
      });
    }
  }, [visitedCountries]);

  return (
    <div className="h-screen w-full bg-slate-100">
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
