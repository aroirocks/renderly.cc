import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BgRemoverTool } from '@/components/BgRemoverTool'

export const metadata = {
  title: 'Remove Background from Logo – Make Logo Transparent Free | Renderly',
  description:
    'Remove the background from any logo instantly. Make your logo transparent and download a clean PNG ready for websites, merchandise, or presentations. Free, no sign-up.',
  keywords:
    'remove background from logo, logo background remover, make logo transparent, transparent logo maker, remove white background from logo',
  alternates: { canonical: 'https://renderly.cc/remove-logo-background' },
  openGraph: {
    title: 'Remove Background from Logo | Renderly',
    description:
      'Make your logo transparent instantly. Free tool — upload any logo, download a clean PNG.',
    url: 'https://renderly.cc/remove-logo-background',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Background from Logo | Renderly',
    description:
      'Make any logo transparent in seconds. Free, no sign-up required.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Logo Background Remover – Renderly',
  url: 'https://renderly.cc/remove-logo-background',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Remove the background from any logo file. Download a clean transparent PNG.',
}

const CHECKER =
  'repeating-conic-gradient(#e2e8f0 0% 25%,#f8fafc 0% 50%) 0 / 14px 14px'

export default function RemoveLogoBackgroundPage() {
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
                Remove Background from Logo
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Make your logo transparent instantly.
              </p>
            </div>
            <div className="mt-12">
              <BgRemoverTool
                tool="remove-logo-background"
                buttonLabel="Remove Logo Background"
              />
            </div>
          </Container>
        </section>

        {/* Explanation */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Why Logos Need Transparent Backgrounds
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Logos downloaded from websites often come with a white or
                colored background that does not work on other designs. Placing
                a logo with a white box on a dark header, a colored banner, or a
                printed product looks unprofessional.
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                Renderly removes the background and converts the logo into a
                transparent PNG that can be used for websites, merchandise,
                presentations, email signatures, and anywhere else the brand
                needs to appear cleanly.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  'Perfect for website headers',
                  'Transparent PNG output',
                  'Works with JPG logo files',
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="text-green-500 shrink-0">✓</span>
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
                <div className="flex h-36 items-center justify-center bg-white">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-slate-200">
                    <span className="font-display text-3xl font-bold text-slate-800">
                      R
                    </span>
                  </div>
                </div>
                <div className="flex h-8 items-center justify-center border-y border-slate-100 bg-slate-50">
                  <span className="text-xs text-slate-400">
                    → white background removed
                  </span>
                </div>
                <div
                  className="flex h-36 items-center justify-center"
                  style={{ background: CHECKER }}
                >
                  <div className="flex h-20 w-20 items-center justify-center">
                    <span className="font-display text-3xl font-bold text-slate-800">
                      R
                    </span>
                  </div>
                </div>
                <p className="py-2 text-center text-xs font-medium text-slate-500">
                  Logo with white background → transparent logo
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
                Why Transparent Logos Are Important
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Transparent logos allow brands to place their logo on any color
                or background without visible edges or boxes. Whether you are
                placing the logo on a dark nav bar, a colored slide, or printed
                merchandise, a transparent PNG adapts without any manual editing.
                This is the standard format used by design professionals,
                developers, and marketing teams.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
