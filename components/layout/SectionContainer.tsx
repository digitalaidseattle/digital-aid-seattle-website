import { Box, useTheme } from '@mui/material';
const SectionContainer = ({ backgroundColor, children }) => {

  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        color: theme.palette.primary.main,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: { xs: '16px', md: '32px', lg: 0 },
        paddingY: { xs: '64px', lg: '80px' },
      }}
    >
      {children}
    </Box>
  )
}

export default SectionContainer
