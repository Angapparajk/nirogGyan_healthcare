import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import AppointmentForm from './components/AppointmentForm';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import SideNav from './components/SideNav';
import NotFound from './pages/NotFound';
import Box from '@mui/material/Box';

function DoctorProfileRoute() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  return (
    <DoctorProfilePage
      doctorId={id}
      doctor={doctor}
      setDoctor={setDoctor}
      onBook={() => navigate(`/book/${id}`)}
    />
  );
}

function AppointmentFormRoute() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  return (
    <AppointmentForm
      doctor={doctor}
      doctorId={id}
      setDoctor={setDoctor}
      onSubmit={() => navigate('/')}
      onCancel={() => navigate(`/doctor/${id}`)}
    />
  );
}

function DashboardPage() {
  // Only show available doctors
  return <LandingPage onlyAvailable />;
}

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 0, minHeight: '100vh', background: '#f5f6fa',margin: 'auto' }}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctor/:id" element={<DoctorProfileRoute />} />
            <Route path="/book/:id" element={<AppointmentFormRoute />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
