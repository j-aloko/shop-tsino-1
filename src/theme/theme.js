import { createTheme } from '../mui-styles/muiStyles';

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 920,
      sm: 545,
      xl: 1536,
      xs: 0,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: "'Open Sans', sans-serif";
            font-display: swap;
            src: url(../../fonts/static/OpenSans-Medium.ttf) format('truetype');
          }

          @font-face {
            font-family: "'Oswald', sans-serif";
            font-display: swap;
            src: url(../../fonts/static/Oswald-Bold.ttf) format('truetype');
          }
        `,
    },
  },
  palette: {
    background: { default: '#fafafa', paper: '#fff' },
    common: { black: '#000', white: '#fff' },
    error: { contrastText: '#fff', dark: '#d32f2f', light: '#e57373', main: '#f44336' },
    primary: { contrastText: '#fff', dark: 'rgba(0, 0, 0, 1)', light: 'rgba(54, 54, 54, 1)', main: 'rgba(34, 34, 34, 1)' },
    secondary: { contrastText: '#fff', dark: 'rgb(160, 47, 6)', light: 'rgb(253, 161, 125)', main: 'rgb(238, 92, 34)' },
    socialMedia: { facebook: '#0165E1', instagram: '#FD1D1D', pinterest: '#E60023', twitter: '#1D9BF0' },
    text: { disabled: 'rgba(0, 0, 0, 0.38)', hint: 'rgba(0, 0, 0, 0.38)', primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.70)' },
  },
  shadows: [
    'none',
    'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
  typography: {
    body1: {
      fontWeight: 450,
    },
    body2: {
      fontWeight: 450,
    },
    button: {
      fontFamily: "'Open Sans', sans-serif",
    },
    fontFamily: "'Oswald', sans-serif",
    h1: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.01562em',
      lineHeight: 1.167,
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '-0.01562em',
      lineHeight: 1.167,
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontWeight: 450,
    },
    subtitle2: {
      fontWeight: 450,
    },
  },
});

export { theme };
