-- Fichier de migration initial
-- Vous pouvez y mettre votre schéma de base de données initial.

-- Exemple : Création d'une table "profiles"
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Les utilisateurs peuvent voir tous les profils." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Les utilisateurs peuvent insérer leur propre profil." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil." ON public.profiles FOR UPDATE USING (auth.uid() = id);
