import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import failureimage from '../../assets/failureimage.jpeg';
import DoctorProfile from '../../components/DoctorProfile';
import './index.css';
import axios from 'axios';

const DoctorProfilePage = ({ doctorId, doctor, setDoctor, onBook }) => {
  const [loading, setLoading] = useState(!doctor);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    if (!doctor && doctorId) {
      setLoading(true);
      axios.get(`https://niroggyan-healthcare.onrender.com/api/doctors/${doctorId}`)
        .then(res => {
          setDoctor(res.data);
          setLoading(false);
          setApiError(false);
        })
        .catch(() => {
          setDoctor(null);
          setLoading(false);
          setApiError(true);
        });
    }
  }, [doctor, doctorId, setDoctor]);

  return (
    <div className="doctor-profile-page">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </div>
      ) : apiError ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <img src={failureimage} alt="Failed to load" style={{ width: 180, marginBottom: 18, borderRadius: 16, boxShadow: '0 2px 12px #2563eb18' }} />
          <h2 style={{ color: '#e53935', fontWeight: 700 }}>Failed to load doctor details</h2>
          <div style={{ color: '#888', fontWeight: 500 }}>Please try again later.</div>
        </div>
      ) : (
        <DoctorProfile doctor={doctor} onBook={onBook} />
      )}
    </div>
  );
};

export default DoctorProfilePage;
