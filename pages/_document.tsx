import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Oswald:wght@400;500&display=swap"
        />
      </Head>
      <body className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
