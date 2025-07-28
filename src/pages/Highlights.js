
import React, { useState } from 'react';
import '../styles/highlights.css';

const Highlights = () => {
  // Gallery modal state
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Sample data - replace with your actual content
  const eventHighlights = [
    {
      id: 1,
      title: "Paddy Murphy Week",
      image: "/images/galleries/Paddy-Murphy-Gallery/Photo1.jpg",
      video: null,
      description: "Our largest philanthropic tradition, Paddy Murphy Week features a full week of daily events, bringing brothers and the campus community together to support a great cause.",
      date: "March 2025",
      gallery: [
        "/images/galleries/Paddy-Murphy-Gallery/Photo1.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo2.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo3.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo4.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo5.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo6.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo7.jpg",
        "/images/galleries/Paddy-Murphy-Gallery/Photo8.jpg"
      ]
    },
    {
      id: 2,
      title: "SAEBIZA",
      image: "/images/galleries/saebiza/Photo1.jpg",
      video: null,
      description: "Our annual spring party, SAEBIZA, brought the chapter together for a night of great music, good vibes, and lasting memories with friends.",
      date: "February 2025",
      gallery: [
        "/images/galleries/saebiza/Photo1.jpg",
        "/images/galleries/saebiza/Photo2.jpg",
        "/images/galleries/saebiza/Photo3.jpg",
        "/images/galleries/saebiza/Photo4.jpg"
      ]
    },
    {
      id: 3, 
      title: "SAE Parents Weekend",
      image: "/images/galleries/parents-weekend-2024/photo1.jpg",
      video: null,
      description: "SAE Parents Weekend brings brothers and their families together for a weekend of connection, celebration, and fun. This special tradition strengthens the bonds between our chapter and the families who support us.",
      date: "September 2024",
      gallery: [
        "/images/galleries/parents-weekend-2024/photo1.jpg",
        "/images/galleries/parents-weekend-2024/photo2.jpg",
        "/images/galleries/parents-weekend-2024/photo3.jpg",
        "/images/galleries/parents-weekend-2024/photo4.jpg",
        "/images/galleries/parents-weekend-2024/photo5.jpg",
        "/images/galleries/parents-weekend-2024/photo6.jpg",
        "/images/galleries/parents-weekend-2024/photo7.jpg",
        "/images/galleries/parents-weekend-2024/photo8.jpg",
        "/images/galleries/parents-weekend-2024/photo9.jpg"
      ]
    },
    {
      id: 4,
      title: "UF GAME DAY",
      image: "/images/galleries/UFGAMEDAY/photo3.jpg",
      video: null,
      description: "Rivalry Game Tailgate.",
      date: "November 2024",
      gallery: [
        "/images/galleries/UFGAMEDAY/photo1.jpg",
        "/images/galleries/UFGAMEDAY/photo2.jpg",
        "/images/galleries/UFGAMEDAY/photo3.jpg",
        "/images/galleries/UFGAMEDAY/photo4.jpg",
        "/images/galleries/UFGAMEDAY/photo5.jpg",
        "/images/galleries/UFGAMEDAY/photo6.jpg"
      ]
    }
  ];

  const recognitionWall = [
    {
      id: 1,
      name: "James Medrano",
      accomplishment: "John Thrasher Leadership & Service Award",
      description: "James exemplifies true leadership and service, inspiring brothers through his dedication to the chapter and the FSU community.",
      category: "Leadership & Service",
      year: "2025",
      image: "/images/medrano.jpg"
    },
    {
      id: 2,
      name: "Andrew Seale",
      accomplishment: "Greek Hall of Fame Inductee",
      description: "Andrew's commitment and legacy have left a lasting mark on our chapter, setting a high standard for all who follow.",
      category: "Greek Hall of Fame",
      year: "2025",
      image: "/images/Seale.jpg"
    }
  ];

  const categoryColors = {
    "Academic Excellence": "bg-royal-purple",
    "Professional Achievement": "bg-gold",
    "Service Leadership": "bg-royal-purple",
    "Campus Leadership": "bg-gold",
    "Athletic Excellence": "bg-royal-purple",
    "Academic Research": "bg-gold",
    "Leadership & Service": "bg-royal-purple",
    "Greek Hall of Fame": "bg-gold"
  };

  // Open gallery modal for event
  const handleOpenGallery = (gallery) => {
    setGalleryImages(gallery);
    setGalleryIndex(0);
    setShowGallery(true);
  };

  // Close gallery modal
  const handleCloseGallery = () => {
    setShowGallery(false);
    setGalleryImages([]);
    setGalleryIndex(0);
  };

  // Navigate gallery
  const handlePrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="highlights-page">
      {/* Hero Header */}
      <div className="container mt-5 mb-4">
        <h1 className="section-header mb-1 text-start">Highlights</h1>
        <p className="lead mb-4 text-start">Celebrating Our Brotherhood's Greatest Moments</p>
      </div>

      {/* Event Highlights Section */}
      <section className="event-highlights py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-header display-5">Event Highlights</h2>
            <p className="lead text-muted">Relive the memories that define our brotherhood</p>
          </div>

          <div className="row g-4">
            {eventHighlights.map((event) => (
              <div key={event.id} className="col-lg-6 col-md-6 mb-4">
                <div className="card event-card h-100 hover-lift">
                  <div className="event-image-container">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img-top"
                    />
                    <div className="event-overlay">
                      <div className="overlay-content">
                        <span className="badge bg-royal-purple mb-2">{event.date}</span>
                        <h5 className="text-white mb-2">{event.title}</h5>
                        <p className="text-white-50 mb-0">{event.description}</p>
                      </div>
                    </div>
                    {event.video && (
                      <div className="video-play-button">
                        <i className="fas fa-play"></i>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-royal-purple">{event.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-gold fw-bold">{event.date}</small>
                      {event.gallery ? (
                        <button className="btn btn-royal-purple btn-sm" onClick={() => handleOpenGallery(event.gallery)}>
                          <i className="fas fa-images me-1"></i>
                          View Gallery
                        </button>
                      ) : (
                        <button className="btn btn-royal-purple btn-sm" disabled>
                          <i className="fas fa-images me-1"></i>
                          View Gallery
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Recognition Wall Section */}
      <section className="recognition-wall py-5 bg-gradient-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-header display-5">Recognition Wall</h2>
            <p className="lead text-muted">Honoring our brothers' outstanding achievements</p>
          </div>

          <div className="row g-4 justify-content-center">
            {recognitionWall.map((recognition) => (
              <div key={recognition.id} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
                <div className="card recognition-card h-100 hover-lift">
                  {recognition.image && (
                    <img src={recognition.image} alt={recognition.name} className="card-img-top mb-3" style={{ objectFit: 'cover', height: '220px', borderRadius: '1rem 1rem 0 0' }} />
                  )}
                  <div className="card-body text-center">
                    <div className="recognition-icon mb-3">
                      <i className="fas fa-trophy text-gold fa-2x"></i>
                    </div>
                    <h5 className="card-title text-royal-purple fw-bold">{recognition.name}</h5>
                    <h6 className="card-subtitle text-gold mb-3">{recognition.accomplishment}</h6>
                    <p className="card-text text-muted small">{recognition.description}</p>
                    <span className={`badge ${categoryColors[recognition.category] || 'bg-royal-purple'} text-white`}>
                      {recognition.category}
                    </span>
                    <div className="mt-2">
                      <small className="text-muted">{recognition.year}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="row mt-5 pt-5 border-top justify-content-center">
            <div className="col-md-3 col-6 text-center mb-4">
              <div className="stat-item">
                <h3 className="display-6 text-royal-purple fw-bold mb-2">20+</h3>
                <p className="text-muted">Events This Year</p>
              </div>
            </div>
            <div className="col-md-3 col-6 text-center mb-4">
              <div className="stat-item">
                <h3 className="display-6 text-royal-purple fw-bold mb-2">Highest</h3>
                <p className="text-muted">Fraternity Average GPA</p>
              </div>
            </div>
            <div className="col-md-3 col-6 text-center mb-4">
              <div className="stat-item">
                <h3 className="display-6 text-gold fw-bold mb-2">1000+</h3>
                <p className="text-muted">Service Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.8)' }} tabIndex="-1" role="dialog" onClick={handleCloseGallery}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <div className="modal-body p-0 position-relative text-center">
                <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={handleCloseGallery} style={{ zIndex: 10, filter: 'invert(1)' }}></button>
                <button className="btn btn-royal-purple position-absolute top-50 start-0 translate-middle-y" style={{ zIndex: 10 }} onClick={handlePrev}>&lt;</button>
                <img src={galleryImages[galleryIndex]} alt="Gallery" className="img-fluid rounded shadow-lg" style={{ maxHeight: '70vh', maxWidth: '100%', background: '#fff' }} />
                <button className="btn btn-royal-purple position-absolute top-50 end-0 translate-middle-y" style={{ zIndex: 10 }} onClick={handleNext}>&gt;</button>
                <div className="position-absolute bottom-0 start-50 translate-middle-x bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill" style={{ zIndex: 10, fontSize: '1rem' }}>
                  {galleryIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlights;
