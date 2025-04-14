import { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/app/providers/QueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
