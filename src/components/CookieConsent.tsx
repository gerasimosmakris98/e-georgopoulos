import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

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

  const handleConsent = (accepted: boolean) => {
    const consentType = accepted ? 'accepted' : 'rejected';
    localStorage.setItem('cookie_consent', consentType);

    // Synchronize with GA4 and other non-essential scripts
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: { accepted } }));

    // Update UI immediately (Optimistic)
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{ zIndex: 99999 }}
      className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-300 pointer-events-auto ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      role="region"
      aria-label="Cookie Consent Banner"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card-elevated rounded-2xl p-5 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm md:text-base text-foreground font-medium">
                  We value your privacy
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  We use cookies to enhance your experience and analyze our traffic.
                  <Link
                    to="/legal/cookies"
                    className="text-primary hover:underline ml-1"
                    aria-label="Read Cookie Policy"
                  >
                    Read Policy
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConsent(false)}
                className="w-full sm:w-auto whitespace-nowrap"
                aria-label="Reject non-essential cookies"
              >
                Reject Non-Essential
              </Button>
              <Button
                size="sm"
                onClick={() => handleConsent(true)}
                className="w-full sm:w-auto whitespace-nowrap"
                aria-label="Accept all cookies"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleConsent(false)}
                className="md:hidden absolute top-2 right-2"
                aria-label="Close cookie banner"
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
