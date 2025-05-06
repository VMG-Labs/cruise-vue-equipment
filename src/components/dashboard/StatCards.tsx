import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { StatCard } from '../../types';

// Mock data for statistics cards
const stats: StatCard[] = [
  {
    id: '1',
    title: 'Total Users',
    value: '24,521',
    change: 12.5,
    icon: 'Users',
    trend: 'up'
  },
  {
    id: '2',
    title: 'Revenue',
    value: '$45,920',
    change: 8.3,
    icon: 'DollarSign',
    trend: 'up'
  },
  {
    id: '3',
    title: 'Orders',
    value: '1,753',
    change: -3.6,
    icon: 'ShoppingCart',
    trend: 'down'
  },
  {
    id: '4',
    title: 'Activity',
    value: '82%',
    change: 4.2,
    icon: 'Activity',
    trend: 'up'
  }
];

interface StatCardProps {
  stat: StatCard;
}

const StatCardComponent: React.FC<StatCardProps> = ({ stat }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users size={24} className="text-blue-500" />;
      case 'DollarSign': return <DollarSign size={24} className="text-green-500" />;
      case 'ShoppingCart': return <ShoppingCart size={24} className="text-purple-500" />;
      case 'Activity': return <Activity size={24} className="text-amber-500" />;
      default: return <Activity size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
          {getIcon(stat.icon)}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        {stat.trend === 'up' ? (
          <TrendingUp size={20} className="mr-1 text-green-500" />
        ) : (
          <TrendingDown size={20} className="mr-1 text-red-500" />
        )}
        
        <span className={`text-sm font-medium ${
          stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {stat.change > 0 ? '+' : ''}{stat.change}%
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1.5">from last month</span>
      </div>
    </div>
  );
};

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <StatCardComponent key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default StatCards;