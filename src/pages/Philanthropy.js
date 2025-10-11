
import React from 'react';
import '../styles/philanthropy.css';
import PanelCarousel from '../components/PanelCarousel';

const Philanthropy = () => {
  return (
    <div className="bg-gradient-light min-vh-100">
      {/* Main Philanthropy Section */}
      <section className="main-philanthropy py-5 mt-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6 col-lg-6">
              <h2 className="section-header mb-4">
                <i className="fas fa-heart text-gold me-3"></i>
                Our Philanthropic Mission
              </h2>
              <div className="mission-content">
                <p className="lead mb-4">Each spring, the brothers of SAE at Florida State University host <strong className="text-gold">Paddy Murphy Week</strong> in honor of the <strong className="text-gold">Julia C. Black Legacy Scholarship</strong>, created after Julia's passing in 2023.</p>
                
                <div className="highlight-box mb-4">
                  <i className="fas fa-trophy text-gold me-2"></i>
                  <span>Thanks to the dedication of our brothers and the incredible efforts of our sweetheart candidates, we raised over <strong className="text-gold">$14,000</strong> through a week of events, all dedicated to continuing Julia's legacy.</span>
                </div>
                
                <p className="mb-4">These funds go directly to a graduating high school senior who reflects the strength and spirit Julia embodied.</p>
                
                <p className="mb-4">Our commitment to service doesn't end with our own chapter. Each year, we proudly support <strong className="text-royal-purple">Panhellenic philanthropy competitions</strong>, with brothers raising funds for sorority-led causes across campus.</p>
                
                <div className="mission-quote">
                  <i className="fas fa-quote-left text-gold"></i>
                  <p className="fst-italic">Giving back is more than tradition — it's part of who we are.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="image-container hover-lift">
                <img src="/images/JCB.jpg" alt="Julia C. Black Memorial" className="img-fluid rounded-3 shadow-lg" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h5 className="text-white mb-2">Taylor Hicks</h5>
                    <p className="text-white mb-0">2025 SAE Violet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Fundraising Section */}
      <section className="current-fundraising py-5 bg-gradient-light">
        <div className="container">
          <h2 className="section-header text-center mb-5">
            <i className="fas fa-hand-holding-heart text-gold me-3"></i>
            Current Philanthropy Events
          </h2>
          <div className="row g-4 justify-content-center">
            {/* Champs Chance Event Card */}
            <div className="col-md-8 col-lg-6">
              <div className="fundraising-card card border-0 shadow-lg hover-lift">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <i className="fas fa-paw fa-3x text-royal-purple mb-3"></i>
                    <h3 className="card-title h3 text-royal-purple mb-4">Champs Chance Event</h3>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <span className="badge bg-gold text-dark px-3 py-2 me-2">Delta Gamma</span>
                      <span className="badge bg-royal-purple text-white px-3 py-2">Sigma Alpha Epsilon</span>
                    </div>
                  </div>
                  
                  <p className="card-text lead mb-4">Meet the pups & join us for a day filled with support for Champs Chance.</p>
                  
                  <div className="event-details mb-4">
                    <div className="row text-center">
                      <div className="col-md-6 mb-3">
                        <div className="detail-item">
                          <i className="fas fa-calendar-alt text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">Date</h6>
                          <p className="text-muted mb-0">Monday, October 13th</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="detail-item">
                          <i className="fas fa-clock text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">Time</h6>
                          <p className="text-muted mb-0">3:00 PM - 5:30 PM</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="detail-item">
                          <i className="fas fa-map-marker-alt text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">Location</h6>
                          <p className="text-muted mb-0">415 W College Ave</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="detail-item">
                          <i className="fas fa-ticket-alt text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">Tickets</h6>
                          <p className="text-muted mb-0">$7 per ticket</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href="https://venmo.com/champschance" 
                    className="btn btn-royal-purple btn-lg w-100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-cc-paypal me-2"></i>
                    Pay with Venmo
                  </a>
                </div>
              </div>
            </div>

            {/* Mr. Casanova Competition Card */}
            <div className="col-md-8 col-lg-6">
              <div className="fundraising-card card border-0 shadow-lg hover-lift">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <div className="competitor-image-container mb-3">
                      <img 
                        src="/images/yonce.jpg" 
                        alt="Payton Yonce - SAE Mr. Casanova Competitor" 
                        className="competitor-image rounded shadow"
                      />
                    </div>
                    <h3 className="card-title h3 text-royal-purple mb-3">Mr. Casanova Competition</h3>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <span className="badge bg-gold text-dark px-3 py-2 me-2">Kappa Alpha Theta</span>
                      <span className="badge bg-royal-purple text-white px-3 py-2">Sigma Alpha Epsilon</span>
                    </div>
                    <h4 className="h5 text-gold mb-3">Supporting Payton Yonce</h4>
                  </div>
                  
                  <p className="card-text lead mb-4">Join us in supporting our brother <strong className="text-royal-purple">Payton Yonce</strong> in the Kappa Alpha Theta Mr. Casanova competition! All proceeds benefit the <strong className="text-gold">CASA Foundation</strong>.</p>
                  
                  <div className="cause-highlight mb-4">
                    <div className="highlight-box text-center">
                      <i className="fas fa-heart text-gold mb-2"></i>
                      <h6 className="text-royal-purple fw-bold mb-2">CASA Foundation</h6>
                      <p className="text-muted mb-0 small">Court Appointed Special Advocates for children in foster care</p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://theta.crowdchange.co/51556/page/835265" 
                    className="btn btn-royal-purple btn-lg w-100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-donate me-2"></i>
                    Donate to Support Payton
                  </a>
                </div>
              </div>
            </div>

            {/* Movember Month Card */}
            <div className="col-md-8 col-lg-6">
              <div className="fundraising-card card border-0 shadow-lg hover-lift">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <i className="fas fa-mustache fa-3x text-royal-purple mb-3"></i>
                    <h3 className="card-title h3 text-royal-purple mb-4">Movember Month</h3>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <span className="badge bg-gold text-dark px-3 py-2 me-2">Men's Mental Health</span>
                      <span className="badge bg-royal-purple text-white px-3 py-2">No Shave November</span>
                    </div>
                  </div>
                  
                  <p className="card-text lead mb-4">Join SAE brothers in raising awareness for <strong className="text-royal-purple">men's mental health</strong> and supporting <strong className="text-gold">No Shave November</strong>. Together, we're breaking the silence and promoting mental wellness.</p>
                  
                  <div className="movember-highlights mb-4">
                    <div className="row text-center">
                      <div className="col-md-6 mb-3">
                        <div className="highlight-item">
                          <i className="fas fa-brain text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">Mental Health</h6>
                          <p className="text-muted mb-0 small">Awareness & Support</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="highlight-item">
                          <i className="fas fa-cut text-gold mb-2"></i>
                          <h6 className="text-royal-purple fw-bold mb-1">No Shave</h6>
                          <p className="text-muted mb-0 small">November Challenge</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="cause-highlight mb-4">
                    <div className="highlight-box text-center">
                      <i className="fas fa-heart text-gold mb-2"></i>
                      <h6 className="text-royal-purple fw-bold mb-2">Movember Foundation</h6>
                      <p className="text-muted mb-0 small">Supporting men's health initiatives worldwide</p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://us.movember.com/" 
                    className="btn btn-royal-purple btn-lg w-100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Learn More About Movember
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="past-events py-5">
        <div className="container">
          <h2 className="section-header text-center mb-5">
            <i className="fas fa-calendar-alt text-gold me-3"></i>
            Past Philanthropy Events
          </h2>
          
          {/* Event 1 */}
          <div className="row mb-5 align-items-center g-5">
            <div className="col-md-5 col-lg-4">
              <div className="event-image-container hover-lift">
                <img src="/images/Paddy.jpg" alt="Paddy Murphy Week 2025" className="img-fluid rounded-3 shadow-lg" />
                <div className="event-badge">
                  <span className="badge bg-gold text-dark px-3 py-2">2025</span>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="event-card card border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-star text-gold me-2"></i>
                    <h3 className="h4 mb-0 text-royal-purple">Paddy Murphy Week - 2025</h3>
                  </div>
                  
                  <p className="lead mb-3">This year's Paddy Murphy Week was one of the most successful in our chapter's history, raising over <strong className="text-gold">$14,000</strong> for the <strong className="text-gold">Julia C. Black Scholarship Fund</strong>.</p>
                  
                  <div className="event-highlights mb-3">
                    <h6 className="text-royal-purple fw-bold mb-2">Featured Events:</h6>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-music text-gold me-2"></i>Semi-formal at Recess</li>
                      <li><i className="fas fa-dice text-gold me-2"></i>Brotherhood Poker Night</li>
                      <li><i className="fas fa-castle text-gold me-2"></i><em>"Darti Gras at the Castle"</em></li>
                    </ul>
                  </div>
                  
                  <div className="success-metric">
                    <div className="metric-card bg-gradient-light p-3 rounded">
                      <div className="row text-center">
                        <div className="col">
                          <h5 className="text-gold mb-1">$14,000+</h5>
                          <small className="text-muted">Raised</small>
                        </div>
                        <div className="col">
                          <h5 className="text-royal-purple mb-1">7</h5>
                          <small className="text-muted">Days of Events</small>
                        </div>
                        <div className="col">
                          <h5 className="text-gold mb-1">1</h5>
                          <small className="text-muted">Scholarship Created</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panhellenic Competitions Section */}
      <section className="panhellenic-section py-5 bg-gradient-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-header mb-4">
              <i className="fas fa-users text-gold me-3"></i>
              2024-2025 Panhellenic Competitors
            </h2>
            <p className="lead text-muted">Our brothers proudly represent SAE in campus-wide philanthropy competitions</p>
          </div>
          <div className="carousel-container">
            <PanelCarousel />
          </div>
        </div>
      </section> 

      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>
    </div>
  );
};

export default Philanthropy;
