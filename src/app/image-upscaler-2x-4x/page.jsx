import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { UpscalerClient } from './UpscalerClient'

const schemaWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Image Upscaler – Renderly',
  url: 'https://renderly.cc/image-upscaler-2x-4x',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free – no sign-up required',
  },
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does 2x vs 4x upscaling mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2x doubles the width and height of your image (4× more pixels total). 4x quadruples both dimensions (16× more pixels). Use 2x for most purposes — it\'s faster and produces a large enough output for print and screen. 4x is for large-format printing or when maximum detail is needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats does the upscaler support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can upload JPG, PNG, or WebP images. The output format is your choice — PNG for lossless quality, JPG for smaller file size, or WebP for modern web use.',
      },
    },
  ],
}

export const metadata = {
  title: 'AI Image Upscaler — Increase Resolution 2x & 4x Online Free | Renderly',
  description:
    'Upscale any image online with AI. Increase image resolution 2x or 4x instantly — enhance image quality, sharpen details, and improve image quality online. Free, no sign-up.',
  keywords:
    'increase image resolution online, upscale image online, image upscaler 2x, image upscaler 4x, enhance image resolution, improve image quality online, ai image upscaler',
  alternates: {
    canonical: 'https://renderly.cc/image-upscaler-2x-4x',
  },
  openGraph: {
    title: 'AI Image Upscaler — Increase Resolution 2x & 4x Online Free | Renderly',
    description:
      'Upscale any image online with AI. Increase image resolution 2x or 4x instantly — enhance image quality, sharpen details, and improve image quality online. Free, no sign-up.',
    url: 'https://renderly.cc/image-upscaler-2x-4x',
    siteName: 'Renderly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Upscaler — Increase Resolution 2x & 4x Online Free | Renderly',
    description:
      'Upscale any image online with AI. Increase image resolution 2x or 4x instantly — enhance image quality, sharpen details, and improve image quality online. Free, no sign-up.',
  },
}

export default function ImageUpscalerPage() {
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
        {/* ── Hero + tool ─────────────────────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700">
                ✨ Free · No sign-up needed · 2x & 4x
              </span>
              <h1 className="mt-4 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                AI Image Upscaler — 2x & 4x
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Increase image resolution online instantly. Upload any image and enhance it 2x or
                4x with AI — sharper details, more pixels, ready to print or use at any size.
              </p>
            </div>

            <div className="mt-12">
              <UpscalerClient />
            </div>
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────────────────── */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
              How AI Image Upscaling Works
            </h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                Traditional upscaling simply stretches pixels — the result looks blurry and
                lacking in detail because no new information is added. AI upscaling works
                differently: a neural network analyses the patterns and textures in your image and
                intelligently predicts what the missing pixels should look like. The result is a
                sharper, cleaner image with recovered detail rather than a blurry enlargement.
              </p>
              <p>
                Our upscaler is trained on millions of images across a wide range of subjects —
                portraits, landscapes, product shots, illustrations, and more. It sharpens edges,
                recovers fine texture, and improves overall clarity, whether you are enlarging a
                small product thumbnail or rescuing an old low-resolution photograph.
              </p>
              <p>
                The process runs entirely on the server — there is nothing to install, no account
                to create, and no data stored after your result is delivered. Upload your image,
                choose your scale factor, and download the enhanced version in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* ── Use cases ───────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
              When to Upscale an Image
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: '🖨️', title: 'Print larger', desc: 'Prepare small images for large-format printing without quality loss.' },
                { icon: '🔍', title: 'Fix low-res photos', desc: 'Recover detail from old or compressed photos that look blurry or pixelated.' },
                { icon: '🛍️', title: 'Enhance product images', desc: 'Sharpen e-commerce product shots so they look crisp at every zoom level.' },
                { icon: '🖼️', title: 'Improve old photos', desc: 'Breathe new life into scanned or archival images with limited original resolution.' },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center"
                >
                  <span className="text-3xl">{icon}</span>
                  <p className="mt-3 font-semibold text-slate-900">{title}</p>
                  <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2x vs 4x SEO ────────────────────────────────────────────────── */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
              2x vs 4x: Which Should You Choose?
            </h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                For most use cases, 2x upscaling is the right choice. It doubles both the width
                and height of your image — meaning the total pixel count increases by a factor of
                four. This is more than enough for screen display at any size, for standard print
                (A4 or letter), and for most product or social media uses. The processing time is
                faster and the output file size is smaller.
              </p>
              <p>
                Choose 4x when you need the absolute maximum resolution — large-format poster
                printing, billboard graphics, or cases where you are starting from a very small
                source image and need to reach a very high pixel count. The output will be
                significantly larger, and processing takes longer, but the quality gain is
                substantial when you genuinely need that many pixels.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <dl className="mt-8 space-y-6">
              {schemaFaq.mainEntity.map(({ name, acceptedAnswer }) => (
                <div key={name} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <dt className="font-semibold text-slate-900">{name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    {acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
