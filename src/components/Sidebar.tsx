import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  User, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  LogOut,
  Plus,
  Calculator,
  X
} from 'lucide-react';
import bitcoinlogo from '../../public/bitcoin-01.png'

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['events', 'users']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleItemClick = (itemId: string, hasChildren: boolean = false) => {
    if (hasChildren) {
      toggleMenu(itemId);
    } else {
      onViewChange(itemId);
      if (onClose) onClose();
    }
  };

  const menuItems = [
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      expandable: true,
      children: [
        { id: 'new-requests', title: 'New Requests', icon: Plus },
        { id: 'estimate', title: 'Estimate', icon: Calculator, hasNotification: true },
        { id: 'events', title: 'Events' },
        { id: 'partial-requests', title: 'Partial Requests' }
      ]
    },
    {
      id: 'positions',
      title: 'Positions',
      icon: MapPin,
      expandable: false
    },
    {
      id: 'contractors',
      title: 'Contractors',
      icon: Users,
      expandable: false
    },
    {
      id: 'users',
      title: 'Users',
      icon: User,
      expandable: true,
      children: [
        { id: 'admins', title: 'Admins' },
        { id: 'clients', title: 'Clients' },
        { id: 'coordinators', title: 'Coordinators' }
      ]
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: FileText,
      expandable: false
    }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-2xl m-4 lg:m-0 flex flex-col overflow-hidden">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10  from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            {/* <Calendar className="w-6 h-6 text-white" /> */}
            <img src={bitcoinlogo}/>
          </div>
        </div>
        
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.id, item.expandable)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.expandable && (
                  expandedMenus.includes(item.id) ? 
                    <ChevronDown className="w-4 h-4 flex-shrink-0" /> : 
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>

              {/* Submenu */}
              {item.expandable && expandedMenus.includes(item.id) && item.children && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleItemClick(child.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        activeView === child.id
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {child.icon && <child.icon className="w-4 h-4 flex-shrink-0" />}
                      <span className="flex-1 text-left">{child.title}</span>
                      {child.hasNotification && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout - Fixed at bottom */}
      <div className="p-4 border-t border-pink-500/20 flex-shrink-0">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;