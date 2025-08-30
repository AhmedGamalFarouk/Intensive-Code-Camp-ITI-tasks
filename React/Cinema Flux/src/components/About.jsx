import React from 'react';

function About() {
  return (
    <div className="about-page fade-in hologram-effect">
      <h1>ABOUT CINEMA FLUX</h1>
      <div className="about-content">
        <p>
          Welcome to <span className="text-glow">Cinema Flux</span> - the future of movie discovery. 
          We are a cutting-edge platform dedicated to bringing you the latest and greatest in cinema 
          through an immersive, futuristic experience.
        </p>
        <p>
          Our advanced algorithms scan the digital cosmos to curate the most compelling films, 
          from blockbuster spectacles to hidden indie gems. Experience cinema like never before 
          with our state-of-the-art interface designed for the modern movie enthusiast.
        </p>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <h3>🎬 Curated Selection</h3>
            <p>Hand-picked movies from across the universe of cinema</p>
          </div>
          <div className="feature-card glass-card">
            <h3>🚀 Futuristic UI</h3>
            <p>Experience movies through our next-generation interface</p>
          </div>
          <div className="feature-card glass-card">
            <h3>⭐ Smart Ratings</h3>
            <p>Advanced rating system with visual feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;