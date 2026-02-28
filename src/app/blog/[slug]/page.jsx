import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { posts } from '../posts'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Renderly Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://renderly.cc/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ContentCTA({ text, href }) {
  return (
    <div className="my-10 rounded-2xl bg-slate-900 px-6 py-8 text-center">
      <p className="font-display text-lg text-white">
        Ready to try it yourself?
      </p>
      <p className="mt-1 text-sm text-slate-400">{text}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 active:bg-red-700"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
        Create my thumbnail — free
      </Link>
    </div>
  )
}

function renderBlock(block, index) {
  switch (block.type) {
    case 'p':
      return (
        <p key={index} className="mt-5 text-base leading-relaxed text-slate-700">
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2
          key={index}
          className="mt-12 font-display text-2xl tracking-tight text-slate-900"
        >
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3
          key={index}
          className="mt-8 font-display text-xl text-slate-900"
        >
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul key={index} className="mt-5 space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-4 text-base text-slate-700">
              <span className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-red-400" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'cta':
      return <ContentCTA key={index} text={block.text} href={block.href} />
    default:
      return null
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Post header */}
        <div className="bg-slate-900 pb-0 pt-16 sm:pt-20">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
                All articles
              </Link>
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="mt-4 font-display text-3xl tracking-tight text-white sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>
            </div>
          </Container>
          {/* Gradient accent line */}
          <div className={`mt-12 h-1 w-full bg-gradient-to-r ${post.accent}`} />
        </div>

        {/* Post body */}
        <Container>
          <article className="mx-auto max-w-2xl pb-20 pt-10">
            {post.content.map((block, i) => renderBlock(block, i))}

            {/* Bottom CTA */}
            <div className="mt-12 border-t border-slate-100 pt-10 text-center">
              <p className="font-display text-2xl text-slate-900">
                Try the free YouTube thumbnail maker
              </p>
              <p className="mt-2 text-slate-500">
                Upload your images and get a click-ready 1280×720 thumbnail in
                about a minute. No sign-up, no watermark.
              </p>
              <Link
                href="/ai-youtube-thumbnail-maker"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 sm:w-auto"
              >
                Create my thumbnail free
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </article>
        </Container>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50 py-16">
            <Container>
              <h2 className="font-display text-xl text-slate-900">
                More articles
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className={`mb-3 h-1 w-10 rounded-full bg-gradient-to-r ${p.accent}`}
                    />
                    <h3 className="font-display text-base leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">{p.readTime}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
