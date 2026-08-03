import React from 'react';
import { Card, CardContent } from '../common/Card';
import { cn } from '@/utils/cn';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => {
  const colorMap = {
    blue: "text-red-500 bg-red-500/10",
    green: "text-green-500 bg-green-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    orange: "text-orange-500 bg-orange-500/10",
  };

  return (
    <Card className="overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500 dark:text-gray-400">{title}</span>
            <span className="text-3xl font-bold text-slate-900 dark:text-gray-100 mt-2">{value}</span>
          </div>
          <div className={cn("p-3 rounded-xl", colorMap[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        
        {(trend || trendValue) && (
          <div className="mt-4 flex items-center text-sm">
            {trend === 'up' && <span className="text-green-400 font-medium mr-2">↑ {trendValue}</span>}
            {trend === 'down' && <span className="text-red-400 font-medium mr-2">↓ {trendValue}</span>}
            <span className="text-slate-400 dark:text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
