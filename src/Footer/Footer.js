import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div>
        <footer className="section">
        <p>&copy; 2023 CodeHere</p>
        <ul className="social-links">
          <li><a href="mailto:vk783838@gmail.com">Gmail</a></li>
          <li><a href="https://www.linkedin.com/in/vipin-886bab25a/">LinkedIn</a></li>
          <li><a href="https://github.com/kmvipin">Github</a></li>
          {/* Add more social media links if available */}
        </ul>
        <p>Vipin | Sumit</p>
      </footer>
    </div>
  )
}

export default Footer