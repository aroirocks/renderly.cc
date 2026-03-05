import { posts } from './blog/posts'

const BASE = 'https://renderly.cc'

export default function sitemap() {
  const blogUrls = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/ai-youtube-thumbnail-maker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/passport-photo-maker`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/remove-background`,
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/make-image-transparent`,
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/remove-logo-background`,
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/signature-background-remover`,
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/passport-photo-background-remover`,
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ]
}
