import SelectInputGroup from '../components/form/SelectInputGroup'
import TextAreaFormGroup from '../components/form/TextAreaFormGroup'
import TextFormGroup from '../components/form/TextFormGroup'
import TextFormGroupWithAddon from '../components/form/TextFormGroupWithAddon'

export default function VolunteerForm() {
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6">Volunteer</h3>
            <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
              You&apos;re one step closer to becoming an Open Seattle volunteer!
              Our goal is to match you with projects that align with your skills
              and interests.
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
              expand
            />
            <SelectInputGroup
              label="Country"
              name="country"
              autoComplete="country-name"
              options={['United States', 'Canada', 'Mexico']}
            />

            <TextFormGroup
              label="City"
              name="city"
              autoComplete="address-level-2"
            />

            <TextFormGroup
              label="State / Province"
              name="state-province"
              autoComplete="address-level-1"
            />

            <TextFormGroup
              label="Zip / Postal Code"
              name="postal-code"
              autoComplete="postal-code"
            />
            <TextFormGroupWithAddon
              label="LinkedIn Profile"
              name="linkedin"
              addon="https://"
              expand
            />
            <TextAreaFormGroup
              label="About"
              name="about"
              helperText="Why are you interested in volunteering?"
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
            />
          </div>
        </div>
      </div>
    </form>
  )
}
