import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { StatsSection } from "@/components/home/stats-section"
import { CTASection } from "@/components/home/cta-section"
import { createClient } from "@/lib/supabase/server"

async function trackVisit() {
  try {
    const supabase = await createClient()
    await supabase.from('site_visits').insert({
      page_path: '/',
      user_agent: null,
      referrer: null
    })
  } catch (error) {
    // Silently fail - don't block page load
  }
}

export default async function HomePage() {
  // Track visit in background
  trackVisit()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
