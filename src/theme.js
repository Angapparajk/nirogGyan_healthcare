import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue
    },
    secondary: {
      main: '#059669', // green
    },
    background: {
      default: '#f5f7fb',
      paper: '#fff',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#60a5fa',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 2px 8px 0 #2563eb22',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 8,
          paddingBottom: 8,
          fontSize: '1.05rem',
          letterSpacing: 0.2,
          transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #1d4ed8 60%, #2563eb 100%)',
            color: '#fff',
            boxShadow: '0 4px 16px 0 #2563eb33',
            transform: 'translateY(-2px) scale(1.03)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #059669 60%, #34d399 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #047857 60%, #059669 100%)',
            color: '#fff',
            boxShadow: '0 4px 16px 0 #05966933',
            transform: 'translateY(-2px) scale(1.03)',
          },
        },
        startIcon: {
          marginRight: 12,
          marginLeft: -4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
        },
      },
    },
  },
});

export default theme;
