import React from 'react';
import execBoard from '../../data/execBoard.json';
import '../../styles/exec.css';

const ExecutiveBoard = () => {
  // Split the data into three rows as requested
  const firstRow = execBoard.slice(0, 5);   // First 5 members
  const secondRow = execBoard.slice(5, 10); // Next 5 members  
  const thirdRow = execBoard.slice(10, 16); // Last 6 members (15 total, but you have 15 members)

  const renderCard = (member, index) => (
    <div key={member.name} className="col-lg-2 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="position-relative">
          <img
            src={member.image}
            alt={member.name}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          {/* Bio overlay on hover */}
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 text-white p-3 opacity-0 transition-opacity" 
               style={{ transition: 'opacity 0.3s ease' }}
               onMouseEnter={(e) => e.target.style.opacity = '1'}
               onMouseLeave={(e) => e.target.style.opacity = '0'}>
            <p className="text-center small mb-0">{member.bio}</p>
          </div>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title text-primary fw-bold mb-1">{member.name}</h5>
          <p className="card-text text-muted small mb-3">{member.title}</p>
          {member.linkedin && member.linkedin !== "#" && (
            <a
              href={member.linkedin}
              className="btn btn-outline-primary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin me-1"></i>
              Connect
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="executive-board-page">
      {/* Simple Page Header */}
      <div className="container mt-5 mb-4">
        <h1 className="section-header mb-1 text-start">Executive Board</h1>
        <p className="lead mb-4 text-start">Meet Our Leadership Team</p>
      </div>

      {/* Executive Cards */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 text-primary">Our Leaders</h2>
            <p className="text-muted">Dedicated to excellence and brotherhood</p>
          </div>

          {/* First Row - 5 cards */}
          <div className="row justify-content-center mb-4">
            {firstRow.map((member, index) => renderCard(member, index))}
          </div>

          {/* Second Row - 5 cards */}
          <div className="row justify-content-center mb-4">
            {secondRow.map((member, index) => renderCard(member, index))}
          </div>

          {/* Third Row - 5 cards (you have 15 members total) */}
          <div className="row justify-content-center">
            {thirdRow.map((member, index) => renderCard(member, index))}
          </div>
        </div>
      </section>

      

      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p>© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>
    </div>
  );
};

export default ExecutiveBoard;