import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const CardRowContainer = ( {children} : Props ) => {
    return (
        // margins for testing purposes
        <Stack direction="row" spacing={4} sx={{ 
            // mr: '200px',
            // ml: '200px', 
            // mt: '100px',
            }}>
            {children}
        </Stack>
    )
}

export default CardRowContainer;
