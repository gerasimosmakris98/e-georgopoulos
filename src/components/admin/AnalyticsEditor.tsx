import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '@/hooks/useAnalytics';
import { BarChart3, Eye, Users, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalyticsEditor: React.FC = () => {
  const { analytics, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
        <Button variant="outline" size="sm" onClick={fetchAnalytics}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">{analytics.uniqueViews}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Pages</p>
                <p className="text-2xl font-bold">{analytics.topPages.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Top Pages</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Most visited pages on your portfolio
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topPages.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No page views recorded yet</p>
            ) : (
              analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="font-medium">{page.path === '/' ? 'Home' : page.path}</span>
                  </div>
                  <Badge variant="secondary">
                    {page.views} view{page.views !== 1 ? 's' : ''}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Views */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Views</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Latest page visits to your portfolio
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentViews.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No recent views recorded yet</p>
            ) : (
              analytics.recentViews.map((view, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-medium">{view.path === '/' ? 'Home' : view.path}</span>
                    <p className="text-xs text-muted-foreground">
                      {new Date(view.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Recent
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsEditor;