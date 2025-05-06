import React, { useState } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Notification } from '../../types';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New team member',
    message: 'Alex Morgan joined the design team',
    time: '2 min ago',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Project update',
    message: 'Dashboard project reached 75% completion',
    time: '1 hour ago',
    read: false,
    type: 'success'
  },
  {
    id: '3',
    title: 'System update',
    message: 'System maintenance scheduled for tonight',
    time: '5 hours ago',
    read: true,
    type: 'warning'
  }
];

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showUserMenu) setShowUserMenu(false);
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">No notifications</div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${getNotificationColor(notification.type)} h-2 w-2 rounded-full mt-2`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full p-2 text-sm text-center text-blue-600 dark:text-blue-400 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              if (showNotifications) setShowNotifications(false);
            }}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-gray-800 dark:text-gray-200 font-medium">John Doe</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
              </div>
              <div>
                <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-red-600 dark:text-red-400 border-t border-gray-200 dark:border-gray-700">
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;