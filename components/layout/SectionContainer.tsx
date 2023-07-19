import { Box } from '@mui/material'
const SectionContainer = ({ backgroundColor, children }) => {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: { xs: '16px', md: '32rem', lg: 0 },
      }}
    >
      {children}
    </Box>
  )
}

export default SectionContainer
