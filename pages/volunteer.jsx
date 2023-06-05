import Container from '../components/Container'
import Layout from '../components/Layout'

import CardProject from '../components/cards/CardProject'
import CardGridContainer from '../components/cards/CardGridContainer'

export default function VolunteerForm() {
  return (
    <Layout>
      <Container>
      <CardGridContainer>
        <CardProject
          title= "Clearviction"
          partner="City of Bellevue"
          programAreas={["Civic engagement"]}
          description= "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          status= "active"
          projectLink= "#"
          duration= {{start: "Jun 1", end: "Jul 15"}}/>
        <CardProject
          title= "Seattle Humane Society"
          partner="City of Seattle"
          programAreas={["Animals"]}
          description= "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          status= "complete"
          projectLink= "#"
          duration= {{start: "Mar 1", end: "Mar 15"}}/>        
        <CardProject
          title= "Open Seattle Cadre"
          partner="Open Seattle"
          programAreas={["Civic engagement", "Technology"]}
          description= "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          status= "recruiting"
          projectLink= "#"
          duration= {{start: "May 1", end: "May 15"}}/>
      </CardGridContainer>
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
