import React, { useState, useEffect } from "react";
import sun_col from "./weather 3d/01_sunny_color.svg";
import map_pin from "./icon/map-pin.svg";
import date from "./icon/date.svg";
import drop from "./icon/drop.svg";
import eye from "./icon/eye.svg";
import sunrise from "./icon/sunrise.svg";
import sunset from "./icon/sunset.svg";
import sun_line from "./icon/sun_line.svg";
import sun from "./icon/sun.svg";
import degress from "./icon/degress.svg";
import compas from "./icon/compas.svg";
import arrow from "./icon/arrow(1).svg";
import Header from "./header";
const MainWeather = () => {
  const [temperature, setTemperature] = useState(0);

  const handleTemperatureUpdate = () => {
    // Логика для обновления температуры
  };

  const uvIndexValues = [
    { value: 0, className: "zero", style: { left: "6%", top: "83%" } },
    { value: 2, className: "two", style: { left: "14%", top: "46%" } },
    { value: 4, className: "four", style: { left: "26%", top: "20%" } },
    { value: 6, className: "six", style: { left: "50%", top: "10%" } },
    { value: 8, className: "eight", style: { left: "70%", top: "20%" } },
    { value: 10, className: "ten", style: { left: "80%", top: "46%" } },
    { value: 12, className: "twelve", style: { left: "88%", top: "83%" } },
  ];
  
  useEffect(() => {
    const startDay =new Date(2023,11,5,14,50,50);
    const endDay =new Date(2023,11,5,15,10,50);
    const sunIcon = document.querySelector(".sun-icon-cont");
    
    const totalDuration = (endDay - startDay )* 1000; // Общая продолжительность дня в секундах
    const animationDuration = 1; // Продолжительность анимации в секундах
    
    const animateSun = () => {
      const currentTime = new Date();
      const secondsSinceMidnight =( currentTime - startDay) * 1000 ;
    
      const sunPosition = (secondsSinceMidnight / totalDuration) * 180;
      sunIcon.style.transform = `rotate(${sunPosition}deg)`;
    };
    
    const interval = setInterval(animateSun, animationDuration * 1000);
    
    return () => clearInterval(interval);
    
    }, []);
  return (
    <>
      <Header/>
      <div className="frame">
        <div className="main-weather">
          <div className="color-frame weather">
            <div className="weather-icon">
              <img id="weather-icon-image" src={sun_col} alt="Weather Icon" />
            </div>
            <div className="text temp-text" id="temp-now"></div>
            <div className="search-cont">
              <div className="color-frame-layers search">
                <input
                  id="searchCity"
                  type="text"
                  className="search_city"
                  placeholder="Поиск "
                  oninput="search(event.target.value)"
                ></input>
                <a className="search-button">
                  <i className="fas fa-search"></i>
                </a>
              </div>
            </div>
            <ul id="searchRes"></ul>
          </div>
          <div className="color-frame meta">
            <img className="icon-map" src={map_pin} />
            <div className="text geo-text" id="geo-now"></div>
            <img className="icon-date" src={date} />
            <div className="text date-text" id="date-now"></div>
          </div>
        </div>
        <div className="color-frame main-other">
          <div className="text day-text">Сегодня</div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">Ветер</div>
              <div className="text wind_speed-text" id="wind_speed-now"></div>
              <div className="compas-cont">
              <img className="compas" src={compas} alt="Compas Icon" />
              <img className="compas-arrow" src={arrow} alt="Arrow Icon" />
              </div>
            </div>
            <div className="color-frame-layers litle-param">
              <div className="text litle-param-text">Влажность</div>
              <div className="icon dop-i">
                <img src={drop} alt="Humidity Icon" />
              </div>
              <div className="text number-text" id="wet-now"></div>
              <div
                className="text litle-param-dop-text"
                id="dewPoint-now"
              ></div>
            </div>
          </div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">UV индекс</div>
              <div className="text uv-text" id="uv-now"></div>
              <div className="icon-diagram">
                <img src="icon/diagram.svg" alt="UV Index Diagram" />
                <div className="num-diagram">
                  {uvIndexValues.map((item, index) => (
                    <div
                      key={index}
                      className={`text ${item.className}`}
                      style={item.style}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="color-frame-layers litle-param">
              <div className="text litle-param-text">Видимость</div>
              <div className="icon dop-i">
                <img src={eye} alt="Visibility Icon" />
              </div>
              <div className="text number-text" id="visi-now"></div>
            </div>
          </div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">Восход & Заход</div>
              <div className="icon sunrise">
                <img src={sunrise} alt="Sunrise Icon" />
              </div>
              <div className="sun-text vos">Восход</div>
              <div className="text sunrise-text" id="sunrise-now"></div>
              <div className="icon sunset">
                <img src={sunset} alt="Sunset Icon" />
              </div>
              <div className="sun-text zah">Заход</div>
              <div className="text sunset-text" id="sunset-now"></div>
              <div className="icon-sunline">
                <div className="sun-icon-cont">
                <img src={sun} className="sun-icon" alt="Sun Icon" /></div>
                <img src={sun_line} alt="Line Icon" />
              </div>
            </div>
            <div className="color-frame-layers litle-param">
              <div className="text litle-param-text">Ощущается как</div>
              <div className="icon degress">
                <img src={degress} alt="Degrees Icon" />
              </div>
              <div className="text litle-param-dop-text" id="feel-now"></div>
            </div>
          </div>
        </div>
        <div className="days-weather-container">
          <div className="text days-text">5 дней</div>
          <div className="color-frame days-weather"></div>
        </div>
        <div className="hour-weather-container">
          <div className="text hour-text">Почасовая погода</div>
          <div className="color-frame param">
            <div className="color-frame-layers lit-param">
              <div className="text time">12:00</div>
              <img src={sun_col} alt="Weather Icon" />
              <div className="text temp">+26°C</div>
              <img className="sun-col" src={sun_col} alt="Weather Icon" />
              <div className="text speedWindy">7.90 km/h</div>
            </div>
            <div className="color-frame-layers lit-param"></div>
            <div className="color-frame-layers lit-param"></div>
            <div className="color-frame-layers lit-param"></div>
            <div className="color-frame-layers lit-param"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainWeather;
