import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
