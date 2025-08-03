
import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import './index.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://niroggyan-healthcare.onrender.com/api/appointments')
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch appointments');
        setLoading(false);
      });
  }, []);

  return (
    <div className="appointments-page">
      <Box sx={{ maxWidth: 900, margin: '0 auto', mb: 3}}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563eb', mb: 0.5, mt: 2, textAlign: 'center', letterSpacing: 0.5 }}>
          Appointments
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#059669', mb: 3, textAlign: 'center', fontWeight: 500 }}>
          View all your booked appointments in one place
        </Typography>
      </Box>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </div>
      )}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {!loading && !error && appointments.length === 0 && (
        <Typography sx={{ color: '#888', mt: 2 }}>No appointments found.</Typography>
      )}
      {!loading && !error && appointments.length > 0 && (
        <>
          {/* Table for desktop, cards for mobile */}
          <div className="appointments-table-container appointments-table-desktop" style={{
            borderRadius: 20,
            boxShadow: '0 6px 32px 0 #2563eb18',
            padding: 0,
            overflow: 'hidden',
            position: 'relative',
            marginTop: 18,
            marginBottom: 18,
            background: '#fff',
          }}>
            {/* Accent bar */}
            <div style={{
              width: '100%',
              height: 8,
              background: 'linear-gradient(90deg, #2563eb 0%, #059669 100%)',
              marginBottom: 0,
            }} />
            <table className="appointments-table" style={{ background: '#fff', borderRadius: 0 }}>
              <thead>
                <tr>
                  <th style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: 15, letterSpacing: 0.5, background: '#f5f6fa' }}>Doctor</th>
                  <th style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: 15, letterSpacing: 0.5, background: '#f5f6fa' }}>Patient Name</th>
                  <th style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: 15, letterSpacing: 0.5, background: '#f5f6fa' }}>Email</th>
                  <th style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: 15, letterSpacing: 0.5, background: '#f5f6fa' }}>Date</th>
                  <th style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: 15, letterSpacing: 0.5, background: '#f5f6fa' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.doctorId?.name || '-'}</td>
                    <td>{appt.patientName}</td>
                    <td>{appt.patientEmail}</td>
                    <td>{appt.appointmentDate ? new Date(appt.appointmentDate).toLocaleDateString() : '-'}</td>
                    <td>{appt.appointmentTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="appointments-cards-mobile">
            {appointments.map((appt) => (
              <div className="appointment-card" key={appt._id} style={{
                borderRadius: 16,
                boxShadow: '0 4px 18px 0 #2563eb18',
                background: '#fff',
                margin: '20px',
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
                marginRight:'25px',
              }}>
                {/* Accent bar */}
                <div style={{
                  width: '100%',
                  height: 6,
                  background: 'linear-gradient(90deg, #2563eb 0%, #059669 100%)',
                  marginBottom: 0,
                }} />
                <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8, marginRight: '5px' }}>
                  <div><strong style={{ color: '#2563eb' }}>Doctor:</strong> {appt.doctorId?.name || '-'}</div>
                  <div><strong style={{ color: '#059669' }}>Patient Name:</strong> {appt.patientName}</div>
                  <div><strong>Email:</strong> {appt.patientEmail}</div>
                  <div><strong>Date:</strong> {appt.appointmentDate ? new Date(appt.appointmentDate).toLocaleDateString() : '-'}</div>
                  <div><strong>Time:</strong> {appt.appointmentTime}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsPage;
