import React, { useEffect, useState } from "react";
import "./css/profile.css";
import defAvatar from "./img/default_avatar.jpg";
import Header from "./header";

const serverUrl = "https://localhost:7024";

function Profile() {
    const [allergenOptions, setAllergenOptions] = useState([]);
    const [selectedAllergen, setSelectedAllergen] = useState(localStorage.getItem("allergen") || "");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${serverUrl}/allPlants`, { mode: "cors" });
                if (!response.ok) {
                    throw new Error("Failed to fetch allergen options");
                }
                const data = await response.json();
                setAllergenOptions(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const updateAllergen = async () => {
        try {
            const response = await fetch(`${serverUrl}/user/loginReg/allerg?flower=${selectedAllergen}`, {
                method: "POST",
                credentials: "include",
                mode: "cors",
            });

            if (!response.ok) {
                console.error(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className="profile-placer">
                <div className="frame-profile">
                    <div className="title text">Личные данные</div>
                    <div className="Persona-data">
                        <div className="avatar-container">
                            <label htmlFor="avatar-input" id="avatar">
                                <img className="avatar-img" id="avatar" src={defAvatar} alt="Аватар" />
                            </label>
                            <input type="file" className="avatar-input" id="avatar-input" accept="image/*" />
                        </div>
                        <div className="select_container">
                            <input className="user-name" placeholder="Имя" />
                            <select
                                id="selAllerg"
                                className="flower-name"
                                value={selectedAllergen === "" ? "Выбери аллерген" : selectedAllergen}
                                onChange={(e) => setSelectedAllergen(e.target.value)}
                            >
                                <option disabled="disabled">Выбери аллерген</option>
                                {allergenOptions.map((option) => (
                                    <option key={option.id} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="profile_button" onClick={updateAllergen}>
                        ОК
                    </button>
                </div>
            </div>
        </>
    );
}

export default Profile;
