import React, {useEffect, useState} from "react";
import axios from "axios";
import Map from "./OSMMap";
import {createRoot} from "react-dom/client";

const MapContainer = (props) => {
    const [families,
        setFamilies] = useState([]);
    const [flowers,
        setFlowers] = useState([]);
    const [markers,
        setMarkers] = useState([]);
    const [selectedFlower,
        setSelectedFlower] = useState("");
    const [selectedAddressA,
        setSelectedAddressA] = useState("");
    const [selectedAddressB,
        setSelectedAddressB] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("https://localhost:7024/Family");
                setFamilies(response.data);
                changeFamilySelect(response.data[0]);
            } catch (error) {
                console.error("Error fetching families: ", error);
            }
        };

        fetchData();
    }, []);
    const fetchData = async() => {
        try {
            const root = createRoot(document.getElementById("map"));
            const responseA = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedAddressA}`);
            const A = [
                responseA.data[0]
                    ?.lat,
                responseA.data[0]
                    ?.lon
            ];

            const responseB = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedAddressB}`);
            const B = [
                responseB.data[0]
                    ?.lat,
                responseB.data[0]
                    ?.lon
            ];

            root.render(<Map selectedFlower={selectedFlower} adressA={A} adressB={B} markers={markers}/>);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
   

    const changeFamilySelect = (newFamily) => {
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
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const date = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${date}`;

        axios
            .get(`https://localhost:7024/Map?day=${formattedDate}&nameFlower=${selectedFlower}`)
            .then((response) => {
                setMarkers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching map data: ", error);
            });
            fetchData();
    };

    return (
        <div className="map-container">
            <div id="map">
                <Map
                    selectedFlower={selectedFlower}
                    adressA={selectedAddressA}
                    adressB={selectedAddressB}
                    markers={markers}/>
            </div>
            <div className="select-pos">
                <div className="select-cont">
                    <div className="text genre-text">Семейство</div>
                    <select
                        id="famSel"
                        className="genre-select"
                        onChange={(event) => changeFamilySelect(event.target.value)}>
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
                    }}>
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
                        onChange={(event) => setSelectedAddressA(event.target.value)}/>
                    <input
                        className="pos2"
                        type="text"
                        placeholder="Введите куда"
                        onChange={(event) => setSelectedAddressB(event.target.value)}/>
                    <button className="text map-ok" onClick={getMapData}>
                        Применить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapContainer;
