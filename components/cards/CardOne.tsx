import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import IconContainer from './IconContainer';
import { ReactNode } from 'react';
import Button from '@mui/material/Button';

type CardOneProps = {
    title?: string,
    description: string,
    icon: ReactNode,
    buttonText?: string,
}

// TODO: have card colors/styles defined in the theme file instead of here
const CardOne = ({title, description, icon, buttonText}: CardOneProps) => {
    return (
        <Card sx={{ 
            flex: '1',
            borderRadius: '12px',
            background: '#F7FAFA',
            border: '3px solid #FFFFFF',
            boxShadow: '0px 12px 24px rgba(86, 96, 97, 0.12), 0px 6px 12px rgba(86, 96, 97, 0.12)',
        }}>
            <CardContent sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center',
                textAlign: 'center',
                height: '100%'
                }}>
                <IconContainer>{icon}</IconContainer>
                {/* typography styles here are for testing purposes only-- can be set to a variant defined in theme! */}
                {title && <Typography sx={{fontSize: '1rem', fontWeight: '700'}}>{title}</Typography>}
                <Typography sx={{fontSize: '0.875rem', lineHeight: '28px'}}>{description}</Typography>
                {buttonText && <Button sx={{mt: 'auto'}}>{buttonText}</Button>}
            </CardContent>
        </Card>
    );
}

export default CardOne;