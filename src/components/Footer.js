import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from react-icons
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2024 Shradhesh</p>
      <a href="https://github.com/Shradhesh71/todo" className="footer-github" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} className="logo"/>
      </a>
    </footer>
  );
};

export default Footer;
