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

        // Initialize GA4
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

        return () => {
            // Cleanup if needed, though usually GA scripts persist
            document.head.removeChild(script);
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
