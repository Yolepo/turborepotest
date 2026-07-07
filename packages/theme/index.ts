import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#2df300',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
