import { Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="flex flex-grow flex-row justify-center">{children}</main>
      <Footer />
    </div>
  )
}
