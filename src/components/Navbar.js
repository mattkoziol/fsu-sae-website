// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!storedUser;

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={handleNavLinkClick}>ΣAE FSU</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isNavOpen} aria-label="Toggle navigation" onClick={handleNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/" onClick={handleNavLinkClick}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about" onClick={handleNavLinkClick}>About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/philanthropy" onClick={handleNavLinkClick}>Philanthropy</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/highlights" onClick={handleNavLinkClick}>Highlights</Link></li>
            {/* {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/merch" onClick={handleNavLinkClick}>Merch</Link>
              </li>
            )} */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Members</span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/members/active" onClick={handleNavLinkClick}>Active Members</Link></li>
                <li><Link className="dropdown-item" to="/members/alumni" onClick={handleNavLinkClick}>Alumni</Link></li>
                <li><Link className="dropdown-item" to="/members/exec" onClick={handleNavLinkClick}>Executive Board</Link></li>
                {isLoggedIn ? (
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                  </li>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login" onClick={handleNavLinkClick}>Login or Signup</Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
