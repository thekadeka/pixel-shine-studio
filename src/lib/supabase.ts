import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  plan: 'free' | 'basic' | 'pro' | 'premium'
  credits_remaining: number
  total_uploads: number
  created_at: string
}

export interface Upload {
  id: string
  user_id: string
  original_filename: string
  original_url: string
  enhanced_url?: string
  status: 'processing' | 'completed' | 'failed'
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  plan_name: string
  status: string
  current_period_end: string
}