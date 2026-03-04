import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/Container"

export function MoreAITools() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            More AI Image Tools
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From YouTube thumbnails to passport size photos — AI handles the hard part.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-8 shadow-lg sm:p-12">

          {/* NEW badge */}
          <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Free online passport size photo maker
              </p>

              <h3 className="mt-2 font-display text-3xl font-semibold text-slate-900">
                Passport Photo Maker
              </h3>

              <p className="mt-4 text-lg text-slate-600">
                Convert any picture to passport size instantly — white background,
                correct dimensions, and print-ready sheets. No design skills needed.
              </p>

              {/* Feature bullets */}
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  AI removes background — clean white result
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Correct size for US, UK, India, EU and 11 more countries
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Download A4 sheet (8 copies) or 4×6 sheet (4 copies)
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href="/passport-photo-maker"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                >
                  Create Passport Photo
                </Link>

                <p className="mt-2 text-xs text-slate-400">
                  No signup required
                </p>
              </div>
            </div>

            {/* RIGHT SIDE VISUAL */}
            <div className="rounded-2xl bg-gradient-to-b from-blue-50 to-white p-6 shadow-inner">

              {/* INPUT → RESULT */}
              <div className="flex items-center justify-center gap-4">

                <div className="text-center">
                  <span className="mb-2 block text-xs font-medium text-slate-400">
                    INPUT
                  </span>
                  <Image
                    src="/images/main_img.jpg"
                    alt="Input selfie"
                    width={140}
                    height={180}
                    className="rounded-2xl shadow-md"
                  />
                </div>

                <div className="flex flex-col items-center text-blue-500">
                  <span className="text-xs font-medium">AI</span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                <div className="text-center">
                  <span className="mb-2 block text-xs font-medium text-slate-400">
                    PASSPORT
                  </span>
                  <Image
                    src="/images/passport-photo.png"
                    alt="Generated passport photo"
                    width={140}
                    height={180}
                    className="rounded-2xl border shadow-md"
                  />
                </div>

              </div>

              {/* PRINT SHEET */}
              <div className="mt-8 text-center">
                <span className="mb-3 block text-xs font-medium text-slate-400">
                  PRINT SHEET
                </span>

                <Image
                  src="/images/a4_sheet.png"
                  alt="Passport photo A4 sheet"
                  width={340}
                  height={220}
                  className="mx-auto rounded-xl border shadow-sm"
                />
              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}