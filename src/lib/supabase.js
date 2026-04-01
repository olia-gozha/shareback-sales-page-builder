import { createClient } from '@supabase/supabase-js'

let browserClient = null
let adminClient = null

function readRequiredEnv(name) {
  const value = process.env[name]
  if (value) return value
  throw new Error(`Missing required environment variable: ${name}`)
}

// Browser client (uses anon key, safe for client components)
export function getSupabase() {
  if (browserClient) return browserClient

  const supabaseUrl = readRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
  const anonKey = readRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  browserClient = createClient(supabaseUrl, anonKey)
  return browserClient
}

// Server client (uses service role key, full access - API routes only)
export function getSupabaseAdmin() {
  if (adminClient) return adminClient

  const supabaseUrl = readRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = readRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')

  adminClient = createClient(supabaseUrl, serviceRoleKey)
  return adminClient
}
