import { Link2, LayoutDashboard, TrendingUp, Palette, Settings, HelpCircle, LogOut } from 'lucide-react';
import { RouteState } from '../types';
import { useAuth } from '../hooks/useAuth';
import { ProBadge } from './ProUpsell';

interface SidebarProps {
  currentRoute: RouteState;
  setRoute: (route: RouteState) => void;
}

export function Sidebar({ currentRoute, setRoute }: SidebarProps) {
  const { signOut, user } = useAuth();
  const isPro = user?.user_metadata?.plan === 'PRO';

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-8 lg:py-12 px-4 bg-surface-low border-r border-brand-lavender z-50">
      <div className="flex items-center gap-3 px-4 mb-8 lg:mb-12 cursor-pointer" onClick={() => setRoute('profile')}>
        <div className="w-10 h-10 rounded-full bg-brand-violet flex items-center justify-center text-white font-display font-bold">
          LV
        </div>
        <div>
          <h1 className="font-display text-xl font-extrabold text-brand-violet leading-none tracking-tight">LinkVibe Admin</h1>
          <p className="font-sans text-sm text-gray-500 flex items-center mt-0.5">
            Criador {isPro ? <ProBadge /> : <span className="ml-1 text-[10px] font-bold text-gray-400">FREE</span>}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-2 flex-grow">
        <li>
          <button 
            onClick={() => setRoute('links')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              currentRoute === 'links' 
                ? 'bg-brand-violet text-white font-bold' 
                : 'text-gray-600 hover:text-brand-violet hover:bg-brand-lavender/50'
            }`}
          >
            <Link2 size={20} />
            <span>Links</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => setRoute('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              currentRoute === 'analytics' 
                ? 'bg-brand-violet text-white font-bold' 
                : 'text-gray-600 hover:text-brand-violet hover:bg-brand-lavender/50'
            }`}
          >
            <TrendingUp size={20} />
            <span>Analytics</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => setRoute('appearance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              currentRoute === 'appearance' 
                ? 'bg-brand-violet text-white font-bold' 
                : 'text-gray-600 hover:text-brand-violet hover:bg-brand-lavender/50'
            }`}
          >
            <Palette size={20} />
            <span>Aparência</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => setRoute('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              currentRoute === 'settings' 
                ? 'bg-brand-violet text-white font-bold' 
                : 'text-gray-600 hover:text-brand-violet hover:bg-brand-lavender/50'
            }`}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </li>
      </ul>

      <div className="mt-auto flex flex-col gap-4">
        {!isPro && (
          <button 
            onClick={() => setRoute('billing')}
            className={`w-full py-3 px-4 rounded-full font-display font-bold tracking-wide transition-colors ${currentRoute === 'billing' ? 'bg-[#c4db1c] text-brand-slate shadow-sm' : 'bg-brand-lime text-brand-slate hover:bg-[#c4db1c]'}`}
          >
            Fazer Upgrade 🚀
          </button>
        )}
        <ul className="flex flex-col gap-1 border-t border-brand-lavender pt-4">
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:text-brand-violet transition-colors">
              <HelpCircle size={18} />
              <span className="text-sm">Central de Ajuda</span>
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-600 hover:text-error transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Sair da Conta</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
