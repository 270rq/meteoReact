import sun_col from "./weather 3d/01_sunny_color.svg";
import wind_arrow from "./icon/windArrow.svg";
import React, {useState, useEffect} from "react";

const HourWeather = ({hour}) => {
  let angle = 0;

  switch (hour.typeWind) {
    case "N":
      angle = 0;
      break;
    case "NE":
      angle = 45;
      break;
    case "E":
      angle = 90;
      break;
    case "SE":
      angle = 135;
      break;
    case "S":
      angle = 180;
      break;
    case "SW":
      angle = 225;
      break;
    case "W":
      angle = 270;
      break;
    case "NW":
      angle = 315;
      break;
    default:
      angle = 0;
  }
    return <ul className="color-frame-layers lit-param">
        <li></li>
        <li className="text time">{new Date(hour.day).getHours()}:00</li>
        <img src={sun_col} alt="Weather Icon"/>
        <li className="text temp">{hour.temperatureC}°C</li>
        <img className="sun-col" src={wind_arrow} alt="Weather Icon" style={{ transform: `rotate(${angle}deg)` }} />
        <li className="text speedWindy">{hour.speedWind} km/h</li>
        <li></li>
    </ul>
};
const HourWeatherContainer = ({city, region}) => {
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
                const url = `https://localhost:7024/WeatherHour?Day=${currentDate}&City=${city.city}&Region=${region.region}`;

                const response = await fetch(url);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [city, region]); // useEffect теперь вызывается при изменении city или region

    return (
        <div className="param">
            {weatherData.map((hour) => (<HourWeather hour={hour} key={hour.day}/>))}
        </div>
    )
}

export default HourWeatherContainer;