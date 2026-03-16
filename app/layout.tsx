import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import { ReactQueryProvider } from '@/lib/react-query-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'HuntAI — Your Job Search Command Center',
  description: 'AI-powered job hunt assistant. Generate tailored emails, track applications, customize your CV.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="font-body antialiased">
          <ReactQueryProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#181B23',
                  color: '#F0F2F8',
                  border: '1px solid #2A3045',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'DM Sans, sans-serif',
                },
                success: {
                  iconTheme: { primary: '#F5A623', secondary: '#0A0B0F' },
                },
              }}
            />
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
