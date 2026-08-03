import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Play, Calendar, Clock } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const RecentMeetingCard = ({ title, date, duration, participants, thumbnailUrl }) => {
  return (
    <Card className="overflow-hidden group hover:border-red-500/50 transition-colors">
      <div className="relative h-32 w-full bg-slate-100 dark:bg-gray-800 overflow-hidden">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900/40 to-purple-900/40" />
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 dark:bg-gray-950/40">
          <Button variant="primary" size="icon" className="rounded-full shadow-xl">
            <Play className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4 pt-4">
        <h4 className="font-semibold text-slate-900 dark:text-gray-100 line-clamp-1">{title}</h4>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {participants.slice(0, 3).map((p, i) => (
              <Avatar key={i} src={p.avatar} fallback={p.name[0]} size="sm" className="border-2 border-gray-900" />
            ))}
            {participants.length > 3 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-slate-100 dark:bg-gray-800 text-xs font-medium text-slate-900 dark:text-gray-100">
                +{participants.length - 3}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-8 text-red-400 hover:text-red-300">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMeetingCard;
