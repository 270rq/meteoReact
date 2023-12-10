import React, { useEffect, useState } from "react";
import "./css/profile.css";

const serverUrl = "https://localhost:7024";

function Profile() {
  const [allergenOptions, setAllergenOptions] = useState([]);
  const [selectedAllergen, setSelectedAllergen] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${serverUrl}/allPlants`, {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch allergen options");
        }
        const data = await response.json();
        setAllergenOptions(data);
        getAllergen();
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const getAllergen = async () => {
    let id = localStorage.getItem("id");
    if (id) {
      try {
        const response = await fetch(
          `${serverUrl}/user/loginReg/allerg?id=${id}`,
          { mode: "cors" }
        );
        if (response.status === 200) {
          const data = await response.text();
          if (data !== "not found" && data !== null && data.length > 0) {
            setSelectedAllergen(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateAllergen = async () => {
    let id = localStorage.getItem("id");
    if (id) {
      try {
        const response = await fetch(
          `${serverUrl}/user/loginReg/allerg?flower=${selectedAllergen}&id=${id}`,
          {
            method: "POST",
            mode: "cors",
          }
        );
        if (response.ok) {
          window.location.href = "index.html";
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="frame-profile">
      <div className="avatar-container">
        <img id="avatar" src="default-avatar.jpg" alt="Аватар" />
        <input
          type="file"
          id="avatar-input"
          accept="image/*"
          style={{ display: "none" }}
        />
        <label htmlFor="avatar-input" className="upload-button">
          Выберите фото
        </label>
      </div>
      <div className="text title">Личные данные</div>
      <div className="select_container">
        <div className="text user-text">Имя</div>
        <input className="user-name" />
        <div className="text flower-text">Аллергены</div>
        <select
          id="selAllerg"
          className="flower-name"
          value={selectedAllergen}
          onChange={(e) => setSelectedAllergen(e.target.value)}
        >
          {allergenOptions.map((option) => (
            <option key={option.id} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button className="profile_button" onClick={updateAllergen}>
        ОК
      </button>
    </div>
  );
}

export default Profile;
