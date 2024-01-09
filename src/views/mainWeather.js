import React, {useEffect, useState, useRef} from "react";
import moment from 'moment';
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement, DoughnutController} from "chart.js/auto";
import axios from "axios";
import Header from "./header";

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

import DaysWeatherContainer from "./daysWeatherContainer";
import HourWeatherContainer from "./hourWeatherContainer";
import CompasContainer from "./compas";

Chart.register(ArcElement, DoughnutController);
const UvDi = ({uvIndex}) => {
    const data = {
        labels: [
            "UVIndex", "Категория 1"
        ],
        datasets: [
            {
                data: [
                    uvIndex, 12 - uvIndex
                ],
                backgroundColor: [
                    "blue", "grey"
                ],
                borderWidth: 0
            }
        ]
    };
    const options = {
        layout: {
            padding: 10
        },
        plugins: {
            legend: false,
            datalabels: {
                display: false
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        rotation: -90,
        cutoutPercentage: 40,
        circumference: 180
    };

    return <Doughnut data={data} options={options}/>;
};

const MainWeather = () => {
    const [weatherData,
        setWeatherData] = useState([
        {
            "temperaturC": 0
        }
    ]);
    const [citysRegions,
        setCitysRegions] = useState([]);
    const [visibleCitys,
        setVisibleCitys] = useState([]);
    const [city,
        setCity] = useState("Пермь");
    const [region,
        setRegion] = useState("Пермский край");
    const [dateString,
        setDate] = useState("");
    const sunIconRef = useRef(null);

    useEffect(() => {
        const getPosition = () => {
            return new Promise((resolve, reject) => {
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                  (position) => resolve(position),
                  (error) => reject(error)
                );
              } else {
                reject(new Error("Geolocation is not available"));
              }
            });
          };
        const fetchData = async() => {
            try {
                const citysRegions = await axios.get('https://localhost:7024/City', {
                    withCredentials: true,});
                setCitysRegions(citysRegions.data);
                const sesCity = sessionStorage.getItem("city");
                const sesRegion = sessionStorage.getItem("region");

                // Declare variables with let for better scoping
                let city,
                    regionName;

                if (sesCity && sesRegion) {
                    // If available in sessionStorage, use stored values
                    city = sesCity;
                    regionName = sesRegion;
                } else {
                    const position = await getPosition();
                    console.log(position);
                    const { latitude, longitude } = position.coords;
                  
                    const reverseGeocodingResponse = await axios.get(
                      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const address = reverseGeocodingResponse.data.address;
                    const city = address.city || address.town || address.village || address.hamlet;
                    const regionName = address.state || address.county;
                    sessionStorage.setItem("city", city);
                    sessionStorage.setItem("region", regionName);
                }
                setCity(city);
                setRegion(regionName);
                const formattedDate = moment().format('YYYY-MM-DD');
                setDate(moment().format('YYYY-MM-DD hh:mm:ss'));

                const weatherResponse = await axios.get(`https://localhost:7024/WeatherDay?Day=${formattedDate}&City=${city}&Region=${regionName}`, {
                    withCredentials: true,});
                console.log(weatherResponse.data);
                setWeatherData(weatherResponse.data);

                const startDay = new Date();
                const endDay = new Date();
                const {sunrise, sunset} = weatherResponse.data[0];

                const [hoursS,
                    minutesS,
                    secondsS] = sunrise
                    .split(':')
                    .map(Number);
                const [hoursE,
                    minutesE,
                    secondsE] = sunset
                    .split(':')
                    .map(Number);

                startDay.setHours(hoursS, minutesS, secondsS);
                endDay.setHours(hoursE, minutesE, secondsE);

                const totalDuration = (endDay - startDay) * 1000;
                const animationDuration = 1;

                const animateSun = () => {
                    try{
                        const elem = document.getElementById("icon_anim");
                    const currentTime = new Date();
                    const secondsSinceMidnight = (currentTime - startDay) * 1000;
                    const sunPosition = (secondsSinceMidnight / totalDuration) * 180;
                    elem.style.transform = `rotate(${sunPosition}deg)`;
                    setDate(moment().format('YYYY-MM-DD hh:mm:ss'));}
                    catch{
                      
                    }
                };

                const intervalId = setInterval(animateSun, animationDuration * 1000);

                // Cleanup function to clear the interval when the component unmounts
                return () => clearInterval(intervalId);
            } catch (error) {
                setWeatherData([
                    {
                        temperatureC: -5,
                        temperatureF: 24,
                        precipitation: 0.5,
                        typeWind: 'NE',
                        speedWind: 10,
                        uvIndex: 2,
                        visibility: 10,
                        sunrise: '08:30:00',
                        sunset: '20:30:00',
                        dewPoint: -25,
                        visi_state: 'совершенно неясно',
                        weatherSensation: 'Холодно: очень низкая температура'
                    }
                ]);
                console.error('Ошибка при получении геолокации или отправке запроса:', error);
            }
        };

        fetchData();
    }, [city]);
    const search = (value) => {

        setVisibleCitys(citysRegions.filter((valueCity) => {
            const cityWithRegion = `${valueCity.region} ${valueCity.city}`;
            return cityWithRegion
                .toLowerCase()
                .includes(`${value}`.toLowerCase());
        }))
    };
    return ( <> <Header/> < div className = "frame" > <div className="main-weather">
        <div className="color-frame weather">
            <div className="weather-icon">
                <img id="weather-icon-image" src={sun_col} alt="Weather Icon"/>
            </div>
            <div className="text temp-text" id="temp-now">
                {weatherData[0]["temperatureC"]}
            </div>
            <div className="search-cont">
                <div className="color-frame-layers search">
                    <input
                        id="searchCity"
                        type="text"
                        className="search_city"
                        placeholder="Поиск "
                        onInput={(event) => search(event.target.value)}></input>
                    <div className="search-button">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <ul>
                    {visibleCitys.map((value) => {
                        return <li
                            onClick={() => {
                            setCity(value.city);
                            setRegion(value.region);
                            sessionStorage.setItem("city", value.city);
                            sessionStorage.setItem("region", value.region);
                        }}>
                            <span>{value.region}:</span>
                            {value.city}</li>
                    })}
                </ul>
            </div>
            <ul id="searchRes"></ul>
        </div>
        <ul className="color-frame meta">
            <li></li>
            <li>
                <img alt="map" className="icon-map" src={map_pin}/>
                <div className="text geo-text" id="geo-now">
                    {city}
                </div>
            </li>
            <li>
                <img alt="date" className="icon-date" src={date}/>
                <div className="text date-text" id="date-now">{dateString}</div>
            </li>
        </ul>
    </div> < div className = "color-frame main-other" > <div className="weather-param">
        <div className="text day-text">Сегодня</div>
        <div className="color-frame-layers big-param">
            <div className="text big-param-text">Ветер</div>
            <div className="text wind_speed-text" id="wind_speed-now">
                {weatherData[0]["speedWind"]}
            </div>
            <CompasContainer typeWind={weatherData[0]["typeWind"]}/>
        </div>
        <div className="color-frame-layers litle-param">
            <div className="text litle-param-text">Влажность</div>
            <div className="litle-param-down-cont">
                <div className="text number-text" id="wet-now">
                    {weatherData[0]["precipitation"]}%
                </div>

                <div className=" dop-i">
                    <img className="icon-flex" src={drop} alt="Humidity Icon"/>
                    <div className="text litle-param-dop-text " id="dewPoint-now">
                        Точка росы: {weatherData[0]["dewPoint"]}
                    </div>
                </div>

            </div>
        </div>
    </div> < div className = "weather-param" > <div className="color-frame-layers big-param">
        <div className="text big-param-text">UV индекс</div>
        <div className="text uv-text" id="uv-now">
            {weatherData[0]["uvIndex"]}
        </div>
        <div className="icon-diagram">
            <UvDi uvIndex={weatherData[0]["uvIndex"]}/>
        </div>
    </div> < div className = "color-frame-layers litle-param" > <div className="text litle-param-text">Видимость</div> < div className = "litle-param-down-cont" > <div className="text number-text" id="visi-now">
        {weatherData[0]["visibility"]}
        km
    </div> < div className = " dop-i" > <img src={eye} alt="Visibility Icon"/> < div className = "text litle-param-dop-text" id = "visi_state" > Сейчас {weatherData[0]["visi_state"]
    } </div>
                </div > </div> </div>
          </div > <div className="weather-param">
        <div className="color-frame-layers big-param">
            <div className="text big-param-text">Восход & Заход</div>
            <div className="icon sunrise">
                <img src={sunrise} alt="Sunrise Icon"/>
                <div className="sun-text vos">Восход</div>
                <div className="text sunrise-text" id="sunrise-now">
                    {weatherData[0]["sunrise"]}
                </div>
            </div>

            <div className="icon sunset">
                <img src={sunset} alt="Sunset Icon"/>
                <div className="sun-text zah">Заход</div>
                <div className="text sunset-text" id="sunset-now">
                    {weatherData[0]["sunset"]}
                </div>
            </div>

            <div className="icon-sunline">
                <div className="sun-icon-cont" id="icon_anim" ref={sunIconRef}>
                    <img src={sun} className="sun-icon" alt="Sun Icon"/>
                </div>
                <img src={sun_line} alt="Line Icon"/>
            </div>
        </div>
        <div className="color-frame-layers litle-param">
            <div className="text litle-param-text">Ощущается как</div>
            <div className="litle-param-down-cont">
                <div className=" degress">
                    <img src={degress} alt="Degrees Icon"/>
                    <div className="text number-text" id="feel-now">
                        {weatherData[0]["temperatureC"]}
                    </div>
                </div>

                <div className="text litle-param-dop-text" id="weatherSensation">
                    {weatherData[0]["weatherSensation"]}
                </div>
            </div>
        </div>
    </div> </div>
       <DaysWeatherContainer city={{city}} region={{region}}/ > <div className="hour-weather-container">
        <div className="text hour-text">Почасовая погода</div >
        <div className="color-frame hour-placer">
            <HourWeatherContainer
                city={{
                city
            }}
                region={{
                region
            }}/>
        </div>
    </div> </div > </ >);
};
export default MainWeather;
