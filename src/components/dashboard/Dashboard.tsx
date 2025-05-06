import React from 'react';
import StatCards from './StatCards';
import ActivityTimeline from './ActivityTimeline';
import QuickActions from './QuickActions';

const Dashboard: React.FC = () => {
  return (
    <div className="py-6 px-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your projects today.</p>
      </div>
      
      <StatCards />
      
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-96 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Overview</h2>
            <div className="flex items-center justify-center h-[calc(100%-2rem)] text-gray-400">
              Chart placeholder - would implement with a charting library
            </div>
          </div>
        </div>
        
        <div>
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;