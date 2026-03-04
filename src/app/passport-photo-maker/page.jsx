import { PassportPageClient } from './PassportPageClient'

const schemaWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Passport Size Photo Maker – Renderly',
  url: 'https://renderly.cc/passport-photo-maker',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free – no sign-up required',
  },
  description:
    'Convert any selfie into a biometric passport photo with a white background. Supports 15 countries. Download print-ready A4 and 4×6 sheets.',
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the passport size photo maker free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account or sign-up required. Upload your photo, select your country, and download your passport photo instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert any picture to passport size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any selfie or portrait photo. AI removes the background, centres your face, and outputs the correct passport dimensions for your country.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I print passport photos on A4 or 4×6 sheets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Download a print-ready A4 sheet with 8 copies, or a 4×6 passport photo sheet with 4 copies. Cut guides are included so you can trim at home.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which countries are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool supports 15 countries including the United States, India, United Kingdom, Germany, France, Australia, Canada, China, Singapore, and Europe (Schengen).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the correct passport photo size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It varies by country. For example: US passport photos are 2×2 inches (51×51mm), UK and India are 35×45mm, Canada is 50×70mm. The tool automatically applies the correct dimensions when you select your country.',
      },
    },
  ],
}

export const metadata = {
  title:
    'Passport Size Photo Maker Online – Convert Photo to Passport Size | Renderly',

  description:
    'Convert any selfie into a passport size photo online. Upload a picture, select your country, and generate a biometric passport photo with white background in seconds. Supports US, India, UK, EU and more. Download print-ready A4 and 4×6 sheets.',

  keywords:
    'passport size photo maker, passport photo maker online, convert photo to passport size, image to passport size converter, print passport size photo online, passport photo sheet, passport photo 4x6, biometric passport photo maker',

  openGraph: {
    title:
      'Passport Size Photo Maker Online – Convert Photo to Passport Size',
    description:
      'Upload any selfie and turn it into a biometric passport photo instantly. Supports multiple countries and printable A4 passport photo sheets.',
    url: 'https://renderly.cc/passport-photo-maker',
    siteName: 'Renderly',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Passport Size Photo Maker Online | Renderly',
    description:
      'Turn any photo into a passport size photo instantly. Download printable passport photo sheets.',
  },

  alternates: {
    canonical: 'https://renderly.cc/passport-photo-maker',
  },
}
export default function PassportPhotoMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <PassportPageClient />
    </>
  )
}
