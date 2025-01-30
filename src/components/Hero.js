import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Create Your Wonderful Thoughts As Blogs ! 📝</h1>
      <p className="hero-subtitle">
        Join our community of dreamers, creators, and change-makers.
      </p>

      <div className="hero-actions">
        <Link to="/blogs/create" className="hero-btn hero-btn-primary">
          Start Writing
        </Link>
        <a href="/blogs" className="hero-btn hero-btn-secondary">
          Explore Stories
        </a>
      </div>
    </div>
  );
};

export default Hero;
