import React from 'react';
import './index.css';
import { Typography, Avatar, Button, Chip } from '@mui/material';

const DoctorProfile = ({ doctor, onBook }) => {
  if (!doctor) return null;
  const isAvailable = doctor.availability && doctor.availability.trim().toLowerCase() === 'available today';
  return (
    <div className="doctor-profile-details-layout">
      <Avatar src={doctor.profileImage} alt={doctor.name} className="doctor-profile-avatar-large" />
      <Typography variant="h4" className="doctor-profile-name">{doctor.name}</Typography>
      <Typography variant="h6" color="textSecondary" className="doctor-profile-specialization">{doctor.specialization}</Typography>
      <div className="doctor-profile-info-row">
        {doctor.email && <div className="doctor-profile-info doctor-profile-info-email"><strong>Email:</strong> {doctor.email}</div>}
        {doctor.phone && <div className="doctor-profile-info doctor-profile-info-phone"><strong>Phone:</strong> {doctor.phone}</div>}
      </div>
      <div className="doctor-profile-section">
        <Typography variant="h6" className="doctor-profile-section-title">Availability</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
          <Chip
            label={doctor.availability}
            className="doctor-profile-status-chip"
            sx={{
              fontWeight: 700,
              fontSize: '1.08rem',
              px: 2.5,
              py: 1.2,
              borderRadius: 2,
              background: doctor.availability === 'Available Today'
                ? 'linear-gradient(90deg, #059669 60%, #34d399 100%)'
                : doctor.availability === 'Fully Booked'
                ? 'linear-gradient(90deg, #ef4444 60%, #fca5a5 100%)'
                : 'linear-gradient(90deg, #f59e42 60%, #fde68a 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(5,150,105,0.10)',
              letterSpacing: 0.2,
              textTransform: 'capitalize',
              mb: 1
            }}
          />
        </div>
        <ul className="doctor-profile-availability-list">
          {doctor.availabilitySchedule && doctor.availabilitySchedule.length > 0 ? (
            doctor.availabilitySchedule.map((slot, idx) => (
              <li key={idx}>{slot}</li>
            ))
          ) : null}
        </ul>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onBook}
        className="book-btn"
        style={{ marginTop: 24, maxWidth: 320, alignSelf: 'center', opacity: isAvailable ? 1 : 0.5, pointerEvents: isAvailable ? 'auto' : 'none' }}
        disabled={!isAvailable}
      >
        Book Appointment
      </Button>
    </div>
  );
};

export default DoctorProfile;
