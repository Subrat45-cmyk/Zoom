import React from 'react';
import Button from '../common/Button';
import { Video, VideoOff } from 'lucide-react';
import { cn } from '@/utils/cn';

const CameraButton = ({ isVideoOff, onClick, className }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full h-12 w-12",
        isVideoOff ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-400" : "bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200 hover:bg-gray-700 hover:text-slate-900 dark:text-gray-100",
        className
      )}
    >
      {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
    </Button>
  );
};

export default CameraButton;
