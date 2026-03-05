import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BgRemoverTool } from '@/components/BgRemoverTool'

export const metadata = {
  title: 'Remove Background from Signature – Transparent Signature PNG | Renderly',
  description:
    'Extract your handwritten signature from paper. Upload a scanned signature image, remove the white background, and download a transparent PNG for use in documents, PDFs, and forms.',
  keywords:
    'signature background remover, remove background from signature, transparent signature, digital signature image, extract signature from paper',
  alternates: {
    canonical: 'https://renderly.cc/signature-background-remover',
  },
  openGraph: {
    title: 'Remove Background from Signature | Renderly',
    description:
      'Convert your handwritten signature into a transparent PNG. Free, instant, no sign-up.',
    url: 'https://renderly.cc/signature-background-remover',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Background from Signature | Renderly',
    description:
      'Extract your signature from paper and download a transparent PNG.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Signature Background Remover – Renderly',
  url: 'https://renderly.cc/signature-background-remover',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Remove the paper background from a scanned signature. Download a transparent PNG for use in documents.',
}

const CHECKER =
  'repeating-conic-gradient(#e2e8f0 0% 25%,#f8fafc 0% 50%) 0 / 14px 14px'

const USES = [
  'Contracts and legal documents',
  'PDF signing and forms',
  'Business correspondence',
  'Email signatures',
]

export default function SignatureBackgroundRemoverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Remove Background from Signature
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Convert your handwritten signature into a transparent PNG.
              </p>
            </div>
            <div className="mt-12">
              <BgRemoverTool
                tool="signature-background-remover"
                buttonLabel="Extract Signature"
              />
            </div>
          </Container>
        </section>

        {/* Explanation */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                How It Works
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Upload a scanned signature or a photo of your signature on
                paper. Renderly removes the paper background and extracts the
                signature so it can be used in digital documents. The result is
                a transparent PNG with only the signature strokes — no white
                background, no paper texture.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  'Works with scanned signatures',
                  'Transparent PNG download',
                  'Perfect for PDFs and forms',
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="shrink-0 text-green-500">✓</span>
                    <p className="text-sm font-medium text-slate-700">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Example */}
        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-xl">
              <h2 className="mb-8 font-display text-2xl font-semibold text-slate-900">
                Example
              </h2>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex h-36 items-center justify-center bg-amber-50">
                  <span className="font-[cursive] text-3xl italic text-slate-700">
                    John Smith
                  </span>
                </div>
                <div className="flex h-8 items-center justify-center border-y border-slate-100 bg-slate-50">
                  <span className="text-xs text-slate-400">
                    → paper background removed
                  </span>
                </div>
                <div
                  className="flex h-36 items-center justify-center"
                  style={{ background: CHECKER }}
                >
                  <span className="font-[cursive] text-3xl italic text-slate-700">
                    John Smith
                  </span>
                </div>
                <p className="py-2 text-center text-xs font-medium text-slate-500">
                  Paper signature → transparent signature
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* SEO */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Digital Signature Images
              </h2>
              <p className="mt-4 text-slate-600">
                Transparent signature images are commonly used in:
              </p>
              <ul className="mt-4 space-y-2">
                {USES.map((u) => (
                  <li key={u} className="flex items-center gap-3 text-slate-600">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                A transparent signature PNG can be inserted directly into Word
                documents, Google Docs, PDFs, or any design software. The
                signature sits naturally on the page without a visible
                background box.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
