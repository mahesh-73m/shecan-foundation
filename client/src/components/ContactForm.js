import React, { useState } from 'react';
import API from '../api/axios';
import '../App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate email
  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await API.post('/contacts', formData);
      
      if (response.data.success) {
        setIsSuccess(true);
        console.log('Form submitted:', response.data.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🌸 She Can Foundation</h1>
        <p>Empowering women, building futures</p>
      </div>

      {/* Form or Success Message */}
      {!isSuccess ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <span className="error-message">{errors.name}</span>
            </div>

            {/* Email Field */}
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              <span className="error-message">{errors.email}</span>
            </div>

            {/* Message Field */}
            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              />
              <span className="error-message">{errors.message}</span>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="error-message" style={{ display: 'block', marginBottom: '15px', textAlign: 'center' }}>
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Success Message */
        <div className="success-message show">
          <div className="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2>Form Submitted Successfully!</h2>
          <p>
            Thank you for reaching out to She Can Foundation.<br />
            We'll get back to you soon.
          </p>
          <button className="reset-btn" onClick={resetForm}>
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;