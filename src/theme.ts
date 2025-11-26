import { createTheme } from '@mui/material/styles';

const customColors = {
  dark: '#2C2C2C',
  white: '#FFFFFF',
};

const theme = createTheme({
  palette: {
    primary: {
      main: customColors.dark,
      contrastText: customColors.white,
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '5px',
        },
      },
    },
  },
});

export default theme;
