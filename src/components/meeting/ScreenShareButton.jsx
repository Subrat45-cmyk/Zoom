import React from 'react';
import Button from '../common/Button';
import { MonitorUp, MonitorX } from 'lucide-react';
import { cn } from '@/utils/cn';

const ScreenShareButton = ({ isSharing, onClick, className }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full h-12 w-12",
        isSharing ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200 hover:bg-gray-700 hover:text-slate-900 dark:text-gray-100",
        className
      )}
    >
      {isSharing ? <MonitorX className="h-5 w-5" /> : <MonitorUp className="h-5 w-5" />}
    </Button>
  );
};

export default ScreenShareButton;
