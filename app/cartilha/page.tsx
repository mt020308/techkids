import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartilhaContent } from "@/components/cartilha/cartilha-content"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cartilha Digital - TechKids",
  description: "Aprenda sobre tecnologia consciente, segurança digital e sustentabilidade. Uma cartilha educativa interativa para crianças.",
}

async function trackVisit() {
  try {
    const supabase = await createClient()
    await supabase.from('site_visits').insert({
      page_path: '/cartilha',
      user_agent: null,
      referrer: null
    })
  } catch (error) {
    // Silently fail
  }
}

export default async function CartilhaPage() {
  trackVisit()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CartilhaContent />
      </main>
      <Footer />
    </div>
  )
}
