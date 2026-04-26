"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("admin_authenticated")
      const loginTime = localStorage.getItem("admin_login_time")
      
      if (authenticated === "true" && loginTime) {
        // Verificar se a sessao expirou (24 horas)
        const now = Date.now()
        const loginTimestamp = parseInt(loginTime, 10)
        const twentyFourHours = 24 * 60 * 60 * 1000
        
        if (now - loginTimestamp < twentyFourHours) {
          setIsAuthenticated(true)
          return
        }
      }
      
      // Nao autenticado ou sessao expirada
      localStorage.removeItem("admin_authenticated")
      localStorage.removeItem("admin_login_time")
      setIsAuthenticated(false)
      router.push("/admin/login")
    }

    checkAuth()
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verificando autenticacao...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
