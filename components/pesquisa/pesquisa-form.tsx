"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Recycle,
  Star,
  Sparkles
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { hasSupabaseEnv } from "@/lib/supabase/env"

const steps = [
  { id: 1, title: "Tempo de Tela", icon: Clock, emoji: "📱" },
  { id: 2, title: "Lixo Eletrônico & Sustentabilidade", icon: Recycle, emoji: "♻️" },
  { id: 3, title: "Avaliação", icon: Star, emoji: "⭐" },
]

type FormData = {
  // Step 1: Screen Time
  hoursUsingPhone: string
  screenTimeBeforeSleep: string
  takesBreaks: string
  // Step 2: Electronic Waste & Sustainability
  knowsElectronicWaste: string
  disposedIncorrectly: string
  knowsDisposalLocation: string
  turnsOffDevices: string
  // Step 3: Evaluation
  learnedSomething: string
  rating: number
}

const initialFormData: FormData = {
  hoursUsingPhone: "",
  screenTimeBeforeSleep: "",
  takesBreaks: "",
  knowsElectronicWaste: "",
  disposedIncorrectly: "",
  knowsDisposalLocation: "",
  turnsOffDevices: "",
  learnedSomething: "",
  rating: 0,
}

export function PesquisaForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasSupabaseConfig = hasSupabaseEnv()

  const progress = (currentStep / steps.length) * 100

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.hoursUsingPhone && formData.screenTimeBeforeSleep && formData.takesBreaks
      case 2:
        return formData.knowsElectronicWaste && formData.disposedIncorrectly && formData.knowsDisposalLocation && formData.turnsOffDevices
      case 3:
        return formData.learnedSomething && formData.rating > 0
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!hasSupabaseConfig) {
        setError("Supabase nao configurado. Preencha as variaveis no arquivo .env.local.")
        return
      }

      const payload = {
        hours_using_phone: formData.hoursUsingPhone,
        screen_time_before_sleep: formData.screenTimeBeforeSleep === "yes",
        takes_breaks: formData.takesBreaks === "yes",
        knows_electronic_waste: formData.knowsElectronicWaste === "yes",
        disposed_incorrectly: formData.disposedIncorrectly === "yes",
        knows_disposal_location: formData.knowsDisposalLocation === "yes",
        turns_off_devices: formData.turnsOffDevices === "yes",
        learned_something: formData.learnedSomething === "yes",
        rating: formData.rating,
      }

      const supabase = createClient()
      
      const { error: submitError } = await supabase.from('survey_responses').insert(payload)

      if (submitError) throw submitError

      setIsSubmitted(true)
    } catch (err) {
      console.error("Error submitting survey:", err)
      setError("Ocorreu um erro ao enviar a pesquisa. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🎉</div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Obrigado por participar!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Sua resposta foi enviada com sucesso. Suas informações vão nos ajudar a 
              entender melhor como as crianças usam a tecnologia e criar conteúdos ainda melhores!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/cartilha" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explorar Cartilha
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/desafios">Jogar Desafios</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
              <ClipboardList className="w-3 h-3 mr-1" />
              Pesquisa Interativa
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conte-nos sobre você! 🙋
            </h1>
            <p className="text-muted-foreground">
              Responda algumas perguntas para nos ajudar a entender como as crianças 
              usam a tecnologia. Suas respostas são anônimas!
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${
                    step.id === currentStep
                      ? "text-primary"
                      : step.id < currentStep
                      ? "text-primary/60"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${
                      step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id < currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.emoji
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-3 rounded-full" />
          </div>

          {/* Form Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{steps[currentStep - 1].emoji}</div>
                <div>
                  <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                  <CardDescription>
                    Etapa {currentStep} de {steps.length}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  {/* Hours Using Phone */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">📱 Quantas horas por dia você usa o celular ou tablet?</Label>
                    <RadioGroup
                      value={formData.hoursUsingPhone}
                      onValueChange={(value) => updateField("hoursUsingPhone", value)}
                    >
                      {[
                        { value: "less-1", label: "Menos de 1 hora" },
                        { value: "1-2", label: "1 a 2 horas" },
                        { value: "2-4", label: "2 a 4 horas" },
                        { value: "4-6", label: "4 a 6 horas" },
                        { value: "more-6", label: "Mais de 6 horas" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`hours-${option.value}`} />
                          <Label htmlFor={`hours-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Screen time before sleep */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">🌙 Você usa telas (celular, TV, tablet) antes de dormir?</Label>
                    <RadioGroup
                      value={formData.screenTimeBeforeSleep}
                      onValueChange={(value) => updateField("screenTimeBeforeSleep", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, costumo usar" },
                        { value: "no", label: "Não, evito usar antes de dormir" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`sleep-${option.value}`} />
                          <Label htmlFor={`sleep-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Takes breaks */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">⏸️ Você faz pausas enquanto usa as telas?</Label>
                    <RadioGroup
                      value={formData.takesBreaks}
                      onValueChange={(value) => updateField("takesBreaks", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, sempre faço pausas" },
                        { value: "no", label: "Não, fico sem parar" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`breaks-${option.value}`} />
                          <Label htmlFor={`breaks-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Knows Electronic Waste */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">♻️ Você sabe o que é lixo eletrônico (e-lixo)?</Label>
                    <RadioGroup
                      value={formData.knowsElectronicWaste}
                      onValueChange={(value) => updateField("knowsElectronicWaste", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, sei o que é" },
                        { value: "no", label: "Não sei o que é" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`ewaste-${option.value}`} />
                          <Label htmlFor={`ewaste-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Disposed Incorrectly */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">🗑️ Você ou sua família já jogaram eletrônicos velhos no lixo comum?</Label>
                    <RadioGroup
                      value={formData.disposedIncorrectly}
                      onValueChange={(value) => updateField("disposedIncorrectly", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, já aconteceu" },
                        { value: "no", label: "Não, sempre descartamos corretamente" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`disposed-${option.value}`} />
                          <Label htmlFor={`disposed-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Knows Disposal Location */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">📍 Você sabe onde pode descartar eletrônicos velhos corretamente?</Label>
                    <RadioGroup
                      value={formData.knowsDisposalLocation}
                      onValueChange={(value) => updateField("knowsDisposalLocation", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, conheço locais de descarte" },
                        { value: "no", label: "Não sei onde descartar" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`location-${option.value}`} />
                          <Label htmlFor={`location-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Turns off devices */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">🔌 Você desliga aparelhos da tomada quando não está usando?</Label>
                    <RadioGroup
                      value={formData.turnsOffDevices}
                      onValueChange={(value) => updateField("turnsOffDevices", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, sempre desligo" },
                        { value: "no", label: "Não, deixo ligado" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`turnoff-${option.value}`} />
                          <Label htmlFor={`turnoff-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Learned Something */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">🌟 Você aprendeu algo novo com este site?</Label>
                    <RadioGroup
                      value={formData.learnedSomething}
                      onValueChange={(value) => updateField("learnedSomething", value)}
                    >
                      {[
                        { value: "yes", label: "Sim, aprendi coisas novas!" },
                        { value: "no", label: "Não, já sabia de tudo" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`learned-${option.value}`} />
                          <Label htmlFor={`learned-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">⭐ De 1 a 10, que nota você daria para este site?</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateField("rating", num)}
                          className={`w-11 h-11 rounded-xl font-bold text-sm transition-colors ${
                            formData.rating === num
                              ? "bg-primary text-primary-foreground shadow-md scale-110"
                              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    {formData.rating > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Você selecionou: <span className="font-bold text-primary">{formData.rating}</span> ⭐
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Resposta"}
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
