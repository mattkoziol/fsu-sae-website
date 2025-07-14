import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 20 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0); // Reset on text change
    if (!text) return;
    const interval = setInterval(() => {
      setIndex(prev => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p style={{
      fontFamily: 'serif',
      fontSize: '1.2rem',
      lineHeight: 1.7,
      maxWidth: 800,
      margin: '40px auto',
      whiteSpace: 'pre-line',
      letterSpacing: '0.01em',
      color: '#582C83'
    }}>
      {text.slice(0, index)}
    </p>
  );
};

export default Typewriter;
