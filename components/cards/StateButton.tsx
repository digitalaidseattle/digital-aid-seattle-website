import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type StateButtonProps = {
  state: 'active' | 'recruiting' | 'complete'
}

const stateColors = {
  active: '#FFFAD8',
  recruiting: '#DDFFAF',
  complete: '#FFF0EE',
}
const StateButton = ({ state }: StateButtonProps) => {
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
        {state}
      </Typography>
    </Box>
  )
}

export default StateButton
