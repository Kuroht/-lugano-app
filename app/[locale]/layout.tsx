import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './components/header/nav'
import ExtraNav from './components/header/extraNav'
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {useTranslations} from 'next-intl';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lugano',
  description: 'Pizzaria Lugano',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
}) {
  
  const t = useTranslations('Nav');

  const locale = useLocale();
  const navMessages = {
    Home : t('home'),   
    Menu : t('menu'),   
    About : t('about'),   
    Contact : t('contact'),    
  }

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="h-full w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className='w-full h-full lg:w-4/5 mx-auto'>
            <ExtraNav />
            <Nav messages={navMessages} locale={locale}/>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
