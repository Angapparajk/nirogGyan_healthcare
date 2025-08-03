import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import DoctorList from '../../components/DoctorList';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('https://niroggyan-healthcare.onrender.com/api/doctors')
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setDoctors([]);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const available = filteredDoctors.filter(d => d.availability && d.availability.trim().toLowerCase() === 'available today');
  const fullyBooked = filteredDoctors.filter(d => d.availability && d.availability.trim().toLowerCase() === 'fully booked');
  const onLeave = filteredDoctors.filter(d => d.availability && d.availability.trim().toLowerCase() === 'on leave');

  return (
    <div className="doctors-page">
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 24 }}>
        <h1 style={{
          fontWeight: 800,
          color: '#2563eb',
          fontSize: '2.5rem',
          marginBottom: 0,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          All Doctors
        </h1>
        {/* Accent bar */}
        <div style={{
          width: 80,
          height: 7,
          background: 'linear-gradient(90deg, #2563eb 0%, #059669 100%)',
          borderRadius: 8,
          margin: '10px auto 18px auto',
        }} />
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ color: '#059669', fontWeight: 500, fontSize: '1.15rem' }}>
            Find the right doctor for your needs
          </span>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px 0 #2563eb18',
          padding: '18px 18px 10px 18px',
          margin: '0 auto 32px auto',
          maxWidth: 520,
        }}>
          <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </div>
      ) : (
        <>
          {available.length > 0 && <>
            <h2 style={{ color: '#059669', fontWeight: 700, marginTop: 18, marginBottom: 8, letterSpacing: 0.2 }}>Available Doctors</h2>
            <DoctorList doctors={available} onDoctorClick={doctor => navigate(`/doctor/${doctor._id}`)} />
          </>}
          {fullyBooked.length > 0 && <>
            <h2 style={{ color: '#ef4444', fontWeight: 700, marginTop: 18, marginBottom: 8, letterSpacing: 0.2 }}>Fully Booked</h2>
            <DoctorList doctors={fullyBooked} onDoctorClick={doctor => navigate(`/doctor/${doctor._id}`)} />
          </>}
          {onLeave.length > 0 && <>
            <h2 style={{ color: '#f59e42', fontWeight: 700, marginTop: 18, marginBottom: 8, letterSpacing: 0.2 }}>On Leave</h2>
            <DoctorList doctors={onLeave} onDoctorClick={doctor => navigate(`/doctor/${doctor._id}`)} />
          </>}
        </>
      )}
    </div>
  );
};

export default DoctorsPage;
