import React, {useState, useEffect} from "react";
import sun_col from "./weather 3d/01_sunny_color.svg";

const DaysWeatherContainer = ({city, region}) => {
    const [weatherData,
        setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                // Получение текущей даты в формате YYYY-MM-DD
                const currentDate = new Date()
                    .toISOString()
                    .split("T")[0];

                // Формирование URL с параметрами города, региона и текущей даты
                const url = `https://localhost:7024/WeatherWeek?Day=${currentDate}&City=${city.city}&Region=${region.region}`;

                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    mode: "cors"
                });
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [city, region]); // useEffect теперь вызывается при изменении city или region

    return (
        <div className="days-weather-container">
            <div className="text days-text">5 дней</div>
            <div className="color-frame days-weather">
                <ul className="week-weather-list">
                    {weatherData.map((day, index) => (<DayWeather key={index} day={day}/>))}
                </ul>
            </div>
        </div>
    );
};

const DayWeather = ({day}) => {
    const dateObject = new Date(day.day);
    const dayOfMonth = dateObject.getDate();
    const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];
    const monthName = monthNames[dateObject.getMonth()];
    const dayOfWeekNames = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
    ];
    const dayOfWeekName = dayOfWeekNames[dateObject.getDay()];

    return (
        <li>
            <img className="icon-weather" src={sun_col} alt="Weather Icon"/>
            <div className="text days-temp">
                <span
                    style={{
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                }}>{`${day.temperatureCmin}°C`}</span>
                /
                <span style={{
                    fontSize: '0.8em'
                }}>{`${day.temperatureCmax}°C`}</span>
            </div>
            <div className="text date">{`${dayOfMonth} ${monthName}`}</div>
            <div className="text date">{dayOfWeekName}</div>
        </li>
    );
};

export default DaysWeatherContainer;
