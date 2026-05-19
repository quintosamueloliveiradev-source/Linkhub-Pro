export type RouteState = 'links' | 'analytics' | 'profile' | 'appearance' | 'settings' | 'billing';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  active: boolean;
}

export interface AnalyticsData {
  totalClicks: string;
  clicksGrowth: string;
  ctr: string;
  ctrGrowth: string;
  visitors: string;
  visitorsGrowth: string;
}
