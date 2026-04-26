import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Pronto para começar sua jornada de aprendizado?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore nossa cartilha digital com o TechBot 🤖, o EcoBot 🌱 e o GreenBot 🌿, 
            complete desafios divertidos e ajude a construir um futuro mais sustentável!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cartilha">
              <Button size="lg" className="gap-2 text-lg px-8 shadow-md">
                <Sparkles className="w-5 h-5" />
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-card border-2 border-border/50 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">💡 Dica para os pais:</strong> Este site foi 
              desenvolvido para ser explorado junto com as crianças. Aproveite para conversar 
              sobre tecnologia e sustentabilidade!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
