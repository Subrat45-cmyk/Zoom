import React, { useRef, useEffect } from 'react';
import { MicOff, MoreVertical } from 'lucide-react';
import { cn } from '@/utils/cn';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const VideoCard = ({ participant, isLocal = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && participant.stream && !participant.isVideoOff) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream, participant.isVideoOff]);

  return (
    <div className={cn(
      "relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-gray-800 border-2",
      participant.isSpeaking ? "border-red-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-slate-200 dark:border-gray-800"
    )}>
      {/* Video or Avatar */}
      {participant.isVideoOff || !participant.stream ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <Avatar 
            src={participant.avatar} 
            fallback={participant.name.charAt(0)} 
            size="xl" 
            className={cn(participant.isSpeaking && "animate-pulse")}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlays */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
        {participant.isMuted && <MicOff className="h-4 w-4 text-red-500" />}
        <span className="text-sm font-medium text-white truncate max-w-[120px]">
          {participant.name} {isLocal && "(You)"}
        </span>
      </div>

      <div className="absolute top-3 right-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-50 dark:bg-gray-950/40 hover:bg-black/60 text-white backdrop-blur-md">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Speaking Indicator */}
      {participant.isSpeaking && (
        <div className="absolute top-3 left-3 flex gap-1 items-end h-4">
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.5s_infinite] h-full" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite] h-2/3" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.4s_infinite] h-full" />
        </div>
      )}
    </div>
  );
};

export default VideoCard;
