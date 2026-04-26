"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Target,
  Zap
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { hasSupabaseEnv } from "@/lib/supabase/env"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "📱 Qual é o tempo máximo recomendado de tela por dia para crianças de 9 a 12 anos?",
    options: ["1 hora", "2 horas", "4 horas", "Sem limite"],
    correctAnswer: 1,
    explanation: "Especialistas recomendam até 2 horas de tempo de tela para lazer por dia para crianças dessa faixa etária.",
    category: "Tempo de Tela"
  },
  {
    id: 2,
    question: "📱 A luz azul das telas pode causar qual problema se você usar antes de dormir?",
    options: ["Dor de barriga", "Atrapalhar o sono", "Melhorar a visão", "Nenhum problema"],
    correctAnswer: 1,
    explanation: "A luz azul das telas interfere na produção de melatonina, o hormônio do sono, dificultando adormecer.",
    category: "Tempo de Tela"
  },
  {
    id: 3,
    question: "📱 O que você deve fazer a cada 30 minutos usando uma tela?",
    options: ["Trocar de dispositivo", "Fazer uma pausa de 5 minutos", "Aumentar o brilho", "Ligar a TV também"],
    correctAnswer: 1,
    explanation: "Pausas regulares ajudam a descansar os olhos e o corpo, evitando dores e cansaço.",
    category: "Tempo de Tela"
  },
  {
    id: 4,
    question: "♻️ Onde devemos descartar pilhas e baterias usadas?",
    options: ["No lixo comum", "No lixo reciclável", "Em pontos de coleta especializados", "Pode jogar em qualquer lugar"],
    correctAnswer: 2,
    explanation: "Pilhas e baterias contêm metais pesados e devem ser levadas a pontos de coleta especializados.",
    category: "Lixo Eletrônico"
  },
  {
    id: 5,
    question: "♻️ O que acontece com eletrônicos descartados incorretamente no lixo comum?",
    options: ["Viram adubo", "Poluem solo e água com metais pesados", "Desaparecem sozinhos", "São automaticamente reciclados"],
    correctAnswer: 1,
    explanation: "Eletrônicos contêm substâncias tóxicas como mercúrio e chumbo que podem contaminar o meio ambiente.",
    category: "Lixo Eletrônico"
  },
  {
    id: 6,
    question: "♻️ Quantas toneladas de lixo eletrônico o Brasil gera por ano?",
    options: ["500 mil", "1 milhão", "2 milhões", "10 milhões"],
    correctAnswer: 2,
    explanation: "O Brasil gera mais de 2 milhões de toneladas de lixo eletrônico por ano!",
    category: "Lixo Eletrônico"
  },
  {
    id: 7,
    question: "🌍 Como você pode economizar energia com seus dispositivos?",
    options: ["Deixar sempre ligados", "Usar modo economia de energia e desligar quando não usar", "Aumentar o brilho ao máximo", "Carregar o dia inteiro"],
    correctAnswer: 1,
    explanation: "Usar modo economia e desligar aparelhos ajuda a economizar energia e é bom para o planeta!",
    category: "Tecnologia Sustentável"
  },
  {
    id: 8,
    question: "🌍 Produzir um smartphone novo gera aproximadamente quanto de CO2?",
    options: ["1kg", "10kg", "70kg", "500kg"],
    correctAnswer: 2,
    explanation: "Produzir um novo smartphone gera cerca de 70kg de CO2! Por isso é importante usar os aparelhos por mais tempo.",
    category: "Tecnologia Sustentável"
  },
  {
    id: 9,
    question: "🌍 Qual atitude ajuda MAIS a reduzir o impacto ambiental da tecnologia?",
    options: ["Comprar o celular mais novo todo ano", "Usar o mesmo aparelho por mais tempo e consertá-lo", "Jogar o celular velho no lixo", "Nunca carregar o celular"],
    correctAnswer: 1,
    explanation: "Usar equipamentos por mais tempo evita que novos sejam fabricados, reduzindo muito o impacto ambiental!",
    category: "Tecnologia Sustentável"
  },
]

export function DesafiosContent() {
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const hasSupabaseConfig = hasSupabaseEnv()

  useEffect(() => {
    const saved = localStorage.getItem("techkids-best-streak")
    if (saved) {
      setBestStreak(parseInt(saved))
    }
  }, [])

  const startGame = () => {
    setGameState("playing")
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers([])
    setStreak(0)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    
    if (isCorrect) {
      setScore(score + 10)
      setStreak(streak + 1)
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1)
        localStorage.setItem("techkids-best-streak", String(streak + 1))
      }
    } else {
      setStreak(0)
    }
    
    setAnswers([...answers, isCorrect])
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      void saveChallengeCompletion()
      setGameState("finished")
    }
  }

  const saveChallengeCompletion = async () => {
    if (!hasSupabaseConfig) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("completed_challenges").insert({
        challenge_type: "quiz-techkids",
        session_id: `session-${Date.now()}`,
      })

      if (error) {
        console.error("Erro ao salvar desafio:", error)
      }
    } catch (err) {
      console.error("Erro ao salvar desafio:", err)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 10)) * 100
    if (percentage >= 90) return { message: "Incrível! Você é um expert em tecnologia consciente!", icon: Trophy, color: "text-yellow-500" }
    if (percentage >= 70) return { message: "Muito bem! Você sabe bastante sobre o assunto!", icon: Star, color: "text-primary" }
    if (percentage >= 50) return { message: "Bom trabalho! Continue aprendendo!", icon: Target, color: "text-secondary" }
    return { message: "Continue estudando! A cartilha pode te ajudar!", icon: Zap, color: "text-accent" }
  }

  if (gameState === "start") {
    return (
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/10 text-secondary mb-6">
              <Gamepad2 className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Desafio TechKids
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Teste seus conhecimentos sobre tecnologia consciente, segurança digital 
              e sustentabilidade! São {questions.length} perguntas para você responder.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Perguntas</p>
                    <p className="font-bold text-foreground">{questions.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Melhor Sequência</p>
                    <p className="font-bold text-foreground">{bestStreak}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Button size="lg" onClick={startGame} className="gap-2 text-lg px-8">
              <Gamepad2 className="w-5 h-5" />
              Começar Desafio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "finished") {
    const result = getScoreMessage()
    const ResultIcon = result.icon

    return (
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6`}>
              <ResultIcon className={`w-10 h-10 ${result.color}`} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Desafio Concluído!
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {result.message}
            </p>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{score}</div>
                    <div className="text-sm text-muted-foreground">Pontos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary mb-1">
                      {answers.filter(a => a).length}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Acertos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-1">{bestStreak}</div>
                    <div className="text-sm text-muted-foreground">Melhor Sequência</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Resumo das Respostas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {answers.map((correct, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                        correct 
                          ? "bg-primary/10 text-primary" 
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={startGame} className="gap-2">
                <RotateCcw className="w-5 h-5" />
                Jogar Novamente
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/cartilha">Estudar na Cartilha</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="gap-1">
                <Target className="w-3 h-3" />
                Pergunta {currentQuestion + 1} de {questions.length}
              </Badge>
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <Badge className="bg-accent/10 text-accent gap-1">
                    <Zap className="w-3 h-3" />
                    Sequência: {streak}
                  </Badge>
                )}
                <Badge className="bg-primary/10 text-primary gap-1">
                  <Star className="w-3 h-3" />
                  {score} pts
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {question.category}
              </Badge>
              <CardTitle className="text-xl leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correctAnswer
                  const showResult = selectedAnswer !== null

                  let buttonVariant: "outline" | "default" | "destructive" = "outline"
                  let buttonClass = ""

                  if (showResult) {
                    if (isCorrect) {
                      buttonClass = "border-primary bg-primary/10 text-primary"
                    } else if (isSelected && !isCorrect) {
                      buttonClass = "border-destructive bg-destructive/10 text-destructive"
                    }
                  }

                  return (
                    <Button
                      key={index}
                      variant={buttonVariant}
                      className={`w-full justify-start text-left h-auto py-4 px-4 ${buttonClass}`}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="flex items-center gap-3 w-full">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-destructive shrink-0" />
                        )}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Explanation */}
          {showExplanation && (
            <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Explicação</p>
                    <p className="text-muted-foreground">{question.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="flex justify-end">
              <Button size="lg" onClick={nextQuestion} className="gap-2">
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Próxima Pergunta
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Ver Resultado
                    <Trophy className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
