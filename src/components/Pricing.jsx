import { Container } from '@/components/Container'

const badges = [
  { icon: '📐', label: '16:9 aspect ratio' },
  { icon: '🔍', label: 'High resolution' },
  { icon: '✅', label: 'Ready to upload' },
]

export function Pricing() {
  return (
    <section
      id="output-quality"
      aria-labelledby="output-quality-title"
      className="bg-slate-900 py-20 sm:py-32"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2
              id="output-quality-title"
              className="font-display text-3xl tracking-tight text-white sm:text-4xl"
            >
              YouTube-ready output
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Every thumbnail is generated in the correct aspect ratio and
              resolution recommended by YouTube, so it looks sharp on mobile,
              desktop, and TV.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20"
                >
                  {badge.icon} {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
              <img
                src="/images/youtube_ready_output.png"
                alt="Example AI-generated YouTube thumbnail in 1280x720 resolution"
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              1280×720 · 16:9 · YouTube recommended resolution
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
