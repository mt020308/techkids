import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DesafiosContent } from "@/components/desafios/desafios-content"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Desafios - TechKids",
  description: "Complete desafios divertidos sobre tecnologia, segurança digital e sustentabilidade. Teste seus conhecimentos e ganhe pontos!",
}

async function trackVisit() {
  try {
    const supabase = await createClient()
    await supabase.from('site_visits').insert({
      page_path: '/desafios',
      user_agent: null,
      referrer: null
    })
  } catch (error) {
    // Silently fail
  }
}

export default async function DesafiosPage() {
  trackVisit()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <DesafiosContent />
      </main>
      <Footer />
    </div>
  )
}
