import { PlayCircle, ShoppingBag, MessageSquare, Mail, Camera, Twitter, Music, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function PublicProfile({ isPro = false }: { isPro?: boolean }) {
  return (
    <div className="bg-mesh min-h-full flex flex-col items-center py-12 px-4 relative overflow-x-hidden w-full">
      <main className="w-full max-w-[420px] flex flex-col gap-12 items-center relative z-10 pb-20">
        
        {/* Profile Section */}
        <header className="flex flex-col items-center text-center w-full">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-4 group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-105">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2abEE_52lEwTUEQOZ-b8ldEvcPMA0D-JslEEQkGTKE77xNoMsV4pXT0yesI6U8P8CtAZ7RoftECGMk5pgmgHs0y35ZUn8PimXIlyv4Taz5dNPaxX1B1OB8RYKXgZ2v4Rh0VB5hRVm6n9qzOHXabqpn132ondzp2Ae0DyHZQ9hDMae60KpuIfYPz9yAR_jZDQNbrS7rsRfw4ZQclHvJJ-AWP4yHGTjSN6MPeRK7xUcZg7oeCsBuj0aw5ZNkPUq1x0AFpoCD-weJYy1" 
                alt="Alex Mercer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-brand-lime rounded-full blur-xl opacity-40 -z-10 translate-y-2 translate-x-2"></div>
          </motion.div>
          
          <h1 className="font-display text-3xl font-extrabold text-brand-slate mb-1 tracking-tight">
            Alex Mercer
          </h1>
          
          <p className="font-display text-sm font-semibold text-brand-violet bg-surface-low py-1 px-3 rounded-full mb-4 inline-flex items-center gap-1">
            <CheckCircle2 size={16} />
            @alexmercer
          </p>
          
          <p className="font-sans text-base text-gray-600 max-w-[320px] leading-relaxed">
            Criador Digital | Reviewer de Tech | Entusiasta de Café. Elevando a estética do dia a dia. Assista meu último review abaixo! 👇
          </p>
        </header>

        {/* Links Section */}
        <nav className="w-full flex flex-col gap-3">
          {/* Highlight Link */}
          <motion.a 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            href="#" 
            className="w-full flex items-center p-1 rounded-full bg-brand-slate shadow-xl group"
          >
            <div className="w-full bg-brand-lime rounded-full py-4 px-6 flex items-center justify-between border-2 border-brand-slate border-b-[4px] active:border-b-2 active:translate-y-[2px] transition-all">
              <div className="flex items-center gap-3">
                <PlayCircle size={24} className="fill-brand-slate text-brand-lime" />
                <span className="font-display text-sm text-brand-slate uppercase tracking-wider font-bold">ASSISTA MEU ÚLTIMO REVIEW!</span>
              </div>
              <span className="text-brand-slate opacity-75 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </motion.a>

          {/* Secondary Links */}
          <LinkButton icon={<ShoppingBag size={20} />} label="Minha Lista de Equipamentos Essenciais" />
          <LinkButton icon={<MessageSquare size={20} />} label="Entre no Discord de Tech" />
          <LinkButton icon={<Mail size={20} />} label="Contato Comercial" />
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center mt-2 mb-6">
          <SocialIcon icon={<Camera size={24} />} />
          <SocialIcon icon={<Twitter size={24} />} />
          <SocialIcon icon={<Music size={24} />} />
        </div>

      </main>

      {/* Footer - Hides if PRO */}
      {!isPro && (
        <footer className="mt-auto pt-8 pb-6 w-full text-center relative z-10">
          <a href="#" className="inline-flex flex-col items-center gap-1 group">
            <span className="font-display text-xs text-gray-500 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">Desenvolvido por</span>
            <div className="flex items-center gap-1 text-brand-slate font-display text-xl font-black group-hover:text-brand-violet transition-colors">
              <Zap size={20} className="text-brand-lime fill-brand-lime" />
              LinkHub Pro
            </div>
          </a>
        </footer>
      )}
    </div>
  );
}

function LinkButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <motion.a 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      href="#" 
      className="group w-full bg-surface-low border border-brand-lavender rounded-full py-3 px-4 flex items-center justify-between hover:bg-white hover:border-brand-violet shadow-sm hover:shadow-lg transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white border border-brand-lavender flex items-center justify-center text-brand-violet group-hover:bg-brand-lavender/40 transition-colors">
          {icon}
        </div>
        <span className="font-sans text-base font-semibold text-brand-slate">{label}</span>
      </div>
      <span className="text-gray-400 group-hover:text-brand-violet transition-colors mr-2">•••</span>
    </motion.a>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-12 h-12 rounded-full bg-surface-high border-brand-lavender text-brand-violet flex items-center justify-center transition-all hover:bg-brand-violet hover:text-white hover:scale-110 shadow-sm">
      {icon}
    </a>
  );
}
