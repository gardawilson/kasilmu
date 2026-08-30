import { createTheme } from '@mui/material/styles'

// Design tokens diadaptasi dari "DashStack - Free Admin Dashboard UI Kit" (Figma).
const theme = createTheme({
  palette: {
    primary: {
      main: '#4880ff',
      light: '#7aa3ff',
      dark: '#3568d4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fcbe2d',
      light: '#fdd36b',
      dark: '#d99e12',
      contrastText: '#202224',
    },
    success: { main: '#00b69b', light: '#e6f7f4', dark: '#009683', contrastText: '#ffffff' },
    warning: { main: '#fcbe2d', light: '#fef3d9', dark: '#d99e12', contrastText: '#202224' },
    error: { main: '#fd5454', light: '#fee0e0', dark: '#e23b3b', contrastText: '#ffffff' },
    background: {
      default: '#f5f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#202224',
      secondary: '#606060',
    },
    divider: '#e6e9f0',
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Nunito Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.0035em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700, fontSize: '1.5rem' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '6px 6px 54px 0 rgb(0 0 0 / 0.05)',
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#fcfdfd',
            fontWeight: 800,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: 'rgba(32,34,36,0.9)',
            borderBottom: '1px solid #ededf1',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f1f5f9',
        },
        body: {
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'rgba(32,34,36,0.9)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 700, fontSize: '0.75rem' },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 17,
          fontWeight: 700,
          color: '#202224',
          padding: '20px 24px',
          borderBottom: '1px solid #f1f5f9',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { padding: '20px 24px' },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          gap: 8,
          borderTop: '1px solid #f1f5f9',
        },
      },
    },
  },
})

export default theme
