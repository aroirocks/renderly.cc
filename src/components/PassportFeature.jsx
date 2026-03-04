import Link from 'next/link'
import { Container } from '@/components/Container'

function SheetMockup() {
  return (
    <div className="relative mx-auto max-w-sm">
      {/* A4 sheet */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        {/* Sheet label */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-xs font-medium text-slate-500">A4 Print Sheet — 8 copies</span>
        </div>

        {/* 2×4 photo grid */}
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-slate-100"
              style={{ aspectRatio: '35/45' }}
            >
              {/* Simulated face silhouette */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div className="h-5 w-5 rounded-full bg-slate-300" />
                <div className="h-8 w-7 rounded-t-full bg-slate-200" />
              </div>
              {/* Dashed cut guide border */}
              <div className="absolute inset-0 rounded-lg border border-dashed border-slate-300" />
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-slate-400">
          Cut guides included · Print-ready PNG
        </p>
      </div>

      {/* 4×6 sheet below */}
      <div className="relative mt-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-md">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="text-xs font-medium text-slate-500">4×6 Sheet — 4 copies</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded bg-slate-100"
              style={{ aspectRatio: '35/45' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <div className="h-5 w-4 rounded-t-full bg-slate-200" />
              </div>
              <div className="absolute inset-0 rounded border border-dashed border-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PassportFeature() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              New Feature
            </div>

            <h2 className="mt-4 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              Passport Photo Maker
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Convert any photo into a biometric passport photo instantly. White background,
              correct dimensions, and print-ready sheets — free, no sign-up required.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                { icon: '🌍', text: '15 countries supported — US, India, UK, EU, and more' },
                { icon: '✂️', text: 'AI removes background and replaces with clean white' },
                { icon: '🖨️', text: 'Download A4 sheet (8 copies) or 4×6 sheet (4 copies)' },
                { icon: '⚡', text: 'Result in under 2 minutes — no editing skills needed' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-base">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/passport-photo-maker"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                🪪 Make My Passport Photo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <p className="mt-2 text-xs text-slate-400">Free · No account · Works for any country</p>
            </div>
          </div>

          {/* Right: sheet mockup */}
          <div className="lg:pl-8">
            <SheetMockup />
          </div>
        </div>
      </Container>
    </section>
  )
}
