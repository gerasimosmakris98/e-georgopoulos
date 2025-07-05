import { useEffect, useState } from 'react';

interface PageView {
  path: string;
  timestamp: number;
  userAgent: string;
}

interface AnalyticsData {
  totalViews: number;
  uniqueViews: number;
  topPages: { path: string; views: number }[];
  recentViews: PageView[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueViews: 0,
    topPages: [],
    recentViews: []
  });

  const trackPageView = (path: string) => {
    const view: PageView = {
      path,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    // Get existing data
    const existingData = localStorage.getItem('portfolio_analytics');
    const data = existingData ? JSON.parse(existingData) : { views: [], visitors: [] };
    
    // Add new view
    data.views.push(view);
    
    // Add visitor if not already tracked
    if (!data.visitors.includes(navigator.userAgent)) {
      data.visitors.push(navigator.userAgent);
    }
    
    // Keep only last 1000 views
    if (data.views.length > 1000) {
      data.views = data.views.slice(-1000);
    }
    
    // Save back
    localStorage.setItem('portfolio_analytics', JSON.stringify({
      views: data.views,
      visitors: data.visitors
    }));
    
    // Update state
    updateAnalytics(data);
  };

  const updateAnalytics = (data: any) => {
    const pathCounts: Record<string, number> = {};
    data.views.forEach((view: PageView) => {
      pathCounts[view.path] = (pathCounts[view.path] || 0) + 1;
    });

    const topPages = Object.entries(pathCounts)
      .map(([path, views]) => ({ path, views: views as number }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    setAnalytics({
      totalViews: data.views.length,
      uniqueViews: data.visitors.length,
      topPages,
      recentViews: data.views.slice(-10).reverse()
    });
  };

  useEffect(() => {
    // Load existing analytics on mount
    const existingData = localStorage.getItem('portfolio_analytics');
    if (existingData) {
      const data = JSON.parse(existingData);
      updateAnalytics(data);
    }
    
    // Track current page view
    trackPageView(window.location.pathname);
  }, []);

  return { analytics, trackPageView };
};
