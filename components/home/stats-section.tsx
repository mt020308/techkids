import { Clock, Trash2, Recycle, Smartphone } from "lucide-react"

const stats = [
  {
    emoji: "📱",
    icon: Clock,
    value: "4-6",
    unit: "horas",
    label: "de tela por dia (média)",
    description: "Crianças passam em média 4 a 6 horas por dia em dispositivos eletrônicos",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    emoji: "🗑️",
    icon: Trash2,
    value: "2 mi",
    unit: "ton",
    label: "de e-lixo no Brasil/ano",
    description: "O Brasil gera mais de 2 milhões de toneladas de lixo eletrônico por ano",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
  {
    emoji: "♻️",
    icon: Recycle,
    value: "17%",
    unit: "",
    label: "do e-lixo é reciclado",
    description: "Apenas 17% do lixo eletrônico é coletado e reciclado corretamente no mundo",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    emoji: "🌍",
    icon: Smartphone,
    value: "70kg",
    unit: "CO₂",
    label: "por smartphone novo",
    description: "Produzir um novo smartphone gera cerca de 70kg de CO₂ para o meio ambiente",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que isso é importante? 🤔
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que mostram a importância de aprendermos sobre tecnologia consciente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-2xl border-2 ${stat.borderColor} bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bgColor} mb-4`}>
                <span className="text-3xl">{stat.emoji}</span>
              </div>
              <div className="mb-2">
                <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                {stat.unit && <span className={`text-xl font-bold ${stat.color} ml-1`}>{stat.unit}</span>}
              </div>
              <p className="font-bold text-foreground mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
