import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function getFlower(Family) {

  const response = await fetch(`${serverUrl}/plants?Family=${Family}`, {
    mode: 'cors',

  });

  const data = await response.json();
  return data;
}
let flowersWithFamyly = {};
async function changeFlowerSelect() {
  const selectFamily = document.getElementById('famSel');
  console.log(selectFamily.value);
  console.log(flowersWithFamyly);
  const flowers = flowersWithFamyly[selectFamily.value];
  console.log(flowers);

  const selectFlower = document.getElementById('flowerSelect');
  selectFlower.innerHTML = "";
  flowers.forEach((familyName) => {
    const option = document.createElement('option');
    option.value = familyName;
    option.text = familyName;
    selectFlower.appendChild(option);
  });

}
function generateColorsArray(numberOfColors) {
  var colors = [];
  var minDistance = 128; // Минимальное расстояние между цветами
  for (var i = 0; i < numberOfColors; i++) {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var newColor = "rgb(" + red + "," + green + "," + blue + ")";
    // Проверяем, что новый цвет достаточно отличается от предыдущих
    if (i > 0) {
      var distance = colorDistance(newColor, colors[i - 1]);
      if (distance < minDistance) {
        i--; // Генерируем новый цвет
        continue;
      }
    }
    colors.push(newColor);
  }
  return colors;
}

// Функция для вычисления расстояния между двумя цветами
function colorDistance(color1, color2) {
  var r1 = parseInt(color1.substr(4, 3));
  var g1 = parseInt(color1.substr(9, 3));
  var b1 = parseInt(color1.substr(14, 3));
  var r2 = parseInt(color2.substr(4, 3));
  var g2 = parseInt(color2.substr(9, 3));
  var b2 = parseInt(color2.substr(14, 3));
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}
async function getFamily() {
  const response = await fetch(`${serverUrl}/Family`, {
    mode: 'cors',

  });

  const data = await response.json();
  return data;
}

const MapContainer = () => {
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState('');

  useEffect(() => {
    // Fetch families from API and set the state
    axios.get('api_url/families')
      .then(response => {
        setFamilies(response.data);
      })
      .catch(error => {
        console.error('Error fetching families: ', error);
      });
  }, []);

  const changeFamilySelect = (event) => {
    setSelectedFamily(event.target.value);
    // Fetch flowers based on selected family and set the state
    axios.get(`api_url/flowers?family=${event.target.value}`)
      .then(response => {
        setFlowers(response.data);
      })
      .catch(error => {
        console.error('Error fetching flowers: ', error);
      });
  };

  const getMapData = () => {
    // Use selectedFamily and selectedFlower to get map data
    // Perform the necessary action with the selected data
  };

  return (
    <div className="map-container">
      <div id="map">
        <div className="all-container">
          <div className="text genre-text">Семейство</div>
          <select id="famSel" className="genre-select" onChange={changeFamilySelect}>
            {families.map(family => (
              <option key={family.id} value={family.id}>{family.name}</option>
            ))}
          </select>
          <div className="text name-text">Аллергены</div>
          <select id="flowerSelect" className="name-select" onChange={(event) => setSelectedFlower(event.target.value)}>
            {flowers.map(flower => (
              <option key={flower.id} value={flower.id}>{flower.name}</option>
            ))}
          </select>
          <button className="map-ok" onClick={getMapData}>Применить</button>
        </div>
      </div>
      <div className="text map-text">Карта цветения</div>
    </div>
  );
};

export default MapContainer;