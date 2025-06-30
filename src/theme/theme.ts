import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EF5350', 
    },
    secondary: {
      main: '#FFD700',
    },
    background: {
      default: '#f7f9fc',
    },
  },
  typography: {
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
    h1: { fontWeight: 700, fontSize: '2.2rem' },
    h2: { fontWeight: 600, fontSize: '1.8rem' },
    h3: { fontWeight: 500, fontSize: '1.4rem' },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

export default theme
