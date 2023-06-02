import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography/Typography'

type StateButtonProps = {
  state: 'active' | 'recruiting' | 'complete'
}

const StateButton = ({ state }: StateButtonProps) => {
  const bgColor =
    state === 'active'
      ? '#FFFAD8'
      : state === 'recruiting'
      ? '#DDFFAF'
      : '#FFF0EE'
  return (
    <Box
      sx={{
        color: '#343D3E',
        textTransform: 'capitalize',
        padding: '10px 12px',
        borderRadius: '100px',
        backgroundColor: bgColor,
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

export default StateButton;