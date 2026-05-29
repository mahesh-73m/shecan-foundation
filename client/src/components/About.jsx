import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';


const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-icon">🌸</div>
        <h1>About She Can Foundation</h1>
        <p>
          Empowering women and girls to achieve their full potential through 
          education, skills training, and community support.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2><span>🎯</span> Our Mission</h2>
        <p>
          She Can Foundation is dedicated to empowering women and girls by providing 
          access to quality education, vocational training, and mentorship programs. 
          We believe that when you invest in a woman, you invest in an entire community.
        </p>
        
        <div className="mission-cards">
          <div className="mission-card">
            <div className="card-icon">📚</div>
            <h3>Education</h3>
            <p>Providing access to quality education for girls in underserved communities.</p>
          </div>
          
          <div className="mission-card">
            <div className="card-icon">💼</div>
            <h3>Skills Training</h3>
            <p>Vocational training and career guidance to help women become financially independent.</p>
          </div>
          
          <div className="mission-card">
            <div className="card-icon">🤝</div>
            <h3>Mentorship</h3>
            <p>Connecting women with successful mentors to guide their personal and professional growth.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">5000+</div>
          <div className="stat-label">Women Empowered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">120+</div>
          <div className="stat-label">Schools Supported</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Community Partners</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">25</div>
          <div className="stat-label">Cities Covered</div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            She Can Foundation was founded in 2020 with a simple belief: every woman 
            deserves the opportunity to succeed. What started as a small initiative 
            to provide school supplies to girls in rural areas has grown into a 
            comprehensive program supporting women at every stage of their journey.
          </p>
          <p>
            Over the years, we've expanded our reach to include scholarships, 
            entrepreneurship programs, and leadership training. Our volunteers and 
            supporters from around the world are united by a common goal - creating a 
            world where no woman is held back by lack of resources or opportunities.
          </p>
        </div>
        <div className="story-image">
          <div className="image-placeholder">🌸</div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">❤️</div>
            <div>
              <h3>Compassion</h3>
              <p>We approach every interaction with empathy and understanding.</p>
            </div>
          </div>
          
          <div className="value-item">
            <div className="value-icon">💪</div>
            <div>
              <h3>Empowerment</h3>
              <p>We believe in building confidence and capabilities, not just providing aid.</p>
            </div>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🎯</div>
            <div>
              <h3>Excellence</h3>
              <p>We strive for the highest standards in everything we do.</p>
            </div>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <div>
              <h3>Collaboration</h3>
              <p>We believe in the power of working together to create lasting change.</p>
            </div>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🔍</div>
            <div>
              <h3>Transparency</h3>
              <p>We are committed to openness and accountability in our operations.</p>
            </div>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🚀</div>
            <div>
              <h3>Innovation</h3>
              <p>We embrace new ideas and creative solutions to challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-img">👩‍💼</div>
            <h3>Sarah Johnson</h3>
            <p>Founder & CEO</p>
          </div>
          
          <div className="team-member">
            <div className="member-img">👩‍💻</div>
            <h3>Emily Chen</h3>
            <p>Program Director</p>
          </div>
          
          <div className="team-member">
            <div className="member-img">👨‍💼</div>
            <h3>Michael Brown</h3>
            <p>Operations Manager</p>
          </div>
          
          <div className="team-member">
            <div className="member-img">👩‍🎓</div>
            <h3>Priya Patel</h3>
            <p>Education Lead</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Mission</h2>
        <p>
          Together, we can create more opportunities for women and girls. 
          Whether you volunteer, donate, or spread the word, your contribution matters.
        </p>
        <Link to="/contact" className="cta-btn">Get Involved</Link>
      </section>
    </div>
  );
};

export default About;