import Container from '../components/Container'
import Layout from '../components/Layout'
import CardRowContainer from '../components/cards/CardRowContainer';
import CardLeft from '../components/cards/CardLeft'
import AccessibilityIcon from '@mui/icons-material/Accessibility';


export default function VolunteerForm() {
  return (
    <Layout>
      <Container>
      <CardRowContainer>
  <CardLeft
    title="Make a Donation"
    description="A tax-deductible donation below helps us provide our Partners with the tools they need."
    icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }} 
    />}
  />
  <CardLeft
    title="Sponsor Us"
    description="Help our Partners increase their nonprofit’s impact by becoming an ally and offering support."
    icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }} 
    />}
  />
  <CardLeft
    title="Share Our Mission"
    description="Spread the word with your friends, coworkers, and social media, to help continue our mission."
    icon={<AccessibilityIcon fontSize="large" sx={{ color: "white" }} 
    />}
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
