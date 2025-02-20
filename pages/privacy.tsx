/**
* privacy.tsx
* 
* Page for privacy policy
* 
* @2024 Digital Aid Seattle
*/
import {
    Box,
    Container,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import MastheadWithImage from 'components/MastheadWithImage'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import { ReactNode, useEffect, useState } from 'react'
import PrivacyImage from '../assets/privacy.png'
import Markdown from 'react-markdown'
import { pageCopyService } from 'services/PageCopyService'
import dayjs from 'dayjs'

const LABELS = {
    PAGE_TITLE: 'Privacy policy',
    TITLE_IMAGE: 'Privacy policy graphic',
    TITLE_COPY: 'This policy outlines how we collect, use, and protect your personal information on our website.'
}

type CardCopyTextProps = {
    title?: string,
    children: ReactNode
}
const CardCopyText = ({ title, children }: CardCopyTextProps) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    return (
        <>
            <Box
                sx={{ marginTop: '1.5rem' }}>
                {
                    title && <Typography
                        variant={isSmallScreen ? 'titleSmall' : 'titleMedium'}>
                        {title}
                    </Typography>
                }
                <Typography variant={isSmallScreen ? 'bodySmall' : 'bodyMedium'}>
                    {children}
                </Typography>
            </Box>
        </>);
}

type ListItemProps = {
    text: string
}
const ListItem = ({ text }: ListItemProps) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    return (
        <ListItemText
            primary={
                <Typography variant={isSmallScreen ? 'bodySmall' : 'bodyMedium'}
                    sx={{ display: 'list-item' }}>
                    {text}
                </Typography >
            }
        />
    );
}

const PrivacyPage = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const [privacyText, setPrivacyText] = useState<string>();

    useEffect(() => {
        if (!privacyText) {
            pageCopyService.getByPage('privacy')
                .then((texts) => {
                    const pageCopy = texts.find(t => t.key === 'main');
                    if (pageCopy) {
                        setPrivacyText(pageCopy.copy);
                    }
                })
        }
    }, [privacyText]);

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <MastheadWithImage
                imageSrc={PrivacyImage.src}
                imageText={LABELS.TITLE_IMAGE}
            >
                <>
                    <Typography
                        variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
                        sx={{ color: theme.palette.primary.contrastText }}
                        component="h1"
                    >
                        {LABELS.PAGE_TITLE}
                    </Typography>
                    <Typography
                        variant="headlineLarge"
                        sx={{
                            color: theme.palette.primary.contrastText,
                        }}
                        component="span"
                    >
                        {LABELS.TITLE_COPY}
                    </Typography>
                </>
            </MastheadWithImage>
            <SectionContainer backgroundColor={theme.palette.background.default}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    maxWidth={'880px'}
                >
                    <Container >
                        <Typography variant={isSmallScreen ? 'headlineMedium' : 'headlineLarge'}>Digital Aid Seattle Privacy Policy</Typography>
                        <Box sx={{ marginTop: 3 }}>
                            <Markdown className='markdown'>
                                {privacyText}
                            </Markdown>
                        </Box>
                    </Container>
                </Box>
            </SectionContainer>
        </Container>
    )
}

export default withBasicLayout(PrivacyPage)
