import Container from '../components/Container'
import Layout from '../components/Layout'

import CardRowContainer from '../components/cards/CardRowContainer'
import CardJob from '../components/cards/CardJob'
import placeholder from '../assets/placeholder-img.png'


export default function VolunteerForm() {
  return (
    <Layout>
      <Container>
        <CardRowContainer>
          <CardJob
            title='Front end developer'
            description='Develop the user interface.'
            imageSrc={placeholder.src}
            imageAlt='placeholder'
          />
                    <CardJob
            title='Front end developer'
            description='Develop the user interface.'
            imageSrc={placeholder.src}
            imageAlt='placeholder'
          />
                    <CardJob
            title='Front end developer'
            description='Develop the user interface.'
            imageSrc={placeholder.src}
            imageAlt='placeholder'
          />
        </CardRowContainer>
        <iframe
          className="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shr1lbcr3qmkoIbNW?backgroundColor=purpleLight"
          frameBorder="0"
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
