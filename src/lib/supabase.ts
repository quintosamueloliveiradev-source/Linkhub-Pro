import { createClient } from '@supabase/supabase-js';

// Usado o fallback com URL vazia/chave vazia para evitar crash caso o usuário
// inicie o projeto sem as configurações (.env) ainda preenchidas.
// Num cenário real de produção, alertar se estiver faltando.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
