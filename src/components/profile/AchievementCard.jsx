import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Award, Star } from 'lucide-react';
import { cn } from '@/utils/cn';

const AchievementCard = ({ title, date, icon, isLocked }) => {
  return (
    <Card className={cn("overflow-hidden transition-all", isLocked ? "opacity-50 grayscale" : "hover:border-red-500/50")}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center",
          isLocked ? "bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-500" : "bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900 dark:text-gray-100 shadow-lg shadow-orange-500/20"
        )}>
          {icon || <Award className="h-6 w-6" />}
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-gray-100">{title}</h4>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{isLocked ? "Locked" : `Earned on ${date}`}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
