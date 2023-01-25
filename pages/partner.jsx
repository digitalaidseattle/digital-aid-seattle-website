import SelectInputGroup from '../components/form/SelectInputGroup'
import TextAreaFormGroup from '../components/form/TextAreaFormGroup'
import TextFormGroup from '../components/form/TextFormGroup'
import TextFormGroupWithAddon from '../components/form/TextFormGroupWithAddon'
import Container from '../components/Container'

export default function PartnerForm() {
  return (
    <Container>
      <form className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500">
        <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6">Partner</h3>
              <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
                Thank you for your interest in Open Seattle! We are excited to
                learn more about your needs to determine if we can lend a hand.
              </p>
              <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
                Fill out this form and a member of our team will be in touch
                regarding next steps.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <TextFormGroup
                label="First Name"
                name="first-name"
                autoComplete="given-name"
              />

              <TextFormGroup
                label="Last Name"
                name="last-name"
                autoComplete="family-name"
              />

              <TextFormGroup
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="example@example.com"
                expand
              />
              <TextFormGroup
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                placeholder="555-123-4567"
              />

              <TextFormGroup
                label="Organization"
                name="organization"
                autoComplete="organization"
                helperText="Which organization or department do you represent?"
                expand
              />

              <SelectInputGroup
                label="Organization Type"
                name="organization-type"
                options={[
                  'Government Agency',
                  'Nonprofit',
                  'Community Organization',
                  'For-profit Company',
                ]}
              />

              <TextFormGroupWithAddon
                label="Organization Website"
                name="website"
                addon="https://"
                expand
              />

              <TextFormGroup
                label="Project Title"
                name="project-title"
                helperText="If the proposed project has a name, please place it here."
              />
              <TextAreaFormGroup
                label="Project Details"
                name="project-details"
                helperText="Please provide any details about the project that you can provide. This will help us determine whether we can support your project and the types of volunteers we may provide."
                expand
              />
              <SelectInputGroup
                label="Disciplines"
                name="disciplines"
                options={[
                  'UX/UI Design',
                  'Program Management',
                  'Content Writing',
                  'Product',
                  'Software Development',
                  'Research',
                  'Graphic Design',
                  'Data Science',
                  'Marketing/Community Engagment',
                ]}
                multiple
                helperText="What disciplines do you anticipate needing help with?"
              />
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex rounded-md bg-gray-800/80 px-3.5 py-1.5 font-body text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-indigo-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-500/60 hover:dark:bg-gray-600 hover:dark:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex rounded-md bg-indigo-800/80 px-3.5 py-1.5 font-body text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-indigo-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-indigo-500/80 hover:dark:bg-indigo-600 hover:dark:shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Container>
  )
}
