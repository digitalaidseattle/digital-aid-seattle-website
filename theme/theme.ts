import { createTheme } from '@mui/material'

const greenPalette = {
  0: '#000000',
  10: '#00201B',
  17: '#003029',
  20: '#00382F',
  30: '#005045',
  40: '#006B5D',
  50: '#008675',
  60: '#00A38E',
  70: '#32BFA9',
  80: '#57DBC4',
  90: '#77F8DF',
  95: '#B6FFEE',
  99: '#F3FFFA',
  100: '#FFFFFF',
}

const yellowPalette = {
  0: '#000000',
  10: '#1E1C00',
  20: '#343200',
  30: '#4B4900',
  40: '#646100',
  50: '#7F7A00',
  60: '#9A9400',
  70: '#B6AF02',
  80: '#D2CB2D',
  90: '#EFE84A',
  92: '#F5ED4F',
  95: '#FDF657',
  98: '#F5ED4F',
  99: '#F3FFFA',
  100: '#FFFFFF',
}

const neutralPalette = {
  25: '#343D3E',
  98: '#F7FAFA',
  97: '#F2F7F7',
}

export const designColor = {
  white: '#F7FAFA',
  black: '#00211F',
  background: neutralPalette[97],
  green: {
    main: greenPalette[17],
    light: greenPalette[30],
    dark: greenPalette[20],
  },
  yellow: {
    main: yellowPalette[92],
    light: yellowPalette[98],
    dark: yellowPalette[80],
  },
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: designColor.green.main,
      light: designColor.green.light,
      dark: designColor.green.dark,
      contrastText: designColor.white,
    },
    secondary: {
      main: designColor.yellow.main,
      light: designColor.yellow.light,
      dark: designColor.yellow.dark,
      contrastText: designColor.black,
    },
    background: {
      default: '#F2F7F7',
    },
    text: {
      primary: designColor.black,
      secondary: neutralPalette[97],
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    button: {
      fontFamily: 'Montserrat',
      fontStyle: 'bold',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '+0.1px',
    },
    displayLarge: {
      fontFamily: 'Oswald',
      fontWeight: 500,
      fontSize: '57px',
      lineHeight: '72px',
      letterSpacing: '-.25px',
    },
    displayMedium: {
      fontFamily: 'Oswald',
      fontWeight: 500,
      fontSize: '45px',
      lineHeight: '60px',
    },
    displaySmall: {
      fontFamily: 'Oswald',
      fontWeight: 500,
      fontSize: '36px',
      lineHeight: '48px',
    },
    headlineLarge: {
      fontFamily: 'Oswald',
      fontWeight: 400,
      fontSize: '32px',
      lineHeight: '48px',
    },
    headlineMedium: {
      fontFamily: 'Oswald',
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '40px',
    },
    headlineSmall: {
      fontFamily: 'Oswald',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '36px',
    },
    titleLarge: {
      fontFamily: 'Montserrat',
      fontStyle: 'semi-bold',
      fontWeight: 600,
      fontSize: '22px',
      lineHeight: '28px',
    },
    titleMedium: {
      fontFamily: 'Montserrat',
      fontStyle: 'semi-bold',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '+0.15px',
    },
    titleSmall: {
      fontFamily: 'Montserrat',
      fontStyle: 'semi-bold',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '+0.1px',
    },
    labelLarge: {
      fontFamily: 'Montserrat',
      fontStyle: 'bold',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '+0.1px',
    },
    labelMedium: {
      fontFamily: 'Montserrat',
      fontStyle: 'bold',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '+0.5px',
    },
    labelSmall: {
      fontFamily: 'Montserrat',
      fontStyle: 'bold',
      fontWeight: 700,
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '+0.5px',
    },
    bodyLarge: {
      fontFamily: 'Montserrat',
      fontStyle: 'medium',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '32px',
      letterSpacing: '+0.5px',
    },
    bodyMedium: {
      fontFamily: 'Montserrat',
      fontStyle: 'medium',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '28px',
      letterSpacing: '+0.25px',
    },
    bodySmall: {
      fontFamily: 'Montserrat',
      fontStyle: 'medium',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '24px',
      letterSpacing: '+0.4px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          padding: '10px 24px 10px 24px',
          textTransform: 'none',
        },
      },
    },
  },
})
