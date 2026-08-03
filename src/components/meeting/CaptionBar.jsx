import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/utils/cn';

const CaptionBar = ({ caption, isVisible }) => {
  if (!isVisible || !caption) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 max-w-3xl w-full px-4 pointer-events-none">
      <div className="bg-slate-50 dark:bg-gray-950/70 backdrop-blur-md rounded-xl p-4 text-center border border-slate-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Bot className="h-4 w-4 text-red-400" />
          <span className="text-xs font-semibold text-red-400">AI Live Captions</span>
        </div>
        <p className="text-lg font-medium text-slate-900 dark:text-gray-100">{caption}</p>
      </div>
    </div>
  );
};

export default CaptionBar;
