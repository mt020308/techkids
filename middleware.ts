import { updateSession } from '@/lib/supabase/proxy'
import { hasSupabaseEnv } from '@/lib/supabase/env'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return
  }

  // Update the Supabase session for database queries
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
