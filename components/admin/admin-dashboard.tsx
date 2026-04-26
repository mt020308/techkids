"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Leaf, 
  BarChart3, 
  Eye, 
  ClipboardList,
  LogOut,
  TrendingUp,
  Calendar,
  Smartphone,
  Shield,
  Recycle,
  Star,
  Loader2,
  Target
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"

const COLORS = ['hsl(145, 60%, 50%)', 'hsl(240, 60%, 60%)', 'hsl(55, 70%, 55%)', 'hsl(320, 60%, 55%)', 'hsl(180, 50%, 50%)']

export function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ totalVisits: 0, surveyCount: 0, challengesCount: 0, avgRating: 0 })
  const [surveyResponses, setSurveyResponses] = useState<any[]>([])
  const [recentVisits, setRecentVisits] = useState<any[]>([])
  const [completedChallenges, setCompletedChallenges] = useState<any[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const hasSupabaseConfig = hasSupabaseEnv()

      if (!hasSupabaseConfig) {
        setFetchError("Supabase nao configurado. Preencha as variaveis no arquivo .env.local.")
        setStats({
          totalVisits: 0,
          surveyCount: 0,
          challengesCount: 0,
          avgRating: 0,
        })
        setSurveyResponses([])
        setCompletedChallenges([])
        setRecentVisits([])
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClient()

        const [
          { count: totalVisits },
          { count: surveyCount },
          { count: challengesCount },
          { data: surveyData },
          { data: visitsData },
          { data: challengesData }
        ] = await Promise.all([
          supabase.from('site_visits').select('*', { count: 'exact', head: true }),
          supabase.from('survey_responses').select('*', { count: 'exact', head: true }),
          supabase.from('completed_challenges').select('*', { count: 'exact', head: true }),
          supabase.from('survey_responses').select('*').order('created_at', { ascending: false }),
          supabase.from('site_visits').select('*').order('visited_at', { ascending: false }).limit(100),
          supabase.from('completed_challenges').select('*').order('completed_at', { ascending: false }).limit(100)
        ])

        const avgRating = surveyData && surveyData.length > 0
          ? surveyData.reduce((acc, r) => acc + (r.rating || 0), 0) / surveyData.length
          : 0

        setStats({
          totalVisits: totalVisits || 0,
          surveyCount: surveyCount || 0,
          challengesCount: challengesCount || 0,
          avgRating
        })
        setSurveyResponses(surveyData || [])
        setCompletedChallenges(challengesData || [])
        setRecentVisits(visitsData || [])
      } catch {
        setFetchError("Falha ao carregar dados do banco.")

        setStats({
          totalVisits: 0,
          surveyCount: 0,
          challengesCount: 0,
          avgRating: 0,
        })
        setSurveyResponses([])
        setCompletedChallenges([])
        setRecentVisits([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_login_time")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    )
  }

  // Process data for charts
  const screenTimeData = processScreenTimeData(surveyResponses)
  const safetyData = processSafetyData(surveyResponses)
  const environmentData = processEnvironmentData(surveyResponses)
  const ratingData = processRatingData(surveyResponses)
  const pageVisitsData = processPageVisits(recentVisits)
  const dailyVisitsData = processDailyVisits(recentVisits)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              TechKids
            </span>
            <Badge variant="secondary" className="ml-2">Admin</Badge>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Administrador
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {fetchError && (
          <Card className="mb-6 border-destructive/40 bg-destructive/5">
            <CardContent className="pt-6 text-sm text-destructive">
              {fetchError}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Visitas</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalVisits}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/20">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Respostas da Pesquisa</p>
                  <p className="text-3xl font-bold text-foreground">{stats.surveyCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/20">
                  <ClipboardList className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Desafios Concluidos</p>
                  <p className="text-3xl font-bold text-foreground">{stats.challengesCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/20">
                  <Target className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nota Media</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-accent/20">
                  <Star className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Conversao</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalVisits > 0 
                      ? ((stats.surveyCount / stats.totalVisits) * 100).toFixed(1) + "%"
                      : "N/A"
                    }
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Visao Geral
            </TabsTrigger>
            <TabsTrigger value="technology" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Tecnologia
            </TabsTrigger>
            <TabsTrigger value="safety" className="gap-2">
              <Shield className="w-4 h-4" />
              Seguranca
            </TabsTrigger>
            <TabsTrigger value="environment" className="gap-2">
              <Recycle className="w-4 h-4" />
              Meio Ambiente
            </TabsTrigger>
            <TabsTrigger value="responses" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Respostas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Visits Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Visitas por Dia
                  </CardTitle>
                  <CardDescription>Ultimos 7 dias de visitas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyVisitsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="visits" 
                          stroke="hsl(145, 60%, 50%)" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(145, 60%, 50%)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Page Visits Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-secondary" />
                    Visitas por Pagina
                  </CardTitle>
                  <CardDescription>Distribuicao de acessos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pageVisitsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pageVisitsData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Rating Distribution */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Distribuicao de Notas
                  </CardTitle>
                  <CardDescription>Notas dadas pelos participantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="rating" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(55, 70%, 55%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Learned Something */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Aprendizado
                  </CardTitle>
                  <CardDescription>Usuarios que aprenderam algo novo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={processLearnedData(surveyResponses)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {processLearnedData(surveyResponses).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technology" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Screen Time */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    Tempo de Uso Diario
                  </CardTitle>
                  <CardDescription>Horas de uso de celular/tablet por dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={screenTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(240, 60%, 60%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Changed Phone Recently */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-secondary" />
                    Troca de Celular
                  </CardTitle>
                  <CardDescription>Trocou de celular nos ultimos 2 anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={processChangedPhoneData(surveyResponses)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {processChangedPhoneData(surveyResponses).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Knows Not Talk Strangers */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Estranhos Online
                  </CardTitle>
                  <CardDescription>Sabe que nao deve falar com estranhos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={safetyData.strangers}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {safetyData.strangers.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Parents Supervise */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    Supervisao dos Pais
                  </CardTitle>
                  <CardDescription>Pais acompanham o uso da internet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={safetyData.supervision}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {safetyData.supervision.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Knows About Scams */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Conhece Golpes
                  </CardTitle>
                  <CardDescription>Sabe identificar golpes online</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={safetyData.scams}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {safetyData.scams.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Knows Electronic Waste */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-primary" />
                    Conhece E-Lixo
                  </CardTitle>
                  <CardDescription>Sabe o que e lixo eletronico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={environmentData.knowsEwaste}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {environmentData.knowsEwaste.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Disposed Incorrectly */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-destructive" />
                    Descarte Incorreto
                  </CardTitle>
                  <CardDescription>Ja jogou eletronicos no lixo comum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={environmentData.disposedIncorrectly}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {environmentData.disposedIncorrectly.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Knows Disposal Location */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-secondary" />
                    Local de Descarte
                  </CardTitle>
                  <CardDescription>Sabe onde descartar corretamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={environmentData.knowsLocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {environmentData.knowsLocation.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Desafios Concluidos
                </CardTitle>
                <CardDescription>Registros de partidas finalizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Sessao</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedChallenges.map((challenge) => (
                        <TableRow key={challenge.id}>
                          <TableCell className="text-sm">
                            {new Date(challenge.completed_at).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-sm">{challenge.challenge_type}</TableCell>
                          <TableCell className="text-sm">{challenge.session_id}</TableCell>
                        </TableRow>
                      ))}
                      {completedChallenges.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            Nenhum desafio concluido encontrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Todas as Respostas
                </CardTitle>
                <CardDescription>Lista completa de respostas da pesquisa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tempo de Uso</TableHead>
                        <TableHead>Trocou Cel.</TableHead>
                        <TableHead>Estranhos</TableHead>
                        <TableHead>Supervisao</TableHead>
                        <TableHead>Golpes</TableHead>
                        <TableHead>E-Lixo</TableHead>
                        <TableHead>Descartou</TableHead>
                        <TableHead>Local</TableHead>
                        <TableHead>Aprendeu</TableHead>
                        <TableHead>Nota</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {surveyResponses.map((response) => (
                        <TableRow key={response.id}>
                          <TableCell className="text-sm">
                            {new Date(response.created_at).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatScreenTime(response.hours_using_phone)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.changed_phone_recently ? "default" : "secondary"}>
                              {response.changed_phone_recently ? "Sim" : "Nao"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.knows_not_talk_strangers ? "default" : "destructive"}>
                              {response.knows_not_talk_strangers ? "Sabe" : "Nao sabe"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.parents_supervise ? "default" : "secondary"}>
                              {response.parents_supervise ? "Sim" : "Nao"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.knows_about_scams ? "default" : "destructive"}>
                              {response.knows_about_scams ? "Sabe" : "Nao sabe"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.knows_electronic_waste ? "default" : "secondary"}>
                              {response.knows_electronic_waste ? "Sabe" : "Nao sabe"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.disposed_incorrectly ? "destructive" : "default"}>
                              {response.disposed_incorrectly ? "Sim" : "Nao"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.knows_disposal_location ? "default" : "secondary"}>
                              {response.knows_disposal_location ? "Sabe" : "Nao sabe"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.learned_something ? "default" : "secondary"}>
                              {response.learned_something ? "Sim" : "Nao"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{response.rating}/10</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {surveyResponses.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                            Nenhuma resposta encontrada
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Helper functions
function processScreenTimeData(responses: any[]) {
  const labels: Record<string, string> = {
    'less-1': '<1h',
    '1-2': '1-2h',
    '2-4': '2-4h',
    '4-6': '4-6h',
    'more-6': '>6h'
  }
  
  const data: Record<string, number> = {}
  
  responses.forEach(r => {
    if (r.hours_using_phone) {
      data[r.hours_using_phone] = (data[r.hours_using_phone] || 0) + 1
    }
  })
  
  return Object.entries(labels).map(([key, label]) => ({
    range: label,
    count: data[key] || 0
  }))
}

function processChangedPhoneData(responses: any[]) {
  const yes = responses.filter(r => r.changed_phone_recently === true).length
  const no = responses.filter(r => r.changed_phone_recently === false).length
  
  return [
    { name: 'Sim', value: yes },
    { name: 'Nao', value: no }
  ]
}

function processSafetyData(responses: any[]) {
  const strangersYes = responses.filter(r => r.knows_not_talk_strangers === true).length
  const strangersNo = responses.filter(r => r.knows_not_talk_strangers === false).length
  
  const superviseYes = responses.filter(r => r.parents_supervise === true).length
  const superviseNo = responses.filter(r => r.parents_supervise === false).length
  
  const scamsYes = responses.filter(r => r.knows_about_scams === true).length
  const scamsNo = responses.filter(r => r.knows_about_scams === false).length
  
  return {
    strangers: [
      { name: 'Sabe', value: strangersYes },
      { name: 'Nao sabe', value: strangersNo }
    ],
    supervision: [
      { name: 'Sim', value: superviseYes },
      { name: 'Nao', value: superviseNo }
    ],
    scams: [
      { name: 'Sabe', value: scamsYes },
      { name: 'Nao sabe', value: scamsNo }
    ]
  }
}

function processEnvironmentData(responses: any[]) {
  const knowsEwasteYes = responses.filter(r => r.knows_electronic_waste === true).length
  const knowsEwasteNo = responses.filter(r => r.knows_electronic_waste === false).length
  
  const disposedYes = responses.filter(r => r.disposed_incorrectly === true).length
  const disposedNo = responses.filter(r => r.disposed_incorrectly === false).length
  
  const knowsLocationYes = responses.filter(r => r.knows_disposal_location === true).length
  const knowsLocationNo = responses.filter(r => r.knows_disposal_location === false).length
  
  return {
    knowsEwaste: [
      { name: 'Sabe', value: knowsEwasteYes },
      { name: 'Nao sabe', value: knowsEwasteNo }
    ],
    disposedIncorrectly: [
      { name: 'Sim', value: disposedYes },
      { name: 'Nao', value: disposedNo }
    ],
    knowsLocation: [
      { name: 'Sabe', value: knowsLocationYes },
      { name: 'Nao sabe', value: knowsLocationNo }
    ]
  }
}

function processRatingData(responses: any[]) {
  const ratings: Record<number, number> = {}
  
  for (let i = 1; i <= 10; i++) {
    ratings[i] = 0
  }
  
  responses.forEach(r => {
    if (r.rating >= 1 && r.rating <= 10) {
      ratings[r.rating]++
    }
  })
  
  return Object.entries(ratings).map(([rating, count]) => ({
    rating: parseInt(rating),
    count
  }))
}

function processLearnedData(responses: any[]) {
  const yes = responses.filter(r => r.learned_something === true).length
  const no = responses.filter(r => r.learned_something === false).length
  
  return [
    { name: 'Aprendeu', value: yes },
    { name: 'Ja sabia', value: no }
  ]
}

function processPageVisits(visits: any[]) {
  const pages: Record<string, number> = {}
  
  visits.forEach(v => {
    if (v.page_path) {
      const path = v.page_path === '/' ? 'Inicio' : v.page_path.replace('/', '').charAt(0).toUpperCase() + v.page_path.slice(2)
      pages[path] = (pages[path] || 0) + 1
    }
  })
  
  return Object.entries(pages).map(([name, value]) => ({ name, value }))
}

function processDailyVisits(visits: any[]) {
  const days: Record<string, number> = {}
  const now = new Date()
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const key = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    days[key] = 0
  }
  
  visits.forEach(v => {
    const date = new Date(v.visited_at)
    const key = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    if (days[key] !== undefined) {
      days[key]++
    }
  })
  
  return Object.entries(days).map(([date, visits]) => ({ date, visits }))
}

function formatScreenTime(time: string) {
  const labels: Record<string, string> = {
    'less-1': '<1h',
    '1-2': '1-2h',
    '2-4': '2-4h',
    '4-6': '4-6h',
    'more-6': '>6h'
  }
  return labels[time] || time
}
