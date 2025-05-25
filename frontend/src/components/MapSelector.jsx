import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ setLat, setLon }) {
    useMapEvents({
        click(e) {
            setLat(e.latlng.lat.toFixed(4));
            setLon(e.latlng.lng.toFixed(4));
        },
    });
    return null;
}

export default function MapSelector({ lat, lon, setLat, setLon }) {
    return (
        <div className="h-64 rounded overflow-hidden shadow-md mt-4">
            <MapContainer center={[20.5937, 78.9629]} zoom={4} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker setLat={setLat} setLon={setLon} />
                {lat && lon && (
                    <Marker position={[lat, lon]} icon={markerIcon} />
                )}
            </MapContainer>
        </div>
    );
}
