
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/about.css';
import Typewriter from '../components/Typewriter';

const About = () => {
  return (
    <div className="bg-gradient-light min-vh-100">
      {/* Simple Page Header - Left Aligned */}
      <div className="container py-5">
        <div className="text-start">
          <h1 className="display-4 fw-bold mb-3 text-royal-purple">Florida Beta Chapter</h1>
          <h2 className="display-6 mb-3 text-gold">Sigma Alpha Epsilon at Florida State University</h2>
          <p className="lead fs-3 mb-4 section-header">Excellence Through Brotherhood</p>
        </div>
      </div>

      {/* Enhanced Chapter History Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="image-container">
                <img src="/images/housephoto1.jpg" alt="SAE Chapter House" className="img-fluid rounded-4 shadow-lg hover-zoom" />
                <div className="overlay-badge">
                  <span className="badge bg-royal-purple fs-6 p-3">Est. 1949</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-section">
                <h2 className="section-header mb-4 display-5">Our Rich History</h2>
                <p className="lead fs-4 text-muted mb-4">Founded in 1856, Sigma Alpha Epsilon has been a cornerstone of excellence in Greek life at Florida State University.</p>
                <p className="fs-5 lh-lg">Our chapter, established in 1949, has been dedicated to developing leaders, fostering brotherhood, and making a positive impact on our community. Through our commitment to the True Gentleman ideal, we strive to create an environment where members can grow academically, socially, and professionally.</p>
                <div className="mt-5">
                  <h4 className="h4 mb-4 text-royal-purple">Notable Milestones</h4>
                  <div className="milestone-list">
                    <div className="milestone-item">
                      <i className="fas fa-calendar-alt text-gold me-3 fa-lg"></i>
                      <span className="fs-5">Established 1949</span>
                    </div>
                    <div className="milestone-item">
                      <i className="fas fa-home text-gold me-3 fa-lg"></i>
                      <span className="fs-5">Current House Claimed in 2017</span>
                    </div>
                    <div className="milestone-item">
                      <i className="fas fa-users text-gold me-3 fa-lg"></i>
                      <span className="fs-5">Largest Fraternity on Campus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Values Section */}
      <section className="py-5 bg-gradient-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-header mb-5 display-4">Our Mission & Values</h2>
            <div className="typewriter-container p-4 bg-white rounded-4 shadow-sm">
              <Typewriter text={"The True Gentleman is the man whose conduct proceeds from good will and an acute sense of propriety, and whose self-control is equal to all emergencies; who does not make the poor man conscious of his poverty, the obscure man of his obscurity, or any man of his inferiority or deformity; who is himself humbled if necessity compiles him to humble another; who does not flatter wealth, cringe before power, or boast of his own possessions or achievements; who speaks with frankness but always with sincerity and sympathy; whose deed follows his word; who thinks of the rights and feelings of others, rather than his own; and who appears well in any company, a man with whom honor is sacred and virtue safe. -John Walter Wayland"} speed={20} />
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="value-card h-100">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-users fa-3x"></i>
                  </div>
                  <h3 className="h4 mb-3 text-royal-purple">Brotherhood</h3>
                  <p className="fs-6">Fostering lifelong bonds and mutual support among members through shared experiences and values.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card h-100">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-graduation-cap fa-3x"></i>
                  </div>
                  <h3 className="h4 mb-3 text-royal-purple">Scholarship</h3>
                  <p className="fs-6">Maintaining academic excellence and intellectual growth through dedicated study and mentorship.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card h-100">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-hands-helping fa-3x"></i>
                  </div>
                  <h3 className="h4 mb-3 text-royal-purple">Service</h3>
                  <p className="fs-6">Making a positive impact in our community and beyond through volunteer work and philanthropy.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card h-100">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-crown fa-3x"></i>
                  </div>
                  <h3 className="h4 mb-3 text-royal-purple">Leadership</h3>
                  <p className="fs-6">Developing character and leadership skills that will serve members throughout their lives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Minerva Shield Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <div className="image-container">
                <img src="/images/minerva-shield.jpg" alt="Minerva Shield" className="img-fluid rounded-4 shadow-lg hover-zoom" />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="content-section">
                <h2 className="section-header mb-4 display-5">The Minerva Shield</h2>
                <p className="lead fs-4 text-gold mb-4">A Symbol of Wisdom and Strength</p>
                <p className="fs-5 lh-lg">The Minerva Shield represents the wisdom and strength that guides our fraternity. Minerva, the Roman goddess of wisdom, symbolizes the intellectual and moral foundation upon which SAE was built. The shield serves as a constant reminder of our commitment to knowledge, virtue, and the pursuit of excellence.</p>
                <div className="mt-4">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-shield-alt fa-2x text-gold me-3"></i>
                    <span className="fs-5 text-muted">Guiding our path since 1856</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Phoenix Manual Section */}
      <section className="py-5 bg-gradient-royal">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-body p-5 text-center bg-white">
              <div className="mb-4">
                <i className="fas fa-book fa-4x text-gold mb-3"></i>
              </div>
              <h2 className="section-header mb-4 display-5">The Phoenix Manual</h2>
              <p className="lead fs-4 mb-4 text-muted">Our comprehensive guide to values, operations, and history that shapes the SAE experience for every brother.</p>
              <a 
                href="https://issuu.com/sigmaalphaepsilon/docs/pme_chapter_fall_2022_members" 
                className="btn btn-royal-purple btn-lg px-5 py-3 fs-5 rounded-pill hover-lift"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt me-2"></i>
                Explore The Manual
              </a>
            </div>
          </div>
        </div>
      </section>

            {/* ENHANCED: Styled Developer Credit Section */}
      <section className="py-5 bg-gradient-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-body p-4 text-center bg-white">
                  <div className="mb-3">
                    <div className="icon-wrapper mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="fas fa-code fa-2x"></i>
                    </div>
                  </div>
                  <h3 className="section-header mb-3">Website Development</h3>
                  <p className="text-muted mb-3 lh-lg">
                    This website was designed and developed by <strong className="text-gold">Matthew Koziol</strong>, 
                    a brother of Sigma Alpha Epsilon and computer science student at FSU.
                  </p>
                  <div className="mt-4">
                    <a 
                      href="mailto:matthewkoizol04@gmail.com" 
                      className="btn btn-royal-purple me-3 px-4 py-2 rounded-pill hover-lift"
                    >
                      <i className="fas fa-envelope me-2"></i>
                      Contact Developer
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/matthew-koziol-/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-gold px-4 py-2 rounded-pill hover-lift"
                    >
                      <i className="fab fa-linkedin me-2"></i>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Enhanced Footer */}
      <footer className="bg-royal-purple text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5 className="text-gold mb-3">Sigma Alpha Epsilon - Florida Beta</h5>
              <p className="mb-2">Florida State University</p>
              <p className="text-light">Excellence Through Brotherhood</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="social-links mb-3">
                <a href="https://www.instagram.com/fsusae/?hl=en" className="text-gold me-3 fs-4" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/SAEFloridaState/" className="text-gold me-3 fs-4" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.linkedin.com/company/sigma-alpha-epsilon-florida-beta-chapter/posts/?feedView=all" className="text-gold fs-4" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <hr className="border-gold my-4" />
          <div className="text-center">
            <p className="mb-0">© 2025 Sigma Alpha Epsilon - Florida State University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
