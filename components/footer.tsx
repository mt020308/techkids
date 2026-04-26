import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-base">
              🤖
            </div>
            <span className="font-bold text-foreground">TechKids</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/cartilha" className="hover:text-primary transition-colors">
              Cartilha
            </Link>
            <Link href="/desafios" className="hover:text-primary transition-colors">
              Desafios
            </Link>
            <Link href="/pesquisa" className="hover:text-primary transition-colors">
              Pesquisa
            </Link>
          </nav>
          
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="w-4 h-4 text-destructive fill-destructive" /> para o planeta
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
          <p>Projeto educacional sobre tecnologia consciente e sustentabilidade digital.</p>
          <p className="mt-1">Para crianças de 9 a 12 anos e seus responsáveis.</p>
        </div>
      </div>
    </footer>
  )
}
