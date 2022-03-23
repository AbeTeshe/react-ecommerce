import React from 'react'
import "./footer.css";


const Footer = () => {
  return (
    <div className="footer">
        <p>&copy;{new Date().getFullYear()} Ecommerce, All rights Reserved.</p>
    </div>
  )
}

export default Footer;