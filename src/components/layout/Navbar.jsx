import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Sun, Moon } from 'lucide-react';
import Button from '../common/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from "../../utils/cn";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={cn('sticky', 'top-0', 'z-50', 'flex', 'h-20', 'items-center', 'justify-between', 'border-b', 'border-slate-200', 'dark:border-gray-800', 'bg-slate-50', 'dark:bg-gray-950/50', 'px-6', 'backdrop-blur-xl')}>
      <Link to="/" className={cn('flex', 'items-center', 'gap-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-slate-900', 'dark:text-gray-100')}>
        <div className={cn('flex', 'h-10', 'w-10', 'items-center', 'justify-center', 'rounded-xl', 'bg-red-500', 'text-white', 'shadow-lg', 'shadow-red-600/20')}>
          <Video className={cn('h-6', 'w-6')} />
        </div>
       <span className={cn('text-transparent', 'bg-clip-text', 'bg-linear-to-r', 'from-red-600', 'to-red-600')}>Meeet</span>
      </Link>
    

      <div className={cn('flex', 'items-center', 'gap-4')}>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={cn('rounded-full', 'text-slate-600', 'dark:text-gray-300', 'hover:bg-slate-100', 'dark:hover:bg-gray-800')}>
          {theme === 'dark' ? <Sun className={cn('h-5', 'w-5')} /> : <Moon className={cn('h-5', 'w-5')} />}
        </Button>
        <Link to="/login" className={cn('hidden', 'text-sm', 'font-medium', 'text-slate-700', 'dark:text-gray-300', 'transition-colors', 'hover:text-slate-900', 'dark:text-gray-100', 'md:block')}>
          Log in
        </Link>
        <Link to="/dashboard">
          <Button variant="primary" className={cn('rounded-full', 'px-6')}>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
