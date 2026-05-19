/**
 * Contexto de autenticação baseada em Supabase.
 * Para funcionar no Code Sandbox / AI Studio sem as chaves logo de início,
 * nós mockamos o estado para que o SaaS possa ser visualizado.
 * O usuário pode plugar suas chaves do Supabase depois.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string | undefined;
  user_metadata: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<{error: any}>;
  signUp: (email: string, password?: string) => Promise<{error: any, data?: any}>;
  signOut: () => Promise<void>;
  // Fallback para visualização imediata no AI Studio sem DB ativo:
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password?: string) => {
    if (password) {
      return await supabase.auth.signInWithPassword({ email, password });
    }
    return await supabase.auth.signInWithOtp({ email });
  };

  const signUp = async (email: string, password?: string) => {
    return await supabase.auth.signUp({ email, password: password || '' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const demoLogin = () => {
    setUser({ id: 'demo-123', email: 'creator@demo.app', user_metadata: { plan: 'FREE' } });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
