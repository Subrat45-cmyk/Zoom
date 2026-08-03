import React from 'react';
import { cn } from '@/utils/cn';
import { FileQuestion } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = FileQuestion, 
  title = "No results found", 
  description = "Try adjusting your search or filters.",
  action,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800/50 mb-4">
        <Icon className="h-10 w-10 text-slate-500 dark:text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-gray-400 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
