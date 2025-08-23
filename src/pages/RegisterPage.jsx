import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const RegisterPage = ({ onRegister }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'name' && /\d/.test(value)) {
      setError('Numbers are not allowed in the name field.');
    } else if (name === 'name') {
      setError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (/\d/.test(form.name)) {
      setError('Numbers are not allowed in the name field.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
  const res = await axios.post('https://niroggyan-healthcare.onrender.com/api/users/register', form);
      setSuccess('Registration successful! Redirecting to login...');
      setForm({ name: '', email: '', password: '' });
      if (onRegister) onRegister();
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 3, boxShadow: '0 6px 32px 0 #2563eb18', p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2563eb', mb: 2, textAlign: 'center' }}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required type="email" />
        <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required type="password" />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>Register</Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Login</a>
      </Box>
    </Box>
  );
};

export default RegisterPage;
