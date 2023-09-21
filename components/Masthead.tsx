/*
* Masthead.tsx
* @2023 Digital Aid Seattle
*/

import { Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material"

type MastheadProps = {
    title: string
}

const MobileHeader = styled(Typography)(({ theme }) => ({
    padding: '4rem 0',
    width: '100%',
    textAlign: 'center',
}))

const DesktopHeader = styled(Typography)(({ theme }) => ({
    padding: '5rem 0',
    width: '100%',
    textAlign: 'center',
}))

const Masthead = ({ title }: MastheadProps) => {
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <Stack
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            }}
        >
            {smallScreen ? (
                <MobileHeader variant="displayMedium">{title}</MobileHeader>
            ) : (
                <DesktopHeader variant="displayLarge">{title}</DesktopHeader>
            )}
        </Stack>
    )
}

export default Masthead