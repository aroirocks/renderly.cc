import { Container } from '@/components/Container'

const limits = [
  {
    icon: '🖼️',
    text: 'Upload up to 2 images per thumbnail',
  },
  {
    icon: '🔗',
    text: 'Image upload only — no video links yet',
  },
]

export function Limitations() {
  return (
    <section
      id="limitations"
      aria-labelledby="limitations-title"
      className="py-20 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 px-8 py-12 sm:px-12">
          <h2
            id="limitations-title"
            className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl"
          >
            Current limits
          </h2>
          <ul className="mt-6 space-y-4">
            {limits.map((limit) => (
              <li key={limit.text} className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">{limit.icon}</span>
                <span className="text-base text-slate-700">{limit.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            More features are coming as we improve the AI.
          </p>
        </div>
      </Container>
    </section>
  )
}
