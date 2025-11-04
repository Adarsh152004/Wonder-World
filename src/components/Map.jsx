/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
MapContainer,
TileLayer,
Marker,
Popup,
useMap,
useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import MapSearchBar from "./MapSearchBar";
import Spinner from "./Spinner";

function Map() {
const { cities, getFlag } = useCities();
const [mapPosition, setMapPosition] = useState([40, 0]);
const {
isLoading: isLoadingPosition,
position: geolocationPosition,
getPosition,
} = useGeolocation();
const [mapLat, mapLng] = useUrlPosition();
const [searchQuery, setSearchQuery] = useState("");

// Center map based on URL params
useEffect(() => {
if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
}, [mapLat, mapLng]);

// Center map based on user's geolocation
useEffect(() => {
if (geolocationPosition)
setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
}, [geolocationPosition]);

// Handle location search
async function handleSearch(e) {
e.preventDefault();
if (!searchQuery) return;

try {
  const res = await fetch(
  `/api/nominatim/search?format=json&q=${encodeURIComponent(searchQuery)
  }`
);

  const data = await res.json();

  if (data.length === 0) {
    alert("Location not found");
    return;
  }

  const { lat, lon } = data[0];
  setMapPosition([+lat, +lon]);
} catch (err) {
  console.error("Search Failed", err);
}

}

return ( <div className={styles.mapContainer}>
{!geolocationPosition && ( <Button type="position" onClick={getPosition}>
{isLoadingPosition ? "Loading..." : "Use your position"} </Button>
)}


  <MapSearchBar
    handleSearch={handleSearch}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
  />

  <MapContainer
    center={mapPosition}
    zoom={3}
    scrollWheelZoom={true}
    className={styles.map}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />

    {/* Render all city markers */}
    {cities.map((city) => (
      <Marker
        key={city.id}
        position={[Number(city.lat), Number(city.lng)]}
      >
        <Popup>
          <div>
            <span>{getFlag(city.emoji)}</span>{" "}
            <strong>{city.cityName}</strong>
          </div>
          <div>{city.country}</div>
          <div>
            🌡 {city.weather_temp}°C - {city.weather_description}{" "}
            {city.weather_icon}
          </div>
          <div>{city.notes}</div>
        </Popup>
      </Marker>
    ))}

    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
</div>

);
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }

export default Map;
