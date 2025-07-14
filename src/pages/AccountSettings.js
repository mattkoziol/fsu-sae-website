// src/pages/AccountSettings.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

function AccountSettings() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    linkedin: '',
    major: '',
    graduationYear: ''
  });
  const [message, setMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        profilePicture: storedUser.profilePicture || '/images/members/default-avatar.jpg',
        linkedin: storedUser.linkedin || '',
        major: storedUser.major || '',
        graduationYear: storedUser.graduationYear || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleFieldClick = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  // Also update handleProfilePictureChange to use correct token
const handleProfilePictureChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image file is too large. Please select a smaller image (max 5MB).');
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      setUploading(true);
      setMessage('Uploading image...');

      // ✅ FIXED: Get correct token
      const storedUser = JSON.parse(localStorage.getItem('user'));
      let token = localStorage.getItem('token');
      
      if (!token && storedUser?.tokens?.AccessToken) {
        token = storedUser.tokens.AccessToken;
        localStorage.setItem('token', token);
      }

      // Create FormData for file upload
      const formDataUpload = new FormData();
      formDataUpload.append('profilePicture', file);

      // Upload to S3 via backend
      const response = await axios.post(`${API_BASE_URL}/api/upload/profile-picture`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // ✅ ADDED: Authorization header
        }
      });

      if (response.data.success) {
        // Update form data with S3 URL
        setFormData(prev => ({
          ...prev,
          profilePicture: response.data.fileUrl
        }));
        setHasChanges(true);
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error uploading image. Please try again.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        setMessage('Session expired. Please log in again.');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      setMessage('Error uploading image. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setUploading(false);
    }
  }
};

  // Fixed handleSave function in AccountSettings.js
const handleSave = async () => {
  try {
    setMessage('Saving profile...');
    
    // ✅ FIXED: Get Access Token from user object as fallback
    const storedUser = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    
    // If token from localStorage is not working, try getting Access Token from user object
    if (!token && storedUser?.tokens?.AccessToken) {
      token = storedUser.tokens.AccessToken;
      // Update localStorage with correct token for future use
      localStorage.setItem('token', token);
    }
    
    if (!token) {
      setMessage('Authentication token not found. Please log in again.');
      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/login';
      }, 2000);
      return;
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/auth/update-profile`,
      {
        email: user.email,
        ...formData
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      // Update localStorage with new user data
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setHasChanges(false);
      setMessage('Profile updated successfully!');
      setShowBackButton(true);
      setTimeout(() => setMessage(''), 5000);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Handle 401 Unauthorized specifically
    if (error.response?.status === 401) {
      setMessage('Session expired. Please log in again.');
      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/login';
      }, 2000);
      return;
    }
    
    if (error.response?.status === 413) {
      setMessage('Image file is too large. Please select a smaller image.');
    } else {
      setMessage('Error updating profile. Please try again.');
    }
    setTimeout(() => setMessage(''), 5000);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderEditableField = (fieldName, label, placeholder, type = 'text') => {
    const isEditing = editingField === fieldName;
    const value = formData[fieldName];

    if (isEditing) {
      return (
        <input
          type={type}
          name={fieldName}
          value={value}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleFieldBlur();
            }
          }}
          className="form-control"
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    return (
      <div 
        className="editable-field p-2 border rounded cursor-pointer"
        onClick={() => handleFieldClick(fieldName)}
        style={{ 
          minHeight: '38px', 
          cursor: 'pointer',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6'
        }}
      >
        {value || <span className="text-muted">{placeholder}</span>}
      </div>
    );
  };

  if (!user) {
    return <p>Loading account info...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Account Settings</h2>
              {hasChanges && (
                <button onClick={handleSave} className="btn btn-light btn-sm">
                  Save Changes
                </button>
              )}
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('Error') || message.includes('too large') ? 'alert-danger' : message.includes('Uploading') || message.includes('Saving') ? 'alert-info' : 'alert-success'}`}>
                  {message}
                </div>
              )}

              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <div 
                    className="position-relative d-inline-block"
                    onClick={() => !uploading && document.getElementById('profile-picture-input').click()}
                    style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
                  >
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'cover',
                        border: '3px solid #dee2e6',
                        opacity: uploading ? 0.6 : 1
                      }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-circle" 
                         style={{ 
                           backgroundColor: 'rgba(0,0,0,0.5)', 
                           opacity: 0,
                           transition: 'opacity 0.2s'
                         }}
                         onMouseEnter={(e) => !uploading && (e.target.style.opacity = 1)}
                         onMouseLeave={(e) => e.target.style.opacity = 0}
                    >
                      <i className="fas fa-camera text-white fs-4"></i>
                    </div>
                    {uploading && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Uploading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="profile-picture-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="d-none"
                    disabled={uploading}
                  />
                  <small className="text-muted d-block mt-1">
                    {uploading ? 'Uploading...' : 'Click image to change. Max 5MB.'}
                  </small>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Name</label>
                      {renderEditableField('name', 'Name', 'Enter your name')}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="form-control"
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Major</label>
                      {renderEditableField('major', 'Major', 'e.g., Computer Science')}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Graduation Year</label>
                      {renderEditableField('graduationYear', 'Graduation Year', 'e.g., 2025')}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">LinkedIn Profile</label>
                    {renderEditableField('linkedin', 'LinkedIn', 'https://linkedin.com/in/yourprofile', 'url')}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
                <div className="d-flex gap-2">
                  <Link to="/members/active" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Members
                  </Link>
                  {hasChanges && (
                    <button onClick={handleSave} className="btn btn-primary">
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p>© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>
    </div>
  );
}

export default AccountSettings;