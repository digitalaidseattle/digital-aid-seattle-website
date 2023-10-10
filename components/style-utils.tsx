/*
 * @2023 Digital Aid Seattle
 */
import { Stack, Typography, styled } from "@mui/material"

export const Subheader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.primary.main,
  [theme.breakpoints.up('xs')]: {
    marginBottom: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '2.5rem',
  },
}))

export const Section = styled(Stack)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
  alignItems: 'center'
}))

export const TextSection = styled(Stack)(() => ({
  gap: '2rem',
}))