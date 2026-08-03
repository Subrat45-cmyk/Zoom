import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { BookOpen } from 'lucide-react';
import Badge from '../common/Badge';

const VocabularyCard = ({ words }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b border-slate-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <CardTitle>Recent Vocabulary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {words.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800 dark:text-gray-200">{item.word}</span>
                <Badge variant={item.mastery > 80 ? 'success' : 'warning'}>
                  {item.mastery}% Mastery
                </Badge>
              </div>
              <p className="text-sm text-slate-400 dark:text-gray-500">{item.meaning}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyCard;
