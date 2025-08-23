import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import AppointmentForm from './components/AppointmentForm';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
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
  // Listen for login/logout to force rerender
  const [authChanged, setAuthChanged] = useState(false);
  React.useEffect(() => {
    const handler = () => setAuthChanged(a => !a);
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );

}

import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const hideSideNav = location.pathname === '/login' || location.pathname === '/register';
  return (
    <Box sx={{ display: 'flex' }}>
      {!hideSideNav && <SideNav />}
      <Box component="main" sx={{ flexGrow: 1, p: 0, minHeight: '100vh', background: '#f5f6fa',margin: 'auto' }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/doctors" element={<ProtectedRoute><DoctorsPage /></ProtectedRoute>} />
          <Route path="/doctor/:id" element={<ProtectedRoute><DoctorProfileRoute /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><AppointmentFormRoute /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
