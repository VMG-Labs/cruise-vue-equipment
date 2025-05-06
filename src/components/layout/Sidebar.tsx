import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { MenuItem } from '../../types';
import ThemeToggle from '../ui/ThemeToggle';

const menuItems: MenuItem[] = [
  { title: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  { title: 'Team', icon: 'Users', path: '/team' },
  { title: 'Analytics', icon: 'BarChart3', path: '/analytics' },
  { title: 'Documents', icon: 'FileText', path: '/documents', badge: 3 },
  { title: 'Settings', icon: 'Settings', path: '/settings' },
  { title: 'Help', icon: 'HelpCircle', path: '/help' },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={20} />;
      case 'Users': return <Users size={20} />;
      case 'BarChart3': return <BarChart3 size={20} />;
      case 'FileText': return <FileText size={20} />;
      case 'Settings': return <Settings size={20} />;
      case 'HelpCircle': return <HelpCircle size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <aside 
      className={`${className} bg-white dark:bg-gray-800 h-screen transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dash<span className="text-blue-500">Board</span></h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => setActiveItem(item.title)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeItem === item.title
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;