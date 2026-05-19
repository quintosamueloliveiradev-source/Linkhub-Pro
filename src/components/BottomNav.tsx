import { Link2, LayoutDashboard, TrendingUp, Palette, Settings } from 'lucide-react';
import { RouteState } from '../types';

interface BottomNavProps {
  currentRoute: RouteState;
  setRoute: (route: RouteState) => void;
}

export function BottomNav({ currentRoute, setRoute }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-brand-lavender z-50 px-4 py-2 flex justify-between items-center pb-safe">
      <button 
        className={`flex flex-col items-center p-2 ${currentRoute === 'links' ? 'text-brand-violet font-bold' : 'text-gray-500'}`}
        onClick={() => setRoute('links')}
      >
        <Link2 size={24} className="mb-1" />
        <span className="font-display text-[10px] tracking-wide">Links</span>
      </button>
      
      <button 
        className={`flex flex-col items-center p-2 ${currentRoute === 'analytics' ? 'text-brand-violet font-bold' : 'text-gray-500'}`}
        onClick={() => setRoute('analytics')}
      >
        <TrendingUp size={24} className="mb-1" />
        <span className="font-display text-[10px] tracking-wide">Analytics</span>
      </button>

      <button className="flex flex-col items-center p-2 text-gray-500">
        <LayoutDashboard size={24} className="mb-1" />
        <span className="font-display text-[10px] tracking-wide">Painel</span>
      </button>

      <button className="flex flex-col items-center p-2 text-gray-500">
        <Palette size={24} className="mb-1" />
        <span className="font-display text-[10px] tracking-wide">Aparência</span>
      </button>
    </nav>
  );
}
