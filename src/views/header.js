import React, { useState } from 'react';
import profileIcon from './icon/profile.svg';
import ReactDOM from 'react-dom';
import Pollen from './pollen';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('id'));
  const [isHeaderActive, setHeaderActive] = useState(false)

  const handleMouseOver = () => {
    setHeaderActive(true);
  };

  const handleMouseLeave = () => {    
    setHeaderActive(false);

  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleGoToPollenPage = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Pollen />
      </React.StrictMode>,
      document.getElementById('root')
    );
  };


  return (
    <header onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={`side-header ${isHeaderActive ? 'active' : "" }`} id="header">
      {isLoggedIn ? (
        <div>
          <a href="profile.html" id="link">
            <img src={profileIcon} className="icon-profile" alt="Profile" />
          </a>
          <button onClick={handleLogout}>Выход</button>
        </div>
      ) : (
        <a href="sign_in.html" id="link">
          <button className="profile-button">
            <img src={profileIcon} className="icon-profile" alt="Profile" />
          </button>
        </a>
      )}
      <button onClick={handleGoToPollenPage}>Go to Pollen Page</button>
    </header>
  );
};

export default Header;