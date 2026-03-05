import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BgRemoverTool } from '@/components/BgRemoverTool'

export const metadata = {
  title: 'Make Image Transparent Online – Free PNG Transparency Tool | Renderly',
  description:
    'Turn any photo or logo into a transparent PNG instantly. Free online tool — no design skills or sign-up required. Perfect for logos, stickers, and website graphics.',
  keywords:
    'make image transparent, transparent background online, remove background make transparent, png transparency tool, make photo transparent online',
  alternates: { canonical: 'https://renderly.cc/make-image-transparent' },
  openGraph: {
    title: 'Make Image Transparent Online | Renderly',
    description:
      'Turn any photo into a transparent PNG instantly. Free, no sign-up.',
    url: 'https://renderly.cc/make-image-transparent',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make Image Transparent Online | Renderly',
    description:
      'Remove the background and export a clean transparent PNG. Free.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Make Image Transparent – Renderly',
  url: 'https://renderly.cc/make-image-transparent',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Turn any photo or logo into a transparent PNG using AI. Free, no sign-up.',
}

const CHECKER =
  'repeating-conic-gradient(#e2e8f0 0% 25%,#f8fafc 0% 50%) 0 / 14px 14px'

const USE_CASES = [
  'Website design — place graphics on any background',
  'Logos — use on light or dark headers without white boxes',
  'Presentations — overlay graphics on slides cleanly',
  'Product photos — isolate items for ecommerce listings',
]

export default function MakeImageTransparentPage() {
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
                Make Image Transparent Online
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Turn any photo into a transparent PNG instantly.
              </p>
            </div>
            <div className="mt-12">
              <BgRemoverTool
                tool="make-image-transparent"
                buttonLabel="Make Transparent"
              />
            </div>
          </Container>
        </section>

        {/* Use cases */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Where Transparent Images Are Used
              </h2>
              <p className="mt-4 text-slate-600">
                Transparent images are essential in many creative and
                professional workflows:
              </p>
              <ul className="mt-5 space-y-3">
                {USE_CASES.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-slate-600">
                Renderly removes the background from your image and exports it
                as a PNG with full transparency, ready to use anywhere.
              </p>
            </div>
          </Container>
        </section>

        {/* Features */}
        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-display text-2xl font-semibold text-slate-900">
                How It Works
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Upload',
                    desc: 'Drop any JPG, PNG, or WebP image',
                  },
                  {
                    step: '2',
                    title: 'AI Processes',
                    desc: 'Background removed with precise edge detection',
                  },
                  {
                    step: '3',
                    title: 'Download',
                    desc: 'Get a clean transparent PNG instantly',
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                      {s.step}
                    </div>
                    <h3 className="font-semibold text-slate-800">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Examples */}
        <section className="bg-slate-50 py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-display text-2xl font-semibold text-slate-900">
                Examples
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Logo', bg: 'bg-white', emoji: '🔵', desc: 'Logo with background' },
                  { label: 'Sticker', bg: 'bg-yellow-50', emoji: '⭐', desc: 'Sticker graphic' },
                ].map((ex) => (
                  <div
                    key={ex.label}
                    className="overflow-hidden rounded-xl border border-slate-200"
                  >
                    <div
                      className={`flex h-32 items-center justify-center ${ex.bg} border-b border-slate-100`}
                    >
                      <span className="text-6xl">{ex.emoji}</span>
                    </div>
                    <div className="flex h-7 items-center justify-center bg-slate-100">
                      <span className="text-xs text-slate-400">→ transparent PNG</span>
                    </div>
                    <div
                      className="flex h-32 items-center justify-center"
                      style={{ background: CHECKER }}
                    >
                      <span className="text-6xl">{ex.emoji}</span>
                    </div>
                    <p className="py-2 text-center text-xs font-medium text-slate-600">
                      {ex.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* SEO */}
        <section className="bg-white py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Why Transparent Images Matter
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Transparent PNG images allow graphics to be placed on any
                background without visible borders or white boxes. This makes
                them essential for websites, design assets, and branding.
                Without transparency, images always carry a background color
                that clashes with the destination design. A transparent PNG
                eliminates that entirely — the subject floats cleanly on
                whatever it is placed on.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
