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
import { ReactNode } from 'react'
import PrivacyImage from '../assets/privacy.png'

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

// TODO consider using Markdown for this page
const PrivacyPage = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery('(max-width:600px)')

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

                        <CardCopyText>
                            <Typography variant={isSmallScreen ? 'titleSmall' : 'titleMedium'}>Last updated:</Typography>
                            <Typography variant={isSmallScreen ? 'bodySmall' : 'bodyMedium'}> February 21, 2023</Typography>
                        </CardCopyText>

                        <CardCopyText>
                            <p>Digital Aid Seattle operates the https://www.digitalaidseattle.org website.</p>
                            <p>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the Digital Aid Seattle website.</p>
                            <p> If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                            <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at https://www.digitalaidseattle.org, unless otherwise defined in this Privacy Policy.</p>
                        </CardCopyText>

                        <CardCopyText title="Information Collection and Use" >
                            <p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and email address. The information that we collect will be used to contact or identify you.</p>
                        </CardCopyText>

                        <CardCopyText title="Log Data" >
                            <p>{`We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.`}</p>
                        </CardCopyText>

                        <CardCopyText title="Cookies" >
                            <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</p>
                            <p>{`Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.`}</p>
                        </CardCopyText>

                        <CardCopyText title="Service Providers" >
                            <div>
                                We may employ third-party companies and individuals due to the following reasons:
                                <Box sx={{ marginLeft: '1.5rem' }}>
                                    <ListItem text="To facilitate our Service;" />
                                    <ListItem text="To provide the Service on our behalf;" />
                                    <ListItem text="To perform Service-related services; or" />
                                    <ListItem text="To assist us in analyzing how our Service is used." />
                                </Box>
                                We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                            </div>
                        </CardCopyText>

                        <CardCopyText title="Security" >
                            <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                        </CardCopyText>

                        <CardCopyText title="Links to Other Sites" >
                            <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                        </CardCopyText>

                        <CardCopyText title="Children's Privacy" >
                            <p>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>
                        </CardCopyText>

                        <CardCopyText title="Changes to This Privacy Policy" >
                            <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
                            <p>Our Privacy Policy was created with the help of the TermsFeed Privacy Policy Template.</p>
                        </CardCopyText>

                        <CardCopyText title="Contact Us" >
                            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at privacy@digitalaidseattle.org</p>
                        </CardCopyText>
                    </Container>
                </Box>
            </SectionContainer>
        </Container>
    )
}

export default withBasicLayout(PrivacyPage)
