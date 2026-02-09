import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const GoogleAnalytics = ({ gaId }: { gaId: string }) => {
    const location = useLocation();

    useEffect(() => {
        if (!gaId) return;

        const initGA = () => {
            // Check for explicit consent
            const consent = localStorage.getItem('cookie_consent');
            if (consent !== 'accepted') return;

            // Initialize GA4 only if not already present
            if (window.gtag) return;

            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', gaId);
        };

        // Initial check
        initGA();

        // Listen for consent updates
        const handleConsentUpdate = (e: any) => {
            if (e.detail?.accepted) {
                initGA();
            }
        };

        window.addEventListener('cookieConsentUpdated', handleConsentUpdate);

        return () => {
            window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
        };
    }, [gaId]);

    // Track page views on route change
    useEffect(() => {
        if (!gaId || !window.gtag) return;

        window.gtag('config', gaId, {
            page_path: location.pathname + location.search,
        });
    }, [location, gaId]);

    return null;
};
