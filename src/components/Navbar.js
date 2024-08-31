import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you will create a CSS file for styling

const Navbar = () => {
  const today = new Date();
  const dateString = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })}`;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span className="navbar-date">{dateString}</span>
        <div className="navbar-title">
          <Link to="/" className="nav-link navbar-title-link">To Do List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
