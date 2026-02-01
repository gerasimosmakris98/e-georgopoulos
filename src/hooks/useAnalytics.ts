import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalViews: number;
  uniqueViews: number;
  topPages: { path: string; views: number }[];
  recentViews: { path: string; created_at: string; user_agent: string | null }[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueViews: 0,
    topPages: [],
    recentViews: []
  });
  
  const trackedPaths = useRef<Set<string>>(new Set());

  const trackPageView = useCallback(async (path: string) => {
    // Prevent duplicate tracking for same path in same session
    const sessionKey = `${path}-${Date.now().toString().slice(0, -4)}`;
    if (trackedPaths.current.has(sessionKey)) {
      return;
    }
    trackedPaths.current.add(sessionKey);

    // Check cookie consent
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'rejected') {
      return;
    }

    try {
      await supabase.from('analytics').insert({
        path,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        ip_hash: null
      } as any);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      // Get total views
      const { count: totalViews } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true });

      // Get unique visitors (by user agent - simplified)
      const { data: allViews } = await supabase
        .from('analytics')
        .select('user_agent');
      
      const uniqueAgents = new Set(allViews?.map(v => v.user_agent).filter(Boolean));
      const uniqueViews = uniqueAgents.size;

      // Get top pages
      const { data: pageData } = await supabase
        .from('analytics')
        .select('path');
      
      const pathCounts: Record<string, number> = {};
      pageData?.forEach((view) => {
        pathCounts[view.path] = (pathCounts[view.path] || 0) + 1;
      });

      const topPages = Object.entries(pathCounts)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Get recent views
      const { data: recentData } = await supabase
        .from('analytics')
        .select('path, created_at, user_agent')
        .order('created_at', { ascending: false })
        .limit(10);

      setAnalytics({
        totalViews: totalViews || 0,
        uniqueViews,
        topPages,
        recentViews: recentData || []
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  }, []);

  return { analytics, trackPageView, fetchAnalytics };
};
