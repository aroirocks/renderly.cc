import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'

import '@/styles/tailwind.css'

export const metadata = {
  title:
    'AI Image Tools – YouTube Thumbnail Maker & Passport Photo Maker | Renderly',

  description:
    'Create YouTube thumbnails and convert any selfie into a passport photo with AI. Generate thumbnails, biometric passport photos, and printable photo sheets in seconds.',

  keywords:
    'youtube thumbnail maker, ai youtube thumbnail maker, thumbnail generator, passport size photo maker, passport photo maker online, convert photo to passport size, image to passport size converter, print passport photo online',

  verification: {
    google: 's8nOpX2Lh-0IProujKHhhRc-Kb5OH6eDPKWcaJU1-28',
  },

  openGraph: {
    title: 'AI Image Tools – Thumbnail Maker & Passport Photo Maker',
    description:
      'Create YouTube thumbnails and convert selfies into passport photos instantly using AI.',
    url: 'https://renderly.cc',
    siteName: 'Renderly',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Tools – Thumbnail Maker & Passport Photo Maker',
    description:
      'Create YouTube thumbnails and passport photos instantly using AI.',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Renderly – AI Image Tools',
  url: 'https://renderly.cc',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free to try – no sign-up required',
  },
  description:
    'AI tools to create YouTube thumbnails and generate passport photos from selfies instantly.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M8FX1T1R6T"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M8FX1T1R6T');
          `}
        </Script>

        {/* ContentSquare */}
        <Script
          src="https://t.contentsquare.net/uxa/1b478e152a6a3.js"
          strategy="afterInteractive"
        />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>

      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}