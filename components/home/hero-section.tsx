"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Gamepad2, Sparkles, ClipboardList } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const bubbles = [
      { x: 0.08, y: 0.55, r: 90, color: "#7c3aed", speedX: 0.18, speedY: -0.12, pulse: 0, pulseSpeed: 0.018 },
      { x: 0.22, y: 0.25, r: 60, color: "#16a34a", speedX: 0.12, speedY: 0.15, pulse: 1, pulseSpeed: 0.022 },
      { x: 0.38, y: 0.7,  r: 75, color: "#ea580c", speedX: -0.14, speedY: -0.10, pulse: 2, pulseSpeed: 0.016 },
      { x: 0.55, y: 0.18, r: 50, color: "#7c3aed", speedX: 0.10, speedY: 0.18, pulse: 0.5, pulseSpeed: 0.025 },
      { x: 0.70, y: 0.60, r: 100, color: "#16a34a", speedX: -0.12, speedY: 0.10, pulse: 1.5, pulseSpeed: 0.014 },
      { x: 0.85, y: 0.20, r: 65, color: "#ea580c", speedX: 0.16, speedY: 0.12, pulse: 3, pulseSpeed: 0.020 },
      { x: 0.90, y: 0.75, r: 55, color: "#7c3aed", speedX: -0.10, speedY: -0.16, pulse: 2.5, pulseSpeed: 0.019 },
      { x: 0.45, y: 0.45, r: 40, color: "#16a34a", speedX: 0.14, speedY: -0.14, pulse: 0.8, pulseSpeed: 0.023 },
      { x: 0.15, y: 0.82, r: 70, color: "#ea580c", speedX: 0.12, speedY: -0.10, pulse: 1.8, pulseSpeed: 0.017 },
      { x: 0.62, y: 0.88, r: 45, color: "#7c3aed", speedX: -0.16, speedY: 0.12, pulse: 3.5, pulseSpeed: 0.021 },
    ].map(b => ({
      ...b,
      ax: b.x,
      ay: b.y,
    }))

    let t = 0

    const draw = () => {
      const W = canvas.width
      const H = canvas.height

      // Dark gradient background
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, "#0f0f1a")
      grad.addColorStop(0.4, "#0d1a0f")
      grad.addColorStop(1, "#1a0f0f")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      t += 0.008

      bubbles.forEach((b) => {
        // Floating movement
        const x = (b.ax + Math.sin(t * b.speedX * 8 + b.pulse) * 0.06) * W
        const y = (b.ay + Math.cos(t * b.speedY * 8 + b.pulse) * 0.05) * H
        // Pulse opacity
        const alpha = 0.25 + Math.sin(t * b.pulseSpeed * 80 + b.pulse) * 0.12

        const radial = ctx.createRadialGradient(x, y, 0, x, y, b.r)
        radial.addColorStop(0, b.color + Math.round(alpha * 255).toString(16).padStart(2, "0"))
        radial.addColorStop(1, b.color + "00")
        ctx.beginPath()
        ctx.arc(x, y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = radial
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-16 md:py-24 min-h-[85vh] flex items-center">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6 border border-white/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Para crianças de 9 a 12 anos 🎉</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Aprenda sobre{" "}
            <span className="text-violet-300">tecnologia</span> e{" "}
            <span className="text-green-300">sustentabilidade</span>{" "}
            de forma divertida! 🚀
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Descubra como controlar o tempo de tela, descartar eletrônicos corretamente
            e usar a tecnologia de forma mais sustentável com nossos mascotes!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/cartilha">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-xl bg-violet-600 hover:bg-violet-700 text-white border-0">
                <BookOpen className="w-5 h-5" />
                Explorar Cartilha
              </Button>
            </Link>
            <Link href="/desafios">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-xl bg-green-600 hover:bg-green-700 text-white border-0">
                <Gamepad2 className="w-5 h-5" />
                Jogar Desafios
              </Button>
            </Link>
          </div>

          {/* Pesquisa destacada */}
          <div className="max-w-xl mx-auto bg-orange-500/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-300/50 shadow-xl mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ClipboardList className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">📋 Participe da nossa pesquisa!</span>
            </div>
            <p className="text-white/90 text-sm mb-4">
              Responda algumas perguntas rápidas e nos ajude a entender como as crianças usam a tecnologia. É anônimo e leva só 2 minutos!
            </p>
            <Link href="/pesquisa">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 shadow-md w-full sm:w-auto">
                Responder Pesquisa →
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm">
              <span className="text-3xl">📱</span>
              <span className="font-bold text-white">Tempo de Tela</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm">
              <span className="text-3xl">♻️</span>
              <span className="font-bold text-white">Lixo Eletrônico</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm">
              <span className="text-3xl">🌍</span>
              <span className="font-bold text-white">Tech Sustentável</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
