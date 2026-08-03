import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PageLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 relative">

          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 hidden rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 hidden rounded-full pointer-events-none" />

          <div className="relative z-10 h-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
