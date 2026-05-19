import { ReactNode } from 'react';
import { Zap, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

export function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-brand-lime text-brand-slate text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider shadow-sm ml-2">
      <Zap size={10} className="fill-brand-slate" /> PRO
    </span>
  );
}

interface UpsellOverlayProps {
  title: string;
  description: string;
  children: ReactNode;
  isLocked?: boolean;
}

export function UpsellOverlay({ title, description, children, isLocked = true }: UpsellOverlayProps) {
  const navigate = useNavigate();

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative group rounded-[24px] overflow-hidden">
      <div className="filter blur-[6px] opacity-60 pointer-events-none select-none transition-all duration-300 group-hover:blur-[8px]">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-white/40 backdrop-blur-[2px]">
        <div className="w-14 h-14 bg-brand-violet rounded-full flex items-center justify-center text-brand-lime mb-4 shadow-xl shadow-brand-violet/20 border-4 border-white">
          <Lock size={24} className="fill-brand-lime/20" />
        </div>
        <h4 className="font-display text-2xl font-bold text-brand-slate mb-2 drop-shadow-sm">{title}</h4>
        <p className="text-gray-700 font-sans text-sm mb-6 max-w-xs drop-shadow-sm">{description}</p>
        <button 
          onClick={() => navigate('/dashboard/billing')}
          className="px-6 py-3 rounded-full bg-brand-slate text-white font-display font-bold hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-lg"
        >
          <Zap size={18} className="text-brand-lime fill-brand-lime" />
          Desbloquear PRO
        </button>
      </div>
    </div>
  );
}
