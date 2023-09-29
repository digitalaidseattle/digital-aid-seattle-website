import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Oswald:wght@400;500&display=swap"
        />
        <link
          rel="icon"
          sizes="any"
          href="/logo-light-icon.svg"
          type="image/svg+xml"
        />
      </Head>
      <body className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
