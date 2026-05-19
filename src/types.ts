export type RouteState = 'links' | 'analytics' | 'profile';

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
