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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        profilePicture: storedUser.profilePicture || '/images/sae-logo.png',
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

  // ✅ UPDATED: Enhanced file validation with HEIC support
  const validateFile = (file) => {
    console.log('🔍 File validation:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      lastModified: new Date(file.lastModified).toISOString()
    });

    // Check file size (10MB limit to accommodate HEIC files)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        message: `Image is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 10MB.`
      };
    }

    // Check for empty files
    if (file.size === 0) {
      return {
        valid: false,
        message: 'File appears to be empty or corrupted. Please try a different image.'
      };
    }

    // ✅ UPDATED: Accept HEIC/HEIF files from iPhones
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/heic',
      'image/heif'
    ];

    // Also check file extension as backup (some browsers don't detect HEIC MIME type correctly)
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'];
    const fileExtension = file.name.toLowerCase().split('.').pop();

    const typeValid = allowedTypes.includes(file.type.toLowerCase());
    const extensionValid = allowedExtensions.includes(fileExtension);

    if (!typeValid && !extensionValid) {
      return {
        valid: false,
        message: `File type "${file.type}" not supported. Please use JPEG, PNG, WebP, GIF, or HEIC (iPhone photos).`
      };
    }

    // Special message for HEIC files
    if (file.type.toLowerCase().includes('heic') || fileExtension === 'heic' || fileExtension === 'heif') {
      console.log('📱 HEIC file detected - will be converted to JPEG on upload');
    }

    return { valid: true };
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      console.log('📁 Selected file:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      });

      const validation = validateFile(file);
      if (!validation.valid) {
        setMessage(validation.message);
        setTimeout(() => setMessage(''), 5000);
        e.target.value = '';
        return;
      }

      setUploading(true);
      
      // Special message for HEIC files
      const isHeic = file.type.toLowerCase().includes('heic') || 
                     file.name.toLowerCase().endsWith('.heic') ||
                     file.name.toLowerCase().endsWith('.heif');
      
      if (isHeic) {
        setMessage('Processing iPhone photo...');
      } else {
        setMessage('Uploading image...');
      }

      // Get authentication token
      const storedUser = JSON.parse(localStorage.getItem('user'));
      let token = localStorage.getItem('token');
      
      if (!token && storedUser?.tokens?.AccessToken) {
        token = storedUser.tokens.AccessToken;
        localStorage.setItem('token', token);
      }

      if (!token) {
        setMessage('Authentication required. Please log in again.');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/login';
        }, 2000);
        return;
      }

      // Create FormData for file upload
      const formDataUpload = new FormData();
      formDataUpload.append('profilePicture', file);

      console.log('🚀 Starting upload to:', `${API_BASE_URL}/api/upload/profile-picture`);

      // Upload to S3 via backend
      const response = await axios.post(`${API_BASE_URL}/api/upload/profile-picture`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        timeout: 45000, // 45 second timeout for HEIC conversion
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (isHeic && percentCompleted < 100) {
            setMessage(`Processing iPhone photo... ${percentCompleted}%`);
          } else {
            setMessage(`Uploading... ${percentCompleted}%`);
          }
        }
      });

      console.log('✅ Upload response:', response.data);

      if (response.data.success) {
        // Update form data with S3 URL
        setFormData(prev => ({
          ...prev,
          profilePicture: response.data.fileUrl
        }));
        setHasChanges(true);
        
        // Success message with conversion info if applicable
        if (isHeic) {
          setMessage('iPhone photo processed and uploaded successfully!');
        } else {
          setMessage('Image uploaded successfully!');
        }
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.error('❌ Backend returned failure:', response.data);
        setMessage(`Upload failed: ${response.data.message || 'Unknown error from server'}`);
        setTimeout(() => setMessage(''), 5000);
      }

    } catch (error) {
      console.error('❌ Upload error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.code
      });

      // Check if file is HEIC for error messages
      const isHeicFile = file.type.toLowerCase().includes('heic') || 
                         file.name.toLowerCase().endsWith('.heic') ||
                         file.name.toLowerCase().endsWith('.heif');

      let errorMessage = 'Upload failed: ';

      // ✅ Enhanced error handling for HEIC and other issues
      if (error.code === 'ECONNABORTED') {
        if (isHeicFile) {
          errorMessage += 'iPhone photo processing timed out. The file may be too large or corrupted.';
        } else {
          errorMessage += 'Upload timed out. File may be too large or connection is slow.';
        }
      } else if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/login';
        }, 2000);
      } else if (error.response?.status === 413) {
        errorMessage += 'File is too large for the server. Try a smaller image.';
      } else if (error.response?.status === 400) {
        const serverMessage = error.response.data?.message || 'Invalid file or request.';
        if (serverMessage.includes('HEIC') || serverMessage.includes('iPhone')) {
          errorMessage += serverMessage + ' Try converting to JPEG first.';
        } else {
          errorMessage += serverMessage;
        }
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMessage += 'Network error. Check your connection and try again.';
      } else {
        errorMessage += error.response?.data?.message || error.message || 'Unknown error occurred.';
      }

      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 8000);

    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Save function remains the same
  const handleSave = async () => {
    try {
      setMessage('Saving profile...');
      
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

      console.log('💾 Saving profile data:', formData);

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
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setHasChanges(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(`Save failed: ${response.data.message || 'Unknown error'}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      
      if (error.response?.status === 401) {
        setMessage('Session expired. Please log in again.');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      setMessage(`Error updating profile: ${error.response?.data?.message || error.message}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading account info...</p>
      </div>
    );
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
                  <i className="fas fa-save me-1"></i>
                  Save Changes
                </button>
              )}
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${
                  message.includes('Error') || message.includes('failed') || message.includes('too large') || message.includes('not supported') || message.includes('timed out')
                    ? 'alert-danger' 
                    : message.includes('Processing') || message.includes('Uploading') || message.includes('Saving') 
                    ? 'alert-info' 
                    : 'alert-success'
                } alert-dismissible fade show`}>
                  <i className={`fas ${
                    message.includes('Error') || message.includes('failed') || message.includes('timed out')
                      ? 'fa-exclamation-triangle' 
                      : message.includes('success') || message.includes('successfully')
                      ? 'fa-check-circle' 
                      : 'fa-info-circle'
                  } me-2`}></i>
                  {message}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMessage('')}
                  ></button>
                </div>
              )}

              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  {/* ✅ UPDATED: Enhanced upload UI with iPhone support info */}
                  <div className="mb-3">
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
                        onError={(e) => {
                          e.target.src = '/images/sae-logo.png';
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
                  </div>
                  
                  {/* ✅ UPDATED: File input with HEIC support */}
                  <input
                    id="profile-picture-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif"
                    onChange={handleProfilePictureChange}
                    className="d-none"
                    disabled={uploading}
                  />
                  
                  <div className="text-muted small">
                    {uploading ? (
                      <div>
                        <i className="fas fa-spinner fa-spin me-1"></i>
                        {message.includes('Processing') ? 'Processing...' : 'Uploading...'}
                      </div>
                    ) : (
                      <div>
                        <div><strong>Click image to change</strong></div>
                        <div>Max 10MB</div>
                        <div>JPEG, PNG, WebP, GIF, HEIC</div>
                        <div className="text-info">
                          <i className="fas fa-mobile-alt me-1"></i>
                          iPhone photos supported
                        </div>
                      </div>
                    )}
                  </div>
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
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
                <div className="d-flex gap-2">
                  <Link to="/members/active" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Members
                  </Link>
                  {hasChanges && (
                    <button onClick={handleSave} className="btn btn-primary">
                      <i className="fas fa-save me-2"></i>
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