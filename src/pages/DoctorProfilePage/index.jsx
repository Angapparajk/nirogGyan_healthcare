import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import DoctorProfile from '../../components/DoctorProfile';
import './index.css';
import axios from 'axios';

const DoctorProfilePage = ({ doctorId, doctor, setDoctor, onBook }) => {
  const [loading, setLoading] = useState(!doctor);
  useEffect(() => {
    if (!doctor && doctorId) {
      setLoading(true);
      axios.get(`https://niroggyan-healthcare.onrender.com/api/doctors/${doctorId}`)
        .then(res => {
          setDoctor(res.data);
          setLoading(false);
        })
        .catch(() => {
          setDoctor(null);
          setLoading(false);
        });
    }
  }, [doctor, doctorId, setDoctor]);

  return (
    <div className="doctor-profile-page">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </div>
      ) : (
        <DoctorProfile doctor={doctor} onBook={onBook} />
      )}
    </div>
  );
};

export default DoctorProfilePage;
