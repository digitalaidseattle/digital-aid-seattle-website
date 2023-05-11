import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconContainer from './IconContainer';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { ReactNode } from 'react';

type CardIconProps = {
    title: string,
    description: string,
    icon: ReactNode
}

const CardIcon = ({title, description, icon}: CardIconProps) => {
    return (
        <Card sx={{ }}>
            <CardContent sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '2rem',
                alignItems: 'center',
                textAlign: 'center'
                }}>
                <IconContainer>
                    {icon}
                    {/* <AccessibilityIcon fontSize="large" sx={{color:"white"}}/> */}
                </IconContainer>
                <Typography variant='h5'>{title}</Typography>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    );
}

export default CardIcon;