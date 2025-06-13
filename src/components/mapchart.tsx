import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';

const MapChart = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    fetch('/world.geo.json')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  useEffect(() => {
    // Manually update the style for each feature
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const countryCode = layer.feature.properties.ISO_A3;
        const isVisited = visited.has(countryCode);
        layer.setStyle({
          fillColor: isVisited ? '#3b82f6' : '#e5e7eb',
          weight: 1,
          color: '#ccc',
          fillOpacity: 0.7,
        });
      });
    }
  }, [visited]);

  const onEachCountry = (feature: any, layer: any) => {
    const countryCode = feature.properties.ISO_A3;

    layer.on({
      click: () => {
        setVisited(prev => {
          const next = new Set(prev);
          next.has(countryCode) ? next.delete(countryCode) : next.add(countryCode);
          return next;
        });
      },
    });

    layer.bindTooltip(feature.properties.ADMIN);
  };

  const initialStyle = () => ({
    fillColor: '#e5e7eb',
    weight: 1,
    color: '#ccc',
    fillOpacity: 0.7,
  });

  return (
    <div className="h-screen w-full bg-slate-50">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        maxBounds={[[-85, -180], [85, 180]]}
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
            style={initialStyle}
            ref={geoJsonRef}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapChart;
