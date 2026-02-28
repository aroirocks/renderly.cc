import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function FinalCTA() {
  return (
    <section aria-label="Final call to action" className="relative overflow-hidden bg-slate-900 py-32">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,59,48,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1)_0%,transparent_70%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Create your next YouTube thumbnail in seconds
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button href="/ai-youtube-thumbnail-maker" color="white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Upload Images &amp; Generate Thumbnail
            </Button>
            <p className="text-sm text-slate-400">Fast · Simple · AI-powered</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
