
import React, { useState } from 'react';
import sun_col from './weather 3d/01_sunny_color.svg';
import map_pin from './icon/map-pin.svg';
import date from './icon/date.svg';
import drop from './icon/drop.svg';
import eye from './icon/eye.svg';
import sunrise from './icon/sunrise.svg';
import sunset from './icon/sunset.svg';
import line from './icon/Line 3.svg';
import degress from './icon/degress.svg';
import Header from './header';
const MainWeather = () => {
    const [temperature, setTemperature] = useState(0);

    const handleTemperatureUpdate = () => {
        // Логика для обновления температуры
    };

    return (<>
      <Header></Header>
        <div className='frame'>
          <div className="main-weather">
      <div className="weather">
        <div className="weather-icon">
          <img id="weather-icon-image" src={sun_col} alt="Weather Icon"/>
        </div>
        <div className="text temp-text" id="temp-now"></div>
        <div className="search">
          <input id="searchCity" type="text" className="search_city" placeholder="Поиск "
            oninput="search(event.target.value)"></input>
          <a className="search-button">
            <i className='fas fa-search'></i>
          </a>
        </div>
        <ul id="searchRes"></ul>
      </div>
      <div className="meta">
          <img className="icon-map" src={map_pin} />
        <div className="text geo-text" id="geo-now"></div>
          <img className="icon-date" src={date}/>
        <div className="text date-text" id="date-now"></div>
      </div>
    </div>
        <div className="main-other">
            <div className="text day-text">Сегодня</div>
            <div className="weather-param">
                <div className="big-param">
                    <div className="text big-param-text">Ветер</div>
                    <div className="text wind_speed-text" id="wind_speed-now"></div>
                </div>
                <div className="litle-param">
                    <div className="text litle-param-text">Влажность</div>
                    <div className="icon dop-i"><img src={drop} alt="Humidity Icon" /></div>
                    <div className="text number-text" id="wet-now"></div>
                    <div className="text litle-param-dop-text" id="dewPoint-now"></div>
                </div>
            </div>
            <div className="weather-param">
                <div className="big-param">
                    <div className="text big-param-text">UV индекс</div>
                    <div className="text uv-text" id="uv-now"></div>
                    <div className="icon-diagram">
                        <img src="icon/diagram.svg" alt="UV Index Diagram" />
                        <div className="text zero">0</div>
                        <div className="text two">2</div>
                        <div className="text four">4</div>
                        <div className="text six">6</div>
                        <div className="text eigth">8</div>
                        <div className="text ten">10</div>
                        <div className="text twelve">12</div>
                    </div>
                </div>
                <div className="litle-param">
                    <div className="text litle-param-text">Видимость</div>
                    <div className="icon dop-i"><img src={eye} alt="Visibility Icon" /></div>
                    <div className="text number-text" id="visi-now"></div>
                </div>
            </div>
            <div className="weather-param">
                <div className="big-param">
                    <div className="text big-param-text">Восход & Заход</div>
                    <div className="icon sunrise"><img src={sunrise} alt="Sunrise Icon" /></div>
                    <div className="sun-text vos">Восход</div>
                    <div className="text sunrise-text" id="sunrise-now"></div>
                    <div className="icon sunset"><img src={sunset} alt="Sunset Icon" /></div>
                    <div className="sun-text zah">Заход</div>
                    <div className="text sunset-text" id="sunset-now"></div>
                    <div className="icon-line"><img src={line} alt="Line Icon" /></div>
                </div>
                <div className="litle-param">
                    <div className="text litle-param-text">Ощущается как</div>
                    <div className="icon degress"><img src={degress} alt="Degrees Icon" /></div>
                    <div className="text litle-param-dop-text" id="feel-now"></div>
                </div>
            </div>
        </div><div className="days-weather-container">
                <div className="text days-text">5 дней</div>
                <div className="days-weather">
                </div>
            </div><div className="hour-weather-container">
                <div className="text hour-text">Почасовая погода</div>
                <div className="param">
                    <div className="lit-param">
                    <div className='text time'>12:00</div>
                      <img src={sun_col} alt="Weather Icon" />
                      <div className='text temp'>+26°C</div>
                      <img className="sun-col" src={sun_col} alt="Weather Icon" />
                      <div className='text speedWindy'>7.90 km/h</div>
                    </div>
                    <div className="lit-param"></div>
                    <div className="lit-param"></div>
                    <div className="lit-param"></div>
                    <div className="lit-param"></div>
                </div>
            </div>
        </div></>
    );
}
export default MainWeather;