import React, { useState } from 'react';
import logoLg from '../../assets/nirogGyan_lg.png';
import logoSm from '../../assets/nirogGyan_sm.jpeg';
import './index.css';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, IconButton, useMediaQuery, Box } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 220;

const SideNav = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));



const drawerContent = (
  <div style={{ position: 'relative', height: '100%' }}>
    {/* Accent bar for branding */}
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: 7,
      height: '100%',
      background: 'linear-gradient(180deg, #2563eb 0%, #059669 100%)',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      zIndex: 1,
    }} />
    {!isMobile && (
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={3}>
        <img
          src={logoLg}
          alt="NirogGyan Logo"
          style={{ width: 160, height: '32px', borderRadius: 14, marginBottom: 10, marginTop: 0, boxShadow: '0 2px 12px #2563eb22' }}
        />
      </Box>
    )}
    <Divider sx={{ mb: 1 }} />
    <List sx={{ zIndex: 2, position: 'relative' }}>
      <ListItem component="button" onClick={() => { navigate('/dashboard'); setMobileOpen(false); }} sx={{ borderRadius: 2, mb: 1, '&:hover': { background: '#e0eaff' } }}>
        <ListItemIcon sx={{ color: '#2563eb', minWidth: 38 }}><DashboardIcon /></ListItemIcon>
        <ListItemText primary={<span style={{ fontWeight: 700, color: '#2563eb' }}>Dashboard</span>} />
      </ListItem>
      <ListItem component="button" onClick={() => { navigate('/doctors'); setMobileOpen(false); }} sx={{ borderRadius: 2, mb: 1, '&:hover': { background: '#e0f7ef' } }}>
        <ListItemIcon sx={{ color: '#059669', minWidth: 38 }}><LocalHospitalIcon /></ListItemIcon>
        <ListItemText primary={<span style={{ fontWeight: 700, color: '#059669' }}>Doctors</span>} />
      </ListItem>
      <ListItem component="button" onClick={() => { navigate('/appointments'); setMobileOpen(false); }} sx={{ borderRadius: 2, mb: 1, '&:hover': { background: '#f5f6fa' } }}>
        <ListItemIcon sx={{ color: '#f59e42', minWidth: 38 }}><EventAvailableIcon /></ListItemIcon>
        <ListItemText primary={<span style={{ fontWeight: 700, color: '#f59e42' }}>Appointments</span>} />
      </ListItem>
    </List>
  </div>
);

  return (
    <>
      {isMobile && (
        <>
          {/* Logo at top-left on mobile (not fixed) */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1200, background: '#f7f9fa', borderRadius: 2, p: 0.5 }}>
            <img
              src={logoSm}
              alt="NirogGyan Logo"
              style={{ width: 48, height: 'auto', borderRadius: 8, cursor: mobileOpen ? 'pointer' : 'default', background: '#f7f9fa' }}
              onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setMobileOpen(true)}
            sx={{ position: 'fixed', top: 16, right: 28, zIndex: 1301 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: '80vw',
                maxWidth: 320,
                background: '#f7f9fa',
                marginTop: 0,
                height: '100vh',
                position: 'relative',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 18,
                borderBottomRightRadius: 18,
                paddingTop: '0',
                boxShadow: '0 6px 32px 0 #2563eb18',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 1, pb: 0 }}>
              <IconButton
                aria-label="close drawer"
                onClick={() => setMobileOpen(false)}
                sx={{ mr: 2 }}
              >
                <span style={{ fontSize: 28, fontWeight: 'bold' }}>&#10005;</span>
              </IconButton>
              {/* Section names will follow as part of drawerContent */}
            </Box>
            {drawerContent}
          </Drawer>
        </>
      )}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#f7f9fa',
              borderTopRightRadius: 18,
              borderBottomRightRadius: 18,
              boxShadow: '0 6px 32px 0 #2563eb18',
              border: 'none',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SideNav;
