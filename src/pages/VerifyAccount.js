import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) setEmail(emailFromUrl);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (res.ok) {
        // Redirect to login page after successful verification
        setMessage('Account verified! You can now log in.');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
        return;
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (err) {
      setMessage('Request failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
      <h2>Verify Your Account</h2>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Verify
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: message.includes('verified') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default VerifyAccount; 