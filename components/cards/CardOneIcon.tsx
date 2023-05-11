import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import IconContainer from './IconContainer';
import { ReactNode } from 'react';
import Button from '@mui/material/Button';

type CardIconProps = {
    title?: string,
    description: string,
    icon: ReactNode,
    buttonText?: string,
}

const CardOneIcon = ({title, description, icon, buttonText}: CardIconProps) => {
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
                <IconContainer>{icon}</IconContainer>
                {title ? <Typography variant='h5'>{title}</Typography> : ''}
                <Typography>{description}</Typography>
                {buttonText ? <Button>{buttonText}</Button> : ''}
            </CardContent>
        </Card>
    );
}

export default CardOneIcon;