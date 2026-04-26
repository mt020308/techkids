import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Painel Admin - TechKids",
  description: "Painel administrativo do TechKids",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
