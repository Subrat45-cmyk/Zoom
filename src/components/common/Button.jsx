import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, leftIcon, rightIcon, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 active:from-red-600 active:to-red-700 shadow-md',
      secondary: 'bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 hover:bg-slate-200 active:bg-slate-300',
      outline: 'border border-gray-600 text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:bg-gray-800',
      ghost: 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:bg-gray-800 hover:text-slate-900 dark:text-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10 flex items-center justify-center p-2',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className={cn('mr-2', 'h-4', 'w-4', 'animate-spin')} />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
