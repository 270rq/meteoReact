import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, DoughnutController } from "chart.js";
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
import axios from "axios";
const MainWeather = () => {
  const [data, setData] = useState([[]]);
  Chart.register(ArcElement, DoughnutController);
  const search = (query)=>{
    console.log(query);
  };
  useEffect( () => {
    async function getGeoLocation() {
      try {
        const response = await axios.get("http://ip-api.com/json?lang=ru");
        const { city, regionName } = response.data;
        console.log("Город:", city);
        console.log("Регион:", regionName);

        const day = new Date();
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, "0");
        const date = String(day.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${date}`;
        const url = `https://localhost:7024/WeatherDay?Day=${formattedDate}&City=${city}&Region=${regionName}`;
        const weatherResponse = await axios.get(url);
        setData(weatherResponse.data);
        console.log(weatherResponse.data);
        const startDay = new Date();
        const endDay = new Date();
        const timeStartString = weatherResponse.data[0]["sunrise"];
        const [hoursS, minutesS, secondsS] = timeStartString.split(":").map(Number);
        const timeEndString = weatherResponse.data[0]["sunset"];
        const [hoursE, minutesE, secondsE] = timeEndString.split(":").map(Number);
        startDay.setHours(hoursS);
        startDay.setMinutes(minutesS);
        startDay.setSeconds(secondsS);
        endDay.setHours(hoursE);
        endDay.setMinutes(minutesE);
        endDay.setSeconds(secondsE);
        const sunIcon = document.getElementById("icon_anim");
        console.log(sunIcon)
        const totalDuration = (endDay - startDay) * 1000; // Общая продолжительность дня в секундах
        const animationDuration = 1; // Продолжительность анимации в секундах
      
        const animateSun = () => {
          const currentTime = new Date();
          const secondsSinceMidnight = (currentTime - startDay) * 1000;
      
          const sunPosition = (secondsSinceMidnight / totalDuration) * 180;
          sunIcon.style.transform = `rotate(${sunPosition}deg)`;
        };
      
        const interval = setInterval(animateSun, animationDuration * 1000);
        return weatherResponse.data;
      } catch (error) {
        setData([
          {
            "temperatureC": -5,
            "temperatureF": 24,
            "precipitation": 0.5,
            "typeWind": "NE",
            "speedWind": 10,
            "uvIndex": 2,
            "visibility": 10,
            "sunrise": "08:30:00",
            "sunset": "16:30:00",
            "dewPoint": -25,
            "visi_state": "совершенно неясно",
            "weatherSensation": "Холодно: очень низкая температура"
          }
        ])
        console.error(
          "Ошибка при получении геолокации или отправке запроса:",
          error
        );
      }
    }
    getGeoLocation().then();

  }, []);
  const UvDi = ({ uvIndex }) => {
    const data = {
      labels: ["UVIndex", "Категория 1"],
      datasets: [
        {
          data: [uvIndex, 12 - uvIndex],
          backgroundColor: ["blue", "grey"],
          borderWidth: 0,
        },
      ],
    };
    const options = {
      layout: {
        padding: 10,
        
      },
      plugins: {
        legend: false,
        datalabels: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      rotation: -90,
      cutoutPercentage: 40,
      circumference: 180,
    };

    return <Doughnut data={data} options={options} />;
  };
  return (
    <>
      <Header />
      <div className="frame">
        <div className="main-weather">
          <div className="color-frame weather">
            <div className="weather-icon">
              <img id="weather-icon-image" src={sun_col} alt="Weather Icon" />
            </div>
            <div className="text temp-text" id="temp-now">
              {data[0]["temperatureC"]}
            </div>
            <div className="search-cont">
              <div className="color-frame-layers search">
                <input
                  id="searchCity"
                  type="text"
                  className="search_city"
                  placeholder="Поиск "
                  onInput={(event) =>search(event.target.value)}
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
            <div className="text geo-text" id="geo-now">
              {}
            </div>
            <img className="icon-date" src={date} />
            <div className="text date-text" id="date-now"></div>
          </div>
        </div>
        <div className="color-frame main-other">
          <div className="text day-text">Сегодня</div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">Ветер</div>
              <div className="text wind_speed-text" id="wind_speed-now">
                {data[0]["speedWind"]}
              </div>
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
              <div className="text number-text" id="wet-now">
                {data[0]["precipitation"]}
              </div>
              <div className="text litle-param-dop-text" id="dewPoint-now">Точка росы: {data[0]["dewPoint"]}</div>
            </div>
          </div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">UV индекс</div>
              <div className="text uv-text" id="uv-now">
                {data[0]["uvIndex"]}
              </div>
              <div className="icon-diagram">
                <UvDi uvIndex={data[0]["uvIndex"]} />
                
              </div>
            </div>
            <div className="color-frame-layers litle-param">
              <div className="text litle-param-text">Видимость</div>
              <div className="icon dop-i">
                <img src={eye} alt="Visibility Icon" />
              </div>
              <div className="text number-text" id="visi-now">{data[0]["visibility"]}</div>
              <div className="text litle-param-dop-text" id="visi_state">Сейчас {data[0]["visi_state"]}</div>
            </div>
          </div>
          <div className="weather-param">
            <div className="color-frame-layers big-param">
              <div className="text big-param-text">Восход & Заход</div>
              <div className="icon sunrise">
                <img src={sunrise} alt="Sunrise Icon" />
              </div>
              <div className="sun-text vos">Восход</div>
              <div className="text sunrise-text" id="sunrise-now">{data[0]["sunrise"]}</div>
              <div className="icon sunset">
                <img src={sunset} alt="Sunset Icon" />
              </div>
              <div className="sun-text zah">Заход</div>
              <div className="text sunset-text" id="sunset-now">{data[0]["sunset"]}</div>
              <div className="icon-sunline">
                <div className="sun-icon-cont" id="icon_anim">
                  <img src={sun} className="sun-icon" alt="Sun Icon" />
                </div>
                <img src={sun_line} alt="Line Icon" />
              </div>
            </div>
            <div className="color-frame-layers litle-param">
              <div className="text litle-param-text">Ощущается как</div>
              <div className="icon degress">
                <img src={degress} alt="Degrees Icon" />
              </div>
              <div className="text litle-param-dop-text" id="feel-now">{data[0]["temperatureC"]}</div>
              <div className="text litle-param-dop-text" id="weatherSensation">{data[0]["weatherSensation"]}</div>
            </div>
          </div>
        </div>
        <div className="days-weather-container">
          <div className="text days-text">5 дней</div>
          <div className="color-frame days-weather">
            <div className="week-weather">
            <div className="one-day">
            <img className="icon-weather" src={sun_col} alt="Weather Icon" />
            <div className="text days-temp">29/17</div>
            <div className="text date">13 сентября</div>
            <div className="text week-day">Вторник</div>
            </div>
            </div>
          </div>
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
