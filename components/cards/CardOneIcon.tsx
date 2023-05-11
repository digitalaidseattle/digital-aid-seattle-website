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

// TODO: have card colors/styles defined in the theme file instead of here
const CardOneIcon = ({title, description, icon, buttonText}: CardIconProps) => {
    return (
        <Card sx={{ 
            borderRadius: '12px',
            background: '#F7FAFA',
            border: '3px solid #FFFFFF',
            boxShadow: '0px 12px 24px rgba(86, 96, 97, 0.12), 0px 6px 12px rgba(86, 96, 97, 0.12)',
        }}>
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