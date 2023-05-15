import LandingPage from '../components/pageTypes/LandingPage'
import { getHomePage } from '../sanity/lib/client'

export default function DynamicPage({ page }) {

  return <LandingPage content={page} />
}

export async function getStaticProps() {
  const page = await getHomePage()

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}
