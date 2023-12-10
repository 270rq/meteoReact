import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import RoutineMachine from "./createRoutingMachine";

const Map = ({ selectedAllergen , adressA, adressB , markers}) => {
  const [allergenIntensity, setAllergenIntensity] = useState(null);
  console.log(markers);
  useEffect(() => {
    if (selectedAllergen) {
      axios
        .get(`api_url/allergen/${selectedAllergen}`)
        .then((response) => {
          setAllergenIntensity(response.data.intensity);
        })
        .catch((error) => {
          console.error("Error fetching allergen intensity: ", error);
        });
    }
  }, [selectedAllergen]);

  const getMarkerStyle = () => {
    if (allergenIntensity === "strong") {
      return { filter: "brightness(150%)" };
    } else if (allergenIntensity === "weak") {
      return { filter: "brightness(75%)" };
    } else {
      return { filter: "brightness(100%)" };
    }
  };

  return (
    <MapContainer
      doubleClickZoom={false}
      zoom={14}
      center={[33.5024, 36.2988]}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
      {markers.map((marker)=>
        <Marker key={`${marker['x']} ${marker['y']}`} position={[marker['x'],marker['y']]}></Marker>
      )}
      <RoutineMachine adressA={adressA} adressB={adressB} />
    </MapContainer>
  );
};

export default Map;
