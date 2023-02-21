import Section from 'components/Section'

export default function LandingPage({ content }) {
  return (
    <>
      <div className="w-full max-w-7xl">
        {content.slots.map((slot) => (
          <Section key={slot._key} {...slot} />
        ))}
      </div>
    </>
  )
}
