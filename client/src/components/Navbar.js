import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="nav-brand">
        <Link to="/">
          <span className="logo-icon">🌸</span>
          <span className="brand-text">She Can Foundation</span>
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        {user ? (
          <>
            <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
              Admin Panel
            </Link>
            <div className="nav-user">
              <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span>{user.name}</span>
            </div>
            <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-btn nav-btn-login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;