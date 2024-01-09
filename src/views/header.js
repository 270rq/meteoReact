import React, {useState} from "react";
import profileIcon from "./icon/profile.svg";
import polenIcon from "./icon/pollenLink.svg"
import Pollen from "./pollen";
import Profile from "./profile.js";
import root from "../index";
import RegLog from "./regLog.js";
const Header = (interval) => {
    const [isLoggedIn,
        setIsLoggedIn] = useState(!!localStorage.getItem("id"));
    const serverUrl = "https://localhost:7024";
    const handleLogout = () => {
        localStorage.removeItem("id");
        setIsLoggedIn(false);
        window
            .location
            .reload();
    };

    const handleGoToPollenPage = () => {
        clearInterval(interval);
        root.render(<Pollen/>);
    };
    const getAllergen = async() => {

        try {
            const response = await fetch(`${serverUrl}/user/loginReg/allerg`, {
                method: "get",
                credentials: "include",

                mode: "cors"
            });
            if (response.ok) {
                const responseData = await response.text();
                localStorage.setItem("allergen", responseData !== "not auth"
                    ? responseData
                    : "");
            }
        } catch (error) {
            console.error(error);
        }

    };
    const handleGoToProfilePage = async() => {
        await getAllergen();
        if (localStorage.getItem("allergen")) {
            // Если токен есть, перейти на страницу профиля
            root.render(<Profile/>);
        } else {
            // Если токена нет, перейти на страницу регистрации и входа
            root.render(<RegLog/>);
        }
    };

    return (
        <header className={`side-header`} id="header">
            <div></div>
            <img onClick={handleGoToPollenPage} src={polenIcon} alt="go to polen"/> {isLoggedIn
                ? (
                    <div>
                        <a href="profile.js" id="link">
                            <img src={profileIcon} className="icon-profile" alt="Profile"/>
                        </a>
                        <button onClick={handleLogout}>Выход</button>
                    </div>
                )
                : (
                    <button className="profile-button" onClick={handleGoToProfilePage}>
                        <img src={profileIcon} className="icon-profile" alt="Profile"/>
                    </button>
                )}

        </header>
    );
};

export default Header;
