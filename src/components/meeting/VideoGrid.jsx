import React from 'react';
import VideoCard from './VideoCard';
import { cn } from '@/utils/cn';

const VideoGrid = ({ participants, localParticipant }) => {
  const total = participants.length + (localParticipant ? 1 : 0);
  const allParticipants = localParticipant ? [localParticipant, ...participants] : participants;

  // Calculate grid layout based on number of users
  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2";
    if (count <= 9) return "grid-cols-3 grid-rows-3";
    return "grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-3";
  };

  return (
    <div className="flex-1 w-full h-full p-4 overflow-hidden flex items-center justify-center">
      <div className={cn(
        "grid gap-4 w-full h-full max-w-7xl max-h-[85vh] transition-all duration-300",
        getGridClass(total)
      )}>
        {allParticipants.map((p, idx) => (
          <VideoCard 
            key={p.id} 
            participant={p} 
            isLocal={localParticipant && p.id === localParticipant.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
