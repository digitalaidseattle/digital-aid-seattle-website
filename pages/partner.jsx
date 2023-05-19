import Container from '../components/Container'
import Layout from '../components/Layout'

export default function PartnerForm() {
  return (
    <Layout>
      <Container className="container mx-auto px-6 lg:px-8">
        <iframe
          class="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shrVmFy3j3TVWxVBG?backgroundColor=cyanLight"
          frameborder="0"
          width="100%"
          height="1788"
          style={{ background: 'transparent', border: '1px solid #ccc' }}
        ></iframe>
      </Container>
    </Layout>
  )
}
