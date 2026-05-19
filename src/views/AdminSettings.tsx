import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Save, User, Shield, Bell } from 'lucide-react';

export function AdminSettings() {
  const { user } = useAuth();
  const [name, setName] = useState('Criador Pro');
  const [username, setUsername] = useState('criador');
  const [bio, setBio] = useState('Fazendo coisas incríveis na internet.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="w-full max-w-[800px] mx-auto py-8 md:py-12 flex flex-col gap-8 pb-32">
      <div>
        <h2 className="font-display text-4xl font-extrabold text-brand-slate tracking-tight mb-2">Configurações</h2>
        <p className="font-sans text-lg text-gray-500">Gerencie sua conta e preferências.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu lateral de configurações */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-violet/10 text-brand-violet font-bold font-display">
            <User size={20} /> Perfil
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-brand-lavender/50 font-display font-medium">
            <Shield size={20} /> Segurança
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-brand-lavender/50 font-display font-medium">
            <Bell size={20} /> Notificações
          </button>
        </div>

        {/* Área Principal de Configurações */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-[24px] border border-brand-lavender shadow-sm">
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <h3 className="font-display text-2xl font-bold text-brand-slate border-b border-brand-lavender pb-4">
              Informações do Perfil
            </h3>

            <div className="flex flex-col gap-2">
              <label className="font-display font-bold text-sm text-brand-slate">Foto de Perfil</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-brand-violet flex items-center justify-center text-white text-2xl font-display font-bold">
                  {name.charAt(0)}
                </div>
                <button type="button" className="px-4 py-2 bg-surface-low text-brand-slate font-medium rounded-full text-sm hover:bg-surface-high transition-colors">
                  Alterar Foto
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-display font-bold text-sm text-brand-slate">Nome de Exibição</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-brand-lavender rounded-xl shadow-sm focus:outline-none focus:border-brand-violet transition-colors"
                placeholder="Seu nome"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-display font-bold text-sm text-brand-slate">Nome de Usuário (URL)</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-brand-lavender bg-surface-low text-gray-500 sm:text-sm">
                  linkvibe.com/
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-4 py-3 border border-brand-lavender rounded-none rounded-r-xl focus:outline-none focus:border-brand-violet transition-colors"
                  placeholder="seu-usuario"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="bio" className="font-display font-bold text-sm text-brand-slate">Biografia</label>
              <textarea
                id="bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border border-brand-lavender rounded-xl shadow-sm focus:outline-none focus:border-brand-violet transition-colors resize-none"
                placeholder="Conte um pouco sobre você"
              />
            </div>

            <div className="pt-4 border-t border-brand-lavender">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-brand-lime text-brand-slate font-display font-bold rounded-full hover:scale-105 transition-transform"
              >
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
