import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PesquisaForm } from "@/components/pesquisa/pesquisa-form"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pesquisa - TechKids",
  description: "Participe da nossa pesquisa sobre hábitos digitais de crianças. Sua opinião é muito importante!",
}

async function trackVisit() {
  try {
    const supabase = await createClient()
    await supabase.from('site_visits').insert({
      page_path: '/pesquisa',
      user_agent: null,
      referrer: null
    })
  } catch (error) {
    // Silently fail
  }
}

export default async function PesquisaPage() {
  trackVisit()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PesquisaForm />
      </main>
      <Footer />
    </div>
  )
}
