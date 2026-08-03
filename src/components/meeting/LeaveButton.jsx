import React from 'react';
import Button from '../common/Button';
import { PhoneOff } from 'lucide-react';
import { cn } from '@/utils/cn';

const LeaveButton = ({ onClick, className }) => {
  return (
    <Button
      variant="danger"
      size="icon"
      onClick={onClick}
      className={cn("rounded-full h-12 w-16 bg-red-600 hover:bg-red-700", className)}
    >
      <PhoneOff className="h-5 w-5" />
    </Button>
  );
};

export default LeaveButton;
