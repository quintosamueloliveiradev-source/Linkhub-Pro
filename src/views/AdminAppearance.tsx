import { CheckCircle2 } from 'lucide-react';
import { UpsellOverlay, ProBadge } from '../components/ProUpsell';
import { useAuth } from '../hooks/useAuth';
import { PhoneMockup } from '../components/PhoneMockup';

const THEMES = [
  { id: 'light', name: 'Minimal Claro', isPro: false, color1: '#ffffff', color2: '#f3f4f6' },
  { id: 'dark', name: 'Minimal Escuro', isPro: false, color1: '#111827', color2: '#374151' },
  { id: 'cosmic', name: 'Cosmic Slate', isPro: true, color1: '#1e1b4b', color2: '#312e81' },
  { id: 'sunset', name: 'Pôr do Sol', isPro: true, color1: '#f59e0b', color2: '#ef4444' },
  { id: 'forest', name: 'Floresta Zen', isPro: true, color1: '#064e3b', color2: '#047857' },
  { id: 'cotton', name: 'Algodão Doce', isPro: true, color1: '#fbcfe8', color2: '#f472b6' },
];

export function AdminAppearance() {
  const { user } = useAuth();
  const isPro = user?.user_metadata?.plan === 'PRO';

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 w-full max-w-[800px] mx-auto py-8 md:py-12 flex flex-col gap-8 pr-0 xl:pr-10 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div>
          <h2 className="font-display text-4xl font-extrabold text-brand-slate tracking-tight">Aparência</h2>
          <p className="font-sans text-lg text-gray-500 mt-2">Destaque-se com temas que combinam com sua marca.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-lavender shadow-sm">
          <h3 className="font-display text-xl font-bold mb-4">Temas Disponíveis</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {THEMES.map(theme => (
              <div key={theme.id} className="relative group">
                <button 
                  className={`w-full aspect-[4/5] rounded-xl border-2 transition-all overflow-hidden flex flex-col ${
                    theme.id === 'light' ? 'border-brand-violet ring-4 ring-brand-violet/20' : 'border-gray-200 hover:border-brand-violet'
                  }`}
                >
                  <div 
                    className="flex-1 w-full"
                    style={{ background: `linear-gradient(to bottom right, ${theme.color1}, ${theme.color2})` }}
                  >
                    {/* Elementos visuais mockups de botões */}
                    <div className="w-full flex flex-col items-center justify-center h-full gap-2 p-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 mb-2"></div>
                      <div className="w-full h-6 rounded-full bg-white/20"></div>
                      <div className="w-full h-6 rounded-full bg-white/20"></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white text-left flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-slate-800">{theme.name}</span>
                    {theme.isPro && <ProBadge />}
                  </div>
                </button>
                
                {/* Lock Overlay purely visual over the button if not Pro */}
                {!isPro && theme.isPro && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-xl z-10 flex flex-col items-center justify-center pointer-events-none">
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isPro && (
             <div className="mt-8 p-4 bg-brand-violet/5 rounded-xl border border-brand-violet/20 flex items-center justify-between">
               <div>
                 <p className="font-bold text-brand-slate">Desbloqueie os temas Premium</p>
                 <p className="text-sm text-gray-500">Faça upgrade para ter acesso a paletas exclusivas.</p>
               </div>
             </div>
          )}
        </div>
        
        {/* Custom Backgrounds Option */}
        <UpsellOverlay isLocked={!isPro} title="Fundos Customizados" description="Faça upload de suas próprias imagens ou vídeos para o fundo da sua página.">
          <div className="bg-white p-6 rounded-2xl border border-brand-lavender shadow-sm mb-20 lg:mb-0">
            <h3 className="font-display text-xl font-bold mb-4">Fundo Personalizado</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 size={24} className="text-gray-400" />
              </div>
              <p className="font-bold text-brand-slate">Fazer upload de imagem</p>
              <p className="text-sm text-gray-400 mb-4">PNG, JPG ou GIF até 5MB</p>
              <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-bold text-sm">Selecionar Arquivo</button>
            </div>
          </div>
        </UpsellOverlay>

      </div>

      <div className="hidden xl:block">
        <PhoneMockup />
      </div>
    </div>
  );
}
