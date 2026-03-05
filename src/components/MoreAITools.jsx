import Link from 'next/link'
import { Container } from '@/components/Container'

/* ── Shimmer keyframe (same as tool pages) ──────────────────────────────── */
function ShimmerStyle() {
  return (
    <style>{`
      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
    `}</style>
  )
}

/* Reusable shimmer overlay (same gradient as tool pages) */
function Shimmer({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.38) 50%, transparent 65%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.8s 0s infinite linear',
      }}
    />
  )
}

/* ── YouTube Thumbnail illustration ──────────────────────────────────────── */
function ThumbnailIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Video frame */}
        <rect x="20" y="12" width="220" height="126" rx="10" fill="#1e293b" />
        {/* Gradient footer bar */}
        <rect x="20" y="108" width="220" height="30" rx="0" fill="#0f172a" opacity="0.5" />
        <rect x="20" y="118" width="220" height="20" rx="10" fill="#0f172a" opacity="0.4" />
        {/* Ping ring behind play button */}
        <circle cx="130" cy="67" r="36" fill="#dc2626" opacity="0.18">
          <animate attributeName="r" values="30;42;30" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0;0.18" dur="1.6s" repeatCount="indefinite" />
        </circle>
        {/* Play circle */}
        <circle cx="130" cy="67" r="28" fill="#dc2626" />
        {/* Play triangle */}
        <polygon points="123,56 123,78 147,67" fill="white" />
        {/* AI sparkle top-right — floating up/down */}
        <g>
          <line x1="200" y1="26" x2="200" y2="38" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="194" y1="32" x2="206" y2="32" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;0 -4;0 0" dur="1.2s" repeatCount="indefinite" />
        </g>
        {/* Small sparkle bottom-left */}
        <line x1="52" y1="106" x2="52" y2="114" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="110" x2="56" y2="110" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        {/* Traffic light dots */}
        <circle cx="38" cy="22" r="3" fill="#ef4444" />
        <circle cx="49" cy="22" r="3" fill="#f59e0b" />
        <circle cx="60" cy="22" r="3" fill="#22c55e" />
        {/* AI badge bottom */}
        <rect x="100" y="117" width="60" height="14" rx="7" fill="#dc2626" opacity="0.9" />
        <text x="130" y="127.5" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="bold">AI Thumbnail</text>
      </svg>
      <Shimmer className="rounded-xl" />
    </div>
  )
}

/* ── Passport Photo illustration ─────────────────────────────────────────── */
function PassportIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Card shadow */}
        <rect x="58" y="22" width="144" height="115" rx="9" fill="#bfdbfe" />
        {/* ID Card */}
        <rect x="54" y="16" width="144" height="115" rx="9" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
        {/* Photo area */}
        <rect x="68" y="30" width="55" height="68" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        {/* Face */}
        <circle cx="95" cy="53" r="14" fill="#3b82f6" />
        {/* Shoulders */}
        <path d="M70 98 Q70 78 95 78 Q120 78 120 98" fill="#3b82f6" />
        {/* Text lines */}
        <rect x="132" y="36" width="54" height="6" rx="3" fill="#dbeafe" />
        <rect x="132" y="48" width="42" height="5" rx="2.5" fill="#e0f2fe" />
        <rect x="132" y="59" width="50" height="5" rx="2.5" fill="#e0f2fe" />
        {/* Size badge */}
        <rect x="132" y="72" width="56" height="18" rx="4" fill="#2563eb" />
        <text x="160" y="84" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold">35 × 45 mm</text>
        {/* MRZ lines */}
        <rect x="68" y="110" width="116" height="5" rx="2" fill="#f1f5f9" />
        <rect x="68" y="119" width="116" height="5" rx="2" fill="#f1f5f9" />
        {/* Biometric corner marks — pulsing */}
        <path d="M62 24 L62 32 M62 24 L70 24" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M190 24 L190 32 M190 24 L182 24" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </path>
        <path d="M62 131 L62 123 M62 131 L70 131" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="1s" repeatCount="indefinite" />
        </path>
        <path d="M190 131 L190 123 M190 131 L182 131" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </path>
        {/* Scanning line */}
        <line x1="54" y1="30" x2="198" y2="30" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
          <animate attributeName="y1" values="30;131;30" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30;131;30" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </line>
      </svg>
      <Shimmer className="rounded-xl" />
    </div>
  )
}

/* ── Remove Background illustration ──────────────────────────────────────── */
function RemoveBgIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <pattern id="chk-rb" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="5" width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="0" width="5" height="5" fill="#f8fafc" />
            <rect x="0" y="5" width="5" height="5" fill="#f8fafc" />
          </pattern>
          <clipPath id="clip-rb-left">
            <rect x="14" y="18" width="96" height="114" rx="8" />
          </clipPath>
          <clipPath id="clip-rb-right">
            <rect x="150" y="18" width="96" height="114" rx="8" />
          </clipPath>
        </defs>
        {/* LEFT: photo with background */}
        <rect x="14" y="18" width="96" height="114" rx="8" fill="#a78bfa" opacity="0.25" />
        <rect x="14" y="18" width="96" height="114" rx="8" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
        <circle cx="62" cy="56" r="18" fill="#7c3aed" clipPath="url(#clip-rb-left)" />
        <path d="M30 140 Q30 96 62 96 Q94 96 94 140" fill="#7c3aed" clipPath="url(#clip-rb-left)" />
        {/* Animated arrow */}
        <g>
          <line x1="118" y1="75" x2="142" y2="75" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="135,68 142,75 135,82" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;4 0;0 0" dur="1s" repeatCount="indefinite" />
        </g>
        {/* RIGHT: checkerboard + silhouette */}
        <rect x="150" y="18" width="96" height="114" rx="8" fill="url(#chk-rb)" />
        <rect x="150" y="18" width="96" height="114" rx="8" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="198" cy="56" r="18" fill="#7c3aed" clipPath="url(#clip-rb-right)" />
        <path d="M166 140 Q166 96 198 96 Q230 96 230 140" fill="#7c3aed" clipPath="url(#clip-rb-right)" />
        {/* Processing pulse dot on left */}
        <circle cx="62" cy="18" r="5" fill="#8b5cf6">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
      <Shimmer className="rounded-xl" />
    </div>
  )
}

/* ── Make Transparent illustration ───────────────────────────────────────── */
function TransparentIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <pattern id="chk-ti" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="5" width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="0" width="5" height="5" fill="#f8fafc" />
            <rect x="0" y="5" width="5" height="5" fill="#f8fafc" />
          </pattern>
        </defs>
        {/* Back card — checkerboard */}
        <rect x="80" y="38" width="100" height="76" rx="8" fill="url(#chk-ti)" stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Middle card — fading image */}
        <rect x="62" y="26" width="100" height="76" rx="8" fill="#f0fdf4" stroke="#6ee7b7" strokeWidth="1.5">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <circle cx="98" cy="52" r="16" fill="#6ee7b7" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.25;0.85" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <rect x="82" y="74" width="56" height="6" rx="3" fill="#34d399" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <rect x="90" y="84" width="40" height="5" rx="2.5" fill="#6ee7b7" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.4s" repeatCount="indefinite" />
        </rect>
        {/* PNG label chip */}
        <rect x="158" y="20" width="40" height="18" rx="5" fill="#0d9488" />
        <text x="178" y="32" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">PNG</text>
        {/* Dashed line to checkerboard */}
        <line x1="178" y1="42" x2="178" y2="38" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
        </line>
      </svg>
      <Shimmer className="rounded-xl" />
    </div>
  )
}

/* ── Logo Background Remover illustration ────────────────────────────────── */
function LogoBgIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <pattern id="chk-lb" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="5" width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="0" width="5" height="5" fill="#f8fafc" />
            <rect x="0" y="5" width="5" height="5" fill="#f8fafc" />
          </pattern>
        </defs>
        {/* LEFT: logo on white bg */}
        <rect x="20" y="28" width="90" height="90" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <polygon points="65,42 69,57 84,57 73,66 77,81 65,72 53,81 57,66 46,57 61,57" fill="#f97316" />
        <rect x="26" y="106" width="34" height="8" rx="2" fill="#f1f5f9" />
        <text x="43" y="113" textAnchor="middle" fontSize="6" fill="#94a3b8" fontWeight="600">WHITE BG</text>
        {/* Animated arrow */}
        <g>
          <line x1="118" y1="73" x2="142" y2="73" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="135,66 142,73 135,80" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;4 0;0 0" dur="1s" repeatCount="indefinite" />
        </g>
        {/* RIGHT: logo on checkerboard */}
        <rect x="150" y="28" width="90" height="90" rx="10" fill="url(#chk-lb)" stroke="#e2e8f0" strokeWidth="1.5" />
        <polygon points="195,42 199,57 214,57 203,66 207,81 195,72 183,81 187,66 176,57 191,57" fill="#f97316" />
        <rect x="156" y="106" width="46" height="8" rx="2" fill="#fff7ed" />
        <text x="179" y="113" textAnchor="middle" fontSize="6" fill="#ea580c" fontWeight="600">TRANSPARENT</text>
        {/* Ping ring on result logo */}
        <circle cx="195" cy="62" r="24" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.4">
          <animate attributeName="r" values="20;28;20" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <Shimmer className="rounded-xl" />
    </div>
  )
}

/* ── Signature Background Remover illustration ───────────────────────────── */
function SignatureIcon() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <pattern id="chk-sig" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="5" width="5" height="5" fill="#e2e8f0" />
            <rect x="5" y="0" width="5" height="5" fill="#f8fafc" />
            <rect x="0" y="5" width="5" height="5" fill="#f8fafc" />
          </pattern>
        </defs>
        {/* LEFT: paper */}
        <rect x="16" y="22" width="100" height="106" rx="6" fill="#fefce8" stroke="#fde68a" strokeWidth="1.5" />
        <line x1="28" y1="52" x2="104" y2="52" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28" y1="64" x2="104" y2="64" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28" y1="76" x2="104" y2="76" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28" y1="88" x2="104" y2="88" stroke="#fde68a" strokeWidth="0.8" />
        <line x1="28" y1="100" x2="104" y2="100" stroke="#fde68a" strokeWidth="0.8" />
        {/* Signature stroke on paper — drawn animation */}
        <path
          d="M28 78 C36 60 44 72 52 68 C60 64 64 80 72 74 C80 68 84 78 90 72 C94 68 100 74 104 70"
          fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="200" strokeDashoffset="200"
        >
          <animate attributeName="stroke-dashoffset" values="200;0;200" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M46 78 L48 90" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 74 L68 87" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        {/* Animated arrow */}
        <g>
          <line x1="124" y1="75" x2="144" y2="75" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="137,68 144,75 137,82" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;4 0;0 0" dur="1s" repeatCount="indefinite" />
        </g>
        {/* RIGHT: transparent with signature only */}
        <rect x="148" y="22" width="100" height="106" rx="6" fill="url(#chk-sig)" stroke="#e2e8f0" strokeWidth="1.5" />
        <path
          d="M160 78 C168 60 176 72 184 68 C192 64 196 80 204 74 C212 68 216 78 222 72 C226 68 232 74 236 70"
          fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="200" strokeDashoffset="200"
        >
          <animate attributeName="stroke-dashoffset" values="200;0;200" dur="3s" begin="0.3s" repeatCount="indefinite" />
        </path>
        <path d="M178 78 L180 90" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M202 74 L200 87" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        {/* PNG chip */}
        <rect x="206" y="18" width="36" height="16" rx="4" fill="#475569" />
        <text x="224" y="29" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold">PNG</text>
      </svg>
    </div>
  )
}

/* ── Tool data ────────────────────────────────────────────────────────────── */
const TOOLS = [
  {
    name: 'AI YouTube Thumbnail Maker',
    href: '/ai-youtube-thumbnail-maker',
    tagline: 'Generate scroll-stopping thumbnails with AI.',
    bg: 'bg-slate-900',
    badge: null,
    badgeColor: '',
    ctaColor: 'text-red-400',
    icon: <ThumbnailIcon />,
  },
  {
    name: 'Passport Photo Maker',
    href: '/passport-photo-maker',
    tagline: 'Convert any selfie to a biometric passport photo.',
    bg: 'bg-blue-50',
    badge: 'NEW',
    badgeColor: 'bg-blue-600',
    ctaColor: 'text-blue-600',
    icon: <PassportIcon />,
  },
  {
    name: 'Remove Background',
    href: '/remove-background',
    tagline: 'Remove the background from any image instantly.',
    bg: 'bg-violet-50',
    badge: null,
    badgeColor: '',
    ctaColor: 'text-violet-600',
    icon: <RemoveBgIcon />,
  },
  {
    name: 'Make Image Transparent',
    href: '/make-image-transparent',
    tagline: 'Turn any photo or logo into a transparent PNG.',
    bg: 'bg-teal-50',
    badge: null,
    badgeColor: '',
    ctaColor: 'text-teal-600',
    icon: <TransparentIcon />,
  },
  {
    name: 'Logo Background Remover',
    href: '/remove-logo-background',
    tagline: 'Make your logo transparent for any background.',
    bg: 'bg-orange-50',
    badge: null,
    badgeColor: '',
    ctaColor: 'text-orange-600',
    icon: <LogoBgIcon />,
  },
  {
    name: 'Signature Background Remover',
    href: '/signature-background-remover',
    tagline: 'Extract your handwritten signature as a transparent PNG.',
    bg: 'bg-slate-100',
    badge: null,
    badgeColor: '',
    ctaColor: 'text-slate-700',
    icon: <SignatureIcon />,
  },
]

/* ── Section ──────────────────────────────────────────────────────────────── */
export function MoreAITools() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <ShimmerStyle />
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            AI Image Editing Tools
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Create thumbnails, remove backgrounds, generate passport photos, and
            edit images instantly with AI.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Illustration area */}
              <div className={`relative overflow-hidden p-4 ${tool.bg}`}>
                {tool.icon}
                {tool.badge && (
                  <span
                    className={`absolute right-3 top-3 rounded-full ${tool.badgeColor} px-2.5 py-0.5 text-xs font-semibold text-white`}
                  >
                    {tool.badge}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="px-5 py-4">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{tool.tagline}</p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${tool.ctaColor}`}
                >
                  Try it free
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
