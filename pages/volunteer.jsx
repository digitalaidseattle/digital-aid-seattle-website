import SelectInputGroup from '../components/form/SelectInputGroup'
import TextAreaFormGroup from '../components/form/TextAreaFormGroup'
import TextFormGroup from '../components/form/TextFormGroup'
import TextFormGroupWithAddon from '../components/form/TextFormGroupWithAddon'
import Container from '../components/Container'

export default function VolunteerForm() {
  return (
    <Container>
      <form className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500">
        <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-500 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6">Volunteer</h3>
              <p className="mt-1 max-w-prose text-sm text-gray-500 dark:text-gray-300">
                You&apos;re one step closer to becoming an Open Seattle
                volunteer! Our goal is to match you with projects that align
                with your skills and interests.
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
                placeholder="linkedin.com/in/your-profile"
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
                helperText="What skills do you have that could benefit Open Seattle or another project? You may select more than one."
              />
              <TextFormGroup
                label="Weekly Commitment"
                name="commitment"
                helperText="How many hours per week could you commit to Open Seattle or another project?"
              />
              <SelectInputGroup
                label="Duration"
                name="duration"
                options={['Yes', 'No']}
                helperText="Can you commit to helping regularly for at least three (3) months?"
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
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
