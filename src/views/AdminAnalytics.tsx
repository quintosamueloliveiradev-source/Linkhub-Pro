import { MousePointer2, TrendingUp, TrendingDown, Users, Instagram, Youtube, Twitter, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { UpsellOverlay } from '../components/ProUpsell';
import { useAuth } from '../hooks/useAuth';

export function AdminAnalytics() {
  const { user } = useAuth();
  const isPro = user?.user_metadata?.plan === 'PRO';

  return (
    <div className="w-full max-w-[1000px] mx-auto py-8 md:py-12 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-4xl font-extrabold text-brand-slate tracking-tight mb-2">Visão Geral</h2>
        <p className="font-sans text-lg text-gray-500">Acompanhe seu engajamento e crescimento.</p>
      </div>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Highlight Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brand-violet text-white rounded-[24px] p-6 flex flex-col justify-between shadow-lg"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="font-display text-sm font-bold text-brand-lavender/90 mb-1 tracking-wide">Total de Cliques</p>
              <h3 className="font-display text-5xl font-extrabold text-brand-lime">124.5k</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-full">
              <MousePointer2 size={24} className="text-brand-lime" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-lime" />
            <span className="font-display text-sm font-bold text-brand-lime">+14.2%</span>
            <span className="font-sans text-sm text-brand-lavender/80">vs últimos 30 dias</span>
          </div>
        </motion.div>

        {/* Secondary Stat: CTR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] p-6 flex flex-col justify-between border border-brand-lavender shadow-sm"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="font-display text-sm font-bold text-gray-500 mb-1 tracking-wide">Taxa de Cliques (CTR)</p>
              <h3 className="font-display text-4xl font-extrabold text-brand-slate">8.4%</h3>
            </div>
            <div className="p-3 bg-surface-high rounded-full">
              <MousePointer2 size={24} className="text-brand-violet" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-600" />
            <span className="font-display text-sm font-bold text-green-600">+2.1%</span>
            <span className="font-sans text-sm text-gray-500">vs últimos 30 dias</span>
          </div>
        </motion.div>

        {/* Secondary Stat: Visitors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[24px] p-6 flex flex-col justify-between border border-brand-lavender shadow-sm"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="font-display text-sm font-bold text-gray-500 mb-1 tracking-wide">Visitantes Únicos</p>
              <h3 className="font-display text-4xl font-extrabold text-brand-slate">42.1k</h3>
            </div>
            <div className="p-3 bg-surface-high rounded-full">
              <Users size={24} className="text-brand-violet" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className="text-error" />
            <span className="font-display text-sm font-bold text-error">-0.5%</span>
            <span className="font-sans text-sm text-gray-500">vs últimos 30 dias</span>
          </div>
        </motion.div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20 md:pb-0">
        
        {/* Top Referrers */}
        <UpsellOverlay 
          isLocked={!isPro} 
          title="Origens de Tráfego" 
          description="Descubra exatamente de quais redes sociais e sites seu público está vindo."
        >
          <div className="bg-white rounded-[24px] p-6 border border-brand-lavender shadow-sm h-full">
            <h3 className="font-display text-2xl font-bold text-brand-slate mb-2">Principais Origens</h3>
            <p className="font-sans text-sm text-gray-500 mb-6">De onde vem o seu tráfego.</p>
            
            <ul className="flex flex-col gap-3">
              <ReferrerRow icon={<Instagram size={18} />} name="Instagram" bgColor="bg-[#E1306C]" pct="45%" val="56k" />
              <ReferrerRow icon={<Music size={18} />} name="TikTok" bgColor="bg-black" pct="30%" val="37.3k" />
              <ReferrerRow icon={<Youtube size={18} />} name="YouTube" bgColor="bg-[#FF0000]" pct="15%" val="18.6k" />
              <ReferrerRow icon={<Twitter size={18} />} name="Twitter / X" bgColor="bg-[#1DA1F2]" pct="10%" val="12.4k" />
            </ul>
          </div>
        </UpsellOverlay>

        {/* Geo Distribution */}
        <UpsellOverlay 
          isLocked={!isPro} 
          title="Audiência Global" 
          description="Entenda o país de origem dos seus visitantes para direcionar parcerias e patrocínios."
        >
          <div className="bg-white rounded-[24px] p-6 border border-brand-lavender shadow-sm h-full">
            <h3 className="font-display text-2xl font-bold text-brand-slate mb-2">Distribuição Geográfica</h3>
            <p className="font-sans text-sm text-gray-500 mb-6">Principais países por visitantes.</p>
            
            <div className="space-y-5 mt-2">
              <GeoBar country="🇺🇸 Estados Unidos" pct="42%" color="bg-brand-violet" width="w-[42%]" />
              <GeoBar country="🇬🇧 Reino Unido" pct="18%" color="bg-blue-600" width="w-[18%]" />
              <GeoBar country="🇨🇦 Canadá" pct="12%" color="bg-purple-400" width="w-[12%]" />
              <GeoBar country="🇦🇺 Austrália" pct="8%" color="bg-emerald-500" width="w-[8%]" />
            </div>
          </div>
        </UpsellOverlay>
      </div>
    </div>
  );
}

function ReferrerRow({ icon, name, bgColor, pct, val }: { icon: React.ReactNode, name: string, bgColor: string, pct: string, val: string }) {
  return (
    <li className="flex items-center justify-between p-4 bg-surface-low rounded-2xl hover:bg-brand-lavender/40 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center text-white shadow-sm`}>
          {icon}
        </div>
        <span className="font-display text-base font-bold text-brand-slate">{name}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="font-sans text-sm text-gray-500 w-8">{pct}</span>
        <span className="font-display text-base font-bold text-brand-slate w-12 text-right">{val}</span>
      </div>
    </li>
  );
}

function GeoBar({ country, pct, width, color }: { country: string, pct: string, width: string, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-display text-sm font-bold text-brand-slate flex items-center gap-2">{country}</span>
        <span className="font-sans text-sm text-gray-500">{pct}</span>
      </div>
      <div className="w-full bg-surface-high rounded-full h-3 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: pct }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${color} h-full rounded-full`}
          style={{ width }}
        ></motion.div>
      </div>
    </div>
  );
}
