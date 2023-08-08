/*
* privacy-policy.tsx
* @2023 Open Seattle
*/

import {
    Container,
    ListItemText,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import Masthead from 'components/Masthead'
import { withBasicLayout } from 'components/layouts'
import { ReactNode } from 'react'

type SectionHeadProps = {
    title: string
}
const SectionHead = ({ title }: SectionHeadProps) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    
    return (
        <Typography
            variant={isSmallScreen ? 'headlineSmall' : 'headlineMedium'}
            sx={{ color: theme.palette.primary.dark }}>
            {title}
        </Typography>);
}

type SectionBodyProps = {
    children: ReactNode
}
const SectionBody = ({ children }: SectionBodyProps) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    return (
        <Typography variant={isSmallScreen ? 'bodySmall' : 'bodyMedium'}>
            {children}
        </Typography>);
}

type ListItemProps = {
    text: string
}
const ListItem = ({ text }: ListItemProps) => {
    const theme = useTheme()
    return (
        <ListItemText
            primary={
                <Typography
                    variant="bodyMedium"
                    color={theme.palette.secondary.contrastText}
                >
                    {text}
                </Typography>
            }
        />
    );
}


const PrivacyPage = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    return (
        <>
            <Masthead title="Privacy Policy" />
            <Stack
                sx={{
                    width: '100%',
                    backgroundColor: theme.palette.primary.contrastText,
                    padding: {
                        xs: '2.5rem 1rem 4rem 1rem',
                        md: '2.5rem 2rem 4rem 2rem',
                        lg: '2.5rem 12.5rem 7.5rem 12.5rem',
                    },
                }}>
                <Container >
                    <Typography variant={isSmallScreen ? 'bodySmall' : 'bodyMedium'}
                        sx={{ color: theme.palette.primary.dark }}>
                        <i>Last updated: February 21, 2023</i>
                    </Typography>
                    <SectionBody>
                        <p>Open Seattle operates the https://www.openseattle.org website.</p>
                        <p>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the Open Seattle website.</p>
                        <p> If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                        <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at https://www.openseattle.org, unless otherwise defined in this Privacy Policy.</p>
                    </SectionBody>

                    <SectionHead title="Information Collection and Use" />
                    <SectionBody>
                        <p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and email address. The information that we collect will be used to contact or identify you.</p>
                    </SectionBody>

                    <SectionHead title="Log Data" />
                    <SectionBody>
                        <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
                    </SectionBody>

                    <SectionHead title="Cookies" />
                    <SectionBody>
                        <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</p>
                        <p>Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</p>
                    </SectionBody>

                    <SectionHead title="Service Providers" />
                    <SectionBody>
                        <div>
                            We may employ third-party companies and individuals due to the following reasons:
                            <ListItem text="To facilitate our Service;" />
                            <ListItem text="To provide the Service on our behalf;" />
                            <ListItem text="To perform Service-related services; or" />
                            <ListItem text="To assist us in analyzing how our Service is used." />
                            We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                        </div>
                    </SectionBody>

                    <SectionHead title="Security" />
                    <SectionBody>
                        <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                    </SectionBody>

                    <SectionHead title="Links to Other Sites" />
                    <SectionBody>
                        <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    </SectionBody>

                    <SectionHead title="Children's Privacy" />
                    <SectionBody><p>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>
                    </SectionBody>

                    <SectionHead title="Changes to This Privacy Policy" />
                    <SectionBody>
                        <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
                        <p>Our Privacy Policy was created with the help of the TermsFeed Privacy Policy Template.</p>
                    </SectionBody>

                    <SectionHead title="Contact Us" />
                    <SectionBody>
                        <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at privacy@openseattle.org</p>
                    </SectionBody>
                </Container>
            </Stack>
        </ >
    )
}

export default withBasicLayout(PrivacyPage)
