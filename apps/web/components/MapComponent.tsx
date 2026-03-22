"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React-Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent({
  lat = 23.10,
  lng = 75.22,
  patient = "Unknown",
  condition = "Emergency"
}: {
  lat?: number,
  lng?: number,
  patient?: string,
  condition?: string
}) {
  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border border-border">
      <MapContainer center={[lat, lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={[lat, lng]} radius={500} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <strong>{patient}</strong><br/>
            Condition: {condition}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
