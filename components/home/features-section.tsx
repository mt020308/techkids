import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BookOpen, 
  Gamepad2, 
  ClipboardList, 
  Clock,
  Trash2,
  Recycle,
} from "lucide-react"

const topics = [
  {
    icon: Clock,
    emoji: "📱",
    title: "Tempo de Tela",
    description: "Aprenda a equilibrar o uso de dispositivos eletrônicos com outras atividades importantes para sua saúde.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Trash2,
    emoji: "♻️",
    title: "Lixo Eletrônico",
    description: "Saiba por que e como descartar corretamente celulares, computadores e pilhas para proteger o planeta.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Recycle,
    emoji: "🌍",
    title: "Tecnologia Sustentável",
    description: "Descubra como usar a tecnologia de forma mais amiga do meio ambiente e economizar energia.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

const features = [
  {
    icon: BookOpen,
    emoji: "📚",
    title: "Cartilha Digital",
    description: "Conteúdo educativo com nossos mascotes TechBot, EcoBot e GreenBot, fácil e divertido de entender!",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Gamepad2,
    emoji: "🎮",
    title: "Desafios Divertidos",
    description: "Quiz com 9 perguntas para testar seus conhecimentos sobre tecnologia consciente e sustentabilidade!",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: ClipboardList,
    emoji: "📋",
    title: "Pesquisa Interativa",
    description: "Participe da nossa pesquisa e ajude a entender como as crianças usam a tecnologia no dia a dia.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que você vai aprender? 🚀
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore temas importantes sobre tecnologia e meio ambiente com nossos mascotes!
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {topics.map((topic, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
              <CardHeader className="pb-2">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${topic.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{topic.emoji}</span>
                </div>
                <CardTitle className={`text-xl ${topic.color}`}>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{topic.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Como funciona? 🤔
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border-2 border-border hover:shadow-md transition-all">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6`}>
                <span className="text-4xl">{feature.emoji}</span>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${feature.color}`}>{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
