// src/services/api.js
// Centralized API service for FSU SAE frontend

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  MEMBERS: `${API_BASE_URL}/api/auth/members`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/auth/update-profile`,
  
  // Upload endpoints
  UPLOAD_PROFILE_PICTURE: `${API_BASE_URL}/api/upload/profile-picture`,
  
  // Alumni endpoints
  ALUMNI_RSVP: `${API_BASE_URL}/api/alumni/rsvp`,
  ALUMNI_RSVP_LIST: `${API_BASE_URL}/api/alumni/rsvp-list`,
  
  // Newsletter
  NEWSLETTER_SUBSCRIBE: `${API_BASE_URL}/api/newsletter/subscribe`
};

// Helper to get auth token from localStorage
const getAuthToken = () => {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  let token = localStorage.getItem('token');
  
  // Fallback to Access Token from user object if token not in localStorage
  if (!token && storedUser?.tokens?.AccessToken) {
    token = storedUser.tokens.AccessToken;
    localStorage.setItem('token', token);
  }
  
  return token;
};

// Helper to create headers with auth token
const createAuthHeaders = (additionalHeaders = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// HTTP client with consistent error handling
export const apiClient = {
  get: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: createAuthHeaders(options.headers),
        ...options
      });
      return response;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  
  post: async (url, data, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: createAuthHeaders(options.headers),
        body: JSON.stringify(data),
        ...options
      });
      return response;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },
  
  put: async (url, data, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: createAuthHeaders(options.headers),
        body: JSON.stringify(data),
        ...options
      });
      return response;
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },
  
  delete: async (url, data = null, options = {}) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: createAuthHeaders(options.headers),
        ...options
      };
      
      if (data) {
        requestOptions.body = JSON.stringify(data);
      }
      
      const response = await fetch(url, requestOptions);
      return response;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  },

  // Special method for file uploads (multipart/form-data)
  uploadFile: async (url, formData, options = {}) => {
    try {
      const token = getAuthToken();
      const headers = {
        ...options.headers
        // Don't set Content-Type for FormData - browser will set it with boundary
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        ...options
      });
      return response;
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  }
};

// Specific API service functions for common operations
export const authService = {
  signup: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.SIGNUP, userData);
    return response.json();
  },
  
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    return response.json();
  },
  
  verify: async (verificationData) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY, verificationData);
    return response.json();
  },
  
  getMembers: async () => {
    const response = await apiClient.get(API_ENDPOINTS.MEMBERS);
    return response.json();
  },
  
  updateProfile: async (profileData) => {
    const response = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
    return response.json();
  }
};

export const uploadService = {
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await apiClient.uploadFile(API_ENDPOINTS.UPLOAD_PROFILE_PICTURE, formData);
    return response.json();
  }
};

export const alumniService = {
  rsvp: async (rsvpData) => {
    const response = await apiClient.post(API_ENDPOINTS.ALUMNI_RSVP, rsvpData);
    return response.json();
  },
  
  unRsvp: async (rsvpData) => {
    const response = await apiClient.delete(API_ENDPOINTS.ALUMNI_RSVP, rsvpData);
    return response.json();
  },
  
  getRsvpList: async (eventKey) => {
    const response = await apiClient.get(`${API_ENDPOINTS.ALUMNI_RSVP_LIST}?event=${eventKey}`);
    return response.json();
  }
};

export const newsletterService = {
  subscribe: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.NEWSLETTER_SUBSCRIBE, { email });
    return response.json();
  }
};

// Export environment info for debugging
export const ENV_INFO = {
  API_BASE_URL,
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  AWS_REGION: process.env.REACT_APP_AWS_REGION,
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};

// Log environment info in development
if (process.env.NODE_ENV === 'development') {
  console.log('API Service Environment:', ENV_INFO);
}