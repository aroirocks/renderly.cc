import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BgRemoverTool } from '@/components/BgRemoverTool'

export const metadata = {
  title:
    'Passport Photo Background Remover – Clean White Background | Renderly',
  description:
    'Remove the background from any photo and replace it with a clean white background for passport, visa, and ID photos. Free, instant, no sign-up required.',
  keywords:
    'passport photo background remover, remove background passport photo, id photo background, visa photo background remover, passport photo white background',
  alternates: {
    canonical: 'https://renderly.cc/passport-photo-background-remover',
  },
  openGraph: {
    title: 'Passport Photo Background Remover | Renderly',
    description:
      'Remove the background from any photo and get a clean white background for passport and ID photos. Free.',
    url: 'https://renderly.cc/passport-photo-background-remover',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passport Photo Background Remover | Renderly',
    description:
      'Get a clean white background on any photo for passport or ID use. Free.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Passport Photo Background Remover – Renderly',
  url: 'https://renderly.cc/passport-photo-background-remover',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Remove the background from any portrait photo and replace it with a clean white background suitable for passport, visa, and ID photos.',
}

export default function PassportPhotoBgRemoverPage() {
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
                Passport Photo Background Remover
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Convert a regular photo into a passport-ready image with a clean
                background.
              </p>
            </div>
            <div className="mt-12">
              <BgRemoverTool
                tool="passport-photo-background-remover"
                buttonLabel="Process Photo"
              />
            </div>
          </Container>
        </section>

        {/* Explanation */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Passport-Ready Background in Seconds
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Passport and visa photos require a specific background — usually
                plain white or off-white — with the subject centered and clearly
                visible. Renderly automatically removes the existing background
                from your photo and replaces it with a clean white background so
                the image meets the standard requirements for ID documents.
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                This tool is ideal when you have a good portrait photo but the
                background is unsuitable for official use — a busy environment,
                a colored wall, or an outdoor background.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  'Clean white background output',
                  'Portrait detection included',
                  'Passport-ready result',
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
                <div className="flex h-40 items-center justify-center bg-linear-to-br from-green-100 to-blue-100">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 rounded-full bg-amber-300" />
                    <div className="h-14 w-12 rounded-t-full bg-amber-200" />
                  </div>
                </div>
                <div className="flex h-8 items-center justify-center border-y border-slate-100 bg-slate-50">
                  <span className="text-xs text-slate-400">
                    → background replaced with white
                  </span>
                </div>
                <div className="flex h-40 items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 rounded-full bg-amber-300" />
                    <div className="h-14 w-12 rounded-t-full bg-amber-200" />
                  </div>
                </div>
                <p className="py-2 text-center text-xs font-medium text-slate-500">
                  Casual photo → clean white background
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Want the full passport photo? */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-white p-8 text-center shadow-sm">
              <h2 className="font-display text-xl font-semibold text-slate-900">
                Need a Full Passport Photo?
              </h2>
              <p className="mt-3 text-slate-600">
                The{' '}
                <a
                  href="/passport-photo-maker"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Passport Photo Maker
                </a>{' '}
                does everything in one step — background removal, correct
                country dimensions, and printable A4 and 4×6 sheets.
              </p>
              <a
                href="/passport-photo-maker"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Go to Passport Photo Maker
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
