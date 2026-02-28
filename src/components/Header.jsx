'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="#how-it-works">How it works</MobileNavLink>
        <MobileNavLink href="#ai-features">Features</MobileNavLink>
        <MobileNavLink href="#use-cases">Use cases</MobileNavLink>
        <MobileNavLink href="#faq">FAQ</MobileNavLink>
        <MobileNavLink href="/blog">Blog</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <span className="block w-full cursor-not-allowed p-2 text-slate-400">
          Sign in
        </span>
      </PopoverPanel>
    </Popover>
  )
}

function RenderlyLogo() {
  return (
    <Link
      href="/"
      aria-label="Renderly home"
      className="flex items-center gap-2"
    >
      <Image
        src="/images/logo_renderly_final.png"
        alt="Renderly logo"
        width={280}
        height={90}
        priority
        className="h-auto w-28 sm:w-40 md:w-52"
      />
      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
        Beta
      </span>
    </Link>
  )
}

export function Header() {
  return (
    <header className="py-3">
      <Container>
        <nav className="relative z-50 flex justify-between">

          {/* Left: Logo + nav links */}
          <div className="flex items-center md:gap-x-12">
            <RenderlyLogo />
        
          </div>

          {/* Right: Sign in + CTA */}
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <span className="cursor-not-allowed text-sm text-slate-400">
                Sign in
              </span>
            </div>
                <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/blog">Blog</NavLink>
            </div>
            <Button href="/ai-youtube-thumbnail-maker" color="red" className="px-3 py-2 text-xs sm:px-4 sm:text-sm md:px-5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 shrink-0"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              <span className="hidden sm:inline">Upload Images</span>
              <span className="sm:hidden">Upload</span>
              <span className="hidden lg:inline">{' '}— it&apos;s free</span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>

        </nav>
      </Container>
    </header>
  )
}