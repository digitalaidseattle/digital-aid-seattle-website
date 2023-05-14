import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const CardRowContainer = ( {children} : Props ) => {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {children}
        </Box>
    )
}
// TODO: a mobile friendly version

export default CardRowContainer;
