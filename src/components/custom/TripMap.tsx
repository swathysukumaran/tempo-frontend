import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in React builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Avoid use of 'any' by explicitly typing prototype
const iconDefault = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: () => string;
};
delete iconDefault._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MarkerData {
  lat: number;
  lng: number;
  name: string;
}

interface TripMapProps {
  markers: MarkerData[];
}

const TripMap: React.FC<TripMapProps> = ({ markers }) => {
  if (!markers || markers.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">No map data available</div>
    );
  }

  const center = {
    lat: markers[0].lat,
    lng: markers[0].lng,
  };

  return (
    <div className="rounded-xl overflow-hidden  border border-gray-300 max-w-3xl mx-auto">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <span className="text-sm font-medium text-gray-800">
                {marker.name}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TripMap;
