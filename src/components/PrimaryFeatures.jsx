import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const steps = [
  {
    number: '01',
    icon: '📤',
    title: 'Upload up to 2 images',
    description:
      'Drag and drop your photos — a face shot, a background, a product, anything. JPEG, PNG, or WebP, up to 5MB each.',
  },
  {
    number: '02',
    icon: '⚙️',
    title: 'AI enhances, crops & composes',
    description:
      'AI improves sharpness, lighting, and clarity, then composes a layout proven to get more clicks — automatically.',
  },
  {
    number: '03',
    icon: '⬇️',
    title: 'Download your YouTube-ready image',
    description:
      'Get a 1280×720 thumbnail in seconds. No watermarks, no design skills, no waiting.',
  },
]

export function PrimaryFeatures() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="bg-slate-900 pt-20 pb-28 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2
            id="how-it-works-title"
            className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            How the AI Thumbnail Maker Works
          </h2>
          <p className="mt-6 text-lg tracking-tight text-slate-400">
            Three simple steps from raw images to a click-worthy YouTube
            thumbnail — no design experience needed.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col rounded-2xl bg-white/5 p-8 ring-1 ring-white/10"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-2xl">
                  {step.icon}
                </span>
                <span className="font-display text-5xl font-bold leading-none text-white/15">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-xl text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-3">
          <Button href="/ai-youtube-thumbnail-maker" color="red">
            Try It Free
          </Button>
          <p className="text-xs text-slate-500">No sign-up · No credit card · Instant results</p>
        </div>
      </Container>
    </section>
  )
}
