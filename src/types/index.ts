// Type definitions for the dashboard interface

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'manager';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  path: string;
  badge?: number;
}