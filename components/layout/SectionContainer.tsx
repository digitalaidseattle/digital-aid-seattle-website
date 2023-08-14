import { Box, Stack, useTheme } from '@mui/material'
const SectionContainer = ({ backgroundColor, children }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: { xs: '16px', md: '32px', lg: 0 },
        paddingY: { xs: '64px', lg: '80px' },
      }}
    >
      <Stack
        gap={{ xs: '16px', md: '32px', lg: '80px' }}
        maxWidth={theme.breakpoints.values.lg}
        margin="0 auto"
      >
        {children}
      </Stack>
    </Box>
  )
}

export default SectionContainer
