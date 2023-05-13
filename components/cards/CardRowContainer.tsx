import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const CardRowContainer = ( {children} : Props ) => {
    return (
        // margins for testing purposes, feel free to remove
        <Stack direction={{xs: "column", sm: "row"}} spacing={4} sx={{
            flexWrap: 'wrap',
            // mr: '200px',
            // ml: '200px', 
            // mt: '100px',
            }}>
            {children}
        </Stack>
    )
}
// TODO: a mobile friendly version

export default CardRowContainer;
