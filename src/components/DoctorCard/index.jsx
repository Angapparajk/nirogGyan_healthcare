import React from 'react';
import './index.css';
import { Card, CardContent, Typography, Avatar, Chip, Box } from '@mui/material';

const DoctorCard = ({ doctor, onClick }) => {
  return (
    <Card className="doctor-card" onClick={onClick} sx={{
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 0,
      background: 'linear-gradient(135deg, #f7f9fa 70%, #e0eaff 100%)',
      boxShadow: '0 6px 32px 0 rgba(38,99,235,0.13)',
      border: '2px solid #e0eaff',
      transition: 'transform 0.18s',
      '&:hover': { transform: 'translateY(-8px) scale(1.025)', boxShadow: '0 12px 40px rgba(38,99,235,0.18)' }
    }}>
      <Avatar src={doctor.profileImage} alt={doctor.name} className="doctor-avatar" sx={{ width: 88, height: 88, mb: 2, mt: 2, boxShadow: '0 2px 12px #60a5fa33', border: '3px solid #fff' }} />
      <CardContent sx={{ textAlign: 'center', flexGrow: 1, p: 0, width: '100%' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '1.18rem', color: '#1a237e', mb: 0.5 }}>{doctor.name}</Typography>
        <Chip
          label={doctor.specialization}
          size="small"
          sx={{
            background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.98rem',
            mb: 1,
            mt: 0.5,
            px: 1.5,
            borderRadius: 1.5,
            boxShadow: '0 1px 4px #2563eb22',
          }}
        />
        <Box mt={2}>
          <Chip
            label={doctor.availability}
            className="doctor-status"
            sx={{
              fontWeight: 700,
              fontSize: '1.01rem',
              px: 2.2,
              py: 1,
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
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
