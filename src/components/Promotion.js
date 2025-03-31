import React, { useState } from 'react';
import '../App.css';

const Promotion = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const doSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch('https://blog-backend-1-vx3l.onrender.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Subscription successful! Check your email.");
      } else {
        setMessage(data.error || 'Subscription failed!');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="promotion-section" id="subscribe">
      <div className="promotion-content">
        <h2 className="promotion-title">Never miss any stories!</h2>
        <p className="promotion-text">Stay Connected for More Blog Update</p>
        <div className="align">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="promotion-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            className="promotion-button"
            onClick={doSubscribe}
          >
            Subscribe
          </button>
        </div>
        <p className="promotion-note">Subscribe for More Updates ✅</p>
        
        {message && 
          <p className={message.includes("successful") ? "promotion-message" : "promotion-message-error"}>
            {message}
          </p>
        }
      </div>
    </div>
  );
};

export default Promotion;
