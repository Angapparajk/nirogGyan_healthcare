import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const AppointmentForm = ({ doctor, doctorId, setDoctor, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ name: '', email: '', datetime: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const confirmationTimeoutRef = useRef();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (confirmationTimeoutRef.current) clearTimeout(confirmationTimeoutRef.current);
    };
  }, []);

  // Fetch doctor details if not already available
  useEffect(() => {
    if (!doctor && doctorId && setDoctor) {
      axios
        .get(`https://niroggyan-healthcare.onrender.com/api/doctors/${doctorId}`)
        .then(res => setDoctor(res.data))
        .catch(() => setDoctor(null));
    }
  }, [doctor, doctorId, setDoctor]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.datetime) {
      setError('All fields are required.');
      return;
    }

    setError('');
    try {
      const [date, time] = form.datetime.split('T');
      await axios.post('https://niroggyan-healthcare.onrender.com/api/appointments', {
        doctorId: doctor?._id || doctorId,
        patientName: form.name,
        patientEmail: form.email,
        appointmentDate: date,
        appointmentTime: time,
      });

      setSubmitted(true);
      setShowConfirmation(true);

      if (confirmationTimeoutRef.current) clearTimeout(confirmationTimeoutRef.current);
      confirmationTimeoutRef.current = setTimeout(() => {
        setShowConfirmation(false);
        setSubmitted(false);
        setForm({ name: '', email: '', datetime: '' });
        if (onSubmit) onSubmit(form);
      }, 5000);
    } catch (err) {
      if (err.response?.data?.message === 'This time slot is already booked') {
        setError('This doctor has an appointment at that time. Kindly book for some other time!');
      } else {
        setError(err.response?.data?.message || 'Failed to book appointment');
      }
    }
  };

  const confirmationOverlay = showConfirmation ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.18)',
        zIndex: 11000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 32px rgba(38,99,235,0.18)',
          padding: '40px 32px',
          minWidth: 320,
          maxWidth: '90vw',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#059669', mb: 2 }}>
          Appointment Booked!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your appointment with <b>{doctor?.name || 'the doctor'}</b> has been successfully booked.
        </Typography>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="appointment-form-container" style={{
        maxWidth: 420,
        margin: '40px auto',
        padding: '36px 32px 28px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 15,
      }}>
        <form className="appointment-form" onSubmit={handleSubmit} style={{ width: '100%'}} sx={{mt: 5, m: 0}}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2563eb', mb: 2, textAlign: 'center' }}>
            Book Appointment
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#222', mb: 3, textAlign: 'center' }}>
            with <b>{doctor?.name}</b>
          </Typography>
          <TextField
            label="Patient Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            helperText="We'll never share your email."
          />
          <TextField
            label="Date & Time"
            name="datetime"
            type="datetime-local"
            value={form.datetime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <div className="form-actions" style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Book
            </Button>
            <Button onClick={onCancel} variant="outlined" color="secondary" size="large">
              Cancel
            </Button>
          </div>
        </form>
      </div>
      {confirmationOverlay}
    </>
  );
};

export default AppointmentForm;