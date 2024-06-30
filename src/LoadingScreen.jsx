import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-octagon">
        <svg viewBox="0 0 100 100" className="octagon-svg">
          <polygon points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30" className="octagon-shape" />
        </svg>
        <div className="ufc-logo">UFC</div>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
      <p className="loading-text">LOADING</p>
    </div>
  );
};

export default LoadingScreen;