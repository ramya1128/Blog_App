import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="index-container">
        <h1 className="blog-title1">Blog !</h1>
        <h1 className="welcome-title">Welcome to A Vibrant Blog</h1>
        <p className="intro-text">Explore interesting blogs and share your thoughts!</p>
        <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
