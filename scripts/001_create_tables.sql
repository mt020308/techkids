-- Tabela de acessos ao site
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT
);

-- Tabela de respostas do formulário de pesquisa
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Uso de tecnologia
  hours_using_phone TEXT NOT NULL,
  changed_phone_recently BOOLEAN NOT NULL,
  
  -- Segurança digital
  knows_not_talk_strangers BOOLEAN NOT NULL,
  parents_supervise BOOLEAN NOT NULL,
  knows_about_scams BOOLEAN NOT NULL,
  
  -- Sustentabilidade
  knows_electronic_waste BOOLEAN NOT NULL,
  disposed_incorrectly BOOLEAN NOT NULL,
  knows_disposal_location BOOLEAN NOT NULL,
  
  -- Aprendizado
  learned_something BOOLEAN NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 10)
);

-- Tabela de tarefas/desafios completados
CREATE TABLE IF NOT EXISTS completed_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  challenge_type TEXT NOT NULL,
  session_id TEXT NOT NULL
);

-- Tabela de administradores (vinculada ao auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para site_visits (público pode inserir, admin pode ler)
CREATE POLICY "Anyone can insert visits" ON site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read visits" ON site_visits FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Políticas para survey_responses (público pode inserir, admin pode ler)
CREATE POLICY "Anyone can insert surveys" ON survey_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read surveys" ON survey_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Políticas para completed_challenges (público pode inserir, admin pode ler)
CREATE POLICY "Anyone can insert challenges" ON completed_challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read challenges" ON completed_challenges FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Políticas para admin_users
CREATE POLICY "Admins can read admin_users" ON admin_users FOR SELECT USING (
  id = auth.uid() OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
