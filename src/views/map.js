import React, {useEffect, useState } from "react";
import axios from "axios";
import Map from "./OSMMap";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom';

const MapContainer = (props) => {
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState("");
  const [markers, setMarkers] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState("");
  const [selectedAddressA, setSelectedAddressA] = useState("");
  const [selectedAddressB, setSelectedAddressB] = useState("");

  useEffect(() => {
    // Fetch families from API and set the state
    axios
      .get("https://localhost:7024/Family")
      .then((response) => {
        setFamilies(response.data);
        setSelectedFamily(response.data[0])
        changeFamilySelect(response.data[0])
      })
      .catch((error) => {
        console.error("Error fetching families: ", error);
      });
  }, []);
  useEffect(() => {
    const root = createRoot(document.getElementById("map"));

    const fetchData = async () => {
      try {
        const responseA = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${selectedAddressA}`
        );
        const A = [responseA.data[0]["lat"], responseA.data[0]["lon"]];

        const responseB = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${selectedAddressB}`
        );
        const B = [responseB.data[0]["lat"], responseB.data[0]["lon"]];

        console.log(A);
        root.render(
          <Map selectedFlower={selectedFlower} adressA={A} adressB={B} markers={markers}/>
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (selectedAddressA !== "" && selectedAddressB !== "") {
      fetchData();
    }
  }, [selectedAddressA, selectedAddressB]);
  useEffect(() => {}, [markers]);
  const changeFamilySelect = (newFamily) => {
    setSelectedFamily(newFamily);
    // Fetch flowers based on selected family and set the state
    axios
      .get(`https://localhost:7024/Plants?family=${newFamily}`)
      .then((response) => {
        setFlowers(response.data);
        setSelectedFlower(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching flowers: ", error);
      });
  };

  const getMapData = () => {
    // Fetch map data based on selected family and flower
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;
    console.log(
      `https://localhost:7024/Map?day=${formattedDate}&nameFlower=${selectedFlower}`
    );
    axios
      .get(
        `https://localhost:7024/Map?day=${formattedDate}&nameFlower=${selectedFlower}`
      )
      .then((response) => {
        // Process map data
        setMarkers(response.data);
        
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching map data: ", error);
      });
  };

  return (
    <div className="map-container">
      <div id="map">
        <Map
          selectedFlower={selectedFlower}
          adressA={selectedAddressA}
          adressB={selectedAddressB}
          markers={markers}
        />
      </div>
      <div className="select-pos">
        <div className="select-cont">
          <div className="text genre-text">Семейство</div>
          <select
            id="famSel"
            className="genre-select"
            onChange={(event)=> changeFamilySelect(event.target.value)}
          >
            {families.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
          <div className="text name-text">Аллергены</div>
          <select
            id="flowerSelect"
            className="name-select"
            onChange={(event) => {
              setSelectedFlower(event.target.value);
            }}
          >
            {flowers.map((flower) => (
              <option key={flower} value={flower}>
                {flower}
              </option>
            ))}
          </select>
          <input
            className="pos1"
            type="text"
            placeholder="Введите откуда"
            onChange={(event) => setSelectedAddressA(event.target.value)}
          />
          <input
            className="pos2"
            type="text"
            placeholder="Введите куда"
            onChange={(event) => setSelectedAddressB(event.target.value)}
          />
          <button className="text map-ok" onClick={getMapData}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
