import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
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
          <Oval height={60} width={60} color="#2563eb" secondaryColor="#e0eaff" strokeWidth={5} ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <DoctorProfile doctor={doctor} onBook={onBook} />
      )}
    </div>
  );
};

export default DoctorProfilePage;
