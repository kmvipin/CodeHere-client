import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div>
        <footer className="section">
        <p>&copy; 2023 CodeHere</p>
        <ul className="social-links">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
          {/* Add more social media links if available */}
        </ul>
        <p>Vipin | Sumit</p>
      </footer>
    </div>
  )
}

export default Footer