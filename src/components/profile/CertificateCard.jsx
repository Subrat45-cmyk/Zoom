import React from 'react';
import { Card, CardContent } from '../common/Card';
import { FileBadge, Download } from 'lucide-react';
import Button from '../common/Button';

const CertificateCard = ({ title, date, id }) => {
  return (
    <Card className="hover:border-red-500/30 transition-colors">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-900/30 flex items-center justify-center text-red-400">
            <FileBadge className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-gray-100">{title}</h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-gray-400">
              <span>Issued: {date}</span>
              <span>•</span>
              <span>ID: {id}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:text-gray-100">
          <Download className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
