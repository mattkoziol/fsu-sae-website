import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/active.css';
import Carousel from 'react-bootstrap/Carousel';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

const ActiveMembers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12); // Increased from 6 to 12
  const navigate = useNavigate();

  // Memoize fetchMembers to avoid unnecessary re-renders
  

 // Auth check effect (runs once)
 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log('ActiveMembers: storedUser', storedUser);
  setUser(storedUser);
  
  // Call fetchMembers directly without dependency
  const loadMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/members`);
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };
  
  loadMembers();
}, []); // Empty dependency array - only runs once on mount

// Data fetching effect (runs once)
/*useEffect(() => {
  fetchMembers();
}, [fetchMembers]);*/

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         member.major.toLowerCase().includes(searchValue.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchValue.toLowerCase());
    const matchesClass = classFilter === 'all' || member.graduationYear === classFilter;
    const isActiveMember = member.role !== 'alumni'; // Only show active members, not alumni
    return matchesSearch && matchesClass && isActiveMember;
  });

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredMembers.length / cardsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of members section
    document.getElementById('members-directory').scrollIntoView({ behavior: 'smooth' });
  };

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, classFilter]);

  // Generate page numbers with ellipsis for large numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at once
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-gradient-light min-vh-100">
      {/* Enhanced Page Header */}
      <div className="container pt-5 pb-4">
        <div className="animate-fade-in">
          <h1 className="section-header mb-3 text-start text-royal-purple">Active Members</h1>
          <p className="lead mb-4 text-start text-gold fs-4 fw-semibold">Our Brotherhood</p>
        </div>
      </div>

      {/* Enhanced Member Portal Login Section */}
      <section className="member-login py-5">
        <div className="container animate-fade-in-delay">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="section-header text-start mb-4">Member Resources</h2>
              <p className="lead mb-4">Access member-only resources, upcoming events, and chapter information.</p>
              {user && user.role === 'member' ? (
                <div className="member-welcome">
                  <h4 className="text-success mb-3">
                    <i className="fas fa-handshake me-2"></i>
                    Welcome Brother {user.name.split(' ')[0]}
                  </h4>
                  <Link to="/account" className="btn btn-outline-primary btn-lg hover-lift">
                    <i className="fas fa-cog me-2"></i>Account Settings
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="btn btn-royal-purple btn-lg hover-lift">
                  <i className="fas fa-sign-in-alt me-2"></i>Member Login
                </Link>
              )}
            </div>
            <div className="col-md-6">
              <div className="card hover-lift">
                <div className="card-body">
                  <h3 className="card-title text-royal-purple mb-4">
                    <i className="fas fa-link me-2"></i>Quick Links
                  </h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <a href="https://portal.sae.net/" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-credit-card me-2 text-gold"></i>Greek Bill Payments
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <i className="fas fa-home me-2 text-gold"></i>Housing Information
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <i className="fas fa-calendar me-2 text-gold"></i>Chapter Calendar
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Active Members Directory */}
      <section id="members-directory" className="members-directory py-5">
        <div className="container">
          <h2 className="section-header text-center mb-5 animate-fade-in">Active Members Directory</h2>
          
          {/* Enhanced Search and Filter Controls */}
          <div className="row mb-4 animate-fade-in-delay">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="position-relative">
                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by name, major, or role..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative">
                <i className="fas fa-filter position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <select
                  className="form-select ps-5"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="all">All Classes</option>
                  <option value="2025">Class of 2025</option>
                  <option value="2026">Class of 2026</option>
                  <option value="2027">Class of 2027</option>
                  <option value="2028">Class of 2028</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Results Summary */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="bg-white rounded p-3 shadow-sm">
                <p className="text-muted mb-0 fw-semibold">
                  <i className="fas fa-users me-2 text-royal-purple"></i>
                  Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, filteredMembers.length)} of {filteredMembers.length} members
                  {searchValue && ` matching "${searchValue}"`}
                  {classFilter !== 'all' && ` in Class of ${classFilter}`}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="lead text-royal-purple">Loading members...</p>
            </div>
          )}

          {/* Enhanced Members Grid */}
          {!loading && (
            <>
              <div className="row g-4 animate-fade-in">
                {currentMembers.map((member, index) => (
                  <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card h-100 hover-lift">
                      <div className="card-body text-center d-flex flex-column">
                        <div className="mb-3" style={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img
                            src={member.profilePicture || '/images/members/default-avatar.jpg'}
                            alt={member.name}
                            className="rounded-circle"
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              objectFit: 'cover',
                              minWidth: '80px',
                              minHeight: '80px'
                            }}
                            onError={(e) => {
                              e.target.src = '/images/members/default-avatar.jpg';
                            }}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-2 text-royal-purple">{member.name}</h5>
                          <p className="text-gold mb-2 fw-semibold">Class of {member.graduationYear}</p>
                          <p className="card-text mb-3">{member.major}</p>
                          <span className="badge bg-primary mb-3">{member.role}</span>
                          {member.linkedin && (
                            <div className="mt-auto">
                              <a 
                                href={member.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm hover-lift"
                              >
                                <i className="fab fa-linkedin me-1"></i> LinkedIn
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="row mt-5">
                  <div className="col-12">
                    <nav aria-label="Members pagination" className="animate-fade-in">
                      <ul className="pagination justify-content-center flex-wrap">
                        {/* Previous button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="fas fa-chevron-left me-1"></i> Previous
                          </button>
                        </li>

                        {/* Page numbers with ellipsis */}
                        {getPageNumbers().map((number, index) => (
                          <li key={index} className={`page-item ${number === '...' ? 'disabled' : ''} ${currentPage === number ? 'active' : ''}`}>
                            {number === '...' ? (
                              <span className="page-link">...</span>
                            ) : (
                              <button 
                                className="page-link" 
                                onClick={() => paginate(number)}
                              >
                                {number}
                              </button>
                            )}
                          </li>
                        ))}

                        {/* Next button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next <i className="fas fa-chevron-right ms-1"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && filteredMembers.length === 0 && (
            <div className="text-center py-5 animate-fade-in">
              <div className="bg-white rounded p-5 shadow-sm">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <p className="lead text-muted">No members found matching your search criteria.</p>
                <button 
                  className="btn btn-outline-primary" 
                  onClick={() => {
                    setSearchValue('');
                    setClassFilter('all');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced New Member Education Section */}
      <section className="new-member-edu py-5">
        <div className="container">
          <h2 className="section-header text-center mb-5 animate-fade-in">New Member Education</h2>
          <div className="row align-items-center animate-fade-in-delay">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="text-royal-purple mb-4">
                <i className="fas fa-graduation-cap me-2 text-gold"></i>
                The Path to Brotherhood
              </h3>
              <p className="lead mb-4">Our new member education program is designed to introduce potential members to the history, values, and traditions of Sigma Alpha Epsilon.</p>
              <div className="bg-white rounded p-4 shadow-sm">
                <p className="fw-semibold text-royal-purple mb-3">Through this program, new members will:</p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check text-gold me-2"></i>
                    Learn about SAE's rich history and traditions
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-gold me-2"></i>
                    Develop leadership and interpersonal skills
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-gold me-2"></i>
                    Build lasting relationships with brothers
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-gold me-2"></i>
                    Participate in community service and philanthropy
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative">
                <Carousel
                  controls={true}
                  indicators={true}
                  interval={null}
                  className="mb-3"
                >
                  <Carousel.Item>
                    <img
                      src="/images/new-member.jpg"
                      alt="New Member Education 1"
                      className="img-fluid rounded shadow-lg hover-lift"
                      style={{ width: '100%', height: '350px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/new-member2.jpg"
                      alt="New Member Education 2"
                      className="img-fluid rounded shadow-lg hover-lift"
                      style={{ width: '100%', height: '350px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/new-member3.jpg"
                      alt="New Member Education 3"
                      className="img-fluid rounded shadow-lg hover-lift"
                      style={{ width: '100%', height: '350px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </Carousel.Item>
                </Carousel>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-royal opacity-10 rounded" style={{ pointerEvents: 'none' }}></div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-muted fw-semibold" style={{ fontSize: '1rem' }}>
                  We proudly recognize the Fall 2024 new member class for their outstanding volunteer service at Blue Creek Baptist Church in Perry, FL. Their commitment to community was demonstrated through hands-on efforts to help clean and restore the church, reflecting the values of Sigma Alpha Epsilon.
                </p>
                <a
                  href="https://linktr.ee/FSUIFC?lt_utm_source=lt_share_link#476193446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-royal-purple btn-lg px-5 py-3 mt-3 hover-lift"
                >
                  <i className="fas fa-user-plus me-2"></i>
                  Register for Fall Rush 2025
                </a>
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

export default ActiveMembers;
