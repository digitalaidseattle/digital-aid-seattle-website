
import { ThemeProvider } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'
import { theme } from 'theme/theme'

import { Seo } from 'components/seo'
import { CodaVentureService } from 'services/codaVentureService'
import { eventsService } from '../services/EventsService'

import { CodaRoleService } from 'services/codaRoleService'
import 'styles/global.css'
import 'styles/preflight.css'

const DEFAULT_TAG =
  'Free tech solutions for Puget Sound nonprofits | Digital Aid Seattle'
const TAG_NAMES = {
  event: 'Events | Digital Aid Seattle',
  events: 'Events | Digital Aid Seattle',
  volunteers: 'Volunteer with us | Digital Aid Seattle',
  partners: 'Get help with your nonprofit | Digital Aid Seattle',
  about: 'About us | Digital Aid Seattle',
  projects: 'Projects | Digital Aid Seattle',
  privacy: 'Privacy policy | Digital Aid Seattle',
  cadre: 'The Cadre | Digital Aid Seattle',
}

export default function App({ Component, pageProps }: AppProps) {
  const pathName = usePathname()

  const ventureService = CodaVentureService.getInstance();
  const roleService = CodaRoleService.getInstance();

  const [title, setTitle] = useState(DEFAULT_TAG);

  useEffect(() => {
    const lookupTitle = async (pathName: string) => {
      let pageName = null;
      let path = [];
      let id = null;
      if (pathName) {
        path = pathName.split('/')
        pageName = path[path.length - 2]
        id = path[path.length - 1]
      }
      switch (pageName) {
        case 'project':
          const p = id ? await ventureService.getById(id) : null;
          return p ? p.title.concat(' | Digital Aid Seattle') : DEFAULT_TAG
        case 'volunteer':
          const r = await roleService.getRoleDetailsByName(id)
          return r ? r.role.concat(' | Digital Aid Seattle') : DEFAULT_TAG
        case 'event':
          const e = await eventsService.getOne(id)
          return e ? e.title.concat(' | Digital Aid Seattle') : DEFAULT_TAG
        default:
          const tag = TAG_NAMES[pageName]
          return tag ?? DEFAULT_TAG
      }
    }
    if (pathName) {
      lookupTitle(pathName).then((title) => setTitle(title))
    }
  }, [pathName, ventureService, roleService])
  return (
    <>
      <Seo
        title={title}
        description="Digital Aid Seattle partners with other nonprofits to amplify their impact and to uplift communities through the power of technology."
        canonical="https://www.digitalaidseattle.org"
      />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  )
}
