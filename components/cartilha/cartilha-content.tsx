"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  Trash2,
  Recycle,
  Lightbulb,
  CheckCircle,
  XCircle,
  ChevronRight,
  BookOpen,
  X,
  Gamepad2,
  ArrowRight
} from "lucide-react"

const sections = [
  {
    id: "tempo-tela",
    title: "Tempo de Tela",
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    emoji: "📱",
    mascotMessage: "Ei! Eu sou o TechBot 🤖 Sabia que seu cérebro precisa de descanso das telas? Vamos aprender juntos!",
    content: {
      intro: "Você sabia que passar muito tempo em frente às telas pode afetar sua saúde? Vamos aprender a equilibrar!",
      facts: [
        "Crianças de 9-12 anos devem limitar o tempo de tela a cerca de 2 horas por dia para atividades de lazer.",
        "A luz azul das telas pode atrapalhar seu sono se você usar dispositivos antes de dormir.",
        "Ficar muito tempo sentado olhando para telas pode causar dores nas costas e nos olhos.",
      ],
      tips: [
        { text: "Faça pausas de 5 minutos a cada 30 minutos de uso", good: true },
        { text: "Use a regra 20-20-20: a cada 20 minutos, olhe para algo a 20 metros por 20 segundos", good: true },
        { text: "Evite usar telas 1 hora antes de dormir", good: true },
        { text: "Alterne tempo de tela com atividades ao ar livre", good: true },
        { text: "Usar o celular durante as refeições", good: false },
        { text: "Deixar a TV ligada enquanto faz lição de casa", good: false },
      ],
      activity: "🎯 Desafio do TechBot: Crie um diário de tempo de tela! Anote quantas horas você usa cada dispositivo por dia e tente reduzir aos poucos. Você consegue?"
    }
  },
  {
    id: "lixo-eletronico",
    title: "Lixo Eletrônico",
    icon: Trash2,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    emoji: "♻️",
    mascotMessage: "Olá! Sou o EcoBot 🌱 Celulares velhos no lixo comum são um grande problema! Mas juntos podemos mudar isso!",
    content: {
      intro: "Celulares, computadores e pilhas velhas não podem ir para o lixo comum! Vamos entender o porquê.",
      facts: [
        "O Brasil gera mais de 2 milhões de toneladas de lixo eletrônico por ano.",
        "Eletrônicos contêm metais pesados como mercúrio e chumbo que poluem o solo e a água.",
        "Muitas partes dos eletrônicos podem ser recicladas e transformadas em novos produtos.",
      ],
      tips: [
        { text: "Procure pontos de coleta de eletrônicos na sua cidade", good: true },
        { text: "Doe equipamentos que ainda funcionam para quem precisa", good: true },
        { text: "Cuide bem dos seus dispositivos para durarem mais", good: true },
        { text: "Separe pilhas e baterias do lixo comum", good: true },
        { text: "Jogar celulares velhos no lixo comum", good: false },
        { text: "Descartar pilhas junto com o lixo reciclável", good: false },
      ],
      activity: "🔍 Missão EcoBot: Faça uma caça ao tesouro em casa! Encontre eletrônicos antigos que podem ser levados para reciclagem. Quantos você achou?"
    }
  },
  {
    id: "sustentabilidade",
    title: "Tecnologia Sustentável",
    icon: Recycle,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    emoji: "🌍",
    mascotMessage: "Oi! Sou o GreenBot 🌿 A tecnologia pode ser amiga do planeta! Veja como fazer sua parte!",
    content: {
      intro: "Podemos usar a tecnologia de forma mais amiga do meio ambiente! Veja como:",
      facts: [
        "Carregar o celular consome energia elétrica, que muitas vezes vem de fontes poluentes.",
        "Produzir um smartphone novo gera cerca de 70kg de CO2.",
        "Usar equipamentos por mais tempo ajuda a reduzir o impacto ambiental.",
      ],
      tips: [
        { text: "Desligue aparelhos da tomada quando não estiver usando", good: true },
        { text: "Use o modo economia de energia dos dispositivos", good: true },
        { text: "Prefira consertar a comprar um aparelho novo", good: true },
        { text: "Diminua o brilho da tela para economizar bateria", good: true },
        { text: "Deixar o carregador sempre na tomada", good: false },
        { text: "Trocar de celular todo ano sem necessidade", good: false },
      ],
      activity: "🌱 Desafio GreenBot: Calcule quantos aparelhos eletrônicos você tem em casa. Quais deles poderiam ficar desligados quando não estão sendo usados? Tente economizar energia esta semana!"
    }
  },
]

export function CartilhaContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <BookOpen className="w-3 h-3 mr-1" />
            Cartilha Educativa
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecnologia Consciente 🚀
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore os capítulos abaixo com nossos mascotes e aprenda sobre 
            tempo de tela, lixo eletrônico e sustentabilidade!
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="inline-flex h-auto p-1 bg-muted/50 w-full md:w-auto gap-1">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap rounded-xl"
                >
                  <span className="text-lg">{section.emoji}</span>
                  <span className="hidden sm:inline font-semibold">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content */}
          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-0">
              <div className="space-y-8">
                {/* Mascot message */}
                <div className={`flex items-start gap-4 p-5 rounded-2xl ${section.bgColor} border-2 ${section.borderColor}`}>
                  <div className="text-5xl shrink-0">{section.emoji}</div>
                  <div>
                    <p className={`font-bold text-lg ${section.color} mb-1`}>{section.title}</p>
                    <p className="text-foreground text-base">{section.mascotMessage}</p>
                  </div>
                </div>

                {/* Section Intro */}
                <Card className={`border-2 ${section.borderColor}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl ${section.bgColor}`}>
                        <section.icon className={`w-8 h-8 ${section.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {section.content.intro}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Facts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className={`w-5 h-5 ${section.color}`} />
                      Você Sabia? 🤔
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {section.content.facts.map((fact, index) => (
                        <li key={index} className={`flex items-start gap-3 p-4 rounded-xl ${section.bgColor}`}>
                          <ChevronRight className={`w-5 h-5 mt-0.5 ${section.color} shrink-0`} />
                          <span className="text-foreground font-medium">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${section.color}`} />
                      Dicas Importantes ✨
                    </CardTitle>
                    <CardDescription>
                      Veja o que você deve e o que não deve fazer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className={`font-bold ${section.color} flex items-center gap-2 text-base`}>
                          <CheckCircle className="w-4 h-4" />
                          ✅ Faça isso!
                        </h4>
                        {section.content.tips
                          .filter((tip) => tip.good)
                          .map((tip, index) => (
                            <div
                              key={index}
                              className={`flex items-start gap-2 p-3 rounded-xl ${section.bgColor} border ${section.borderColor}`}
                            >
                              <CheckCircle className={`w-4 h-4 mt-0.5 ${section.color} shrink-0`} />
                              <span className="text-sm font-medium">{tip.text}</span>
                            </div>
                          ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-destructive flex items-center gap-2 text-base">
                          <XCircle className="w-4 h-4" />
                          ❌ Evite isso!
                        </h4>
                        {section.content.tips
                          .filter((tip) => !tip.good)
                          .map((tip, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20"
                            >
                              <XCircle className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
                              <span className="text-sm font-medium">{tip.text}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity */}
                <Card className={`border-dashed border-2 ${section.borderColor}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className={`w-5 h-5 ${section.color}`} />
                      Atividade Prática 🎯
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground text-lg font-medium">{section.content.activity}</p>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const currentIndex = sections.findIndex((s) => s.id === activeSection)
                      if (currentIndex > 0) {
                        setActiveSection(sections[currentIndex - 1].id)
                      }
                    }}
                    disabled={sections.findIndex((s) => s.id === activeSection) === 0}
                  >
                    ← Capítulo Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground font-medium">
                    {sections.findIndex((s) => s.id === activeSection) + 1} de {sections.length}
                  </span>
                  <Button
                    onClick={() => {
                      const currentIndex = sections.findIndex((s) => s.id === activeSection)
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id)
                      } else {
                        setShowPopup(true)
                      }
                    }}
                  >
                    {sections.findIndex((s) => s.id === activeSection) < sections.length - 1
                      ? "Próximo Capítulo →"
                      : "Concluir Cartilha 🎉"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Parabéns! Você terminou a Cartilha!
              </h2>
              <p className="text-muted-foreground mb-6">
                Agora que você aprendeu tudo, que tal testar seus conhecimentos no <strong>Desafio TechKids</strong>?
              </p>

              <div className="flex flex-col gap-3">
                <a href="/desafios" className="w-full">
                  <Button className="w-full gap-2 text-base py-5 bg-primary hover:bg-primary/90">
                    <Gamepad2 className="w-5 h-5" />
                    Jogar Desafios agora!
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  className="text-muted-foreground text-sm"
                  onClick={() => setShowPopup(false)}
                >
                  Continuar lendo a cartilha
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
