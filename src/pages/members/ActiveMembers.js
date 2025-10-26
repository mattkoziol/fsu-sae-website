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
  const [cardsPerPage, setCardsPerPage] = useState(12); // Default to 12
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Sample events data - you can replace this with data from your backend
  const events = [
    {
      id: 1,
      title: "Formal Chapter Meeting",
      date: "2025-09-24",
      time: "8:00 PM",
      location: "Dunlap 2201",
      description: "Formal chapter with Dr. Mack."
    },
    {
      id: 2,
      title: "Date Function",
      date: "2025-10-01",
      time: "8:00 PM",
      location: "House",
      description: "TORO theme date function at Derd"
    },
    {
      id: 3,
      title: "Tailgate",
      date: "2025-10-04",
      time: "4:00 PM",
      location: "HOUSE",
      description: "MIAMI VS FSU TAILGATE"
    },
    {
      id: 4,
      title: "Champs Chance",
      date: "2025-10-07",
      time: "7:00 PM",
      location: "HOUSE",
      description: "Fundraiser - Dog shelter foster event"
    },
    {
      id: 5,
      title: "Tailgate",
      date: "2025-10-11",
      time: "TBD",
      location: "HOUSE",
      description: "FSU VS PITT TAILGATE"
    },
    {
      id: 6,
      title: "SAEFARI",
      date: "2025-10-24",
      time: "10:00 PM",
      location: "HOUSE",
      description: "SAEBIZA"
    },
    {
      id: 7,
      title: "Tailgate",
      date: "2025-11-01",
      time: "TBD",
      location: "HOUSE",
      description: "FSU VS WAKE FOREST TAILGATE"
    },
    {
      id: 8,
      title: "Date Function",
      date: "2025-10-15",
      time: "8:00 PM",
      location: "HOUSE",
      description: "Kentucky Derby theme DF at Bowdens"
    },
    {
      id: 9,
      title: "Tailgate",
      date: "2025-11-15",
      time: "TBD",
      location: "HOUSE",
      description: "FSU VS Virginia Tech TAILGATE"
    },
    {
      id: 10,
      title: "FORMAL",
      date: "2025-11-21",
      time: "ALL DAY",
      location: "NOLA",
      description: "NOLA FORMAL"
    },
    {
      id: 11,
      title: "FORMAL",
      date: "2025-11-22",
      time: "ALL DAY",
      location: "NOLA",
      description: "NOLA FORMAL"
    },
    {
      id: 12,
      title: "FORMAL",
      date: "2025-11-23",
      time: "ALL DAY",
      location: "NOLA",
      description: "NOLA FORMAL"
    },
    {
      id: 13,
      title: "Date Function",
      date: "2025-11-05",
      time: "7:00 PM - 11:00 PM",
      location: "Recess",
      description: "Date Function - Theme TBD"
    },
    {
      id: 14,
      title: "Peak Pulse Run Club",
      date: "2025-10-26",
      time: "2:00 PM",
      location: "House",
      description: "Peak Pulse Run Club"
    },
    {
      id: 15,
      title: "Chapter",
      date: "2025-10-27",
      time: "TBD",
      location: "House",
      description: "Chapter Meeting"
    }
  ];

  // Calendar helper functions
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Dynamically set cardsPerPage based on screen size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCardsPerPage(6); // Mobile: 6 per page
      } else {
        setCardsPerPage(12); // Desktop/tablet: 12 per page
      }
    }
    handleResize(); // Set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch members from backend
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
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
  }, []);

  // ✅ UPDATED: Filter and sort members - prioritize those with uploaded profile pictures
  const filteredMembers = members
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                           member.major.toLowerCase().includes(searchValue.toLowerCase()) ||
                           member.role.toLowerCase().includes(searchValue.toLowerCase());
      const matchesClass = classFilter === 'all' || member.graduationYear === classFilter;
      const isActiveMember = member.role !== 'alumni'; // Only show active members, not alumni
      return matchesSearch && matchesClass && isActiveMember;
    })
    // ✅ NEW: Sort by profile picture status, then by name
    .sort((a, b) => {
      // Check if members have uploaded profile pictures (not default logo)
      const aHasCustomPic = a.profilePicture && 
                           !a.profilePicture.includes('sae-logo.png') && 
                           !a.profilePicture.includes('default-avatar.jpg') &&
                           a.profilePicture !== '/images/sae-logo.png' &&
                           a.profilePicture !== '/images/members/default-avatar.jpg';
      
      const bHasCustomPic = b.profilePicture && 
                           !b.profilePicture.includes('sae-logo.png') && 
                           !b.profilePicture.includes('default-avatar.jpg') &&
                           b.profilePicture !== '/images/sae-logo.png' &&
                           b.profilePicture !== '/images/members/default-avatar.jpg';
      
      // Sort: Custom pics first, then default pics
      if (aHasCustomPic && !bHasCustomPic) return -1;
      if (!aHasCustomPic && bHasCustomPic) return 1;
      
      // If both have same pic status, sort alphabetically by name
      return a.name.localeCompare(b.name);
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
      <style jsx>{`
        .calendar-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .calendar {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .calendar-header {
          background: #6f42c1;
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }
        
        .calendar-weekday {
          padding: 10px 5px;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: #6c757d;
        }
        
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        
        .calendar-day {
          padding: 12px 8px;
          text-align: center;
          cursor: pointer;
          border-right: 1px solid #dee2e6;
          border-bottom: 1px solid #dee2e6;
          position: relative;
          transition: all 0.2s ease;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        
        .calendar-day:hover {
          background-color: #e9ecef;
        }
        
        .calendar-day.other-month {
          color: #adb5bd;
          background-color: #f8f9fa;
        }
        
        .calendar-day.today {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }
        
        .calendar-day.has-event {
          background-color: #28a745;
          color: white;
          font-weight: bold;
        }
        
        .calendar-day.has-event:hover {
          background-color: #218838;
        }
        
        .event-indicator {
          width: 6px;
          height: 6px;
          background-color: #ffc107;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          right: 4px;
        }
        
        .event-tooltip {
          position: fixed;
          background: white;
          border: 2px solid #6f42c1;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          z-index: 9999;
          max-width: 350px;
          min-width: 280px;
          pointer-events: none;
          font-size: 14px;
          line-height: 1.5;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .event-tooltip::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
        }
      `}</style>
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
                  <h4 className="mb-3" style={{ color: '#916f41', fontWeight: 700 }}>
                    <i className="fas fa-handshake me-2"></i>
                    Welcome Brother {user.name.split(' ')[0]}
                  </h4>
                  <Link to="/account" className="btn btn-royal-purple btn-lg hover-lift">
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
                    <i className="fas fa-calendar me-2"></i>Events Calendar
                  </h3>
                  <div className="calendar-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="calendar">
                      <div className="calendar-header">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <h5 className="mb-0 text-center flex-grow-1">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h5>
                        <button 
                          className="btn btn-sm btn-outline-primary ms-2"
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                      <div className="calendar-grid">
                        <div className="calendar-weekdays">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="calendar-weekday">{day}</div>
                          ))}
                        </div>
                        <div className="calendar-days">
                          {getCalendarDays().map((day, index) => {
                            const hasEvent = events.some(event => {
                              // Create date in local timezone to avoid timezone issues
                              const eventDate = new Date(event.date + 'T00:00:00');
                              return eventDate.toDateString() === day.toDateString();
                            });
                            const isToday = day.toDateString() === new Date().toDateString();
                            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                            
                            return (
                              <div 
                                key={index}
                                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
                                onClick={() => hasEvent && setSelectedEvent(events.find(event => {
                                  const eventDate = new Date(event.date + 'T00:00:00');
                                  return eventDate.toDateString() === day.toDateString();
                                }))}
                                onMouseEnter={(e) => {
                                  if (hasEvent) {
                                    setMousePosition({ x: e.clientX, y: e.clientY });
                                    setHoveredEvent(events.find(event => {
                                      const eventDate = new Date(event.date + 'T00:00:00');
                                      return eventDate.toDateString() === day.toDateString();
                                    }));
                                  }
                                }}
                                onMouseLeave={() => setHoveredEvent(null)}
                              >
                                {day.getDate()}
                                {hasEvent && <div className="event-indicator"></div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Event Details Tooltip */}
                    {hoveredEvent && (
                      <div className="event-tooltip">
                        <div className="mb-3">
                          <h5 className="text-royal-purple mb-0 fw-bold">
                            <i className="fas fa-calendar-alt me-2"></i>
                            {hoveredEvent.title}
                          </h5>
                        </div>
                        
                        <div className="mb-2">
                          <i className="fas fa-calendar-day text-gold me-2"></i>
                          <span className="fw-semibold">
                            {new Date(hoveredEvent.date + 'T00:00:00').toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        {hoveredEvent.time && hoveredEvent.time !== 'TBD' && (
                          <div className="mb-2">
                            <i className="fas fa-clock text-gold me-2"></i>
                            <span className="fw-semibold">{hoveredEvent.time}</span>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <i className="fas fa-map-marker-alt text-gold me-2"></i>
                          <span className="fw-semibold">{hoveredEvent.location}</span>
                        </div>
                        
                        <div className="border-top pt-2">
                          <p className="text-muted mb-0 fw-medium">
                            {hoveredEvent.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
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
                            src={member.profilePicture || '/images/sae-logo.png'}
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
                              e.target.src = '/images/sae-logo.png';
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