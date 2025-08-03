import React from 'react';
import DoctorCard from '../DoctorCard';
// import './index.css';
import { Grid } from '@mui/material';

const DoctorList = ({ doctors, onDoctorClick }) => {
  return (
    <div className='main-container'>
    <Grid container columns={12} columnSpacing={0} rowSpacing={1} justifyContent="center" className="doctor-list">
      {doctors.map((doctor) => (
        <Grid key={doctor._id} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3', xl: 'span 3', }} sx={{mr:1.7, padding: '0 8px'}}>
          <DoctorCard doctor={doctor} onClick={() => onDoctorClick(doctor)} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default DoctorList;
