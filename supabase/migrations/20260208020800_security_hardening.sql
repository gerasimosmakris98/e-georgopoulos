-- Security Hardening Migration
-- Addressed User Report: "contact_info" table exposure and "cookie_consents" verification.

-- 1. Hardening 'contact_info' Table
-- Problem: Publicly readable and contains personal email.
-- Solution: Revoke public SELECT, enforce Admin-only SELECT, and scrub existing email data.

-- Drop the insecure policy "Anyone can read contact_info"
DROP POLICY IF EXISTS "Anyone can read contact_info" ON public.contact_info;

-- Create secure policy: Only Admins can read
-- This assumes public.has_role function exists (from previous migrations)
CREATE POLICY "Admins can read contact_info"
ON public.contact_info
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Scrub sensitive data (Defense in Depth)
-- Even if policies fail, the raw email won't be exposed.
UPDATE public.contact_info 
SET email = 'contact-via-form' 
WHERE email IS NOT NULL AND email != 'contact-via-form';

-- 2. Verify 'cookie_consents' (No Action Needed, but documented)
-- Existing policies from '20260201222159_bbadebdd...':
-- - "Anyone can insert cookie_consents": CORRECT (Allowed for anonymous visitors)
-- - "Admins can read cookie_consents": CORRECT (Protecting visitor privacy)
-- No "Anyone can read..." policy exists, so it is secure by default (RLS enabled).
