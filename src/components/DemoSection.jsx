import { Container } from '@/components/Container'

function ArrowRight() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <div className="flex items-center gap-[3px]">
        {[0, 0.15, 0.3].map((delay, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-slate-600"
            style={{
              opacity: 0.35 + i * 0.25,
              animation: `pulse 1.4s ease-in-out infinite ${delay}s`,
            }}
          />
        ))}
      </div>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#64748b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  )
}

function InputImageCard({ label, color, accent, icon, optional }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative flex h-[90px] w-[130px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 ${color} shadow-lg`}
      >
        <span className="text-2xl">{icon}</span>
        <span className={`text-[0.65rem] font-semibold ${accent}`}>{label}</span>
        {optional && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[0.55rem] text-white/70">
            optional
          </span>
        )}
      </div>
    </div>
  )
}

function ThumbnailResult({
  label,
  sublabel,
  gradient,
  tag,
  tagColor,
  image,
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[112px] w-[200px] overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10">
        
        {/* IMAGE */}
        <img
          src={image}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${gradient} opacity-60`} />

        {/* Play icon */}
        <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
            <polygon points="2,1 7,4 2,7" />
          </svg>
        </div>

        {/* Text bars */}
        <div className="absolute bottom-3 right-3 space-y-1">
          <div className="h-2 w-24 rounded-full bg-white/30" />
          <div className="h-2 w-16 rounded-full bg-white/20" />
        </div>

        {/* Tag */}
        {tag && (
          <span
            className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold text-white ${tagColor}`}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500">{sublabel}</p>
      </div>
    </div>
  )
}

export function DemoSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
      <style>{`@keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}`}</style>

      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,59,48,0.08)_0%,transparent_70%)]" />

      <Container className="relative">
        {/* Headline */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Upload images. Get a click-ready thumbnail.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Whether you have a face shot, a background, or both — AI composes
            a thumbnail designed to get more clicks.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">

          {/* Step 1: Input images */}
          <div className="flex flex-col items-center gap-3">
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
              Step 1 — Upload images
            </span>
            <div className="flex items-center gap-3">
              <InputImageCard
                label="Face / Subject"
                color="border-red-500/40 bg-red-950/50"
                accent="text-red-300"
                icon="🤳"
              />
              <span className="text-lg text-slate-600">+</span>
              <InputImageCard
                label="Background"
                color="border-blue-500/40 bg-blue-950/50"
                accent="text-blue-300"
                icon="🖼️"
                optional
              />
            </div>
          </div>

          <ArrowRight />

          {/* Step 2: AI badge */}
          <div className="flex flex-col items-center gap-3">
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
              Step 2 — AI processes
            </span>
            <div className="flex h-[90px] w-[110px] flex-col items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 shadow-lg shadow-purple-900/30">
              <span className="text-2xl">✨</span>
              <div className="space-y-1 px-3">
                <div className="h-1.5 w-full rounded-full bg-purple-400/30" />
                <div className="h-1.5 w-3/4 rounded-full bg-purple-400/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-purple-400/15" />
              </div>
            </div>
          </div>

          <ArrowRight />

          {/* Step 3: Result */}
          <div className="flex flex-col items-center gap-3">
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
              Step 3 — Your thumbnail
            </span>
            <div className="relative flex h-[90px] w-[160px] items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/60 via-slate-900 to-purple-900/60 shadow-xl shadow-red-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/10" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/40">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                    <polygon points="2,1 9,5 2,9" />
                  </svg>
                </div>
                <span className="font-[system-ui] text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
                  1280 × 720
                </span>
              </div>
              <span className="absolute -right-1 -top-1 animate-[sparkle_1.5s_ease-in-out_infinite] text-base">
                ✨
              </span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mx-auto mt-14 max-w-3xl border-t border-white/8" />

        {/* Variant results */}
        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-8">
         <ThumbnailResult
  label="With face shot"
  sublabel="Face + background = high-CTR layout"
  gradient="bg-gradient-to-br from-red-900 via-slate-900 to-slate-800"
  tag="Most clicked"
  tagColor="bg-red-500"
  image="/demo/face-shot.png"
/>

<ThumbnailResult
  label="Single image"
  sublabel="One image, AI composes the rest"
  gradient="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800"
  tag="Works great"
  tagColor="bg-purple-500"
  image="/demo/single-image.png"
/>

<ThumbnailResult
  label="Background only"
  sublabel="Scenery or product, no face needed"
  gradient="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800"
  image="/demo/background-only.png"
/>
        </div>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            '📐 Auto 1280×720 sizing',
            '✨ Image enhancement',
            '✂️ Smart cropping',
            '⬇️ Instant download',
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-white/6 px-4 py-2 text-sm text-slate-400 ring-1 ring-white/10"
            >
              {pill}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
