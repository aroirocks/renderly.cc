import { Container } from '@/components/Container'

const useCases = [
  [
    {
      title: 'YouTube video thumbnails',
      description:
        'Create scroll-stopping thumbnails that drive more clicks on long-form YouTube content.',
      emoji: '▶️',
      accent: 'from-red-50 to-red-100 ring-red-200',
      tag: 'Most popular',
    },
    {
      title: 'YouTube Shorts thumbnails',
      description:
        'Stand out in the Shorts feed with a bold, high-contrast thumbnail crafted by AI.',
      emoji: '📱',
      accent: 'from-orange-50 to-orange-100 ring-orange-200',
    },
  ],
  [
    {
      title: 'Gaming thumbnails',
      description:
        'Gaming audiences expect bold, energetic visuals. AI delivers exactly that in seconds.',
      emoji: '🎮',
      accent: 'from-purple-50 to-purple-100 ring-purple-200',
    },
    {
      title: 'Vlogs & educational content',
      description:
        'Whether a travel vlog or a how-to tutorial, get a clean, professional look instantly.',
      emoji: '🎓',
      accent: 'from-blue-50 to-blue-100 ring-blue-200',
    },
  ],
  [
    {
      title: 'Business and tech channels',
      description:
        'Polished, credible thumbnails for fintech, SaaS, and professional channels.',
      emoji: '💼',
      accent: 'from-green-50 to-green-100 ring-green-200',
    },
  ],
]

export function Testimonials() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-title"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2
            id="use-cases-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Perfect for
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Whether you're a gaming creator, educator, or business channel, AI
            thumbnails work for any niche.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {useCases.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((useCase) => (
                  <li key={useCase.title}>
                    <div
                      className={`relative rounded-2xl bg-linear-to-br p-6 ring-1 ${useCase.accent}`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-3xl">{useCase.emoji}</span>
                        {useCase.tag && (
                          <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                            {useCase.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg text-slate-900">
                        {useCase.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {useCase.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
