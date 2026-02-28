import Link from 'next/link'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { posts } from './posts'

export const metadata = {
  title: 'YouTube Thumbnail Blog — Tips, Guides & Resources | Renderly',
  description:
    'Practical guides on how to make YouTube thumbnails that get clicks. Free tools, no-watermark makers, and what actually improves CTR.',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <div className="bg-slate-900 py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
                YouTube Thumbnail Blog
              </h1>
              <p className="mt-4 text-lg text-slate-400">
                Practical guides on making thumbnails that actually get clicked
                — no fluff, no filler.
              </p>
            </div>
          </Container>
        </div>

        {/* Post grid */}
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Gradient accent bar */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${post.accent}`}
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-red-600">
                    Read article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
