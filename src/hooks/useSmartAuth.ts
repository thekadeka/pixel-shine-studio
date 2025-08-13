import { useState, useEffect } from 'react';
import { shouldUseAuth } from '@/utils/environment';

// Conditional imports - only load Supabase when needed
let useAuth: any = null;
let supabase: any = null;

// Load auth modules dynamically when needed
const loadAuthModules = async () => {
  if (shouldUseAuth() && !useAuth) {
    try {
      const [authModule, supabaseModule] = await Promise.all([
        import('@/hooks/useAuth').catch(() => null),
        import('@/lib/supabase').catch(() => null)
      ]);
      
      if (authModule) useAuth = authModule.useAuth;
      if (supabaseModule) supabase = supabaseModule.supabase;
    } catch (error) {
      console.log('Auth modules not available, using demo mode');
    }
  }
};

export const useSmartAuth = () => {
  const [demoUser, setDemoUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  // Load auth modules on mount
  useEffect(() => {
    loadAuthModules().finally(() => setAuthLoaded(true));
  }, []);

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

  // Show loading while auth modules are loading
  if (shouldUseAuth() && !authLoaded) {
    return {
      user: null,
      loading: true,
      signOut: async () => {},
      isAuthenticated: false,
      profile: null
    };
  }

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
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    loadAuthModules().finally(() => setAuthLoaded(true));
  }, []);

  if (shouldUseAuth() && authLoaded && supabase) {
    return supabase;
  }

  // Mock Supabase for demo
  return {
    auth: {
      signInWithPassword: async ({ email, password }: any) => {
        // Demo login - always succeeds and sets demo user
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoUserData = { email, id: 'demo_user' };
        
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
        window.dispatchEvent(new CustomEvent('demoAuthChange', { 
          detail: { user: null, type: 'logout' }
        }));
        return { error: null };
      }
    }
  };
};