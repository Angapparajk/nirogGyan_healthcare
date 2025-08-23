
import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import failureimage from '../../assets/failureimage.jpeg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import './index.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editTime, setEditTime] = useState('');
  const [editDate, setEditDate] = useState('');
  const handleEditClick = (appt) => {
    setEditId(appt._id);
    setEditTime(appt.appointmentTime);
    setEditDate(appt.appointmentDate ? new Date(appt.appointmentDate).toISOString().slice(0, 10) : '');
    setEditOpen(true);
  };

  const handleEditSave = async () => {
  const token = Cookies.get('token');
    try {
      await axios.put(`https://niroggyan-healthcare.onrender.com/api/appointments/${editId}`, {
        appointmentTime: editTime,
        appointmentDate: editDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appts => appts.map(a => a._id === editId ? { ...a, appointmentTime: editTime, appointmentDate: editDate } : a));
      setEditOpen(false);
      setEditId(null);
      setEditTime('');
      setEditDate('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update appointment');
      setEditOpen(false);
      setEditId(null);
      setEditTime('');
      setEditDate('');
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditId(null);
    setEditTime('');
    setEditDate('');
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
  const token = Cookies.get('token');
    let email = '';
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        email = payload.email;
      } catch (e) {}
    }
    if (!email) {
      setError('User email not found in token.');
      setLoading(false);
      setApiError(true);
      return;
    }
    axios.get(`https://niroggyan-healthcare.onrender.com/api/appointments/patient/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
        setApiError(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        setLoading(false);
        setApiError(true);
      });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
  const token = Cookies.get('token');
    try {
      await axios.delete(`https://niroggyan-healthcare.onrender.com/api/appointments/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appts => appts.filter(a => a._id !== deleteId));
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete appointment');
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="appointments-page">
      <Box sx={{ maxWidth: 900, margin: '0 auto', mb: 3}}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563eb', mb: 0.5, mt: 4,mr:1.5, textAlign: 'center', letterSpacing: 0.5 }}>
          Appointments
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#059669', mb: 3, textAlign: 'center', fontWeight: 500, mr: 2.8}}>
          View all your booked appointments in one place
        </Typography>
      </Box>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </div>
      )}
      {apiError && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <img src={failureimage} alt="Failed to load" style={{ width: 180, marginBottom: 18, borderRadius: 16, boxShadow: '0 2px 12px #2563eb18' }} />
          <h2 style={{ color: '#e53935', fontWeight: 700 }}>Failed to load appointments</h2>
          <div style={{ color: '#888', fontWeight: 500 }}>Please try again later.</div>
        </div>
      )}
      {!loading && !apiError && appointments.length === 0 && (
        <Typography sx={{ color: '#888', mt: 2 }}>No appointments found.</Typography>
      )}
      {!loading && !apiError && appointments.length > 0 && (
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
                    <td>
                      <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(appt)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(appt._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
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
                marginLeft: 0,
                marginRight: '24px',
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
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
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(appt)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(appt._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
      {/* Edit appointment date & time dialog */}
      <Dialog open={editOpen} onClose={handleEditCancel}>
        <DialogTitle>Edit Appointment Date & Time</DialogTitle>
        <DialogContent>
          <TextField
            label="Appointment Date"
            type="date"
            value={editDate}
            onChange={e => setEditDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Appointment Time"
            type="time"
            value={editTime}
            onChange={e => setEditTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this appointment?</DialogTitle>
        <DialogContent>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Yes, Confirm</Button>
        </DialogActions>
      </Dialog>
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
