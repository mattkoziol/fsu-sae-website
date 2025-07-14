
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/home.css';
import newsletterPreview from '../assets/newsletter/newsletter-preview.png';
import newsletter1 from '../assets/newsletter/newsletter1.png';
import newsletter2 from '../assets/newsletter/newsletter2.png';
import newsletter3 from '../assets/newsletter/newsletter3.png';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const newsletterImages = [
    {
      id: 1,
      preview: newsletterPreview,
      full: newsletter1,
      title: 'Newsletter Page 1'
    },
    {
      id: 2,
      full: newsletter2,
      title: 'Newsletter Page 2'
    },
    {
      id: 3,
      full: newsletter3,
      title: 'Newsletter Page 3'
    }
  ];

  useEffect(() => {
    if (location.hash === '#newsletter-signup-section') {
      const el = document.getElementById('newsletter-signup-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  const handleImageClick = () => {
    setSelectedImage(newsletterImages);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? newsletterImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === newsletterImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubscriptionStatus(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/newsletter/subscribe`, { email });
      setSubscriptionStatus({ type: 'success', message: response.data.message });
      setEmail('');
    } catch (error) {
      console.error('Subscription error details:', error.response || error);
      setSubscriptionStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error subscribing to newsletter. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="hero text-center py-5 animate-fade-in">
        <div className="hero-overlay"></div>
        <div className="container position-relative">
          <div className="hero-content">
            <h1 className="hero-title display-2 mb-3">
              <i className="fas fa-shield-alt me-3 text-gold"></i>
              Sigma Alpha Epsilon
            </h1>
            <h2 className="display-4 mb-3 text-royal-purple">Florida Beta Chapter</h2>
            <p className="lead fs-3 text-gold">Florida State University</p>
            <div className="hero-divider"></div>
          </div>
        </div>
      </header>

      <section className="newsletter-section py-5 bg-gradient-light animate-fade-in-delay" id="newsletter-signup-section">
        <div className="container">
          <div className="newsletter-content text-center mb-5">
            <h2 className="section-header display-5 mb-4">
              <i className="fas fa-envelope me-3 text-royal-purple"></i>
              Stay Connected with FSU SAE
            </h2>
            <p className="lead fs-5 text-muted lh-lg">Subscribe to our newsletter to receive updates about our latest projects, competitions, and team achievements.</p>
          </div>
          <div className="newsletter-form">
            <form id="newsletter-signup" onSubmit={handleSubscribe}>
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                  <div className="input-group mb-3 newsletter-input-group">
                    <span className="input-group-text bg-royal-purple text-white border-0">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg border-0 shadow-sm"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-royal-purple btn-lg px-5 py-3 hover-lift"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Subscribe Now
                      </>
                    )}
                  </button>
                  
                  {subscriptionStatus && (
                    <div className={`alert alert-${subscriptionStatus.type === 'success' ? 'success' : 'danger'} mt-3 animate-fade-in`}>
                      <i className={`fas ${subscriptionStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                      {subscriptionStatus.message}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="newsletter-section py-5">
        <div className="container">
          <div className="newsletter-content text-center mb-5">
            <h2 className="section-header display-5 mb-4">
              <i className="fas fa-newspaper me-3 text-royal-purple"></i>
              Latest Newsletter
            </h2>
            <p className="lead fs-5 text-muted">Check out our latest newsletter to stay updated with FSU SAE.</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card newsletter-card hover-lift">
                <div className="newsletter-image-container">
                  <img
                    src={newsletterImages[0].preview}
                    className="card-img-top newsletter-preview"
                    alt="Newsletter Preview"
                    onClick={handleImageClick}
                  />
                  <div className="newsletter-overlay">
                    <i className="fas fa-expand-alt fa-2x text-white"></i>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title text-royal-purple">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Spring 2025 Newsletter
                  </h5>
                  <p className="card-text text-muted">Click to view the full newsletter</p>
                  <button
                    className="btn btn-royal-purple hover-lift"
                    onClick={handleImageClick}
                  >
                    <i className="fas fa-eye me-2"></i>
                    View Full Newsletter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for full image view with carousel */}
      {selectedImage && (
        <div className="modal newsletter-modal animate-fade-in" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-royal-purple text-white">
                <h5 className="modal-title">
                  <i className="fas fa-newspaper me-2"></i>
                  Spring 2024 Newsletter
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center position-relative p-0">
                <button
                  className="btn btn-royal-purple position-absolute modal-nav-btn modal-nav-prev"
                  onClick={handlePrevious}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <img
                  src={selectedImage[currentImageIndex].full}
                  className="img-fluid newsletter-modal-image"
                  alt={selectedImage[currentImageIndex].title}
                />
                <button
                  className="btn btn-royal-purple position-absolute modal-nav-btn modal-nav-next"
                  onClick={handleNext}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="modal-page-indicator">
                  <span className="badge bg-royal-purple">
                    <i className="fas fa-file-alt me-2"></i>
                    Page {currentImageIndex + 1} of {selectedImage.length}
                  </span>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleCloseModal}
                >
                  <i className="fas fa-times me-2"></i>
                  Close
                </button>
                <button
                  className="btn btn-royal-purple"
                  onClick={() => handleDownload(selectedImage[currentImageIndex].full)}
                >
                  <i className="fas fa-download me-2"></i>
                  Download Current Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="rush-events py-5 bg-gradient-light animate-fade-in-delay">
        <div className="container">
          <h2 className="section-header text-center display-5 mb-5">
            <i className="fas fa-calendar-check me-3 text-royal-purple"></i>
            Rush Events
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card rush-card hover-lift">
                <div className="card-body text-center">
                  <div className="rush-icon mb-3">
                    <i className="fas fa-users fa-3x text-royal-purple"></i>
                  </div>
                  <h5 className="card-title text-royal-purple">
                    <i className="fas fa-handshake me-2"></i>
                    Meet the Brothers
                  </h5>
                  <h6 className="card-subtitle mb-3 text-gold">Fall Rush Event Dates Coming Soon</h6>
                  <p className="card-text text-muted lh-lg">Join us at the chapter house to meet the brothers and learn more about SAE.</p>
                  <div className="rush-divider"></div>
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-2"></i>
                    Stay tuned for upcoming event announcements
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="connect py-5 text-center animate-fade-in">
        <div className="container">
          <h2 className="section-header display-5 mb-5">
            <i className="fas fa-link me-3 text-royal-purple"></i>
            Connect With Us
          </h2>
          <div className="social-icons mb-5">
            <a
              href="https://www.instagram.com/fsusae/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram hover-lift"
            >
              <i className="fab fa-instagram"></i>
            </a>    
            <a 
              href="https://www.facebook.com/SAEFloridaState/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link facebook hover-lift"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a 
              href="https://www.linkedin.com/company/sigma-alpha-epsilon-florida-beta-chapter/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link linkedin hover-lift"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="connect-buttons">
            <div className="mb-4">
              <a
                href="https://linktr.ee/FSUIFC?lt_utm_source=lt_share_link#476193446"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-royal-purple btn-lg px-5 py-3 me-3 hover-lift"
              >
                <i className="fas fa-user-plus me-2"></i>
                Register for Fall Rush 2025
              </a>
            </div>
            <div>
              <button className="btn btn-outline-royal-purple btn-lg px-5 py-3 hover-lift">
                <i className="fas fa-graduation-cap me-2"></i>
                Alumni Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">
            <i className="fas fa-copyright me-2"></i>
            2025 Sigma Alpha Epsilon - Florida State University
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
