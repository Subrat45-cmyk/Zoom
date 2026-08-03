import React from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import ScreenShareButton from './ScreenShareButton';
import LeaveButton from './LeaveButton';
import Button from '../common/Button';
import { MessageSquare, Users, Settings, Type } from 'lucide-react';
import { cn } from '@/utils/cn';

const MeetingControls = ({
  isMicOn,
  toggleMic,
  isCameraOn,
  toggleCamera,
  isScreenSharing,
  toggleScreenShare,
  onLeave,
  activePanel,
  setActivePanel,
}) => {
  return (
    <div className="flex h-20 w-full items-center justify-between px-6 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800">
      <div className="flex items-center w-1/3 text-sm font-medium text-slate-800 dark:text-gray-200">
        12:45 PM | Room-123
      </div>

      <div className="flex flex-1 items-center justify-center gap-3 w-1/3">
        <MicButton isMuted={!isMicOn} onClick={toggleMic} />
        <CameraButton isVideoOff={!isCameraOn} onClick={toggleCamera} />
        <ScreenShareButton isSharing={isScreenSharing} onClick={toggleScreenShare} />
        <LeaveButton onClick={onLeave} />
      </div>

      <div className="flex items-center justify-end gap-2 w-1/3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
          className={cn("rounded-full h-10 w-10 text-slate-500 dark:text-gray-400", activePanel === 'chat' && "bg-red-500/20 text-red-400")}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePanel(activePanel === 'transcript' ? null : 'transcript')}
          className={cn("rounded-full h-10 w-10 text-slate-500 dark:text-gray-400", activePanel === 'transcript' && "bg-red-500/20 text-red-400")}
          title="Live Transcript"
        >
          <Type className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePanel(activePanel === 'participants' ? null : 'participants')}
          className={cn("rounded-full h-10 w-10 text-slate-500 dark:text-gray-400", activePanel === 'participants' && "bg-red-500/20 text-red-400")}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-slate-500 dark:text-gray-400">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MeetingControls;
