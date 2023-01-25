import Section from '../components/Section'

const sections = [
  {
    overline: 'Support your community',
    heading: 'Volunteer',
    body: 'Are you an individual eager to solve complex civic problems with your technical or non-technical chops? Open Seattle can connect you with projects that fit your unique skills and interests.',
    linkText: 'Apply',
    linkUrl: '#',
    imgsrc: 'seattle_2.jpg',
    flipLayout: true,
  },
  {
    overline: 'Support your community',
    heading: 'Partner',
    body: 'Are you a nonprofit or municipal leader with a vision but need some help in execution? Open Seattle can help define your technical needs and provide your project with passionate volunteers.',
    linkText: 'Apply',
    linkUrl: '#',
    imgsrc: 'seattle_1.jpg',
    flipLayout: false,
  },
]
export default function IndexPage() {
  return (
    <>
      <Section {...sections[0]} />
      <Section {...sections[1]} />
    </>
  )
}
