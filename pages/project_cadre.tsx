import { withBasicLayout } from 'components/layouts'
import ProjectTemplate from './project_individual'

const CadrePage = () => {
  return (
    <ProjectTemplate
      title="The Cadre"
      partner="Open Seattle"
      status="recruiting"
      duration="Ongoing"
      problemDesc="Nonprofits that try to adopt new tech can't staff for their digital needs. They grapple with efficiency and face operational burdens without proper digital tools, leading to funding shortages and lost volunteers. 77% of nonprofits say that skilled volunteers could majorly impact their mission, but only 12% actually utilize them. Most software projects will fail, even with financial backing. And—during the pandemic, Covid-related drops in volunteer hours nationwide reached 19%.Washington state needs a more structured tech volunteering model."
      solutionDesc="The state of Washington boasts over 70,000 technologists, more than 55,000 residing in greater Seattle. Meanwhile, statistics show that 30% of professionals will volunteer if given the chance. So, how can we utilize this resource? OPEN SEATTLE fosters connections between volunteers and the orgs that can utilize their talents and provides nonprofits with digital systems and tools that boost their efforts. "
      impactDesc="Open Seattle helps nonprofits build the structure essential for success in any technology project, acting as a force multiplier to help organizations create lasting impact."
      team={{ name: '', title: '' }}
      rolesNeeded={{ role: '' }}
    />
  )
}

export default withBasicLayout(CadrePage)
