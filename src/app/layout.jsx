import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'

import '@/styles/tailwind.css'

export const metadata = {
  title: 'AI YouTube Thumbnail Maker – Create Thumbnails from Images | Renderly',
  description:
    'Upload up to 2 images and let AI generate a YouTube-ready thumbnail. Automatic sizing, image enhancement, and high-quality output in seconds.',
  keywords:
    'youtube thumbnail maker, ai youtube thumbnail maker, thumbnail maker for youtube, create youtube thumbnail from image, youtube thumbnail size, youtube thumbnail generator',
  
  verification: {
    google: 's8nOpX2Lh-0IProujKHhhRc-Kb5OH6eDPKWcaJU1-28',
  },

    openGraph: {
    title: 'AI YouTube Thumbnail Maker – Create Thumbnails from Images',
    description:
      'Upload up to 2 images and let AI generate a YouTube-ready thumbnail. Automatic sizing, image enhancement, and high-quality output in seconds.',
    url: 'https://renderly.cc',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI YouTube Thumbnail Maker – Create Thumbnails from Images',
    description:
      'Upload up to 2 images and let AI generate a YouTube-ready thumbnail. Automatic sizing, image enhancement, and high-quality output in seconds.',
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
  name: 'Renderly – AI YouTube Thumbnail Maker',
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
    'Upload up to 2 images and let AI generate a YouTube-ready thumbnail in seconds.',
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

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}