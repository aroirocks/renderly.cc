import { Container } from '@/components/Container'

const tips = [
  {
    heading: 'High contrast between subject and background',
    body: 'Thumbnails are displayed at small sizes in YouTube search and recommendations. A strong contrast between your subject and the background ensures it stands out — even on a phone screen.',
  },
  {
    heading: 'Subject clarity — one clear focal point',
    body: "The best thumbnails communicate a single idea at a glance. Cluttered images confuse viewers and reduce clicks. Use a tight crop on your subject and remove distractions so the viewer's eye knows exactly where to look.",
  },
  {
    heading: 'Correct aspect ratio and resolution',
    body: "YouTube recommends 1280×720 pixels at a 16:9 aspect ratio. Uploading the wrong size results in blurry or cropped thumbnails that look unprofessional in the feed. AI generates at the correct spec automatically.",
  },
  {
    heading: 'Why AI improves click-through rate',
    body: 'AI analyses composition, lighting, and cropping to produce a layout optimised for visual impact — applying the same principles that high-performing channels use, without requiring any design knowledge.',
  },
]

export function ThumbnailTips() {
  return (
    <section
      id="thumbnail-tips"
      aria-labelledby="thumbnail-tips-title"
      className="py-20 sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2
            id="thumbnail-tips-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            What makes a good YouTube thumbnail?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Understanding what drives clicks helps you get more from every
            video. Here&apos;s what the data shows.
          </p>
          <div className="mt-10 space-y-8">
            {tips.map((tip) => (
              <div key={tip.heading}>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {tip.heading}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
