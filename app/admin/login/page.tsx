"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Leaf, Lock, User, ArrowLeft, Loader2 } from "lucide-react"

// Credenciais do administrador
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "lnb1810jt"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simular delay de verificacao
    await new Promise(resolve => setTimeout(resolve, 500))

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Salvar sessao no localStorage
      localStorage.setItem("admin_authenticated", "true")
      localStorage.setItem("admin_login_time", Date.now().toString())
      router.push("/admin")
    } else {
      setError("Usuario ou senha incorretos.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              TechKids
            </span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Usuario</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Digite seu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-input border-border"
                      required
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-input border-border"
                      required
                    />
                  </div>
                </Field>
              </FieldGroup>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/20 text-destructive text-sm border border-destructive/30">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Acesso restrito a administradores autorizados.
        </p>
      </div>
    </div>
  )
}
