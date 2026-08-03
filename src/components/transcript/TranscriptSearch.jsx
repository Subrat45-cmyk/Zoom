import React from 'react';
import { Search } from 'lucide-react';
import Input from '../common/Input';

const TranscriptSearch = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Search transcript..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search className="h-4 w-4" />}
        className="bg-slate-100 dark:bg-gray-800 border-slate-300 dark:border-gray-700"
      />
    </div>
  );
};

export default TranscriptSearch;
