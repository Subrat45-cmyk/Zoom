import React from 'react';
import { Card, CardContent } from '../common/Card';
import Avatar from '../common/Avatar';
import { Play } from 'lucide-react';
import Button from '../common/Button';

const TranscriptCard = ({ speaker, time, text, avatar }) => {
  return (
    <Card className="hover:border-red-500/30 transition-colors group">
      <CardContent className="p-4 flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={avatar} fallback={speaker[0]} size="sm" />
          <span className="text-xs text-slate-400 dark:text-gray-500">{time}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-slate-800 dark:text-gray-200">{speaker}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
            {text}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptCard;
