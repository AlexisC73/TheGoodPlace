import Header from '@/components/ui/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import { NotificationContextProvider } from '@/context/NotificationContext'
import AuthContext from '@/application/auth/contexts/AuthProvider'
import ProfileContext from '@/application/auth/contexts/ProfileProvider'

export const metadata = {
  title: 'The Book Place',
  description: "Market place pour l'achat et la vente de livres"
}

const roboto = Roboto({ weight: '400', style: 'normal', subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <AuthContext>
          <ProfileContext>
            <NotificationContextProvider>
              <Header />
              {children}
            </NotificationContextProvider>
          </ProfileContext>
        </AuthContext>
      </body>
    </html>
  )
}
