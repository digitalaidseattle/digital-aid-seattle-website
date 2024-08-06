import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { AddOutlined, VolunteerActivismOutlined } from '@mui/icons-material'

import AboutUsImage from '../assets/aboutUs.png'

import { withBasicLayout } from 'components/layouts'
import MastheadWithImage from 'components/MastheadWithImage'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { designColor } from 'theme/theme'

const cardContent = [
  {
    category: 'General Information',
    description:
      'Apply your skills to real-world projects that can aid in your future professional endeavors.',
  },
  {
    category: 'Volunteering Commitment',
    description:
      'Gain insight in working on cross-functional teams and collaborating with a wide range of disciplines.',
  },
  {
    category: 'Involvement Opportunities',
    description:
      'Access to networking events and conferences that Digital Aid Seattle attends.',
  },
  {
    category: 'Project and Team Structure',
    description:
      'Apply your skills to real-world projects that can aid in your future professional endeavors.',
  },
  {
    category: 'Onboarding Process',
    description:
      'Gain insight in working on cross-functional teams and collaborating with a wide range of disciplines.',
  },
  {
    category: 'Additional Questions',
    description:
      'Access to networking events and conferences that Digital Aid Seattle attends.',
  },
]

const questionSectionContent = [
  {
    category: 'General Information',
    questions: [
      {
        question: 'What is Digital Aid Seattle (DAS)?',
        answer:
          'Digital Aid Seattle (DAS) is a non-profit organization that gathers volunteers to help other nonprofits in the Seattle area and beyond by building and improving digital tools and platforms. Our mission is to leverage technology to support and enhance the operations of nonprofits, making a positive impact in our community.',
      },
      {
        question: 'What does a day in the life look like at DAS?',
        answer:
          "At Digital Aid Seattle (DAS), volunteers start their day by checking updates and communications on AirTable. Daily activities include collaborating with team members via online tools, attending virtual meetings, and working on assigned tasks. Whether you're part of the Cadre core team, which focuses on providing tools and daily operations, or the Ventures team, working directly with DAS clients on specific projects, the focus is on teamwork, continuous learning, and making meaningful contributions. Additionally, the Cadre team has company meetings (Plenary) every two weeks and specific team meetings weekly.",
      },
      {
        question: 'What is the difference between the Cadre and Venture teams?',
        answer:
          "The Cadre team is the core team focused on providing tools and running the daily operations of DAS. The Ventures team works in project-specific teams directly with DAS clients, addressing specific needs as they arise. Volunteers on the Ventures team are matched with client projects based on their skills and the project's requirements.",
      },
      {
        question: 'Who can volunteer with DAS?',
        answer:
          'Anyone with a passion for making a difference and skills in areas such as software development, design, project management, marketing, and more can volunteer with DAS. We welcome individuals from various fields of knowledge who are motivated to help nonprofits build better tools.',
      },
    ],
  },
  {
    category: 'Volunteering Commitment',
    questions: [
      {
        question: 'What is the time investment each week?',
        answer:
          'DAS asks volunteers to contribute at least 4 hours per week, with a commitment of 6 months. This helps ensure steady progress on projects while allowing volunteers to balance their contributions with other responsibilities.',
      },
      {
        question: 'How long can I expect to wait to be matched with a project?',
        answer:
          'For the Ventures team, the matching process with client projects typically takes 1-2 weeks. This ensures that your skills and interests align with a project that can benefit from your expertise, providing a good fit for both you and the client.',
      },
      {
        question:
          'Can someone volunteer in a role different from the one they applied for (e.g., front-end dev taking a full-stack role)?',
        answer:
          'Yes, flexibility is encouraged at DAS. If you have skills or interests in areas beyond your initial role, you can discuss this with your project lead and explore opportunities to contribute in different capacities, potentially joining one or more teams.',
      },
      {
        question: 'What qualifications do I need to volunteer?',
        answer:
          'While specific qualifications vary depending on the role, generally we look for individuals with relevant skills and a commitment to our mission. Prior experience in non-profit work is not required, but a willingness to learn and collaborate is essential.',
      },
    ],
  },
  {
    category: 'Involvement Opportunities',
    questions: [
      {
        question:
          'What are other ways I can be involved with DAS besides volunteering?',
        answer:
          'Besides volunteering, you can support DAS by participating in fundraising efforts, promoting our mission on social media, contributing to our blog, and attending events and workshops. There are numerous ways to get involved and make an impact beyond direct project work.',
      },
      {
        question:
          'Can I use my project portfolio in lieu of the asynchronous challenge?',
        answer:
          'Yes, we recognize the value of demonstrated experience. You can submit your project portfolio as part of your application to showcase your skills and past work. This can sometimes be considered in place of completing the asynchronous challenge.',
      },
      {
        question: 'Are there any opportunities for professional development?',
        answer:
          'Yes, volunteering with DAS offers numerous opportunities for professional development. You can gain hands-on experience, improve your skills, network with professionals in your field, and make meaningful contributions to impactful projects.',
      },
    ],
  },
  {
    category: 'Project and Team Structure',
    questions: [
      {
        question:
          'What does project management look like at DAS (e.g., agile, scrum)?',
        answer:
          'DAS primarily uses AirTable for project management and incorporates Agile methodologies, including Scrum and Kanban. This involves regular sprints, stand-up meetings, and iterative development to ensure flexibility, collaboration, and continuous improvement throughout the project lifecycle.',
      },
      {
        question: 'Can you describe the development methodologies used by DAS?',
        answer:
          'DAS utilizes a mix of Agile methodologies tailored to the specific needs of each project. This includes Scrum for projects requiring regular sprint reviews and Kanban for ongoing tasks. The focus is on adaptive planning, evolutionary development, and early delivery.',
      },
      {
        question: 'Could you describe the application types that DAS creates?',
        answer:
          'DAS focuses on creating a variety of applications, including web and mobile apps, data analysis tools, and platforms that support non-profit activities. These applications are designed to enhance efficiency, improve user engagement, and provide valuable insights to support the missions of non-profit organizations.',
      },
      {
        question: 'What tools and technologies are commonly used at DAS?',
        answer:
          'DAS uses a variety of tools and technologies, including AirTable for project management, Slack for communication, GitHub for version control, and various development frameworks and languages depending on the project requirements. Specific tools and technologies will be introduced during the onboarding process.',
      },
    ],
  },
  {
    category: 'Onboarding Process',
    questions: [
      {
        question: 'Do you have an onboarding process, and how does it work?',
        answer:
          'Yes, DAS has a structured onboarding process that lasts about 2 weeks. New volunteers receive onboarding video instructions that cover project management tools like AirTable and explain the team structure. This orientation ensures volunteers are well-prepared and integrated smoothly into their roles.',
      },
      {
        question: 'What is the onboarding process like?',
        answer:
          'The onboarding process at DAS is designed to help volunteers integrate smoothly into their roles. It includes an initial orientation session, access to relevant resources and tools, introduction to team members, and guidance on the first tasks. This process ensures that volunteers feel welcomed, informed, and prepared to start contributing effectively.',
      },
      {
        question: 'What support is available for new volunteers?',
        answer:
          'New volunteers receive comprehensive support during the onboarding process, including access to onboarding videos, resources, and tools. They are introduced to their team and project and receive guidance on initial tasks. Ongoing support is available from team leads and fellow volunteers to ensure a smooth transition.',
      },
    ],
  },
  {
    category: 'Additional Questions',
    questions: [
      {
        question: 'How can I apply to volunteer with DAS?',
        answer:
          'You can apply to volunteer with DAS by visiting our website and filling out the volunteer application form. Once submitted, our team will review your application and contact you with next steps.',
      },
      {
        question: 'What are the benefits of volunteering with DAS?',
        answer:
          'Volunteering with DAS offers numerous benefits, including the opportunity to make a positive impact, gain valuable experience, build your professional network, and contribute to meaningful projects that support nonprofits. You also get the chance to work with a diverse team of passionate individuals.',
      },
      {
        question: 'Are there any upcoming events or workshops?',
        answer:
          'DAS regularly hosts events and workshops for volunteers to learn, network, and collaborate. You can find information about upcoming events on our website or by subscribing to our newsletter.',
      },
      {
        question: 'Can I volunteer remotely?',
        answer:
          'Yes, DAS offers remote volunteering opportunities, allowing you to contribute from anywhere. Most of our collaboration and communication are done online, making it convenient for volunteers regardless of location.',
      },
    ],
  },
]

const FaqPage = () => {
  const theme = useTheme()
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <FaqHeroSection />
      <FaqCardSection />
      <FaqQuestionSection />
    </Container>
  )
}

const FaqSection = ({ backgroundColor, textAlignment, children }) => (
  <SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        alignItems: textAlignment,
        textAlign: textAlignment,
      }}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
)

const FaqHeroSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <MastheadWithImage
      imageSrc={AboutUsImage.src}
      imageText="About Us page graphic"
    >
      <>
        <Typography
          variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
          sx={{ color: theme.palette.primary.contrastText }}
          component="h1"
        >
          FAQ
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          Find answers to all your questions
        </Typography>
      </>
    </MastheadWithImage>
  )
}

const FaqCardSection = () => {
  return (
    <FaqSection backgroundColor={designColor.white} textAlignment="center">
      <Typography variant="headlineLarge" component="h2">
        Frequently Asked Questions
      </Typography>
      <Typography variant="bodyLarge">
        Find answers to common questions quickly and efficiently. Whether you're
        considering volunteering with Digital Aid Seattle (DAS) or looking for
        more information about our organization and processes, this section
        provides the essential details you need.
      </Typography>
      <CardRowContainer>
        {cardContent.map((card) => (
          <CardOne
            title={card.category}
            description={card.description}
            icon={
              // placeholder icon
              <VolunteerActivismOutlined
                style={{ color: designColor.white, fontSize: '40px' }}
              />
            }
          />
        ))}
      </CardRowContainer>
    </FaqSection>
  )
}

const FaqQuestionSection = () => {
  return (
    <FaqSection backgroundColor={designColor.white} textAlignment="left">
      {questionSectionContent.map((section) => (
        <>
          <Typography variant="headlineLarge">{section.category}</Typography>
          {/* {section.questions.map((item) => 
        
        )}         */}
        </>
      ))}
    </FaqSection>
  )
}

export default withBasicLayout(FaqPage)
