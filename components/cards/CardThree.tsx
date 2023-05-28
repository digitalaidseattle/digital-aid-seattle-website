import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import IconContainer from './IconContainer'
import Button from '@mui/material/Button';
import { ReactNode } from 'react';

type CardThreeProps = {
    icon: ReactNode
    description: string
    buttonText: string
    buttonLink: string
}

const CardThree = (props: CardThreeProps) => {
    return(
        <Card sx={{ 
            flex: 1,
            minWidth: { xs: '100%', sm: 'min-content' },
            boxShadow: '0px 12px 24px rgba(86, 96, 97, 0.12), 0px 6px 12px rgba(86, 96, 97, 0.12)'}}>
            <CardContent sx={{ 
                padding: '2rem',
                display: 'flex', 
                gap: '2rem', 
                flexDirection: 'column', 
                alignItems: 'center'}}>
                <IconContainer>{props.icon}</IconContainer>
                <Typography variant="bodyLarge" sx={{ textAlign: 'center'}}>
                    {props.description}
                </Typography>
                <Button variant="contained" color="secondary">{props.buttonText}</Button>
            </CardContent>
        </Card>
    )
}

export default CardThree;