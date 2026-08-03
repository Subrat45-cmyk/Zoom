import React from 'react';
import { cn } from '@/utils/cn';

const Avatar = React.forwardRef(({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-gray-800",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium text-slate-700 dark:text-gray-300">
          {fallback || "?"}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
