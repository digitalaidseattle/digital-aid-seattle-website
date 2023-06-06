import Container from '../components/Container'
import Layout from '../components/Layout'
import CardEvent from '../components/cards/CardEvent'

export default function VolunteerForm() {
  return (
    <Layout>
      <Container>
        <CardEvent
          title="Earth-a-thon"
          date="March 27, 2023"
          time={{start: "6:00", end: "8:00 PM"}}
          location="123 ABC Street, Seattle, WA"
          description="Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          buttonLink="#"
        />
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
