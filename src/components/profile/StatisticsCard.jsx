import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Activity } from 'lucide-react';

const StatisticsCard = ({ stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2 border-b border-slate-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-400" />
          <CardTitle>All-Time Statistics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-gray-100">{stats.totalMeetings}</span>
            <span className="text-xs text-slate-500 dark:text-gray-400 mt-1">Total Meetings</span>
          </div>
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-gray-100">{stats.totalHours}</span>
            <span className="text-xs text-slate-500 dark:text-gray-400 mt-1">Hours Spoken</span>
          </div>
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-gray-100">{stats.vocabLearned}</span>
            <span className="text-xs text-slate-500 dark:text-gray-400 mt-1">Vocab Learned</span>
          </div>
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-gray-100">{stats.avgScore}</span>
            <span className="text-xs text-slate-500 dark:text-gray-400 mt-1">Avg Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
