import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Avatar from '../common/Avatar';
import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/utils/cn';

const LeaderboardCard = ({ users }) => {
  return (
    <Card className="h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
      <CardHeader className="pb-3 border-b border-slate-200 dark:border-gray-800 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
            <Trophy className="h-5 w-5" />
          </div>
          <CardTitle>Top Speakers</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 relative z-10">
        <div className="space-y-4">
          {users.map((user, idx) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  idx === 0 ? "bg-yellow-500 text-yellow-950" :
                  idx === 1 ? "bg-gray-300 text-gray-900" :
                  idx === 2 ? "bg-amber-700 text-amber-100" : "text-slate-400 dark:text-gray-500"
                )}>
                  {idx + 1}
                </div>
                <Avatar src={user.avatar} fallback={user.name[0]} size="sm" />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-gray-200">{user.name}</p>
                  <p className="text-xs text-slate-400 dark:text-gray-500">{user.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-red-400">{user.score}</span>
                <span className="text-xs text-slate-400 dark:text-gray-500">pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
