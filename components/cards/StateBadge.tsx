import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StatusLabels } from 'components/ProjectComponents'
import { VentureStatus } from 'types'

type StateBadgeProps = {
  state: VentureStatus
}
const stateColors = {
  'Active': '#FFFAD8',
  'Under evaluation': '#DDFFAF',
  'Completed': '#FFF0EE',
}
const StateBadge = ({ state }: StateBadgeProps) => {
  return (
    <Box
      sx={{
        color: '#343D3E',
        textTransform: 'capitalize',
        padding: '10px 12px',
        borderRadius: '100px',
        backgroundColor: stateColors[state],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="titleSmall" sx={{ fontWeight: '600' }}>
        {StatusLabels[state]}
      </Typography>
    </Box>
  )
}

export default StateBadge
