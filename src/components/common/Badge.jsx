import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: 'bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100',
    primary: 'bg-red-600 text-white',
    success: 'bg-green-600/20 text-green-400 border border-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-600/30',
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
