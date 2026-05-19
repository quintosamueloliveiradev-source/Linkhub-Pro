import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { RouteState } from '../types';

export function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Adaptado para funcionar com as rotas criadas
  const [currentRoute, setRoute] = useState<RouteState>('links');
  
  if (!user) {
     return null; // O App.tsx lida com o redirect
  }

  const handleSetRoute = (route: RouteState) => {
    setRoute(route);
    navigate(`/dashboard/${route}`);
  };

  return (
    <div className="min-h-screen bg-background text-brand-slate font-sans flex font-sans antialiased overflow-hidden">
      <Sidebar currentRoute={currentRoute} setRoute={handleSetRoute} />
      
      <main className="flex-1 md:ml-64 flex flex-col xl:flex-row h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-surface border-b border-brand-lavender sticky top-0 z-40 shadow-sm">
          <h1 className="font-display text-xl font-black text-brand-violet tracking-tight">LinkVibe</h1>
          <button className="w-10 h-10 rounded-full bg-brand-lime text-brand-slate flex items-center justify-center shadow-sm">
            <Plus size={20} />
          </button>
        </header>

        {/* Scrollable Main Action Area */}
        <section className="flex-1 overflow-y-auto px-4 md:px-10 hide-scrollbar relative pb-24 md:pb-0">
          <Outlet />
        </section>
      </main>

      <BottomNav currentRoute={currentRoute} setRoute={handleSetRoute} />
    </div>
  );
}
