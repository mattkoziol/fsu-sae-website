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
    <section id="alumni-rsvp" className="alumni-rsvp py-5 bg-white">
      <div className="container">
        <div className="animate-fade-in">
          <h2 className="section-header text-center mb-4">SAE Founders Day Weekend RSVP</h2>
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

  // Notable alumni data - you can later move this to a backend API
  const notableAlumni = [
    {
      id: 1,
      name: "Dr. Mike Brady",
      graduationYear: "FSU Alumnus",
      title: "Assistant Provost & Marketing Professor, FSU",
      achievements: [
        "Dr. Persis E. Rockwood Professor of Marketing",
        "Assistant Provost for Florida State University",
        "Former Board Chair of American Marketing Association",
        "Recognized by AMA CEO for outstanding leadership"
      ],
      image: "/images/mikebrady.jpg", // You'll need to add these images
      linkedin: "https://www.linkedin.com/in/mike-brady-9598067b/"
    },
    {
      id: 2,
      name: "John Rivers",
      graduationYear: "FSU Alumnus",
      title: "CEO, 4R Restaurant Group & 4Roots Farm",
      achievements: [
        "Founded 4Rivers BBQ, named 'Best Casual Restaurant' in Florida",
        "Expanded to 15+ locations across Florida",
        "Co-founded 4Roots Farm promoting food equity and sustainability",
        "Transitioned from 20-year healthcare career to barbecue mastery",
        "Advocates for local farming and community nutrition programs"
      ],
      image: "/images/johnrivers.jpg", // You'll need to add these images
      linkedin: "https://www.linkedin.com/in/john-rivers-33260216a/"
    },
    {
      id: 3,
      name: "Mack Brown",
      graduationYear: "FSU Alumnus",
      title: "College Football Hall of Fame Coach (Texas, UNC)",
      achievements: [
        "2005 NCAA National Championship & Coach of the Year",
        "244 career wins, first coach to win 100+ games at two programs",
        "Paul 'Bear' Bryant Coach of the Year Award (2006)",
        "20 consecutive winning seasons and 18 consecutive bowl appearances",
        "Community advocate for child abuse awareness and CASA volunteers"
      ],
      image: "/images/mackbrown.jpg" // You'll need to add these images
      
    }

    
  ];

  // Donation goals and current progress - will be fetched from Google Apps Script
  const [donationProgress, setDonationProgress] = useState({
    houseMaintenance: { current: 0, goal: 5000 },
    poolTable: { current: 0, goal: 700 },
    basketballHoop: { current: 0, goal: 100 },
    nationalsIFC: { current: 0, goal: 2000 },
    brotherhoodEvents: { current: 0, goal: 5000 },
    partiesTailgates: { current: 0, goal: 5000 }
  });

  // Fetch donation progress from Google Apps Script
  useEffect(() => {
    console.log('useEffect triggered, API_BASE_URL:', API_BASE_URL);
    const fetchDonationProgress = async () => {
      try {
        const url = `${API_BASE_URL}/api/donations/totals?t=${Date.now()}`;
        console.log('Fetching from URL:', url);
        const response = await fetch(url);
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.totals) {
          console.log('Updating donation progress with:', data.totals);
          setDonationProgress({
            houseMaintenance: { current: data.totals['House Maintenance'] || 0, goal: 5000 },
            poolTable: { current: data.totals['Pool Table'] || 0, goal: 700 },
            basketballHoop: { current: data.totals['Basketball Hoop'] || 0, goal: 100 },
            nationalsIFC: { current: data.totals['Nationals/IFC Dues'] || 0, goal: 2000 },
            brotherhoodEvents: { current: data.totals['Brotherhood Events'] || 0, goal: 5000 },
            partiesTailgates: { current: data.totals['Parties & Tailgates'] || 0, goal: 5000 }
          });
        }
      } catch (error) {
        console.error('Failed to fetch donation progress:', error);
        // Keep existing values if fetch fails
      }
    };

    fetchDonationProgress();
  }, []);

  const formatUsd = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const calcPercent = (current, goal) => {
    if (!goal || goal <= 0) return 0;
    const pct = Math.round((current / goal) * 100);
    return Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
  };

  const upcomingEvents = [
    {
      id: 'FoundersDay-2026-03-06',
      title: 'SAE Founders Day Weekend',
      dateDisplay: 'March 6-8, 2026',
      sortDate: '2026-03-06',
      type: 'Founders Day',
      icon: 'fas fa-star',
      description: "Celebrate SAE's founding! SAE was founded nationally on March 9, 1856, and our Florida State chapter was founded on March 5, 1949. Join us for alumni yard days and brotherhood activities throughout the weekend.",
      canRsvp: true
    }
  ];

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
                  <h4 className="mb-3" style={{ color: '#916f41', fontWeight: 700 }}>
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
          <h2 className="section-header text-center mb-5 animate-fade-in">Upcoming Events</h2>
          <div className="row justify-content-center animate-fade-in-delay">
            {upcomingEvents
              .slice()
              .sort((a, b) => {
                if (!a.sortDate && !b.sortDate) return 0;
                if (!a.sortDate) return 1;
                if (!b.sortDate) return -1;
                return new Date(a.sortDate) - new Date(b.sortDate);
              })
              .map(evt => (
              <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className={`${evt.icon} fa-3x text-gold`}></i>
                    </div>
                    <h3 className="card-title text-royal-purple mb-2">{evt.title}</h3>
                    <span className="badge bg-primary mb-3 px-3 py-2 fs-6">{evt.dateDisplay}</span>
                    <p className="card-text lead mb-4">{evt.description}</p>
                    {evt.canRsvp ? (
                      <div className="bg-gradient-light rounded p-3">
                        <p className="text-muted mb-3 fw-semibold">
                          <i className="fas fa-info-circle me-2"></i>
                          RSVP below to let us know you're coming.
                        </p>
                        <a 
                          href="#alumni-rsvp" 
                          className="btn btn-royal-purple btn-lg hover-lift"
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById('alumni-rsvp');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                        >
                          <i className="fas fa-check me-2"></i>RSVP Now
                        </a>
                      </div>
                    ) : (
                      <div className="bg-gradient-light rounded p-3">
                        <p className="text-muted mb-3 fw-semibold">
                          For details about attending this event, please contact our alumni relations team.
                        </p>
                        <a 
                          href="mailto:flbetasae@gmail.com?subject=Event%20Inquiry:%20" 
                          className="btn btn-outline-primary hover-lift"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-envelope me-2"></i>Contact for Details
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced RSVP Section */}
      <AlumniRsvpSection eventKey="FoundersDay-2026-03-06" user={user} />

      {/* Enhanced Alumni Giving Section */}
      <section className="alumni-giving py-5 bg-white">
        <div className="container">
          <div className="row align-items-center animate-fade-in mb-5">
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
              <p className="mb-4">Choose a specific initiative below to make a targeted donation that directly impacts the areas you care most about.</p>
            </div>
          </div>

          {/* Donation Categories */}
          <div className="row g-4 animate-fade-in-delay">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-home fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">House Maintenance</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.houseMaintenance.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.houseMaintenance.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.houseMaintenance.current, donationProgress.houseMaintenance.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.houseMaintenance.current, donationProgress.houseMaintenance.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Support essential repairs, renovations, and improvements to our chapter house. Your donation helps maintain a safe, comfortable, and welcoming environment for current and future brothers.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-hammer me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | House Maintenance | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-dice fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">Pool Table</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.poolTable.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.poolTable.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.poolTable.current, donationProgress.poolTable.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.poolTable.current, donationProgress.poolTable.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Help us add a professional pool table to our common areas. This will provide brothers with a great way to relax, bond, and enjoy friendly competition between classes and study sessions.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-dice me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | Pool Table | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-basketball-ball fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">Basketball Hoop</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.basketballHoop.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.basketballHoop.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.basketballHoop.current, donationProgress.basketballHoop.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.basketballHoop.current, donationProgress.basketballHoop.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Support the installation of a basketball hoop for outdoor recreation. This addition will encourage physical activity, intramural sports participation, and brotherhood bonding through friendly competition.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-basketball-ball me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | Basketball Hoop | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-graduation-cap fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">Nationals/IFC Dues</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.nationalsIFC.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.nationalsIFC.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.nationalsIFC.current, donationProgress.nationalsIFC.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.nationalsIFC.current, donationProgress.nationalsIFC.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Help cover essential fraternity dues including SAE Nationals fees and Interfraternity Council dues. These payments ensure our chapter remains in good standing and maintains access to national resources and campus recognition.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-graduation-cap me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | Nationals/IFC Dues | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-handshake fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">Brotherhood Events</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.brotherhoodEvents.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.brotherhoodEvents.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.brotherhoodEvents.current, donationProgress.brotherhoodEvents.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.brotherhoodEvents.current, donationProgress.brotherhoodEvents.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Support alumni and brotherhood events that strengthen our bonds across generations. Your donation helps fund alumni tailgates, networking events, and mentorship programs that keep our brotherhood strong.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-handshake me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | Brotherhood Events | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-glass-cheers fa-3x text-royal-purple"></i>
                  </div>
                  <h4 className="card-title text-royal-purple mb-3">Parties & Tailgates</h4>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">{formatUsd(donationProgress.partiesTailgates.current)} raised</small>
                      <small className="text-muted">{formatUsd(donationProgress.partiesTailgates.goal)} goal</small>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${calcPercent(donationProgress.partiesTailgates.current, donationProgress.partiesTailgates.goal)}%` }}
                        aria-valuenow={calcPercent(donationProgress.partiesTailgates.current, donationProgress.partiesTailgates.goal)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <p className="card-text mb-4">Help fund social events, parties, and tailgates that create memorable experiences for our brothers. These events build lasting friendships and create the college memories that define the SAE experience.</p>
                  <div className="d-grid gap-2">
                    <a href="https://cash.app/$flbetaSAE" className="btn btn-royal-purple hover-lift" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-glass-cheers me-2"></i>Donate via Cash App
                    </a>
                    <small className="text-muted">Include note: "SAE-FSU | Parties & Tailgates | [Your Email]"</small>
                    <a href="https://forms.gle/9vosLREeGcYbDokCA" className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-check me-2"></i>Confirm Donation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          {/* Alumni Hiring Section */}
          <div className="row mt-5 animate-fade-in-delay">
            <div className="col-12">
              <div className="bg-gradient-light rounded p-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Notable Alumni Section */}
      <section className="notable-alumni py-5 bg-gradient-light">
        <div className="container">
          <h2 className="section-header text-center mb-5 animate-fade-in">Notable Alumni</h2>
          <p className="text-center mb-5 lead animate-fade-in">
            Celebrating the outstanding achievements of our alumni brothers who continue to exemplify the values of Sigma Alpha Epsilon
          </p>
          <div className="row g-4 animate-fade-in-delay justify-content-center">
            {notableAlumni.map((alumnus, index) => (
              <div key={alumnus.id} className="col-lg-4 col-md-6">
                <div className="card notable-alumni-card h-100 hover-lift">
                  <div className="card-img-container">
                    <img 
                      src={alumnus.image} 
                      alt={alumnus.name}
                      className="card-img-top notable-alumni-img"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.target.src = "/images/placeholder-avatar.jpg";
                      }}
                    />
                    <div className="card-img-overlay-gradient"></div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="text-center mb-3">
                      <h4 className="card-title text-royal-purple mb-1">{alumnus.name}</h4>
                      <p className="text-gold fw-semibold mb-1">{alumnus.graduationYear}</p>
                      <p className="text-muted">{alumnus.title}</p>
                    </div>
                    
                    <div className="achievements-section flex-grow-1">
                      <h5 className="achievements-title mb-3">
                        <i className="fas fa-trophy me-2 text-gold"></i>
                        Key Achievements
                      </h5>
                      <ul className="achievements-list">
                        {alumnus.achievements.map((achievement, i) => (
                          <li key={i} className="achievement-item">
                            <i className="fas fa-chevron-right me-2 text-royal-purple"></i>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="card-footer-actions mt-4 text-center">
                      {alumnus.linkedin && (
                        <a 
                          href={alumnus.linkedin} 
                          className="btn btn-outline-primary btn-sm hover-lift"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin me-2"></i>
                          Connect on LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5 animate-fade-in-delay">
            <div className="bg-white rounded p-4 shadow-sm">
              <h4 className="text-royal-purple mb-3">
                <i className="fas fa-star me-2 text-gold"></i>
                Know of a Notable Alumnus?
              </h4>
              <p className="text-muted mb-3">
                Help us recognize outstanding alumni achievements by nominating brothers who have made significant impacts in their fields or communities.
              </p>
              <a 
                href="mailto:Info.fsusae@fsusae.com?subject=Notable%20Alumni%20Nomination" 
                className="btn btn-royal-purple hover-lift"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope me-2"></i>
                Submit a Nomination
              </a>
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
                  <a 
                    href="mailto:Info.fsusae@fsusae.com?subject=SAE%20Mentorship%20Interest" 
                    className="btn btn-royal-purple hover-lift"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-handshake me-2"></i>
                    Become a Mentor
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