import Link from 'next/link'

import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'

function RenderlyLogo() {
  return (
    <Link
      href="/"
      aria-label="Renderly home"
      className="flex items-center justify-center gap-2"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
          <polygon points="3,1 13,7 3,13" />
        </svg>
      </span>
      <span className="font-[Syne] text-[1.1rem] font-extrabold tracking-tight text-slate-900">
        renderly<span className="text-red-500">.cc</span>
      </span>
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <RenderlyLogo />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="#how-it-works">How it works</NavLink>
              <NavLink href="#ai-features">Features</NavLink>
              <NavLink href="#use-cases">Use cases</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link href="https://x.com/renderlycc" className="group" aria-label="Renderly on X">
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Renderly. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
