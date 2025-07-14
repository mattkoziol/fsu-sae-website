import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

function AlumniAccountSettings() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || ''
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

  // ✅ ADD: Missing handleFieldBlur function
  const handleFieldBlur = () => {
    setEditingField(null);
  };

  const handleSave = async () => {
    try {
      setMessage('Saving profile...');
      
      // Get the auth token
      const storedUser = JSON.parse(localStorage.getItem('user'));
      let token = localStorage.getItem('token');
      
      if (!token && storedUser?.tokens?.AccessToken) {
        token = storedUser.tokens.AccessToken;
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

      // ✅ FIX: Use API_BASE_URL instead of hardcoded localhost
      const response = await axios.put(`${API_BASE_URL}/api/auth/update-profile`, {
        email: user.email,
        name: formData.name
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // ✅ ADD: Complete the success handling
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
      
      setMessage('Error updating profile. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // ✅ ADD: Also clear token
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
              <h2 className="mb-0">Alumni Account Settings</h2>
              {hasChanges && (
                <button onClick={handleSave} className="btn btn-light btn-sm">
                  Save Changes
                </button>
              )}
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('Error') || message.includes('expired') ? 'alert-danger' : message.includes('Saving') ? 'alert-info' : 'alert-success'}`}>
                  {message}
                </div>
              )}

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

              <div className="d-flex justify-content-between mt-4">
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
                <div className="d-flex gap-2">
                  <Link to="/members/alumni" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Alumni
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

export default AlumniAccountSettings;