import Header from '@/components/ui/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import { NextAuthProvider } from './providers'

export const metadata = {
  title: 'The Book Place',
  description: "Market place pour l'achat et la vente de livres",
}

const roboto = Roboto({ weight: '400', style: 'normal', subsets: ['latin'] })

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <NextAuthProvider session={session}>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
