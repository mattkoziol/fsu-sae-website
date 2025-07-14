
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/alumni.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

function AlumniRsvpSection({ eventKey, user }) {
  const [names, setNames] = useState([]);
  const [hasRsvped, setHasRsvped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch RSVP list from backend (use full URL)
    fetch(`${API_BASE_URL}/api/alumni/rsvp-list?event=${eventKey}`)

      .then(res => res.json())
      .then(data => {
        setNames(data.names || []);
        setLoading(false);
        if (user && user.role === 'alumni') {
          setHasRsvped((data.names || []).includes(user.name));
        }
      });
  }, [eventKey, user]);

  const handleRsvp = async () => {
    await fetch(`${API_BASE_URL}/api/alumni/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event: eventKey, 
        email: user.email,
        name: user.name
      })
    });
    setHasRsvped(true);
    setNames([...names, user.name]);
  };

  const handleUnRsvp = async () => {
    await fetch(`${API_BASE_URL}/api/alumni/rsvp`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventKey, email: user.email })
    });
    setHasRsvped(false);
    setNames(names.filter(n => n !== user.name));
  };

  return (
    <section className="alumni-rsvp py-5 bg-white">
      <div className="container">
        <div className="animate-fade-in">
          <h2 className="section-header text-center mb-4">Miami vs FSU Tailgate RSVP</h2>
          <div className="text-center mb-4">
            {user && user.role === 'alumni' ? (
              hasRsvped ? (
                <button className="btn btn-royal-purple btn-lg hover-lift" onClick={handleUnRsvp}>
                  <i className="fas fa-times me-2"></i>Un-RSVP
                </button>
              ) : (
                <button className="btn btn-royal-purple btn-lg hover-lift" onClick={handleRsvp}>
                  <i className="fas fa-check me-2"></i>RSVP
                </button>
              )
            ) : (
              <Link to="/login" className="btn btn-royal-purple btn-lg hover-lift">
                <i className="fas fa-sign-in-alt me-2"></i>Log in as an Alumnus to RSVP
              </Link>
            )}
          </div>
          
          <div className="bg-gradient-light rounded p-4 shadow-sm">
            <h4 className="text-center mb-3 text-royal-purple">
              <i className="fas fa-users me-2 text-gold"></i>Who's Coming:
            </h4>
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary mb-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Loading RSVPs...</p>
              </div>
            ) : (
              <div className="text-center" style={{ maxWidth: 500, margin: '0 auto' }}>
                {names.length === 0 ? (
                  <p className="text-muted fs-5">
                    <i className="fas fa-calendar-plus me-2"></i>
                    No RSVPs yet. Be the first!
                  </p>
                ) : (
                  <ul className="list-unstyled">
                    {names.map((n, i) => (
                      <li key={i} className="py-2 px-3 mb-2 bg-white rounded shadow-sm">
                        <i className="fas fa-user me-2 text-gold"></i>
                        <span className="fw-semibold">{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const Alumni = () => {
  // Get user from localStorage (or your auth context)
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="bg-gradient-light min-vh-100">
      {/* Enhanced Page Header */}
      <div className="container pt-5 pb-4">
        <div className="animate-fade-in">
          <h1 className="section-header mb-3 text-start text-royal-purple">Alumni</h1>
          <p className="lead mb-4 text-start text-gold fs-4 fw-semibold">Once an SAE, Always an SAE</p>
        </div>
      </div>

      {/* Enhanced Alumni Welcome Section */}
      <section className="alumni-welcome py-5">
        <div className="container animate-fade-in-delay">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="section-header text-start mb-4">Welcome Back, Alumni Brothers</h2>
              {user && user.role === 'alumni' ? (
                <div className="alumni-welcome-user mb-4">
                  <h4 className="text-success mb-3">
                    <i className="fas fa-handshake me-2"></i>
                    Welcome Brother {user.name.split(' ')[0]}
                  </h4>
                  <Link to="/alumni-account" className="btn btn-outline-primary btn-lg hover-lift">
                    <i className="fas fa-cog me-2"></i>Account Settings
                  </Link>
                </div>
              ) : null}
              <p className="lead mb-4">Once an SAE, always an SAE. Our alumni network is the backbone of our chapter's success.</p>
              <p className="mb-4 lh-lg">We strive to maintain strong connections with our alumni brothers and encourage your continued involvement with the chapter. Whether you graduated last year or decades ago, you'll always have a home at the Florida State chapter of Sigma Alpha Epsilon.</p>
              {(!user || user.role !== 'alumni') && (
                <Link to="/login" className="btn btn-royal-purple btn-lg hover-lift">
                  <i className="fas fa-sign-in-alt me-2"></i>Alumni Login
                </Link>
              )}
            </div>
            <div className="col-md-6">
              <div className="position-relative">
                <img 
                  src="/images/AlumniPic.jpg" 
                  alt="Alumni Group" 
                  className="img-fluid rounded shadow-lg hover-lift" 
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-royal opacity-10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Upcoming Alumni Events Section */}
      <section className="alumni-events py-5 bg-gradient-light">
        <div className="container">
          <h2 className="section-header text-center mb-5 animate-fade-in">Upcoming Alumni Events</h2>
          <div className="row justify-content-center animate-fade-in-delay">
            <div className="col-md-8 col-lg-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-football-ball fa-3x text-gold"></i>
                  </div>
                  <h3 className="card-title text-royal-purple mb-3">Miami vs FSU Tailgate</h3>
                  <span className="badge bg-primary mb-3 px-3 py-2 fs-6">Fall 2024</span>
                  <p className="card-text lead mb-4">Join fellow alumni for an exciting tailgate before the Miami vs FSU football game. Connect with brothers, enjoy great food, and cheer on the Seminoles!</p>
                  <div className="bg-gradient-light rounded p-3">
                    <p className="text-muted mb-0 fw-semibold">
                      <i className="fas fa-info-circle me-2"></i>
                      RSVP below to let us know you're coming!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced RSVP Section */}
      <AlumniRsvpSection eventKey="miami-fsu-2024" user={user} />

      {/* Enhanced Alumni Giving Section */}
      <section className="alumni-giving py-5 bg-white">
        <div className="container">
          <div className="row align-items-center animate-fade-in">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="position-relative">
                <img 
                  src="/images/SAEHOUSEPHOTO.jpg" 
                  alt="Chapter House" 
                  className="img-fluid rounded shadow-lg hover-lift" 
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-royal opacity-10 rounded"></div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="section-header text-start mb-4">Support Our Chapter</h2>
              <p className="lead mb-4">Your support helps ensure that future generations of SAE brothers at FSU have the same meaningful experiences that you cherished during your time at the chapter.</p>
              
              <div className="bg-gradient-light rounded p-4 mb-4">
                <h4 className="text-royal-purple mb-3">
                  <i className="fas fa-bullseye me-2 text-gold"></i>
                  Current Initiatives:
                </h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-home me-2 text-gold"></i>
                    Chapter House Renovation Fund
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-graduation-cap me-2 text-gold"></i>
                    Academic Scholarship Fund
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-crown me-2 text-gold"></i>
                    Leadership Development Program
                  </li>
                </ul>
              </div>
              {/* Alumni Hiring Section */}
              <div className="bg-gradient-light rounded p-4 mb-4 mt-4">
                <h4 className="text-royal-purple mb-3">
                  <i className="fas fa-briefcase me-2 text-gold"></i>
                  Alumni: Interested in Hiring Our Brothers?
                </h4>
                <p className="mb-3 text-muted">Our chapter is proud to foster talented, driven, and professional young men ready to make an impact in the workforce. If you are an alumnus seeking to hire or mentor current members, explore our active member directory to connect with potential candidates.</p>
                <a
                  href="/members/active"
                  className="btn btn-royal-purple btn-lg px-5 py-3 hover-lift"
                >
                  <i className="fas fa-users me-2"></i>
                  View Our Active Member Directory
                </a>
              </div>
              
              <div className="d-flex flex-wrap gap-3">
                <a href="#" className="btn btn-royal-purple btn-lg hover-lift">
                  <i className="fas fa-heart me-2"></i>Make a Donation
                </a>
                <a href="#" className="btn btn-outline-primary btn-lg hover-lift">
                  <i className="fas fa-info-circle me-2"></i>Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Alumni Networking Section */}
      <section className="alumni-networking py-5 bg-gradient-light">
        <div className="container">
          <h2 className="section-header text-center mb-5 animate-fade-in">Stay Connected</h2>
          <div className="row g-4 animate-fade-in-delay">
            <div className="col-md-4">
              <div className="card h-100 text-center hover-lift">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <i className="fas fa-envelope fa-4x text-royal-purple"></i>
                  </div>
                  <h3 className="card-title text-royal-purple mb-3">Alumni Newsletter</h3>
                  <p className="card-text mb-4 lh-lg">Stay updated with chapter news, events, and alumni spotlights delivered straight to your inbox.</p>
                  <Link to="/#newsletter-signup-section" className="btn btn-royal-purple hover-lift">
                    <i className="fas fa-paper-plane me-2"></i>Subscribe
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center hover-lift">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <i className="fab fa-linkedin fa-4x text-royal-purple"></i>
                  </div>
                  <h3 className="card-title text-royal-purple mb-3">Alumni Directory</h3>
                  <p className="card-text mb-4 lh-lg">Connect with fellow alumni for networking and mentorship opportunities across all industries.</p>
                  <a 
                    href="https://www.linkedin.com/company/sigma-alpha-epsilon-florida-beta-chapter/posts/?feedView=all" 
                    className="btn btn-royal-purple hover-lift" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin me-2"></i>Join Directory
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center hover-lift">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <i className="fas fa-user-graduate fa-4x text-royal-purple"></i>
                  </div>
                  <h3 className="card-title text-royal-purple mb-3">Mentorship Program</h3>
                  <p className="card-text mb-4 lh-lg">Guide current undergraduates in their personal and professional development journey.</p>
                  <a href="#" className="btn btn-royal-purple hover-lift">
                    <i className="fas fa-handshake me-2"></i>Become a Mentor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="mb-0 fw-semibold">
                <i className="fas fa-copyright me-2"></i>
                2025 Sigma Alpha Epsilon - Florida State University
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Alumni;
