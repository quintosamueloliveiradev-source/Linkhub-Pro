import { Share } from 'lucide-react';
import { PublicProfile } from './PublicProfile';
import { useAuth } from '../hooks/useAuth';
import { LinkItem } from '../types';

export function PhoneMockup({ links }: { links?: LinkItem[] }) {
  const { user } = useAuth();
  const isPro = user?.user_metadata?.plan === 'PRO';

  return (
    <section className="hidden xl:flex w-[460px] border-l border-brand-lavender bg-surface-low min-h-screen flex-col items-center justify-center relative p-8">
      <div className="absolute top-8 right-8">
        <button className="px-5 py-2 rounded-full bg-white border border-brand-lavender text-brand-violet font-display font-bold text-sm flex items-center gap-2 hover:bg-brand-lavender/50 transition-colors shadow-sm">
          <Share size={16} />
          Compartilhar
        </button>
      </div>

      {/* Phone Hardware Shell */}
      <div className="w-[340px] h-[720px] bg-brand-slate rounded-[44px] border-[12px] border-brand-slate relative overflow-hidden shadow-2xl flex flex-col items-center flex-shrink-0">
        
        {/* Notch */}
        <div className="absolute top-0 w-32 h-6 bg-brand-slate rounded-b-2xl left-1/2 -translate-x-1/2 z-50"></div>
        
        {/* Phone Screen / Iframe illusion */}
        <div className="w-full h-full bg-background overflow-hidden relative rounded-[32px] flex flex-col">
           {/* Wrap profile in a scrollable frame */}
           <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
             <div className="scale-[0.85] origin-top">
                <PublicProfile isPro={isPro} links={links} />
             </div>
           </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 font-display text-sm font-bold flex items-center gap-2 tracking-wide">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Visualização ao vivo {isPro ? '(PRO)' : '(FREE)'}
      </p>
    </section>
  );
}
