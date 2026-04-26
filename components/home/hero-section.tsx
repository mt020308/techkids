import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Gamepad2, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-secondary/5 to-background py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/15 animate-pulse" />
        <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-secondary/15 animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-accent/15 animate-pulse delay-500" />
        <div className="absolute bottom-40 right-1/3 w-14 h-14 rounded-full bg-primary/15 animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Para crianças de 9 a 12 anos 🎉</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Aprenda sobre{" "}
            <span className="text-primary">tecnologia</span> e{" "}
            <span className="text-secondary">sustentabilidade</span>{" "}
            de forma divertida! 🚀
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Descubra como controlar o tempo de tela, descartar eletrônicos corretamente 
            e usar a tecnologia de forma mais sustentável com nossos mascotes!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/cartilha">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-md">
                <BookOpen className="w-5 h-5" />
                Explorar Cartilha
              </Button>
            </Link>
            <Link href="/desafios">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-2">
                <Gamepad2 className="w-5 h-5" />
                Jogar Desafios
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border-2 border-primary/20 shadow-sm">
              <span className="text-3xl">📱</span>
              <span className="font-bold text-foreground text-primary">Tempo de Tela</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border-2 border-secondary/20 shadow-sm">
              <span className="text-3xl">♻️</span>
              <span className="font-bold text-foreground text-secondary">Lixo Eletrônico</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border-2 border-accent/20 shadow-sm">
              <span className="text-3xl">🌍</span>
              <span className="font-bold text-foreground text-accent">Tech Sustentável</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
