import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Is this a free YouTube thumbnail maker?',
      answer:
        'Yes, you can try it for free. No sign-up or credit card required.',
    },
    {
      question: 'How many images can I upload?',
      answer: 'You can upload up to 2 images per thumbnail.',
    },
    {
      question: 'Is there a free passport photo maker online?',
      answer:
        'Yes — the Renderly passport size photo maker is completely free. Upload any photo, select your country, and get a biometric passport photo in seconds. No account needed.',
    },
  ],
  [
    {
      question: 'Do I need design skills?',
      answer:
        'No. The AI handles layout, cropping, and enhancement automatically. Just upload your images and download your thumbnail.',
    },
    {
      question: 'What size is the thumbnail?',
      answer:
        '1280×720 pixels — the resolution recommended by YouTube for all video thumbnails.',
    },
    {
      question: 'Can I convert any picture to passport size?',
      answer:
        'Yes. The image to passport size converter accepts selfies, casual photos, or any portrait shot. AI automatically removes the background, centres your face, and outputs the correct dimensions for your country.',
    },
  ],
  [
    {
      question: 'Can I use it for YouTube Shorts?',
      answer:
        'Yes, thumbnails work for both regular videos and Shorts on YouTube.',
    },
    {
      question: 'Can I print passport photos on A4 or 4×6 sheets?',
      answer:
        'Yes. After generating your passport photo, download a print-ready A4 sheet with 8 copies, or a 4×6 passport photo sheet with 4 copies. Cut guides are included so you can trim each photo at home.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Have more questions? Email us and we'll get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
