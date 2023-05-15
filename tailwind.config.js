/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './sanity/**/*.{js,ts,jsx}',
    './pages/**/*.{js,ts,jsx}',
    './components/**/*.{js,ts,jsx}',
  ],
  theme: {
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      body: 'var(--font-lato)',
      heading: 'var(--font-league-gothic)',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
