import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import DoctorList from '../../components/DoctorList';
import SearchBar from '../../components/SearchBar';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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

  // Always filter for available doctors
  let filteredDoctors = doctors
    .filter(doctor => doctor.availability && doctor.availability.trim().toLowerCase() === 'available today')
    .filter(doctor =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="landing-page">
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 24 }}>
        <h1 style={{
          fontWeight: 800,
          color: '#2563eb',
          fontSize: '2.5rem',
          marginBottom: 0,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          Available Doctors
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
            Book your appointment with top doctors instantly
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
          <Oval height={60} width={60} color="#2563eb" secondaryColor="#e0eaff" strokeWidth={5} ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <DoctorList style={{width:'100%', margin:'0 auto'}} doctors={filteredDoctors} onDoctorClick={doctor => navigate(`/doctor/${doctor._id}`)} />
      )}
    </div>
  );
};

export default LandingPage;
