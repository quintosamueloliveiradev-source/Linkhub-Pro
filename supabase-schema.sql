-- ESTRUTURA DO SUPABASE PARA LINKVIBE (Copie e cole no SQL Editor do Supabase)

-- 1. Tabela: users (Supabase Auth lida com auth.users, aqui fazemos um profile extendido)
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  full_name text,
  bio text,
  avatar_url text,
  plan text default 'FREE' check (plan in ('FREE', 'PRO')),
  theme_id text default 'light',
  created_at timestamp with time zone default now()
);

-- 2. Tabela: links
CREATE TABLE public.links (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  icon text,
  is_active boolean default true,
  is_animated boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

-- 3. Tabela: clicks (Analytics Refinado)
CREATE TABLE public.clicks (
  id uuid default gen_random_uuid() primary key,
  link_id uuid references public.links(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  visitor_ip text,
  visitor_country text,
  visitor_device text,
  referrer text,
  created_at timestamp with time zone default now()
);

-- 4. Tabela: domains (Domínios personalizados PRO)
CREATE TABLE public.domains (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  domain_name text unique not null,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);

-- 5. Tabela: subscriptions (Controle Financeiro)
CREATE TABLE public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text default 'active',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Profiles: Qualquer um pode ler, dono pode editar
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Links: Qualquer um pode ler, dono pode editar
CREATE POLICY "Public links are viewable by everyone." ON links FOR SELECT USING (true);
CREATE POLICY "Users can CRUD their own links." ON links FOR ALL USING (auth.uid() = profile_id);

-- Clicks: Qualquer um pode inserir (ao clicar), apenas dono do link pode ler (Analytics)
CREATE POLICY "Anyone can insert a click" ON clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Creators can view their own clicks" ON clicks FOR SELECT USING (auth.uid() = profile_id);

-- Domains / Subscriptions: Controle do próprio criador
CREATE POLICY "Users view own domain" ON domains FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users CRUD own domain" ON domains FOR ALL USING (auth.uid() = profile_id);
CREATE POLICY "Users view own sub" ON subscriptions FOR SELECT USING (auth.uid() = profile_id);
