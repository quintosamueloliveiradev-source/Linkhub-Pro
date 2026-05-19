import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Views
import { AuthView } from './views/AuthView';
import { DashboardLayout } from './views/DashboardLayout';
import { AdminLinks } from './views/AdminLinks';
import { AdminAnalytics } from './views/AdminAnalytics';
import { AdminBilling } from './views/AdminBilling';
import { AdminAppearance } from './views/AdminAppearance';
import { PublicProfile } from './components/PublicProfile';

// Componente simples para lidar com Posição Pública (/:username)
function PublicProfileLoader() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
       <div className="flex-1 overflow-auto">
         <PublicProfile />
       </div>
    </div>
  );
}

// Guarda de Rota
function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen w-screen flex items-center justify-center">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthView />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/links" replace />} />
              <Route path="links" element={<AdminLinks />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="appearance" element={<AdminAppearance />} />
              <Route path="billing" element={<AdminBilling />} />
            </Route>
          </Route>

          {/* Rota dinâmica para exibir os perfis */}
          <Route path="/:username" element={<PublicProfileLoader />} />
          
          {/* Rota Root redireciona pro dashboard ou fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


