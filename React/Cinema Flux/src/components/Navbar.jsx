import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const favorites = useSelector((state) => state.favorites.items);
  return (
    <nav className="futuristic-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-text">CINEMA</span>
          <span className="brand-accent">FLUX</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon">🏠</span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon">ℹ️</span>
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon">📧</span>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon">♥</span>
              Favorites
              {favorites.length > 0 && (
                <span className="favorites-badge">{favorites.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
