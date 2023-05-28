import Container from '../components/Container'
import Layout from '../components/Layout'

// test
import CardProject from '../components/cards/CardProject'
import CardGridContainer from '../components/cards/CardGridContainer'

import CardRowContainer from '../components/cards/CardRowContainer';
import CardOne from '../components/cards/CardOne'
import AccessibilityIcon from '@mui/icons-material/Accessibility';
//
import CardThree from '../components/cards/CardThree'

export default function VolunteerForm() {
  return (
    <Layout>
      
      {/* test */}
      <CardRowContainer>
        <CardThree icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }}/>} description={"test"} buttonText="text"/>
        <CardThree icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }}/>} description={"test"} buttonText="text"/>
        <CardThree icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }}/>} description={"test"} buttonText="text"/>
      </CardRowContainer>

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
