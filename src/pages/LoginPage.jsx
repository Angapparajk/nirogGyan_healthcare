import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('https://niroggyan-healthcare.onrender.com/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      let msg = err.response?.data?.message || 'Login failed.';
      if (err.response?.data?.error) {
        msg += ` (${err.response.data.error})`;
      }
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 3, boxShadow: '0 6px 32px 0 #2563eb18', p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2563eb', mb: 2, textAlign: 'center' }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required type="email" />
        <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required type="password" />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>Login</Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Register</a>
      </Box>
    </Box>
  );
};

export default LoginPage;
