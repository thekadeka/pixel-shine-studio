import { useState, useEffect } from 'react';
import { shouldUseAuth } from '@/utils/environment';

// Conditional imports - only load Supabase when needed
let useAuth: any = null;
let supabase: any = null;

if (shouldUseAuth()) {
  try {
    const authModule = require('@/hooks/useAuth');
    const supabaseModule = require('@/lib/supabase');
    useAuth = authModule.useAuth;
    supabase = supabaseModule.supabase;
  } catch (error) {
    console.log('Auth modules not available, using demo mode');
  }
}

export const useSmartAuth = () => {
  const [demoUser, setDemoUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Use real auth if available, otherwise demo mode
  const realAuth = useAuth ? useAuth() : null;

  // Listen for demo auth changes
  useEffect(() => {
    if (!shouldUseAuth()) {
      const handleDemoAuthChange = (event: any) => {
        setDemoUser(event.detail.user);
      };

      window.addEventListener('demoAuthChange', handleDemoAuthChange);
      return () => window.removeEventListener('demoAuthChange', handleDemoAuthChange);
    }
  }, []);

  if (shouldUseAuth() && realAuth) {
    // Return real authentication
    return realAuth;
  }

  // Demo authentication for preview environments
  return {
    user: demoUser,
    loading: loading,
    signOut: async () => {
      setDemoUser(null);
      window.dispatchEvent(new CustomEvent('demoAuthChange', { 
        detail: { user: null, type: 'logout' }
      }));
    },
    isAuthenticated: !!demoUser,
    profile: demoUser ? { 
      id: 'demo_user',
      email: demoUser.email,
      plan: 'demo',
      credits_remaining: 3 
    } : null
  };
};

export const useSmartSupabase = () => {
  // This hook is used in Login.tsx, so we need to provide a way to set demo user
  const [, setDemoUser] = useState<any>(null);

  if (shouldUseAuth() && supabase) {
    return supabase;
  }

  // Mock Supabase for demo
  return {
    auth: {
      signInWithPassword: async ({ email, password }: any) => {
        // Demo login - always succeeds and sets demo user
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoUserData = { email, id: 'demo_user' };
        setDemoUser(demoUserData);
        
        // Trigger a custom event to update the demo user state
        window.dispatchEvent(new CustomEvent('demoAuthChange', { 
          detail: { user: demoUserData, type: 'login' }
        }));
        
        return { error: null, data: { user: demoUserData } };
      },
      signUp: async ({ email, password, options }: any) => {
        // Demo signup - always succeeds
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoUserData = { email, id: 'demo_user', name: options?.data?.name };
        
        // For signup, don't auto-login in demo
        return { error: null, data: { user: demoUserData } };
      },
      signOut: async () => {
        setDemoUser(null);
        window.dispatchEvent(new CustomEvent('demoAuthChange', { 
          detail: { user: null, type: 'logout' }
        }));
        return { error: null };
      }
    }
  };
};