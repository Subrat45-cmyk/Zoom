import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgressChart = ({ data }) => {
  // Mock data structure: { day: 'Mon', value: 45, max: 100 }
  const maxValue = Math.max(...data.map(d => d.value), 100);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 border-b border-slate-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <CardTitle>Speaking Activity</CardTitle>
          </div>
          <span className="text-xs text-slate-400 dark:text-gray-500">This Week</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex h-48 items-end justify-between gap-2">
          {data.map((item, idx) => {
            const height = `${(item.value / maxValue) * 100}%`;
            return (
              <div key={idx} className="flex flex-col items-center gap-2 w-full group">
                <div className="relative w-full rounded-t-sm bg-slate-100 dark:bg-gray-800 h-full flex items-end justify-center overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 1, delay: idx * 0.1, type: "spring" }}
                    className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm group-hover:from-red-500 group-hover:to-red-300 transition-colors relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {item.value} min
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs font-medium text-slate-400 dark:text-gray-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
