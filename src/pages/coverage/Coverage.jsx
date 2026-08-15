import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import L from 'leaflet';


import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Coverage = () => {
    const position = [23.6850, 90.3563]; 
    const ourLocations = useLoaderData() || []; // bring the data using useLoader, from router.jsx

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-5">We are available in 64 districts</h2>
            <div className='w-full h-150 border rounded-xl overflow-hidden'>
                <MapContainer 
                    center={position}
                    zoom={7} 
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }} 
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        ourLocations.map((center, index) => (
                            <Marker 
                                key={index} 
                                position={[parseFloat(center.latitude), parseFloat(center.longitude)]}
                            >
                                <Popup>
                                    <div className="font-bold">
                                        {center.district || "Location Name"}
                                        Service Area: {center.covered_area.join(',' )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;

