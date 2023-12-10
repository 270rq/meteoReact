import React, { useEffect, useState } from 'react';
import profileIcon from './icon/profile.svg';
import Pollen from './pollen';
import Profile from './profile.js';
import root from '../index'
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('id'));
  const [isHeaderActive, setHeaderActive] = useState(false);
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
    root.render(<Pollen/>  )
  };

  const handleGoToProfilePage = () => {
    root.render(<Profile/>  )


  };

  return (
    <header onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={`side-header ${isHeaderActive ? 'active' : "" }`} id="header">
      {isLoggedIn ? (
        <div>
          <a href="profile.js" id="link">
            <img src={profileIcon} className="icon-profile" alt="Profile" />
          </a>
          <button onClick={handleLogout}>Выход</button>
        </div>
      ) : (
        <a  id="link">
          <button className="profile-button" onClick={handleGoToProfilePage}>
            <img src={profileIcon} className="icon-profile" alt="Profile" />
          </button>
        </a>
      )}
      <button onClick={handleGoToPollenPage}>Go to Pollen Page</button>
    </header>
  );
};

export default Header;