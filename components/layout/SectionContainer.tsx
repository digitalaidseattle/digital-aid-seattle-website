import { Box } from '@mui/material'
import { theme } from 'theme/theme'
const SectionContainer = ({ backgroundColor, children }) => {
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
