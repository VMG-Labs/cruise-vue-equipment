import React from 'react';
import { 
  UserPlus, 
  FileText, 
  MessageSquare, 
  ShoppingCart, 
  Star,
  Clock
} from 'lucide-react';
import { ActivityItem } from '../../types';

// Mock data for activity timeline
const activities: ActivityItem[] = [
  {
    id: '1',
    user: 'Alex Morgan',
    action: 'joined the team',
    target: 'Design Team',
    time: '2 hours ago',
    icon: 'UserPlus'
  },
  {
    id: '2',
    user: 'Sarah Chen',
    action: 'uploaded a new',
    target: 'project report',
    time: '5 hours ago',
    icon: 'FileText'
  },
  {
    id: '3',
    user: 'David Wilson',
    action: 'commented on',
    target: 'Dashboard Design',
    time: 'Yesterday at 2:35 PM',
    icon: 'MessageSquare'
  },
  {
    id: '4',
    user: 'Emma Johnson',
    action: 'completed a',
    target: 'new order #5743',
    time: 'Yesterday at 10:22 AM',
    icon: 'ShoppingCart'
  },
  {
    id: '5',
    user: 'Michael Brown',
    action: 'marked project',
    target: 'Analytics Dashboard',
    time: '2 days ago',
    icon: 'Star'
  }
];

const ActivityTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconProps = { size: 16, className: "text-white" };
    
    switch (iconName) {
      case 'UserPlus': return <UserPlus {...iconProps} />;
      case 'FileText': return <FileText {...iconProps} />;
      case 'MessageSquare': return <MessageSquare {...iconProps} />;
      case 'ShoppingCart': return <ShoppingCart {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      default: return <Clock {...iconProps} />;
    }
  };
  
  const getIconBackground = (iconName: string) => {
    switch (iconName) {
      case 'UserPlus': return 'bg-blue-500';
      case 'FileText': return 'bg-purple-500';
      case 'MessageSquare': return 'bg-green-500';
      case 'ShoppingCart': return 'bg-amber-500';
      case 'Star': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className={`${getIconBackground(activity.icon)} p-2 rounded-full flex-shrink-0 mt-0.5`}>
              {getIcon(activity.icon)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{activity.user}</span>
                <span className="ml-1">{activity.action}</span>
                <span className="ml-1 font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <Clock size={12} />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;