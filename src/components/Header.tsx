import React from 'react';
import { Search, Bell, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="flex items-center justify-between mb-4 lg:mb-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <h1 className="text-xl lg:text-2xl font-semibold text-white">Event Requests</h1>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search - Hidden on small screens, shown on medium+ */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 bg-gray-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 w-48 lg:w-72"
          />
        </div>

        {/* Mobile Search Button */}
        <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Add Button */}
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 lg:px-4 lg:py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden lg:inline">Add</span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-300 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-xs lg:text-sm hidden sm:block">
            <div className="text-cyan-300">Hi, Muhammad Asad</div>
            <div className="text-gray-400">welcome back!</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;