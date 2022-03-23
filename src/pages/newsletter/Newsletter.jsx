import React from 'react'
import "./newsletter.css";


const Newsletter = () => {
  return (
    <div className="newsletter">
        <h1 className="newsletter-title">Join our newsletter and get 20% off</h1>
        <div className="newsletter-desc">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
          <div className="newsletter-input">
            <input type="text" placeholder="Enter Email" />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
    </div>
  )
}

export default Newsletter