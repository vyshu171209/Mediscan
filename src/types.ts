export type NavTab = 'dashboard' | 'usage' | 'automations' | 'settings';

export interface Appliance {
  id: string;
  name: string;
  icon: string;
  category: 'energy' | 'water';
  currentDraw: number; // in kW or L/m
  unit: string;
  percentage: number;
  isActive: boolean;
  colorType: 'primary' | 'secondary';
  details?: string;
}

export interface DayUsage {
  day: string;
  fullDay: string;
  energyPercent: number;
  waterPercent: number;
  energyKwh: number;
  waterLiters: number;
  cost: number;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  category: 'energy' | 'water' | 'ev';
  icon: string;
  isActive: boolean;
  statBadge: string;
  subText: string;
  devicesInfluenced?: number;
  nextCycle?: string;
  highlightColor: 'primary' | 'secondary' | 'inverse';
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  type: 'info' | 'success' | 'alert';
  isRead: boolean;
  actionText?: string;
}
