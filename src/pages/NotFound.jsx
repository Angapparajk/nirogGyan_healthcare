import React from 'react';
import { Button, Typography } from '@mui/material';
import notfound from '../assets/notfound.jpeg';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f6fa',
      textAlign: 'center',
      padding: '0 16px',
    }}>
      <img
        src={notfound}
        alt="Not Found"
        style={{ width: 220, maxWidth: '80vw', marginBottom: 18, borderRadius: 18, boxShadow: '0 4px 18px 0 #2563eb18' }}
      />
      <h1 style={{
        fontWeight: 800,
        color: '#2563eb',
        fontSize: '2.1rem',
        marginBottom: 0,
        letterSpacing: 0.5,
        textAlign: 'center',
      }}>
        Page Not Found
      </h1>
      {/* Accent bar */}
      <div style={{
        width: 60,
        height: 6,
        background: 'linear-gradient(90deg, #2563eb 0%, #059669 100%)',
        borderRadius: 8,
        margin: '10px auto 18px auto',
      }} />
      <Typography variant="body1" sx={{ mb: 3, color: '#059669', fontWeight: 500 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{
          fontWeight: 700,
          fontSize: '1.08rem',
          borderRadius: 3,
          boxShadow: '0 2px 12px 0 #2563eb22',
          background: 'linear-gradient(90deg, #2563eb 60%, #059669 100%)',
          color: '#fff',
          px: 4,
          py: 1.2,
          mt: 1,
          '&:hover': {
            boxShadow: '0 4px 18px 0 #2563eb33',
            background: 'linear-gradient(90deg, #2563eb 80%, #059669 100%)',
          },
        }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
