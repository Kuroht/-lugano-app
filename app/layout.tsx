import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './components/header/nav'
import ExtraNav from './components/header/extraNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lugano',
  description: 'Pizzaria Lugano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className='w-full h-full lg:w-4/5 mx-auto'>
            <ExtraNav />
            <Nav />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
