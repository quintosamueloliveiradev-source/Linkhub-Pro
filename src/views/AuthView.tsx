import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

export function AuthView() {
  const { signIn, signUp, demoLogin, user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard/links', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const action = isSignUp ? signUp : signIn;
      const { error } = await action(email, password);

      if (error) {
        setStatus('error');
        
        let msg = error.message;
        if (msg?.includes('User already registered')) {
          msg = 'Este email já está cadastrado. Clique em "Faça login" abaixo.';
        } else if (msg?.includes('Invalid login credentials')) {
          msg = 'Email ou senha incorretos.';
        } else if (msg?.includes('Email not confirmed')) {
          msg = 'Por favor, confirme seu email antes de fazer login.';
        } else if (msg?.includes('Password should be at least')) {
          msg = 'A senha deve ter pelo menos 6 caracteres.';
        } else if (msg?.includes('Failed to fetch')) {
          msg = 'Erro de conexão com o Supabase. Verifique se as chaves (URL/Anon Key) foram inseridas corretamente nos Secrets/Environment Variables da plataforma.';
        }
        
        setErrorMessage(msg || 'Erro na autenticação. Tente novamente.');
      } else {
        if (isSignUp) {
          setStatus('sent');
        }
        // SignIn navega via useEffect.
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Erro inesperado ao conectar com o banco de dados. Você pode entrar sem banco clicando em "Acessar Dashboard (Sem Banco)" abaixo.');
    }
  };

  const handleDemo = () => {
    demoLogin();
    navigate('/dashboard/links');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-violet flex items-center justify-center text-white mb-4 shadow-sm border-2 border-brand-lavender">
          <Zap size={32} />
        </div>
        <h2 className="text-center text-3xl font-display font-extrabold text-brand-slate">
          LinkHub Pro
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          A plataforma SaaS moderna para criadores de conteúdo.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-brand-lavender sm:rounded-[24px] sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Endereço de Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-brand-lavender rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-violet focus:border-brand-violet sm:text-sm transition-colors"
                  placeholder="voce@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-brand-lavender rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-violet focus:border-brand-violet sm:text-sm transition-colors"
                  placeholder="Sua senha segura"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-display font-bold text-white bg-brand-violet hover:bg-[#3d16c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-violet transition-colors"
            >
              {status === 'loading' ? 'Aguarde...' : isSignUp ? 'Criar Conta' : 'Entrar'}
            </button>
            
            {status === 'sent' && isSignUp && (
              <p className="text-sm text-green-600 text-center font-bold">Confirme seu email para finalizar o cadastro!</p>
            )}
            {status === 'error' && (
              <div className="text-sm text-error bg-error-container p-3 rounded-xl mt-2 text-center border border-error/20">
                {errorMessage}
              </div>
            )}
            
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-brand-violet font-medium hover:underline focus:outline-none"
              >
                {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem conta? Crie uma agora'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-lavender" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 py-1 rounded-full bg-surface-low text-gray-500 font-medium">Ou entre na versão demonstrativa</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemo}
                className="w-full flex justify-center py-3 px-4 border border-brand-lime rounded-full shadow-sm text-sm font-display font-bold text-brand-slate bg-brand-lime hover:bg-[#c4db1c] transition-colors"
              >
                Acessar Dashboard (Sem Banco)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
