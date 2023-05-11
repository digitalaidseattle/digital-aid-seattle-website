import Box from '@mui/material/Box';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const IconContainer = ( {children} : Props ) => {
    return (
        <Box sx={{ 
            backgroundColor: '#005045', 
            borderRadius: '50%',
            width: '5rem',
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
                {children}
            {/* <AccessibilityIcon fontSize="large" sx={{color:"white"}}/> */}
        </Box>
    )
}

export default IconContainer;
