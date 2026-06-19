/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['cdn.sanity.io'],
    loader: 'custom',
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  async redirects() {
    return [
      {
        source: '/support_us',
        destination: '/donate',
        permanent: false,
      },
    ]
  },
}

export default config
