import { PassportPageClient } from './PassportPageClient'

export const metadata = {
  title: 'Free Passport Photo Maker Online — Biometric Photos for 15 Countries | Renderly',
  description:
    'Make passport size photos online in seconds. Upload any photo, select your country, and get a biometric passport photo with white background. Free, no sign-up. Supports US, India, UK, EU and 11 more countries. Print-ready A4 and 4×6 sheets.',
  keywords:
    'passport size photo maker, convert picture to passport size, image to passport size converter, passport photo maker online, pass size photo maker, print passport photo, passport photo sheet, passport photo 4x6',
  openGraph: {
    title: 'Free Passport Photo Maker — Biometric Photos for 15 Countries | Renderly',
    description:
      'Convert any photo into a biometric passport photo instantly. Supports 15 countries. Print-ready A4 and 4×6 sheets. Free, no sign-up.',
    url: 'https://renderly.cc/passport-photo-maker',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Passport Photo Maker — Biometric Photos | Renderly',
    description:
      'Convert any photo into a biometric passport photo instantly. Free, no sign-up.',
  },
  alternates: {
    canonical: 'https://renderly.cc/passport-photo-maker',
  },
}

export default function PassportPhotoMakerPage() {
  return <PassportPageClient />
}
