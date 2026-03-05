import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BgRemoverTool } from '@/components/BgRemoverTool'

export const metadata = {
  title: 'Remove Background from Image Free – AI Background Remover | Renderly',
  description:
    'Remove the background from any image instantly using AI. Upload a photo and get a transparent PNG in seconds. Free, no sign-up required. Works with portraits, products, and logos.',
  keywords:
    'remove background from image, background remover, remove background free, ai background remover, transparent background maker, background eraser, remove bg',
  alternates: { canonical: 'https://renderly.cc/remove-background' },
  openGraph: {
    title: 'Remove Background from Image Free | Renderly',
    description:
      'AI-powered background removal. Upload any photo and download a transparent PNG instantly.',
    url: 'https://renderly.cc/remove-background',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Background from Image Free | Renderly',
    description:
      'AI removes backgrounds instantly. Free transparent PNG download.',
  },
}

const schemaWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Background Remover – Renderly',
  url: 'https://renderly.cc/remove-background',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Remove background from any image automatically using AI. Download a transparent PNG in seconds.',
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does AI remove backgrounds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI uses computer vision to detect the main subject in the image — people, products, animals, logos — and separates it from the background, producing a transparent PNG.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the background remover free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can upload and remove backgrounds instantly with no sign-up or credit card required.',
      },
    },
  ],
}

const CHECKER =
  'repeating-conic-gradient(#e2e8f0 0% 25%,#f8fafc 0% 50%) 0 / 14px 14px'

const EXAMPLES = [
  { label: 'Portrait', bg: 'from-blue-100 to-indigo-200', emoji: '🧑' },
  { label: 'Product', bg: 'from-amber-100 to-yellow-200', emoji: '👟' },
  { label: 'Logo', bg: 'from-rose-100 to-pink-200', emoji: '🔴' },
]

const TOOLS = [
  { name: 'Photoroom', note: 'portrait & product focus' },
  { name: 'remove.bg', note: 'subject-detection model' },
  { name: 'Slazzer', note: 'batch processing' },
  { name: 'Pixelcut', note: 'mobile-first' },
]

export default function RemoveBackgroundPage() {
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
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Remove Background from Image Free
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Upload a photo and automatically remove the background in
                seconds.
              </p>
            </div>
            <div className="mt-12">
              <BgRemoverTool
                tool="remove-background"
                buttonLabel="Remove Background"
              />
            </div>
          </Container>
        </section>

        {/* Description */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                AI Background Remover
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Renderly automatically detects the main subject in your image
                and removes the background instantly. The AI separates the
                foreground from the background and generates a transparent PNG
                ready for design, websites, or ecommerce listings.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                AI tools like remove.bg and Photoroom work using similar
                subject-detection models that isolate objects like people,
                products, or animals before removing the background. Renderly
                uses similar AI background segmentation technology to instantly
                detect and isolate the subject in your photo.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  'One-click background removal',
                  'Transparent PNG download',
                  'Works with JPG, PNG, WebP',
                  'High-resolution output',
                ].map((f) => (
                  <div
                    key={f}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-center"
                  >
                    <div className="mb-2 text-red-500">✦</div>
                    <p className="text-sm font-medium text-slate-700">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Examples */}
        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-display text-2xl font-semibold text-slate-900">
                Before → After
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.label}
                    className="overflow-hidden rounded-xl border border-slate-200"
                  >
                    <div
                      className={`flex h-28 items-center justify-center bg-linear-to-br ${ex.bg}`}
                    >
                      <span className="text-5xl">{ex.emoji}</span>
                    </div>
                    <div className="flex h-7 items-center justify-center border-y border-slate-100 bg-slate-50">
                      <span className="text-xs font-medium text-slate-400">
                        → transparent PNG
                      </span>
                    </div>
                    <div
                      className="flex h-28 items-center justify-center"
                      style={{ background: CHECKER }}
                    >
                      <span className="text-5xl">{ex.emoji}</span>
                    </div>
                    <p className="py-2 text-center text-xs font-medium text-slate-600">
                      {ex.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* SEO section */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Most Accurate Background Removers
              </h2>
              <p className="mt-4 text-slate-600">
                Popular AI background remover tools include:
              </p>
              <ul className="mt-4 space-y-2">
                {TOOLS.map((t) => (
                  <li
                    key={t.name}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span>
                      <strong>{t.name}</strong> — {t.note}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                These tools use computer vision models to detect the subject and
                remove complex backgrounds including hair or fur edges. Renderly
                uses similar AI background segmentation technology to instantly
                detect and isolate the subject in your photo.
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-display text-2xl font-semibold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    How does AI remove backgrounds?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    AI detects the main subject and separates it from the
                    background automatically using computer vision trained on
                    millions of images.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Is the tool free?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Yes, you can upload and remove backgrounds instantly. No
                    sign-up or credit card required.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
