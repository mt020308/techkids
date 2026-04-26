"use client"

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <AdminDashboard />
    </AdminAuthGuard>
  )
}
