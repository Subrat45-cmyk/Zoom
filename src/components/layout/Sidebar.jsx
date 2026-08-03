import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Video, FileText, User, Settings, Award } from 'lucide-react';
import { cn } from '@/utils/cn';
import { defaultUserProfileData } from '../../pages/Profile';

const Sidebar = ({ mobileOpen, onClose }) => {
  const [user, setUser] = useState(defaultUserProfileData);

  const loadUser = () => {
    const storedEmail = localStorage.getItem('meeet_user_email');
    const storedName = localStorage.getItem('meeet_user_name');
    
    if (storedEmail || storedName) {
      const emailPart = storedEmail ? storedEmail.split('@')[0] : 'user';
      let displayName = storedName;
      
      if (!displayName && storedEmail) {
        displayName = emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
      } else if (!displayName) {
        displayName = "Guest";
      }
      
      const shortName = displayName.substring(0, 2).toUpperCase();
      const identifier = storedName ? storedName.toLowerCase().replace(/\s+/g, '') : emailPart;
      
      setUser((prevUser) => ({
        ...prevUser,
        name: displayName,
        shortName: shortName,
        email: storedEmail || prevUser.email,
        avatar: `https://i.pravatar.cc/150?u=${identifier}`
      }));
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener('userProfileUpdated', loadUser);
    window.addEventListener('storage', loadUser);
    return () => {
      window.removeEventListener('userProfileUpdated', loadUser);
      window.removeEventListener('storage', loadUser);
    };
  }, []);

  const navItems = [
    { name: 'Join Meeting', icon: Video, path: '/join' },
    { name: 'New Meeting', icon: Video, path: '/create-meeting' },
    { name: 'Transcripts', icon: FileText, path: '/transcript' },
  ];

  return (
    <>
     
      {mobileOpen && (
        <div 
          className={cn('fixed', 'inset-0', 'z-40', 'bg-slate-50', 'dark:bg-gray-950/80', 'backdrop-blur-sm', 'md:hidden')} 
          onClick={onClose}
        />
      )}

      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform duration-300 md:static md:flex md:translate-x-0",
        mobileOpen ? "translate-x-0 flex" : "-translate-x-full hidden md:flex"
      )}>
        <div className={cn('flex', 'h-16', 'items-center', 'px-6', 'border-b', 'border-slate-200', 'dark:border-gray-800')}>
          <Link to="/" onClick={onClose} className={cn('flex', 'items-center', 'gap-2', 'text-xl', 'font-bold', 'text-slate-900', 'dark:text-gray-100', 'tracking-tight', 'hover:opacity-80', 'transition-opacity')}>
            <div className={cn('flex', 'h-8', 'w-8', 'items-center', 'justify-center', 'rounded-lg', 'bg-red-500', 'text-white')}>
              <Video className={cn('h-5', 'w-5')} />
            </div>
           <span className={cn('text-transparent', 'bg-clip-text', 'bg-linear-to-r', 'from-red-600', 'to-red-600')}>Meeet</span>
         </Link>
        </div>
        <nav className={cn('flex-1', 'space-y-1', 'overflow-y-auto', 'p-4')}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-red-600/10 text-red-500" 
                    : "text-black dark:text-gray-400 hover:bg-slate-100 dark:bg-gray-800 hover:text-slate-900 dark:text-gray-100"
                )
              }
            >
              <item.icon className={cn('h-5', 'w-5')} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className={cn('p-4', 'border-t', 'border-slate-200', 'dark:border-gray-800')}>
          <Link to="/profile" onClick={onClose} className={cn('flex', 'items-center', 'gap-3', 'rounded-lg', 'bg-slate-100', 'dark:bg-gray-800', 'p-3', 'hover:bg-slate-200', 'dark:hover:bg-gray-700', 'transition-colors', 'cursor-pointer')}>
            <div className={cn('h-8', 'w-8', 'rounded-full', 'bg-red-600', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-white', 'overflow-hidden')}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className={cn('h-full', 'w-full', 'object-cover')} />
              ) : (
                user.shortName
              )}
            </div>
            <div className={cn('flex', 'flex-col')}>
              <span className={cn('text-sm', 'font-medium', 'text-slate-900', 'dark:text-gray-100')}>{user.name}</span>
            </div>
          </Link>
        </div>  
      </aside>
    </>
  );
};

export default Sidebar;
