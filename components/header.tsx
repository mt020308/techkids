"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, BookOpen, Gamepad2, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/cartilha", label: "Cartilha", icon: BookOpen },
  { href: "/desafios", label: "Desafios", icon: Gamepad2 },
  { href: "/pesquisa", label: "Pesquisa", icon: ClipboardList },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground text-xl font-bold">
            🤖
          </div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            TechKids
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/admin/login">
            <Button variant="outline" size="sm" className="ml-2">
              Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border/40 bg-card p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full mt-2">
                Admin
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
