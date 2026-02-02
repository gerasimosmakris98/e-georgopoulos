-- Security Fix: Add deny policies to user_roles table to prevent unauthorized role assignment
CREATE POLICY "Deny INSERT on user_roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated 
WITH CHECK (false);

CREATE POLICY "Deny UPDATE on user_roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated 
USING (false);

CREATE POLICY "Deny DELETE on user_roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated 
USING (false);

-- Create contact_messages table for contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Only admins can view contact messages
CREATE POLICY "Admins can manage contact_messages" 
ON public.contact_messages 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Anyone can insert contact messages (for the contact form)
CREATE POLICY "Anyone can insert contact_messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);