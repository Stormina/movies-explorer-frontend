import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {

  const location = useLocation();

  return (
    <header className={ location.pathname === "/" ? "header_theme_green" : "header" }>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
}

export default Header;