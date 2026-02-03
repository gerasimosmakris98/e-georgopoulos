-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Technical',
  proficiency INTEGER DEFAULT 80,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create languages table
CREATE TABLE public.languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  proficiency TEXT NOT NULL DEFAULT 'Intermediate',
  level INTEGER DEFAULT 3,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_content table
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  summary TEXT,
  paragraphs TEXT[] DEFAULT '{}',
  highlights JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  tech_stack TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Skills RLS policies
CREATE POLICY "Anyone can read visible skills"
ON public.skills FOR SELECT
USING (visible = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage skills"
ON public.skills FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Languages RLS policies
CREATE POLICY "Anyone can read visible languages"
ON public.languages FOR SELECT
USING (visible = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage languages"
ON public.languages FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Services RLS policies
CREATE POLICY "Anyone can read visible services"
ON public.services FOR SELECT
USING (visible = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- About content RLS policies
CREATE POLICY "Anyone can read about_content"
ON public.about_content FOR SELECT
USING (true);

CREATE POLICY "Admins can manage about_content"
ON public.about_content FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));