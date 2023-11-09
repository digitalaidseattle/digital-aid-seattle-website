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
}

export default config
