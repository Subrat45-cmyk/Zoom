import React from 'react';
import { Download } from 'lucide-react';
import Button from '../common/Button';

const TranscriptDownload = ({ onDownload }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onDownload}
      leftIcon={<Download className="h-4 w-4" />}
    >
      Export PDF
    </Button>
  );
};

export default TranscriptDownload;
