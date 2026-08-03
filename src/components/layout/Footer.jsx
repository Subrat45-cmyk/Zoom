import React from 'react';
import { Video, MessageCircle, Globe, Mail } from 'lucide-react';
import { cn } from "../../utils/cn";

const Footer = () => {
  return (
    <footer className={cn('border-t', 'border-slate-200', 'dark:border-gray-800', 'bg-slate-50', 'dark:bg-gray-950', 'py-6')}>
      <div className={cn('mx-auto', 'max-w-7xl', 'px-6', 'md:flex', 'md:items-center', 'md:justify-center', 'lg:px-8')}>
        
        <div className={cn('mt-8', 'md:order-1', 'md:mt-0', 'flex', 'items-center', 'justify-center', 'md:justify-start', 'gap-2')}>
          <Video className={cn('h-5', 'w-5', 'text-red-500')} />
          <p className={cn('text-center', 'text-xs', 'leading-5', 'text-slate-500', 'dark:text-gray-400')}>
            &copy; 2026 Meeet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
