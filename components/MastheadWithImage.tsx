/*
* MastheadWithImage.tsx
* @2023 Open Seattle
*/

import { ReactNode } from "react"
import SectionContainer from "./layout/SectionContainer"
import { Box, useTheme } from "@mui/material"


type MastheadWithImageProps = {
    children: ReactNode
    imageSrc: string
    imageText?: string
}

const MastheadWithImage = ({ children, imageSrc, imageText }: MastheadWithImageProps) => {
    const theme = useTheme()
    return <SectionContainer backgroundColor={theme.palette.primary.main}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                gap: { xs: 4, md: '40px' },
            }}
            maxWidth={'880px'}
        >
            <Box
                sx={{
                    textAlign: 'left',
                    width: '100%',
                    maxWidth: '418px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem  ',
                }}
            >
                {children}
            </Box>
            <img
                src={imageSrc}
                alt={imageText}
                width="418px"
                style={{ objectFit: 'cover' }}
            />
        </Box>
    </SectionContainer>
}

export default MastheadWithImage