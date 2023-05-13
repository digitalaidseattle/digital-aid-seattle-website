import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const CardRowContainer = ( {children} : Props ) => {
    return (
        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns:  {xs: 'repeat(auto-fit, 1fr)', md: 'repeat(auto-fit, minmax(10rem, 1fr))',},
            gap: '1rem',
            width: '100%',
            justifyContent: 'center',

        }}>
            {children}
        </Box>
    )
}
// TODO: a mobile friendly version

export default CardRowContainer;
