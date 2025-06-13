import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapChart = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    fetch('/world.geo.json')
      .then((res) => res.json())
      .then((data) => {
        // Add "visited" flag to each feature
        data.features.forEach((feature: any) => {
          feature.properties.visited = false;
        });
        setGeoData(data);
      });
  }, []);

  const styleFeature = (feature: any) => {
    return {
      fillColor: feature.properties.visited ? '#60a5fa' : '#e5e7eb',
      weight: 1,
      color: '#ccc',
      fillOpacity: 0.7,
    };
  };

  const onEachCountry = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        feature.properties.visited = !feature.properties.visited;

        // Update the clicked country's style only
        layer.setStyle(styleFeature(feature));
      },
    });

    layer.bindTooltip(feature.properties.ADMIN);
  };

  return (
    <div className="h-screen w-full bg-slate-100">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
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