import { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Link2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { LinkItem } from '../types';
import { PhoneMockup } from '../components/PhoneMockup';
import { ProBadge } from '../components/ProUpsell';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const INITIAL_LINKS: LinkItem[] = [
  { id: '1', title: 'Último vídeo no YouTube', url: 'https://youtube.com/watch?v=123', active: true },
  { id: '2', title: 'Meu Portfólio', url: 'https://myportfolio.com', active: true },
];

export function AdminLinks() {
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const { user } = useAuth();
  const isPro = user?.user_metadata?.plan === 'PRO';
  const navigate = useNavigate();

  const handleProFeature = () => {
    if (!isPro) {
      navigate('/dashboard/billing');
    }
  };

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'Novo Link',
      url: 'https://',
      active: true,
    };
    setLinks([newLink, ...links]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleToggleLinkActive = (id: string) => {
    setLinks(links.map((link) => link.id === id ? { ...link, active: !link.active } : link));
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 w-full max-w-[800px] mx-auto py-8 md:py-12 flex flex-col gap-8 pr-0 xl:pr-10 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-brand-slate tracking-tight">Seus Links</h2>
            <p className="font-sans text-lg text-gray-500 mt-2">Gerencie, reordene e personalize os links da sua bio.</p>
          </div>
          <button 
            onClick={handleAddLink}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-brand-lime text-brand-slate font-display font-bold hover:bg-[#c4db1c] transition-transform active:scale-95 border-2 border-brand-slate shadow-sm"
          >
            <Plus size={20} />
            Adicionar Novo Link
          </button>
        </div>

        {/* Mobile Add Button */}
        <button 
          onClick={handleAddLink}
          className="md:hidden w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-lime text-brand-slate font-display font-bold hover:bg-[#c4db1c] active:scale-95 border-2 border-brand-slate shadow-sm"
        >
           <Plus size={20} />
           Adicionar Novo Link
        </button>

        {/* Pro Banner Warning for Free Users */}
        {!isPro && (
          <div className="bg-gradient-to-r from-brand-violet to-[#3d16c7] p-5 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between shadow-lg gap-4">
            <div>
              <h4 className="font-display font-bold text-lg flex items-center gap-2 mb-1">Aumente sua conversão em 3x 🚀</h4>
              <p className="text-brand-lavender text-sm max-w-sm">Assinantes PRO podem usar links animados, capas customizadas e banners de vídeo.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/billing')}
              className="w-full md:w-auto px-5 py-2 bg-brand-lime text-brand-slate font-bold font-display rounded-full hover:scale-105 transition-transform"
            >
              Ver Planos
            </button>
          </div>
        )}

        {/* Link List */}
        <div className="flex flex-col gap-4 pb-20 md:pb-0">
          {links.map((link) => (
            <motion.article 
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-brand-lavender rounded-2xl p-4 md:p-6 flex flex-col relative hover:border-brand-violet transition-colors group shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex items-center gap-3 w-full md:w-auto flex-grow">
                  <div className="cursor-grab text-gray-400 hover:text-brand-violet hidden md:block">
                    <GripVertical size={24} />
                  </div>
                  <div className="flex-grow w-full">
                    <input 
                      type="text" 
                      value={link.title}
                      onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, title: e.target.value } : l))}
                      className="font-display text-base font-bold text-brand-slate bg-transparent border-none p-0 focus:ring-0 w-full placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-brand-violet transition-all"
                    />
                    <input 
                      type="text" 
                      value={link.url}
                      onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, url: e.target.value } : l))}
                      className="font-sans text-sm text-gray-500 bg-transparent border-none p-0 mt-1 focus:ring-0 w-full focus:outline-none focus:border-b-2 focus:border-brand-violet transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-brand-lavender pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-brand-lavender/50 text-gray-500 hover:text-brand-violet transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 rounded-full hover:bg-error-container text-gray-500 hover:text-error transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Toggle switch visual */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={link.active} 
                      onChange={() => handleToggleLinkActive(link.id)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-violet"></div>
                  </label>
                </div>
              </div>

              {/* Advanced PRO Settings Row */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 overflow-x-auto hide-scrollbar">
                <button 
                  onClick={handleProFeature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium text-gray-500 hover:text-brand-violet hover:bg-brand-lavender/30 transition-colors whitespace-nowrap"
                >
                  <ImageIcon size={14} /> Adicionar Ícone/Thumbnail {!isPro && <ProBadge />}
                </button>
                <button 
                  onClick={handleProFeature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium text-gray-500 hover:text-brand-violet hover:bg-brand-lavender/30 transition-colors whitespace-nowrap"
                >
                  <Sparkles size={14} /> Animar Botão {!isPro && <ProBadge />}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      
      {/* Phone Mockup at the side for AdminLinks view */}
      <div className="hidden xl:block">
        <PhoneMockup links={links} />
      </div>
    </div>
  );
}
