import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const Loader = ({ className, size = 'md', ...props }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <Loader2
      className={cn("animate-spin text-red-500", sizes[size], className)}
      {...props}
    />
  );
};

export const FullPageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-gray-950/90 backdrop-blur-sm">
    <Loader size="xl" />
  </div>
);

export default Loader;
