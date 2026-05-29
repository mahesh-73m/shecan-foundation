import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      await API.post('/contacts', formData);
      setIsSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">🌸</div>
          <h1>She Can Foundation</h1>
          <p>
            Empowering women and girls to achieve their full potential through 
            education, skills training, and community support.
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="hero-btn hero-btn-primary">
              Learn More
            </Link>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="section-title">
          <h2>What We Do</h2>
          <p>We are dedicated to creating opportunities for women and girls through education and empowerment.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Education</h3>
            <p>Providing access to quality education for girls in underserved communities.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Skills Training</h3>
            <p>Vocational training and career guidance to help women become financially independent.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Mentorship</h3>
            <p>Connecting women with successful mentors to guide their journey.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-wrapper">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2> <br></br>
            <p>
              Have questions or want to get involved? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="item-icon">📍</div>
                <div className="item-text">
                  <h4>Location</h4>
                  <p>New York, USA</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">📧</div>
                <div className="item-text">
                  <h4>Email</h4>
                  <p>president@shecanfoundation.org</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">📱</div>
                <div className="item-text">
                  <h4>Phone</h4>
                  <p>+91- 8283841830</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            {!isSuccess ? (
              <>
                <div className="form-header">
                  <h3>Send us a Message</h3>
                  <p> We'd love to hear from you</p>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  {errors.submit && (
                    <div className="error-message" style={{ display: 'block', marginBottom: '15px', color: '#ef4444', textAlign: 'center' }}>
                      {errors.submit}
                    </div>
                  )}

                  <div className={`form-group ${errors.name ? 'error' : ''}`}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    <span className="error-message">{errors.name}</span>
                  </div>

                  <div className={`form-group ${errors.email ? 'error' : ''}`}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                    <span className="error-message">{errors.email}</span>
                  </div>

                  <div className={`form-group ${errors.message ? 'error' : ''}`}>
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                    />
                    <span className="error-message">{errors.message}</span>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="success-message show">
                <div className="success-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3>Form Submitted Successfully!</h3>
                <p>Thank you for reaching out to She Can Foundation.<br/>We'll get back to you soon.</p>
                <button className="reset-btn" onClick={resetForm}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Mission</h2>
        <p>Together, we can create more opportunities for women and girls.</p>
        <Link to="/contact" className="cta-btn">
          Get Involved
        </Link>
      </section>
    </div>
  );
};

export default Home;