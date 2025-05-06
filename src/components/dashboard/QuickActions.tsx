import React from 'react';
import { 
  FilePlus, 
  UserPlus, 
  MessageSquare, 
  BarChart, 
  Settings
} from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, color }) => {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  );
};

const QuickActions: React.FC = () => {
  const actions = [
    { 
      icon: <FilePlus size={20} />, 
      label: 'New Document', 
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      icon: <UserPlus size={20} />, 
      label: 'Add User', 
      color: 'bg-green-500 hover:bg-green-600' 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Messages', 
      color: 'bg-purple-500 hover:bg-purple-600' 
    },
    { 
      icon: <BarChart size={20} />, 
      label: 'Analytics', 
      color: 'bg-amber-500 hover:bg-amber-600' 
    },
    { 
      icon: <Settings size={20} />, 
      label: 'Settings', 
      color: 'bg-gray-500 hover:bg-gray-600' 
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {actions.map((action, index) => (
            <QuickAction 
              key={index}
              icon={action.icon}
              label={action.label}
              color={action.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;