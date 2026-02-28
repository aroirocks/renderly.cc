import { Container } from '@/components/Container'

const features = [
  {
    emoji: '📐',
    title: 'Automatic YouTube thumbnail sizing (1280×720)',
    description:
      'Every thumbnail is output at the exact dimension YouTube recommends — no manual resizing required.',
  },
  {
    emoji: '✨',
    title: 'Image enhancement — sharpness, lighting, clarity',
    description:
      'Sharpness, lighting, and clarity are automatically improved so your subject stands out in any feed.',
  },
  {
    emoji: '✂️',
    title: 'Smart cropping for faces and subjects',
    description:
      'AI detects the most important part of your image and composes around it for maximum visual impact.',
  },
  {
    emoji: '🎨',
    title: 'Background cleanup & focus improvement',
    description:
      'Distracting backgrounds are cleaned up so the subject commands full attention.',
  },
  {
    emoji: '⚡',
    title: 'High-quality output optimised for clicks',
    description:
      "The final image is colour-graded and sharpened specifically to perform well on YouTube's thumbnail grid.",
  },
]

function FeatureCard({ emoji, title, description }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-4 text-3xl">{emoji}</div>
      <h3 className="font-display text-lg text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="ai-features"
      aria-labelledby="ai-features-title"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2
            id="ai-features-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            AI Image Processing for YouTube Thumbnails
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Every image you upload is processed by AI trained specifically for
            YouTube visual performance.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}
