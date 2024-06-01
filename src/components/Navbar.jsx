/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  FaTwitter, FaFacebookF, FaInstagramSquare, FaYoutube, FaLinkedin, FaRegCopyright,
} from 'react-icons/fa';

const Navbar = () => {
  const [view, setView] = useState('view');

  const handleView = () => {
    setView(view === '' ? 'view' : '');
  };

  /* Catch current URL */
  const params = useLocation();
  const pathView = params.pathname;

  const handleLogout = () => {
    localStorage.setItem('user', JSON.stringify(''));
  };

  const storedUser = JSON.parse(localStorage.getItem('user')) || '';

  return (
    <div className="navContainer">
      <GiHamburgerMenu onClick={handleView} className="hamView" data-testid="GiHamburgerMenu" />

      <div className={`${view} viewContainer`} data-testid="viewContainer">
        <p className="viewDoctors">Doctors</p>
        <p className="navWelcome">
          Welcome
          {' '}
          {storedUser.username}
        </p>
        <Link to="/home" onClick={handleView}><p className={pathView === '/home' ? 'select' : ''}>Home</p></Link>
        <Link to="/myreservations" onClick={handleView}><p className={pathView === '/myreservations' ? 'select' : ''}>My reservation</p></Link>
        <Link to="/add" onClick={handleView}><p className={pathView === '/add' ? 'select' : ''}>Add doctor</p></Link>
        <Link to="/delete" onClick={handleView}><p className={pathView === '/delete' ? 'select' : ''}>Delete doctor</p></Link>
        <a href="/" onClick={handleLogout}><p className="logout">Log out</p></a>
      </div>

      <div className="socialContainer">
        <div className="socialIcons">
          <FaTwitter />
          <FaFacebookF />
          <FaInstagramSquare />
          <FaYoutube />
          <FaLinkedin />
        </div>
        <p>
          <FaRegCopyright />
          2023 Doctors SAC
        </p>
      </div>

    </div>
  );
};

export default Navbar;
