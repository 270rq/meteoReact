import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import RoutingMachine from "./createRoutingMachine";
import Map from "./OSMMap";

const MapContainer = (props ) => {
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState("");
  const [flowers, setFlowers] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    // Fetch families from API and set the state
    axios
      .get("api_url/families")
      .then((response) => {
        setFamilies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching families: ", error);
      });
  }, []);

  const changeFamilySelect = (event) => {
    setSelectedFamily(event.target.value);
    // Fetch flowers based on selected family and set the state
    axios
      .get(`api_url/flowers?family=${event.target.value}`)
      .then((response) => {
        setFlowers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flowers: ", error);
      });
  };

  const getMapData = () => {
    // Fetch map data based on selected family and flower
    axios
      .get(`api_url/map?family=${selectedFamily}&flower=${selectedFlower}`)
      .then((response) => {
        // Process map data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching map data: ", error);
      });
  };
  

  return (
    <div className="map-container">
      <div id="map">
        <Map selectedFlower={selectedFlower}/>
      </div>
      <div className="select-cont">
        <div className="text genre-text">Семейство</div>
        <select
          id="famSel"
          className="genre-select"
          onChange={changeFamilySelect}
        >
          {families.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name}
            </option>
          ))}
        </select>
        <div className="text name-text">Аллергены</div>
        <select
          id="flowerSelect"
          className="name-select"
          onChange={(event) => setSelectedFlower(event.target.value)}
        >
          {flowers.map((flower) => (
            <option key={flower.id} value={flower.id}>
              {flower.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Введите адрес"
          onChange={(event) => setSelectedAddress(event.target.value)}
        />
        <button className="text map-ok" onClick={getMapData}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default MapContainer;
