import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // For consistent styling
import '@fontsource/poppins'; // Import Poppins font

const blackPalette = {
    50: '#f6f6f6',
    100: '#e7e7e7',
    200: '#d1d1d1',
    300: '#b0b0b0',
    400: '#888888',
    500: '#6d6d6d',
    600: '#5d5d5d',
    700: '#4f4f4f',
    800: '#454545',
    900: '#3d3d3d',
    950: '#000000',
  };
  
  // Create a theme instance with your customizations
  const theme = createTheme({
    palette: {
      primary: {
        main: blackPalette[500],
        light: blackPalette[400],
        dark: blackPalette[600],
        contrastText: '#ffffff',
      },
      secondary: {
        main: blackPalette[700],
        light: blackPalette[600],
        dark: blackPalette[800],
        contrastText: '#ffffff',
      },
      grey: blackPalette,
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      // Targeting all MUI components
    }
     
     
  });
  

  export default theme