import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message transmitted to Cinema Flux headquarters!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="full-page-contact">
      <div className="contact-page fade-in hologram-effect">
        <h1>CONTACT CINEMA FLUX</h1>
        <p className="contact-intro">
          Ready to connect with the future of cinema? Send us a transmission 
          through our quantum communication channel.
        </p>
        
        <div className="contact-methods">
          <div className="contact-method glass-card">
            <h3>📡 Quantum Email</h3>
            <p>contact@cinemaflux.space</p>
          </div>
          <div className="contact-method glass-card">
            <h3>🌐 Neural Network</h3>
            <p>Connect via our AI interface below</p>
          </div>
          <div className="contact-method glass-card">
            <h3>🚀 Mission Control</h3>
            <p>Available 24/7 across all dimensions</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Transmission</h3>
          <input
            type="text"
            name="name"
            placeholder="Your designation..."
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your quantum address..."
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message to the cosmos..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            TRANSMIT MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;