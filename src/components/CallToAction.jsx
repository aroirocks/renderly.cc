import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const highlights = [
  { emoji: '⚡', label: 'Faster than Photoshop' },
  { emoji: '🎯', label: 'Cleaner than generic templates' },
  { emoji: '▶️', label: 'Built for YouTube, not posters' },
]

const stats = [
  { value: '3.2×', label: 'avg CTR boost' },
  { value: '8 sec', label: 'avg gen time' },
  { value: '10k+', label: 'thumbnails made' },
]

export function CallToAction() {
  return (
    <section
      id="why-better"
      className="bg-slate-900 py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Why creators use AI instead of editing manually
          </h2>
          <p className="mt-4 text-lg leading-relaxed tracking-tight text-slate-400">
            Designing thumbnails manually takes time and skill. AI removes the
            guesswork by automatically improving composition and visual impact —
            so your thumbnail looks professional and gets more clicks without effort.
          </p>

          {/* CTR stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 border-y border-white/10 py-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-white/15"
              >
                {h.emoji} {h.label}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/ai-youtube-thumbnail-maker" color="red">
              Create My Thumbnail — It&apos;s Free
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
