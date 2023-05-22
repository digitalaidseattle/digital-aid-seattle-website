import Container from '../components/Container'
import Layout from '../components/Layout'

// test
import CardProject from '../components/cards/CardProject'
import CardGridContainer from '../components/cards/CardGridContainer'

//

export default function VolunteerForm() {
  return (
    <Layout>
      {/* test */}
      <CardGridContainer>
      <CardProject/>
      <CardProject/>
      <CardProject/>
      <CardProject/>
      </CardGridContainer>
      {/* end test */}
      <Container>
        <iframe
          class="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shr1lbcr3qmkoIbNW?backgroundColor=purpleLight"
          frameborder="0"
          width="100%"
          height="3610"
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            overflow: 'hidden',
          }}
        ></iframe>
      </Container>
    </Layout>
  )
}
