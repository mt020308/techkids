export function hasSupabaseEnv() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim()
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim()

  const hasValues = Boolean(url) && Boolean(key)
  const isPlaceholder =
    url.includes("SEU-PROJETO") ||
    key.includes("COLE_SUA_ANON_KEY_AQUI")

  return hasValues && !isPlaceholder
}
