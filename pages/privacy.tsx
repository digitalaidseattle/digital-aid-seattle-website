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
import { LoadingContext, withBasicLayout } from 'components/layouts'
import { ReactNode, useContext, useEffect, useState } from 'react'
import PrivacyImage from '../assets/privacy.png'
import Markdown from 'react-markdown'
import { pageCopyService } from 'services/PageCopyService'
import dayjs from 'dayjs'

const LABELS = {
    HERO_TITLE: 'Privacy policy',
    HERO_TXT: 'This policy outlines how we collect, use, and protect your personal information on our website.',
    main: 'This policy outlines how we collect, use, and protect your personal information on our website.'
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

    const { setLoading } = useContext(LoadingContext);
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        if (!initialized) {
            setLoading(true);
            pageCopyService.updateCopy(LABELS, 'privacy')
                .then(() => setInitialized(true))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false))
        }
    }, [initialized, setLoading])

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <MastheadWithImage
                imageSrc={PrivacyImage.src}
                imageText={'Privacy policy graphic'}
            >
                <>
                    <Typography
                        variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
                        sx={{ color: theme.palette.primary.contrastText }}
                        component="h1"
                    >
                        {LABELS.HERO_TITLE}
                    </Typography>
                    <Typography
                        variant="headlineLarge"
                        sx={{
                            color: theme.palette.primary.contrastText,
                        }}
                        component="span"
                    >
                        {LABELS.HERO_TXT}
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
                                {LABELS.main}
                            </Markdown>
                        </Box>
                    </Container>
                </Box>
            </SectionContainer>
        </Container>
    )
}

export default withBasicLayout(PrivacyPage)
