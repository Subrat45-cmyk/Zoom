import React from 'react';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '../common/Button';

const Topbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 px-4 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-gray-400" />
          <input 
            type="text" 
            placeholder="Search meetings..." 
            className="h-9 w-full rounded-md border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm text-slate-700 dark:text-gray-300 placeholder:text-slate-400 dark:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-500 dark:text-gray-400">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative text-slate-500 dark:text-gray-400">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-gray-900" />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
