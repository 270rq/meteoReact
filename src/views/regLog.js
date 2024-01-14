import React, {useState} from "react";
import {useSpring, animated} from "react-spring";
import logSVG from "./icon/login.svg";
import "./css/profile.css";
import Header from "./header";
import root from "../index";
import Profile from "./profile";


const serverUrl = "https://localhost:7024";

function InputField({placeholder, type, onChange, errorMessage}) {
    return (
        <div className="input-container">
            <input
                className="logReg-input text"
                placeholder={placeholder}
                type={type}
                onChange={onChange}/>
            <animated.p
                style={useSpring({
                opacity: errorMessage.length === 0
                    ? 0
                    : 1
            })}
                className="error-message">{errorMessage}</animated.p>
        </div>
    );
}

function RegLog() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [showThirdInput,
        setShowThirdInput] = useState(false);
    const [isRegister,
        setIsRegister] = useState(false);
    const [checkMail,
        setCheckMail] = useState(true);
    const [checkPassword,
        setCheckPassword] = useState("");
    const [checkConfirmation,
        setCheckConfirmation] = useState(true);
    const [mail,
        setUserMail] = useState("");
    const [password,
        setUserPassword] = useState("");

    const fadeIn = useSpring({
        opacity: showThirdInput
            ? 1
            : 0,
        transform: showThirdInput
            ? "translateY(0)"
            : "translateY(-20px)"
    });

    function isValidEmail(email) {
        return emailRegex.test(email);
    }

    const setMail = (mailString) => {
        if (isValidEmail(mailString)) {
            setUserMail(mailString);
            setCheckMail(true);
        } else {
            setCheckMail(mailString === "");
        }
    };

    const setPassword = (passwordString) => {
        if (passwordString.length === 0) {
            setCheckPassword("");
            return;
        }
        if (passwordString.length < 8) {
            setCheckPassword("Минимальная длина пароля 8");
            return;
        }
        if (!/[A-Z]/.test(passwordString)) {
            setCheckPassword("Хотя бы один заглавный символ");
            return;
        }
        if (!/[a-z]/.test(passwordString)) {
            setCheckPassword("Хотя бы один строчный символ");
            return;
        }
        if (!/\d/.test(passwordString)) {
            setCheckPassword("Хотя бы одна цифра");
            return;
        }
        setUserPassword(passwordString);
        setCheckPassword("");
    };

    const setConfirmation = (confirmationString) => {
        if (confirmationString.length === 0) {
            setCheckConfirmation(true)
            return;
        }
        if (confirmationString !== password) {
            setCheckConfirmation(false);
        } else {
            setCheckConfirmation(true);
        }
    };

    const handleToggleForm = () => {
        setIsRegister((prev) => !prev);
        setShowThirdInput((prev) => !prev);
    };

    const login = async() => {
        try {
            const loginData = {
                email: mail,
                password: password
            };
            const response = await fetch(`${serverUrl}/user/loginReg/log`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                root.render(<Profile/>)
                console.log("Succses");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const reg = async() => {
        try {
            if (mail === "") {
                return;
            }
            if (password === "") {
                return;
            }
            const regData = {
                email: mail,
                password: password,
                confirmPassword: password
            };
            const response = await fetch(`${serverUrl}/user/loginReg/reg`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regData)
            });
            if (response.ok) {
                root.render(<Profile/>)
                console.log("Succses");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return ( <> <Header/> < div className = "profile-placer" > <div className="frame-profile">
        <div className="reg-log-title-cont">
            <img src={logSVG} alt="log icon"/>
            <div className="text">{isRegister
                    ? "Регистрация"
                    : "Вход"}</div>
        </div>
        <div className="logReg-data">
            <InputField
                placeholder="Почта"
                type="text"
                onChange={(event) => setMail(event.target.value)}
                errorMessage={checkMail
                ? ""
                : "Проверь правильность почты"}/>
            <InputField
                placeholder="Пароль"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                errorMessage={checkPassword}/>
            <div className="input-container"><animated.input
                style={fadeIn}
                className="logReg-input text"
                placeholder="Подтвердите пароль"
                type="password"
                onChange={(event) => setConfirmation(event.target.value)}/>
                <animated.p
                    style={useSpring({
                    opacity: checkConfirmation
                        ? 0
                        : 1
                })}
                    className="error-message">{checkConfirmation
                        ? ""
                        : "Пароль не совпадают"}</animated.p>
            </div>
        </div>
        <div className="logReg-buttons-container">
            <button
                className="logReg-buttons-mainButton text"
                onClick={isRegister
                ? () => reg()
                :() => login()}>
                {isRegister
                    ? "Регистрация"
                    : "Войти"}
            </button>
            <button
                className="logReg-buttons-additionButton text"
                onClick={handleToggleForm}>
                {isRegister
                    ? "Есть аккаунт"
                    : "Нет аккаунта"}
            </button>
        </div>
    </div> </div>
        </ >);
}

export default RegLog;
