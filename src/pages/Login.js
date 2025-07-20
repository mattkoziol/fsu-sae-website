// Login.js - MINIMAL changes, just replace the hardcoded URLs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Add this simple API URL helper at the top
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    inviteCode: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // ONLY CHANGE: Replace hardcoded URLs with environment variable
      const endpoint = isSignup
        ? `${API_BASE_URL}/api/auth/signup`
        : `${API_BASE_URL}/api/auth/login`;
      
      const payload = isSignup
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            inviteCode: formData.inviteCode
          }
        : {
            email: formData.email,
            password: formData.password
          };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (!isSignup) {
          // ✅ Keep your existing working logic
          if (data.tokens && data.tokens.AccessToken) {
            localStorage.setItem('token', data.tokens.AccessToken);
          }
          localStorage.setItem('user', JSON.stringify(data));
          console.log('Login: set user', data);
        }
        
        if (isSignup) {
          navigate(`/verify?email=${encodeURIComponent(formData.email)}`);
          return;
        } else {
          if (data.role === 'alumni') {
            navigate('/members/alumni', { replace: true });
          } else {
            navigate('/members/active', { replace: true });
          }
          return;
        }
      } else {
        setMessage(data.message || data.error || (isSignup ? 'Signup failed' : 'Login failed'));
      }
    } catch (err) {
      console.error(err);
      setMessage('Request failed. Please check server and network.');
    }
  };

  // Rest of your component remains EXACTLY the same...
  return (
    <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
      <h2>{isSignup ? 'Create Account' : 'Member Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <div style={{ position: 'relative', width: '100%', marginBottom: '10px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4B306A',
              fontSize: '1.2em',
              padding: 0
            }}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {isSignup && (
          <div style={{ marginBottom: '10px', fontSize: '0.95em', color: '#4B306A', background: '#f8f9fa', border: '1px solid #916f41', borderRadius: '6px', padding: '10px' }}>
            <strong>Password requirements:</strong>
            <ul style={{ margin: '8px 0 0 18px', padding: 0, fontSize: '0.95em', color: '#4B306A' }}>
              <li>Minimum 8 characters</li>
              <li>At least one uppercase letter (A-Z)</li>
              <li>At least one lowercase letter (a-z)</li>
              <li>At least one number (0-9)</li>
              <li>At least one special character (e.g., !@#$%^&amp;*)</li>
            </ul>
          </div>
        )}
        {isSignup && (
          <input
            type="text"
            name="inviteCode"
            placeholder="Invite Code"
            value={formData.inviteCode}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        )}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        {isSignup ? (
          <>
            Already have an account?{' '}
            <button type="button" onClick={() => setIsSignup(false)} style={{ border: 'none', background: 'none', color: '#582C83', textDecoration: 'underline', cursor: 'pointer' }}>
              Log In
            </button>
          </>
        ) : (
          <>
            Need an account?{' '}
            <button type="button" onClick={() => setIsSignup(true)} style={{ border: 'none', background: 'none', color: '#582C83', textDecoration: 'underline', cursor: 'pointer' }}>
              Sign Up
            </button>
          </>
        )}
      </div>
      
      {message && (
        message.includes('not verified') ? (
          <p style={{ marginTop: '20px', color: 'red' }}>
            {message} <br />
            <a href={`/verify?email=${encodeURIComponent(formData.email)}`}>Verify your account</a>
          </p>
        ) : (
          <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>
        )
      )}
      
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p>© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;