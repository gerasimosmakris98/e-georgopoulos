import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay showing the popup for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = async (accepted: boolean) => {
    const consentType = accepted ? 'accepted' : 'rejected';
    localStorage.setItem('cookie_consent', consentType);

    // Generate a simple visitor ID
    const visitorId = localStorage.getItem('visitor_id') || crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);

    // Record consent in database (ignore errors as this is non-critical)
    try {
      await supabase.from('cookie_consents').insert({
        visitor_id: visitorId,
        consent_given: accepted,
        consent_type: consentType
      } as any);
    } catch (error) {
      // Silently fail - this is non-critical
    }

    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] p-4 transition-all duration-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="glass-effect rounded-xl p-4 md:p-6 border border-border/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm md:text-base text-foreground">
                  This site uses cookies to enhance your experience and provide analytics.
                </p>
                <Link
                  to="/cookies"
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConsent(false)}
                className="flex-1 md:flex-none"
              >
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => handleConsent(true)}
                className="flex-1 md:flex-none"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleConsent(false)}
                className="md:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
