import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import axios from "axios";
import RoutineMachine from "./createRoutingMachine";
import L from "leaflet";
const Map = ({ selectedAllergen, adressA, adressB, markers }) => {
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
  function getPollinationColor(plantType,plantName, level) {
    if (plantType === "Деревья") {
      if (level >= 11 && level <= 100) {
        return "#00FF00"; // Зеленый
      } else if (level > 100 && level <= 1000) {
        return "#FFFF00"; // Желтый
      } else if (level > 1000) {
        return "#FF0000"; // Красный
      } else {
        return "#FFA500"; // Оранжевый
      }
    } else if (plantType === "Злаки"  || plantType === "Травы") {
      if (level >= 1 && level <= 10) {
        return "#00FF00"; // Зеленый
      } else if (level > 10 && level <= 30) {
        return "#FFFF00"; // Желтый
      } else if (level > 30 && level <= 100) {
        return "#FFA500"; // Оранжевый
      } else {
        return "#FF0000"; // Красный
      }
    } else if (plantName === "Кладоспориум") {
      if (level >= 1 && level <= 300) {
        return "#00FF00"; // Зеленый
      } else if (level > 300 && level <= 1000) {
        return "#FFFF00"; // Желтый
      } else if (level > 1000 && level <= 3000) {
        return "#FFA500"; // Оранжевый
      } else {
        return "#FF0000"; // Красный
      }
    } else if (plantName === "Альтернария") {
      if (level >= 1 && level <= 10) {
        return "#00FF00"; // Зеленый
      } else if (level > 10 && level <= 30) {
        return "#FFFF00"; // Желтый
      } else if (level > 30 && level <= 100) {
        return "#FFA500"; // Оранжевый
      } else {
        return "#FF0000"; // Красный
      }
    } else {
      return "#FFFFFF";
    }
  };
  
  
  const avoidElements = markers.map((marker) =>
    L.circle([marker.x, marker.y], { radius: 5000 })
  );
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
      {markers.map((marker) => (
        <Circle
        color={getPollinationColor(marker["family"],marker['nameFlower'],marker['lvl'])}
          key={`${marker["x"]} ${marker["y"]}`}
          center={[marker["x"], marker["y"]]}
          radius={5000}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Circle>
      ))}
      <RoutineMachine
        adressA={adressA}
        adressB={adressB}
        avoidElements={avoidElements}
      />
    </MapContainer>
  );
};

export default Map;
