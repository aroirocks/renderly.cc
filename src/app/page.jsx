import { CallToAction } from '@/components/CallToAction'
import { DemoSection } from '@/components/DemoSection'
import { Faqs } from '@/components/Faqs'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Limitations } from '@/components/Limitations'
import { MoreAITools } from '@/components/MoreAITools'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { ThumbnailTips } from '@/components/ThumbnailTips'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DemoSection />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Limitations />
        <ThumbnailTips />
        <MoreAITools />
        <Faqs />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
