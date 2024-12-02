import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="/">Instagram</a></li>
            <li><a href="/products">LinkedIn</a></li>
            <li><a href="/about">Twitter</a></li>
            <li><a href="/contact">Facebook</a></li>
          </ul>
          <div className="footer-social">
            <a href="https://facebook.com" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section footer-contact-info">
          <h4>Contact Info</h4>
          <p>Email: s-amin.mohamed@markethub.com</p>
          <p>Phone: +20 1121056300</p>
          <p>Address: Zewail City for Science and Technology</p>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-section footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for updates on new products and offers!</p>
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MarketHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
