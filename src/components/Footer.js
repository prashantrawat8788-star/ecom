import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">🛍 ShopReact</span>
          <p className="footer-tagline">Your one-stop React-powered store.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📧 support@shopreact.in</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Chennai, Tamil Nadu</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopReact. Built with React ⚛️</p>
      </div>
    </footer>
  );
}

export default Footer;
