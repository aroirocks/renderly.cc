import Image from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const rand = (min, max) => Math.random() * (max - min) + min

// ─── Sub-components ──────────────────────────────────────────────────────────

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-yellow-400 bg-amber-50 px-3.5 py-1.5 font-[Architects_Daughter] text-sm text-yellow-800 animate-[float_3s_ease-in-out_infinite]">
      {children}
    </div>
  )
}

function StatDivider() {
  return <div className="w-px self-stretch bg-stone-200" />
}

function Stat({ num, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[Syne] text-2xl font-extrabold text-slate-900">{num}</span>
      <span className="text-xs uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  )
}

function UploadCloudIcon({ className }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  )
}

function ImagePlaceholderIcon({ stroke }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function PlayCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="rgba(255,59,48,0.8)" />
      <polygon points="10,8 16,12 10,16" fill="white" />
    </svg>
  )
}

// ─── Upload Zone ─────────────────────────────────────────────────────────────

function UploadZone() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Doodle arrows */}
      <svg
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-50 animate-[wiggle_2.5s_ease-in-out_infinite]"
        width="40"
        height="60"
        viewBox="0 0 40 60"
        fill="none"
      >
        <path d="M35 5 C10 10, 5 30, 8 55" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
        <path d="M3 50 L8 57 L14 50" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* <svg
        className="absolute -top-5 left-1/2 -translate-x-[60%] opacity-45 animate-[wiggle_3s_ease-in-out_infinite_0.5s]"
        width="80"
        height="35"
        viewBox="0 0 80 35"
        fill="none"
      >
        <path d="M5 5 C30 3, 60 8, 72 30" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
        <path d="M66 32 L73 28 L76 35" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg> */}

      {/* Scribble labels */}
      <span className="absolute -top-6 left-8 -rotate-[5deg] font-[Architects_Daughter] text-xs text-slate-500 opacity-70 pointer-events-none">
        Drop 'em here! ↓
      </span>
      <span className="absolute -bottom-4 right-10 rotate-[3deg] font-[Architects_Daughter] text-xs text-slate-500 opacity-70 pointer-events-none">
        max 2 images ↑
      </span>

      {/* Main upload card */}
      <div className="cursor-pointer rounded-3xl border-[3px] border-slate-900 bg-white shadow-[6px_6px_0_#1A1A2E] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#1A1A2E] p-9 pb-7">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-[2.5px] border-dashed border-stone-300 bg-amber-50 p-8">

          {/* Cloud icon */}
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-slate-900 bg-gradient-to-br from-indigo-50 to-indigo-100 animate-[bounce_2s_ease-in-out_infinite]">
            <UploadCloudIcon />
          </div>

          <p className="font-[Syne] text-[0.95rem] font-bold text-slate-900 text-center">
            Drag & drop up to 2 images<br />or click to upload
          </p>
          <p className="text-xs text-slate-500 text-center">PNG, JPG, WEBP · Max 10MB each</p>

          <button className="mt-1 rounded-full bg-slate-900 px-5 py-2 text-[0.82rem] font-medium text-white">
            Browse files
          </button>

          {/* Tilted image placeholders */}
          <div className="relative mt-5 h-28 w-full flex items-center justify-center">
            <div className="absolute flex h-[100px] w-[160px] -translate-x-14 -rotate-[4deg] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-slate-900 bg-gradient-to-br from-red-50 to-red-100 shadow-[3px_3px_0_#1A1A2E] z-10">
              <ImagePlaceholderIcon stroke="#F87171" />
              <span className="font-[Architects_Daughter] text-[0.65rem] text-slate-500 px-2 text-center">Image 1</span>
            </div>
            <div className="absolute flex h-[100px] w-[160px] translate-x-14 rotate-[3deg] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-slate-900 bg-gradient-to-br from-blue-50 to-blue-100 shadow-[3px_3px_0_#1A1A2E] z-20">
              <ImagePlaceholderIcon stroke="#60A5FA" />
              <span className="font-[Architects_Daughter] text-[0.65rem] text-slate-500 px-2 text-center">Image 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flow path */}
      <div className="mt-5 flex w-full items-center justify-between gap-2 px-2.5">

        <FlowStep emoji="📤" label={<>Upload<br />Images</>} />

        <FlowArrow>
          <span className="rounded-full bg-gradient-to-r from-violet-600 to-purple-500 px-2 py-0.5 font-[Architects_Daughter] text-[0.65rem] text-white whitespace-nowrap">
            ✨ AI Magic
          </span>
        </FlowArrow>

        <FlowStep emoji="⚙️" label={<>AI<br />Processes</>} />

        <FlowArrow />

<div className="relative flex flex-1 flex-col items-center gap-1.5">

  {/* Card wrapper */}
  <div className="relative w-[140px]">

    {/* Thumbnail card */}
    <div className="relative flex h-[88px] w-[140px] items-center justify-center overflow-hidden rounded-[10px] border-2 border-slate-900 shadow-[3px_3px_0_#1A1A2E,0_0_24px_rgba(124,58,237,0.4),0_0_48px_rgba(124,58,237,0.15)] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-purple-500/20" />

      <div className="relative z-10 flex flex-col items-center gap-1">
        <PlayCircle />
        <span className="font-[Syne] text-[0.55rem] font-extrabold uppercase tracking-widest text-white text-center">
          Your Thumbnail
        </span>
      </div>
    </div>

    {/* Sparkles (centered relative to card) */}
  <span
  className="pointer-events-none absolute animate-[sparkle_1.5s_ease-in-out_infinite] text-base"
  style={{
    top: `${rand(5, 20)}%`,
    left: `${rand(10, 80)}%`,
  }}
>
  ✨
</span>

<span
  className="pointer-events-none absolute animate-[sparkle_1.5s_ease-in-out_infinite_0.5s] text-base"
  style={{
    top: `${rand(60, 85)}%`,
    left: `${rand(5, 40)}%`,
  }}
>
  ⭐
</span>

<span
  className="pointer-events-none absolute animate-[sparkle_1.5s_ease-in-out_infinite_1s] text-[0.7rem]"
  style={{
    top: `${rand(20, 70)}%`,
    left: `${rand(60, 90)}%`,
  }}
>
  ✦
</span>

  </div>

  {/* Caption */}
  <span className="font-[Architects_Daughter] text-center text-[0.72rem] leading-tight text-slate-500">
    Epic<br />Thumbnail!
  </span>
</div>

      </div>
    </div>
  )
}

function FlowStep({ emoji, label }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-slate-900 bg-white text-lg shadow-[2px_2px_0_#1A1A2E]">
        {emoji}
      </div>
      <span className="font-[Architects_Daughter] text-center text-[0.72rem] leading-tight text-slate-500">
        {label}
      </span>
    </div>
  )
}

function FlowArrow({ children }) {
  return (
    <div className="flex flex-[0.5] flex-col items-center gap-0.5">
      <div className="flex items-center gap-[3px]">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="h-[5px] w-[5px] rounded-full bg-slate-400"
            style={{
              opacity: 0.4 + i * 0.2,
              animation: i > 0 ? `pulse 1.2s ease-in-out infinite ${delay}s` : undefined,
            }}
          />
        ))}
      </div>
      {children && <div className="mt-1">{children}</div>}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <Container className="overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes wiggle  { 0%,100%{transform:translateY(-50%) rotate(0deg)} 25%{transform:translateY(-50%) rotate(5deg)} 75%{transform:translateY(-50%) rotate(-5deg)} }
        @keyframes pulse   { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1) rotate(0deg)} 50%{opacity:.5;transform:scale(1.4) rotate(20deg)} }
        @keyframes fadeUp  { to{opacity:1;transform:translateY(0) scale(1)} }

        .hero-left-item {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
        }
        .upload-scene-anim {
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          animation: fadeUp 0.7s ease forwards 0.35s;
        }
      `}</style>

      <section className="grid grid-cols-1 gap-10 px-15 py-15 pb-20 lg:grid-cols-[1fr_1.1fr] lg:min-h-screen lg:items-center relative">

        {/* BG orbs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,59,48,0.08)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-20 left-48 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06)_0%,transparent_70%)]" />

        {/* ── LEFT ── */}
        <div className="relative z-10 flex flex-col gap-6">

          <div className="hero-left-item" style={{ animationDelay: '0.1s' }}>
            <Badge>✨ Powered by AI Magic</Badge>
          </div>

          <h1
            className="hero-left-item font-[Syne] text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900"
            style={{ animationDelay: '0.2s' }}
          >
            Create{' '}
            <span className="relative inline-block text-red-500">
              <span className="relative z-10">Scroll-Stopping</span>
              <span className="absolute bottom-0.5 left-0 -z-10 h-2 w-full rounded bg-yellow-400 opacity-60" />
            </span>{' '}
            YouTube Thumbnails in Seconds
          </h1>

          <p
            className="hero-left-item max-w-[460px] text-[1.05rem] leading-relaxed text-slate-600"
            style={{ animationDelay: '0.3s' }}
          >
            Upload up to two images, add your text, and let AI design a high-CTR
            thumbnail — no design skills needed.
          </p>

          <div
            className="hero-left-item mt-2 flex items-center gap-5"
            style={{ animationDelay: '0.4s' }}
          >
            <Button href="/ai-youtube-thumbnail-maker">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Upload Images
            </Button>
            <span className="font-[Architects_Daughter] text-sm text-slate-500">
              Free · No sign-up needed
            </span>
          </div>

          <div
            className="hero-left-item mt-4 flex gap-8"
            style={{ animationDelay: '0.5s' }}
          >
            <Stat num="10K+" label="Thumbnails Created" />
            <StatDivider />
            <Stat num="3.2×" label="Avg CTR Boost" />
            <StatDivider />
            <Stat num="8 sec" label="Avg Gen Time" />
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="upload-scene-anim relative z-10 flex flex-col items-center">
          <UploadZone />
        </div>

      </section>
    </Container>
  )
}